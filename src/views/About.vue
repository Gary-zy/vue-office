<template>
  <n-space vertical size="large" style="padding: 24px; max-width: 1200px; margin: 0 auto;">
    <!-- 页面标题 -->
    <n-h1 style="text-align: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
      关于文档预览系统
    </n-h1>
    
    <!-- 项目介绍 -->
    <n-card title="项目简介" size="large">
      <n-p>
        这是一个基于 Vue 3 和 Naive UI 构建的现代化文档预览系统，支持多种文档格式的在线预览功能。
        系统采用了最新的前端技术栈，提供了优雅的用户界面和流畅的用户体验。
        核心预览功能基于 vue-office 组件库实现，支持 Word、Excel、PDF 和 PowerPoint 文档的高质量在线预览。
      </n-p>
    </n-card>

    <!-- Vue Office 配置说明 -->
    <n-card title="Vue Office 配置说明" size="large">
      <n-h2 style="background: linear-gradient(135deg, #18a058 0%, #2080f0 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
        核心组件库介绍
      </n-h2>
      <n-p>
        vue-office 是一个支持多种文件格式预览的 Vue 组件库，支持 Vue 2 和 Vue 3。<mcreference link="https://501351981.github.io/vue-office/examples/docs/guide/" index="2">2</mcreference>
      </n-p>
      
      <n-divider title-placement="left">功能特色</n-divider>
      <n-list>
        <n-list-item>
          <n-thing>
            <template #avatar>
              <n-avatar style="background-color: #18a058;">🎯</n-avatar>
            </template>
            <template #header>一站式解决方案</template>
            <template #description>
              提供 docx、xlsx、pdf、pptx 多种文档的在线预览方案，有它就够了 <mcreference link="https://501351981.github.io/vue-office/examples/docs/guide/" index="2">2</mcreference>
            </template>
          </n-thing>
        </n-list-item>
        
        <n-list-item>
          <n-thing>
            <template #avatar>
              <n-avatar style="background-color: #2080f0;">⚡</n-avatar>
            </template>
            <template #header>使用简单</template>
            <template #description>
              只需提供文档的 src（网络地址）即可完成文档预览，也支持 ArrayBuffer、Blob 等多种格式 <mcreference link="https://501351981.github.io/vue-office/examples/docs/guide/" index="2">2</mcreference>
            </template>
          </n-thing>
        </n-list-item>
        
        <n-list-item>
          <n-thing>
            <template #avatar>
              <n-avatar style="background-color: #f0a020;">🎨</n-avatar>
            </template>
            <template #header>样式支持</template>
            <template #description>
              不仅能预览内容，也支持文档样式，最大限度还原 office 文件内容 <mcreference link="https://501351981.github.io/vue-office/examples/docs/guide/" index="2">2</mcreference>
            </template>
          </n-thing>
        </n-list-item>
      </n-list>

      <n-divider title-placement="left">安装配置</n-divider>
      <n-p>项目中已安装的 vue-office 相关依赖：</n-p>
      <n-code language="bash" :code="installCode" />
      
      <n-divider title-placement="left">基本使用方法</n-divider>
      <n-h3>1. 网络地址预览</n-h3>
      <n-code language="vue" :code="networkPreviewCode" />
      
      <n-h3>2. 文件上传预览</n-h3>
      <n-code language="vue" :code="fileUploadCode" />
      
      <n-h3>3. 二进制文件预览</n-h3>
      <n-code language="vue" :code="binaryPreviewCode" />
    </n-card>

    <!-- 详细 API 文档 -->
    <n-card title="详细 API 文档" size="large">
      <n-h2 style="background: linear-gradient(135deg, #18a058 0%, #2080f0 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
        完整 API 参考
      </n-h2>
      
      <!-- VueOfficeDocx 详细配置 -->
      <n-card title="VueOfficeDocx 组件" size="medium" style="margin-bottom: 16px;">
        <n-space vertical size="large">
          <!-- 基本属性 -->
          <div>
            <n-h4>基本属性 (Props)</n-h4>
            <n-table :bordered="false" :single-line="false">
              <thead>
                <tr>
                  <th>属性名</th>
                  <th>类型</th>
                  <th>默认值</th>
                  <th>说明</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><n-code>src</n-code></td>
                  <td>String | ArrayBuffer | Blob</td>
                  <td>-</td>
                  <td>文档地址，支持网络地址、ArrayBuffer 或 Blob 格式</td>
                </tr>
                <tr>
                  <td><n-code>request-options</n-code></td>
                  <td>Object</td>
                  <td>{}</td>
                  <td>fetch 请求参数，可设置 headers 等请求信息</td>
                </tr>
                <tr>
                  <td><n-code>options</n-code></td>
                  <td>Object</td>
                  <td>{}</td>
                  <td>预览配置选项，详见下方配置说明</td>
                </tr>
              </tbody>
            </n-table>
          </div>

          <!-- 事件 -->
          <div>
            <n-h4>事件 (Events)</n-h4>
            <n-table :bordered="false" :single-line="false">
              <thead>
                <tr>
                  <th>事件名</th>
                  <th>参数</th>
                  <th>说明</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><n-code>@rendered</n-code></td>
                  <td>-</td>
                  <td>渲染完成时触发，可用于关闭 loading 状态</td>
                </tr>
                <tr>
                  <td><n-code>@error</n-code></td>
                  <td>error</td>
                  <td>渲染失败时触发，包括网络请求失败、解析失败等</td>
                </tr>
              </tbody>
            </n-table>
          </div>

          <!-- Docx 特殊配置 -->
           <div>
             <n-h4>Docx 特殊配置选项</n-h4>
             <n-code :code="docxOptionsCode" language="javascript" />
           </div>
        </n-space>
      </n-card>

      <!-- VueOfficeExcel 详细配置 -->
      <n-card title="VueOfficeExcel 组件" size="medium" style="margin-bottom: 16px;">
        <n-space vertical size="large">
          <!-- 基本属性 -->
          <div>
            <n-h4>基本属性 (Props)</n-h4>
            <n-table :bordered="false" :single-line="false">
              <thead>
                <tr>
                  <th>属性名</th>
                  <th>类型</th>
                  <th>默认值</th>
                  <th>说明</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><n-code>src</n-code></td>
                  <td>String | ArrayBuffer | Blob</td>
                  <td>-</td>
                  <td>Excel 文档地址或二进制数据</td>
                </tr>
                <tr>
                  <td><n-code>request-options</n-code></td>
                  <td>Object</td>
                  <td>{}</td>
                  <td>fetch 请求参数配置</td>
                </tr>
                <tr>
                  <td><n-code>options</n-code></td>
                  <td>Object</td>
                  <td>{}</td>
                  <td>Excel 预览配置选项</td>
                </tr>
              </tbody>
            </n-table>
          </div>

          <!-- Excel 特殊配置 -->
           <div>
             <n-h4>Excel 特殊配置选项</n-h4>
             <n-code :code="excelOptionsCode" language="javascript" />
           </div>
        </n-space>
      </n-card>

      <!-- VueOfficePdf 详细配置 -->
      <n-card title="VueOfficePdf 组件" size="medium" style="margin-bottom: 16px;">
        <n-space vertical size="large">
          <!-- 基本属性 -->
          <div>
            <n-h4>基本属性 (Props)</n-h4>
            <n-table :bordered="false" :single-line="false">
              <thead>
                <tr>
                  <th>属性名</th>
                  <th>类型</th>
                  <th>默认值</th>
                  <th>说明</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><n-code>src</n-code></td>
                  <td>String | ArrayBuffer | Blob</td>
                  <td>-</td>
                  <td>PDF 文档地址或二进制数据</td>
                </tr>
                <tr>
                  <td><n-code>request-options</n-code></td>
                  <td>Object</td>
                  <td>{}</td>
                  <td>fetch 请求参数配置</td>
                </tr>
                <tr>
                  <td><n-code>options</n-code></td>
                  <td>Object</td>
                  <td>{}</td>
                  <td>PDF 预览配置选项</td>
                </tr>
                <tr>
                  <td><n-code>static-file-url</n-code></td>
                  <td>String</td>
                  <td>https://unpkg.com/pdfjs-dist@3.1.81/</td>
                  <td>PDF.js 静态文件地址，用于加载 bcmap 文件</td>
                </tr>
              </tbody>
            </n-table>
          </div>

          <!-- PDF 特殊配置 -->
           <div>
             <n-h4>PDF 特殊配置选项</n-h4>
             <n-code :code="pdfOptionsCode" language="javascript" />
           </div>
        </n-space>
      </n-card>

      <!-- VueOfficePptx 详细配置 -->
      <n-card title="VueOfficePptx 组件" size="medium" style="margin-bottom: 16px;">
        <n-space vertical size="large">
          <!-- 基本属性 -->
          <div>
            <n-h4>基本属性 (Props)</n-h4>
            <n-table :bordered="false" :single-line="false">
              <thead>
                <tr>
                  <th>属性名</th>
                  <th>类型</th>
                  <th>默认值</th>
                  <th>说明</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><n-code>src</n-code></td>
                  <td>String | ArrayBuffer | Blob</td>
                  <td>-</td>
                  <td>PPTX 文档地址或二进制数据</td>
                </tr>
                <tr>
                  <td><n-code>request-options</n-code></td>
                  <td>Object</td>
                  <td>{}</td>
                  <td>fetch 请求参数配置</td>
                </tr>
              </tbody>
            </n-table>
          </div>

          <!-- PPTX 使用说明 -->
          <div>
            <n-h4>PPTX 使用说明</n-h4>
            <n-alert type="info" title="注意事项">
              PPTX 组件目前功能相对简单，主要支持基本的幻灯片预览。建议在使用前测试具体的 PPTX 文件兼容性。
            </n-alert>
          </div>
        </n-space>
      </n-card>
    </n-card>

    <!-- 最佳实践与错误处理 -->
    <n-card title="最佳实践与错误处理" size="large">
      <n-h2 style="background: linear-gradient(135deg, #18a058 0%, #2080f0 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
        开发指南
      </n-h2>
      
      <n-space vertical size="large">
        <!-- 错误处理 -->
         <div>
           <n-h3>错误处理</n-h3>
           <n-code :code="errorHandlingCode" language="javascript" />
         </div>

        <!-- 性能优化 -->
        <div>
          <n-h3>性能优化建议</n-h3>
          <n-list>
            <n-list-item>
              <n-text>
                <n-text strong>文件大小控制：</n-text>
                建议单个文件大小不超过 50MB，过大的文件可能导致浏览器卡顿
              </n-text>
            </n-list-item>
            <n-list-item>
              <n-text>
                <n-text strong>懒加载：</n-text>
                对于多个文档预览场景，建议使用懒加载避免同时加载多个大文件
              </n-text>
            </n-list-item>
            <n-list-item>
              <n-text>
                <n-text strong>缓存策略：</n-text>
                对于网络文档，建议在服务端设置适当的缓存策略
              </n-text>
            </n-list-item>
            <n-list-item>
              <n-text>
                <n-text strong>Loading 状态：</n-text>
                始终为用户提供加载状态反馈，提升用户体验
              </n-text>
            </n-list-item>
          </n-list>
        </div>

        <!-- 兼容性说明 -->
        <div>
          <n-h3>浏览器兼容性</n-h3>
          <n-table :bordered="false" :single-line="false">
            <thead>
              <tr>
                <th>浏览器</th>
                <th>最低版本</th>
                <th>说明</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Chrome</td>
                <td>60+</td>
                <td>完全支持</td>
              </tr>
              <tr>
                <td>Firefox</td>
                <td>55+</td>
                <td>完全支持</td>
              </tr>
              <tr>
                <td>Safari</td>
                <td>12+</td>
                <td>完全支持</td>
              </tr>
              <tr>
                <td>Edge</td>
                <td>79+</td>
                <td>完全支持</td>
              </tr>
              <tr>
                <td>IE</td>
                <td>不支持</td>
                <td>建议使用现代浏览器</td>
              </tr>
            </tbody>
          </n-table>
        </div>
      </n-space>
    </n-card>

    <!-- 项目依赖项 -->
    <n-card title="项目依赖项" size="large">
      <n-h2 style="background: linear-gradient(135deg, #d03050 0%, #f0a020 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
        完整依赖列表
      </n-h2>
      
      <n-divider title-placement="left">核心依赖 (dependencies)</n-divider>
      <n-list>
        <n-list-item v-for="(version, name) in dependencies" :key="name">
          <n-thing>
            <template #avatar>
              <n-avatar style="background-color: #18a058;">📦</n-avatar>
            </template>
            <template #header>{{ name }}</template>
            <template #description>
              版本: {{ version }} - {{ getPackageDescription(name) }}
            </template>
          </n-thing>
        </n-list-item>
      </n-list>
      
      <n-divider title-placement="left">开发依赖 (devDependencies)</n-divider>
      <n-list>
        <n-list-item v-for="(version, name) in devDependencies" :key="name">
          <n-thing>
            <template #avatar>
              <n-avatar style="background-color: #2080f0;">🔧</n-avatar>
            </template>
            <template #header>{{ name }}</template>
            <template #description>
              版本: {{ version }} - {{ getDevPackageDescription(name) }}
            </template>
          </n-thing>
        </n-list-item>
      </n-list>
    </n-card>

    <!-- 功能特性 -->
    <n-card title="系统功能特性" size="large">
      <n-list>
        <n-list-item>
          <n-thing>
            <template #avatar>
              <n-avatar style="background-color: #18a058;">📄</n-avatar>
            </template>
            <template #header>Word 文档预览</template>
            <template #description>
              支持 .docx 格式的 Word 文档在线预览，保持原有格式和样式，支持网络地址和文件上传两种方式
            </template>
          </n-thing>
        </n-list-item>
        
        <n-list-item>
          <n-thing>
            <template #avatar>
              <n-avatar style="background-color: #2080f0;">📊</n-avatar>
            </template>
            <template #header>Excel 表格预览</template>
            <template #description>
              支持 .xlsx 格式的 Excel 表格在线预览，完整显示数据和格式，支持多工作表切换
            </template>
          </n-thing>
        </n-list-item>
        
        <n-list-item>
          <n-thing>
            <template #avatar>
              <n-avatar style="background-color: #f0a020;">📋</n-avatar>
            </template>
            <template #header>PDF 文档预览</template>
            <template #description>
              支持 PDF 文档的高质量在线预览，支持缩放、页面导航和全屏查看
            </template>
          </n-thing>
        </n-list-item>
        
        <n-list-item>
          <n-thing>
            <template #avatar>
              <n-avatar style="background-color: #d03050;">🎯</n-avatar>
            </template>
            <template #header>PowerPoint 演示文稿预览</template>
            <template #description>
              支持 .pptx 格式的 PowerPoint 演示文稿在线预览，保持动画和样式效果
            </template>
          </n-thing>
        </n-list-item>
      </n-list>
    </n-card>

    <!-- 技术栈 -->
    <n-card title="技术栈" size="large">
      <n-space>
        <n-button type="primary" ghost>Vue 3.5.22</n-button>
        <n-button type="info" ghost>Naive UI 2.43.1</n-button>
        <n-button type="success" ghost>Vue Router 4.6.3</n-button>
        <n-button type="warning" ghost>Vite 7.1.11</n-button>
        <n-button type="error" ghost>Tailwind CSS 4.1.16</n-button>
        <n-button type="tertiary" ghost>Vue Office</n-button>
      </n-space>
    </n-card>

    <n-divider />

    <!-- 返回首页按钮 -->
    <n-space justify="center">
      <n-button type="primary" size="large" @click="goHome">
        <template #icon>
          <n-icon>
            <HomeOutline />
          </n-icon>
        </template>
        返回首页
      </n-button>
    </n-space>
  </n-space>
</template>

<script setup>
import { ref, onMounted, h } from 'vue'
import { useRouter } from 'vue-router'
import { HomeOutline, BookOutline, CheckmarkCircleOutline } from '@vicons/ionicons5'
import { NIcon } from 'naive-ui'

/**
 * @description 关于页面组件
 * 展示项目信息和技术栈
 */

const router = useRouter()

// 页面加载时间
const loadTime = ref('')

/**
 * @description 获取当前时间
 * @returns {string} 格式化的时间字符串
 */
const getCurrentTime = () => {
  return new Date().toLocaleString('zh-CN')
}

/**
 * @description 返回首页
 */
const goHome = () => {
  router.push('/')
}

/**
 * @description 渲染首页图标
 */
const renderHomeIcon = () => {
  return h(NIcon, null, {
    default: () => h(HomeOutline)
  })
}

/**
 * @description 项目核心依赖
 */
const dependencies = ref({
  '@vicons/ionicons5': '^0.12.0',
  '@vue-office/docx': '^1.6.2',
  '@vue-office/excel': '^1.7.11',
  '@vue-office/pdf': '^2.0.2',
  '@vue-office/pptx': '^1.0.1',
  'naive-ui': '^2.43.1',
  'vue': '^3.5.22',
  'vue-router': '^4.6.3'
})

/**
 * @description 项目开发依赖
 */
const devDependencies = ref({
  '@vitejs/plugin-vue': '^5.2.1',
  'autoprefixer': '^10.4.20',
  'postcss': '^8.5.11',
  'tailwindcss': '^4.1.16',
  'vite': '^7.1.11'
})

/**
 * @description 获取包的描述信息
 * @param {string} packageName - 包名
 * @returns {string} 包的描述
 */
const getPackageDescription = (packageName) => {
  const descriptions = {
    '@vicons/ionicons5': 'Ionicons 5 图标库，提供丰富的矢量图标',
    '@vue-office/docx': 'Vue 组件，用于预览 Word 文档 (.docx)',
    '@vue-office/excel': 'Vue 组件，用于预览 Excel 表格 (.xlsx)',
    '@vue-office/pdf': 'Vue 组件，用于预览 PDF 文档',
    '@vue-office/pptx': 'Vue 组件，用于预览 PowerPoint 演示文稿 (.pptx)',
    'naive-ui': '现代化的 Vue 3 UI 组件库',
    'vue': '渐进式 JavaScript 框架',
    'vue-router': 'Vue.js 官方路由管理器'
  }
  return descriptions[packageName] || '项目依赖包'
}

/**
 * @description 获取开发依赖包的描述信息
 * @param {string} packageName - 包名
 * @returns {string} 包的描述
 */
const getDevPackageDescription = (packageName) => {
  const descriptions = {
    '@vitejs/plugin-vue': 'Vite 的 Vue 插件，提供 Vue SFC 支持',
    'autoprefixer': 'CSS 后处理器，自动添加浏览器前缀',
    'postcss': 'CSS 转换工具',
    'tailwindcss': '实用优先的 CSS 框架',
    'vite': '下一代前端构建工具'
  }
  return descriptions[packageName] || '开发工具依赖'
}

/**
 * @description 安装命令代码示例
 */
const installCode = ref(`# 安装 vue-office 相关依赖
npm install @vue-office/docx @vue-office/excel @vue-office/pdf @vue-office/pptx

# 或者使用 yarn
yarn add @vue-office/docx @vue-office/excel @vue-office/pdf @vue-office/pptx`)

/**
 * @description 网络地址预览代码示例
 */
const networkPreviewCode = ref(`<template>
  <div>
    <!-- Word 文档预览 -->
    <VueOfficeDocx 
      :src="docxUrl" 
      style="height: 100vh;" 
      @rendered="onDocxRendered" 
      @error="onError"
    />
    
    <!-- Excel 表格预览 -->
    <VueOfficeExcel 
      :src="excelUrl" 
      style="height: 100vh;" 
      @rendered="onExcelRendered" 
      @error="onError"
    />
    
    <!-- PDF 文档预览 -->
    <VueOfficePdf 
      :src="pdfUrl" 
      style="height: 100vh;" 
      @rendered="onPdfRendered" 
      @error="onError"
    />
    
    <!-- PowerPoint 演示文稿预览 -->
    <VueOfficePptx 
      :src="pptxUrl" 
      style="height: 100vh;" 
      @rendered="onPptxRendered" 
      @error="onError"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import VueOfficeDocx from '@vue-office/docx'
import VueOfficeExcel from '@vue-office/excel'
import VueOfficePdf from '@vue-office/pdf'
import VueOfficePptx from '@vue-office/pptx'

const docxUrl = ref('https://example.com/document.docx')
const excelUrl = ref('https://example.com/spreadsheet.xlsx')
const pdfUrl = ref('https://example.com/document.pdf')
const pptxUrl = ref('https://example.com/presentation.pptx')

const onDocxRendered = () => console.log('Word 文档渲染完成')
const onExcelRendered = () => console.log('Excel 表格渲染完成')
const onPdfRendered = () => console.log('PDF 文档渲染完成')
const onPptxRendered = () => console.log('PowerPoint 演示文稿渲染完成')
const onError = (error) => console.error('预览出错:', error)
<\/script>`)

/**
 * @description 文件上传预览代码示例
 */
const fileUploadCode = ref(`<template>
  <div>
    <input type="file" @change="handleFileChange" accept=".docx,.xlsx,.pdf,.pptx" />
    
    <!-- 根据文件类型显示对应的预览组件 -->
    <VueOfficeDocx 
      v-if="fileType === 'docx'" 
      :src="fileData" 
      style="height: 100vh;" 
    />
    <VueOfficeExcel 
      v-if="fileType === 'xlsx'" 
      :src="fileData" 
      style="height: 100vh;" 
    />
    <VueOfficePdf 
      v-if="fileType === 'pdf'" 
      :src="fileData" 
      style="height: 100vh;" 
    />
    <VueOfficePptx 
      v-if="fileType === 'pptx'" 
      :src="fileData" 
      style="height: 100vh;" 
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import VueOfficeDocx from '@vue-office/docx'
import VueOfficeExcel from '@vue-office/excel'
import VueOfficePdf from '@vue-office/pdf'
import VueOfficePptx from '@vue-office/pptx'

const fileData = ref(null)
const fileType = ref('')

const handleFileChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      fileData.value = e.target.result
      // 根据文件扩展名确定类型
      const extension = file.name.split('.').pop().toLowerCase()
      fileType.value = extension
    }
    reader.readAsArrayBuffer(file)
  }
}
<\/script>`)

/**
 * @description 二进制文件预览代码示例
 */
const binaryPreviewCode = ref(`<template>
  <div>
    <VueOfficeDocx 
      :src="arrayBufferData" 
      style="height: 100vh;" 
      @rendered="onRendered" 
      @error="onError"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import VueOfficeDocx from '@vue-office/docx'

const arrayBufferData = ref(null)

// 从服务器获取二进制数据
const fetchBinaryData = async () => {
  try {
    const response = await fetch('/api/document.docx')
    const arrayBuffer = await response.arrayBuffer()
    arrayBufferData.value = arrayBuffer
  } catch (error) {
    console.error('获取文档失败:', error)
  }
}

onMounted(() => {
  fetchBinaryData()
})

const onRendered = () => console.log('文档渲染完成')
const onError = (error) => console.error('预览出错:', error)
<\/script>`)

/**
 * @description Docx 配置选项代码示例
 */
const docxOptionsCode = ref(`// Docx 组件配置选项
const options = {
  // 是否显示页面边距
  ignoreWidth: false,
  // 是否忽略高度
  ignoreHeight: false,
  // 是否忽略字体
  ignoreFonts: false,
  // 是否调试模式
  debug: false,
  // 是否实验性功能
  experimental: false,
  // 类名前缀
  className: 'docx',
  // 是否内联样式
  inWrapper: true,
  // 是否忽略最后渲染的段落
  ignoreLastRenderedPageBreak: true,
  // 是否使用基础样式
  useBase64URL: false,
  // 渲染页眉页脚
  renderHeaders: true,
  renderFooters: true,
  // 渲染脚注尾注
  renderFootnotes: true,
  renderEndnotes: true
}`)

/**
 * @description Excel 配置选项代码示例
 */
const excelOptionsCode = ref(`// Excel 组件配置选项
const options = {
  // 是否显示网格线
  showGridLines: true,
  // 是否显示行号列号
  showRowColHeaders: true,
  // 是否显示公式栏
  showFormulaBar: true,
  // 是否允许编辑
  allowEdit: false,
  // 是否显示工具栏
  showToolbar: true,
  // 是否显示状态栏
  showStatusbar: true,
  // 是否显示工作表标签
  showSheetTabs: true,
  // 是否显示滚动条
  showScrollbars: true
}`)

/**
 * @description PDF 配置选项代码示例
 */
const pdfOptionsCode = ref(`// PDF 组件配置选项
const options = {
  // 缩放比例
  scale: 1.0,
  // 是否启用文本选择
  textLayerMode: 1,
  // 是否启用注释
  annotationMode: 2,
  // 渲染模式
  renderMode: 'canvas', // 'canvas' | 'svg'
  // 是否启用打印
  enablePrint: true,
  // 是否启用下载
  enableDownload: true,
  // 工具栏配置
  toolbar: {
    toolbarViewerLeft: true,
    toolbarViewerRight: true,
    toolbarViewerMiddle: true
  }
}`)

/**
 * @description 错误处理代码示例
 */
const errorHandlingCode = ref(`// 完整的错误处理示例
<template>
  <div>
    <n-spin :show="loading">
      <VueOfficeDocx 
        :src="docUrl" 
        @rendered="handleRendered"
        @error="handleError"
        style="height: 100vh;"
      />
    </n-spin>
    
    <!-- 错误提示 -->
    <n-result 
      v-if="error" 
      status="error" 
      title="文档加载失败"
      :description="error.message"
    >
      <template #footer>
        <n-button @click="retry">重试</n-button>
      </template>
    </n-result>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import VueOfficeDocx from '@vue-office/docx'

const loading = ref(true)
const error = ref(null)
const docUrl = ref('https://example.com/document.docx')

const handleRendered = () => {
  loading.value = false
  error.value = null
  console.log('文档渲染成功')
}

const handleError = (err) => {
  loading.value = false
  error.value = err
  
  // 根据错误类型进行不同处理
  if (err.name === 'NetworkError') {
    console.error('网络错误，请检查网络连接')
  } else if (err.name === 'ParseError') {
    console.error('文档解析错误，可能文件已损坏')
  } else {
    console.error('未知错误:', err)
  }
}

const retry = () => {
  loading.value = true
  error.value = null
  // 重新触发加载
  docUrl.value = docUrl.value + '?t=' + Date.now()
}
<\/script>`)

// 组件挂载时记录加载时间
onMounted(() => {
  loadTime.value = getCurrentTime()
  console.log('About 组件已加载，时间：', loadTime.value)
})
</script>

<style scoped>
.about {
  padding: 2rem;
  max-width: 900px;
  margin: 0 auto;
  min-height: calc(100vh - 4rem);
}

.about-card {
  width: 100%;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
}

.subtitle {
  font-size: 18px;
  opacity: 0.8;
}

.gradient-text {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-size: 3rem;
  font-weight: bold;
  margin: 0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .about {
    padding: 1rem;
  }
  
  .gradient-text {
    font-size: 2.5rem;
  }
  
  .subtitle {
    font-size: 16px;
  }
}

/* 深色主题适配 */
.dark .about-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
</style>