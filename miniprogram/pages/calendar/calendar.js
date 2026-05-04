const app = getApp()

Page({
  data: {
    currentMonth: '',
    monthStats: {
      completed: 0,
      streak: 0,
      total: 0
    },
    weekdays: ['日', '一', '二', '三', '四', '五', '六'],
    days: [],
    todayStatus: null,
    historyList: [],
    isLoading: true
  },

  onLoad() {
    this.loadCalendarData()
  },

  onShow() {
    this.loadCalendarData()
  },

  async loadCalendarData() {
    this.setData({ isLoading: true })
    
    const now = new Date()
    const year = now.getFullYear()
    const month = now.getMonth() + 1
    const todayStr = this.formatDate(now)
    
    // 云环境已废弃，直接从本地读取
    const records = this.getLocalRecords(year, month)
    const streakDays = this.calcLocalStreak(records)
    
    this.renderCalendar(year, month, records, todayStr, streakDays)
    this.setData({ isLoading: false })
  },

  getLocalRecords(year, month) {
    const records = []
    const daysInMonth = new Date(year, month, 0).getDate()
    
    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = `${year}-${String(month).padStart(2,'0')}-${String(d).padStart(2,'0')}`
      const stored = wx.getStorageSync(`mandarin-progress-${dateStr}`)
      if (stored && stored.completed) {
        records.push({
          date: dateStr,
          completed: true,
          minutes: stored.minutes || 10
        })
      }
    }
    
    return records
  },

  calcLocalStreak(records) {
    let streak = 0
    const today = new Date()
    for (let i = 0; i < 30; i++) {
      const d = new Date(today)
      d.setDate(d.getDate() - i)
      const str = this.formatDate(d)
      const hasRecord = records.some(r => r.date === str && r.completed)
      if (hasRecord) {
        streak++
      } else if (i > 0) {
        break
      }
    }
    return streak
  },

  renderCalendar(year, month, records, todayStr, streakDays) {
    const firstDay = new Date(year, month - 1, 1).getDay()
    const daysInMonth = new Date(year, month, 0).getDate()
    const today = new Date()
    const isCurrentMonth = today.getFullYear() === year && today.getMonth() + 1 === month
    
    const days = []
    const historyList = []
    let completedCount = 0
    
    // Empty slots before 1st
    for (let i = 0; i < firstDay; i++) {
      days.push({ empty: true, date: `empty-${i}`, day: '', status: '' })
    }
    
    // Calendar days
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${String(month).padStart(2,'0')}-${String(day).padStart(2,'0')}`
      const record = records.find(r => r.date === dateStr)
      const isToday = isCurrentMonth && today.getDate() === day
      const completed = !!(record && record.completed)
      const isPast = isCurrentMonth && !isToday && day < today.getDate()
      
      if (completed) completedCount++
      
      let status = ''
      if (completed) status = 'done'
      else if (isPast && !isCurrentMonth) status = 'missed'
      else if (isPast) status = 'missed'
      
      days.push({
        day,
        date: dateStr,
        status,
        isToday,
        empty: false
      })
      
      // Build history list
      historyList.push({
        date: `${month}月${day}日`,
        weekday: this.getWeekdayName(new Date(year, month - 1, day)),
        done: completed,
        minutes: record ? record.minutes : 0
      })
    }
    
    // Today status
    const todayRecord = records.find(r => r.date === todayStr)
    const todayStatus = {
      done: !!(todayRecord && todayRecord.completed),
      minutes: todayRecord ? todayRecord.minutes : 0,
      segments: 3
    }
    
    console.log('[calendar] firstDay:', firstDay, 'days.length:', days.length)
    console.log('[calendar] days[0-7]:', days.slice(0, 7))

    this.setData({
      currentMonth: `${year}年${month}月`,
      monthStats: {
        completed: completedCount,
        streak: streakDays,
        total: daysInMonth
      },
      days,
      todayStatus,
      historyList: historyList.reverse()
    })
  },

  formatDate(d) {
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`
  },

  getWeekdayName(d) {
    const names = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
    return names[d.getDay()]
  },

  goLearn() {
    let startStr = wx.getStorageSync('user_start_date')
    if (!startStr) {
      startStr = new Date().toISOString().slice(0, 10)
      wx.setStorageSync('user_start_date', startStr)
    }
    const start = new Date(startStr)
    const today = new Date()
    const diff = Math.floor((today - start) / (1000 * 60 * 60 * 24))
    const day = (diff % 50) + 1
    wx.navigateTo({
      url: `/pages/learn/learn?day=${day}`
    })
  }
})
