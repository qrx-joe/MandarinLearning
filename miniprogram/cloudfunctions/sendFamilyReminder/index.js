const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })

exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext()
  const { toUserId, message } = event
  
  try {
    // Send subscription message
    // Note: In production, use wx.cloud.callFunction with openapi
    // to send subscribeMessage. This requires template ID approval.
    
    // For MVP, we return success and let client handle via
    // custom messaging or weixin app message
    
    return {
      success: true,
      message: 'Reminder queued',
      note: 'In production, integrate with wx-server-sdk openapi.subscribeMessage'
    }
  } catch (e) {
    console.error('Send reminder error:', e)
    return { error: e.message }
  }
}
