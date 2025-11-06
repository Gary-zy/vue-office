import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'

/**
 * @description Markdown 解析和渲染工具
 */

// 创建 MarkdownIt 实例
const md = new MarkdownIt({
  html: true, // 允许 HTML 标签
  linkify: true, // 自动转换链接
  typographer: true, // 优化排版
  breaks: true, // 转换段落里的 '\n' 到 <br>
  
  // 代码高亮配置
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return `<pre class="hljs"><code class="language-${lang}">${
          hljs.highlight(str, { language: lang, ignoreIllegals: true }).value
        }</code></pre>`
      } catch (error) {
        console.error('代码高亮失败:', error)
      }
    }
    return `<pre class="hljs"><code>${md.utils.escapeHtml(str)}</code></pre>`
  }
})

/**
 * @description 渲染 Markdown 为 HTML
 * @param {string} markdown - Markdown 文本
 * @returns {string} HTML 字符串
 */
export function renderMarkdown(markdown) {
  if (!markdown) return ''
  
  try {
    return md.render(markdown)
  } catch (error) {
    console.error('Markdown 渲染失败:', error)
    return markdown
  }
}

/**
 * @description 从 Markdown 内容提取标题生成目录
 * @param {string} markdown - Markdown 文本
 * @returns {Array} 目录数组
 */
export function extractTOC(markdown) {
  if (!markdown) return []
  
  const toc = []
  const lines = markdown.split('\n')
  
  // 正则匹配标题
  const headingRegex = /^(#{1,6})\s+(.+)$/
  
  lines.forEach((line, index) => {
    const match = line.match(headingRegex)
    if (match) {
      const level = match[1].length // 标题级别（1-6）
      const text = match[2].trim() // 标题文本
      
      // 生成唯一 ID（用于锚点）
      const id = `heading-${index}-${text.toLowerCase()
        .replace(/[^\w\u4e00-\u9fa5]+/g, '-')
        .replace(/^-+|-+$/g, '')}`
      
      toc.push({
        level,
        text,
        id,
        index
      })
    }
  })
  
  return toc
}

/**
 * @description 为 Markdown 标题添加锚点 ID
 * @param {string} markdown - Markdown 文本
 * @returns {string} 添加了锚点的 Markdown
 */
export function addHeadingAnchors(markdown) {
  if (!markdown) return ''
  
  const lines = markdown.split('\n')
  const headingRegex = /^(#{1,6})\s+(.+)$/
  
  const result = lines.map((line, index) => {
    const match = line.match(headingRegex)
    if (match) {
      const hashes = match[1]
      const text = match[2].trim()
      const id = `heading-${index}-${text.toLowerCase()
        .replace(/[^\w\u4e00-\u9fa5]+/g, '-')
        .replace(/^-+|-+$/g, '')}`
      
      return `${hashes} <span id="${id}">${text}</span>`
    }
    return line
  })
  
  return result.join('\n')
}

/**
 * @description 从 Markdown 提取摘要
 * @param {string} markdown - Markdown 文本
 * @param {number} maxLength - 最大长度
 * @returns {string} 摘要文本
 */
export function extractSummary(markdown, maxLength = 200) {
  if (!markdown) return ''
  
  // 移除 Markdown 标记
  let text = markdown
    .replace(/#{1,6}\s+/g, '') // 移除标题标记
    .replace(/\*\*(.+?)\*\*/g, '$1') // 移除粗体
    .replace(/\*(.+?)\*/g, '$1') // 移除斜体
    .replace(/\[(.+?)\]\(.+?\)/g, '$1') // 移除链接
    .replace(/`{1,3}(.+?)`{1,3}/g, '$1') // 移除代码
    .replace(/!\[.*?\]\(.+?\)/g, '') // 移除图片
    .replace(/>\s+/g, '') // 移除引用
    .replace(/[-*+]\s+/g, '') // 移除列表标记
    .replace(/\d+\.\s+/g, '') // 移除有序列表
    .replace(/\n+/g, ' ') // 替换换行为空格
    .trim()
  
  // 截取指定长度
  if (text.length > maxLength) {
    text = text.substring(0, maxLength) + '...'
  }
  
  return text
}

/**
 * @description 计算阅读时间（分钟）
 * @param {string} content - 文章内容
 * @param {number} wordsPerMinute - 每分钟阅读字数（中文约 300-400）
 * @returns {number} 预计阅读时间（分钟）
 */
export function calculateReadingTime(content, wordsPerMinute = 300) {
  if (!content) return 0
  
  // 中文字符数
  const chineseChars = (content.match(/[\u4e00-\u9fa5]/g) || []).length
  
  // 英文单词数（简单估算）
  const englishWords = content
    .replace(/[\u4e00-\u9fa5]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 0).length
  
  // 总字数（中文字符 + 英文单词）
  const totalWords = chineseChars + englishWords
  
  // 计算阅读时间（向上取整）
  const minutes = Math.ceil(totalWords / wordsPerMinute)
  
  return Math.max(1, minutes) // 至少 1 分钟
}

/**
 * @description 高亮搜索关键词
 * @param {string} text - 原文本
 * @param {string} keyword - 关键词
 * @returns {string} 高亮后的 HTML
 */
export function highlightKeyword(text, keyword) {
  if (!text || !keyword) return text
  
  const regex = new RegExp(`(${keyword})`, 'gi')
  return text.replace(regex, '<mark class="highlight">$1</mark>')
}

/**
 * @description 从 HTML 提取纯文本
 * @param {string} html - HTML 字符串
 * @returns {string} 纯文本
 */
export function stripHtml(html) {
  if (!html) return ''
  
  const doc = new DOMParser().parseFromString(html, 'text/html')
  return doc.body.textContent || ''
}

/**
 * @description 检测内容语言
 * @param {string} content - 文本内容
 * @returns {string} 语言代码 'zh' | 'en' | 'mixed'
 */
export function detectLanguage(content) {
  if (!content) return 'en'
  
  const chineseChars = (content.match(/[\u4e00-\u9fa5]/g) || []).length
  const totalChars = content.length
  
  const chineseRatio = chineseChars / totalChars
  
  if (chineseRatio > 0.3) {
    return 'zh'
  } else if (chineseRatio > 0.05) {
    return 'mixed'
  } else {
    return 'en'
  }
}

/**
 * @description 代码块语言美化显示
 */
export const languageMap = {
  js: 'JavaScript',
  javascript: 'JavaScript',
  ts: 'TypeScript',
  typescript: 'TypeScript',
  vue: 'Vue',
  html: 'HTML',
  css: 'CSS',
  scss: 'SCSS',
  less: 'Less',
  json: 'JSON',
  python: 'Python',
  py: 'Python',
  java: 'Java',
  cpp: 'C++',
  c: 'C',
  go: 'Go',
  rust: 'Rust',
  php: 'PHP',
  ruby: 'Ruby',
  bash: 'Bash',
  shell: 'Shell',
  sql: 'SQL',
  md: 'Markdown',
  markdown: 'Markdown'
}

/**
 * @description 获取语言显示名称
 * @param {string} lang - 语言代码
 * @returns {string} 显示名称
 */
export function getLanguageDisplayName(lang) {
  return languageMap[lang?.toLowerCase()] || lang || 'Code'
}

export default {
  renderMarkdown,
  extractTOC,
  addHeadingAnchors,
  extractSummary,
  calculateReadingTime,
  highlightKeyword,
  stripHtml,
  detectLanguage,
  getLanguageDisplayName
}
