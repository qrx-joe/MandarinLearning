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

    // 云环境已废弃，直接使用本地数据
    this.setData({
      familyInfo: {
        name: '妈妈',
        avatar: '',
        joinDate: '2024-01-01'
      },
      streakDays: 3,
      totalDays: 5,
      monthlyProgress: this.generateLocalMonthlyProgress(),
      recentRecords: [
        { date: '今天', day: 1, minutes: 12, completed: true },
        { date: '昨天', day: 2, minutes: 15, completed: true },
        { date: '前天', day: 3, minutes: 10, completed: true }
      ],
      isLoading: false,
      useLocalMode: true
    })
  },

  generateLocalMonthlyProgress() {
    const progress = []
    const daysInMonth = new Date().getDate()
    for (let i = 1; i <= daysInMonth; i++) {
      progress.push({
        day: i,
        completed: i <= 3,  // 前3天完成
        minutes: i <= 3 ? 15 : 0
      })
    }
    return progress
  },

  onPullDownRefresh() {
    this.loadDashboard().then(() => {
      wx.stopPullDownRefresh()
    })
  }
})
