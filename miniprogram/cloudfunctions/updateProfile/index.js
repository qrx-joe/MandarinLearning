const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()

exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext()
  const updates = event
  
  try {
    const updateData = {}
    Object.keys(updates).forEach(key => {
      updateData[`settings.${key}`] = updates[key]
    })
    
    await db.collection('users').where({
      _openid: OPENID
    }).update({
      data: updateData
    })
    
    return { success: true }
  } catch (e) {
    console.error('Update profile error:', e)
    return { error: e.message }
  }
}
