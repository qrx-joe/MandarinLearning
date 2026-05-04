Page({
  data: {
    todayDay: 1,
    streakDays: 0,
    isLearned: false,
    progressPercent: 0,
    isLoading: true,
    useLocalMode: false  // 本地调试模式标记
  },

  onLoad() {
    this.loadData()
  },

  onShow() {
    this.loadData()
  },

  async loadData() {
    const app = getApp()
    this.setData({ isLoading: true })
    
    // 云开发环境已废弃，直接使用本地模式
    this.loadLocalData()
  },

  loadLocalData() {
    // 本地调试模式：显示模拟数据，不依赖云开发
    const today = this.getTodayDay()
    
    this.setData({
      todayDay: today,
      streakDays: 3,  // 模拟连续3天
      isLearned: false,
      progressPercent: 0,
      isLoading: false,
      useLocalMode: true
    })
    
    wx.showToast({
      title: '本地预览模式',
      icon: 'none',
      duration: 2000
    })
  },

  getTodayDay() {
    const start = new Date('2024-01-01')
    const today = new Date()
    const diff = Math.floor((today - start) / (1000 * 60 * 60 * 24))
    return (diff % 50) + 1
  },

  startLearning() {
    wx.navigateTo({
      url: `/pages/learn/learn?day=${this.data.todayDay}`
    })
  },

  reviewToday() {
    wx.navigateTo({
      url: `/pages/learn/learn?day=${this.data.todayDay}&review=true`
    })
  },

  goCalendar() {
    wx.switchTab({
      url: '/pages/calendar/calendar'
    })
  },

  goDashboard() {
    wx.navigateTo({
      url: '/pages/dashboard/dashboard'
    })
  },

  goSettings() {
    wx.switchTab({
      url: '/pages/profile/profile'
    })
  },

  continueLearn() {
    wx.navigateTo({
      url: `/pages/learn/learn?day=${this.data.todayDay}&review=true`
    })
  }
})