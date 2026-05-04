# 暖声·向暖而行

普通话学习微信小程序,面向中老年用户。50 天系统化课程,每天 10 分钟,通过"热身→核心→挑战"三段式学习,帮助用户纠正方言发音、建立普通话自信。

## 功能特性

- **三段式学习**: 每天课程分为热身(2分钟/慢速 0.8x)、核心(5分钟/常速 1.0x)、挑战(3分钟/快速 1.2x)三个环节,循序渐进
- **真人标准音频**: 所有内容由 edge-tts 预合成标准普通话音频,通过 jsDelivr CDN 分发,首次加载后本地缓存秒播
- **录音对比**: 支持录制自己的发音并与标准音频对比回听,辅助纠正发音
- **打卡日历**: 日历视图直观展示历史学习记录,标记已完成的学习日
- **学习看板**: 数据统计页面,展示连续打卡天数、总学习天数、周进度、月度统计等
- **家庭绑定**: 家人可绑定账号,远程查看学习进度并发送鼓励
- **分享成果**: 生成学习打卡海报,分享到朋友圈或发送给家人
- **数据恢复**: 支持清除并重新开始学习进度
- **离线可用**: 云开发不可用时自动切换本地模式,学习数据保存在本机,不影响正常使用

## 项目结构

```
mandarin_app_v2_ui_elder/
├── miniprogram/                  # 小程序主目录
│   ├── pages/                    # 页面
│   │   ├── index/                # 首页(今日学习、课程入口)
│   │   ├── learn/                # 学习页(三段式课程学习)
│   │   ├── calendar/             # 打卡日历
│   │   ├── dashboard/            # 数据看板(学习统计)
│   │   ├── profile/              # 个人中心(资料、家人绑定、设置)
│   │   └── share/                # 分享页(生成打卡海报)
│   ├── cloudfunctions/           # 云函数
│   │   ├── login/                # 用户登录
│   │   ├── getDailyContent/      # 获取每日内容
│   │   ├── recordProgress/       # 记录学习进度
│   │   ├── getCalendar/          # 获取日历数据
│   │   ├── bindFamily/           # 绑定家人账号
│   │   ├── generateBindCode/     # 生成家人绑定码
│   │   ├── getFamilyDashboard/   # 家人看板
│   │   ├── sendFamilyReminder/   # 发送家人提醒
│   │   ├── userProfile/          # 获取用户资料
│   │   ├── updateProfile/        # 更新用户资料
│   │   └── clearAllProgress/     # 清除进度
│   ├── data/                     # 学习内容数据
│   │   └── contents.js           # 50天课程数据(含音频URL)
│   ├── utils/                    # 工具函数
│   ├── images/                   # 静态资源
│   ├── audio-pkg-a/              # 音频目录: Week 1-2
│   ├── audio-pkg-b/              # 音频目录: Week 3-4
│   ├── audio-pkg-c/              # 音频目录: Week 5-6
│   ├── audio-pkg-d/              # 音频目录: Week 7-10
│   ├── app.js                    # 应用入口(云开发初始化)
│   ├── app.json                  # 应用配置
│   ├── app.wxss                  # 全局样式
│   └── sitemap.json              # SEO配置
├── scripts/tts-generator/        # 音频生成工具链
│   ├── generate_all.py           # 全量生成 mp3(edge-tts)
│   ├── migrate_audio.py          # 按周分组移入音频目录
│   ├── patch_contents.js         # 自动注入 audioUrl 到 contents.js
│   ├── dump_contents.js          # 提取 contents.js 中所有文本
│   └── pyproject.toml            # uv 依赖配置
├── project.config.json           # 项目配置
└── project.private.config.json   # 私有配置(敏感)
```

## 云函数列表

| 云函数 | 功能 |
|--------|------|
| `login` | 用户登录,获取 openid |
| `getDailyContent` | 获取每日学习内容 |
| `recordProgress` | 记录学习进度到数据库 |
| `getCalendar` | 获取日历打卡数据 |
| `bindFamily` | 绑定家人账号 |
| `generateBindCode` | 生成家人绑定码 |
| `getFamilyDashboard` | 获取家人学习看板 |
| `sendFamilyReminder` | 发送家人提醒消息 |
| `userProfile` | 获取用户资料 |
| `updateProfile` | 更新用户资料(昵称、头像) |
| `clearAllProgress` | 清除所有学习进度 |

## 音频架构

### 演进路线

项目 TTS 经历了三次迭代:

1. **微信云开发 TTS** → 受限于并发和稳定性,已移除
2. **百度 TTS** → 需要服务端密钥管理,已移除
3. **edge-tts 预生成 + jsDelivr CDN + 本地缓存** → 当前方案

### 当前方案

- **预生成**: 使用 Microsoft Edge TTS(`zh-CN-XiaoxiaoNeural`) 在本地批量生成所有音频
- **CDN 托管**: 音频文件托管在 jsDelivr CDN(`cdn.jsdelivr.net/gh/qrx-joe/MandarinLearning`),全球加速
- **本地缓存**: 首次从 CDN 下载后写入微信本地文件系统(`wx.env.USER_DATA_PATH`),后续播放直接读取缓存,实现秒播

### 音频目录分组

源码中音频文件按周组织在 4 个目录中,对应 jsDelivr CDN 路径:

| 目录 | 周次 | CDN 路径前缀 |
|------|------|-------------|
| `audio-pkg-a` | Week 1-2 | `/audio-pkg-a/` |
| `audio-pkg-b` | Week 3-4 | `/audio-pkg-b/` |
| `audio-pkg-c` | Week 5-6 | `/audio-pkg-c/` |
| `audio-pkg-d` | Week 7-10 | `/audio-pkg-d/` |

### 生成新音频

```bash
cd scripts/tts-generator

# 1. 安装依赖(使用 uv)
uv sync

# 2. 生成全部 mp3(支持断点续传)
uv run python generate_all.py

# 3. 按周分组移入音频目录,并自动更新 contents.js
uv run python migrate_audio.py
```

## 本地开发

### 环境要求

- [微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)
- Node.js >= 16
- Python >= 3.13(仅用于 TTS 生成)
- [uv](https://docs.astral.sh/uv/)(Python 包管理)

### 部署步骤

1. 克隆项目后在微信开发者工具中导入项目根目录

2. 安装云函数依赖
   ```bash
   cd miniprogram/cloudfunctions/<function-name>
   npm install
   ```

3. 在微信开发者工具中右键云函数目录,选择「上传并部署」

4. 配置云开发环境(需在微信公众平台开通云开发),或在 `app.js` 中调整环境 ID

### 调试模式

云开发未初始化或不可用时,小程序自动切换为本地模式:
- 学习数据保存在 `wx.getStorageSync` 中
- 音频首次从 CDN 下载后本地缓存
- 无需部署云函数即可完整体验所有功能

切换本地模式时会有弹窗提示:「当前云环境未开通或环境ID错误,已自动切换为本地模式。学习数据将保存在本机。」

## 技术栈

- **前端**: 微信小程序 WXML / WXSS / JS
- **后端**: 微信云开发(云函数、数据库、存储)
- **TTS**: Microsoft Edge TTS(`zh-CN-XiaoxiaoNeural`) 预生成
- **CDN**: jsDelivr (GitHub 仓库加速)
- **音频播放**: 微信 InnerAudioContext + 本地文件缓存
- **Python 工具链**: uv + edge-tts + asyncio 并发

## 页面说明

### 首页 (index)

底部导航「首页」标签。展示今日学习内容预览、连续打卡天数、总学习天数、当前周主题。可直接进入当日学习或选择其他日期回顾。

### 学习页 (learn)

核心学习页面,非 tabBar 页面,从首页进入。

- **三段式结构**: 每天课程固定分为热身 → 核心 → 挑战三个环节
- **变速播放**: 热身默认 0.8x 慢速、核心 1.0x 常速、挑战 1.0x→1.2x 快速,用户可手动调节
- **音频播放**: 点击句子播放标准发音,支持播放/暂停、进度拖拽、上一句/下一句
- **录音对比**: 点击录音按钮录制自己的发音,录制完成后可与标准音频对比回听
- **进度追踪**: 实时显示当前学习进度百分比和已用时间
- **复习模式**: 支持重新学习已完成的课程

### 打卡页 (calendar)

底部导航「打卡」标签。日历视图展示历史打卡情况,标记已完成的学习日。支持左右切换月份,点击日期可回顾当天学习内容。

### 看板页 (dashboard)

数据统计页面,非 tabBar 页面,从个人中心进入。

- 连续打卡天数、总学习天数、遗漏天数
- 本周学习日历(显示每天是否完成)
- 月度进度柱状图
- 最近 7 次学习记录

### 我的 (profile)

底部导航「我的」标签。个人中心包含:

- 用户资料: 编辑昵称、切换头像
- 学习看板: 进入数据统计页面
- 家人绑定: 生成绑定码或输入他人绑定码建立家庭关联
- 清除进度: 重置所有学习数据(有二次确认)

### 分享页 (share)

生成学习打卡海报,展示连续打卡天数、总学习天数、励志语录。支持保存图片到相册或转发给好友。

## 数据模型

### 学习内容 (contents.js)

```javascript
{
  week: 1, day: 1, theme: "n/l 对比",
  segments: {
    warmUp:  { title: "热身 · 重点词语", duration: 2, speed: 0.8, items: [...] },
    core:    { title: "核心 · 日常短句", duration: 5, speed: 1.0, items: [...] },
    challenge:{ title: "挑战 · 流利对话", duration: 3, speed: 1.0, items: [...] }
  }
}
```

每个 `item` 包含: `text`(文本), `pinyin`(拼音), `note`(发音要点), `audioUrl`(音频地址)

### 本地学习记录

```javascript
// Storage key: mandarin-progress-YYYY-MM-DD
{
  date: "2026-05-04",
  day: 1,
  completed: true,
  minutes: 10,
  segmentsCompleted: 3
}
```

## 注意事项

- 课程为 **50 天固定课程**(10 周),非循环,完成全部课程后可自由复习任意一天
- 音频文件总量约 6MB,按周分组存储,首次播放某条音频时需要联网下载,之后从本地缓存读取
- 录音对比功能需要用户授权麦克风权限
- 家庭绑定功能用于家人间互相查看学习进度,绑定后双方数据互通
- 本地模式下所有数据保存在用户设备上,卸载小程序会丢失数据
- 云开发环境 ID 配置在 `miniprogram/app.js` 中,如需更换环境请修改后重新上传
