# 專案目錄架構說明

本文檔說明 `NCU-TLDR` 專案的完整結構及各目錄/檔案的用途。

## 目錄樹狀結構

```
NCU-TLDR/
├── backend/                  # 後端應用程式目錄
│   ├── main.py               # 後端入口點
│   ├── pyproject.toml        # Python 專案設定
│   ├── requirements.txt      # Python 依賴清單
│   └── uv.lock               # uv 依賴鎖定檔
├── frontend/                 # 前端應用程式目錄
│   ├── doc/                  # 專案文件目錄
│   │   └── directory_hierarchy.md
│   ├── node_modules/         # 依賴套件（由 pnpm 管理）
│   ├── public/               # 公共靜態資源目錄
│   ├── src/                  # 原始碼目錄
│   │   ├── assets/           # 靜態資源（圖片、圖示等）
│   │   ├── components/       # Vue 元件目錄
│   │   │   └── __tests__/    # 元件單元測試
│   │   ├── mock/             # 模擬資料（開發/測試用）
│   │   ├── router/           # 路由設定
│   │   │   └── __tests__/    # 路由單元測試
│   │   ├── types/            # TypeScript 型別定義
│   │   ├── views/            # 頁面視圖元件
│   │   │   └── __tests__/    # 視圖單元測試
│   │   ├── App.vue           # 根元件
│   │   ├── main.ts           # 應用程式入口點
│   │   └── style.css         # 全域樣式
│   ├── eslint.config.mjs     # ESLint 設定檔
│   ├── index.html            # HTML 入口檔
│   ├── package.json          # 前端專案設定
│   ├── README.md             # 前端說明文件
│   ├── tsconfig.app.json     # TypeScript 應用程式設定
│   ├── tsconfig.json         # TypeScript 主設定檔
│   ├── tsconfig.node.json    # TypeScript Node.js 設定
│   ├── vite.config.ts        # Vite 建置工具設定檔
│   └── vitest.config.ts      # Vitest 測試設定檔
├── .gitignore                # Git 忽略規則
├── LICENSE                   # 授權條款
├── package.json              # 專案根目錄設定
├── pnpm-lock.yaml            # pnpm 依賴鎖定檔
├── pnpm-workspace.yaml       # pnpm workspace 設定
└── README.md                 # 專案總說明文件
```

---

## 各目錄與檔案詳細說明

### 根目錄檔案

#### `pnpm-workspace.yaml`
- **用途**：定義 pnpm workspace 的結構，管理 monorepo 中的多個專案（backend, frontend）

#### `package.json` (Root)
- **用途**：根目錄的專案設定，通常包含全域的腳本或依賴

#### `backend/` - 後端目錄
- **用途**：存放 Python 後端程式碼
- **檔案**：
  - `main.py`：應用程式入口
  - `pyproject.toml`：專案設定與工具配置
  - `requirements.txt`：依賴套件清單

---

### `frontend/` - 前端目錄

#### 根目錄檔案 (frontend/)

- **`vite.config.ts`**：Vite 建置工具設定檔，包含 Vue 插件、路徑別名等設定
- **`vitest.config.ts`**：Vitest 測試框架設定檔
- **`tsconfig.json`**：TypeScript 主設定檔
- **`eslint.config.mjs`**：ESLint 程式碼檢查設定檔
- **`index.html`**：Vue 應用程式的 HTML 入口點

#### `src/components/` - Vue 元件目錄

存放可重複使用的 Vue 元件及其測試。

**主要元件：**
- **`CourseAISummary.vue`**：課程 AI 摘要元件
- **`CourseBasicInfo.vue`**：課程基本資訊顯示元件
- **`CourseCard.vue`**：課程卡片元件
- **`CourseComments.vue`**：課程評論列表元件
- **`CourseDetail.vue`**：課程詳細資訊容器元件
- **`CourseGrid.vue`**：課程網格排列元件
- **`CourseStarEvaluation.vue`**：課程星級評分輸入/顯示元件
- **`GradingPieChart.vue`**：評分圓餅圖元件
- **`NavBar.vue`**：全域導覽列元件
- **`SearchBar.vue`**：搜尋欄元件
- **`StarRating.vue`**：通用星級評分元件
- **`WishingWell.vue`**：許願池元件

**測試目錄 (`__tests__/`)：**
包含對應元件的單元測試檔案（如 `CourseCard.spec.ts`, `NavBar.spec.ts` 等）。

#### `src/views/` - 頁面視圖元件

- **`HomeView.vue`**：首頁視圖
- **`CourseDetailView.vue`**：課程詳情頁視圖
- **`__tests__/`**：包含視圖元件的測試檔案

#### `src/router/` - 路由設定

- **`index.ts`**：定義前端路由規則
- **`__tests__/`**：路由相關測試

#### `src/types/` - TypeScript 型別定義

- **`course.ts`**：課程相關資料介面定義
- **`index.ts`**：統一匯出型別定義

#### `src/mock/` - 模擬資料

- **`courses.ts`**：開發用模擬課程資料
- **`wishList.ts`**：開發用模擬願望清單資料

#### `src/assets/` - 靜態資源

存放圖片與圖示資源，如：
- `Nothing_box.png`
- `wishing_well_spritual_no_bg.png`

---

## 技術棧與架構特點

- **Monorepo 管理**：使用 pnpm workspace 管理前後端
- **前端框架**：Vue 3 (Composition API + setup) + TypeScript
- **後端框架**：Python (FastAPI/Flask 等，視 `main.py` 內容而定)
- **建置與測試**：Vite + Vitest
- **程式碼規範**：ESLint + Prettier (或整合於 ESLint)

---

*最後更新：2026-02-17*
