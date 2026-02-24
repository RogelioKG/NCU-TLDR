<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  modelValue: number
  maxRating?: number
  label: string
}

const props = withDefaults(defineProps<Props>(), {
  maxRating: 5,
})

const emit = defineEmits<{
  'update:modelValue': [value: number]
}>()

const hoverIndex = ref(-1)

function selectStar(index: number) {
  const newValue = props.modelValue === index ? 0 : index
  emit('update:modelValue', newValue)
}

function getStarState(starIndex: number): 'full' | 'empty' {
  const activeIndex = hoverIndex.value >= 0 ? hoverIndex.value : props.modelValue
  return starIndex <= activeIndex ? 'full' : 'empty'
}
</script>

<template>
  <div
    class="star-input"
    role="radiogroup"
    :aria-label="`${label}評分`"
  >
    <span class="star-input__label">{{ label }}</span>
    <div
      class="star-input__stars"
      @mouseleave="hoverIndex = -1"
    >
      <button
        v-for="i in maxRating"
        :key="i"
        type="button"
        class="star-input__btn"
        :class="`star-input__btn--${getStarState(i)}`"
        :aria-label="`${i} 顆星`"
        :aria-pressed="modelValue === i"
        @mouseenter="hoverIndex = i"
        @click="selectStar(i)"
      >
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
.star-input {
  display: flex;
  align-items: center;
  gap: 0.75em;
}

.star-input__label {
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--color-text-primary);
  width: 4em;
  flex-shrink: 0;
}

.star-input__stars {
  display: flex;
  gap: 2px;
}

.star-input__btn {
  width: 26px;
  height: 26px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform var(--transition-fast), color var(--transition-fast);
  border-radius: 2px;
}

.star-input__btn:hover {
  transform: scale(1.2);
}

.star-input__btn--full {
  color: var(--color-star-filled);
}

.star-input__btn--empty {
  color: var(--color-star-empty);
}

.star-input__btn svg {
  width: 100%;
  height: 100%;
}
</style>
