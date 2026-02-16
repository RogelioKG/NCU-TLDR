<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import CourseDetail from '@/components/CourseDetail.vue'
import { mockCourses } from '@/mock/courses'

const route = useRoute()
const courseId = computed(() => {
  const id = route.params.id
  return typeof id === 'string' ? Number.parseInt(id, 10) : Number(id)
})

// Find the course based on the ID from the route
const course = computed(() => {
  return mockCourses.find(c => c.id === courseId.value) || null
})
</script>

<template>
  <div class="course-detail-view">
    <div v-if="course">
      <CourseDetail :course="course" />
    </div>
    <div v-else class="not-found">
      <p>找不到該課程資訊。</p>
    </div>
  </div>
</template>

<style scoped>
.course-detail-view {
  width: 100%;
}

.not-found {
  text-align: center;
  padding: 4rem;
  color: var(--color-text-muted);
  font-size: 1.2rem;
}
</style>
