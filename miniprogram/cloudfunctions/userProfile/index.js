const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })

exports.main = async (event, context) => {
  // Simple proxy to get user profile
  // In production, add more fields as needed
  const { OPENID } = cloud.getWXContext()
  
  return {
    openid: OPENID,
    message: 'User profile placeholder'
  }
}
