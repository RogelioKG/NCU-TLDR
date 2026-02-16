<script setup lang="ts">
import type { GradingItem } from '@/types'
import { computed } from 'vue'

const props = defineProps<{
  items: GradingItem[]
}>()

// 莫蘭迪色系，與整體風格一致
const COLORS = [
  '#7fa9b8', // 莫蘭迪藍
  '#a8c5b5', // 鼠尾草綠
  '#8ec8c8', // 莫蘭迪青
  '#c5b8a8', // 莫蘭迪棕
  '#b8a8c5', // 莫蘭迪紫
  '#c5a8b8', // 莫蘭迪粉
]

interface ArcSegment {
  d: string
  color: string
  label: string
  percentage: number
  /** label 定位用的中點角度 */
  midAngle: number
}

const segments = computed<ArcSegment[]>(() => {
  const total = props.items.reduce((s, i) => s + i.percentage, 0)
  if (total === 0)
    return []

  const cx = 100
  const cy = 100
  const outerR = 80
  const innerR = 48 // donut hole

  let currentAngle = -90 // 從 12 點鐘方向開始
  return props.items.map((item, idx) => {
    const sweep = (item.percentage / total) * 360
    const startRad = (currentAngle * Math.PI) / 180
    const endRad = ((currentAngle + sweep) * Math.PI) / 180
    const midAngle = currentAngle + sweep / 2

    const largeArc = sweep > 180 ? 1 : 0

    const x1Outer = cx + outerR * Math.cos(startRad)
    const y1Outer = cy + outerR * Math.sin(startRad)
    const x2Outer = cx + outerR * Math.cos(endRad)
    const y2Outer = cy + outerR * Math.sin(endRad)

    const x1Inner = cx + innerR * Math.cos(endRad)
    const y1Inner = cy + innerR * Math.sin(endRad)
    const x2Inner = cx + innerR * Math.cos(startRad)
    const y2Inner = cy + innerR * Math.sin(startRad)

    const d = [
      `M ${x1Outer} ${y1Outer}`,
      `A ${outerR} ${outerR} 0 ${largeArc} 1 ${x2Outer} ${y2Outer}`,
      `L ${x1Inner} ${y1Inner}`,
      `A ${innerR} ${innerR} 0 ${largeArc} 0 ${x2Inner} ${y2Inner}`,
      'Z',
    ].join(' ')

    currentAngle += sweep
    return {
      d,
      color: COLORS[idx % COLORS.length] as string,
      label: item.label,
      percentage: item.percentage,
      midAngle,
    }
  })
})

// labelPos 備用：未來若需要將 label 放在圓餅外圈可啟用
// function labelPos(midAngle: number) {
//   const r = 100
//   const rad = (midAngle * Math.PI) / 180
//   return { x: 100 + r * Math.cos(rad), y: 100 + r * Math.sin(rad) }
// }
</script>

<template>
  <div class="pie-chart">
    <h4 class="pie-chart__title">
      配分方式
    </h4>
    <svg viewBox="-10 -10 220 220" class="pie-chart__svg">
      <path
        v-for="(seg, idx) in segments"
        :key="idx"
        :d="seg.d"
        :fill="seg.color"
        stroke="white"
        stroke-width="2"
      />
    </svg>
    <ul class="pie-chart__legend">
      <li v-for="(seg, idx) in segments" :key="idx" class="pie-chart__legend-item">
        <span class="pie-chart__dot" :style="{ background: seg.color }" />
        <span>{{ seg.label }} {{ seg.percentage }}%</span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.pie-chart {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-sm);
}

.pie-chart__title {
  font-size: var(--font-size-base);
  font-weight: 700;
  color: var(--color-text-primary);
}

.pie-chart__svg {
  width: 140px;
  height: 140px;
}

.pie-chart__legend {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.pie-chart__legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
}

.pie-chart__dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
}
</style>
