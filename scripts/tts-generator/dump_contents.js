// 把 contents.js 里需要 TTS 的所有 text 抽出来,写入 items.json。
// 由 generate_all.py 调用。stdout 不可靠(Windows 终端 GBK 转码会破坏 JSON)。
const path = require('path')
const fs = require('fs')

const { ALL_CONTENTS } = require(
  path.join(__dirname, '..', '..', 'miniprogram', 'data', 'contents.js')
)

const SEGMENTS = ['warmUp', 'core', 'challenge']
const out = []

for (const day of ALL_CONTENTS) {
  for (const segKey of SEGMENTS) {
    const seg = day.segments && day.segments[segKey]
    if (!seg || !Array.isArray(seg.items)) continue
    seg.items.forEach((item, idx) => {
      if (!item || !item.text) return
      out.push({
        week: day.week,
        day: day.day,
        segment: segKey,
        index: idx,
        text: item.text,
        filename: `w${day.week}d${day.day}_${segKey}_${idx}.mp3`,
      })
    })
  }
}

const dest = path.join(__dirname, 'items.json')
fs.writeFileSync(dest, JSON.stringify(out, null, 2), 'utf-8')
console.log(`wrote ${out.length} items -> ${dest}`)
