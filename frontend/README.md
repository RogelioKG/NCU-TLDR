# NCU-TLDR: Frontend

> 在這裡紀錄開發事項，以便其他人理解程式、接續開發。

## 專案概覽

- **技術**：Vue 3 + TypeScript + Vite（rolldown-vite）
- **套件管理**：**僅使用 pnpm**，請勿使用 npm 或 yarn，以避免 lockfile 與依賴不一致。

### 環境需求

- Node.js **>= 20**
- **pnpm >= 9**（建議使用 Corepack：`corepack enable`）

---

## 套件清單與用途

### 正式依賴（dependencies）

| 套件 | 用途 |
|------|------|
| **vue** | Vue 3 框架，負責 UI 元件與響應式邏輯。 |

### 開發依賴（devDependencies）

| 套件 | 用途 |
|------|------|
| **vite**（rolldown-vite） | 建置工具：dev server、HMR、打包。使用 Rolldown 版以相容 Vite 7 生態。 |
| **@vitejs/plugin-vue** | Vite 的 Vue 單檔元件（SFC）編譯與 HMR 支援。 |
| **vue-tsc** | Vue 專案的 TypeScript 型別檢查（build 前檢查）。 |
| **typescript** | TypeScript 編譯與型別支援。 |
| **@vue/tsconfig** | Vue 專案用的 TypeScript 基底設定（如 tsconfig.dom.json）。 |
| **vitest** | 單元測試框架，與 Vite 共用設定與轉譯。 |
| **@vue/test-utils** | Vue 元件測試工具（mount、wrapper、find 等）。 |
| **jsdom** | 在 Node 環境模擬 DOM，供 Vitest 跑元件測試。 |
| **eslint** | 程式碼風格與語法檢查。 |
| **@antfu/eslint-config** | 本專案使用的 ESLint 規則集（含 Vue、TypeScript 等）。 |
| **@types/node** | Node.js API 的 TypeScript 型別定義。 |

> `package.json` 中的 `"vite": "npm:rolldown-vite@7.2.5"` 是 **pnpm 的別名語法**（從 npm registry 安裝 rolldown-vite），不是使用 npm 當套件管理員，無須刪除。

---

## 開發流程

### 1. 安裝依賴

```bash
pnpm install
```

請勿使用 `npm install` 或 `yarn`。

### 2. 開發（Development）

```bash
pnpm run dev
```

會啟動 Vite dev server（預設 http://localhost:5173），修改程式會熱更新（HMR）。

### 3. 編譯（Build）

```bash
pnpm run build
```

會先執行 TypeScript 型別檢查（`vue-tsc -b`），再產出正式版至 `dist/`。

### 4. 預覽 build 結果

```bash
pnpm run preview
```

使用 Vite 內建 server 預覽 `dist/` 內容，無需另外部署。

### 5. 程式碼檢查（Lint）

```bash
pnpm run lint      # 檢查
pnpm run lint:fix  # 自動修復可修項目
```

提交前建議先通過 lint；pre-commit hook 也會執行 frontend lint。

### 6. 測試（Test）

```bash
pnpm run test      # 監聽模式，檔案變更時重跑
pnpm run test:run  # 跑一次後結束（CI 適用）
```

單元測試使用 Vitest + @vue/test-utils，測試檔位於 `src/**/*.spec.ts`。

---

## 常用指令速查

| 指令 | 說明 |
|------|------|
| `pnpm install` | 安裝依賴 |
| `pnpm run dev` | 啟動開發 server |
| `pnpm run build` | 編譯正式版 |
| `pnpm run preview` | 預覽 build 結果 |
| `pnpm run lint` | ESLint 檢查 |
| `pnpm run lint:fix` | ESLint 自動修復 |
| `pnpm run test` | 執行測試（監聽） |
| `pnpm run test:run` | 執行測試（單次） |

新增套件請使用：

- `pnpm add <套件名>` — 依賴
- `pnpm add -D <套件名>` — 開發依賴

---

## 目錄結構（簡要）

- `src/` — 原始碼（元件、樣式、型別、mock 資料）
- `public/` — 靜態資源（不經 Vite 處理）
- `index.html` — 入口 HTML
- `vite.config.ts` — Vite（含 Vitest）設定
