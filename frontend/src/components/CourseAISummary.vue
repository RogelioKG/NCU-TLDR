<script setup lang="ts">
import type { CourseSummary } from '@/types'
import GradingPieChart from './GradingPieChart.vue'

defineProps<{
  summary: CourseSummary | undefined
}>()
</script>

<template>
  <section v-if="summary" class="ai-summary" aria-label="AI 統整摘要">
    <header class="ai-summary__header">
      <h3 class="ai-summary__title">
        AI 統整摘要
      </h3>
      <p class="ai-summary__source">
        以下統整來自 {{ summary.reviewCount }} 則評價
      </p>
    </header>

    <div class="ai-summary__body">
      <!-- 左側文字資訊 -->
      <div class="ai-summary__text">
        <div class="ai-summary__item">
          <span class="ai-summary__emoji">📊</span>
          <div><strong>課程概述：</strong>{{ summary.overview }}</div>
        </div>
        <div class="ai-summary__item">
          <span class="ai-summary__emoji">👥</span>
          <div><strong>適合族群：</strong>{{ summary.targetAudience }}</div>
        </div>
        <div class="ai-summary__item">
          <span class="ai-summary__emoji">📕</span>
          <div><strong>上課用書：</strong>{{ summary.textbook }}</div>
        </div>
        <div class="ai-summary__item">
          <span class="ai-summary__emoji">📚</span>
          <div><strong>建議先備知識：</strong>{{ summary.prerequisites }}</div>
        </div>
        <div class="ai-summary__item">
          <span class="ai-summary__emoji">🕐</span>
          <div><strong>平均每週額外投入時間：</strong>{{ summary.weeklyHours }}</div>
        </div>
        <div class="ai-summary__item ai-summary__item--warn">
          <span class="ai-summary__emoji">⚠️</span>
          <div><strong>常見雷點或注意事項：</strong>{{ summary.notes }}</div>
        </div>
      </div>

      <!-- 右側圓餅圖 -->
      <div class="ai-summary__chart">
        <GradingPieChart :items="summary.gradingItems" />
      </div>
    </div>
  </section>

  <!-- 尚無評價 -->
  <section v-else class="ai-summary ai-summary--empty" aria-label="尚無評價">
    <header class="ai-summary__header">
      <h3 class="ai-summary__title">
        AI 統整摘要
      </h3>
    </header>
    <div class="ai-summary__empty-body">
      <img class="ai-summary__empty-icon" src="@/assets/Nothing_box.png" alt="尚無評價">
      <div class="ai-summary__empty-content">
        <h4 class="ai-summary__empty-title">
          尚無評價
        </h4>
        <p class="ai-summary__empty-text">
          你是第一個留下修課經驗的人，第一個撰寫的人可獲得最多積分！
        </p>
        <button class="ai-summary__empty-btn" type="button">
          撰寫評價
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.ai-summary {
  padding: var(--spacing-lg) var(--spacing-xl);
  border-radius: var(--radius-xl);
  background:
    radial-gradient(circle at 10% 90%, rgba(203, 239, 242, 0.3), transparent 40%),
    radial-gradient(circle at 90% 10%, rgba(229, 238, 255, 0.35), transparent 35%),
    rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  box-shadow: var(--shadow-md);
}

.ai-summary__header {
  text-align: center;
  margin-bottom: var(--spacing-lg);
}

.ai-summary__title {
  font-size: var(--font-size-xl);
  font-weight: 800;
  color: var(--color-text-primary);
}

.ai-summary__source {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  margin-top: 4px;
}

.ai-summary__body {
  display: flex;
  gap: var(--spacing-xl);
}

.ai-summary__text {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.ai-summary__item {
  display: flex;
  gap: var(--spacing-sm);
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);
  line-height: 1.65;
}

.ai-summary__emoji {
  flex-shrink: 0;
  font-size: var(--font-size-base);
}

.ai-summary__chart {
  flex-shrink: 0;
  display: flex;
  align-items: flex-start;
}

/* Empty state */
.ai-summary--empty {
  text-align: center;
}

.ai-summary__empty-body {
  display: flex;
  align-items: center;
  gap: var(--spacing-xl);
  justify-content: center;
  padding: var(--spacing-lg) 0;
}

.ai-summary__empty-icon {
  width: 120px;
  height: auto;
  flex-shrink: 0;
  object-fit: contain;
}

.ai-summary__empty-content {
  text-align: left;
}

.ai-summary__empty-title {
  font-size: var(--font-size-lg);
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 4px;
}

.ai-summary__empty-text {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-md);
}

.ai-summary__empty-btn {
  padding: var(--spacing-sm) var(--spacing-lg);
  border-radius: var(--radius-full);
  background: var(--color-accent-primary);
  color: white;
  font-weight: 600;
  font-size: var(--font-size-sm);
  transition: all var(--transition-fast);
}

.ai-summary__empty-btn:hover {
  background: var(--color-text-primary);
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

@media (max-width: 700px) {
  .ai-summary__body {
    flex-direction: column;
  }

  .ai-summary__chart {
    align-self: center;
  }

  .ai-summary__empty-body {
    flex-direction: column;
    text-align: center;
  }

  .ai-summary__empty-content {
    text-align: center;
  }
}
</style>
