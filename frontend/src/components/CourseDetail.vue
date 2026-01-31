<script setup lang="ts">
// CourseDetail 元件 - 課程詳情卡（含連接線動畫）
import { ref, watch } from 'vue'
import type { Course } from '@/types'
import StarRating from './StarRating.vue'

// 動畫時間常數 (毫秒)
const ANIMATION_SHOW_DELAY_MS = 50
const ANIMATION_CLOSE_DURATION_MS = 300

interface Props {
  course: Course | null
  show: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  close: []
}>()

const isVisible = ref(false)

watch(
  () => props.show,
  (newVal) => {
    if (newVal) {
      // 延遲顯示以觸發動畫
      setTimeout(() => {
        isVisible.value = true
      }, ANIMATION_SHOW_DELAY_MS)
    } else {
      isVisible.value = false
    }
  }
)

function handleClose() {
  isVisible.value = false
  setTimeout(() => {
    emit('close')
  }, ANIMATION_CLOSE_DURATION_MS)
}
</script>

<template>
  <Transition name="detail">
    <div v-if="show && course" class="course-detail-wrapper">
      <!-- 連接線 SVG -->
      <svg
        class="course-detail__connector"
        :class="{ 'course-detail__connector--visible': isVisible }"
        viewBox="0 0 100 80"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="connector-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="var(--color-accent-primary)" stop-opacity="0.3" />
            <stop offset="100%" stop-color="var(--color-accent-primary)" stop-opacity="0.8" />
          </linearGradient>
        </defs>
        <path
          class="connector-path"
          d="M50,0 Q50,40 50,40 T50,80"
          fill="none"
          stroke="url(#connector-gradient)"
          stroke-width="2"
          stroke-linecap="round"
        />
      </svg>
      
      <!-- 詳情卡片 -->
      <div
        class="course-detail"
        :class="{ 'course-detail--visible': isVisible }"
      >
        <button
          class="course-detail__close"
          type="button"
          aria-label="關閉課程詳情"
          @click="handleClose"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
        
        <header class="course-detail__header">
          <h2 class="course-detail__title">{{ course.name }}</h2>
          <div class="course-detail__divider" />
          <p class="course-detail__teacher">教師：{{ course.teacher }}</p>
        </header>
        
        <div class="course-detail__tags">
          <span
            v-for="tag in course.tags"
            :key="tag"
            class="course-detail__tag"
          >
            #{{ tag }}
          </span>
        </div>
        
        <div class="course-detail__ratings">
          <StarRating
            :rating="course.ratings.reward"
            label="收穫"
            size="lg"
          />
          <StarRating
            :rating="course.ratings.score"
            label="分數"
            size="lg"
          />
          <StarRating
            :rating="course.ratings.easiness"
            label="輕鬆"
            size="lg"
          />
          <StarRating
            :rating="course.ratings.teacherStyle"
            label="教師風格"
            size="lg"
          />
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.course-detail-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
}

/* 連接線動畫 */
.course-detail__connector {
  width: 100px;
  height: 60px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.course-detail__connector--visible {
  opacity: 1;
}

.connector-path {
  stroke-dasharray: 200;
  stroke-dashoffset: 200;
  animation: drawLine 0.6s ease forwards;
}

@keyframes drawLine {
  to {
    stroke-dashoffset: 0;
  }
}

/* 詳情卡片 */
.course-detail {
  position: relative;
  background: var(--color-surface);
  border-radius: var(--radius-xl);
  padding: var(--spacing-2xl);
  box-shadow: var(--shadow-xl);
  width: 100%;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.course-detail--visible {
  opacity: 1;
  transform: translateY(0);
}

.course-detail__close {
  position: absolute;
  top: var(--spacing-md);
  right: var(--spacing-md);
  padding: var(--spacing-sm);
  color: var(--color-text-muted);
  border-radius: var(--radius-full);
  transition: all var(--transition-fast);
}

.course-detail__close:hover {
  color: var(--color-text-primary);
  background: var(--color-background-alt);
}

.course-detail__header {
  text-align: center;
  margin-bottom: var(--spacing-lg);
}

.course-detail__title {
  font-size: var(--font-size-2xl);
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-md);
  letter-spacing: 1px;
}

.course-detail__divider {
  width: 60%;
  max-width: 200px;
  height: 2px;
  background: linear-gradient(
    90deg,
    transparent,
    var(--color-accent-primary),
    transparent
  );
  margin: 0 auto var(--spacing-md);
  border-radius: var(--radius-full);
}

.course-detail__teacher {
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
}

.course-detail__tags {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-xl);
}

.course-detail__tag {
  font-size: var(--font-size-sm);
  color: var(--color-tag-text);
  background: var(--color-tag-bg);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-full);
  font-weight: 500;
}

.course-detail__ratings {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  padding: var(--spacing-lg);
  background: var(--color-background);
  border-radius: var(--radius-lg);
}

/* 過渡動畫 */
.detail-enter-active,
.detail-leave-active {
  transition: all 0.3s ease;
}

.detail-enter-from,
.detail-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
