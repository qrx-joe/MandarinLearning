const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()

function generateCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let code = ''
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return code
}

exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext()
  
  try {
    let code = generateCode()
    let exists = true
    let attempts = 0
    
    // Ensure code is unique
    while (exists && attempts < 10) {
      const check = await db.collection('familyBindings').where({
        code
      }).count()
      
      if (check.total === 0) {
        exists = false
      } else {
        code = generateCode()
        attempts++
      }
    }
    
    // Save binding record
    await db.collection('familyBindings').add({
      data: {
        code,
        parentOpenid: OPENID,
        childOpenid: '',
        createdAt: db.serverDate()
      }
    })
    
    // Update user settings
    await db.collection('users').where({
      _openid: OPENID
    }).update({
      data: {
        'settings.bindCode': code
      }
    })
    
    return { success: true, code }
  } catch (e) {
    console.error('Generate bind code error:', e)
    return { error: e.message }
  }
}
