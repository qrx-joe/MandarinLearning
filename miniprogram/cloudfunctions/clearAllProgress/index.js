const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()

exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext()
  
  try {
    // Delete all progress records
    const progressRes = await db.collection('progress').where({
      _openid: OPENID
    }).get()
    
    const deleteTasks = progressRes.data.map(doc => 
      db.collection('progress').doc(doc._id).remove()
    )
    
    await Promise.all(deleteTasks)
    
    // Reset user stats
    await db.collection('users').where({
      _openid: OPENID
    }).update({
      data: {
        streakDays: 0,
        totalDays: 0
      }
    })
    
    return { success: true, deletedCount: progressRes.data.length }
  } catch (e) {
    console.error('Clear progress error:', e)
    return { error: e.message }
  }
}
