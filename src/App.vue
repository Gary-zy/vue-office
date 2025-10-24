<template>
  <div id="app">
    <!-- 导航栏 -->
    <nav class="navbar">
      <div class="nav-container">
        <div class="nav-brand">
          <router-link to="/" class="brand-link">Vue3 文档预览系统</router-link>
        </div>
        <ul class="nav-menu">
          <li class="nav-item">
            <router-link to="/" class="nav-link">首页</router-link>
          </li>
          <li class="nav-item dropdown">
            <span class="nav-link dropdown-toggle">文档预览</span>
            <ul class="dropdown-menu">
              <li><router-link to="/docx-preview" class="dropdown-link">DOCX 预览</router-link></li>
              <li><router-link to="/excel-preview" class="dropdown-link">Excel 预览</router-link></li>
              <li><router-link to="/pdf-preview" class="dropdown-link">PDF 预览</router-link></li>
              <li><router-link to="/pptx-preview" class="dropdown-link">PPTX 预览</router-link></li>
            </ul>
          </li>
          <li class="nav-item">
            <router-link to="/about" class="nav-link">相关文档</router-link>
          </li>
        </ul>
      </div>
    </nav>

    <!-- 路由出口 -->
    <main class="main-content">
      <router-view />
    </main>

    <!-- 页脚 -->
    <footer class="footer">
      <p>&copy; 2024 Vue3 应用. 使用 Vue3 + Vue Router 构建</p>
    </footer>
  </div>
</template>

<script setup>
/**
 * @description 应用根组件
 * 包含导航栏、路由出口和页脚
 */

// 可以在这里添加全局逻辑
console.log('App 组件已加载')
</script>

<style>
/* 全局样式 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #f5f5f5;
  line-height: 1.6;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* 导航栏样式 */
.navbar {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 1rem 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
}

.nav-brand .brand-link {
  color: white;
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: bold;
}

.nav-menu {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 2rem;
}

.nav-item {
  position: relative;
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  transition: all 0.3s ease;
  display: block;
}

.nav-link:hover,
.nav-link.router-link-active {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.dropdown {
  position: relative;
}

.dropdown-toggle {
  cursor: pointer;
  user-select: none;
}

.dropdown-toggle::after {
  content: ' ▼';
  font-size: 0.8em;
  margin-left: 0.5rem;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  border-radius: 8px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  min-width: 200px;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.3s ease;
  list-style: none;
  margin: 0;
  padding: 0.5rem 0;
  z-index: 1001;
}

.dropdown:hover .dropdown-menu {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.dropdown-link {
  color: #2c3e50;
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  display: block;
  transition: background-color 0.3s ease;
}

.dropdown-link:hover,
.dropdown-link.router-link-active {
  background: #f8f9fa;
  color: #667eea;
}

/* 主内容区域 */
.main-content {
  flex: 1;
  padding: 2rem 0;
}

/* 页脚样式 */
.footer {
  background-color: #333;
  color: white;
  text-align: center;
  padding: 1.5rem 0;
  margin-top: auto;
}

.footer p {
  font-size: 0.9rem;
  opacity: 0.8;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .nav-container {
    flex-direction: column;
    gap: 1rem;
  }
  
  .nav-menu {
    gap: 1rem;
  }
  
  .main-content {
    padding: 1rem 0;
  }
}
</style>