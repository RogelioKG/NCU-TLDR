<script setup lang="ts">
import { computed, reactive } from 'vue'
import { mockCourses } from '@/mock/courses'
import { mockWishList } from '@/mock/wishList'

interface WishFormPayload {
  name: string
  teacher: string
}

const emit = defineEmits<{
  close: []
  submit: [payload: WishFormPayload]
}>()

const form = reactive<WishFormPayload>({
  name: '',
  teacher: '',
})

const canSubmit = computed(() =>
  form.name.trim().length > 0 && form.teacher.trim().length > 0,
)

const allCourseNames = Array.from(
  new Set([
    ...mockCourses.map(course => course.name.trim()),
    ...mockWishList.map(wish => wish.name.trim()),
  ]),
).filter(name => name.length > 0)

const allTeachers = Array.from(
  new Set([
    ...mockCourses.map(course => course.teacher.trim()),
    ...mockWishList.map(wish => wish.teacher.trim()),
  ]),
).filter(teacher => teacher.length > 0)

const filteredCourseNames = computed(() => {
  const keyword = form.name.trim().toLocaleLowerCase()
  if (!keyword)
    return allCourseNames.slice(0, 12)
  return allCourseNames
    .filter(name => name.toLocaleLowerCase().includes(keyword))
    .slice(0, 12)
})

const filteredTeachers = computed(() => {
  const keyword = form.teacher.trim().toLocaleLowerCase()
  if (!keyword)
    return allTeachers.slice(0, 12)
  return allTeachers
    .filter(teacher => teacher.toLocaleLowerCase().includes(keyword))
    .slice(0, 12)
})

function handleOverlayClick(event: MouseEvent) {
  if ((event.target as HTMLElement).classList.contains('wish-overlay')) {
    emit('close')
  }
}

function handleSubmit() {
  if (!canSubmit.value)
    return

  emit('submit', {
    name: form.name.trim(),
    teacher: form.teacher.trim(),
  })
}
</script>

<template>
  <Teleport to="body">
    <Transition name="wish-fade">
      <div v-show="true" class="wish-overlay" @click="handleOverlayClick">
        <div class="wish-toast" role="dialog" aria-label="課程許願池表單">
          <div class="wish-toast__header">
            <h3 class="wish-toast__title">
              課程許願池
            </h3>
            <button
              class="wish-toast__close"
              type="button"
              aria-label="關閉"
              @click="emit('close')"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form class="wish-toast__form" @submit.prevent="handleSubmit">
            <label class="wish-toast__label" for="wish-course-name">許願課程名稱</label>
            <input
              id="wish-course-name"
              v-model="form.name"
              type="text"
              list="wish-course-name-options"
              class="wish-toast__input"
              placeholder="請輸入課程名稱"
            >
            <datalist id="wish-course-name-options">
              <option
                v-for="courseName in filteredCourseNames"
                :key="courseName"
                :value="courseName"
              />
            </datalist>

            <label class="wish-toast__label" for="wish-course-teacher">授課教師</label>
            <input
              id="wish-course-teacher"
              v-model="form.teacher"
              type="text"
              list="wish-course-teacher-options"
              class="wish-toast__input"
              placeholder="請輸入教師姓名"
            >
            <datalist id="wish-course-teacher-options">
              <option
                v-for="teacher in filteredTeachers"
                :key="teacher"
                :value="teacher"
              />
            </datalist>

            <button
              type="submit"
              class="wish-toast__submit"
              :class="{ 'wish-toast__submit--disabled': !canSubmit }"
              :disabled="!canSubmit"
            >
              送出許願
            </button>
          </form>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.wish-overlay {
  position: fixed;
  inset: 0;
  z-index: 9000;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
  padding: var(--spacing-md);
}

.wish-toast {
  width: 100%;
  max-width: 420px;
  border-radius: var(--radius-xl);
  background: var(--color-surface);
  box-shadow: var(--shadow-xl);
  padding: var(--spacing-lg) var(--spacing-xl);
}

.wish-toast__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--spacing-md);
}

.wish-toast__title {
  font-size: var(--font-size-xl);
  font-weight: 800;
  color: var(--color-text-primary);
}

.wish-toast__close {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-sm);
  color: var(--color-text-muted);
  transition: all var(--transition-fast);
}

.wish-toast__close:hover {
  color: var(--color-text-primary);
  background: var(--color-background-alt);
}

.wish-toast__close svg {
  width: 18px;
  height: 18px;
}

.wish-toast__form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.wish-toast__label {
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--color-text-secondary);
}

.wish-toast__input {
  width: 100%;
  padding: 10px 14px;
  border-radius: var(--radius-md);
  background: var(--color-background-alt);
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-sm);
  transition: box-shadow var(--transition-fast);
}

.wish-toast__input::placeholder {
  color: var(--color-text-muted);
}

.wish-toast__input:focus {
  box-shadow: 0 0 0 2px var(--color-accent-primary);
}

.wish-toast__submit {
  margin-top: var(--spacing-sm);
  width: 100%;
  padding: 12px;
  border-radius: var(--radius-full);
  background: var(--color-accent-primary);
  color: white;
  font-size: var(--font-size-sm);
  font-weight: 600;
  transition: all var(--transition-fast);
}

.wish-toast__submit:hover:not(:disabled) {
  background: var(--color-text-primary);
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.wish-toast__submit--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.wish-fade-enter-active,
.wish-fade-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.wish-fade-enter-from,
.wish-fade-leave-to {
  opacity: 0;
  transform: translateY(8px) scale(0.98);
}
</style>
