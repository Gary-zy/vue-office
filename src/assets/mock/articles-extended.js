// 由于JSON文件太大，这里用JS导出，更易于维护
export const articles = [
  {
    id: 1,
    title: "Vue 3 Composition API 完全指南：从入门到精通",
    summary: "深入解析 Vue 3 Composition API 的核心概念、使用场景和最佳实践，帮助你快速掌握这个强大的 API。",
    cover: "https://picsum.photos/seed/vue3-comp/800/450",
    content: `# Vue 3 Composition API 完全指南

## 什么是 Composition API？

Composition API 是 Vue 3 中引入的一套新的 API...`,
    category: "vue",
    tags: ["vue3", "composition-api", "javascript"],
    author: { id: 1, name: "张三", avatar: "https://i.pravatar.cc/150?img=1", bio: "资深前端工程师" },
    publishTime: "2024-01-15T10:30:00.000Z",
    updateTime: "2024-01-20T14:20:00.000Z",
    views: 15234,
    likes: 892,
    comments: 156,
    favorites: 423,
    readTime: 8,
    featured: true,
    relatedArticles: [2, 3, 4]
  }
]
