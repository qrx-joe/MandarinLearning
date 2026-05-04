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
    if (wx.cloud) {
      wx.cloud.init({
        env: 'mandarin-app-v2-8gby81rpf2d67f6b',
        traceUser: true
      })

      // 探测云环境是否真正可用
      wx.cloud.callFunction({
        name: 'login',
        success: (res) => {
          this.globalData.cloudReady = true
          console.log('✅ 云开发环境正常，openid:', res.result.openid)
          if (res.result.openid) {
            wx.setStorageSync('openid', res.result.openid)
            this.globalData.openid = res.result.openid
          }
        },
        fail: (err) => {
          this.globalData.cloudReady = false
          console.error('❌ 云开发环境不可用:', err.errMsg || err.message)
          wx.showModal({
            title: '云开发提示',
            content: '当前云环境未开通或环境ID错误，已自动切换为本地模式。学习数据将保存在本机。',
            showCancel: false
          })
        }
      })
    } else {
      this.globalData.cloudReady = false
      console.log('❌ 当前基础库不支持云开发')
    }

    this.checkLoginStatus()
  },

  checkLoginStatus() {
    const openid = wx.getStorageSync('openid')
    if (openid) {
      this.globalData.openid = openid
    }
  }
})