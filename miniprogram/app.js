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
    // 开启云开发
    if (wx.cloud) {
      wx.cloud.init({
        env: 'mandarin-app-v2-8gby81rpf2d67f6b',  // 你的云环境ID
        traceUser: true
      })
      this.globalData.cloudReady = true
    }
    console.log('App launched, cloudReady:', this.globalData.cloudReady)
    this.checkLoginStatus()
  },

  checkLoginStatus() {
    const openid = wx.getStorageSync('openid')
    if (openid) {
      this.globalData.openid = openid
    }
  }
})