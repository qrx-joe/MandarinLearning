const app = getApp()

Page({
  data: {
    streakDays: 0,
    reminderEnabled: true,
    reminderTime: '20:00',
    defaultSpeed: 0.8,
    familyBound: false,
    bindCode: '',
    inputBindCode: '',
    useLocalMode: false
  },

  onLoad() {
    this.loadProfile()
  },

  async loadProfile() {
    // 检查云开发是否可用
    if (!app.globalData.cloudReady) {
      this.setData({
        streakDays: 3,
        reminderEnabled: true,
        reminderTime: '20:00',
        defaultSpeed: 0.8,
        familyBound: false,
        bindCode: '',
        useLocalMode: true
      })
      return
    }

    try {
      const res = await wx.cloud.callFunction({
        name: 'userProfile'
      })
      const data = res.result || {}
      this.setData({
        streakDays: data.streakDays || 0,
        reminderEnabled: data.reminderEnabled !== false,
        reminderTime: data.reminderTime || '20:00',
        defaultSpeed: data.defaultSpeed || 0.8,
        familyBound: !!data.bindCode || !!data.boundTo,
        bindCode: data.bindCode || '',
        useLocalMode: false
      })
    } catch (e) {
      console.error('Profile load failed:', e)
      // Use local defaults
      this.setData({
        streakDays: 3,
        useLocalMode: true
      })
    }
  },

  toggleReminder(e) {
    const enabled = e.detail.value
    this.setData({ reminderEnabled: enabled })
    this.saveSetting('reminderEnabled', enabled)
    
    if (enabled) {
      this.requestSubscribeMessage()
    }
  },

  setReminderTime(e) {
    const time = e.detail.value
    this.setData({ reminderTime: time })
    this.saveSetting('reminderTime', time)
  },

  setDefaultSpeed(e) {
    const speed = parseFloat(e.currentTarget.dataset.speed)
    this.setData({ defaultSpeed: speed })
    this.saveSetting('defaultSpeed', speed)
    wx.showToast({ title: '已保存', icon: 'success' })
  },

  toggleFamily(e) {
    const enabled = e.detail.value
    this.setData({ familyBound: enabled })
    
    if (enabled && !this.data.bindCode) {
      this.generateBindCode()
    }
  },

  async generateBindCode() {
    if (!app.globalData.cloudReady) {
      wx.showToast({ title: '本地模式不支持绑定', icon: 'none' })
      return
    }

    try {
      const res = await wx.cloud.callFunction({
        name: 'generateBindCode'
      })
      const code = res.result?.code || ''
      this.setData({ bindCode: code })
    } catch (e) {
      console.error('Generate code failed:', e)
      wx.showToast({ title: '生成失败', icon: 'none' })
    }
  },

  copyCode() {
    wx.setClipboardData({
      data: this.data.bindCode,
      success: () => {
        wx.showToast({ title: '已复制', icon: 'success' })
      }
    })
  },

  onBindCodeInput(e) {
    this.setData({ inputBindCode: e.detail.value })
  },

  async submitBindCode() {
    if (!app.globalData.cloudReady) {
      wx.showToast({ title: '本地模式不支持绑定', icon: 'none' })
      return
    }

    const code = this.data.inputBindCode.trim()
    if (code.length !== 8) {
      wx.showToast({ title: '请输入8位绑定码', icon: 'none' })
      return
    }
    
    try {
      await wx.cloud.callFunction({
        name: 'bindFamily',
        data: { bindCode: code }
      })
      wx.showToast({ title: '绑定成功', icon: 'success' })
      this.setData({ bindCode: code, familyBound: true })
    } catch (e) {
      console.error('Bind failed:', e)
      wx.showToast({ title: '绑定失败，请检查绑定码', icon: 'none' })
    }
  },

  async saveSetting(key, value) {
    if (!app.globalData.cloudReady) {
      wx.showToast({ title: '本地模式不保存设置', icon: 'none' })
      return
    }

    try {
      await wx.cloud.callFunction({
        name: 'updateProfile',
        data: { [key]: value }
      })
    } catch (e) {
      console.error('Save setting failed:', e)
    }
  },

  requestSubscribeMessage() {
    wx.requestSubscribeMessage({
      tmplIds: ['YOUR_TEMPLATE_ID_1'], // Replace with actual template ID
      success: (res) => {
        console.log('Subscribe success:', res)
      },
      fail: (err) => {
        console.error('Subscribe failed:', err)
      }
    })
  },

  showClearConfirm() {
    wx.showModal({
      title: '确认清除',
      content: '这将删除所有学习记录和打卡数据，不可恢复。确定吗？',
      confirmColor: '#FF4444',
      success: (res) => {
        if (res.confirm) {
          this.clearAllData()
        }
      }
    })
  },

  async clearAllData() {
    if (!app.globalData.cloudReady) {
      wx.showToast({ title: '本地模式无数据可清除', icon: 'none' })
      return
    }

    try {
      await wx.cloud.callFunction({
        name: 'clearAllProgress'
      })
      wx.showToast({ title: '已清除', icon: 'success' })
      this.setData({ streakDays: 0 })
    } catch (e) {
      console.error('Clear failed:', e)
      wx.showToast({ title: '清除失败', icon: 'none' })
    }
  }
})
