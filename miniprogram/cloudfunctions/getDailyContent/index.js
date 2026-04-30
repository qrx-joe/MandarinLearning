const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()

exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext()
  
  try {
    // Return today's content info
    // Actual content is loaded client-side from data/contents.js
    // This function just returns metadata or user-specific overrides
    
    const today = new Date()
    const startOfYear = new Date(today.getFullYear(), 0, 1)
    const dayOfYear = Math.floor((today - startOfYear) / (1000 * 60 * 60 * 24)) + 1
    
    return {
      day: dayOfYear,
      date: `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`,
      message: 'Content loaded from local data'
    }
  } catch (e) {
    console.error('Get daily content error:', e)
    return { error: e.message }
  }
}
