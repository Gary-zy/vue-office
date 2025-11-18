import{u as B}from"./theme-D4xCKyQj.js";import{r as N}from"./markdown-DF7npusw.js";import{_ as V}from"./_plugin-vue_export-helper-DlAUqK2U.js";import{L as S,b as v,q as $,s as h,w as t,i as r,H as q,r as s,o as g,a as l,h as e,p as a,C as x,t as F,x as I}from"./index-BEmEf2gA.js";import{T as P}from"./TrashOutline-DT-Sdh9Q.js";import{D as Q}from"./DownloadOutline-DB_nyiTQ.js";import{C as W}from"./CodeOutline-CKIrl_mq.js";import{E as Y}from"./EyeOutline-SDcheCyq.js";import{C as f}from"./CheckmarkCircleOutline-D5fCxfKH.js";const A={class:"rich-editor-page"},G={class:"content-container"},J={class:"page-header"},K={class:"page-title"},X={class:"editor-preview-layout"},Z={class:"pane"},nn={class:"pane-header"},tn={class:"pane-body editor-wrapper"},en={class:"pane preview-pane"},on={class:"pane-header"},ln={class:"pane-body"},sn=["innerHTML"],an={__name:"RichEditor",setup(rn){const u=S(),y=B(),b=v(()=>y.isDark),i=$(`# 欢迎使用富文本编辑器

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

开始编辑你的内容吧！`),w=v(()=>i.value?N(i.value):""),C=v(()=>i.value.length),M=()=>{i.value="",u.success("内容已清空")},L=()=>{if(!i.value){u.warning("内容为空，无法导出");return}const c=new Blob([i.value],{type:"text/markdown"}),n=URL.createObjectURL(c),o=document.createElement("a");o.href=n,o.download=`document-${Date.now()}.md`,o.click(),URL.revokeObjectURL(n),u.success("Markdown 文件已导出")},T=()=>{if(!i.value){u.warning("内容为空，无法导出");return}const c=`<!DOCTYPE html>
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
${w.value}
</body>
</html>`,n=new Blob([c],{type:"text/html"}),o=URL.createObjectURL(n),d=document.createElement("a");d.href=o,d.download=`document-${Date.now()}.html`,d.click(),URL.revokeObjectURL(o),u.success("HTML 文件已导出")};return(c,n)=>{const o=s("n-icon"),d=s("n-button"),p=s("n-space"),R=s("n-text"),O=s("n-input"),U=s("n-empty"),k=s("n-card"),m=s("n-thing"),_=s("n-list-item"),j=s("n-list"),D=s("n-layout-content"),z=s("n-layout"),H=s("n-config-provider");return g(),h(H,{theme:b.value?r(q):null},{default:t(()=>[l("div",A,[e(z,null,{default:t(()=>[e(D,{class:"editor-content"},{default:t(()=>[l("div",G,[l("div",J,[l("h1",K,[e(o,{component:r(x)},null,8,["component"]),n[1]||(n[1]=a(" 富文本编辑器 ",-1))]),n[2]||(n[2]=l("p",{class:"page-subtitle"}," 基于 Quill 的现代化富文本编辑器，支持 Markdown、代码高亮等功能 ",-1))]),e(k,null,{default:t(()=>[e(p,{vertical:"",size:16},{default:t(()=>[e(p,{justify:"space-between"},{default:t(()=>[e(p,null,{default:t(()=>[e(d,{onClick:M},{icon:t(()=>[e(o,{component:r(P)},null,8,["component"])]),default:t(()=>[n[3]||(n[3]=a(" 清空 ",-1))]),_:1}),e(d,{onClick:L},{icon:t(()=>[e(o,{component:r(Q)},null,8,["component"])]),default:t(()=>[n[4]||(n[4]=a(" 导出 Markdown ",-1))]),_:1}),e(d,{onClick:T},{icon:t(()=>[e(o,{component:r(W)},null,8,["component"])]),default:t(()=>[n[5]||(n[5]=a(" 导出 HTML ",-1))]),_:1})]),_:1}),e(p,null,{default:t(()=>[e(R,{depth:"3"},{default:t(()=>[a("字数: "+F(C.value),1)]),_:1})]),_:1})]),_:1}),l("div",X,[l("div",Z,[l("div",nn,[e(o,{component:r(x)},null,8,["component"]),n[6]||(n[6]=l("span",null,"Markdown 编写",-1))]),l("div",tn,[e(O,{value:i.value,"onUpdate:value":n[0]||(n[0]=E=>i.value=E),type:"textarea",placeholder:`开始编写内容...

支持 Markdown 语法：
# 标题
**粗体** *斜体*
- 列表项
[链接](url)
\`\`\`代码块\`\`\``,autosize:{minRows:20,maxRows:40},class:"markdown-editor"},null,8,["value"])])]),l("div",en,[l("div",on,[e(o,{component:r(Y)},null,8,["component"]),n[7]||(n[7]=l("span",null,"实时预览",-1))]),l("div",ln,[l("div",{class:"markdown-preview",innerHTML:w.value},null,8,sn),i.value?I("",!0):(g(),h(U,{key:0,description:"内容预览将在这里显示",size:"large"}))])])])]),_:1})]),_:1}),e(k,{title:"功能特性",style:{"margin-top":"24px"}},{default:t(()=>[e(j,null,{default:t(()=>[e(_,null,{default:t(()=>[e(m,null,{avatar:t(()=>[e(o,{component:r(f),color:"#18a058",size:"24"},null,8,["component"])]),header:t(()=>[...n[8]||(n[8]=[a("Markdown 支持",-1)])]),description:t(()=>[...n[9]||(n[9]=[a(" 完整支持 Markdown 语法，包括标题、列表、链接、图片等 ",-1)])]),_:1})]),_:1}),e(_,null,{default:t(()=>[e(m,null,{avatar:t(()=>[e(o,{component:r(f),color:"#18a058",size:"24"},null,8,["component"])]),header:t(()=>[...n[10]||(n[10]=[a("代码高亮",-1)])]),description:t(()=>[...n[11]||(n[11]=[a(" 支持多种编程语言的语法高亮显示 ",-1)])]),_:1})]),_:1}),e(_,null,{default:t(()=>[e(m,null,{avatar:t(()=>[e(o,{component:r(f),color:"#18a058",size:"24"},null,8,["component"])]),header:t(()=>[...n[12]||(n[12]=[a("实时预览",-1)])]),description:t(()=>[...n[13]||(n[13]=[a(" 编辑内容实时渲染预览，所见即所得 ",-1)])]),_:1})]),_:1}),e(_,null,{default:t(()=>[e(m,null,{avatar:t(()=>[e(o,{component:r(f),color:"#18a058",size:"24"},null,8,["component"])]),header:t(()=>[...n[14]||(n[14]=[a("导出功能",-1)])]),description:t(()=>[...n[15]||(n[15]=[a(" 支持导出为 Markdown 和 HTML 格式 ",-1)])]),_:1})]),_:1})]),_:1})]),_:1})])]),_:1})]),_:1})])]),_:1},8,["theme"])}}},kn=V(an,[["__scopeId","data-v-39185489"]]);export{kn as default};
