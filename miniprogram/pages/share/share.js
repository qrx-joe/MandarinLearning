Page({
  data: {
    shareImagePath: '',
    streakDays: 0,
    day: 0,
    minutes: 0,
    praise: '',
    today: '',
    quote: '',
    isGenerating: true
  },

  onLoad(options) {
    const streak = parseInt(options.stars) || parseInt(options.streak) || 0
    const day = parseInt(options.day) || 0
    const minutes = parseInt(options.minutes) || 0
    const praise = decodeURIComponent(options.praise || '')
    const today = this.formatToday()
    const quote = this.getRandomQuote()

    this.setData({
      streakDays: streak,
      day,
      minutes,
      praise,
      today,
      quote
    })

    this.generateCard()
  },

  formatToday() {
    const d = new Date()
    const months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
    return `${months[d.getMonth()]}${d.getDate()}日`
  },

  getRandomQuote() {
    const quotes = [
      '每天十分钟，普通话越来越标准',
      '坚持是最美的声音',
      '今天的努力，明天的自信',
      '开口说，就是最好的练习',
      '一字一句，都是进步',
      '语言的力量，从练习开始',
      '今天的打卡，是明天的底气',
      '说好普通话，沟通更顺畅'
    ]
    return quotes[Math.floor(Math.random() * quotes.length)]
  },

  drawRoundRect(ctx, x, y, w, h, r) {
    ctx.beginPath()
    ctx.moveTo(x + r, y)
    ctx.lineTo(x + w - r, y)
    ctx.arc(x + w - r, y + r, r, -Math.PI / 2, 0)
    ctx.lineTo(x + w, y + h - r)
    ctx.arc(x + w - r, y + h - r, r, 0, Math.PI / 2)
    ctx.lineTo(x + r, y + h)
    ctx.arc(x + r, y + h - r, r, Math.PI / 2, Math.PI)
    ctx.lineTo(x, y + r)
    ctx.arc(x + r, y + r, r, Math.PI, -Math.PI / 2)
    ctx.closePath()
  },

  generateCard() {
    const ctx = wx.createCanvasContext('shareCanvas')
    const w = 375
    const h = 500

    // 背景
    const gradient = ctx.createLinearGradient(0, 0, w, h)
    gradient.addColorStop(0, '#FF8E8E')
    gradient.addColorStop(1, '#FF6B6B')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, w, h)

    // 装饰圆（放大，容纳文字）
    ctx.beginPath()
    ctx.arc(w / 2, 130, 85, 0, Math.PI * 2)
    ctx.fillStyle = 'rgba(255,255,255,0.15)'
    ctx.fill()

    // 顶部图标
    ctx.font = 'normal 40px sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText('🔥', w / 2, 105)

    // 连续天数
    ctx.fillStyle = 'white'
    ctx.font = 'bold 60px sans-serif'
    ctx.fillText(`${this.data.streakDays}`, w / 2, 148)

    ctx.font = 'normal 18px sans-serif'
    ctx.fillText('连续打卡天数', w / 2, 180)

    // 分隔线
    ctx.beginPath()
    ctx.moveTo(75, 240)
    ctx.lineTo(w - 75, 240)
    ctx.strokeStyle = 'rgba(255,255,255,0.4)'
    ctx.lineWidth = 1
    ctx.stroke()

    // 日期
    ctx.font = 'normal 20px sans-serif'
    ctx.fillText(this.data.today, w / 2, 280)

    // 完成标签
    this.drawRoundRect(ctx, w / 2 - 60, 305, 120, 35, 17)
    ctx.fillStyle = 'rgba(255,255,255,0.25)'
    ctx.fill()

    ctx.font = 'bold 16px sans-serif'
    ctx.fillStyle = 'white'
    ctx.fillText('今日已完成', w / 2, 328)

    // 底部引用
    ctx.font = 'normal 15px sans-serif'
    ctx.fillStyle = 'rgba(255,255,255,0.8)'
    ctx.fillText(`"${this.data.quote}"`, w / 2, 390)

    // 小程序标识
    ctx.font = 'normal 12px sans-serif'
    ctx.fillStyle = 'rgba(255,255,255,0.5)'
    ctx.fillText('暖声·向暖而行 · 每天十分钟', w / 2, 460)

    ctx.draw(false)

    setTimeout(() => {
      wx.canvasToTempFilePath({
        canvasId: 'shareCanvas',
        x: 0,
        y: 0,
        width: w,
        height: h,
        destWidth: w * 2,
        destHeight: h * 2,
        success: (res) => {
          this.setData({
            shareImagePath: res.tempFilePath,
            isGenerating: false
          })
        },
        fail: (err) => {
          console.error('canvas 导出失败:', err)
          this.setData({ isGenerating: false })
          wx.showToast({ title: '图片生成失败，请重试', icon: 'none' })
        }
      })
    }, 300)
  },

  saveImage() {
    if (!this.data.shareImagePath) return
    
    wx.saveImageToPhotosAlbum({
      filePath: this.data.shareImagePath,
      success: () => {
        wx.showToast({ title: '已保存到相册', icon: 'success' })
      },
      fail: () => {
        wx.showToast({ title: '保存失败', icon: 'none' })
      }
    })
  },

  shareToFriend() {
    // 需要用户点击右上角分享按钮
    wx.showModal({
      title: '提示',
      content: '点击右上角「···」按钮，选择「发送给朋友」即可分享',
      showCancel: false
    })
  },

  onShareAppMessage() {
    return {
      title: `我已经连续打卡${this.data.streakDays}天！一起学普通话吧~`,
      path: '/pages/index/index',
      imageUrl: this.data.shareImagePath
    }
  }
})
