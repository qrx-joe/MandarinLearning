const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()

exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext()
  const { year, month } = event
  
  try {
    const monthStr = String(month).padStart(2, '0')
    const startDate = `${year}-${monthStr}-01`
    const endDate = `${year}-${monthStr}-31`
    
    // Get monthly records
    const records = await db.collection('progress').where({
      _openid: OPENID,
      date: db.command.gte(startDate).and(db.command.lte(endDate))
    }).orderBy('date', 'asc').get()
    
    // Calculate stats
    const completedRecords = records.data.filter(r => r.completed)
    const monthlyCount = completedRecords.length
    
    // Get streak and total
    const userRes = await db.collection('users').where({
      _openid: OPENID
    }).get()
    
    const user = userRes.data[0] || {}
    
    return {
      records: records.data,
      monthlyCount,
      streakDays: user.streakDays || 0,
      totalDays: user.totalDays || 0
    }
  } catch (e) {
    console.error('Calendar error:', e)
    return { error: e.message }
  }
}
