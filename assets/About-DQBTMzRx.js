import{q as v,s as ne,f as c,w as t,r as i,i as re,o as m,j as l,k as n,a as o,g,N as z,c as R,F as T,m as U,t as s,l as q,B as X,p as G}from"./index-Iy6KDkAz.js";import{_ as ue}from"./_plugin-vue_export-helper-DlAUqK2U.js";import{C as L}from"./CheckmarkCircleOutline-r2x9oe3a.js";import{H as ie}from"./HomeOutline-Cgg87-6A.js";const de={style:{"font-size":"18px"}},se={style:{"font-size":"18px"}},fe={__name:"About",setup(ae){const J=re(),M=v(""),K=()=>new Date().toLocaleString("zh-CN"),Q=()=>{J.push("/")},W=v({core:{title:"核心框架",icon:"🚀",color:"#18a058",packages:{vue:{version:"^3.5.22",description:"渐进式 JavaScript 框架，用于构建用户界面",homepage:"https://vuejs.org/",category:"framework"},"vue-router":{version:"^4.6.3",description:"Vue.js 官方路由管理器，提供单页应用路由功能",homepage:"https://router.vuejs.org/",category:"framework"},"vue-demi":{version:"^0.14.6",description:"Vue 2 和 Vue 3 的兼容层，支持跨版本开发",homepage:"https://github.com/vueuse/vue-demi",category:"framework"}}},ui:{title:"UI 组件库",icon:"🎨",color:"#2080f0",packages:{"naive-ui":{version:"^2.43.1",description:"现代化的 Vue 3 UI 组件库，提供丰富的组件和主题",homepage:"https://www.naiveui.com/",category:"ui"},"reka-ui":{version:"^2.6.0",description:"无样式、可访问的 Vue 组件库，提供高度可定制的组件",homepage:"https://reka-ui.com/",category:"ui"},vfonts:{version:"^0.0.3",description:"Naive UI 配套字体库，提供优雅的字体支持",homepage:"https://github.com/07akioni/vfonts",category:"ui"}}},office:{title:"文档预览",icon:"📄",color:"#f0a020",packages:{"@vue-office/docx":{version:"^1.6.3",description:"Vue 组件，用于预览 Word 文档 (.docx)，支持样式和格式",homepage:"https://501351981.github.io/vue-office/",category:"office"},"@vue-office/excel":{version:"^1.7.14",description:"Vue 组件，用于预览 Excel 表格 (.xlsx)，支持多工作表",homepage:"https://501351981.github.io/vue-office/",category:"office"},"@vue-office/pdf":{version:"^2.0.10",description:"Vue 组件，用于预览 PDF 文档，支持缩放和导航",homepage:"https://501351981.github.io/vue-office/",category:"office"},"@vue-office/pptx":{version:"^1.0.1",description:"Vue 组件，用于预览 PowerPoint 演示文稿 (.pptx)",homepage:"https://501351981.github.io/vue-office/",category:"office"}}},icons:{title:"图标库",icon:"🎯",color:"#d03050",packages:{"@vicons/ionicons5":{version:"^0.13.0",description:"Ionicons 5 图标库，提供丰富的矢量图标",homepage:"https://ionicons.com/",category:"icons"},"@iconify/vue":{version:"^5.0.0",description:"Iconify Vue 组件，支持超过 200,000 个图标",homepage:"https://iconify.design/",category:"icons"},"@iconify-json/radix-icons":{version:"^1.2.5",description:"Radix Icons 图标集，提供简洁现代的图标",homepage:"https://icons.radix-ui.com/",category:"icons"},"lucide-vue-next":{version:"^0.546.0",description:"Lucide 图标库的 Vue 3 版本，提供美观的线性图标",homepage:"https://lucide.dev/",category:"icons"}}},utils:{title:"工具库",icon:"🔧",color:"#722ed1",packages:{"@vueuse/core":{version:"^14.0.0",description:"Vue 组合式 API 工具集，提供丰富的可复用逻辑",homepage:"https://vueuse.org/",category:"utils"},"class-variance-authority":{version:"^0.7.1",description:"用于创建类型安全的 CSS 类变体的工具库",homepage:"https://cva.style/",category:"utils"},clsx:{version:"^2.1.1",description:"轻量级的条件类名构建工具",homepage:"https://github.com/lukeed/clsx",category:"utils"},"tailwind-merge":{version:"^3.3.1",description:"Tailwind CSS 类名合并工具，避免样式冲突",homepage:"https://github.com/dcastil/tailwind-merge",category:"utils"},"tailwindcss-animate":{version:"^1.0.7",description:"Tailwind CSS 动画插件，提供丰富的动画效果",homepage:"https://github.com/midudev/tailwindcss-animate",category:"utils"}}}}),H=v({build:{title:"构建工具",icon:"⚡",color:"#52c41a",packages:{vite:{version:"^7.1.11",description:"下一代前端构建工具，提供极速的开发体验",homepage:"https://vitejs.dev/",category:"build"},"@vitejs/plugin-vue":{version:"^6.0.1",description:"Vite 的 Vue 插件，提供 Vue SFC 支持",homepage:"https://github.com/vitejs/vite-plugin-vue",category:"build"},"vite-plugin-vue-devtools":{version:"^8.0.3",description:"Vue DevTools 的 Vite 插件，增强开发体验",homepage:"https://devtools.vuejs.org/",category:"build"}}},styles:{title:"样式工具",icon:"🎨",color:"#1890ff",packages:{tailwindcss:{version:"^4.1.16",description:"实用优先的 CSS 框架，提供原子化样式",homepage:"https://tailwindcss.com/",category:"styles"},"@tailwindcss/postcss":{version:"^4.1.16",description:"Tailwind CSS 的 PostCSS 插件",homepage:"https://tailwindcss.com/",category:"styles"},postcss:{version:"^8.5.6",description:"CSS 转换工具，支持插件生态系统",homepage:"https://postcss.org/",category:"styles"},autoprefixer:{version:"^10.4.21",description:"CSS 后处理器，自动添加浏览器前缀",homepage:"https://autoprefixer.github.io/",category:"styles"}}}}),A=()=>{let D=0,e=0;return Object.values(W.value).forEach(E=>{D+=Object.keys(E.packages).length}),Object.values(H.value).forEach(E=>{e+=Object.keys(E.packages).length}),{totalDeps:D,totalDevDeps:e,totalAll:D+e}},Y=v(`# 安装 vue-office 相关依赖
npm install @vue-office/docx @vue-office/excel @vue-office/pdf @vue-office/pptx

# 或者使用 yarn
yarn add @vue-office/docx @vue-office/excel @vue-office/pdf @vue-office/pptx`),Z=v(`<template>
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
<\/script>`),$=v(`<template>
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
<\/script>`),_=v(`<template>
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
<\/script>`),h=v(`// Docx 组件配置选项
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
}`),ee=v(`// Excel 组件配置选项
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
}`),te=v(`// PDF 组件配置选项
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
}`),le=v(`// 完整的错误处理示例
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
<\/script>`);return ne(()=>{M.value=K(),console.log("About 组件已加载，时间：",M.value)}),(D,e)=>{const E=i("n-h1"),I=i("n-p"),f=i("n-card"),j=i("n-h2"),F=i("mcreference"),P=i("n-divider"),y=i("n-avatar"),b=i("n-thing"),a=i("n-list-item"),S=i("n-list"),r=i("n-code"),O=i("n-h3"),p=i("n-h4"),C=i("n-table"),u=i("n-space"),oe=i("n-alert"),x=i("n-text"),V=i("n-tag"),k=i("n-button");return m(),c(u,{vertical:"",size:"large",style:{padding:"24px","max-width":"1200px",margin:"0 auto"}},{default:t(()=>[l(E,{style:{"text-align":"center",background:"linear-gradient(135deg, #667eea 0%, #764ba2 100%)","-webkit-background-clip":"text","-webkit-text-fill-color":"transparent","background-clip":"text"}},{default:t(()=>[...e[0]||(e[0]=[n(" 关于文档预览系统 ",-1)])]),_:1}),l(f,{title:"项目简介",size:"large"},{default:t(()=>[l(I,null,{default:t(()=>[...e[1]||(e[1]=[n(" 这是一个基于 Vue 3 和 Naive UI 构建的现代化文档预览系统，支持多种文档格式的在线预览功能。 系统采用了最新的前端技术栈，提供了优雅的用户界面和流畅的用户体验。 核心预览功能基于 vue-office 组件库实现，支持 Word、Excel、PDF 和 PowerPoint 文档的高质量在线预览。 ",-1)])]),_:1})]),_:1}),l(f,{title:"Vue Office 配置说明",size:"large"},{default:t(()=>[l(j,{style:{background:"linear-gradient(135deg, #18a058 0%, #2080f0 100%)","-webkit-background-clip":"text","-webkit-text-fill-color":"transparent","background-clip":"text"}},{default:t(()=>[...e[2]||(e[2]=[n(" 核心组件库介绍 ",-1)])]),_:1}),l(I,null,{default:t(()=>[e[4]||(e[4]=n(" vue-office 是一个支持多种文件格式预览的 Vue 组件库，支持 Vue 2 和 Vue 3。",-1)),l(F,{link:"https://501351981.github.io/vue-office/examples/docs/guide/",index:"2"},{default:t(()=>[...e[3]||(e[3]=[n("2",-1)])]),_:1})]),_:1}),l(P,{"title-placement":"left"},{default:t(()=>[...e[5]||(e[5]=[n("功能特色",-1)])]),_:1}),l(S,null,{default:t(()=>[l(a,null,{default:t(()=>[l(b,null,{avatar:t(()=>[l(y,{style:{"background-color":"#18a058"}},{default:t(()=>[...e[6]||(e[6]=[n("🎯",-1)])]),_:1})]),header:t(()=>[...e[7]||(e[7]=[n("一站式解决方案",-1)])]),description:t(()=>[e[9]||(e[9]=n(" 提供 docx、xlsx、pdf、pptx 多种文档的在线预览方案，有它就够了 ",-1)),l(F,{link:"https://501351981.github.io/vue-office/examples/docs/guide/",index:"2"},{default:t(()=>[...e[8]||(e[8]=[n("2",-1)])]),_:1})]),_:1})]),_:1}),l(a,null,{default:t(()=>[l(b,null,{avatar:t(()=>[l(y,{style:{"background-color":"#2080f0"}},{default:t(()=>[...e[10]||(e[10]=[n("⚡",-1)])]),_:1})]),header:t(()=>[...e[11]||(e[11]=[n("使用简单",-1)])]),description:t(()=>[e[13]||(e[13]=n(" 只需提供文档的 src（网络地址）即可完成文档预览，也支持 ArrayBuffer、Blob 等多种格式 ",-1)),l(F,{link:"https://501351981.github.io/vue-office/examples/docs/guide/",index:"2"},{default:t(()=>[...e[12]||(e[12]=[n("2",-1)])]),_:1})]),_:1})]),_:1}),l(a,null,{default:t(()=>[l(b,null,{avatar:t(()=>[l(y,{style:{"background-color":"#f0a020"}},{default:t(()=>[...e[14]||(e[14]=[n("🎨",-1)])]),_:1})]),header:t(()=>[...e[15]||(e[15]=[n("样式支持",-1)])]),description:t(()=>[e[17]||(e[17]=n(" 不仅能预览内容，也支持文档样式，最大限度还原 office 文件内容 ",-1)),l(F,{link:"https://501351981.github.io/vue-office/examples/docs/guide/",index:"2"},{default:t(()=>[...e[16]||(e[16]=[n("2",-1)])]),_:1})]),_:1})]),_:1})]),_:1}),l(P,{"title-placement":"left"},{default:t(()=>[...e[18]||(e[18]=[n("安装配置",-1)])]),_:1}),l(I,null,{default:t(()=>[...e[19]||(e[19]=[n("项目中已安装的 vue-office 相关依赖：",-1)])]),_:1}),l(r,{language:"bash",code:Y.value},null,8,["code"]),l(P,{"title-placement":"left"},{default:t(()=>[...e[20]||(e[20]=[n("基本使用方法",-1)])]),_:1}),l(O,null,{default:t(()=>[...e[21]||(e[21]=[n("1. 网络地址预览",-1)])]),_:1}),l(r,{language:"vue",code:Z.value},null,8,["code"]),l(O,null,{default:t(()=>[...e[22]||(e[22]=[n("2. 文件上传预览",-1)])]),_:1}),l(r,{language:"vue",code:$.value},null,8,["code"]),l(O,null,{default:t(()=>[...e[23]||(e[23]=[n("3. 二进制文件预览",-1)])]),_:1}),l(r,{language:"vue",code:_.value},null,8,["code"])]),_:1}),l(f,{title:"详细 API 文档",size:"large"},{default:t(()=>[l(j,{style:{background:"linear-gradient(135deg, #18a058 0%, #2080f0 100%)","-webkit-background-clip":"text","-webkit-text-fill-color":"transparent","background-clip":"text"}},{default:t(()=>[...e[24]||(e[24]=[n(" 完整 API 参考 ",-1)])]),_:1}),l(f,{title:"VueOfficeDocx 组件",size:"medium",style:{"margin-bottom":"16px"}},{default:t(()=>[l(u,{vertical:"",size:"large"},{default:t(()=>[o("div",null,[l(p,null,{default:t(()=>[...e[25]||(e[25]=[n("基本属性 (Props)",-1)])]),_:1}),l(C,{bordered:!1,"single-line":!1},{default:t(()=>[e[38]||(e[38]=o("thead",null,[o("tr",null,[o("th",null,"属性名"),o("th",null,"类型"),o("th",null,"默认值"),o("th",null,"说明")])],-1)),o("tbody",null,[o("tr",null,[o("td",null,[l(r,null,{default:t(()=>[...e[26]||(e[26]=[n("src",-1)])]),_:1})]),e[27]||(e[27]=o("td",null,"String | ArrayBuffer | Blob",-1)),e[28]||(e[28]=o("td",null,"-",-1)),e[29]||(e[29]=o("td",null,"文档地址，支持网络地址、ArrayBuffer 或 Blob 格式",-1))]),o("tr",null,[o("td",null,[l(r,null,{default:t(()=>[...e[30]||(e[30]=[n("request-options",-1)])]),_:1})]),e[31]||(e[31]=o("td",null,"Object",-1)),e[32]||(e[32]=o("td",null,"{}",-1)),e[33]||(e[33]=o("td",null,"fetch 请求参数，可设置 headers 等请求信息",-1))]),o("tr",null,[o("td",null,[l(r,null,{default:t(()=>[...e[34]||(e[34]=[n("options",-1)])]),_:1})]),e[35]||(e[35]=o("td",null,"Object",-1)),e[36]||(e[36]=o("td",null,"{}",-1)),e[37]||(e[37]=o("td",null,"预览配置选项，详见下方配置说明",-1))])])]),_:1})]),o("div",null,[l(p,null,{default:t(()=>[...e[39]||(e[39]=[n("事件 (Events)",-1)])]),_:1}),l(C,{bordered:!1,"single-line":!1},{default:t(()=>[e[46]||(e[46]=o("thead",null,[o("tr",null,[o("th",null,"事件名"),o("th",null,"参数"),o("th",null,"说明")])],-1)),o("tbody",null,[o("tr",null,[o("td",null,[l(r,null,{default:t(()=>[...e[40]||(e[40]=[n("@rendered",-1)])]),_:1})]),e[41]||(e[41]=o("td",null,"-",-1)),e[42]||(e[42]=o("td",null,"渲染完成时触发，可用于关闭 loading 状态",-1))]),o("tr",null,[o("td",null,[l(r,null,{default:t(()=>[...e[43]||(e[43]=[n("@error",-1)])]),_:1})]),e[44]||(e[44]=o("td",null,"error",-1)),e[45]||(e[45]=o("td",null,"渲染失败时触发，包括网络请求失败、解析失败等",-1))])])]),_:1})]),o("div",null,[l(p,null,{default:t(()=>[...e[47]||(e[47]=[n("Docx 特殊配置选项",-1)])]),_:1}),l(r,{code:h.value,language:"javascript"},null,8,["code"])])]),_:1})]),_:1}),l(f,{title:"VueOfficeExcel 组件",size:"medium",style:{"margin-bottom":"16px"}},{default:t(()=>[l(u,{vertical:"",size:"large"},{default:t(()=>[o("div",null,[l(p,null,{default:t(()=>[...e[48]||(e[48]=[n("基本属性 (Props)",-1)])]),_:1}),l(C,{bordered:!1,"single-line":!1},{default:t(()=>[e[61]||(e[61]=o("thead",null,[o("tr",null,[o("th",null,"属性名"),o("th",null,"类型"),o("th",null,"默认值"),o("th",null,"说明")])],-1)),o("tbody",null,[o("tr",null,[o("td",null,[l(r,null,{default:t(()=>[...e[49]||(e[49]=[n("src",-1)])]),_:1})]),e[50]||(e[50]=o("td",null,"String | ArrayBuffer | Blob",-1)),e[51]||(e[51]=o("td",null,"-",-1)),e[52]||(e[52]=o("td",null,"Excel 文档地址或二进制数据",-1))]),o("tr",null,[o("td",null,[l(r,null,{default:t(()=>[...e[53]||(e[53]=[n("request-options",-1)])]),_:1})]),e[54]||(e[54]=o("td",null,"Object",-1)),e[55]||(e[55]=o("td",null,"{}",-1)),e[56]||(e[56]=o("td",null,"fetch 请求参数配置",-1))]),o("tr",null,[o("td",null,[l(r,null,{default:t(()=>[...e[57]||(e[57]=[n("options",-1)])]),_:1})]),e[58]||(e[58]=o("td",null,"Object",-1)),e[59]||(e[59]=o("td",null,"{}",-1)),e[60]||(e[60]=o("td",null,"Excel 预览配置选项",-1))])])]),_:1})]),o("div",null,[l(p,null,{default:t(()=>[...e[62]||(e[62]=[n("Excel 特殊配置选项",-1)])]),_:1}),l(r,{code:ee.value,language:"javascript"},null,8,["code"])])]),_:1})]),_:1}),l(f,{title:"VueOfficePdf 组件",size:"medium",style:{"margin-bottom":"16px"}},{default:t(()=>[l(u,{vertical:"",size:"large"},{default:t(()=>[o("div",null,[l(p,null,{default:t(()=>[...e[63]||(e[63]=[n("基本属性 (Props)",-1)])]),_:1}),l(C,{bordered:!1,"single-line":!1},{default:t(()=>[e[80]||(e[80]=o("thead",null,[o("tr",null,[o("th",null,"属性名"),o("th",null,"类型"),o("th",null,"默认值"),o("th",null,"说明")])],-1)),o("tbody",null,[o("tr",null,[o("td",null,[l(r,null,{default:t(()=>[...e[64]||(e[64]=[n("src",-1)])]),_:1})]),e[65]||(e[65]=o("td",null,"String | ArrayBuffer | Blob",-1)),e[66]||(e[66]=o("td",null,"-",-1)),e[67]||(e[67]=o("td",null,"PDF 文档地址或二进制数据",-1))]),o("tr",null,[o("td",null,[l(r,null,{default:t(()=>[...e[68]||(e[68]=[n("request-options",-1)])]),_:1})]),e[69]||(e[69]=o("td",null,"Object",-1)),e[70]||(e[70]=o("td",null,"{}",-1)),e[71]||(e[71]=o("td",null,"fetch 请求参数配置",-1))]),o("tr",null,[o("td",null,[l(r,null,{default:t(()=>[...e[72]||(e[72]=[n("options",-1)])]),_:1})]),e[73]||(e[73]=o("td",null,"Object",-1)),e[74]||(e[74]=o("td",null,"{}",-1)),e[75]||(e[75]=o("td",null,"PDF 预览配置选项",-1))]),o("tr",null,[o("td",null,[l(r,null,{default:t(()=>[...e[76]||(e[76]=[n("static-file-url",-1)])]),_:1})]),e[77]||(e[77]=o("td",null,"String",-1)),e[78]||(e[78]=o("td",null,"https://unpkg.com/pdfjs-dist@3.1.81/",-1)),e[79]||(e[79]=o("td",null,"PDF.js 静态文件地址，用于加载 bcmap 文件",-1))])])]),_:1})]),o("div",null,[l(p,null,{default:t(()=>[...e[81]||(e[81]=[n("PDF 特殊配置选项",-1)])]),_:1}),l(r,{code:te.value,language:"javascript"},null,8,["code"])])]),_:1})]),_:1}),l(f,{title:"VueOfficePptx 组件",size:"medium",style:{"margin-bottom":"16px"}},{default:t(()=>[l(u,{vertical:"",size:"large"},{default:t(()=>[o("div",null,[l(p,null,{default:t(()=>[...e[82]||(e[82]=[n("基本属性 (Props)",-1)])]),_:1}),l(C,{bordered:!1,"single-line":!1},{default:t(()=>[e[91]||(e[91]=o("thead",null,[o("tr",null,[o("th",null,"属性名"),o("th",null,"类型"),o("th",null,"默认值"),o("th",null,"说明")])],-1)),o("tbody",null,[o("tr",null,[o("td",null,[l(r,null,{default:t(()=>[...e[83]||(e[83]=[n("src",-1)])]),_:1})]),e[84]||(e[84]=o("td",null,"String | ArrayBuffer | Blob",-1)),e[85]||(e[85]=o("td",null,"-",-1)),e[86]||(e[86]=o("td",null,"PPTX 文档地址或二进制数据",-1))]),o("tr",null,[o("td",null,[l(r,null,{default:t(()=>[...e[87]||(e[87]=[n("request-options",-1)])]),_:1})]),e[88]||(e[88]=o("td",null,"Object",-1)),e[89]||(e[89]=o("td",null,"{}",-1)),e[90]||(e[90]=o("td",null,"fetch 请求参数配置",-1))])])]),_:1})]),o("div",null,[l(p,null,{default:t(()=>[...e[92]||(e[92]=[n("PPTX 使用说明",-1)])]),_:1}),l(oe,{type:"info",title:"注意事项"},{default:t(()=>[...e[93]||(e[93]=[n(" PPTX 组件目前功能相对简单，主要支持基本的幻灯片预览。建议在使用前测试具体的 PPTX 文件兼容性。 ",-1)])]),_:1})])]),_:1})]),_:1})]),_:1}),l(f,{title:"最佳实践与错误处理",size:"large"},{default:t(()=>[l(j,{style:{background:"linear-gradient(135deg, #18a058 0%, #2080f0 100%)","-webkit-background-clip":"text","-webkit-text-fill-color":"transparent","background-clip":"text"}},{default:t(()=>[...e[94]||(e[94]=[n(" 开发指南 ",-1)])]),_:1}),l(u,{vertical:"",size:"large"},{default:t(()=>[o("div",null,[l(O,null,{default:t(()=>[...e[95]||(e[95]=[n("错误处理",-1)])]),_:1}),l(r,{code:le.value,language:"javascript"},null,8,["code"])]),o("div",null,[l(O,null,{default:t(()=>[...e[96]||(e[96]=[n("性能优化建议",-1)])]),_:1}),l(S,null,{default:t(()=>[l(a,null,{default:t(()=>[l(x,null,{default:t(()=>[l(x,{strong:""},{default:t(()=>[...e[97]||(e[97]=[n("文件大小控制：",-1)])]),_:1}),e[98]||(e[98]=n(" 建议单个文件大小不超过 50MB，过大的文件可能导致浏览器卡顿 ",-1))]),_:1})]),_:1}),l(a,null,{default:t(()=>[l(x,null,{default:t(()=>[l(x,{strong:""},{default:t(()=>[...e[99]||(e[99]=[n("懒加载：",-1)])]),_:1}),e[100]||(e[100]=n(" 对于多个文档预览场景，建议使用懒加载避免同时加载多个大文件 ",-1))]),_:1})]),_:1}),l(a,null,{default:t(()=>[l(x,null,{default:t(()=>[l(x,{strong:""},{default:t(()=>[...e[101]||(e[101]=[n("缓存策略：",-1)])]),_:1}),e[102]||(e[102]=n(" 对于网络文档，建议在服务端设置适当的缓存策略 ",-1))]),_:1})]),_:1}),l(a,null,{default:t(()=>[l(x,null,{default:t(()=>[l(x,{strong:""},{default:t(()=>[...e[103]||(e[103]=[n("Loading 状态：",-1)])]),_:1}),e[104]||(e[104]=n(" 始终为用户提供加载状态反馈，提升用户体验 ",-1))]),_:1})]),_:1})]),_:1})]),o("div",null,[l(O,null,{default:t(()=>[...e[105]||(e[105]=[n("浏览器兼容性",-1)])]),_:1}),l(C,{bordered:!1,"single-line":!1},{default:t(()=>[...e[106]||(e[106]=[o("thead",null,[o("tr",null,[o("th",null,"浏览器"),o("th",null,"最低版本"),o("th",null,"说明")])],-1),o("tbody",null,[o("tr",null,[o("td",null,"Chrome"),o("td",null,"60+"),o("td",null,"完全支持")]),o("tr",null,[o("td",null,"Firefox"),o("td",null,"55+"),o("td",null,"完全支持")]),o("tr",null,[o("td",null,"Safari"),o("td",null,"12+"),o("td",null,"完全支持")]),o("tr",null,[o("td",null,"Edge"),o("td",null,"79+"),o("td",null,"完全支持")]),o("tr",null,[o("td",null,"IE"),o("td",null,"不支持"),o("td",null,"建议使用现代浏览器")])],-1)])]),_:1})])]),_:1})]),_:1}),l(f,{title:"项目依赖项",size:"large"},{"header-extra":t(()=>[l(u,null,{default:t(()=>[l(V,{type:"success",size:"small"},{default:t(()=>[n(" 总计: "+s(A().totalAll)+" 个 ",1)]),_:1}),l(V,{type:"info",size:"small"},{default:t(()=>[n(" 生产: "+s(A().totalDeps)+" 个 ",1)]),_:1}),l(V,{type:"warning",size:"small"},{default:t(()=>[n(" 开发: "+s(A().totalDevDeps)+" 个 ",1)]),_:1})]),_:1})]),default:t(()=>[l(j,{style:{background:"linear-gradient(135deg, #d03050 0%, #f0a020 100%)","-webkit-background-clip":"text","-webkit-text-fill-color":"transparent","background-clip":"text"}},{default:t(()=>[...e[107]||(e[107]=[n(" 完整依赖列表 ",-1)])]),_:1}),l(P,{"title-placement":"left"},{default:t(()=>[l(u,{align:"center"},{default:t(()=>[l(g(z),{size:"20",color:"#18a058"},{default:t(()=>[l(g(L))]),_:1}),e[108]||(e[108]=o("span",null,"生产依赖 (Dependencies)",-1))]),_:1})]),_:1}),l(u,{vertical:"",size:"large"},{default:t(()=>[(m(!0),R(T,null,U(W.value,(d,N)=>(m(),c(f,{key:N,title:d.title,size:"medium",style:{"margin-bottom":"16px"}},{"header-extra":t(()=>[l(u,{align:"center"},{default:t(()=>[o("span",de,s(d.icon),1),l(V,{color:{color:d.color,textColor:"#fff"},size:"small"},{default:t(()=>[n(s(Object.keys(d.packages).length)+" 个 ",1)]),_:2},1032,["color"])]),_:2},1024)]),default:t(()=>[l(S,null,{default:t(()=>[(m(!0),R(T,null,U(d.packages,(w,B)=>(m(),c(a,{key:B},{default:t(()=>[l(b,null,{avatar:t(()=>[l(y,{style:G({backgroundColor:d.color})},{default:t(()=>[n(s(d.icon),1)]),_:2},1032,["style"])]),header:t(()=>[l(u,{align:"center"},{default:t(()=>[l(x,{strong:""},{default:t(()=>[n(s(B),1)]),_:2},1024),l(V,{type:"success",size:"tiny"},{default:t(()=>[n(s(w.version),1)]),_:2},1024),w.homepage?(m(),c(k,{key:0,text:"",size:"tiny",type:"primary",onClick:()=>D.window.open(w.homepage,"_blank")},{icon:t(()=>[l(g(z),null,{default:t(()=>[l(g(X))]),_:1})]),default:t(()=>[e[109]||(e[109]=n(" 文档 ",-1))]),_:1},8,["onClick"])):q("",!0)]),_:2},1024)]),description:t(()=>[n(s(w.description),1)]),_:2},1024)]),_:2},1024))),128))]),_:2},1024)]),_:2},1032,["title"]))),128))]),_:1}),l(P,{"title-placement":"left",style:{"margin-top":"32px"}},{default:t(()=>[l(u,{align:"center"},{default:t(()=>[l(g(z),{size:"20",color:"#2080f0"},{default:t(()=>[l(g(L))]),_:1}),e[110]||(e[110]=o("span",null,"开发依赖 (DevDependencies)",-1))]),_:1})]),_:1}),l(u,{vertical:"",size:"large"},{default:t(()=>[(m(!0),R(T,null,U(H.value,(d,N)=>(m(),c(f,{key:N,title:d.title,size:"medium",style:{"margin-bottom":"16px"}},{"header-extra":t(()=>[l(u,{align:"center"},{default:t(()=>[o("span",se,s(d.icon),1),l(V,{color:{color:d.color,textColor:"#fff"},size:"small"},{default:t(()=>[n(s(Object.keys(d.packages).length)+" 个 ",1)]),_:2},1032,["color"])]),_:2},1024)]),default:t(()=>[l(S,null,{default:t(()=>[(m(!0),R(T,null,U(d.packages,(w,B)=>(m(),c(a,{key:B},{default:t(()=>[l(b,null,{avatar:t(()=>[l(y,{style:G({backgroundColor:d.color})},{default:t(()=>[n(s(d.icon),1)]),_:2},1032,["style"])]),header:t(()=>[l(u,{align:"center"},{default:t(()=>[l(x,{strong:""},{default:t(()=>[n(s(B),1)]),_:2},1024),l(V,{type:"info",size:"tiny"},{default:t(()=>[n(s(w.version),1)]),_:2},1024),w.homepage?(m(),c(k,{key:0,text:"",size:"tiny",type:"primary",onClick:()=>D.window.open(w.homepage,"_blank")},{icon:t(()=>[l(g(z),null,{default:t(()=>[l(g(X))]),_:1})]),default:t(()=>[e[111]||(e[111]=n(" 文档 ",-1))]),_:1},8,["onClick"])):q("",!0)]),_:2},1024)]),description:t(()=>[n(s(w.description),1)]),_:2},1024)]),_:2},1024))),128))]),_:2},1024)]),_:2},1032,["title"]))),128))]),_:1}),l(P,{"title-placement":"left",style:{"margin-top":"32px"}},{default:t(()=>[l(u,{align:"center"},{default:t(()=>[l(g(z),{size:"20",color:"#722ed1"},{default:t(()=>[l(g(L))]),_:1}),e[112]||(e[112]=o("span",null,"安装命令",-1))]),_:1})]),_:1}),l(u,{vertical:"",size:"medium"},{default:t(()=>[o("div",null,[l(p,null,{default:t(()=>[...e[113]||(e[113]=[n("安装所有依赖",-1)])]),_:1}),l(r,{language:"bash",code:"npm install"})]),o("div",null,[l(p,null,{default:t(()=>[...e[114]||(e[114]=[n("安装特定依赖",-1)])]),_:1}),l(r,{language:"bash",code:"npm install @vue-office/docx @vue-office/excel @vue-office/pdf"})]),o("div",null,[l(p,null,{default:t(()=>[...e[115]||(e[115]=[n("开发环境启动",-1)])]),_:1}),l(r,{language:"bash",code:"npm run dev"})])]),_:1})]),_:1}),l(f,{title:"系统功能特性",size:"large"},{default:t(()=>[l(S,null,{default:t(()=>[l(a,null,{default:t(()=>[l(b,null,{avatar:t(()=>[l(y,{style:{"background-color":"#18a058"}},{default:t(()=>[...e[116]||(e[116]=[n("📄",-1)])]),_:1})]),header:t(()=>[...e[117]||(e[117]=[n("Word 文档预览",-1)])]),description:t(()=>[...e[118]||(e[118]=[n(" 支持 .docx 格式的 Word 文档在线预览，保持原有格式和样式，支持网络地址和文件上传两种方式 ",-1)])]),_:1})]),_:1}),l(a,null,{default:t(()=>[l(b,null,{avatar:t(()=>[l(y,{style:{"background-color":"#2080f0"}},{default:t(()=>[...e[119]||(e[119]=[n("📊",-1)])]),_:1})]),header:t(()=>[...e[120]||(e[120]=[n("Excel 表格预览",-1)])]),description:t(()=>[...e[121]||(e[121]=[n(" 支持 .xlsx 格式的 Excel 表格在线预览，完整显示数据和格式，支持多工作表切换 ",-1)])]),_:1})]),_:1}),l(a,null,{default:t(()=>[l(b,null,{avatar:t(()=>[l(y,{style:{"background-color":"#f0a020"}},{default:t(()=>[...e[122]||(e[122]=[n("📋",-1)])]),_:1})]),header:t(()=>[...e[123]||(e[123]=[n("PDF 文档预览",-1)])]),description:t(()=>[...e[124]||(e[124]=[n(" 支持 PDF 文档的高质量在线预览，支持缩放、页面导航和全屏查看 ",-1)])]),_:1})]),_:1}),l(a,null,{default:t(()=>[l(b,null,{avatar:t(()=>[l(y,{style:{"background-color":"#d03050"}},{default:t(()=>[...e[125]||(e[125]=[n("🎯",-1)])]),_:1})]),header:t(()=>[...e[126]||(e[126]=[n("PowerPoint 演示文稿预览",-1)])]),description:t(()=>[...e[127]||(e[127]=[n(" 支持 .pptx 格式的 PowerPoint 演示文稿在线预览，保持动画和样式效果 ",-1)])]),_:1})]),_:1})]),_:1})]),_:1}),l(f,{title:"技术栈",size:"large"},{default:t(()=>[l(u,null,{default:t(()=>[l(k,{type:"primary",ghost:""},{default:t(()=>[...e[128]||(e[128]=[n("Vue 3.5.22",-1)])]),_:1}),l(k,{type:"info",ghost:""},{default:t(()=>[...e[129]||(e[129]=[n("Naive UI 2.43.1",-1)])]),_:1}),l(k,{type:"success",ghost:""},{default:t(()=>[...e[130]||(e[130]=[n("Vue Router 4.6.3",-1)])]),_:1}),l(k,{type:"warning",ghost:""},{default:t(()=>[...e[131]||(e[131]=[n("Vite 7.1.11",-1)])]),_:1}),l(k,{type:"error",ghost:""},{default:t(()=>[...e[132]||(e[132]=[n("Tailwind CSS 4.1.16",-1)])]),_:1}),l(k,{type:"tertiary",ghost:""},{default:t(()=>[...e[133]||(e[133]=[n("Vue Office",-1)])]),_:1})]),_:1})]),_:1}),l(P),l(u,{justify:"center"},{default:t(()=>[l(k,{type:"primary",size:"large",onClick:Q},{icon:t(()=>[l(g(z),null,{default:t(()=>[l(g(ie))]),_:1})]),default:t(()=>[e[134]||(e[134]=n(" 返回首页 ",-1))]),_:1})]),_:1})]),_:1})}}},xe=ue(fe,[["__scopeId","data-v-99f7741e"]]);export{xe as default};
