const cloud = require('wx-server-sdk')
const crypto = require('crypto')
const https = require('https')
const querystring = require('querystring')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })

// 腾讯云 TTS 配置 —— 部署前必须替换为真实密钥
const TTS_CONFIG = {
  secretId: process.env.TENCENT_SECRET_ID || 'YOUR_SECRET_ID',
  secretKey: process.env.TENCENT_SECRET_KEY || 'YOUR_SECRET_KEY',
  region: 'ap-guangzhou',
  endpoint: 'tts.tencentcloudapi.com'
}

/**
 * 腾讯云 API 签名 V3
 */
function signRequest(payload, timestamp, date) {
  const service = 'tts'
  const algorithm = 'TC3-HMAC-SHA256'
  
  // 1. 规范请求
  const httpRequestMethod = 'POST'
  const canonicalUri = '/'
  const canonicalQuerystring = ''
  const contentType = 'application/json'
  
  const payloadHash = crypto.createHash('sha256').update(payload).digest('hex')
  const canonicalHeaders = `content-type:${contentType}\nhost:${TTS_CONFIG.endpoint}\n`
  const signedHeaders = 'content-type;host'
  
  const canonicalRequest = [
    httpRequestMethod,
    canonicalUri,
    canonicalQuerystring,
    canonicalHeaders,
    signedHeaders,
    payloadHash
  ].join('\n')
  
  // 2. 待签名字符串
  const credentialScope = `${date}/${service}/tc3_request`
  const stringToSign = [
    algorithm,
    timestamp,
    credentialScope,
    crypto.createHash('sha256').update(canonicalRequest).digest('hex')
  ].join('\n')
  
  // 3. 计算签名
  const secretDate = crypto.createHmac('sha256', `TC3${TTS_CONFIG.secretKey}`).update(date).digest()
  const secretService = crypto.createHmac('sha256', secretDate).update(service).digest()
  const secretSigning = crypto.createHmac('sha256', secretService).update('tc3_request').digest()
  const signature = crypto.createHmac('sha256', secretSigning).update(stringToSign).digest('hex')
  
  // 4. 构造 Authorization
  const authorization = `${algorithm} Credential=${TTS_CONFIG.secretId}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`
  
  return authorization
}

/**
 * 调用腾讯云 TTS
 */
function callTTS(payload) {
  return new Promise((resolve, reject) => {
    const timestamp = Math.floor(Date.now() / 1000)
    const date = new Date(timestamp * 1000).toISOString().split('T')[0]
    const authorization = signRequest(payload, timestamp, date)
    
    const options = {
      hostname: TTS_CONFIG.endpoint,
      port: 443,
      path: '/',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Host': TTS_CONFIG.endpoint,
        'X-TC-Action': 'TextToVoice',
        'X-TC-Version': '2019-08-23',
        'X-TC-Timestamp': timestamp.toString(),
        'X-TC-Region': TTS_CONFIG.region,
        'Authorization': authorization
      }
    }
    
    const req = https.request(options, (res) => {
      let data = ''
      res.on('data', (chunk) => { data += chunk })
      res.on('end', () => {
        try {
          const response = JSON.parse(data)
          if (response.Response && response.Response.Audio) {
            resolve({
              success: true,
              audioBase64: response.Response.Audio,
              format: 'mp3'
            })
          } else {
            reject(new Error(response.Response?.Error?.Message || 'TTS failed'))
          }
        } catch (e) {
          reject(e)
        }
      })
    })
    
    req.on('error', reject)
    req.write(payload)
    req.end()
  })
}

exports.main = async (event, context) => {
  const { text, speed = 1.0 } = event
  
  // 参数校验
  if (!text || typeof text !== 'string') {
    return { error: 'Missing text parameter' }
  }
  
  if (text.length > 100) {
    return { error: 'Text too long (max 100 chars)' }
  }
  
  // 语速映射：0.8→-2, 1.0→0, 1.2→2
  const speedMap = { '0.8': -2, '1.0': 0, '1.2': 2 }
  const speedValue = speedMap[String(speed)] !== undefined ? speedMap[String(speed)] : 0
  
  const payload = JSON.stringify({
    Text: text,
    SessionId: `mandarin_${Date.now()}`,
    ModelType: 1, // 通用模型
    Volume: 0,    // 默认音量
    Speed: speedValue,
    VoiceType: 0, // 标准女声
    Codec: 'mp3'
  })
  
  try {
    // 检查配置
    if (TTS_CONFIG.secretId === 'YOUR_SECRET_ID') {
      return {
        error: 'TTS not configured. Please set TENCENT_SECRET_ID and TENCENT_SECRET_KEY environment variables.'
      }
    }
    
    const result = await callTTS(payload)
    
    // 将 base64 音频上传到云存储
    const buffer = Buffer.from(result.audioBase64, 'base64')
    const fileName = `tts/${Date.now()}_${speed}.mp3`
    
    const uploadRes = await cloud.uploadFile({
      cloudPath: fileName,
      fileContent: buffer
    })
    
    return {
      success: true,
      fileID: uploadRes.fileID,
      tempFileURL: uploadRes.fileID  // 客户端可用 fileID 播放
    }
  } catch (e) {
    console.error('TTS error:', e)
    return {
      error: e.message || 'TTS generation failed',
      fallback: true,
      message: 'Please use browser TTS or pre-recorded audio as fallback'
    }
  }
}
