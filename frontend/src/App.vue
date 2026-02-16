<script setup lang="ts">
import { RouterView } from 'vue-router'
/**
 * NCU-TLDR 課程評價平台 - 主頁面
 * 設計風格：Soft Modern Academic
 */
import NavBar from './components/NavBar.vue'
</script>

<template>
  <div class="app">
    <!-- 導航列 -->
    <NavBar />

    <!-- 主要內容區 -->
    <main class="main">
      <RouterView />
    </main>

    <!-- 頁尾 -->
    <footer class="footer">
      <p class="footer__text">
        © 2026 NCU TLDR - 國立中央大學課程評價平台
      </p>
    </footer>
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main {
  flex: 1;
  padding-top: 100px; /* 為固定導航列留空間 */
  padding-bottom: var(--spacing-2xl);
}

.footer {
  padding: var(--spacing-xl);
  text-align: center;
  border-top: 1px solid var(--color-background-alt);
}

.footer__text {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
}

/* 響應式設計 */
@media (max-width: 768px) {
  .main {
    padding-top: 80px;
  }
}
</style>
