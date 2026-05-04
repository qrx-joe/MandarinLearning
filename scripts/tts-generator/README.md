# TTS 音频生成工具

为「暖声·向暖而行」小程序批量生成普通话学习音频。

## 工作流程

```
contents.js 课程文本
      ↓
dump_contents.js ──→ items.json
      ↓
generate_all.py (edge-tts) ──→ audio/*.mp3
      ↓
migrate_audio.py ──→ miniprogram/audio-pkg-*/
      ↓
patch_contents.js ──→ 更新 contents.js 中的 audioUrl
```

## 快速开始

```bash
# 进入工具目录
cd scripts/tts-generator

# 安装依赖(使用 uv)
uv sync

# 一键完成:提取文本 → 生成音频 → 迁移分组 → 注入 URL
uv run python generate_all.py
uv run python migrate_audio.py
```

## 各脚本说明

| 脚本 | 功能 |
|------|------|
| `dump_contents.js` | 从 `contents.js` 提取所有需要 TTS 的文本,生成 `items.json` |
| `generate_all.py` | 使用 edge-tts 并发合成所有 mp3,支持断点续传 |
| `migrate_audio.py` | 按周分组移入 `miniprogram/audio-pkg-*/`,并调用 patch |
| `patch_contents.js` | 安全地给 `contents.js` 每个 item 注入 `audioUrl` 字段 |

## 音频分组规则

| 目录 | 周次 |
|------|------|
| `audio-pkg-a` | Week 1-2 |
| `audio-pkg-b` | Week 3-4 |
| `audio-pkg-c` | Week 5-6 |
| `audio-pkg-d` | Week 7-10 |

分组规则在 `migrate_audio.py` 和 `patch_contents.js` 中必须保持一致。

## 配置

- **语音**: `zh-CN-XiaoxiaoNeural`(女声,温和清晰)
- **并发数**: 6(edge-tts 过多并发会被限流)
- **输出目录**: `./audio/`

## 依赖

- Python >= 3.13
- [uv](https://docs.astral.sh/uv/)
- Node.js(用于运行 `.js` 脚本)
- `edge-tts >= 7.2.8`
