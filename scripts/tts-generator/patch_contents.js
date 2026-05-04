// 给 miniprogram/data/contents.js 的每个 item 字面量插入 audioUrl 字段。
// 按 items.json 的顺序依次匹配,任何 text 不一致都会立刻报错(不会盲插)。
const fs = require('fs')
const path = require('path')

const ROOT = __dirname
const ITEMS_JSON = path.join(ROOT, 'items.json')
const SOURCE = path.join(ROOT, '..', '..', 'miniprogram', 'data', 'contents.js')

const PKG_FOR_WEEK = (week) => {
  if (week <= 2) return 'audio-pkg-a'
  if (week <= 4) return 'audio-pkg-b'
  if (week <= 6) return 'audio-pkg-c'
  return 'audio-pkg-d'
}

const items = JSON.parse(fs.readFileSync(ITEMS_JSON, 'utf-8'))
const audioUrls = items.map((it) => `/${PKG_FOR_WEEK(it.week)}/${it.filename}`)

const src = fs.readFileSync(SOURCE, 'utf-8')
const lines = src.split(/\r?\n/)

// 单行 item 字面量: 行首空白 + { text: "<可含转义引号>" + 任意余下属性 + } [,]
const ITEM_RE = /^(\s*\{\s*text:\s*"((?:[^"\\]|\\.)*)"(?:.*?))(\s*\},?)\s*$/

let cursor = 0
const out = lines.map((line, lineNo) => {
  const m = line.match(ITEM_RE)
  if (!m) return line
  if (cursor >= items.length) {
    throw new Error(`line ${lineNo + 1}: extra item beyond items.json (cursor=${cursor})\n  ${line}`)
  }
  const [, head, foundText, tail] = m
  const expected = items[cursor]
  // foundText 是 contents.js 源码里的原始转义形式(\" 是 2 个字符);
  // items.json 里的 text 是 require() 解析后的真实字符串。比较前先解码。
  const decodedText = JSON.parse(`"${foundText}"`)
  if (decodedText !== expected.text) {
    throw new Error(
      `line ${lineNo + 1}: item ${cursor} text mismatch\n` +
        `  expected: ${JSON.stringify(expected.text)}\n` +
        `  got     : ${JSON.stringify(decodedText)}`
    )
  }
  // 已经有 audioUrl 字段?跳过(支持重跑)
  if (head.includes('audioUrl:')) {
    cursor++
    return line
  }
  const url = audioUrls[cursor]
  cursor++
  return `${head}, audioUrl: "${url}"${tail}`
})

if (cursor !== items.length) {
  throw new Error(`processed ${cursor} items, expected ${items.length}`)
}

fs.writeFileSync(SOURCE, out.join('\n'), 'utf-8')
console.log(`patched ${cursor} items into ${SOURCE}`)
