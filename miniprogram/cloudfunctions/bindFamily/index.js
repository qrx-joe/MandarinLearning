const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()

exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext()
  const { bindCode } = event
  
  try {
    // Find binding record
    const bindingRes = await db.collection('familyBindings').where({
      code: bindCode
    }).get()
    
    if (bindingRes.data.length === 0) {
      return { error: 'Invalid bind code' }
    }
    
    const binding = bindingRes.data[0]
    
    if (binding.childOpenid && binding.childOpenid !== OPENID) {
      return { error: 'Code already used' }
    }
    
    // Update binding
    await db.collection('familyBindings').doc(binding._id).update({
      data: {
        childOpenid: OPENID
      }
    })
    
    // Update both users
    await db.collection('users').where({
      _openid: OPENID
    }).update({
      data: {
        'settings.boundTo': binding.parentOpenid
      }
    })
    
    return { success: true }
  } catch (e) {
    console.error('Bind family error:', e)
    return { error: e.message }
  }
}
