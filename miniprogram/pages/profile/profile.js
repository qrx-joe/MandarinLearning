const app = getApp()

Page({
  data: {
    streakDays: 0,
    reminderEnabled: true,
    reminderTime: '20:00',
    defaultSpeed: 0.8,
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
    this.setData({
      streakDays: 3,
      reminderEnabled: savedReminder !== '' ? savedReminder : true,
      reminderTime: savedTime || '20:00',
      defaultSpeed: savedSpeed || 0.8,
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
