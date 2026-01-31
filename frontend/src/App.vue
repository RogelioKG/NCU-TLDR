<script setup lang="ts">
/**
 * NCU-TLDR 課程評價平台 - 主頁面
 * 設計風格：Soft Modern Academic
 */
import type { Course, WishCourse } from '@/types'
import { ref } from 'vue'
import { mockCourses } from '@/mock/courses'
import CourseDetail from './components/CourseDetail.vue'
import CourseGrid from './components/CourseGrid.vue'
import NavBar from './components/NavBar.vue'
import SearchBar from './components/SearchBar.vue'
import WishingWell from './components/WishingWell.vue'

// 動畫時間常數 (毫秒)
const CLOSE_ANIMATION_DELAY_MS = 300

// 課程資料（來自 mock，未來可改為 store / API）
const courses = ref<Course[]>([...mockCourses])

const selectedCourse = ref<Course | null>(null)
const showDetail = ref(false)
const searchQuery = ref('')

function handleSelectCourse(course: Course) {
  selectedCourse.value = course
  showDetail.value = true
}

function handleCloseDetail() {
  showDetail.value = false
  setTimeout(() => {
    selectedCourse.value = null
  }, CLOSE_ANIMATION_DELAY_MS)
}

function handleSearch(query: string) {
  searchQuery.value = query
  // TODO: 實作搜尋邏輯
}

function handleWishCourseSelect(course: WishCourse) {
  // 從許願池選擇課程時，嘗試在課程列表中找到對應課程
  const found = courses.value.find(c => c.name === course.name)
  if (found) {
    handleSelectCourse(found)
  }
}
</script>

<template>
  <div class="app">
    <!-- 導航列 -->
    <NavBar />

    <!-- 主要內容區 -->
    <main class="main">
      <div class="main__container">
        <!-- 左側：許願池 -->
        <WishingWell @select-course="handleWishCourseSelect" />

        <!-- 右側：主要內容 -->
        <div class="main__content">
          <!-- 搜尋欄 -->
          <div class="main__search">
            <SearchBar @search="handleSearch" />
          </div>

          <!-- 課程網格 -->
          <section class="main__grid-section">
            <CourseGrid
              :courses="courses"
              @select-course="handleSelectCourse"
            />
          </section>

          <!-- 課程詳情 -->
          <section class="main__detail-section">
            <CourseDetail
              :course="selectedCourse"
              :show="showDetail"
              @close="handleCloseDetail"
            />
          </section>
        </div>
      </div>
    </main>

    <!-- 頁尾 -->
    <footer class="footer">
      <p class="footer__text">
        © 2026 NCU TLDR - 國立中央大學課程評價平台
      </p>
    </footer>
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main {
  flex: 1;
  padding-top: 100px; /* 為固定導航列留空間 */
  padding-bottom: var(--spacing-2xl);
}

.main__container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 var(--spacing-xl);
  display: flex;
  gap: var(--spacing-2xl);
  align-items: flex-start;
}

.main__content {
  flex: 1;
  min-width: 0;
}

.main__search {
  display: flex;
  justify-content: center;
  margin-bottom: var(--spacing-2xl);
}

.main__grid-section {
  margin-bottom: var(--spacing-2xl);
}

.main__detail-section {
  padding-top: var(--spacing-xl);
}

.footer {
  padding: var(--spacing-xl);
  text-align: center;
  border-top: 1px solid var(--color-background-alt);
}

.footer__text {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
}

/* 響應式設計 */
@media (max-width: 1024px) {
  .main__container {
    flex-direction: column;
    padding: 0 var(--spacing-md);
  }

  .main__content {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .main {
    padding-top: 80px;
  }

  .main__search {
    padding: 0 var(--spacing-md);
  }
}
</style>
