/**
 * 課程相關型別定義
 */

export interface CourseRatings {
  /** 收穫評分 (0-5) */
  reward: number
  /** 分數評分 (0-5) */
  score: number
  /** 輕鬆程度評分 (0-5) */
  easiness: number
  /** 教師風格評分 (0-5) */
  teacherStyle: number
}

export interface Course {
  /** 課程唯一識別碼 */
  id: number
  /** 課程名稱 */
  name: string
  /** 授課教師 */
  teacher: string
  /** 課程標籤 */
  tags: string[]
  /** 各項評分 */
  ratings: CourseRatings
}

export interface WishCourse {
  /** 課程唯一識別碼 */
  id: number
  /** 課程名稱 */
  name: string
  /** 授課教師 */
  teacher: string
}
