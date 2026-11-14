# GEN. — Formula 1 比賽資料與遙測分析

結合 **GEN. Reformed** 溫潤編輯美學（`#F6F3EC` 暖奶油底色、`#FFFFFF` 卡片搭配 `1px #DFD9CE` 細線邊框、`#1C1917` 深焙與 `#1B4332` 森林綠雙車手對比）與 F1 深度遙測分析的互動式網頁。

## 功能特色
- **遙測對比**：速度、油門 %、煞車 %、檔位/DRS 與逐彎時間差 (Delta) 同步互動游標圖表。
- **單圈與配速**：單圈時間分佈與「燃油修正配速」切換。
- **輪胎與策略**：各配方輪胎 (Soft / Medium / Hard) 時間軸與衰退曲線。
- **賽道與區段**：2D SVG 賽道微區段優勢地圖、動態模擬繞圈與 S1/S2/S3 計時表。
- **2026 賽程與台灣時間**：24 站完整賽程、圈數、賽道長度，換算為台灣時間 (UTC+8)。
- **車手積分榜與車隊圖鑑**：2026 即時積分同步、100% 去背車手頭像、車隊 LOGO 與側視賽車圖鑑。

## 部署至 GitHub Pages (`bossliugen/GEWEB-F1`)
本專案已內建 `.github/workflows/deploy.yml` 與 `vite.config.ts` (`base: './'`)，支援自動部署至 GitHub Pages。

```bash
git init
git add .
git commit -m "feat: build GEN. F1 race data & telemetry web app"
git branch -M main
git remote add origin https://github.com/bossliugen/GEWEB-F1.git
git push -u origin main
```

推送後至 GitHub Repository 的 **Settings → Pages → Source** 選擇 **GitHub Actions** 即可於 `https://bossliugen.github.io/GEWEB-F1/` 直接瀏覽。
