const app = getApp()

Page({
  data: {
    familyInfo: {
      name: '妈妈',
      avatar: '',
      joinDate: '2024-01-01'
    },
    streakDays: 0,
    totalDays: 0,
    monthlyProgress: [],
    recentRecords: [],
    isLoading: true,
    useLocalMode: false
  },

  onLoad() {
    this.loadDashboard()
  },

  async loadDashboard() {
    this.setData({ isLoading: true })

    const keys = wx.getStorageInfoSync().keys || []
    const records = []

    keys.forEach(key => {
      if (key.startsWith('mandarin-progress-')) {
        const record = wx.getStorageSync(key)
        if (record && record.completed) {
          records.push({ ...record, date: key.replace('mandarin-progress-', '') })
        }
      }
    })

    records.sort((a, b) => new Date(b.date) - new Date(a.date))

    const totalDays = records.length
    const streakDays = this.calcStreak(records)
    const monthlyProgress = this.generateMonthlyProgress(records)
    const recentRecords = records.slice(0, 7).map(r => ({
      date: this.formatRelativeDate(r.date),
      day: r.day,
      minutes: r.minutes,
      completed: true
    }))

    this.setData({
      familyInfo: {
        name: '妈妈',
        avatar: '',
        joinDate: '2024-01-01'
      },
      streakDays,
      totalDays,
      monthlyProgress,
      recentRecords,
      isLoading: false,
      useLocalMode: true
    })
  },

  calcStreak(records) {
    let streak = 0
    const today = new Date()
    for (let i = 0; i < 50; i++) {
      const d = new Date(today)
      d.setDate(d.getDate() - i)
      const str = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
      const hasRecord = records.some(r => r.date === str)
      if (hasRecord) {
        streak++
      } else if (i > 0) {
        break
      }
    }
    return streak
  },

  generateMonthlyProgress(records) {
    const progress = []
    const now = new Date()
    const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate()
    const yearMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`

    for (let i = 1; i <= daysInMonth; i++) {
      const dateStr = `${yearMonth}-${String(i).padStart(2, '0')}`
      const record = records.find(r => r.date === dateStr)
      progress.push({
        day: i,
        completed: !!(record && record.completed),
        minutes: record ? record.minutes : 0
      })
    }
    return progress
  },

  formatRelativeDate(dateStr) {
    const today = new Date().toISOString().slice(0, 10)
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10)
    if (dateStr === today) return '今天'
    if (dateStr === yesterday) return '昨天'
    return dateStr.slice(5).replace('-', '月') + '日'
  },

  onPullDownRefresh() {
    this.loadDashboard().then(() => {
      wx.stopPullDownRefresh()
    })
  }
})
