App({
  globalData: {
    userInfo: null,
    openid: null,
    streakDays: 0,
    todayDone: false,
    familyBound: false,
    familyOpenid: null,
    cloudReady: false
  },

  onLaunch() {
    // 云开发已关闭，使用本地模式
    this.globalData.cloudReady = false
    this.checkLoginStatus()
  },

  checkLoginStatus() {
    const openid = wx.getStorageSync('openid')
    if (openid) {
      this.globalData.openid = openid
    }
  }
})