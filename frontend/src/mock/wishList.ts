/**
 * 許願池假資料（開發/展示用）
 * 未來接 API 時可改為從 store 或 API 取得
 */
import type { WishCourse } from '@/types'

export const mockWishList: WishCourse[] = [
  { id: 1, name: '演算法', teacher: '王大明' },
  { id: 2, name: '動力學', teacher: '廖老大' },
  { id: 3, name: '當代潮流與兩性探討', teacher: '蘇勃起' },
  { id: 4, name: '神鵰培養概論', teacher: '楊過' },
  { id: 5, name: '宮廟概論', teacher: '劉忙' },
]
