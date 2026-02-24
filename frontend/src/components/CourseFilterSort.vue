<script setup lang="ts">
/**
 * CourseFilterSort - 課程排序控制元件
 * 功能：多重排序（可拖曳調整優先順序）
 */
import type { SortCriterion, SortDirection } from '@/types'
import { onBeforeUnmount, onMounted, ref } from 'vue'

interface Props {
  sortCriteria: SortCriterion[]
  pageSize: number
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:sortCriteria': [criteria: SortCriterion[]]
  'update:pageSize': [size: number]
}>()

const pageSizeOptions = [10, 20, 50, 100]

const rootEl = ref<HTMLElement | null>(null)
const isPopoverOpen = ref(false)

function togglePopover() {
  isPopoverOpen.value = !isPopoverOpen.value
}

function closePopover() {
  isPopoverOpen.value = false
}

function onDocumentMouseDown(event: MouseEvent) {
  if (!isPopoverOpen.value)
    return
  const target = event.target
  if (!(target instanceof Node))
    return
  if (!rootEl.value?.contains(target))
    closePopover()
}

function onDocumentKeyDown(event: KeyboardEvent) {
  if (event.key === 'Escape')
    closePopover()
}

onMounted(() => {
  document.addEventListener('mousedown', onDocumentMouseDown)
  document.addEventListener('keydown', onDocumentKeyDown)
})

onBeforeUnmount(() => {
  document.removeEventListener('mousedown', onDocumentMouseDown)
  document.removeEventListener('keydown', onDocumentKeyDown)
})

// --- Drag and drop ---
const dragIndex = ref<number | null>(null)
const dropTargetIndex = ref<number | null>(null)

function onDragStart(index: number, e: DragEvent) {
  dragIndex.value = index
  if (e.dataTransfer) {
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/plain', String(index))
  }
}

function onDragOver(index: number, e: DragEvent) {
  e.preventDefault()
  if (e.dataTransfer) {
    e.dataTransfer.dropEffect = 'move'
  }
  dropTargetIndex.value = index
}

function onDragLeave() {
  dropTargetIndex.value = null
}

function onDrop(index: number, e: DragEvent) {
  e.preventDefault()
  dropTargetIndex.value = null
  if (dragIndex.value === null || dragIndex.value === index)
    return

  const newCriteria = [...props.sortCriteria]
  const moved = newCriteria.splice(dragIndex.value, 1)[0]
  if (!moved)
    return
  newCriteria.splice(index, 0, moved)
  emit('update:sortCriteria', newCriteria)
  dragIndex.value = null
}

function onDragEnd() {
  dragIndex.value = null
  dropTargetIndex.value = null
}

// --- Actions ---
function toggleEnabled(index: number) {
  const newCriteria = props.sortCriteria.map((c, i) =>
    i === index ? { ...c, enabled: !c.enabled } : { ...c },
  )
  emit('update:sortCriteria', newCriteria)
}

function toggleDirection(index: number) {
  const newCriteria = props.sortCriteria.map((c, i) =>
    i === index ? { ...c, direction: (c.direction === 'desc' ? 'asc' : 'desc') as SortDirection } : { ...c },
  )
  emit('update:sortCriteria', newCriteria)
}

function onPageSizeChange(event: Event) {
  const value = Number((event.target as HTMLSelectElement).value)
  emit('update:pageSize', value)
}
</script>

<template>
  <div ref="rootEl" class="cfs">
    <button
      type="button"
      class="cfs__trigger"
      :aria-expanded="isPopoverOpen"
      aria-controls="sort-panel"
      @click="togglePopover"
    >
      <span class="cfs__trigger-icon" aria-hidden="true">⠿</span>
      <span class="cfs__trigger-label">排序</span>
    </button>
    <div class="cfs__page-size-section">
      <label class="cfs__label" for="cfsPageSize">每頁</label>
      <select
        id="cfsPageSize"
        class="cfs__page-size-select"
        :value="props.pageSize"
        @change="onPageSizeChange"
      >
        <option v-for="opt in pageSizeOptions" :key="opt" :value="opt">
          {{ opt }}
        </option>
      </select>
      <span class="cfs__label">筆</span>
    </div>

    <section
      v-if="isPopoverOpen"
      id="sort-panel"
      class="cfs__popover"
      role="dialog"
      aria-label="排序與每頁筆數設定"
    >
      <header class="cfs__popover-header">
        <div class="cfs__popover-title">
          <span class="cfs__trigger-icon" aria-hidden="true">⠿</span>
          <span class="cfs__label">排序</span>
        </div>
        <button type="button" class="cfs__close-btn" aria-label="關閉排序面板" @click="closePopover">
          ×
        </button>
      </header>

      <div class="cfs__sort-section">
        <div class="cfs__sort-list">
          <div
            v-for="(criterion, index) in props.sortCriteria"
            :key="criterion.field"
            class="cfs__sort-item"
            :class="{
              'cfs__sort-item--disabled': !criterion.enabled,
              'cfs__sort-item--dragging': dragIndex === index,
              'cfs__sort-item--drop-target': dropTargetIndex === index && dragIndex !== index,
            }"
            @click="toggleEnabled(index)"
            @dragover="onDragOver(index, $event)"
            @dragleave="onDragLeave"
            @drop="onDrop(index, $event)"
          >
            <span
              class="cfs__drag-handle"
              title="拖曳調整優先順序"
              draggable="true"
              @click.stop
              @dragstart="onDragStart(index, $event)"
              @dragend="onDragEnd"
            >⠿</span>
            <span class="cfs__priority">{{ index + 1 }}</span>
            <span class="cfs__field-name">{{ criterion.label }}</span>
            <button
              class="cfs__dir-btn"
              :title="criterion.direction === 'desc' ? '降序（高→低）' : '升序（低→高）'"
              :disabled="!criterion.enabled"
              @click.stop="toggleDirection(index)"
            >
              <span :class="criterion.direction === 'desc' ? 'cfs__arrow-down' : 'cfs__arrow-up'" />
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.cfs {
  position: relative;
  margin-bottom: var(--spacing-lg);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-md);
}

.cfs__trigger {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  border: 1px solid var(--color-tag-bg);
  border-radius: var(--radius-sm);
  background: var(--color-surface);
  color: var(--color-text-primary);
  cursor: pointer;
  transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
  flex-shrink: 0;
}

.cfs__trigger:hover {
  border-color: var(--color-accent-primary);
}

.cfs__trigger:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px rgba(127, 169, 184, 0.35);
}

.cfs__trigger-icon {
  color: var(--color-text-muted);
  font-size: 14px;
  line-height: 1;
}

.cfs__trigger-label {
  font-size: var(--font-size-sm);
  font-weight: 600;
}

.cfs__page-size-section {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xs);
  margin-left: auto;
}

.cfs__page-size-select {
  padding: 4px 8px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--color-tag-bg);
  background: var(--color-surface);
  color: var(--color-text-primary);
  font-size: var(--font-size-sm);
  cursor: pointer;
  outline: none;
  transition: border-color var(--transition-fast);
}

.cfs__page-size-select:focus {
  border-color: var(--color-accent-primary);
}

.cfs__popover {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  z-index: 40;
  min-width: min(92vw, 560px);
  padding: var(--spacing-sm) var(--spacing-md);
  background: var(--color-surface);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--color-tag-bg);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.cfs__popover-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-sm);
}

.cfs__popover-title {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.cfs__close-btn {
  width: 24px;
  height: 24px;
  border: none;
  border-radius: 4px;
  background: transparent;
  color: var(--color-text-secondary);
  font-size: 20px;
  line-height: 1;
  cursor: pointer;
}

.cfs__close-btn:hover {
  background: rgba(0, 0, 0, 0.06);
}

.cfs__label {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  font-weight: 500;
  white-space: nowrap;
}

/* --- Sort section --- */
.cfs__sort-section {
  display: flex;
  align-items: center;
  min-width: 0px;
}

.cfs__sort-list {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.cfs__sort-item {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  background: var(--color-background-alt);
  border-radius: var(--radius-sm);
  cursor: pointer;
  user-select: none;
  transition: all var(--transition-fast);
  border: 2px solid transparent;
  font-size: var(--font-size-sm);
}

.cfs__sort-item--dragging {
  opacity: 0.4;
}

.cfs__sort-item--drop-target {
  border-color: var(--color-accent-primary);
  background: rgba(127, 169, 184, 0.1);
}

.cfs__sort-item--disabled {
  opacity: 0.5;
}

.cfs__drag-handle {
  color: var(--color-text-muted);
  font-size: 14px;
  line-height: 1;
  cursor: grab;
  flex-shrink: 0;
}

.cfs__drag-handle:active {
  cursor: grabbing;
}

.cfs__priority {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: var(--color-accent-primary);
  color: #fff;
  font-size: 11px;
  font-weight: 600;
  flex-shrink: 0;
}

.cfs__field-name {
  color: var(--color-text-primary);
  font-weight: 500;
  white-space: nowrap;
}

/* --- Direction button --- */
.cfs__dir-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: 4px;
  transition: background var(--transition-fast);
  flex-shrink: 0;
  cursor: pointer;
}

.cfs__dir-btn:hover:not(:disabled) {
  background: rgba(0, 0, 0, 0.06);
}

.cfs__dir-btn:disabled {
  cursor: not-allowed;
  opacity: 0.4;
}

.cfs__arrow-down::after,
.cfs__arrow-up::after {
  content: '';
  display: block;
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
}

.cfs__arrow-down::after {
  border-top: 6px solid var(--color-text-primary);
}

.cfs__arrow-up::after {
  border-bottom: 6px solid var(--color-text-primary);
}

/* Responsive */
@media (max-width: 768px) {
  .cfs {
    flex-wrap: wrap;
    row-gap: var(--spacing-sm);
  }

  .cfs__page-size-section {
    margin-left: 0;
    width: 100%;
    justify-content: flex-end;
  }

  .cfs__popover {
    width: min(92vw, 420px);
  }
}
</style>
