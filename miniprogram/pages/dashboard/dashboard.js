const app = getApp()

Page({
  data: {
    boundUser: null,
    missedDays: 0,
    weekDays: [],
    weeklyCompleted: 0,
    streakDays: 0,
    totalDays: 0,
    monthlyProgress: [],
    monthlyStats: [],
    recentRecords: [],
    isLoading: true,
    useLocalMode: false
  },

  onLoad() {
    this.loadDashboard()
  },

  async loadDashboard() {
    this.setData({ isLoading: true })

    const records = this.getLocalRecords()
    records.sort((a, b) => new Date(b.date) - new Date(a.date))

    const totalDays = records.length
    const streakDays = this.calcStreak(records)
    const missedDays = this.calcMissedDays(records)
    const weekData = this.generateWeekDays(records)
    const monthlyProgress = this.generateMonthlyProgress(records)
    const monthlyStats = this.generateMonthlyStats(records)
    const recentRecords = records.slice(0, 7).map(r => ({
      date: this.formatRelativeDate(r.date),
      day: r.day,
      minutes: r.minutes,
      segmentsCompleted: 3,
      completed: true
    }))

    // 读取本地绑定的家人信息
    const boundTo = wx.getStorageSync('family_bound_to')
    const boundUser = boundTo ? {
      nickName: boundTo.name || '家人',
      streakDays,
      totalDays
    } : null

    this.setData({
      boundUser,
      missedDays,
      weekDays: weekData.days,
      weeklyCompleted: weekData.completed,
      streakDays,
      totalDays,
      monthlyProgress,
      monthlyStats,
      recentRecords,
      isLoading: false,
      useLocalMode: true
    })
  },

  getLocalRecords() {
    const records = []
    try {
      const keys = wx.getStorageInfoSync().keys || []
      keys.forEach(key => {
        if (key.startsWith('mandarin-progress-')) {
          const record = wx.getStorageSync(key)
          if (record && record.completed) {
            records.push({ ...record, date: key.replace('mandarin-progress-', '') })
          }
        }
      })
    } catch (e) {
      console.error('getLocalRecords failed:', e)
    }
    return records
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

  calcMissedDays(records) {
    let missed = 0
    const today = new Date()
    for (let i = 1; i < 30; i++) {
      const d = new Date(today)
      d.setDate(d.getDate() - i)
      const str = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
      const hasRecord = records.some(r => r.date === str)
      if (!hasRecord) {
        missed++
      } else {
        break
      }
    }
    return missed
  },

  generateWeekDays(records) {
    const days = []
    const today = new Date()
    const weekdayNames = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
    let completed = 0

    for (let i = 6; i >= 0; i--) {
      const d = new Date(today)
      d.setDate(d.getDate() - i)
      const str = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
      const hasRecord = records.some(r => r.date === str)
      if (hasRecord) completed++

      days.push({
        label: i === 0 ? '今天' : weekdayNames[d.getDay()],
        completed: hasRecord,
        isToday: i === 0,
        date: str
      })
    }

    return { days, completed }
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

  generateMonthlyStats(records) {
    const stats = []
    const now = new Date()

    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
      const yearMonth = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
      const monthLabel = `${d.getMonth() + 1}月`

      const monthRecords = records.filter(r => r.date.startsWith(yearMonth))
      const completedDays = monthRecords.length
      const daysInMonth = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate()
      const percentage = daysInMonth > 0 ? (completedDays / daysInMonth) * 100 : 0

      stats.push({
        month: monthLabel,
        completedDays,
        percentage: Math.min(percentage, 100)
      })
    }

    return stats
  },

  formatRelativeDate(dateStr) {
    const today = new Date().toISOString().slice(0, 10)
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10)
    if (dateStr === today) return '今天'
    if (dateStr === yesterday) return '昨天'
    return dateStr.slice(5).replace('-', '月') + '日'
  },

  sendReminder() {
    wx.showModal({
      title: '提醒家人',
      content: '已发送学习提醒（模拟）',
      showCancel: false
    })
  },

  onPullDownRefresh() {
    this.loadDashboard().then(() => {
      wx.stopPullDownRefresh()
    })
  }
})
