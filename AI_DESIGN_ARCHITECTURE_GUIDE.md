# F1 比賽資料與遙測分析 — AI 網站設計架構指引說明書

> **派發來源**：`E:\GoogleAntigravityCoding\品牌風格設計\DESIGN_SYSTEM.md`（經 Gemini 品牌設計對話彙總確立）  
> **目標專案**：`E:\GoogleAntigravityCoding\賽車遙測資料`（線上入口：`https://bossliugen.github.io/GEWEB-F1/`）  
> **技術架構**：Vite + React 19 + TypeScript + Tailwind CSS v4（`src/App.tsx`、`src/components/BrandLogo.tsx`、`TelemetryChartsTab.tsx`、`LapPaceTab.tsx`、`TyreStrategyTab.tsx`、`CircuitSectorsTab.tsx`）  
> **專案角色**：**02 / F1 TELEMETRY — 賽車工程年鑑與雙車手遙測實驗室（專屬點綴色：`#9E3B33` 賽道礦物紅；遙測雙線：`#1C1917` vs `#1B4332`）**

---

## 1. 給本專案 AI 的核心任務定義

本專案將複雜的 Formula 1 單圈遙測、配速修正、輪胎策略與 2026 賽曆（台灣時間 UTC+8）收斂成一份**可讀性極高的賽車工程年鑑**。畫面必須乾淨、留白充足，讓觀眾在白卡對比雙車手曲線時能一眼看出差距所在。

---

## 2. 必須鎖死的 80% 品牌共享規範（對應 `index.html` 與 `src/index.css`）

1. **色票鎖定**：
   - 全站基底鎖定 `bg-[#F6F3EC]`、`text-[#1C1917]`、白卡 `bg-white border border-[#DFD9CE] rounded-2xl`。
   - **雙車手對比標準色**：車手 A 統一使用 `#1C1917`（深濃縮咖啡黑），車手 B 統一使用 `#1B4332`（深森林綠），禁止使用刺眼螢光雙色。
   - **領域點綴色**：`#9E3B33`（賽道礦物紅 Track Oxide）用於賽事旗標或極少量重點標示；輪胎配方（Soft / Medium / Hard）使用低飽和膠囊底色，不搶走主版面暖調編輯感。
2. **字型防呆與時間對齊**：
   - `BrandLogo.tsx` 維持原生 `Instrument Serif` `GEN.`（句點 `.` 為 `#1B4332`）＋ 無留白俯視 2D F1 賽車 SVG。
   - 所有中文大獎賽名稱、賽道解析與分頁名稱**嚴禁套用 `serif`**（`Inter` + `Noto Sans TC`）。
   - 所有單圈時間（如 `1:28.412`）、S1/S2/S3 區段時間、時差 Delta（`+0.142s`）與尾速（`334 km/h`）**必須開啟 Tailwind `tabular-nums`**（`IBM Plex Mono`）。
3. **動效一致**：
   - 保留 `ScrollReveal.tsx`，使用 `cubic-bezier(0.22, 1, 0.36, 1)` 平滑上浮並支援 `prefers-reduced-motion`。

---

## 3. 本專案專屬 20% 架構與跨站整合指引

### A. 統一 Top Bar 與 Cross-Site Switcher（`src/App.tsx` / `BrandLogo.tsx`）
- 頂部左側維持 `GEN.`（點擊可回總門戶 `https://bossliugen.github.io/GENWeb/`）＋ 俯視 2D F1 賽車 SVG。
- 右側整合精簡 **Cross-Site Switcher**（`總門戶` / `中古車庫` / `鏈上監測` / `F1 遙測 [Active]`），讓總門戶與社群訪客可一鍵往返各分析工具。

### B. 漸進式資料分析架構（維持 4 大核心視角不擁擠）
1. **單行 Sticky 場次與雙車手選擇列**：賽季 / 分站 / 時段（FP / Q / R） / 車手 A vs 車手 B。
2. **4 張精簡 KPI 白卡**：最快單圈、理論最佳組合（Theoretical Best）、最高尾速、進站次數。
3. **4 大專注分頁**：
   - `TelemetryChartsTab`：速度、油門 %、煞車 %、檔位、DRS 與 Delta 同步游標疊圖。
   - `LapPaceTab`：逐圈配速折線圖，保留「油量修正（Fuel Corrected）」切換開關。
   - `TyreStrategyTab`：各車隊輪胎 Stint 時間軸與退化斜率。
   - `CircuitSectorsTab`：2D SVG 賽道迷你區段優勢上色圖 + S1/S2/S3 表格。
4. **2026 賽曆與積分（`ScheduleView` / `StandingsView` / `NextRaceView`）**：維持台灣時間（UTC+8）顯示與一鍵加入行事曆功能。

### C. 社群影音漏斗銜接（IG `@hiboss.gen` / YT `LOG 02 // 賽道數據室`）
- 每站比賽頁尾或分析區可預留「賽後數據圖卡（IG）」與「工程復盤短片（YouTube）」導流入口，與 YT 縮圖上的核心數字標註（如 `+0.14s`）形成雙向呼應，並保持統一精簡 Footer（`© 2026 HIBOSS GEN. · 台灣`）。
