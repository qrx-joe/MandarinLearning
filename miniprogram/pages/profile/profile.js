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
    const savedNickname = wx.getStorageSync('nickname') || '学习者'
    const savedAvatar = wx.getStorageSync('avatarUrl') || ''
    const savedReminder = wx.getStorageSync('setting_reminderEnabled')
    const savedTime = wx.getStorageSync('setting_reminderTime')
    const savedSpeed = wx.getStorageSync('setting_defaultSpeed')
    const savedBound = wx.getStorageSync('family_bound')
    const savedBindCode = wx.getStorageSync('family_bind_code')

    this.setData({
      streakDays: 3,
      reminderEnabled: savedReminder !== '' ? savedReminder : true,
      reminderTime: savedTime || '20:00',
      defaultSpeed: savedSpeed || 0.8,
      familyBound: savedBound || false,
      bindCode: savedBindCode || '',
      useLocalMode: true,
      nickname: savedNickname,
      avatarUrl: savedAvatar
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
    wx.setStorageSync('family_bound', enabled)

    if (enabled && !this.data.bindCode) {
      this.generateBindCode()
    }
  },

  async generateBindCode() {
    // 本地模式：生成随机8位数字绑定码
    const code = Math.floor(10000000 + Math.random() * 90000000).toString()
    wx.setStorageSync('family_bind_code', code)
    this.setData({ bindCode: code })
    wx.showToast({ title: '绑定码已生成', icon: 'success' })

    // 云端模式作为备选
    if (app.globalData.cloudReady) {
      try {
        await wx.cloud.callFunction({ name: 'generateBindCode' })
      } catch (e) {
        console.log('云端绑定码同步失败')
      }
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
    const code = this.data.inputBindCode.trim()
    if (code.length !== 8) {
      wx.showToast({ title: '请输入8位绑定码', icon: 'none' })
      return
    }

    // 本地保存绑定关系
    wx.setStorageSync('family_bound', true)
    wx.setStorageSync('family_bound_to', {
      name: '家人',
      code: code,
      bindDate: new Date().toISOString().slice(0, 10)
    })
    this.setData({ bindCode: code, familyBound: true })
    wx.showToast({ title: '绑定成功', icon: 'success' })

    // 云端同步作为备选
    if (app.globalData.cloudReady) {
      try {
        await wx.cloud.callFunction({ name: 'bindFamily', data: { bindCode: code } })
      } catch (e) {
        console.log('云端绑定同步失败')
      }
    }
  },

  async saveSetting(key, value) {
    wx.setStorageSync(`setting_${key}`, value)

    if (app.globalData.cloudReady) {
      try {
        await wx.cloud.callFunction({
          name: 'updateProfile',
          data: { [key]: value }
        })
      } catch (e) {
        console.log('云端同步失败')
      }
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
          success: (mediaRes) => {
            const tempFilePath = mediaRes.tempFiles[0].tempFilePath
            const fs = wx.getFileSystemManager()

            try {
              const savedPath = fs.saveFileSync(tempFilePath)
              wx.setStorageSync('avatarUrl', savedPath)
              this.setData({ avatarUrl: savedPath })
              wx.showToast({ title: '头像已更新', icon: 'success' })
            } catch (e) {
              console.error('Save avatar failed:', e)
              wx.showToast({ title: '保存失败', icon: 'none' })
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
      success: (res) => {
        if (res.confirm && res.content && res.content.trim()) {
          const newName = res.content.trim().slice(0, 12)
          wx.setStorageSync('nickname', newName)
          this.setData({ nickname: newName })
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
    let clearedCount = 0
    try {
      const keys = wx.getStorageInfoSync().keys || []
      keys.forEach(key => {
        if (key.startsWith('mandarin-progress-')) {
          wx.removeStorageSync(key)
          clearedCount++
        }
      })
    } catch (e) {
      console.error('Clear local failed:', e)
    }

    if (app.globalData.cloudReady) {
      try {
        await wx.cloud.callFunction({ name: 'clearAllProgress' })
      } catch (e) {
        console.log('云端清除失败或不存在')
      }
    }

    wx.showToast({ title: `已清除 ${clearedCount} 条记录`, icon: 'success' })
    this.setData({ streakDays: 0 })
  }
})
