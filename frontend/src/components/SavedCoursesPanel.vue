<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useSavedCourses } from '@/composables/useSavedCourses'

const { savedCourses, moveUp, moveDown, toggleSave } = useSavedCourses()

const rootEl = ref<HTMLElement | null>(null)
const isOpen = ref(false)

function toggle() {
  isOpen.value = !isOpen.value
}

function close() {
  isOpen.value = false
}

function onDocumentMouseDown(event: MouseEvent) {
  if (!isOpen.value)
    return
  const target = event.target
  if (!(target instanceof Node))
    return
  if (!rootEl.value?.contains(target))
    close()
}

function onDocumentKeyDown(event: KeyboardEvent) {
  if (event.key === 'Escape')
    close()
}

onMounted(() => {
  document.addEventListener('mousedown', onDocumentMouseDown)
  document.addEventListener('keydown', onDocumentKeyDown)
})

onBeforeUnmount(() => {
  document.removeEventListener('mousedown', onDocumentMouseDown)
  document.removeEventListener('keydown', onDocumentKeyDown)
})
</script>

<template>
  <div ref="rootEl" class="scp">
    <button
      type="button"
      class="scp__trigger"
      :aria-expanded="isOpen"
      aria-controls="saved-panel"
      @click="toggle"
    >
      <span class="scp__trigger-icon" aria-hidden="true">⚑</span>
      <span class="scp__trigger-label">
        已儲存
      </span>
      <span v-if="savedCourses.length > 0" class="scp__badge">
        {{ savedCourses.length }}
      </span>
    </button>

    <section
      v-if="isOpen"
      id="saved-panel"
      class="scp__popover"
      role="dialog"
      aria-label="已儲存課程清單"
    >
      <header class="scp__popover-header">
        <div class="scp__popover-title">
          <span class="scp__trigger-icon" aria-hidden="true">⚑</span>
          <span>已儲存課程</span>
        </div>
        <button type="button" class="scp__close-btn" aria-label="關閉面板" @click="close">
          ×
        </button>
      </header>

      <div v-if="savedCourses.length === 0" class="scp__empty">
        尚未儲存任何課程
      </div>

      <ul v-else class="scp__list">
        <li
          v-for="(course, index) in savedCourses"
          :key="course.id"
          class="scp__item"
        >
          <span class="scp__order">
            {{ index + 1 }}
          </span>
          <span class="scp__course-name">
            {{ course.name }}
          </span>
          <span class="scp__course-teacher">
            {{ course.teacher }}
          </span>
          <div class="scp__actions">
            <button
              type="button"
              class="scp__move-btn"
              :disabled="index === 0"
              title="上移"
              @click="moveUp(course.id)"
            >
              ▲
            </button>
            <button
              type="button"
              class="scp__move-btn"
              :disabled="index === savedCourses.length - 1"
              title="下移"
              @click="moveDown(course.id)"
            >
              ▼
            </button>
            <button
              type="button"
              class="scp__remove-btn"
              title="移除"
              @click="toggleSave(course.id)"
            >
              ✕
            </button>
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.scp {
  position: relative;
}

.scp__trigger {
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

.scp__trigger:hover {
  border-color: var(--color-accent-primary);
}

.scp__trigger:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px rgba(127, 169, 184, 0.35);
}

.scp__trigger-icon {
  color: var(--color-accent-primary);
  font-size: 14px;
  line-height: 1;
}

.scp__trigger-label {
  font-size: var(--font-size-sm);
  font-weight: 600;
}

.scp__badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 18px;
  height: 18px;
  padding: 0 4px;
  border-radius: var(--radius-full);
  background: var(--color-accent-primary);
  color: #fff;
  font-size: 11px;
  font-weight: 600;
  line-height: 1;
}

.scp__popover {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  z-index: 40;
  min-width: min(92vw, 400px);
  max-height: 420px;
  padding: var(--spacing-sm) var(--spacing-md);
  background: var(--color-surface);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--color-tag-bg);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.scp__popover-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-sm);
}

.scp__popover-title {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--color-text-primary);
}

.scp__close-btn {
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

.scp__close-btn:hover {
  background: rgba(0, 0, 0, 0.06);
}

.scp__empty {
  padding: var(--spacing-md);
  text-align: center;
  color: var(--color-text-muted);
  font-size: var(--font-size-sm);
}

.scp__list {
  list-style: none;
  margin: 0;
  padding: 0;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.scp__item {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: 6px 8px;
  border-radius: var(--radius-sm);
  background: var(--color-background-alt);
  font-size: var(--font-size-sm);
  transition: background var(--transition-fast);
}

.scp__item:hover {
  background: rgba(127, 169, 184, 0.08);
}

.scp__order {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--color-accent-primary);
  color: #fff;
  font-size: 11px;
  font-weight: 600;
  flex-shrink: 0;
}

.scp__course-name {
  font-weight: 600;
  color: var(--color-text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 0;
}

.scp__course-teacher {
  color: var(--color-text-muted);
  font-size: var(--font-size-xs);
  white-space: nowrap;
  flex-shrink: 0;
}

.scp__actions {
  display: flex;
  align-items: center;
  gap: 2px;
  margin-left: auto;
  flex-shrink: 0;
}

.scp__move-btn,
.scp__remove-btn {
  width: 22px;
  height: 22px;
  border: none;
  border-radius: 4px;
  background: transparent;
  font-size: 10px;
  line-height: 1;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: background var(--transition-fast);
  color: var(--color-text-secondary);
}

.scp__move-btn:hover:not(:disabled) {
  background: rgba(0, 0, 0, 0.06);
}

.scp__move-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.scp__remove-btn {
  color: var(--color-text-muted);
}

.scp__remove-btn:hover {
  background: rgba(220, 80, 80, 0.1);
  color: #c44;
}

@media (max-width: 768px) {
  .scp__popover {
    min-width: min(92vw, 320px);
  }
}
</style>
