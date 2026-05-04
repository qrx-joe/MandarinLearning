# 暖声·向暖而行

普通话学习微信小程序，面向中老年用户，提供每日学习内容、语音练习、打卡统计和家庭关怀功能。

## 功能特性

- **每日学习**：50天循环学习周期，每天提供普通话练习内容
- **语音评测**：录音对比功能，辅助纠正发音
- **打卡统计**：日历视图展示学习记录，连续打卡提醒
- **家庭绑定**：家人可绑定账号，查看学习进度
- **数据恢复**：支持清除并重新开始学习进度

## 项目结构

```
mandarin_app_v2_ui_elder/
├── miniprogram/                  # 小程序主目录
│   ├── pages/                    # 页面
│   │   ├── index/                # 首页（今日学习）
│   │   ├── learn/                # 学习页
│   │   ├── calendar/             # 打卡日历
│   │   ├── dashboard/            # 数据看板
│   │   ├── profile/              # 个人中心
│   │   └── share/                # 分享页
│   ├── cloudfunctions/           # 云函数
│   │   ├── login/                # 登录
│   │   ├── getDailyContent/      # 获取每日内容
│   │   ├── recordProgress/       # 记录学习进度
│   │   ├── getCalendar/          # 获取日历数据
│   │   ├── bindFamily/           # 绑定家人
│   │   ├── generateBindCode/     # 生成绑定码
│   │   ├── getFamilyDashboard/   # 家人看板
│   │   ├── sendFamilyReminder/   # 发送家人提醒
│   │   ├── userProfile/          # 用户资料
│   │   ├── clearAllProgress/     # 清除进度
│   │   └── updateProfile/        # 更新资料
│   ├── data/                     # 学习内容数据
│   ├── utils/                    # 工具函数
│   ├── images/                   # 静态资源
│   ├── app.json                  # 应用配置
│   ├── app.wxss                  # 全局样式
│   └── sitemap.json              # SEO配置
├── project.config.json           # 项目配置
└── project.private.config.json    # 私有配置（敏感）
```

## 云函数列表

| 云函数 | 功能 |
|--------|------|
| `login` | 用户登录 |
| `getDailyContent` | 获取每日学习内容 |
| `recordProgress` | 记录学习进度 |
| `getCalendar` | 获取日历打卡数据 |
| `bindFamily` | 绑定家人账号 |
| `generateBindCode` | 生成家人绑定码 |
| `getFamilyDashboard` | 获取家人学习看板 |
| `sendFamilyReminder` | 发送家人提醒 |
| `userProfile` | 获取用户资料 |
| `updateProfile` | 更新用户资料 |
| `clearAllProgress` | 清除所有学习进度 |

## 本地开发

### 环境要求

- [微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)
- Node.js >= 16

### 部署步骤

1. 克隆项目后在微信开发者工具中导入 `miniprogram` 目录

2. 安装云函数依赖
   ```bash
   cd miniprogram/cloudfunctions/<function-name>
   npm install
   ```

3. 在微信开发者工具中右键云函数目录，选择「上传并部署」

4. 配置云开发环境（需在微信公众平台开通云开发）

### 调试模式

首页支持本地预览模式，当云开发未初始化时会自动切换到本地模拟数据，方便本地调试。

## 技术栈

- **前端**：微信小程序 WXML/WXSS/JS
- **后端**：微信云开发（云函数、数据库、存储）
- **TTS**：微信云开发语音合成

## 页面说明

### 首页 (index)
展示今日学习内容、连续打卡天数、学习进度百分比。可直接进入学习或回顾。

### 学习页 (learn)
显示当天学习内容，包含文字学习和录音对比功能。支持复习模式。

### 打卡页 (calendar)
日历视图显示历史打卡情况，标记已完成的学习日。

### 看板页 (dashboard)
数据统计页面，展示学习数据和进度图表。

### 我的 (profile)
个人中心，包含用户资料修改、家人绑定、清除进度等功能。

## 注意事项

- 学习周期为50天循环
- 家庭绑定功能用于家人间互相查看学习进度
- 部分功能需要录音权限
- 本地调试模式可直接预览，无需部署云函数
