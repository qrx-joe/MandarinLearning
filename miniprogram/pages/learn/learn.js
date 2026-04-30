const app = getApp()
const contentData = require('../../data/contents.js')
const praiseUtil = require('../../utils/praise.js')

const SEGMENT_KEYS = ['warmUp', 'core', 'challenge']
const SEGMENT_NAMES = ['热身', '核心', '挑战']

// RecorderManager instance (for real device recording)
const recorderManager = wx.getRecorderManager()

// Helper: check if running in simulator
function isSimulator() {
  try {
    const info = wx.getSystemInfoSync()
    return info.platform === 'devtools'
  } catch (e) {
    return false
  }
}

Page({
  data: {
    day: 1,
    review: false,
    contentTitle: '',
    segments: {},
    segmentKeys: SEGMENT_KEYS,
    segmentNames: SEGMENT_NAMES,
    currentSegmentKey: 'warmUp',
    currentSegmentIndex: 0,
    currentItemIndex: 0,
    currentSegment: {},
    currentItem: {},
    totalItems: 0,
    globalItemIndex: 0,
    isPlaying: false,
    playbackRate: 0.8,
    progressPercent: 0,
    currentMinute: '00',
    currentSecond: '00',
    isRecording: false,
    recordDuration: 0,
    recordPath: '',
    timer: null,
    studySeconds: 0
  },

  audioContext: null,
  recordContext: null,
  recordTimer: null,

  onLoad(options) {
    console.log('=== 暖声·向暖而行 v1.8 学习页加载 ===')
    
    // Clean old recording
    this.setData({ recordPath: '' })
    
    const day = parseInt(options.day) || 1
    const review = options.review === 'true'
    const content = contentData.getDayContent(day)
    const segments = content.segments || {}
    
    // Calculate total items
    let totalItems = 0
    SEGMENT_KEYS.forEach(key => {
      if (segments[key] && segments[key].items) {
        totalItems += segments[key].items.length
      }
    })

    const firstSegment = segments.warmUp || segments[SEGMENT_KEYS[0]] || {}
    const firstItem = firstSegment.items ? firstSegment.items[0] : {}

    this.setData({
      day,
      review,
      contentTitle: content.title || '',
      segments,
      totalItems,
      currentSegmentKey: SEGMENT_KEYS[0],
      currentSegmentIndex: 0,
      currentItemIndex: 0,
      currentSegment: firstSegment,
      currentItem: firstItem,
      globalItemIndex: 0,
      playbackRate: firstSegment.speed || 0.8,
      isPlaying: false
    })

    this.initAudio()
    this.startStudyTimer()
  },

  onUnload() {
    this.stopStudyTimer()
    this.stopAllAudio()
  },

  stopAllAudio() {
    if (this.audioContext) {
      try { this.audioContext.stop() } catch(e) {}
      try { this.audioContext.destroy() } catch(e) {}
      this.audioContext = null
    }
    if (this.recordContext) {
      try { this.recordContext.stop() } catch(e) {}
      try { this.recordContext.destroy() } catch(e) {}
      this.recordContext = null
    }
  },

  initAudio() {
    if (this.audioContext) {
      try { this.audioContext.destroy() } catch(e) {}
    }
    this.audioContext = wx.createInnerAudioContext()
    this.audioContext.obeyMuteSwitch = false
    this.audioContext.onEnded(() => {
      this.setData({ isPlaying: false })
    })
    this.audioContext.onError((err) => {
      console.error('TTS audio error:', err)
      this.setData({ isPlaying: false })
    })
  },

  getGlobalIndex(segmentIndex, itemIndex) {
    const { segments } = this.data
    let globalIdx = 0
    for (let i = 0; i < segmentIndex; i++) {
      const key = SEGMENT_KEYS[i]
      const seg = segments[key]
      if (seg && seg.items) {
        globalIdx += seg.items.length
      }
    }
    globalIdx += itemIndex
    return globalIdx
  },

  goToItem(segmentIndex, itemIndex) {
    const { segments } = this.data
    const key = SEGMENT_KEYS[segmentIndex]
    const segment = segments[key] || {}
    const items = segment.items || []
    const globalIdx = this.getGlobalIndex(segmentIndex, itemIndex)
    const pct = this.data.totalItems > 0 ? (globalIdx / this.data.totalItems) * 100 : 0

    this.setData({
      currentSegmentIndex: segmentIndex,
      currentSegmentKey: key,
      currentItemIndex: itemIndex,
      currentSegment: segment,
      currentItem: items[itemIndex] || {},
      globalItemIndex: globalIdx,
      progressPercent: Math.min(pct, 100),
      playbackRate: segment.speed || 1.0,
      isPlaying: false
    })

    if (this.audioContext) {
      try { this.audioContext.stop() } catch(e) {}
    }
  },

  nextItem() {
    const { currentSegmentIndex, currentItemIndex, segments } = this.data
    const key = SEGMENT_KEYS[currentSegmentIndex]
    const seg = segments[key] || {}
    const items = seg.items || []
    
    if (currentItemIndex < items.length - 1) {
      this.goToItem(currentSegmentIndex, currentItemIndex + 1)
    } else if (currentSegmentIndex < SEGMENT_KEYS.length - 1) {
      this.goToItem(currentSegmentIndex + 1, 0)
    }
  },

  prevItem() {
    const { currentSegmentIndex, currentItemIndex } = this.data
    if (currentItemIndex > 0) {
      this.goToItem(currentSegmentIndex, currentItemIndex - 1)
    } else if (currentSegmentIndex > 0) {
      const prevKey = SEGMENT_KEYS[currentSegmentIndex - 1]
      const prevSeg = this.data.segments[prevKey] || {}
      const prevItems = prevSeg.items || []
      this.goToItem(currentSegmentIndex - 1, prevItems.length - 1)
    }
  },

  jumpToSegment(e) {
    const index = parseInt(e.currentTarget.dataset.index)
    this.goToItem(index, 0)
  },

  startStudyTimer() {
    this.data.timer = setInterval(() => {
      this.setData({
        studySeconds: this.data.studySeconds + 1
      }, () => {
        const total = 600
        const pct = Math.min((this.data.studySeconds / total) * 100, 100)
        const min = Math.floor(this.data.studySeconds / 60)
        const sec = this.data.studySeconds % 60
        this.setData({
          progressPercent: pct,
          currentMinute: String(min).padStart(2, '0'),
          currentSecond: String(sec).padStart(2, '0')
        })
      })
    }, 1000)
  },

  stopStudyTimer() {
    if (this.data.timer) {
      clearInterval(this.data.timer)
    }
  },

  togglePlay() {
    const { isPlaying, currentItem, playbackRate } = this.data
    const text = currentItem.text || ''
    
    console.log('togglePlay called, cloudReady:', app.globalData.cloudReady, 'text:', text)
    
    if (isPlaying) {
      if (this.audioContext) {
        try { this.audioContext.pause() } catch(e) {}
      }
      this.setData({ isPlaying: false })
    } else {
      if (currentItem.audioUrl) {
        console.log('Playing local audio:', currentItem.audioUrl)
        this.playAudio(currentItem.audioUrl, playbackRate)
      } else if (app.globalData.cloudReady) {
        console.log('Using cloud TTS')
        this.generateTTS(text)
      } else {
        console.log('Cloud not ready, using Youdao TTS')
        this.playYoudaoTTS(text)
      }
    }
  },

  playAudio(url, rate) {
    if (!this.audioContext) this.initAudio()
    this.audioContext.src = url
    this.audioContext.playbackRate = rate
    this.audioContext.play()
    this.setData({ isPlaying: true })
    wx.showToast({ title: '正在播放示范音', icon: 'none', duration: 1500 })
  },

  // Youdao TTS — download to local first, then play (most reliable on Android/iOS)
  playYoudaoTTS(text) {
    if (!text) {
      wx.showToast({ title: '没有可朗读的内容', icon: 'none' })
      return
    }

    console.log('Youdao TTS starting for:', text)
    wx.showLoading({ title: '加载音频...' })

    const encoded = encodeURIComponent(text)
    const url = `https://dict.youdao.com/dictvoice?audio=${encoded}&type=0`

    console.log('TTS URL:', url)
    console.log('Text length:', text.length, 'chars')

    wx.downloadFile({
      url: url,
      timeout: 10000,
      success: (res) => {
        console.log('Download result:', res.errMsg, res.tempFilePath)
        if (res.tempFilePath) {
          // 获取文件大小确认下载成功
          wx.getFileInfo({
            filePath: res.tempFilePath,
            success: (info) => {
              console.log('File size:', info.size, 'bytes')
              if (info.size < 100) {
                console.error('Audio file too small, likely empty')
                wx.hideLoading()
                this.showReadAloudFallback(text)
              } else {
                this.playLocalFile(res.tempFilePath, text)
              }
            },
            fail: () => {
              // getFileInfo 失败也尝试播放
              this.playLocalFile(res.tempFilePath, text)
            }
          })
        } else {
          console.error('Download failed: no tempFilePath', res)
          wx.hideLoading()
          this.showReadAloudFallback(text)
        }
      },
      fail: (err) => {
        console.error('DownloadFile fail:', err)
        wx.hideLoading()
        this.showReadAloudFallback(text)
      },
      complete: () => {
        wx.hideLoading()
      }
    })
  },

  // Play a downloaded local file with a fresh audio context
  playLocalFile(filePath, fallbackText) {
    // Clean up old context
    if (this.audioContext) {
      try { this.audioContext.stop() } catch(e) {}
      try { this.audioContext.destroy() } catch(e) {}
      this.audioContext = null
    }

    this.audioContext = wx.createInnerAudioContext()
    this.audioContext.obeyMuteSwitch = false
    this.audioContext.volume = 1.0

    // 先设置事件回调，再设置 src，最后 play
    this.audioContext.onCanplay(() => {
      console.log('Audio canplay')
    })

    this.audioContext.onPlay(() => {
      console.log('Audio playing')
      wx.hideLoading()
      this.setData({ isPlaying: true })
      wx.showToast({ title: '正在播放示范音', icon: 'none', duration: 1500 })
    })

    this.audioContext.onError((err) => {
      console.error('Audio play error:', err)
      wx.hideLoading()
      this.setData({ isPlaying: false })
      this.showReadAloudFallback(fallbackText)
    })

    this.audioContext.onEnded(() => {
      console.log('Audio ended')
      this.setData({ isPlaying: false })
    })

    this.audioContext.src = filePath
    setTimeout(() => {
      if (this.audioContext) {
        this.audioContext.play()
      }
    }, 100)
  },

  showReadAloudFallback(text) {
    this.setData({ isPlaying: false })
    wx.showToast({
      title: '请跟读：' + text,
      icon: 'none',
      duration: 3000
    })
  },

  async generateTTS(text) {
    if (!text) return
    
    const speed = this.data.playbackRate
    
    try {
      wx.showLoading({ title: '生成音频...' })
      
      const res = await wx.cloud.callFunction({
        name: 'generateTTS',
        data: { text, speed }
      })
      
      wx.hideLoading()
      
      if (res.result && res.result.success) {
        this.playAudio(res.result.fileID, speed)
      } else if (res.result && res.result.fallback) {
        this.playYoudaoTTS(text)
      } else {
        wx.showToast({ title: res.result?.error || '音频生成失败', icon: 'none' })
        this.playYoudaoTTS(text)
      }
    } catch (e) {
      wx.hideLoading()
      console.error('TTS error:', e)
      this.playYoudaoTTS(text)
    }
  },

  setSpeed(e) {
    const rate = parseFloat(e.currentTarget.dataset.rate)
    this.setData({ playbackRate: rate })
    
    if (this.data.isPlaying && this.audioContext) {
      this.audioContext.playbackRate = rate
    }
    
    wx.showToast({ title: `语速 ${rate}x`, icon: 'none' })
  },

  // Recording — uses RecorderManager for mp3 format (best compatibility)
  startRecord() {
    console.log('startRecord called, isSimulator:', isSimulator())
    
    if (isSimulator()) {
      wx.showToast({
        title: '录音功能需在真机上测试',
        icon: 'none',
        duration: 2000
      })
      this.setData({ isRecording: true, recordDuration: 0, recordPath: '' })
      this.recordTimer = setInterval(() => {
        this.setData({ recordDuration: this.data.recordDuration + 1 })
      }, 1000)
      return
    }
    
    this.setData({ isRecording: true, recordDuration: 0, recordPath: '' })
    
    this.recordTimer = setInterval(() => {
      this.setData({ recordDuration: this.data.recordDuration + 1 })
    }, 1000)
    
    // Bind RecorderManager callbacks
    recorderManager.onStop((res) => {
      console.log('RecorderManager onStop:', res.tempFilePath)
      this.setData({ recordPath: res.tempFilePath })
      wx.showToast({ title: '录音完成', icon: 'success' })
    })
    
    recorderManager.onError((err) => {
      console.error('RecorderManager onError:', err)
      wx.showToast({ title: '录音失败，请检查权限', icon: 'none' })
      this.setData({ isRecording: false })
      if (this.recordTimer) {
        clearInterval(this.recordTimer)
        this.recordTimer = null
      }
    })
    
    recorderManager.start({
      duration: 60000,
      format: 'mp3',
      sampleRate: 44100,
      numberOfChannels: 1,
      encodeBitRate: 96000
    })
  },

  stopRecord() {
    console.log('stopRecord called, isSimulator:', isSimulator())
    
    if (this.recordTimer) {
      clearInterval(this.recordTimer)
      this.recordTimer = null
    }
    
    if (isSimulator()) {
      const duration = this.data.recordDuration
      this.setData({ 
        isRecording: false, 
        recordPath: 'mock_record_path_' + Date.now(),
        recordDuration: duration 
      })
      wx.showToast({ 
        title: '模拟录音已保存（' + duration + '秒）', 
        icon: 'success',
        duration: 2000
      })
      return
    }
    
    this.setData({ isRecording: false })
    recorderManager.stop()
  },

  playRecord() {
    const { recordPath, isRecording } = this.data
    console.log('playRecord called, recordPath:', recordPath, 'isRecording:', isRecording)
    
    if (!recordPath) {
      wx.showToast({ title: '请先录音', icon: 'none' })
      return
    }
    
    if (isRecording) {
      wx.showToast({ title: '请先停止录音', icon: 'none' })
      return
    }
    
    // 模拟器录制的 .silk 文件无法播放（真机上的 .silk 可以正常播放）
    if (recordPath.includes('.silk') && isSimulator()) {
      wx.showModal({
        title: '提示',
        content: '模拟器录制的音频格式（.silk）无法在此播放。回听功能需要在真机上测试。',
        showCancel: false,
        confirmText: '知道了'
      })
      return
    }
    
    // Check if this is a mock recording (simulator)
    if (recordPath.includes('mock')) {
      wx.showModal({
        title: '提示',
        content: '模拟器上无法录制真实音频。回听功能需要在真机上测试。',
        showCancel: false,
        confirmText: '知道了'
      })
      return
    }
    
    // Check simulator
    if (isSimulator()) {
      wx.showModal({
        title: '提示',
        content: '模拟器不支持播放录音。请在真机上测试回听功能。',
        showCancel: false,
        confirmText: '知道了'
      })
      return
    }
    
    // Stop any existing audio first
    this.stopAllAudio()
    
    // Create new audio context for playback
    this.recordContext = wx.createInnerAudioContext()
    this.recordContext.obeyMuteSwitch = false
    this.recordContext.src = recordPath
    
    this.recordContext.onPlay(() => {
      wx.showToast({ title: '播放录音...', icon: 'none', duration: 1000 })
    })
    
    this.recordContext.onError((err) => {
      console.error('Play record error:', err)
      wx.showToast({ title: '播放失败，请重新录音', icon: 'none' })
    })
    
    this.recordContext.onEnded(() => {
      console.log('Record playback ended')
    })
    
    this.recordContext.play()
  },

  // Finish with praise
  finishLearn() {
    this.stopStudyTimer()
    this.stopAllAudio()
    
    const minutes = Math.max(1, Math.ceil(this.data.studySeconds / 60))
    const day = this.data.day
    const week = Math.ceil(day / 10)
    const stars = praiseUtil.getStarRating(this.data.studySeconds)
    const praise = praiseUtil.getRandomPraise()
    const encourage = praiseUtil.getWeeklyEncourage(week)
    const starStr = '⭐'.repeat(stars)
    
    // Save progress first
    this.saveProgress(day, minutes)
    
    wx.showModal({
      title: `${starStr}`,
      content: `🎉 ${praise}\n\n${encourage}\n\n今日学习 ${minutes} 分钟 | 第 ${day} 天`,
      confirmText: '打卡分享',
      cancelText: '返回首页',
      success: (res) => {
        if (res.confirm) {
          wx.navigateTo({
            url: `/pages/share/share?day=${day}&minutes=${minutes}&stars=${stars}&praise=${encodeURIComponent(praise)}`
          })
        } else {
          wx.switchTab({ url: '/pages/index/index' })
        }
      }
    })
  },

  async saveProgress(day, minutes) {
    const today = new Date().toISOString().slice(0, 10)
    
    if (!app.globalData.cloudReady) {
      const key = `mandarin-progress-${today}`
      wx.setStorageSync(key, { day, minutes, completed: true })
      return
    }
    
    try {
      await wx.cloud.callFunction({
        name: 'recordProgress',
        data: { day, minutes, completed: true }
      })
    } catch (e) {
      console.error('Save progress failed:', e)
    }
  }
})
