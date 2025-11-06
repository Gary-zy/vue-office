# 📡 博客 API 后端服务

简单的 Node.js + Express 后端服务，用于管理博客文章数据。

## 🚀 快速开始

### 安装依赖

```bash
cd server
npm install
```

### 启动服务器

```bash
# 开发模式（自动重启）
npm run dev

# 生产模式
npm start
```

服务器将在 `http://localhost:3000` 启动。

## 📚 API 文档

### 基础信息

- **Base URL**: `http://localhost:3000/api`
- **数据格式**: JSON
- **字符编码**: UTF-8

### 接口列表

#### 1. 获取所有文章

```http
GET /api/articles
```

**查询参数**：

| 参数 | 类型 | 说明 | 示例 |
|------|------|------|------|
| category | string | 分类筛选 | vue |
| tag | string | 标签筛选 | Vue 3 |
| keyword | string | 关键词搜索 | 性能优化 |
| page | number | 页码（默认 1） | 1 |
| pageSize | number | 每页数量（默认 10） | 10 |

**响应示例**：

```json
{
  "code": 200,
  "data": {
    "articles": [...],
    "pagination": {
      "page": 1,
      "pageSize": 10,
      "total": 50,
      "totalPages": 5
    }
  }
}
```

#### 2. 获取单篇文章

```http
GET /api/articles/:id
```

**URL 参数**：

| 参数 | 类型 | 说明 |
|------|------|------|
| id | string | 文章 ID |

**响应示例**：

```json
{
  "code": 200,
  "data": {
    "id": "art_001",
    "title": "文章标题",
    "content": "文章内容...",
    ...
  }
}
```

#### 3. 创建新文章

```http
POST /api/articles
```

**请求体**：

```json
{
  "title": "文章标题",
  "summary": "文章摘要",
  "content": "Markdown 内容",
  "cover": "封面图 URL",
  "category": "分类 ID",
  "tags": ["标签1", "标签2"],
  "author": {
    "name": "作者名",
    "avatar": "头像 URL"
  },
  "readingTime": 5
}
```

**响应示例**：

```json
{
  "code": 200,
  "message": "文章创建成功",
  "data": {
    "id": "art_1234567890",
    ...
  }
}
```

#### 4. 更新文章

```http
PUT /api/articles/:id
```

**请求体**：与创建文章相同（可部分更新）

#### 5. 删除文章

```http
DELETE /api/articles/:id
```

#### 6. 点赞文章

```http
POST /api/articles/:id/like
```

#### 7. 增加浏览量

```http
POST /api/articles/:id/view
```

## 📁 数据存储

文章数据存储在 `server/data/articles.json` 文件中。

### 文章数据结构

```json
{
  "id": "art_001",
  "title": "文章标题",
  "summary": "文章摘要",
  "content": "Markdown 格式的文章内容",
  "cover": "https://example.com/cover.jpg",
  "category": "vue",
  "tags": ["Vue 3", "Composition API"],
  "author": {
    "id": "author_001",
    "name": "作者名",
    "avatar": "https://example.com/avatar.jpg",
    "bio": "作者简介"
  },
  "publishTime": "2024-01-20T10:00:00Z",
  "updateTime": "2024-01-20T10:00:00Z",
  "views": 1234,
  "likes": 56,
  "comments": 12,
  "collections": 34,
  "readingTime": 5,
  "isTop": false,
  "isFeatured": true
}
```

## 🔧 配置

### 端口配置

通过环境变量设置端口：

```bash
PORT=3000 npm start
```

### CORS 配置

默认允许所有来源的跨域请求。如需限制，修改 `index.js` 中的 CORS 配置：

```javascript
app.use(cors({
  origin: 'http://localhost:5173', // 只允许前端域名
  credentials: true
}))
```

## 🔗 前端集成

### 在前端项目中使用

1. 确保后端服务器已启动
2. 修改前端 API 配置（`src/api/request.js`）：

```javascript
const request = axios.create({
  baseURL: 'http://localhost:3000/api',
  timeout: 15000
})
```

3. 使用 API 接口：

```javascript
import { getArticleList, getArticleDetail } from '@/api/blog'

// 获取文章列表
const articles = await getArticleList({ page: 1, pageSize: 10 })

// 获取文章详情
const article = await getArticleDetail('art_001')
```

## 📝 开发说明

### 添加新接口

在 `index.js` 中添加新的路由：

```javascript
// 示例：获取文章分类
app.get('/api/categories', (req, res) => {
  // 实现逻辑
})
```

### 数据持久化

当前使用 JSON 文件存储。如需使用数据库：

1. 安装数据库驱动（如 MongoDB、MySQL）
2. 修改 `readArticles()` 和 `writeArticles()` 函数
3. 实现数据库连接和 CRUD 操作

## 🚀 部署

### 使用 PM2 部署

```bash
# 安装 PM2
npm install -g pm2

# 启动服务
pm2 start index.js --name blog-api

# 查看状态
pm2 status

# 查看日志
pm2 logs blog-api
```

### 使用 Docker 部署

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 3000
CMD ["node", "index.js"]
```

## 📋 待办事项

- [ ] 添加用户认证（JWT）
- [ ] 添加评论系统 API
- [ ] 集成数据库（MongoDB/PostgreSQL）
- [ ] 添加文件上传功能
- [ ] 实现缓存机制（Redis）
- [ ] 添加日志系统
- [ ] 实现限流和安全防护
- [ ] API 文档自动生成（Swagger）

## 📄 许可证

MIT

