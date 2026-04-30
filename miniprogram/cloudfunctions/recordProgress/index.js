const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()

exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext()
  const { day, minutes, completed, segmentsCompleted } = event
  
  try {
    const today = new Date()
    const dateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
    
    // Check if record exists for today
    const existing = await db.collection('progress').where({
      _openid: OPENID,
      date: dateStr
    }).get()
    
    if (existing.data.length > 0) {
      // Update existing
      await db.collection('progress').doc(existing.data[0]._id).update({
        data: {
          minutes: db.command.max(minutes),
          completed: completed || existing.data[0].completed,
          segmentsCompleted: db.command.max(segmentsCompleted || 0)
        }
      })
    } else {
      // Create new record
      await db.collection('progress').add({
        data: {
          _openid: OPENID,
          date: dateStr,
          day,
          minutes,
          completed: completed || false,
          segmentsCompleted: segmentsCompleted || 0,
          createdAt: db.serverDate()
        }
      })
    }
    
    // Calculate streak
    const streak = await calculateStreak(OPENID)
    const totalDays = await calculateTotalDays(OPENID)
    
    // Update user stats
    await db.collection('users').where({
      _openid: OPENID
    }).update({
      data: {
        streakDays: streak,
        totalDays: totalDays
      }
    })
    
    return {
      success: true,
      streakDays: streak,
      totalDays: totalDays
    }
  } catch (e) {
    console.error('Record progress error:', e)
    return { error: e.message }
  }
}

async function calculateStreak(openid) {
  const db = cloud.database()
  const records = await db.collection('progress')
    .where({
      _openid: openid,
      completed: true
    })
    .orderBy('date', 'desc')
    .get()
  
  if (records.data.length === 0) return 0
  
  let streak = 1
  const today = new Date()
  const todayStr = formatDate(today)
  
  // Check if today or yesterday has a record
  const latestRecord = records.data[0].date
  if (latestRecord !== todayStr) {
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)
    if (latestRecord !== formatDate(yesterday)) {
      return 0 // Streak broken
    }
  }
  
  // Count consecutive days
  for (let i = 1; i < records.data.length; i++) {
    const prevDate = new Date(records.data[i - 1].date)
    const currDate = new Date(records.data[i].date)
    const diffDays = (prevDate - currDate) / (1000 * 60 * 60 * 24)
    
    if (diffDays === 1) {
      streak++
    } else {
      break
    }
  }
  
  return streak
}

async function calculateTotalDays(openid) {
  const db = cloud.database()
  const countRes = await db.collection('progress')
    .where({
      _openid: openid,
      completed: true
    })
    .count()
  
  return countRes.total
}

function formatDate(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}
