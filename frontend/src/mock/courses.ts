/**
 * 課程假資料（開發/展示用）
 * 未來接 API 時可改為從 store 或 API 取得
 */
import type { Course } from '@/types'

export const mockCourses: Course[] = [
  {
    id: 1,
    name: '演算法演算法演算法演算法演算法',
    teacher: '王大明',
    tags: ['找對組員重要', '高分', '作業多'],
    ratings: {
      reward: 4.5,
      score: 4,
      easiness: 3,
      teacherStyle: 4.5,
    },
  },
  {
    id: 2,
    name: '動力學',
    teacher: '廖老大',
    tags: ['概念重要', '期末難'],
    ratings: {
      reward: 4,
      score: 3.5,
      easiness: 2.5,
      teacherStyle: 4,
    },
  },
  {
    id: 3,
    name: '資料結構',
    teacher: '陳教授',
    tags: ['實用', '程式作業'],
    ratings: {
      reward: 5,
      score: 4,
      easiness: 3,
      teacherStyle: 4.5,
    },
  },
  {
    id: 4,
    name: '線性代數',
    teacher: '林博士',
    tags: ['基礎重要', '考試多'],
    ratings: {
      reward: 4,
      score: 3.5,
      easiness: 2,
      teacherStyle: 3.5,
    },
  },
  {
    id: 5,
    name: '機率與統計',
    teacher: '吳老師',
    tags: ['數學基礎', '應用廣'],
    ratings: {
      reward: 4.5,
      score: 4,
      easiness: 3.5,
      teacherStyle: 4,
    },
  },
  {
    id: 6,
    name: '作業系統',
    teacher: '鄭教授',
    tags: ['核心必修', '實作多'],
    ratings: {
      reward: 5,
      score: 4.5,
      easiness: 2.5,
      teacherStyle: 4.5,
    },
  },
  {
    id: 7,
    name: '計算機網路',
    teacher: '黃博士',
    tags: ['實用', '觀念重要'],
    ratings: {
      reward: 4,
      score: 3.5,
      easiness: 3,
      teacherStyle: 4,
    },
  },
  {
    id: 8,
    name: '人工智慧導論',
    teacher: '李教授',
    tags: ['熱門', '前沿'],
    ratings: {
      reward: 5,
      score: 4.5,
      easiness: 3,
      teacherStyle: 5,
    },
  },
  {
    id: 9,
    name: '軟體工程',
    teacher: '劉老師',
    tags: ['團隊合作', '專案實作'],
    ratings: {
      reward: 4.5,
      score: 4,
      easiness: 3.5,
      teacherStyle: 4,
    },
  },
]
