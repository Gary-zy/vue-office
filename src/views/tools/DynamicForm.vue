<template>
  <n-config-provider :theme="null">
    <div class="page">
      <div class="hero">
        <div>
          <div class="title">动态表单生成器</div>
          <div class="sub">用 hook 定义字段（如 useInput/useSelect），可拖拽排序、切换预设，实时预览与导出。</div>
        </div>
        <n-space>
          <n-button type="primary" @click="loadPreset('onboarding')">新人入职</n-button>
          <n-button secondary @click="loadPreset('research')">调研问卷</n-button>
          <n-button tertiary @click="resetForm">重置</n-button>
        </n-space>
      </div>

      <div class="layout">
        <!-- 左：字段库 -->
        <div class="panel">
          <div class="panel-title">字段库</div>
          <div class="palette">
            <div
              v-for="item in palette"
              :key="item.type"
              class="palette-item"
              draggable="true"
              @dragstart="handlePaletteDragStart(item, $event)"
            >
              <div class="pill">{{ item.label }}</div>
              <div class="desc">{{ item.desc }}</div>
            </div>
          </div>
          <n-divider />
          <div class="panel-title">新增字段</div>
          <n-input v-model:value="draft.label" placeholder="字段名称" />
          <n-select v-model:value="draft.type" :options="typeOptions" placeholder="控件类型" />
          <n-input v-model:value="draft.key" placeholder="字段 key (字母/数字)" />
          <n-input v-model:value="draft.placeholder" placeholder="占位提示 (可选)" />
          <n-space>
            <n-switch v-model:value="draft.required" size="small" /> <span>必填</span>
          </n-space>
          <n-button block type="primary" @click="addField">添加到表单</n-button>
        </div>

        <!-- 中：表单预览 -->
        <div class="panel">
          <div class="panel-title">表单预览</div>
          <n-alert type="info" size="small" :bordered="false">
            支持拖拽排序（上下拖动），支持右侧配置。字段值实时同步到下方 JSON。
          </n-alert>
          <div
            class="drop-zone"
            @dragover.prevent
            @drop="handleDrop"
          >
            <div
              v-for="(element, idx) in schema"
              :key="element.id"
              class="field-card"
            >
              <div class="field-head">
                <div class="drag-handle">⠿</div>
                <div class="field-label">{{ element.label }}</div>
                <n-space size="small">
                  <n-button size="tiny" tertiary @click="moveField(idx, -1)" :disabled="idx === 0">上移</n-button>
                  <n-button size="tiny" tertiary @click="moveField(idx, 1)" :disabled="idx === schema.length - 1">下移</n-button>
                  <n-button size="tiny" tertiary @click="selectField(element.id)">配置</n-button>
                  <n-button size="tiny" text type="error" @click="removeField(element.id)">删</n-button>
                </n-space>
              </div>
              <div class="field-body">
                <component
                  :is="renderComponent(element.type)"
                  v-model:value="model[element.key]"
                  v-bind="fieldProps(element)"
                />
              </div>
              <div class="field-foot">
                <n-tag size="small" type="info">{{ element.type }}</n-tag>
                <n-tag size="small" v-if="element.required" type="error">必填</n-tag>
              </div>
            </div>
            <n-empty v-if="schema.length === 0" description="拖拽字段到此处，或点击左侧添加" />
          </div>

          <n-divider />
          <div class="panel-title">表单数据</div>
          <n-input
            type="textarea"
            :autosize="{ minRows: 6, maxRows: 10 }"
            :value="formattedModel"
            readonly
          />
        </div>

        <!-- 右：字段属性 -->
        <div class="panel inspector">
          <div class="panel-title">字段属性</div>
          <div v-if="!activeField">
            <n-empty description="选择一个字段进行配置" />
          </div>
          <div v-else class="form-grid">
            <n-input v-model:value="activeField.label" placeholder="显示名称" />
            <n-input v-model:value="activeField.key" placeholder="字段 key" />
            <n-select v-model:value="activeField.type" :options="typeOptions" placeholder="类型" />
            <n-input v-model:value="activeField.placeholder" placeholder="占位符" />
            <n-select
              v-if="activeField.type === 'select' || activeField.type === 'radio'"
              v-model:value="activeField.options"
              placeholder="选项"
              :options="optionChoices"
              multiple
              tag
            />
            <n-slider
              v-if="activeField.type === 'slider'"
              v-model:value="activeField.max"
              :min="10"
              :max="100"
              :step="5"
              :tooltip="false"
            />
            <n-space>
              <n-switch v-model:value="activeField.required" size="small" /> <span>必填</span>
            </n-space>
            <n-button size="small" block @click="cloneField(activeField)">复制字段</n-button>
          </div>
          <n-divider />
          <n-space>
            <n-button secondary @click="copySchema">复制 Schema</n-button>
            <n-button secondary @click="copyModel">复制数据</n-button>
          </n-space>
        </div>
      </div>
    </div>
  </n-config-provider>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import { useMessage } from 'naive-ui'

/**
 * 简单 hook：useInput / useSelect 返回 value 与类型标记，便于动态渲染
 */
const useInput = (initial = '') => ref(initial)
const useSelect = (initial = null) => ref(initial)
const useSwitch = (initial = false) => ref(initial)

const message = useMessage()

// 表单状态（由 hook 创建）
const model = reactive({
  name: useInput(''),
  role: useSelect(''),
  agree: useSwitch(true),
  desc: useInput(''),
  level: ref(50)
})

const palette = [
  { type: 'input', label: '文本输入', desc: '单行文本' },
  { type: 'textarea', label: '多行文本', desc: '描述/备注' },
  { type: 'select', label: '下拉选择', desc: '单选选项' },
  { type: 'radio', label: '单选组', desc: '单选按钮' },
  { type: 'switch', label: '开关', desc: '是/否' },
  { type: 'slider', label: '滑块', desc: '范围数值' },
  { type: 'date', label: '日期', desc: '日期选择' },
  { type: 'tag', label: '标签', desc: '可多选标签' }
]

const typeOptions = palette.map((p) => ({ label: p.label, value: p.type }))
const optionChoices = [
  { label: 'A', value: 'A' },
  { label: 'B', value: 'B' },
  { label: 'C', value: 'C' }
]

const schema = ref([
  { id: 'f1', label: '姓名', type: 'input', key: 'name', required: true, placeholder: '请输入姓名' },
  { id: 'f2', label: '角色', type: 'select', key: 'role', required: true, options: ['产品', '研发', '设计'] },
  { id: 'f3', label: '接受协议', type: 'switch', key: 'agree', required: false },
  { id: 'f4', label: '简介', type: 'textarea', key: 'desc', required: false, placeholder: '一句话介绍' },
  { id: 'f5', label: '熟练度', type: 'slider', key: 'level', max: 100 }
])

const draft = ref({
  label: '',
  type: '',
  key: '',
  placeholder: '',
  required: false
})

const activeFieldId = ref(null)
const activeField = computed(() => schema.value.find((f) => f.id === activeFieldId.value))

const renderComponent = (type) => {
  switch (type) {
    case 'input': return 'n-input'
    case 'textarea': return 'n-input'
    case 'select': return 'n-select'
    case 'radio': return 'n-radio-group'
    case 'switch': return 'n-switch'
    case 'slider': return 'n-slider'
    case 'date': return 'n-date-picker'
    case 'tag': return 'n-select'
    default: return 'n-input'
  }
}

const fieldProps = (field) => {
  const common = { placeholder: field.placeholder || `请输入${field.label}` }
  if (field.type === 'textarea') return { type: 'textarea', ...common, autosize: { minRows: 2, maxRows: 4 } }
  if (field.type === 'select') return { options: (field.options || []).map((o) => ({ label: o, value: o })) }
  if (field.type === 'radio') return { name: field.key, options: (field.options || []).map((o) => ({ label: o, value: o })) }
  if (field.type === 'slider') return { max: field.max || 100, min: field.min || 0 }
  if (field.type === 'date') return { type: 'date' }
  if (field.type === 'tag') return { multiple: true, options: (field.options || ['A', 'B', 'C']).map((o) => ({ label: o, value: o })) }
  if (field.type === 'switch') return {}
  return common
}

const addField = () => {
  if (!draft.value.label || !draft.value.type || !draft.value.key) {
    message.warning('请填写字段名/类型/key')
    return
  }
  schema.value.push({
    id: `f-${Date.now()}`,
    ...draft.value
  })
  draft.value = { label: '', type: '', key: '', placeholder: '', required: false }
  message.success('已添加字段')
}

const removeField = (id) => {
  schema.value = schema.value.filter((f) => f.id !== id)
  if (activeFieldId.value === id) activeFieldId.value = null
}

const selectField = (id) => {
  activeFieldId.value = id
}

const handlePaletteDragStart = (item, e) => {
  e.dataTransfer.setData('application/json', JSON.stringify(item))
}

const handleDrop = (e) => {
  const data = e.dataTransfer.getData('application/json')
  if (!data) return
  const item = JSON.parse(data)
  schema.value.push({
    id: `f-${Date.now()}`,
    label: item.label,
    type: item.type,
    key: `${item.type}-${schema.value.length + 1}`,
    required: false
  })
}

const moveField = (index, delta) => {
  const target = index + delta
  if (target < 0 || target >= schema.value.length) return
  const arr = [...schema.value]
  const temp = arr[index]
  arr[index] = arr[target]
  arr[target] = temp
  schema.value = arr
}

const cloneField = (field) => {
  schema.value.push({ ...field, id: `f-${Date.now()}` })
  message.success('已复制字段')
}

const loadPreset = (key) => {
  if (key === 'onboarding') {
    schema.value = [
      { id: 'p1', label: '姓名', type: 'input', key: 'name', required: true },
      { id: 'p2', label: '部门', type: 'select', key: 'role', options: ['产品', '研发', '设计', '运营'] },
      { id: 'p3', label: '入职日期', type: 'date', key: 'date' },
      { id: 'p4', label: '接受协议', type: 'switch', key: 'agree', required: true }
    ]
  } else if (key === 'research') {
    schema.value = [
      { id: 'r1', label: '年龄', type: 'input', key: 'age', placeholder: '例如 28' },
      { id: 'r2', label: '喜欢的产品', type: 'tag', key: 'likes', options: ['A', 'B', 'C', 'D'] },
      { id: 'r3', label: '满意度', type: 'slider', key: 'score', max: 10, min: 0 },
      { id: 'r4', label: '开放问题', type: 'textarea', key: 'feedback', placeholder: '说说你的想法' }
    ]
  }
  message.success('模板已加载')
}

const resetForm = () => {
  schema.value = []
  activeFieldId.value = null
  Object.keys(model).forEach((k) => {
    if (typeof model[k] === 'object' && 'value' in model[k]) model[k].value = ''
  })
}

const copySchema = async () => {
  try {
    await navigator.clipboard.writeText(JSON.stringify(schema.value, null, 2))
    message.success('Schema 已复制')
  } catch (e) {
    message.error('复制失败')
  }
}

const copyModel = async () => {
  try {
    await navigator.clipboard.writeText(formattedModel.value)
    message.success('数据已复制')
  } catch (e) {
    message.error('复制失败')
  }
}

const formattedModel = computed(() => {
  const plain = {}
  schema.value.forEach((f) => {
    plain[f.key] = model[f.key]
  })
  return JSON.stringify(plain, null, 2)
})
</script>

<style scoped>
.page {
  min-height: 100vh;
  padding: 24px;
  background: #f5f7fb;
  color: #111;
}

.hero {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 16px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.title {
  font-size: 24px;
  font-weight: 700;
}

.sub {
  opacity: 0.8;
}

.layout {
  display: grid;
  grid-template-columns: 280px 1fr 320px;
  gap: 16px;
}

.panel {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 14px;
  min-height: 600px;
}

.panel.inspector {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.panel-title {
  font-weight: 700;
  margin-bottom: 10px;
}

.palette {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 8px;
}

.palette-item {
  border: 1px dashed #e5e7eb;
  border-radius: 10px;
  padding: 10px;
  cursor: grab;
}

.palette-item .desc {
  font-size: 12px;
  opacity: 0.7;
}

.pill {
  display: inline-block;
  padding: 2px 6px;
  background: #eef2f7;
  border-radius: 8px;
  font-weight: 600;
  margin-bottom: 6px;
}

.drop-zone {
  margin-top: 12px;
  min-height: 420px;
  background: #f9fafb;
  border: 1px dashed #e5e7eb;
  border-radius: 12px;
  padding: 10px;
}

.field-card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
}

.field-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.drag-handle {
  cursor: grab;
  user-select: none;
}

.field-label {
  font-weight: 600;
}

.field-body {
  margin: 8px 0;
}

.field-foot {
  display: flex;
  gap: 8px;
}

.form-grid {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

@media (max-width: 1200px) {
  .layout {
    grid-template-columns: 1fr;
  }
}
</style>
