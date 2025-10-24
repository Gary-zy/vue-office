<template>
  <div class="home">
    <div class="hero">
      <h1>文档预览系统</h1>
      <p class="hero-description">
        基于 @vue-office 插件系列构建的强大文档预览解决方案
      </p>
      <div class="hero-actions">
        <router-link to="/docx-preview" class="btn btn-primary">
          开始预览
        </router-link>
      </div>
    </div>
    
    <div class="features">
      <h2>@vue-office 插件系列介绍</h2>
      <div class="plugin-intro">
        <p class="intro-text">
          @vue-office 是专为 Vue.js 开发的 Office 文档预览插件系列，提供了完整的文档预览解决方案。
          该插件系列支持多种文档格式的在线预览，无需安装额外的软件或插件。
        </p>
      </div>
      
      <div class="feature-grid">
        <div class="feature-card">
          <h3>📄 @vue-office/docx</h3>
          <p><strong>版本：</strong>v1.6.3</p>
          <p><strong>功能：</strong>Word 文档预览组件，支持 .docx 格式文件的在线预览</p>
          <p><strong>特性：</strong>完整的文档格式保持、图片显示、表格渲染</p>
        </div>
        
        <div class="feature-card">
          <h3>📊 @vue-office/excel</h3>
          <p><strong>版本：</strong>v1.7.14</p>
          <p><strong>功能：</strong>Excel 表格预览组件，支持 .xlsx/.xls 格式文件</p>
          <p><strong>特性：</strong>多工作表支持、公式计算、图表显示、数据筛选</p>
        </div>
        
        <div class="feature-card">
          <h3>📋 @vue-office/pdf</h3>
          <p><strong>版本：</strong>v2.0.10</p>
          <p><strong>功能：</strong>PDF 文档预览组件，支持标准 PDF 文件预览</p>
          <p><strong>特性：</strong>页面缩放、页面跳转、文本选择、打印支持</p>
        </div>
        
        <div class="feature-card">
          <h3>🎯 @vue-office/pptx</h3>
          <p><strong>版本：</strong>v1.0.1</p>
          <p><strong>功能：</strong>PowerPoint 演示文稿预览组件，支持 .pptx/.ppt 格式</p>
          <p><strong>特性：</strong>幻灯片切换、动画效果、图片视频支持</p>
        </div>
      </div>
    </div>

    <div class="system-features">
      <h2>系统特性</h2>
      <div class="feature-grid">
        <div class="feature-card highlight">
          <h3>📁 本地文件上传</h3>
          <p>支持直接上传本地文件进行预览，无需上传到服务器</p>
        </div>
        
        <div class="feature-card highlight">
          <h3>🌐 在线链接预览</h3>
          <p>支持通过 URL 链接直接预览在线文档</p>
        </div>
        
        <div class="feature-card highlight">
          <h3>⚡ 快速渲染</h3>
          <p>基于浏览器原生能力，实现快速文档渲染</p>
        </div>
        
        <div class="feature-card highlight">
          <h3>📱 响应式设计</h3>
          <p>完美适配桌面端和移动端设备</p>
        </div>
      </div>
    </div>

    <div class="supported-formats">
      <h2>支持的文件格式</h2>
      <div class="format-list">
        <div class="format-item">
          <span class="format-icon">📄</span>
          <div class="format-info">
            <h4>Word 文档</h4>
            <p>.docx 格式</p>
          </div>
        </div>
        
        <div class="format-item">
          <span class="format-icon">📊</span>
          <div class="format-info">
            <h4>Excel 表格</h4>
            <p>.xlsx, .xls 格式</p>
          </div>
        </div>
        
        <div class="format-item">
          <span class="format-icon">📋</span>
          <div class="format-info">
            <h4>PDF 文档</h4>
            <p>.pdf 格式</p>
          </div>
        </div>
        
        <div class="format-item">
          <span class="format-icon">🎯</span>
          <div class="format-info">
            <h4>PowerPoint 演示文稿</h4>
            <p>.pptx, .ppt 格式</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
/**
 * @description 首页组件 - 文档预览系统介绍
 * 展示 @vue-office 插件系列的功能和特性介绍
 */

// 组件逻辑可以在这里添加
console.log('文档预览系统首页已加载')
</script>

<style scoped>
.home {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.hero {
  text-align: center;
  padding: 3rem 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 12px;
  margin-bottom: 3rem;
}

.hero h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
  font-weight: bold;
}

.hero-description {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.hero-actions {
  margin-top: 2rem;
}

.btn {
  display: inline-block;
  padding: 0.75rem 2rem;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-primary {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.btn-primary:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

.features, .system-features, .supported-formats {
  margin-bottom: 3rem;
}

.features h2, .system-features h2, .supported-formats h2 {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: #2c3e50;
}

.plugin-intro {
  text-align: center;
  margin-bottom: 3rem;
}

.intro-text {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #555;
  max-width: 800px;
  margin: 0 auto;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.feature-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  border: 1px solid #e1e8ed;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
}

.feature-card.highlight {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
}

.feature-card h3 {
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: #2c3e50;
}

.feature-card.highlight h3 {
  color: white;
}

.feature-card p {
  line-height: 1.6;
  color: #666;
  margin-bottom: 0.5rem;
}

.feature-card.highlight p {
  color: rgba(255, 255, 255, 0.9);
}

.feature-card strong {
  color: #667eea;
}

.feature-card.highlight strong {
  color: white;
}

.format-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.format-item {
  display: flex;
  align-items: center;
  background: white;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.format-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 25px rgba(0, 0, 0, 0.12);
}

.format-icon {
  font-size: 2.5rem;
  margin-right: 1rem;
}

.format-info h4 {
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  color: #2c3e50;
}

.format-info p {
  color: #666;
  font-size: 0.9rem;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .home {
    padding: 1rem;
  }
  
  .hero {
    padding: 2rem 1rem;
  }
  
  .hero h1 {
    font-size: 2rem;
  }
  
  .hero-description {
    font-size: 1rem;
  }
  
  .feature-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .format-list {
    grid-template-columns: 1fr;
  }
  
  .format-item {
    padding: 1rem;
  }
}
</style>