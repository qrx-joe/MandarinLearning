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
    useLocalMode: false,
    nickname: '学习者',
    avatarUrl: ''
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
        useLocalMode: true,
        nickname: '学习者',
        avatarUrl: ''
      })
      return
    }

    // 云环境已废弃，使用本地默认值
    this.setData({
      streakDays: 3,
      reminderEnabled: true,
      reminderTime: '20:00',
      defaultSpeed: 0.8,
      familyBound: false,
      bindCode: '',
      useLocalMode: true,
      nickname: '学习者',
      avatarUrl: ''
    })
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

  chooseAvatar() {
    wx.showActionSheet({
      itemList: ['拍照', '从相册选择'],
      success: (res) => {
        const sourceType = res.tapIndex === 0 ? ['camera'] : ['album']
        wx.chooseMedia({
          count: 1,
          mediaType: ['image'],
          sourceType,
          success: async (mediaRes) => {
            const tempFilePath = mediaRes.tempFiles[0].tempFilePath
            const cloudPath = `avatars/${Date.now()}_${Math.random().toString(36).slice(2)}.jpg`

            if (!app.globalData.cloudReady) {
              wx.showToast({ title: '本地模式不支持上传头像', icon: 'none' })
              return
            }

            try {
              wx.showLoading({ title: '上传中...' })
              const uploadRes = await wx.cloud.uploadFile({
                cloudPath,
                filePath: tempFilePath
              })

              this.setData({ avatarUrl: uploadRes.fileID })
              await this.saveSetting('avatarUrl', uploadRes.fileID)
              wx.showToast({ title: '头像已更新', icon: 'success' })
            } catch (e) {
              console.error('Upload avatar failed:', e)
              wx.showToast({ title: '上传失败', icon: 'none' })
            } finally {
              wx.hideLoading()
            }
          }
        })
      }
    })
  },

  editNickname() {
    wx.showModal({
      title: '修改昵称',
      content: this.data.nickname === '学习者' ? '' : this.data.nickname,
      editable: true,
      placeholderText: '请输入昵称',
      success: async (res) => {
        if (res.confirm && res.content && res.content.trim()) {
          const newName = res.content.trim().slice(0, 12)
          this.setData({ nickname: newName })
          await this.saveSetting('nickname', newName)
          wx.showToast({ title: '昵称已更新', icon: 'success' })
        }
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
