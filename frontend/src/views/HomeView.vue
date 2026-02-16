<script setup lang="ts">
import type { Course, WishCourse } from '@/types'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import CourseGrid from '@/components/CourseGrid.vue'
import SearchBar from '@/components/SearchBar.vue'
import WishingWell from '@/components/WishingWell.vue'
import { mockCourses } from '@/mock/courses'

const router = useRouter()

// 課程資料（來自 mock，未來可改為 store / API）
const courses = ref<Course[]>([...mockCourses])
const searchQuery = ref('')

function handleSelectCourse(course: Course) {
  // 跳轉到課程詳情頁面
  router.push({ name: 'course-detail', params: { id: course.id } })
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
    </div>
  </div>
</template>

<style scoped>
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
  .main__search {
    padding: 0 var(--spacing-md);
  }
}
</style>
