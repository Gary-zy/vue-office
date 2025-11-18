<template>
  <n-config-provider :theme="null">
    <div class="workflow-page">
      <div class="workflow-hero">
        <div>
          <div class="hero-title">轻量工作流设计器</div>
          <div class="hero-sub">拖拽、连线、模板一键生成，右侧随选随改，聚焦核心流程。</div>
        </div>
        <n-space>
          <n-button type="primary" size="large" @click="useTemplate('product')">
            <template #icon>
              <n-icon :component="FlashOutline" />
            </template>
            一键生成产品流程
          </n-button>
          <n-button size="large" secondary @click="clearFlow">
            <template #icon>
              <n-icon :component="TrashOutline" />
            </template>
            清空画布
          </n-button>
        </n-space>
      </div>

      <div class="layout">
        <!-- 左侧：模板与节点库 -->
        <div class="panel">
          <div class="panel-title">模板 / 快速创建</div>
          <n-space vertical :size="12">
            <n-alert type="info" :bordered="false">
              选模板直接落地节点并连线；也可以从节点库拖拽到画布。
            </n-alert>

            <n-space>
              <n-button secondary size="small" @click="useTemplate('product')">产品迭代</n-button>
              <n-button secondary size="small" @click="useTemplate('dev')">开发交付</n-button>
              <n-button secondary size="small" @click="useTemplate('ops')">上线运维</n-button>
            </n-space>

            <n-divider />

            <div class="panel-subtitle">节点库（拖到画布任意位置）</div>
            <div class="node-palette">
              <div
                v-for="item in palette"
                :key="item.type"
                class="palette-item"
                draggable="true"
                @dragstart="handlePaletteDragStart(item)"
              >
                <div class="pill" :class="`pill-${item.status}`">{{ statusLabel(item.status) }}</div>
                <div class="palette-meta">
                  <div class="palette-title">{{ item.name }}</div>
                  <div class="palette-desc">{{ item.desc }}</div>
                </div>
              </div>
            </div>

            <n-divider />

            <div class="panel-subtitle">快速节点</div>
            <n-input v-model:value="draft.name" placeholder="节点名称" />
            <n-input v-model:value="draft.owner" placeholder="负责人" />
            <n-select v-model:value="draft.priority" :options="priorityOptions" placeholder="优先级" />
            <n-input v-model:value="draft.due" placeholder="截止/里程碑" />
            <n-input
              v-model:value="draft.desc"
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4 }"
              placeholder="备注"
            />
            <n-button type="primary" block @click="addQuickNode">添加到画布</n-button>

            <n-divider />

            <div class="panel-subtitle">导出</div>
            <n-space>
              <n-button secondary size="small" @click="copyJSON">
                <template #icon>
                  <n-icon :component="CopyOutline" />
                </template>
                复制 JSON
              </n-button>
              <n-button secondary size="small" @click="copyMarkdown">
                <template #icon>
                  <n-icon :component="CodeSlashOutline" />
                </template>
                复制 Markdown
              </n-button>
            </n-space>
          </n-space>
        </div>

        <!-- 中间：画布 -->
        <div class="canvas-panel">
          <div class="canvas-bar">
            <div class="canvas-title">画布</div>
            <n-space>
              <n-button size="small" tertiary :type="connectMode ? 'primary' : 'default'" @click="toggleConnectMode">
                <template #icon>
                  <n-icon :component="GitNetworkOutline" />
                </template>
                {{ connectMode ? '连线中：点击目标节点' : '开始连线' }}
              </n-button>
              <n-button size="small" tertiary @click="autoLayout">
                <template #icon>
                  <n-icon :component="GridOutline" />
                </template>
                自动排版
              </n-button>
            </n-space>
          </div>

          <div
            class="canvas"
            ref="canvasRef"
            @dragover.prevent
            @drop="handleDrop"
          >
            <!-- 连线 -->
            <svg class="canvas-lines" :width="canvasSize.width" :height="canvasSize.height">
              <line
                v-for="edge in edges"
                :key="edge.id"
                :x1="nodeById(edge.from)?.x + nodeWidth / 2"
                :y1="nodeById(edge.from)?.y + nodeHeight / 2"
                :x2="nodeById(edge.to)?.x + nodeWidth / 2"
                :y2="nodeById(edge.to)?.y + nodeHeight / 2"
                stroke="#7cd6f7"
                stroke-width="2"
                marker-end="url(#arrow)"
              />
              <defs>
                <marker id="arrow" markerWidth="10" markerHeight="10" refX="6" refY="3" orient="auto">
                  <path d="M0,0 L0,6 L9,3 z" fill="#7cd6f7" />
                </marker>
              </defs>
            </svg>

            <!-- 节点 -->
            <div
              v-for="node in nodes"
              :key="node.id"
              class="node"
              :class="{ selected: selectedId === node.id }"
              :style="{
                width: `${nodeWidth}px`,
                height: `${nodeHeight}px`,
                transform: `translate(${node.x}px, ${node.y}px)`
              }"
              @mousedown.stop="startDrag(node, $event)"
              @click.stop="selectNode(node.id)"
              @contextmenu.prevent="openContextMenu(node, $event)"
            >
              <div class="node-head">
                <div class="pill" :class="`pill-${node.status}`">{{ statusLabel(node.status) }}</div>
                <n-button text size="tiny" @click.stop="setStatus(node, 'done')">
                  <template #icon>
                    <n-icon :component="CheckmarkCircleOutline" />
                  </template>
                </n-button>
              </div>
              <div class="node-title">{{ node.name || '未命名节点' }}</div>
              <div class="node-meta">
                <span v-if="node.owner">负责人 {{ node.owner }}</span>
                <span v-if="node.due">截止 {{ node.due }}</span>
                <span class="pill" :class="`pill-${node.priority}`">{{ priorityLabel(node.priority) }}</span>
              </div>
              <div class="node-actions">
                <n-button size="tiny" tertiary @click.stop="beginConnect(node)">连线</n-button>
                <n-button size="tiny" tertiary @click.stop="markCurrent(node.id)">设为当前</n-button>
                <n-button size="tiny" text type="error" @click.stop="removeNode(node.id)">删</n-button>
              </div>
            </div>
          </div>
        </div>

        <!-- 右键菜单 -->
        <div
          v-if="contextMenu.show"
          class="context-menu"
          :style="{ left: `${contextMenu.x}px`, top: `${contextMenu.y}px` }"
        >
          <div class="context-item" @click="handleContextAction('current')">设为当前</div>
          <div class="context-item" @click="handleContextAction('done')">标记完成</div>
          <div class="context-item" @click="handleContextAction('blocked')">标记阻塞</div>
          <div class="context-item" @click="handleContextAction('copy')">复制信息</div>
          <div class="context-item danger" @click="handleContextAction('delete')">删除节点</div>
        </div>

        <!-- 右侧：属性与统计 -->
        <div class="panel">
            <div class="panel-title">属性 / 概览</div>
            <div v-if="!selectedNode" class="empty-tip">
              <n-empty description="点击节点查看详情" />
            </div>
            <div v-else class="inspector">
            <div class="panel-subtitle">节点属性</div>
            <n-input v-model:value="selectedNode.name" placeholder="名称" />
            <n-input v-model:value="selectedNode.owner" placeholder="负责人" />
            <n-select v-model:value="selectedNode.priority" :options="priorityOptions" placeholder="优先级" />
            <n-input v-model:value="selectedNode.due" placeholder="截止/里程碑" />
            <n-select
              v-model:value="selectedNode.status"
              :options="statusOptions"
              placeholder="状态"
            />
            <n-input
              v-model:value="selectedNode.desc"
              type="textarea"
              :autosize="{ minRows: 3, maxRows: 6 }"
              placeholder="备注 / 交付物"
            />
            <n-space>
              <n-button block size="small" @click="markCurrent(selectedNode.id)">设为当前</n-button>
              <n-button block size="small" type="error" secondary @click="removeNode(selectedNode.id)">删除</n-button>
            </n-space>
          </div>

          <n-divider />

          <div class="panel-subtitle">进度概览</div>
          <n-progress type="line" :percentage="progress" indicator-placement="inside" />
          <n-space justify="space-between" style="width: 100%">
            <n-statistic label="节点" :value="nodes.length" />
            <n-statistic label="完成" :value="doneCount" />
            <n-statistic label="阻塞" :value="blockedCount" />
          </n-space>
          <n-descriptions label-placement="left" :column="1" bordered size="small" style="margin-top: 8px">
            <n-descriptions-item label="当前节点">
              {{ currentNodeName || '未设置' }}
            </n-descriptions-item>
            <n-descriptions-item label="优先级">
              高 {{ priorityStat.high }} · 中 {{ priorityStat.medium }} · 低 {{ priorityStat.low }}
            </n-descriptions-item>
          </n-descriptions>
        </div>
      </div>
    </div>
  </n-config-provider>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useMessage } from 'naive-ui'
import {
  AddOutline,
  CheckmarkCircleOutline,
  CodeSlashOutline,
  CopyOutline,
  FlashOutline,
  GitNetworkOutline,
  GridOutline,
  TrashOutline
} from '@vicons/ionicons5'

/**
 * @description 轻量工作流设计器（拖拽+连线+属性面板）
 */

const message = useMessage()

const canvasRef = ref(null)
const nodeWidth = 240
const nodeHeight = 140
const canvasSize = { width: 1600, height: 900 }

const nodes = ref([])
const edges = ref([])
const selectedId = ref(null)
const connectMode = ref(false)
const connectFrom = ref(null)
const draggingId = ref(null)
const dragOffset = ref({ x: 0, y: 0 })
const contextMenu = ref({
  show: false,
  x: 0,
  y: 0,
  nodeId: null
})
const palette = [
  { type: 'milestone', name: '里程碑', status: 'doing', priority: 'high', desc: '关键事件' },
  { type: 'task', name: '任务', status: 'todo', priority: 'medium', desc: '常规节点' },
  { type: 'block', name: '阻塞', status: 'blocked', priority: 'high', desc: '需要处理的阻塞' },
  { type: 'done', name: '完成', status: 'done', priority: 'low', desc: '收尾/上线' }
]

const priorityOptions = [
  { label: '高', value: 'high' },
  { label: '中', value: 'medium' },
  { label: '低', value: 'low' }
]
const statusOptions = [
  { label: '待办', value: 'todo' },
  { label: '进行中', value: 'doing' },
  { label: '已完成', value: 'done' },
  { label: '阻塞', value: 'blocked' }
]

const draft = ref({
  name: '',
  owner: '',
  priority: 'medium',
  due: '',
  desc: ''
})

const genId = () => `node-${Date.now()}-${Math.random().toString(16).slice(2, 6)}`

const statusLabel = (status) => ({ todo: '待办', doing: '进行中', done: '已完成', blocked: '阻塞' }[status] || '待办')
const priorityLabel = (p) => ({ high: '高', medium: '中', low: '低' }[p] || '中')

const nodeById = (id) => nodes.value.find((n) => n.id === id)

const selectNode = (id) => {
  selectNodeAndMaybeConnect(id)
}

const selectedNode = computed(() => nodeById(selectedId.value))

const startDrag = (node, evt) => {
  draggingId.value = node.id
  dragOffset.value = {
    x: evt.clientX - node.x,
    y: evt.clientY - node.y
  }
  window.addEventListener('mousemove', onDrag)
  window.addEventListener('mouseup', stopDrag)
  closeContextMenu()
}

const onDrag = (evt) => {
  if (!draggingId.value) return
  const node = nodeById(draggingId.value)
  if (!node) return
  const newX = Math.min(
    Math.max(evt.clientX - dragOffset.value.x, 0),
    canvasSize.width - nodeWidth
  )
  const newY = Math.min(
    Math.max(evt.clientY - dragOffset.value.y, 0),
    canvasSize.height - nodeHeight
  )
  node.x = newX
  node.y = newY
}

const stopDrag = () => {
  draggingId.value = null
  window.removeEventListener('mousemove', onDrag)
  window.removeEventListener('mouseup', stopDrag)
}

const handlePaletteDragStart = (item) => {
  const data = JSON.stringify(item)
  event.dataTransfer.setData('application/json', data)
  closeContextMenu()
}

const handleDrop = (evt) => {
  closeContextMenu()
  const data = evt.dataTransfer.getData('application/json')
  if (!data) return
  const item = JSON.parse(data)
  const rect = canvasRef.value?.getBoundingClientRect()
  const x = evt.clientX - (rect?.left || 0) - nodeWidth / 2
  const y = evt.clientY - (rect?.top || 0) - nodeHeight / 2
  createNode({
    name: item.name,
    status: item.status,
    priority: item.priority,
    desc: item.desc,
    x: clamp(x, 0, canvasSize.width - nodeWidth),
    y: clamp(y, 0, canvasSize.height - nodeHeight)
  })
}

const clamp = (v, min, max) => Math.min(Math.max(v, min), max)

const createNode = (payload) => {
  nodes.value.push({
    id: genId(),
    name: payload.name || '新节点',
    owner: payload.owner || '',
    priority: payload.priority || 'medium',
    due: payload.due || '',
    desc: payload.desc || '',
    status: payload.status || 'todo',
    x: payload.x ?? 80,
    y: payload.y ?? 80
  })
}

const addQuickNode = () => {
  if (!draft.value.name.trim()) {
    message.warning('请先填写节点名称')
    return
  }
  createNode({
    ...draft.value,
    x: 100 + nodes.value.length * 20,
    y: 80 + nodes.value.length * 10
  })
  draft.value = { name: '', owner: '', priority: 'medium', due: '', desc: '' }
  message.success('已添加到画布')
}

const setStatus = (node, status) => {
  node.status = status
}

const removeNode = (id) => {
  nodes.value = nodes.value.filter((n) => n.id !== id)
  edges.value = edges.value.filter((e) => e.from !== id && e.to !== id)
  if (selectedId.value === id) selectedId.value = null
}

const markCurrent = (id) => {
  nodes.value = nodes.value.map((n) => ({
    ...n,
    status: n.id === id ? 'doing' : n.status === 'doing' ? 'todo' : n.status
  }))
  selectedId.value = id
}

const toggleConnectMode = () => {
  connectMode.value = !connectMode.value
  connectFrom.value = null
}

const beginConnect = (node) => {
  connectMode.value = true
  connectFrom.value = node.id
  message.info('选择另一个节点完成连线')
}

const addEdge = (from, to) => {
  if (!from || !to || from === to) return
  const exists = edges.value.some((e) => e.from === from && e.to === to)
  if (exists) return
  edges.value.push({ id: genId(), from, to })
}

const selectNodeAndMaybeConnect = (id) => {
  if (connectMode.value) {
    if (!connectFrom.value) {
      connectFrom.value = id
      message.info('已选起点，点击目标节点完成连线')
    } else {
      addEdge(connectFrom.value, id)
      message.success('已连线')
      connectFrom.value = null
      connectMode.value = false
    }
  }
}

const openContextMenu = (node, evt) => {
  contextMenu.value = {
    show: true,
    x: evt.clientX,
    y: evt.clientY,
    nodeId: node.id
  }
  selectedId.value = node.id
}

const closeContextMenu = () => {
  contextMenu.value = { show: false, x: 0, y: 0, nodeId: null }
}

const handleContextAction = async (action) => {
  const node = nodeById(contextMenu.value.nodeId)
  if (!node) {
    closeContextMenu()
    return
  }
  if (action === 'current') {
    markCurrent(node.id)
  } else if (action === 'done') {
    setStatus(node, 'done')
  } else if (action === 'blocked') {
    setStatus(node, 'blocked')
  } else if (action === 'delete') {
    removeNode(node.id)
  } else if (action === 'copy') {
    try {
      await navigator.clipboard.writeText(
        `${node.name} | ${statusLabel(node.status)} | ${priorityLabel(node.priority)}${node.owner ? ` | 负责人 ${node.owner}` : ''}${node.due ? ` | 截止 ${node.due}` : ''}${node.desc ? `\n${node.desc}` : ''}`
      )
      message.success('节点信息已复制')
    } catch (error) {
      message.error('复制失败')
    }
  }
  closeContextMenu()
}

const clearFlow = () => {
  nodes.value = []
  edges.value = []
  selectedId.value = null
  connectFrom.value = null
  connectMode.value = false
}

const useTemplate = (type) => {
  const baseY = 80
  const spacingX = 280
  const templates = {
    product: [
      { name: '需求澄清', status: 'doing', owner: '产品', priority: 'high', desc: '场景、用户故事' },
      { name: '设计评审', status: 'todo', owner: '设计', priority: 'high', desc: '交互稿/规格' },
      { name: '开发实现', status: 'todo', owner: '研发', priority: 'medium', desc: '接口/联调' },
      { name: '验收发布', status: 'todo', owner: '测试', priority: 'medium', desc: '回归/发布' }
    ],
    dev: [
      { name: '拆分评估', status: 'doing', owner: 'TL', priority: 'high', desc: '估时+分工' },
      { name: '开发自测', status: 'todo', owner: '研发', priority: 'high', desc: '单测/提交' },
      { name: '联调验证', status: 'todo', owner: '前后端', priority: 'medium', desc: '接口联调' },
      { name: '灰度上线', status: 'todo', owner: 'Ops', priority: 'medium', desc: '灰度/监控' }
    ],
    ops: [
      { name: '变更评审', status: 'doing', owner: 'SRE', priority: 'high', desc: '风险评估' },
      { name: '窗口确认', status: 'todo', owner: 'Ops', priority: 'medium', desc: '发布窗口' },
      { name: '监控校验', status: 'todo', owner: 'Ops', priority: 'medium', desc: '指标/告警' },
      { name: '回滚预案', status: 'todo', owner: 'Ops', priority: 'medium', desc: '演练' }
    ]
  }
  const tpl = templates[type]
  if (!tpl) return
  nodes.value = tpl.map((item, idx) => ({
    ...item,
    id: genId(),
    x: 80 + idx * spacingX,
    y: baseY + (idx % 2) * 120
  }))
  edges.value = nodes.value.slice(1).map((node, idx) => ({
    id: genId(),
    from: nodes.value[idx].id,
    to: node.id
  }))
  selectedId.value = nodes.value[0]?.id || null
  message.success('模板已加载到画布')
}

const autoLayout = () => {
  if (nodes.value.length === 0) return
  const cols = Math.ceil(Math.sqrt(nodes.value.length))
  const gapX = 260
  const gapY = 180
  nodes.value = nodes.value.map((n, idx) => {
    const row = Math.floor(idx / cols)
    const col = idx % cols
    return {
      ...n,
      x: 80 + col * gapX,
      y: 60 + row * gapY
    }
  })
}

const copyJSON = async () => {
  try {
    await navigator.clipboard.writeText(JSON.stringify({ nodes: nodes.value, edges: edges.value }, null, 2))
    message.success('已复制 JSON')
  } catch (error) {
    message.error('复制失败')
  }
}

const copyMarkdown = async () => {
  const lines = nodes.value.map((n, idx) => {
    const deps = edges.value.filter((e) => e.to === n.id).map((e) => nodeById(e.from)?.name).filter(Boolean)
    return `${idx + 1}. **${n.name}** (${statusLabel(n.status)}, ${priorityLabel(n.priority)}) - ${n.owner || '未指定'}${
      n.due ? ` · 截止 ${n.due}` : ''
    }${deps.length ? ` · 依赖: ${deps.join(', ')}` : ''}${n.desc ? `\n   - ${n.desc}` : ''}`
  })
  const md = `# 工作流\n\n${lines.join('\n')}`
  try {
    await navigator.clipboard.writeText(md)
    message.success('已复制 Markdown')
  } catch (error) {
    message.error('复制失败')
  }
}

const doneCount = computed(() => nodes.value.filter((n) => n.status === 'done').length)
const blockedCount = computed(() => nodes.value.filter((n) => n.status === 'blocked').length)
const progress = computed(() => {
  if (nodes.value.length === 0) return 0
  return Math.round((doneCount.value / nodes.value.length) * 100)
})
const currentNodeName = computed(() => nodes.value.find((n) => n.status === 'doing')?.name || '')
const priorityStat = computed(() => ({
  high: nodes.value.filter((n) => n.priority === 'high').length,
  medium: nodes.value.filter((n) => n.priority === 'medium').length,
  low: nodes.value.filter((n) => n.priority === 'low').length
}))

onMounted(() => {
  useTemplate('product')
  window.addEventListener('click', closeContextMenu)
  window.addEventListener('contextmenu', (e) => {
    if (!(e.target.closest && e.target.closest('.node'))) {
      closeContextMenu()
    }
  })
})

onBeforeUnmount(() => {
  window.removeEventListener('mousemove', onDrag)
  window.removeEventListener('mouseup', stopDrag)
  window.removeEventListener('click', closeContextMenu)
})
</script>

<style scoped>
.workflow-page {
  min-height: 100vh;
  padding: 24px;
  background: #f5f7fb;
  color: #111;
}

.workflow-hero {
  background: linear-gradient(135deg, rgba(0, 113, 227, 0.12), rgba(124, 214, 247, 0.1));
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  padding: 16px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.hero-title {
  font-size: 24px;
  font-weight: 700;
}

.hero-sub {
  opacity: 0.8;
}

.layout {
  display: grid;
  grid-template-columns: 320px 1fr 320px;
  gap: 16px;
}

.panel {
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 16px;
  background: #fff;
  min-height: 720px;
}

.panel-title {
  font-weight: 700;
  margin-bottom: 12px;
}

.panel-subtitle {
  font-weight: 600;
  margin-bottom: 6px;
}

.node-palette {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.palette-item {
  border: 1px dashed #e5e7eb;
  border-radius: 10px;
  padding: 10px;
  display: flex;
  gap: 10px;
  cursor: grab;
}

.palette-title {
  font-weight: 600;
}

.palette-desc {
  font-size: 12px;
  opacity: 0.7;
}

.canvas-panel {
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  background: #fff;
  min-height: 720px;
  display: flex;
  flex-direction: column;
}

.canvas-bar {
  padding: 10px 14px;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.canvas-title {
  font-weight: 700;
}

.canvas {
  position: relative;
  flex: 1;
  overflow: hidden;
  background: radial-gradient(circle at 20% 20%, rgba(124, 214, 247, 0.08), transparent 25%),
    radial-gradient(circle at 80% 60%, rgba(0, 113, 227, 0.08), transparent 25%),
    #fdfefe;
  border-radius: 0 0 12px 12px;
}

.canvas-lines {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.node {
  position: absolute;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  background: #fff;
  padding: 10px;
  cursor: grab;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
  user-select: none;
}

.node.selected {
  border-color: #0071e3;
  box-shadow: 0 0 0 2px rgba(0, 113, 227, 0.2);
}

.node-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.node-title {
  font-weight: 700;
  margin: 6px 0;
}

.node-meta {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  font-size: 12px;
  opacity: 0.9;
}

.node-actions {
  display: flex;
  gap: 6px;
  margin-top: 6px;
}

.pill {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
}

.pill-doing {
  background: rgba(124, 214, 247, 0.16);
  color: #7cd6f7;
}

.pill-done {
  background: rgba(32, 201, 151, 0.16);
  color: #20c997;
}

.pill-blocked {
  background: rgba(255, 99, 99, 0.16);
  color: #ff6b6b;
}

.pill-todo {
  background: #eef2f7;
  color: #444;
}

.pill-high {
  background: rgba(255, 99, 99, 0.16);
  color: #ff6b6b;
}

.pill-medium {
  background: rgba(255, 196, 91, 0.16);
  color: #ffc45b;
}

.pill-low {
  background: rgba(124, 214, 247, 0.16);
  color: #7cd6f7;
}

.inspector {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 4px 0;
}

.inspector n-input,
.inspector n-select {
  width: 100%;
}

.context-menu {
  position: fixed;
  z-index: 1000;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
  overflow: hidden;
}

.context-item {
  padding: 10px 14px;
  cursor: pointer;
  font-size: 14px;
  color: #111;
}

.context-item:hover {
  background: #f5f7fb;
}

.context-item.danger {
  color: #e03131;
}

.empty-tip {
  margin-bottom: 16px;
}

@media (max-width: 1200px) {
  .layout {
    grid-template-columns: 1fr;
  }
  .panel,
  .canvas-panel {
    min-height: auto;
  }
  .canvas {
    min-height: 520px;
  }
}
</style>
