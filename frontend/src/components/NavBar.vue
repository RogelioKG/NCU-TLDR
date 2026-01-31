<script setup lang="ts">
// NavBar 元件 - 磨砂玻璃效果導航列
import { onMounted, onUnmounted, ref } from 'vue'

// 滾動偵測門檻值 (px)
const SCROLL_THRESHOLD_PX = 20

const isScrolled = ref(false)

let ticking = false
function handleScroll() {
  if (!ticking) {
    requestAnimationFrame(() => {
      isScrolled.value = window.scrollY > SCROLL_THRESHOLD_PX
      ticking = false
    })
    ticking = true
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <nav class="navbar" :class="{ 'navbar--scrolled': isScrolled }">
    <div class="navbar__container">
      <div class="navbar__brand">
        <span class="navbar__logo">📚</span>
        <span class="navbar__title">NCU TLDR</span>
      </div>
      <div class="navbar__links" role="navigation" aria-label="主要導覽">
        <a href="#" class="navbar__link navbar__link--active" aria-current="page" @click.prevent>首頁</a>
        <a href="#" class="navbar__link" aria-label="我的評價" @click.prevent>我的評價</a>
        <a href="#" class="navbar__link" aria-label="我的等級" @click.prevent>我的等級</a>
        <a href="#" class="navbar__link" aria-label="關於我們" @click.prevent>關於我們</a>
      </div>
      <div class="navbar__actions">
        <button class="navbar__btn navbar__btn--ghost">
          登入
        </button>
        <button class="navbar__btn navbar__btn--primary">
          註冊
        </button>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: var(--spacing-md) var(--spacing-xl);
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  transition: all var(--transition-normal);
}

.navbar--scrolled {
  padding: var(--spacing-sm) var(--spacing-xl);
  box-shadow: var(--shadow-md);
  background: var(--glass-bg-scrolled);
}

.navbar__container {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.navbar__brand {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.navbar__logo {
  font-size: var(--font-size-xl);
}

.navbar__title {
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--color-text-primary);
  letter-spacing: 0.5px;
}

.navbar__links {
  display: flex;
  align-items: center;
  gap: var(--spacing-xl);
}

.navbar__link {
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--color-text-secondary);
  padding: var(--spacing-sm) 0;
  position: relative;
  transition: color var(--transition-fast);
}

.navbar__link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--color-accent-primary);
  border-radius: var(--radius-full);
  transition: width var(--transition-normal);
}

.navbar__link:hover,
.navbar__link--active {
  color: var(--color-text-primary);
}

.navbar__link:hover::after,
.navbar__link--active::after {
  width: 100%;
}

.navbar__actions {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.navbar__btn {
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-full);
  font-size: var(--font-size-sm);
  font-weight: 500;
  transition: all var(--transition-fast);
}

.navbar__btn--ghost {
  color: var(--color-text-secondary);
  background: transparent;
}

.navbar__btn--ghost:hover {
  color: var(--color-text-primary);
  background: var(--color-background-alt);
}

.navbar__btn--primary {
  color: white;
  background: var(--color-accent-primary);
}

.navbar__btn--primary:hover {
  background: var(--color-text-primary);
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

/* 響應式設計 */
@media (max-width: 768px) {
  .navbar__links {
    display: none;
  }

  .navbar__container {
    padding: 0 var(--spacing-md);
  }
}
</style>
