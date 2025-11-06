import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3000

// 中间件
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// 数据文件路径
const DATA_DIR = join(__dirname, 'data')
const ARTICLES_FILE = join(DATA_DIR, 'articles.json')

// 读取文章数据
function readArticles() {
  try {
    const data = readFileSync(ARTICLES_FILE, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    console.error('读取文章数据失败:', error)
    return []
  }
}

// 写入文章数据
function writeArticles(articles) {
  try {
    writeFileSync(ARTICLES_FILE, JSON.stringify(articles, null, 2))
    return true
  } catch (error) {
    console.error('写入文章数据失败:', error)
    return false
  }
}

// ========== API 路由 ==========

// 首页
app.get('/', (req, res) => {
  res.json({
    message: '博客 API 服务器',
    version: '1.0.0',
    endpoints: {
      articles: '/api/articles',
      article: '/api/articles/:id'
    }
  })
})

// 获取所有文章
app.get('/api/articles', (req, res) => {
  const articles = readArticles()
  const { category, tag, keyword, page = 1, pageSize = 10 } = req.query

  let filteredArticles = [...articles]

  // 分类筛选
  if (category) {
    filteredArticles = filteredArticles.filter(a => a.category === category)
  }

  // 标签筛选
  if (tag) {
    filteredArticles = filteredArticles.filter(a => a.tags.includes(tag))
  }

  // 关键词搜索
  if (keyword) {
    const kw = keyword.toLowerCase()
    filteredArticles = filteredArticles.filter(a =>
      a.title.toLowerCase().includes(kw) ||
      a.summary.toLowerCase().includes(kw) ||
      a.content.toLowerCase().includes(kw)
    )
  }

  // 分页
  const total = filteredArticles.length
  const start = (page - 1) * pageSize
  const end = start + parseInt(pageSize)
  const paginatedArticles = filteredArticles.slice(start, end)

  res.json({
    code: 200,
    data: {
      articles: paginatedArticles,
      pagination: {
        page: parseInt(page),
        pageSize: parseInt(pageSize),
        total,
        totalPages: Math.ceil(total / pageSize)
      }
    }
  })
})

// 获取单篇文章
app.get('/api/articles/:id', (req, res) => {
  const articles = readArticles()
  const article = articles.find(a => a.id === req.params.id)

  if (!article) {
    return res.status(404).json({
      code: 404,
      message: '文章不存在'
    })
  }

  res.json({
    code: 200,
    data: article
  })
})

// 创建新文章
app.post('/api/articles', (req, res) => {
  const articles = readArticles()
  const newArticle = {
    id: `art_${Date.now()}`,
    ...req.body,
    publishTime: new Date().toISOString(),
    updateTime: new Date().toISOString(),
    views: 0,
    likes: 0,
    comments: 0,
    collections: 0
  }

  articles.push(newArticle)

  if (writeArticles(articles)) {
    res.json({
      code: 200,
      message: '文章创建成功',
      data: newArticle
    })
  } else {
    res.status(500).json({
      code: 500,
      message: '文章创建失败'
    })
  }
})

// 更新文章
app.put('/api/articles/:id', (req, res) => {
  const articles = readArticles()
  const index = articles.findIndex(a => a.id === req.params.id)

  if (index === -1) {
    return res.status(404).json({
      code: 404,
      message: '文章不存在'
    })
  }

  articles[index] = {
    ...articles[index],
    ...req.body,
    updateTime: new Date().toISOString()
  }

  if (writeArticles(articles)) {
    res.json({
      code: 200,
      message: '文章更新成功',
      data: articles[index]
    })
  } else {
    res.status(500).json({
      code: 500,
      message: '文章更新失败'
    })
  }
})

// 删除文章
app.delete('/api/articles/:id', (req, res) => {
  const articles = readArticles()
  const newArticles = articles.filter(a => a.id !== req.params.id)

  if (articles.length === newArticles.length) {
    return res.status(404).json({
      code: 404,
      message: '文章不存在'
    })
  }

  if (writeArticles(newArticles)) {
    res.json({
      code: 200,
      message: '文章删除成功'
    })
  } else {
    res.status(500).json({
      code: 500,
      message: '文章删除失败'
    })
  }
})

// 点赞文章
app.post('/api/articles/:id/like', (req, res) => {
  const articles = readArticles()
  const article = articles.find(a => a.id === req.params.id)

  if (!article) {
    return res.status(404).json({
      code: 404,
      message: '文章不存在'
    })
  }

  article.likes++

  if (writeArticles(articles)) {
    res.json({
      code: 200,
      message: '点赞成功',
      data: { likes: article.likes }
    })
  } else {
    res.status(500).json({
      code: 500,
      message: '点赞失败'
    })
  }
})

// 增加浏览量
app.post('/api/articles/:id/view', (req, res) => {
  const articles = readArticles()
  const article = articles.find(a => a.id === req.params.id)

  if (!article) {
    return res.status(404).json({
      code: 404,
      message: '文章不存在'
    })
  }

  article.views++

  if (writeArticles(articles)) {
    res.json({
      code: 200,
      message: '浏览量更新成功',
      data: { views: article.views }
    })
  } else {
    res.status(500).json({
      code: 500,
      message: '浏览量更新失败'
    })
  }
})

// 404 处理
app.use((req, res) => {
  res.status(404).json({
    code: 404,
    message: 'API 路由不存在'
  })
})

// 错误处理
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({
    code: 500,
    message: '服务器内部错误',
    error: err.message
  })
})

// 启动服务器
app.listen(PORT, () => {
  console.log(`\n🚀 博客 API 服务器已启动`)
  console.log(`📍 地址: http://localhost:${PORT}`)
  console.log(`📚 API 文档: http://localhost:${PORT}\n`)
})

