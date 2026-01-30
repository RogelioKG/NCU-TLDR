<script setup lang="ts">
// WishingWell 元件 - 許願池側邊欄
import { ref } from 'vue'
import type { WishCourse } from '@/types'
import { mockWishList as initialWishList } from '@/mock/wishList'
import wishingWellImg from '@/assets/wishing_well_spritual_no_bg.png'

// 許願池資料（來自 mock，未來可改為 store / API）
const wishList = ref<WishCourse[]>([...initialWishList])

const hoveredItem = ref<number | null>(null)

const emit = defineEmits<{
  'select-course': [course: WishCourse]
}>()

function handleSelectCourse(course: WishCourse) {
  emit('select-course', course)
}
</script>

<template>
  <aside class="wishing-well">
    <!-- 裝飾性背景卡片 -->
    <div class="wishing-well__bg-card wishing-well__bg-card--1" />
    <div class="wishing-well__bg-card wishing-well__bg-card--2" />
    
    <!-- 主卡片 -->
    <div class="wishing-well__card">
      <header class="wishing-well__header">
        <span class="wishing-well__icon">✨</span>
        <h2 class="wishing-well__title">許願池</h2>
      </header>
      
      <ul class="wishing-well__list">
        <li
          v-for="(course, index) in wishList"
          :key="course.id"
          class="wishing-well__item"
          :class="{ 'wishing-well__item--hovered': hoveredItem === course.id }"
          @mouseenter="hoveredItem = course.id"
          @mouseleave="hoveredItem = null"
          @click="handleSelectCourse(course)"
        >
          <span class="wishing-well__number">{{ index + 1 }}.</span>
          <div class="wishing-well__course-info">
            <span class="wishing-well__course-name">{{ course.name }}</span>
            <span class="wishing-well__separator">-</span>
            <span class="wishing-well__teacher">{{ course.teacher }}</span>
          </div>
        </li>
      </ul>
      
      <button type="button" class="wishing-well__add-btn" aria-label="許願池">
        <img
          :src="wishingWellImg"
          alt="許願池"
          class="wishing-well__add-img"
        />
      </button>
    </div>
  </aside>
</template>

<style scoped>
.wishing-well {
  position: relative;
  width: 280px;
  flex-shrink: 0;
}

/* 裝飾性背景卡片 - 堆疊效果 */
.wishing-well__bg-card {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  background: linear-gradient(135deg, var(--color-accent-teal) 0%, var(--color-accent-secondary) 100%);
  border-radius: var(--radius-lg);
  opacity: 0.6;
}

.wishing-well__bg-card--1 {
  transform: rotate(-3deg) translateX(-8px);
}

.wishing-well__bg-card--2 {
  transform: rotate(-1.5deg) translateX(-4px);
  opacity: 0.8;
}

/* 主卡片 */
.wishing-well__card {
  position: relative;
  background: var(--wishing-well-gradient);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-lg);
  border: 1px solid rgba(255, 255, 255, 0.5);
}

.wishing-well__header {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-lg);
  padding-bottom: var(--spacing-md);
  border-bottom: 1px solid rgba(127, 169, 184, 0.2);
}

.wishing-well__icon {
  font-size: var(--font-size-lg);
}

.wishing-well__title {
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--color-text-primary);
  letter-spacing: 1px;
}

.wishing-well__list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
}

.wishing-well__item {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-fast);
  margin-left: calc(var(--spacing-sm) * -1);
  margin-right: calc(var(--spacing-sm) * -1);
}

.wishing-well__item:hover,
.wishing-well__item--hovered {
  background: rgba(255, 255, 255, 0.6);
}

.wishing-well__number {
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--color-accent-primary);
  min-width: 20px;
}

.wishing-well__course-info {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: var(--spacing-xs);
  line-height: 1.4;
}

.wishing-well__course-name {
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--color-text-primary);
}

.wishing-well__separator {
  color: var(--color-text-muted);
}

.wishing-well__teacher {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  font-weight: 400;
}

.wishing-well__add-btn {
  display: block;
  width: 100%;
  padding: 0;
  border: none;
  border-radius: var(--radius-md);
  background: transparent;
  cursor: pointer;
  transition: opacity var(--transition-fast);
}

.wishing-well__add-btn:hover {
  opacity: 0.9;
}

.wishing-well__add-img {
  display: block;
  width: 100%;
  height: auto;
  object-fit: contain;
  border-radius: var(--radius-md);
}
</style>
