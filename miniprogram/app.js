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
    // v2.0 体验版：本地模式，不依赖云开发
    // 如需开启云开发，取消下面注释并填入真实 env
    /*
    if (wx.cloud) {
      wx.cloud.init({
        env: '你的云环境ID',
        traceUser: true
      })
      this.globalData.cloudReady = true
    }
    */
    console.log('Running in local mode. Cloud features disabled.')
    this.checkLoginStatus()
  },

  checkLoginStatus() {
    const openid = wx.getStorageSync('openid')
    if (openid) {
      this.globalData.openid = openid
    }
  }
})