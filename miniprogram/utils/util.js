/**
 * 格式化日期为 YYYY-MM-DD
 * @param {Date} date
 * @returns {string}
 */
function formatDate(date) {
  const d = date || new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

/**
 * 格式化日期为 YYYY-MM
 * @param {Date} date
 * @returns {string}
 */
function formatYearMonth(date) {
  const d = date || new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
}

/**
 * 格式化时间 MM:SS
 * @param {number} seconds
 * @returns {string}
 */
function formatTime(seconds) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

/**
 * 获取今天是今年的第几天
 * @returns {number}
 */
function getDayOfYear() {
  const now = new Date()
  const start = new Date(now.getFullYear(), 0, 1)
  return Math.floor((now - start) / (1000 * 60 * 60 * 24)) + 1
}

/**
 * 计算两个日期之间的天数差
 * @param {string} date1 - YYYY-MM-DD
 * @param {string} date2 - YYYY-MM-DD
 * @returns {number}
 */
function dayDiff(date1, date2) {
  const d1 = new Date(date1)
  const d2 = new Date(date2)
  return Math.floor(Math.abs(d1 - d2) / (1000 * 60 * 60 * 24))
}

/**
 * 防抖函数
 * @param {Function} fn
 * @param {number} delay
 * @returns {Function}
 */
function debounce(fn, delay = 300) {
  let timer = null
  return function (...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}

module.exports = {
  formatDate,
  formatYearMonth,
  formatTime,
  getDayOfYear,
  dayDiff,
  debounce
}
