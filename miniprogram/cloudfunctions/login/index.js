const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()

exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext()
  
  try {
    // Check if user exists
    const userRes = await db.collection('users').where({
      _openid: OPENID
    }).get()
    
    if (userRes.data.length === 0) {
      // Create new user
      await db.collection('users').add({
        data: {
          _openid: OPENID,
          createdAt: db.serverDate(),
          streakDays: 0,
          totalDays: 0,
          settings: {
            reminderEnabled: true,
            reminderTime: '20:00',
            defaultSpeed: 0.8,
            bindCode: '',
            boundTo: ''
          }
        }
      })
    }
    
    return {
      openid: OPENID,
      isNew: userRes.data.length === 0
    }
  } catch (e) {
    console.error('Login error:', e)
    return { error: e.message }
  }
}
