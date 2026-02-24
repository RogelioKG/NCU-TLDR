<script setup lang="ts">
import type { Course } from '@/types'
import CourseAISummary from '@/components/CourseAISummary.vue'
import CourseBasicInfo from '@/components/CourseBasicInfo.vue'
import CourseComments from '@/components/CourseComments.vue'
import CourseStarEvaluation from '@/components/CourseStarEvaluation.vue'
import NavBar from '@/components/NavBar.vue'
import SearchBar from '@/components/SearchBar.vue'

defineProps<{
  course: Course
}>()

function handleSearch(_query: string) {
  // Search functionality can be implemented here
}
</script>

<template>
  <div class="course-detail-page">
    <NavBar />

    <main class="cdp__main">
      <!-- 頂部列：課程標題 + 搜尋框 -->
      <div class="cdp__top-row">
        <h1 class="cdp__course-name">
          {{ course.name }}
        </h1>
        <div class="cdp__search-wrapper">
          <SearchBar @search="handleSearch" />
        </div>
      </div>

      <!-- AI Hashtags -->
      <div class="cdp__tags">
        <span
          v-for="tag in course.tags.slice(0, 6)"
          :key="tag"
          class="cdp__tag"
        >
          #{{ tag }}
        </span>
      </div>

      <!-- 左右兩欄 Layout -->
      <div class="cdp__layout">
        <!-- 左側欄：課程基本資訊 + 星星評價 -->
        <aside class="cdp__sidebar">
          <CourseBasicInfo :course="course" />
          <CourseStarEvaluation :ratings="course.ratings" />
        </aside>

        <!-- 右側欄：AI 摘要 + 留言 -->
        <div class="cdp__content">
          <CourseAISummary :summary="course.summary" :course-name="course.name" />
          <CourseComments :comments="course.comments ?? []" />
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.cdp__main {
  min-height: 100vh;
  padding: 24px var(--spacing-xl) var(--spacing-2xl);
  max-width: 1300px;
  margin: 0 auto;
}

/* 頂部列 */
.cdp__top-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-xl);
  margin-bottom: var(--spacing-md);
}

.cdp__course-name {
  font-size: var(--font-size-3xl);
  font-weight: 900;
  color: var(--color-text-primary);
  letter-spacing: 0.02em;
  white-space: nowrap;
}

.cdp__search-wrapper {
  flex-shrink: 0;
  width: 320px;
}

/* Hashtags */
.cdp__tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-xl);
}

.cdp__tag {
  padding: 6px 18px;
  border-radius: var(--radius-full);
  background: var(--color-surface);
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
  border: 1px solid rgba(0, 0, 0, 0.04);
  transition: all var(--transition-fast);
}

.cdp__tag:hover {
  border-color: var(--color-accent-primary);
  color: var(--color-accent-primary);
}

/* 左右兩欄 */
.cdp__layout {
  display: grid;
  grid-template-columns: 340px 1fr;
  gap: var(--spacing-xl);
  align-items: start;
}

.cdp__sidebar {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
  position: sticky;
  top: 100px;
}

.cdp__content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
}

/* 響應式 */
@media (max-width: 1024px) {
  .cdp__layout {
    grid-template-columns: 300px 1fr;
  }
}

@media (max-width: 860px) {
  .cdp__layout {
    grid-template-columns: 1fr;
  }

  .cdp__sidebar {
    position: static;
    flex-direction: row;
    flex-wrap: wrap;
  }

  .cdp__sidebar > * {
    flex: 1;
    min-width: 280px;
  }
}

@media (max-width: 680px) {
  .cdp__main {
    padding: 88px var(--spacing-md) var(--spacing-xl);
  }

  .cdp__top-row {
    flex-direction: column;
    align-items: flex-start;
  }

  .cdp__search-wrapper {
    width: 100%;
  }

  .cdp__course-name {
    font-size: var(--font-size-2xl);
  }

  .cdp__sidebar {
    flex-direction: column;
  }

  .cdp__sidebar > * {
    min-width: unset;
  }
}
</style>
