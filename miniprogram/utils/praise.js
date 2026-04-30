const PRAISES = [
  "今天的发音比昨天稳多了，进步看得见！",
  "这个声调拿捏得越来越准了，真棒！",
  "妈妈的声音越来越有底气了，好听！",
  "坚持十分钟，你就是最自律的人！",
  "『牛奶』念得特别到位，n和l分得清清楚楚！",
  "越练越年轻，这声音像三十岁的！",
  "今天的状态超棒，每个字都在调上！",
  "你已经打败全国80%的懒人了，继续！",
  "普通话越来越好，出门倍儿有面子！",
  "这语速控制得正好，播音员范儿出来了！",
  "听得出今天特别用心，给你点个大大的赞！",
  "又一个十天打卡，你是家里的榜样！",
  "暖声·向暖而行，越来越标准了！",
  "声音洪亮饱满，中气十足！",
  "今天的你，比昨天更优秀了一点点！"
]

const ENCOURAGE_WEEKLY = {
  1: "第一周奠基期：慢就是快，地基打牢最重要！",
  2: "第二周提升期：开始找到感觉了，保持节奏！",
  3: "第三周巩固期：越来越好，越来越自信！",
  4: "第四周突破期：质的飞跃就在眼前！",
  5: "第五周蜕变期：你已经不是十天前的你了！"
}

function getRandomPraise() {
  return PRAISES[Math.floor(Math.random() * PRAISES.length)]
}

function getWeeklyEncourage(week) {
  return ENCOURAGE_WEEKLY[week] || "每一天的坚持，都在悄悄改变你！"
}

function getStarRating(seconds) {
  const min = Math.ceil(seconds / 60)
  if (min >= 15) return 5
  if (min >= 12) return 4
  if (min >= 10) return 3
  if (min >= 5) return 2
  return 1
}

module.exports = {
  getRandomPraise,
  getWeeklyEncourage,
  getStarRating,
  PRAISES
}
