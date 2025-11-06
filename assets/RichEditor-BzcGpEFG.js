import{H as B,b as E,e as w,q as N,f as g,w as t,g as r,h as V,r as l,o as h,a as d,j as e,k as a,ao as S,t as $,l as q}from"./index-Iy6KDkAz.js";import{r as F}from"./markdown-DnJce2-J.js";import{_ as I}from"./_plugin-vue_export-helper-DlAUqK2U.js";import{T as P}from"./TrashOutline-Cc7vML9h.js";import{D as Q}from"./DownloadOutline-D2K535ag.js";import{C as W}from"./CodeOutline-DTUqLAuC.js";import{C as f}from"./CheckmarkCircleOutline-r2x9oe3a.js";const Y={class:"rich-editor-page"},A={class:"content-container"},G={class:"page-header"},J={class:"page-title"},K={class:"editor-wrapper"},X=["innerHTML"],Z={__name:"RichEditor",setup(tt){const u=B(),b=E(),x=w(()=>b.isDark),s=N(`# 欢迎使用富文本编辑器

这是一个基于 Markdown 的富文本编辑器，支持实时预览。

## 功能特性

- **Markdown 语法支持**
- **代码高亮显示**
- **实时预览**
- **导出功能**

## 代码示例

\`\`\`javascript
function hello() {
  console.log('Hello, World!')
}
\`\`\`

## 列表示例

1. 第一项
2. 第二项
3. 第三项

---

开始编辑你的内容吧！`),k=w(()=>s.value?F(s.value):""),y=w(()=>s.value.length),C=()=>{s.value="",u.success("内容已清空")},M=()=>{if(!s.value){u.warning("内容为空，无法导出");return}const c=new Blob([s.value],{type:"text/markdown"}),n=URL.createObjectURL(c),o=document.createElement("a");o.href=n,o.download=`document-${Date.now()}.md`,o.click(),URL.revokeObjectURL(n),u.success("Markdown 文件已导出")},L=()=>{if(!s.value){u.warning("内容为空，无法导出");return}const c=`<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/github.min.css">
  <style>
    body { max-width: 800px; margin: 40px auto; padding: 0 20px; font-family: system-ui, -apple-system, sans-serif; line-height: 1.6; }
    img { max-width: 100%; }
    code { background: #f4f4f4; padding: 2px 6px; border-radius: 3px; }
    pre { background: #f4f4f4; padding: 16px; border-radius: 6px; overflow-x: auto; }
  </style>
</head>
<body>
${k.value}
</body>
</html>`,n=new Blob([c],{type:"text/html"}),o=URL.createObjectURL(n),i=document.createElement("a");i.href=o,i.download=`document-${Date.now()}.html`,i.click(),URL.revokeObjectURL(o),u.success("HTML 文件已导出")};return(c,n)=>{const o=l("n-icon"),i=l("n-button"),p=l("n-space"),T=l("n-text"),R=l("n-input"),v=l("n-card"),j=l("n-empty"),m=l("n-thing"),_=l("n-list-item"),O=l("n-list"),U=l("n-layout-content"),D=l("n-layout"),z=l("n-config-provider");return h(),g(z,{theme:x.value?r(V):null},{default:t(()=>[d("div",Y,[e(D,null,{default:t(()=>[e(U,{class:"editor-content"},{default:t(()=>[d("div",A,[d("div",G,[d("h1",J,[e(o,{component:r(S)},null,8,["component"]),n[1]||(n[1]=a(" 富文本编辑器 ",-1))]),n[2]||(n[2]=d("p",{class:"page-subtitle"}," 基于 Quill 的现代化富文本编辑器，支持 Markdown、代码高亮等功能 ",-1))]),e(v,null,{default:t(()=>[e(p,{vertical:"",size:16},{default:t(()=>[e(p,{justify:"space-between"},{default:t(()=>[e(p,null,{default:t(()=>[e(i,{onClick:C},{icon:t(()=>[e(o,{component:r(P)},null,8,["component"])]),default:t(()=>[n[3]||(n[3]=a(" 清空 ",-1))]),_:1}),e(i,{onClick:M},{icon:t(()=>[e(o,{component:r(Q)},null,8,["component"])]),default:t(()=>[n[4]||(n[4]=a(" 导出 Markdown ",-1))]),_:1}),e(i,{onClick:L},{icon:t(()=>[e(o,{component:r(W)},null,8,["component"])]),default:t(()=>[n[5]||(n[5]=a(" 导出 HTML ",-1))]),_:1})]),_:1}),e(p,null,{default:t(()=>[e(T,{depth:"3"},{default:t(()=>[a("字数: "+$(y.value),1)]),_:1})]),_:1})]),_:1}),d("div",K,[e(R,{value:s.value,"onUpdate:value":n[0]||(n[0]=H=>s.value=H),type:"textarea",placeholder:`开始编写内容...

支持 Markdown 语法：
# 标题
**粗体** *斜体*
- 列表项
[链接](url)
\`\`\`代码块\`\`\``,autosize:{minRows:20,maxRows:40},class:"markdown-editor"},null,8,["value"])])]),_:1})]),_:1}),e(v,{title:"实时预览",style:{"margin-top":"24px"}},{default:t(()=>[d("div",{class:"markdown-preview",innerHTML:k.value},null,8,X),s.value?q("",!0):(h(),g(j,{key:0,description:"内容预览将在这里显示",size:"large"}))]),_:1}),e(v,{title:"功能特性",style:{"margin-top":"24px"}},{default:t(()=>[e(O,null,{default:t(()=>[e(_,null,{default:t(()=>[e(m,null,{avatar:t(()=>[e(o,{component:r(f),color:"#18a058",size:"24"},null,8,["component"])]),header:t(()=>[...n[6]||(n[6]=[a("Markdown 支持",-1)])]),description:t(()=>[...n[7]||(n[7]=[a(" 完整支持 Markdown 语法，包括标题、列表、链接、图片等 ",-1)])]),_:1})]),_:1}),e(_,null,{default:t(()=>[e(m,null,{avatar:t(()=>[e(o,{component:r(f),color:"#18a058",size:"24"},null,8,["component"])]),header:t(()=>[...n[8]||(n[8]=[a("代码高亮",-1)])]),description:t(()=>[...n[9]||(n[9]=[a(" 支持多种编程语言的语法高亮显示 ",-1)])]),_:1})]),_:1}),e(_,null,{default:t(()=>[e(m,null,{avatar:t(()=>[e(o,{component:r(f),color:"#18a058",size:"24"},null,8,["component"])]),header:t(()=>[...n[10]||(n[10]=[a("实时预览",-1)])]),description:t(()=>[...n[11]||(n[11]=[a(" 编辑内容实时渲染预览，所见即所得 ",-1)])]),_:1})]),_:1}),e(_,null,{default:t(()=>[e(m,null,{avatar:t(()=>[e(o,{component:r(f),color:"#18a058",size:"24"},null,8,["component"])]),header:t(()=>[...n[12]||(n[12]=[a("导出功能",-1)])]),description:t(()=>[...n[13]||(n[13]=[a(" 支持导出为 Markdown 和 HTML 格式 ",-1)])]),_:1})]),_:1})]),_:1})]),_:1})])]),_:1})]),_:1})])]),_:1},8,["theme"])}}},it=I(Z,[["__scopeId","data-v-eaebbfbe"]]);export{it as default};
