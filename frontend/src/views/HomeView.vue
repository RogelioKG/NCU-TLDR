<script setup lang="ts">
import type { Course, SortCriterion, WishCourse } from '@/types'
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import CourseFilterSort from '@/components/CourseFilterSort.vue'
import CourseGrid from '@/components/CourseGrid.vue'
import CoursePagination from '@/components/CoursePagination.vue'
import SearchBar from '@/components/SearchBar.vue'
import WishingWell from '@/components/WishingWell.vue'
import { mockCourses } from '@/mock/courses'

const router = useRouter()

// 課程資料（來自 mock，未來可改為 store / API）
const courses = ref<Course[]>([...mockCourses])
const searchQuery = ref('')

// --- 排序 ---
const sortCriteria = ref<SortCriterion[]>([
  { field: 'reward', label: '收穫', direction: 'desc', enabled: true },
  { field: 'score', label: '分數', direction: 'desc', enabled: false },
  { field: 'easiness', label: '輕鬆', direction: 'desc', enabled: false },
  { field: 'teacherStyle', label: '教師風格', direction: 'desc', enabled: false },
])

// --- 分頁 ---
const pageSize = ref(20)
const currentPage = ref(1)

// 排序後的課程
const sortedCourses = computed(() => {
  const activeCriteria = sortCriteria.value.filter(c => c.enabled)
  if (activeCriteria.length === 0)
    return courses.value

  return [...courses.value].sort((a, b) => {
    for (const criterion of activeCriteria) {
      const valA = a.ratings[criterion.field]
      const valB = b.ratings[criterion.field]
      if (valA !== valB) {
        return criterion.direction === 'desc' ? valB - valA : valA - valB
      }
    }
    return 0
  })
})

// 總頁數
const totalPages = computed(() =>
  Math.max(1, Math.ceil(sortedCourses.value.length / pageSize.value)),
)

// 當前頁面的課程
const pagedCourses = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  return sortedCourses.value.slice(start, start + pageSize.value)
})

// 排序或每頁數量改變時重置回第一頁
watch([sortCriteria, pageSize], () => {
  currentPage.value = 1
}, { deep: true })

function handleSelectCourse(course: Course) {
  router.push({ name: 'course-detail', params: { id: course.id } })
}

function handleSearch(query: string) {
  searchQuery.value = query
  // TODO: 實作搜尋邏輯
}

function handleWishCourseSelect(course: WishCourse) {
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

      <!-- 篩選與排序控制 -->
      <CourseFilterSort
        :sort-criteria="sortCriteria"
        :page-size="pageSize"
        @update:sort-criteria="sortCriteria = $event"
        @update:page-size="pageSize = $event"
      />

      <!-- 課程網格 -->
      <section class="main__grid-section">
        <CourseGrid
          :courses="pagedCourses"
          @select-course="handleSelectCourse"
        />
      </section>

      <!-- 分頁導覽 -->
      <CoursePagination
        :current-page="currentPage"
        :total-pages="totalPages"
        @update:current-page="currentPage = $event"
      />
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
