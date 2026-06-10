Page({
  data: {
    greeting: '',
    todayDate: '',
    dayIndex: 1,
    streakDays: 0,
    todayDone: false,
    todayMinutes: 0,
    totalDays: 0,
    progressPercent: 0,
    dailyContent: { title: '' },
    currentWeek: 1,
    weeklyTheme: { name: '', desc: '' },
    isLoading: true,
    useLocalMode: true
  },

  onLoad() {
    this.loadData()
  },

  onShow() {
    this.loadData()
  },

  async loadData() {
    this.setData({ isLoading: true })
    this.loadLocalData()
  },

  loadLocalData() {
    const today = new Date()
    const day = this.getTodayDay()
    const todayStr = this.formatDate(today)

    const todayRecord = wx.getStorageSync(`mandarin-progress-${todayStr}`)
    const isDone = !!(todayRecord && todayRecord.completed)
    const streak = this.calcStreakFromLocal()
    const total = this.calcTotalDaysFromLocal()

    const week = Math.ceil(day / 10)
    const weekThemes = [
      { name: '基础发音', desc: '从最简单的声母韵母开始，打好普通话基础' },
      { name: '日常用语', desc: '学习生活中最常用的句子，每天练习就能开口说' },
      { name: '情境对话', desc: '在模拟场景中练习，让普通话更自然流畅' },
      { name: '流利表达', desc: '挑战更复杂的表达，让普通话成为习惯' },
      { name: '综合运用', desc: '融会贯通，自信地用普通话交流' }
    ]
    const theme = weekThemes[Math.min(week, 5) - 1] || weekThemes[0]

    this.setData({
      greeting: this.getGreeting(today.getHours()),
      todayDate: `${today.getMonth() + 1}月${today.getDate()}日`,
      dayIndex: day,
      streakDays: streak,
      todayDone: isDone,
      todayMinutes: isDone ? (todayRecord.minutes || 0) : 0,
      totalDays: total,
      progressPercent: isDone ? 100 : 0,
      dailyContent: { title: `第 ${day} 天 · ${theme.name}` },
      currentWeek: week,
      weeklyTheme: theme,
      isLoading: false,
      useLocalMode: true
    })
  },

  getGreeting(hour) {
    if (hour < 12) return '早上好，开启今天的学习吧'
    if (hour < 18) return '下午好，继续加油'
    return '晚上好，温故而知新'
  },

  formatDate(d) {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
  },

  calcStreakFromLocal() {
    let streak = 0
    const today = new Date()
    for (let i = 0; i < 50; i++) {
      const d = new Date(today)
      d.setDate(d.getDate() - i)
      const str = this.formatDate(d)
      const record = wx.getStorageSync(`mandarin-progress-${str}`)
      if (record && record.completed) {
        streak++
      } else if (i > 0) {
        break
      }
    }
    return streak
  },

  calcTotalDaysFromLocal() {
    let total = 0
    try {
      const keys = wx.getStorageInfoSync().keys || []
      keys.forEach(key => {
        if (key.startsWith('mandarin-progress-')) {
          const record = wx.getStorageSync(key)
          if (record && record.completed) total++
        }
      })
    } catch (e) {
      console.error('calcTotalDays failed:', e)
    }
    return total
  },

  getTodayDay() {
    let startStr = wx.getStorageSync('user_start_date')
    if (!startStr) {
      startStr = new Date().toISOString().slice(0, 10)
      wx.setStorageSync('user_start_date', startStr)
    }
    const start = new Date(startStr)
    const today = new Date()
    const diff = Math.floor((today - start) / (1000 * 60 * 60 * 24))
    return (diff % 50) + 1
  },

  startLearning() {
    wx.navigateTo({
      url: `/pages/learn/learn?day=${this.data.dayIndex}`
    })
  },

  reviewToday() {
    wx.navigateTo({
      url: `/pages/learn/learn?day=${this.data.dayIndex}&review=true`
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
      url: `/pages/learn/learn?day=${this.data.dayIndex}&review=true`
    })
  }
})
