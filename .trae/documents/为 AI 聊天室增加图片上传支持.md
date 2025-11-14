# 现状与目标
- 现状：页面 `src/views/tools/AIChat.vue` 的输入区仅支持文本（参考行 `src/views/tools/AIChat.vue:142-151`），消息结构为字符串 `content`（参考行 `src/views/tools/AIChat.vue:797-801`），发送逻辑通过 `sendMessage` 函数直连 SiliconFlow 的 `chat/completions` 接口（参考行 `src/views/tools/AIChat.vue:782-848`）。当前未集成任何图片/附件选择或渲染逻辑。
- 目标：在不改变现有交互风格的前提下，为 AI 聊天支持图片上传与预览；在模型支持视觉输入时，将图片与文本一起发送；在不支持时明确提示。

# 实施方案
## 前端 UI
1. 在输入区右侧（`input-wrapper-inner`）新增一个“添加图片”按钮与拖拽区域，允许多选，`accept="image/*"`。
2. 在输入框下方显示待发送图片的缩略图列表（可移除单个图片）。
3. 文件校验与限制：仅允许常见图片类型（`png/jpg/jpeg/webp`），单张大小上限（例如 4MB），总数上限（例如 4 张）。

## 状态与类型
1. 在组件内新增 `attachments` 响应式状态，结构示例：`{ id: string, name: string, type: string, size: number, dataUrl: string }`。
2. 保持与项目风格一致，优先使用 TypeScript 类型定义（若组件保持 JS，可内联简单校验）。

## 发送逻辑（OpenAI 兼容多模态）
1. 在 `sendMessage`（`src/views/tools/AIChat.vue:782`）中，构造用户消息时根据 `attachments` 决定 `content` 结构：
   - 无图片：沿用字符串内容。
   - 有图片且模型支持视觉：使用内容数组 `[{ type: 'text', text: userMessage }, { type: 'image_url', image_url: { url: dataUrl } }...]`。
2. 仅对“当前用户消息”注入图片内容，历史消息保持原样（字符串），避免大体量 `dataUrl` 进入历史导致请求超重。
3. 模型能力判定：根据 `selectedModel` 做视觉能力的白名单/模式匹配（常见：`gpt-4o`/`gpt-4o-mini`、`Qwen-VL`/`Qwen2-VL`、`GLM-4V`、`DeepSeek-VL`、`InternVL` 等）。不支持视觉时阻止发送并给出提示。

## 渲染与可访问性
1. 消息渲染：
   - 若 `msg.content` 为字符串，按现状展示（行 `src/views/tools/AIChat.vue:100-105`）。
   - 若为数组：
     - `type='text'` 渲染为文本；
     - `type='image_url'` 渲染为 `<img>`，添加 `alt`，约束宽高并支持点击放大预览。
2. 保持深色主题的视觉一致性与 `scoped` 样式隔离。

## 可选后端上传（如需 URL）
- 若接口不接受 `data:image/...;base64`，使用已有上传封装 `src/api/request.js` 的 `upload` 能力，将图片上传到后端获取 URL，再以 `image_url.url` 发送。
- 初版以前端 `dataUrl` 为主，必要时再扩展后端。

## 安全与限制
- 拒绝非图片 MIME、过大文件，限制数量与总大小。
- 可选：图片压缩（Canvas 或前端库）与去除 EXIF 信息以保护隐私。
- 不在日志中输出 Base64 内容，避免隐私泄露。

## 验证与回退
1. 模型能力校验：在设置或模型抽屉中提示当前模型是否支持图片输入。
2. 测试：
   - 无图片文本发送回归；
   - 单张与多张图片发送；
   - 不支持视觉模型的提示与阻止；
   - 大文件/错误类型的校验提示。
3. 回退策略：若远端拒绝 `image_url` 的 `dataUrl`，降级为仅文本（提示用户），或改走后端上传得到可公开访问的 URL。

# 改动文件与范围
- 主要改动：`src/views/tools/AIChat.vue`（新增选择/预览 UI、`attachments` 状态、视觉模型判定、发送与渲染分支）。
- 视情况使用：`src/api/request.js`（调用 `upload`），不做破坏性修改。

# 实施步骤（顺序）
1. 新增 `attachments` 状态与类型定义，插入图片选择/拖拽 UI。
2. 编写文件校验与预览生成（`FileReader` → `dataUrl`）。
3. 增加视觉模型判定方法与设置提示。
4. 改造 `sendMessage`：按有无图片生成 `messages` 的 `content` 结构。
5. 改造消息渲染：支持文本与图片内容数组的展示。
6. 补充校验与提示，完善错误处理与日志。
7. 手动+自动化测试用例（如使用 Vitest）覆盖核心路径。

# 交付结果
- 支持选择/拖拽图片并在消息内预览。
- 支持在视觉模型下将图片与文本一并发送给 SiliconFlow 的 `chat/completions` 端点。
- 明确提示不支持视觉输入的模型，防止误用。