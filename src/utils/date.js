import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'

/**
 * @description 日期时间处理工具
 * 基于 dayjs 封装常用的日期格式化和计算功能
 */

// 配置 dayjs
dayjs.extend(relativeTime)
dayjs.locale('zh-cn')

/**
 * @description 格式化日期时间
 * @param {string|Date|number} date - 日期
 * @param {string} format - 格式化模板
 * @returns {string} 格式化后的日期字符串
 */
export function formatDate(date, format = 'YYYY-MM-DD HH:mm:ss') {
  if (!date) return ''
  return dayjs(date).format(format)
}

/**
 * @description 格式化为相对时间（如：3天前）
 * @param {string|Date|number} date - 日期
 * @returns {string} 相对时间字符串
 */
export function formatRelativeTime(date) {
  if (!date) return ''
  return dayjs(date).fromNow()
}

/**
 * @description 格式化为友好的时间显示
 * @param {string|Date|number} date - 日期
 * @returns {string} 友好的时间字符串
 */
export function formatFriendlyTime(date) {
  if (!date) return ''
  
  const now = dayjs()
  const target = dayjs(date)
  const diffMinutes = now.diff(target, 'minute')
  const diffHours = now.diff(target, 'hour')
  const diffDays = now.diff(target, 'day')
  
  if (diffMinutes < 1) {
    return '刚刚'
  } else if (diffMinutes < 60) {
    return `${diffMinutes}分钟前`
  } else if (diffHours < 24) {
    return `${diffHours}小时前`
  } else if (diffDays < 7) {
    return `${diffDays}天前`
  } else if (now.year() === target.year()) {
    return target.format('MM-DD HH:mm')
  } else {
    return target.format('YYYY-MM-DD')
  }
}

/**
 * @description 格式化日期（仅日期部分）
 * @param {string|Date|number} date - 日期
 * @param {string} separator - 分隔符
 * @returns {string} 日期字符串
 */
export function formatDateOnly(date, separator = '-') {
  if (!date) return ''
  const format = separator === '/' ? 'YYYY/MM/DD' : 
                 separator === '.' ? 'YYYY.MM.DD' : 'YYYY-MM-DD'
  return dayjs(date).format(format)
}

/**
 * @description 格式化时间（仅时间部分）
 * @param {string|Date|number} date - 日期
 * @param {boolean} showSeconds - 是否显示秒
 * @returns {string} 时间字符串
 */
export function formatTimeOnly(date, showSeconds = true) {
  if (!date) return ''
  const format = showSeconds ? 'HH:mm:ss' : 'HH:mm'
  return dayjs(date).format(format)
}

/**
 * @description 格式化为中文日期
 * @param {string|Date|number} date - 日期
 * @param {boolean} showWeekday - 是否显示星期
 * @returns {string} 中文日期字符串
 */
export function formatChineseDate(date, showWeekday = false) {
  if (!date) return ''
  
  const d = dayjs(date)
  const year = d.year()
  const month = d.month() + 1
  const day = d.date()
  
  let result = `${year}年${month}月${day}日`
  
  if (showWeekday) {
    const weekdays = ['日', '一', '二', '三', '四', '五', '六']
    const weekday = weekdays[d.day()]
    result += ` 星期${weekday}`
  }
  
  return result
}

/**
 * @description 获取日期范围描述
 * @param {string|Date|number} startDate - 开始日期
 * @param {string|Date|number} endDate - 结束日期
 * @returns {string} 日期范围字符串
 */
export function formatDateRange(startDate, endDate) {
  if (!startDate || !endDate) return ''
  
  const start = dayjs(startDate)
  const end = dayjs(endDate)
  
  if (start.year() === end.year()) {
    if (start.month() === end.month()) {
      return `${start.format('YYYY年M月D日')} - ${end.format('D日')}`
    } else {
      return `${start.format('YYYY年M月D日')} - ${end.format('M月D日')}`
    }
  } else {
    return `${start.format('YYYY年M月D日')} - ${end.format('YYYY年M月D日')}`
  }
}

/**
 * @description 计算两个日期之间的差值
 * @param {string|Date|number} date1 - 日期1
 * @param {string|Date|number} date2 - 日期2
 * @param {string} unit - 单位（year/month/day/hour/minute/second）
 * @returns {number} 差值
 */
export function dateDiff(date1, date2, unit = 'day') {
  if (!date1 || !date2) return 0
  return dayjs(date1).diff(dayjs(date2), unit)
}

/**
 * @description 判断日期是否是今天
 * @param {string|Date|number} date - 日期
 * @returns {boolean}
 */
export function isToday(date) {
  if (!date) return false
  return dayjs(date).isSame(dayjs(), 'day')
}

/**
 * @description 判断日期是否是昨天
 * @param {string|Date|number} date - 日期
 * @returns {boolean}
 */
export function isYesterday(date) {
  if (!date) return false
  return dayjs(date).isSame(dayjs().subtract(1, 'day'), 'day')
}

/**
 * @description 判断日期是否是本周
 * @param {string|Date|number} date - 日期
 * @returns {boolean}
 */
export function isThisWeek(date) {
  if (!date) return false
  return dayjs(date).isSame(dayjs(), 'week')
}

/**
 * @description 判断日期是否是本月
 * @param {string|Date|number} date - 日期
 * @returns {boolean}
 */
export function isThisMonth(date) {
  if (!date) return false
  return dayjs(date).isSame(dayjs(), 'month')
}

/**
 * @description 判断日期是否是本年
 * @param {string|Date|number} date - 日期
 * @returns {boolean}
 */
export function isThisYear(date) {
  if (!date) return false
  return dayjs(date).isSame(dayjs(), 'year')
}

/**
 * @description 获取当前时间戳（秒）
 * @returns {number} 时间戳
 */
export function getTimestamp() {
  return Math.floor(Date.now() / 1000)
}

/**
 * @description 获取当前时间戳（毫秒）
 * @returns {number} 时间戳
 */
export function getTimestampMs() {
  return Date.now()
}

/**
 * @description 时间戳转日期
 * @param {number} timestamp - 时间戳（支持秒和毫秒）
 * @param {string} format - 格式化模板
 * @returns {string} 日期字符串
 */
export function timestampToDate(timestamp, format = 'YYYY-MM-DD HH:mm:ss') {
  if (!timestamp) return ''
  
  // 判断是秒还是毫秒
  const ts = timestamp.toString().length === 10 ? timestamp * 1000 : timestamp
  
  return dayjs(ts).format(format)
}

/**
 * @description 日期转时间戳
 * @param {string|Date|number} date - 日期
 * @param {boolean} inSeconds - 是否返回秒级时间戳
 * @returns {number} 时间戳
 */
export function dateToTimestamp(date, inSeconds = false) {
  if (!date) return 0
  
  const ts = dayjs(date).valueOf()
  return inSeconds ? Math.floor(ts / 1000) : ts
}

/**
 * @description 获取月份的天数
 * @param {number} year - 年份
 * @param {number} month - 月份（1-12）
 * @returns {number} 天数
 */
export function getDaysInMonth(year, month) {
  return dayjs(`${year}-${month}`).daysInMonth()
}

/**
 * @description 获取日期所在周的第一天
 * @param {string|Date|number} date - 日期
 * @returns {string} 日期字符串
 */
export function getWeekStart(date) {
  if (!date) return ''
  return dayjs(date).startOf('week').format('YYYY-MM-DD')
}

/**
 * @description 获取日期所在周的最后一天
 * @param {string|Date|number} date - 日期
 * @returns {string} 日期字符串
 */
export function getWeekEnd(date) {
  if (!date) return ''
  return dayjs(date).endOf('week').format('YYYY-MM-DD')
}

/**
 * @description 获取日期所在月的第一天
 * @param {string|Date|number} date - 日期
 * @returns {string} 日期字符串
 */
export function getMonthStart(date) {
  if (!date) return ''
  return dayjs(date).startOf('month').format('YYYY-MM-DD')
}

/**
 * @description 获取日期所在月的最后一天
 * @param {string|Date|number} date - 日期
 * @returns {string} 日期字符串
 */
export function getMonthEnd(date) {
  if (!date) return ''
  return dayjs(date).endOf('month').format('YYYY-MM-DD')
}

/**
 * @description 按月份分组文章数据（用于归档）
 * @param {Array} articles - 文章数组
 * @param {string} dateField - 日期字段名
 * @returns {Object} 按月份分组的对象
 */
export function groupByMonth(articles, dateField = 'publishTime') {
  const groups = {}
  
  articles.forEach(article => {
    const date = article[dateField]
    if (date) {
      const month = dayjs(date).format('YYYY-MM')
      if (!groups[month]) {
        groups[month] = []
      }
      groups[month].push(article)
    }
  })
  
  return groups
}

/**
 * @description 按年份分组文章数据（用于归档）
 * @param {Array} articles - 文章数组
 * @param {string} dateField - 日期字段名
 * @returns {Object} 按年份分组的对象
 */
export function groupByYear(articles, dateField = 'publishTime') {
  const groups = {}
  
  articles.forEach(article => {
    const date = article[dateField]
    if (date) {
      const year = dayjs(date).format('YYYY')
      if (!groups[year]) {
        groups[year] = []
      }
      groups[year].push(article)
    }
  })
  
  return groups
}

export default {
  formatDate,
  formatRelativeTime,
  formatFriendlyTime,
  formatDateOnly,
  formatTimeOnly,
  formatChineseDate,
  formatDateRange,
  dateDiff,
  isToday,
  isYesterday,
  isThisWeek,
  isThisMonth,
  isThisYear,
  getTimestamp,
  getTimestampMs,
  timestampToDate,
  dateToTimestamp,
  getDaysInMonth,
  getWeekStart,
  getWeekEnd,
  getMonthStart,
  getMonthEnd,
  groupByMonth,
  groupByYear
}
