<script setup lang="ts">
/**
 * CourseFilterSort - 課程排序與分頁控制元件
 * 功能：多重排序（可拖曳調整優先順序）、每頁顯示數量選擇
 */
import type { SortCriterion, SortDirection } from '@/types'
import { ref } from 'vue'

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

function onPageSizeChange(e: Event) {
  const value = Number((e.target as HTMLSelectElement).value)
  emit('update:pageSize', value)
}
</script>

<template>
  <div class="cfs">
    <!-- 排序控制 -->
    <div class="cfs__sort-section">
      <span class="cfs__label">排序</span>
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
          <!-- 拖曳把手 -->
          <span
            class="cfs__drag-handle"
            title="拖曳調整優先順序"
            draggable="true"
            @click.stop
            @dragstart="onDragStart(index, $event)"
            @dragend="onDragEnd"
          >⠿</span>

          <!-- 優先順序標示 -->
          <span class="cfs__priority">{{ index + 1 }}</span>

          <!-- 欄位名稱 -->
          <span class="cfs__field-name">{{ criterion.label }}</span>

          <!-- 升序/降序 -->
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

    <!-- 每頁筆數 -->
    <div class="cfs__page-size-section">
      <label class="cfs__label" for="pageSize">每頁</label>
      <select
        id="pageSize"
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
  </div>
</template>

<style scoped>
.cfs {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-lg);
  padding: var(--spacing-sm) var(--spacing-md);
  background: var(--color-surface);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  margin-bottom: var(--spacing-lg);
  flex-wrap: wrap;
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
  gap: var(--spacing-sm);
  flex: 1;
  min-width: 0;
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

/* --- Page size --- */
.cfs__page-size-section {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  flex-shrink: 0;
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

/* Responsive */
@media (max-width: 768px) {
  .cfs {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-sm);
  }

  .cfs__sort-section {
    flex-wrap: wrap;
  }
}
</style>
