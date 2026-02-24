<script setup lang="ts">
/**
 * CoursePagination - 分頁導覽元件
 */
import { computed } from 'vue'

interface Props {
  currentPage: number
  totalPages: number
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:currentPage': [page: number]
}>()

/** 產生可見頁碼列表（含 '...' 省略） */
const visiblePages = computed(() => {
  const total = props.totalPages
  const current = props.currentPage
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }

  const pages: (number | '...')[] = [1]

  if (current > 3) {
    pages.push('...')
  }

  const start = Math.max(2, current - 1)
  const end = Math.min(total - 1, current + 1)

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  if (current < total - 2) {
    pages.push('...')
  }

  if (total > 1) {
    pages.push(total)
  }

  return pages
})

function goToPage(page: number) {
  if (page >= 1 && page <= props.totalPages && page !== props.currentPage) {
    emit('update:currentPage', page)
  }
}
</script>

<template>
  <nav class="pagination" aria-label="分頁導覽">
    <div v-if="totalPages > 1" class="pagination__pages">
      <!-- 上一頁 -->
      <button
        class="pagination__btn pagination__btn--nav"
        :disabled="currentPage <= 1"
        @click="goToPage(currentPage - 1)"
      >
        ‹
      </button>

      <!-- 頁碼 -->
      <template v-for="(page, idx) in visiblePages" :key="idx">
        <span v-if="page === '...'" class="pagination__ellipsis">…</span>
        <button
          v-else
          class="pagination__btn"
          :class="{ 'pagination__btn--active': page === currentPage }"
          @click="goToPage(page as number)"
        >
          {{ page }}
        </button>
      </template>

      <!-- 下一頁 -->
      <button
        class="pagination__btn pagination__btn--nav"
        :disabled="currentPage >= totalPages"
        @click="goToPage(currentPage + 1)"
      >
        ›
      </button>
    </div>
  </nav>
</template>

<style scoped>
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-md);
  padding: var(--spacing-md) 0;
  width: 100%;
}

.pagination__pages {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  margin: 0 auto;
}

.pagination__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 32px;
  height: 32px;
  padding: 0 8px;
  border-radius: var(--radius-sm);
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--color-text-primary);
  background: var(--color-surface);
  border: 1px solid var(--color-tag-bg);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.pagination__btn:hover:not(:disabled):not(.pagination__btn--active) {
  background: var(--color-background-alt);
  border-color: var(--color-accent-primary);
}

.pagination__btn--active {
  background: var(--color-accent-primary);
  color: #fff;
  border-color: var(--color-accent-primary);
  cursor: default;
}

.pagination__btn--nav {
  font-size: var(--font-size-lg);
  font-weight: 700;
}

.pagination__btn:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.pagination__ellipsis {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 32px;
  height: 32px;
  color: var(--color-text-muted);
  font-size: var(--font-size-sm);
}

@media (max-width: 768px) {
  .pagination {
    flex-direction: column;
    align-items: stretch;
    gap: var(--spacing-sm);
  }

  .pagination__pages {
    justify-content: center;
  }
}
</style>
