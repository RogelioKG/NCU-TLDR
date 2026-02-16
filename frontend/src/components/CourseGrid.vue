<script setup lang="ts">
// CourseGrid 元件 - 課程卡片網格（僅顯示實際課程，無佔位符）
import type { Course } from '@/types'
import CourseCard from './CourseCard.vue'

interface Props {
  courses: Course[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  selectCourse: [course: Course]
}>()

function handleSelectCourse(course: Course) {
  emit('selectCourse', course)
}
</script>

<template>
  <div class="course-grid">
    <CourseCard
      v-for="course in props.courses"
      :key="course.id"
      :course="course"
      @select="handleSelectCourse"
    />
  </div>
</template>

<style scoped>
.course-grid {
  display: grid;
  /* 單格不小於卡片最小寬度，縮小頁面時減少每行卡片數而非壓縮卡片 */
  grid-template-columns: repeat(auto-fill, minmax(var(--course-card-min-width), 1fr));
  gap: var(--spacing-lg);
  align-items: stretch; /* 同一排卡片高度與該排最高者相同 */
  animation: fadeIn 0.5s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 響應式調整：仍以卡片最小寬度為準，避免壓縮四行星星區塊 */
@media (min-width: 1200px) {
  .course-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 768px) {
  .course-grid {
    grid-template-columns: repeat(auto-fill, minmax(var(--course-card-min-width), 1fr));
    gap: var(--spacing-md);
  }
}

@media (max-width: 520px) {
  /* 窄螢幕改為單欄，每格仍至少為卡片最小寬度 */
  .course-grid {
    grid-template-columns: 1fr;
  }
}
</style>
