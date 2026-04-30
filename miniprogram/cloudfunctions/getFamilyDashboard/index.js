const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()

exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext()
  
  try {
    // Get user profile
    const userRes = await db.collection('users').where({
      _openid: OPENID
    }).get()
    
    const user = userRes.data[0] || {}
    const settings = user.settings || {}
    
    // Check if bound to someone
    let boundUser = null
    if (settings.boundTo) {
      const boundRes = await db.collection('users').where({
        _openid: settings.boundTo
      }).get()
      
      if (boundRes.data.length > 0) {
        const bu = boundRes.data[0]
        boundUser = {
          openId: bu._openid,
          nickName: bu.nickName || '家人',
          streakDays: bu.streakDays || 0,
          totalDays: bu.totalDays || 0
        }
      }
    }
    
    // Get recent progress of bound user
    let recentRecords = []
    let weekDays = []
    let monthlyStats = []
    let weeklyCompleted = 0
    let missedDays = 0
    
    if (boundUser) {
      // Last 7 days records
      const today = new Date()
      const sevenDaysAgo = new Date(today)
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6)
      
      const recent = await db.collection('progress').where({
        _openid: boundUser.openId,
        date: db.command.gte(formatDate(sevenDaysAgo)).and(db.command.lte(formatDate(today)))
      }).orderBy('date', 'desc').get()
      
      recentRecords = recent.data.slice(0, 7)
      
      // Build week days
      const days = ['日', '一', '二', '三', '四', '五', '六']
      weekDays = []
      for (let i = 6; i >= 0; i--) {
        const d = new Date(today)
        d.setDate(d.getDate() - i)
        const dateStr = formatDate(d)
        const record = recent.data.find(r => r.date === dateStr)
        
        weekDays.push({
          label: days[d.getDay()],
          date: `${d.getMonth() + 1}/${d.getDate()}`,
          completed: record ? record.completed : false,
          isToday: i === 0
        })
        
        if (record && record.completed) {
          weeklyCompleted++
        }
      }
      
      // Calculate missed days
      const lastRecord = recent.data[0]
      if (lastRecord) {
        const lastDate = new Date(lastRecord.date)
        const diffDays = Math.floor((today - lastDate) / (1000 * 60 * 60 * 24))
        if (!lastRecord.completed && diffDays > 0) {
          missedDays = diffDays
        }
      }
      
      // Monthly stats (last 3 months)
      monthlyStats = []
      for (let i = 0; i < 3; i++) {
        const m = new Date(today.getFullYear(), today.getMonth() - i, 1)
        const monthStart = formatMonth(m)
        const monthEnd = formatMonth(new Date(m.getFullYear(), m.getMonth() + 1, 0))
        
        const monthRecords = await db.collection('progress').where({
          _openid: boundUser.openId,
          completed: true,
          date: db.command.gte(monthStart).and(db.command.lte(monthEnd))
        }).count()
        
        monthlyStats.push({
          month: `${m.getMonth() + 1}月`,
          completedDays: monthRecords.total,
          percentage: Math.min((monthRecords.total / 30) * 100, 100)
        })
      }
    }
    
    return {
      boundUser,
      missedDays,
      weeklyCompleted,
      weekDays,
      recentRecords,
      monthlyStats
    }
  } catch (e) {
    console.error('Dashboard error:', e)
    return { error: e.message }
  }
}

function formatDate(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

function formatMonth(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-01`
}
