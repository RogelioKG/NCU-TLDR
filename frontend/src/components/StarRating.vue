<script setup lang="ts">
// StarRating 元件 - 星星評分顯示
interface Props {
  rating: number
  maxRating?: number
  size?: 'sm' | 'md' | 'lg'
  label?: string
}

const props = withDefaults(defineProps<Props>(), {
  maxRating: 5,
  size: 'md',
  label: '',
})

// 計算星星狀態
function getStarFill(index: number): 'full' | 'half' | 'empty' {
  const rating = props.rating
  if (rating >= index + 1) {
    return 'full'
  } else if (rating >= index + 0.5) {
    return 'half'
  }
  return 'empty'
}
</script>

<template>
  <div
    class="star-rating"
    :class="`star-rating--${size}`"
    role="img"
    :aria-label="`${label ? `${label}: ` : ''}${rating} 顆星，滿分 ${maxRating} 顆星`"
  >
    <span v-if="label" class="star-rating__label">{{ label }}</span>
    <div class="star-rating__stars">
      <span
        v-for="i in maxRating"
        :key="i"
        class="star-rating__star"
        :class="`star-rating__star--${getStarFill(i - 1)}`"
      >
        <!-- 實心星星 -->
        <svg
          v-if="getStarFill(i - 1) === 'full'"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
        <!-- 半星 -->
        <svg
          v-else-if="getStarFill(i - 1) === 'half'"
          viewBox="0 0 24 24"
        >
          <defs>
            <linearGradient :id="`half-${i}`">
              <stop offset="50%" :stop-color="'var(--color-star-filled)'" />
              <stop offset="50%" :stop-color="'var(--color-star-empty)'" />
            </linearGradient>
          </defs>
          <path
            :fill="`url(#half-${i})`"
            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
          />
        </svg>
        <!-- 空心星星 -->
        <svg
          v-else
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      </span>
    </div>
  </div>
</template>

<style scoped>
.star-rating {
  display: flex;
  align-items: center;
  gap: 0.75em; /* 文字與星星間距依字體比例 */
}

.star-rating__label {
  font-weight: 500;
  color: var(--color-text-primary);
  width: 4em; /* 固定與「教師風格」四字同寬 */
  flex-shrink: 0;
}

.star-rating__stars {
  display: flex;
  align-items: center;
  justify-content: flex-start; /* 星星區靠左對齊 */
  gap: var(--spacing-xs);
}

.star-rating__star {
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform var(--transition-fast);
}

.star-rating__star svg {
  width: 100%;
  height: 100%;
}

.star-rating__star--full {
  color: var(--color-star-filled);
}

.star-rating__star--empty {
  color: var(--color-star-empty);
}

/* 尺寸變體 */
.star-rating--sm .star-rating__star {
  width: 16px;
  height: 16px;
}

.star-rating--sm .star-rating__label {
  font-size: var(--font-size-xs);
  width: 4em;
}

.star-rating--md .star-rating__star {
  width: 22px;
  height: 22px;
}

.star-rating--md .star-rating__label {
  font-size: var(--font-size-sm);
}

.star-rating--lg .star-rating__star {
  width: 28px;
  height: 28px;
}

.star-rating--lg .star-rating__label {
  font-size: var(--font-size-base);
  width: 4em;
}
</style>
