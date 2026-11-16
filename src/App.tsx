import React, { useMemo, useState } from 'react';
import { BrandLogo } from './components/BrandLogo';
import { CircuitSectorsTab } from './components/CircuitSectorsTab';
import { LapPaceTab } from './components/LapPaceTab';
import { NextRaceView } from './components/NextRaceView';
import { ScheduleView } from './components/ScheduleView';
import { StandingsView } from './components/StandingsView';
import { DriverPortrait, TeamCarSide, TeamLogo } from './components/TeamAssets';
import { TelemetryChartsTab } from './components/TelemetryChartsTab';
import { TyreStrategyTab } from './components/TyreStrategyTab';
import { CIRCUIT_STORIES } from './data/circuitStories';
import {
  DRIVERS,
  formatLapTime,
  generateSessionTelemetry,
  GRAND_PRIX_CALENDAR,
  SeasonYear,
  SessionType,
  TEAMS,
} from './data/f1Data';

type MainPage = 'next' | 'schedule' | 'standings' | 'telemetry';
type AnalyticsTab = 'telemetry' | 'laps' | 'tyres' | 'circuit';

export function App() {
  const [mainPage, setMainPage] = useState<MainPage>('next');
  const [analyticsTab, setAnalyticsTab] = useState<AnalyticsTab>('telemetry');

  const [season, setSeason] = useState<SeasonYear>('2026');
  const [gpId, setGpId] = useState<string>('bra'); // Latest completed: São Paulo GP
  const [session, setSession] = useState<SessionType>('Race');
  const [driverACode, setDriverACode] = useState<string>('ANT');
  const [driverBCode, setDriverBCode] = useState<string>('VER');

  const selectedGp = useMemo(
    () => GRAND_PRIX_CALENDAR.find((g) => g.id === gpId) ?? GRAND_PRIX_CALENDAR[20],
    [gpId]
  );

  const driverA = useMemo(
    () => DRIVERS.find((d) => d.code === driverACode) ?? DRIVERS[0],
    [driverACode]
  );
  const driverB = useMemo(
    () => DRIVERS.find((d) => d.code === driverBCode) ?? DRIVERS[1],
    [driverBCode]
  );

  const teamA = useMemo(
    () => TEAMS.find((t) => t.id === driverA.teamId),
    [driverA.teamId]
  );
  const teamB = useMemo(
    () => TEAMS.find((t) => t.id === driverB.teamId),
    [driverB.teamId]
  );

  const bundle = useMemo(
    () => generateSessionTelemetry(selectedGp, session, driverA, driverB, season),
    [selectedGp, session, driverA, driverB, season]
  );

  const handleSelectGpFromSchedule = (newGpId: string) => {
    setGpId(newGpId);
    setMainPage('telemetry');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAssignDriver = (slot: 'A' | 'B', code: string) => {
    if (slot === 'A') {
      setDriverACode(code);
    } else {
      setDriverBCode(code);
    }
    setMainPage('telemetry');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F6F3EC] text-[#1C1917] flex flex-col">
      {/* Calm Sticky Top Bar (64px) with GEN. Brand Link & Cross-Site Switcher */}
      <header className="sticky top-0 z-30 bg-[#F6F3EC]/95 backdrop-blur-sm border-b border-[#DFD9CE] reveal-initial">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
          {/* Left: GEN. Brand Lockup (Links back to GENWeb Portal) + Domain Index */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="https://bossliugen.github.io/GENWeb/"
              className="inline-flex items-center focus:outline-none hover:opacity-85 transition-opacity"
              title="返回 HIBOSS GEN. 總門戶"
            >
              <BrandLogo />
            </a>
            <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-medium text-[#57534E] tabular-nums pl-2 border-l border-[#DFD9CE]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#9E3B33]" />
              02 / F1 TELEMETRY
            </span>
          </div>

          {/* Right: Cross-Site Switcher */}
          <nav
            aria-label="跨站切換"
            className="flex items-center gap-1.5 overflow-x-auto py-1"
          >
            <a
              href="https://bossliugen.github.io/GENWeb/"
              className="px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap bg-white border border-[#DFD9CE] text-[#57534E] hover:border-[#1C1917] hover:text-[#1C1917] transition-colors"
            >
              總門戶
            </a>
            <a
              href="https://bossliugen.github.io/Used_Cars9918/"
              className="px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap bg-white border border-[#DFD9CE] text-[#57534E] hover:border-[#1C1917] hover:text-[#1C1917] transition-colors"
            >
              中古車庫
            </a>
            <a
              href="https://bossliugen.github.io/block_Tracking/"
              className="px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap bg-white border border-[#DFD9CE] text-[#57534E] hover:border-[#1C1917] hover:text-[#1C1917] transition-colors"
            >
              鏈上監測
            </a>
            <span
              aria-current="page"
              className="px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap bg-[#1C1917] text-white"
            >
              F1 遙測
            </span>
          </nav>
        </div>

        {/* Sub-Bar: F1 Section Navigation */}
        <div className="border-t border-[#EFECE6] bg-[#F6F3EC]/90">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex flex-wrap items-center justify-between gap-2">
            <nav className="flex items-center gap-1 bg-white border border-[#DFD9CE] rounded-full p-1 overflow-x-auto">
              {(
                [
                  { id: 'next', label: '下一場比賽' },
                  { id: 'schedule', label: '賽程與台灣時間' },
                  { id: 'standings', label: '積分榜與車隊' },
                  { id: 'telemetry', label: '遙測對比' },
                ] as Array<{ id: MainPage; label: string }>
              ).map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setMainPage(item.id)}
                  className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                    mainPage === item.id
                      ? 'bg-[#1C1917] text-white'
                      : 'text-[#57534E] hover:text-[#1C1917]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <div className="hidden md:flex items-center gap-2 text-xs text-[#78716C] tabular-nums">
              <span>{season} FIA Formula 1</span>
              <span className="text-[#DFD9CE]">·</span>
              <span>台灣時間 UTC+8</span>
            </div>
          </div>
        </div>

        {/* Clean Pill Session Selector Row (Shown in Telemetry Mode) */}
        {mainPage === 'telemetry' && (
          <div className="border-t border-[#EFECE6] bg-[#F6F3EC]/90">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <select
                aria-label="賽季"
                value={season}
                onChange={(e) => setSeason(e.target.value as SeasonYear)}
                className="px-3 py-1.5 rounded-full bg-white border border-[#DFD9CE] text-xs font-medium text-[#1C1917] focus:outline-none focus:border-[#1C1917] cursor-pointer"
              >
                <option value="2026">2026 賽季</option>
                <option value="2025">2025 賽季</option>
              </select>

              <select
                aria-label="分站"
                value={gpId}
                onChange={(e) => setGpId(e.target.value)}
                className="px-3 py-1.5 rounded-full bg-white border border-[#DFD9CE] text-xs font-medium text-[#1C1917] focus:outline-none focus:border-[#1C1917] cursor-pointer max-w-[200px]"
              >
                {GRAND_PRIX_CALENDAR.map((gp) => (
                  <option key={gp.id} value={gp.id}>
                    R{String(gp.round).padStart(2, '0')} · {gp.zhName}
                  </option>
                ))}
              </select>

              <select
                aria-label="賽段"
                value={session}
                onChange={(e) => setSession(e.target.value as SessionType)}
                className="px-3 py-1.5 rounded-full bg-white border border-[#DFD9CE] text-xs font-medium text-[#1C1917] focus:outline-none focus:border-[#1C1917] cursor-pointer"
              >
                <option value="Race">正賽 Race</option>
                <option value="Qualifying">排位賽 Qualifying</option>
                <option value="Sprint">衝刺賽 Sprint</option>
              </select>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-[#1C1917]">
                <span className="w-2 h-2 rounded-full bg-[#1C1917]" />
                <select
                  aria-label="車手 A"
                  value={driverACode}
                  onChange={(e) => setDriverACode(e.target.value)}
                  className="text-xs font-semibold text-[#1C1917] bg-transparent focus:outline-none cursor-pointer"
                >
                  {DRIVERS.map((d) => (
                    <option key={d.code} value={d.code}>
                      {d.code} · {d.zhName}
                    </option>
                  ))}
                </select>
              </div>

              <span className="text-xs text-[#78716C] font-medium">vs</span>

              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-[#1B4332]">
                <span className="w-2 h-2 rounded-full bg-[#1B4332]" />
                <select
                  aria-label="車手 B"
                  value={driverBCode}
                  onChange={(e) => setDriverBCode(e.target.value)}
                  className="text-xs font-semibold text-[#1B4332] bg-transparent focus:outline-none cursor-pointer"
                >
                  {DRIVERS.map((d) => (
                    <option key={d.code} value={d.code}>
                      {d.code} · {d.zhName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
        {mainPage === 'next' && (
          <NextRaceView
            onOpenTelemetryForLatest={() => {
              setGpId('bra');
              setMainPage('telemetry');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onAssignDriverToTelemetry={handleAssignDriver}
          />
        )}

        {mainPage === 'telemetry' && season === '2026' && selectedGp.status === 'upcoming' && (
          <div className="bg-white border border-[#DFD9CE] rounded-xl p-6 sm:p-8 space-y-4 reveal-initial">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1B4332]/10 text-[#1B4332] text-xs font-medium">
              尚未開賽 · Round {selectedGp.round}
            </div>
            <h1 className="heading-tc text-2xl font-bold text-[#1C1917]">
              {selectedGp.flag} {selectedGp.zhName} 尚未進行比賽，尚無實際遙測數據
            </h1>
            <p className="text-sm text-[#57534E] leading-relaxed max-w-2xl">
              {CIRCUIT_STORIES[selectedGp.id]?.story ??
                '本分站將於台灣時間 ' + selectedGp.taiwanRaceTime + ' 起跑，賽後將提供完整遙測對比。'}
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setGpId('bra')}
                className="px-4 py-2 rounded-full bg-[#1C1917] text-white text-xs font-medium hover:bg-[#1B4332] transition-colors cursor-pointer"
              >
                切換至最近已完賽分站（R21 聖保羅大獎賽）查看遙測
              </button>
              <button
                type="button"
                onClick={() => setMainPage('next')}
                className="px-4 py-2 rounded-full bg-[#F6F3EC] border border-[#DFD9CE] hover:border-[#1C1917] text-xs font-medium text-[#1C1917] transition-colors cursor-pointer"
              >
                返回下一場比賽總覽
              </button>
            </div>
          </div>
        )}

        {mainPage === 'telemetry' && !(season === '2026' && selectedGp.status === 'upcoming') && (
          <>
            {/* Grand Prix Editorial Title & Cutout Driver/Car Comparison Strip */}
            <section className="bg-white border border-[#DFD9CE] rounded-xl p-5 sm:p-6 reveal-initial">
              <div className="flex flex-wrap items-start justify-between gap-4 pb-5 border-b border-[#EFECE6]">
                <div>
                  <div className="text-xs text-[#78716C] tabular-nums">
                    Round {selectedGp.round} · {season} FIA Formula 1 · {selectedGp.location}
                  </div>
                  <h1 className="heading-tc text-2xl sm:text-3xl font-bold text-[#1C1917] mt-1">
                    {selectedGp.flag} {selectedGp.zhName}
                  </h1>
                  <p className="text-xs sm:text-sm text-[#57534E] mt-1 tabular-nums">
                    {selectedGp.zhCircuitName} · {selectedGp.laps} 圈 ({selectedGp.lengthKm} km) · 台灣正賽時間：{selectedGp.taiwanRaceTime}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <span className="px-3 py-1 rounded-full bg-[#F6F3EC] border border-[#DFD9CE] text-[#1C1917] font-medium">
                    {session === 'Race'
                      ? '正賽遙測'
                      : session === 'Qualifying'
                      ? '排位賽單圈'
                      : '衝刺賽遙測'}
                  </span>
                </div>
              </div>

              {/* Driver A vs Driver B Cutout Portraits, Logos & Cars */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-5">
                {/* Driver A Card */}
                <div className="flex items-center justify-between gap-3 p-3.5 rounded-lg bg-[#F6F3EC]/60 border border-[#DFD9CE]">
                  <div className="flex items-center gap-3">
                    <DriverPortrait driver={driverA} team={teamA} size="lg" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#1C1917]" />
                        <span className="text-xs font-medium text-[#78716C]">車手 A</span>
                        <span className="text-xs font-bold text-[#1C1917] tabular-nums">
                          #{driverA.number}
                        </span>
                      </div>
                      <div className="heading-tc text-lg font-bold text-[#1C1917]">
                        {driverA.flag} {driverA.zhName}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-[#57534E] mt-0.5">
                        {teamA && <TeamLogo team={teamA} className="w-4 h-4" />}
                        <span>{teamA?.zhName}</span>
                        <span className="text-[#78716C] tabular-nums">
                          · {driverA.points2026} PTS
                        </span>
                      </div>
                    </div>
                  </div>
                  {teamA && (
                    <div className="hidden sm:block w-36 shrink-0">
                      <TeamCarSide team={teamA} className="w-full h-12" />
                    </div>
                  )}
                </div>

                {/* Driver B Card */}
                <div className="flex items-center justify-between gap-3 p-3.5 rounded-lg bg-[#F6F3EC]/60 border border-[#DFD9CE]">
                  <div className="flex items-center gap-3">
                    <DriverPortrait driver={driverB} team={teamB} size="lg" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#1B4332]" />
                        <span className="text-xs font-medium text-[#78716C]">車手 B</span>
                        <span className="text-xs font-bold text-[#1B4332] tabular-nums">
                          #{driverB.number}
                        </span>
                      </div>
                      <div className="heading-tc text-lg font-bold text-[#1B4332]">
                        {driverB.flag} {driverB.zhName}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-[#57534E] mt-0.5">
                        {teamB && <TeamLogo team={teamB} className="w-4 h-4" />}
                        <span>{teamB?.zhName}</span>
                        <span className="text-[#78716C] tabular-nums">
                          · {driverB.points2026} PTS
                        </span>
                      </div>
                    </div>
                  </div>
                  {teamB && (
                    <div className="hidden sm:block w-36 shrink-0">
                      <TeamCarSide team={teamB} className="w-full h-12" />
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* Summary KPI Strip (4 crisp hairline-bordered white cards with 80ms stagger) */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              {/* KPI 1: 最快單圈 */}
              <div
                style={{ animationDelay: '0ms' }}
                className="bg-white border border-[#DFD9CE] rounded-xl p-4 reveal-kpi"
              >
                <div className="text-xs text-[#78716C]">最快單圈</div>
                <div className="mt-2 space-y-1 tabular-nums">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs font-medium text-[#1C1917]">{driverA.code}</span>
                    <span className="text-xl font-bold text-[#1C1917]">{bundle.fastestLapA}</span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs font-medium text-[#1B4332]">{driverB.code}</span>
                    <span className="text-base font-semibold text-[#1B4332]">{bundle.fastestLapB}</span>
                  </div>
                </div>
              </div>

              {/* KPI 2: 理論最佳組合 */}
              <div
                style={{ animationDelay: '80ms' }}
                className="bg-white border border-[#DFD9CE] rounded-xl p-4 reveal-kpi"
              >
                <div className="text-xs text-[#78716C]">理論最佳組合 (S1 / S2 / S3)</div>
                <div className="mt-2 space-y-1 tabular-nums">
                  <div className="flex items-baseline justify-between text-[#1C1917]">
                    <span className="text-xs font-medium">{driverA.code}</span>
                    <span className="text-xl font-bold">
                      {formatLapTime(
                        parseFloat(bundle.bestS1A) +
                          parseFloat(bundle.bestS2A) +
                          parseFloat(bundle.bestS3A) -
                          0.12
                      )}
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between text-[#1B4332]">
                    <span className="text-xs font-medium">{driverB.code}</span>
                    <span className="text-base font-semibold">
                      {formatLapTime(
                        parseFloat(bundle.bestS1B) +
                          parseFloat(bundle.bestS2B) +
                          parseFloat(bundle.bestS3B) -
                          0.1
                      )}
                    </span>
                  </div>
                </div>
              </div>

              {/* KPI 3: 最高尾速 */}
              <div
                style={{ animationDelay: '160ms' }}
                className="bg-white border border-[#DFD9CE] rounded-xl p-4 reveal-kpi"
              >
                <div className="text-xs text-[#78716C]">最高尾速</div>
                <div className="mt-2 space-y-1 tabular-nums">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs font-medium text-[#1C1917]">{driverA.code}</span>
                    <span className="text-xl font-bold text-[#1C1917]">
                      {bundle.topSpeedA} <span className="text-xs font-normal text-[#78716C]">km/h</span>
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs font-medium text-[#1B4332]">{driverB.code}</span>
                    <span className="text-base font-semibold text-[#1B4332]">
                      {bundle.topSpeedB} <span className="text-xs font-normal text-[#78716C]">km/h</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* KPI 4: 進站次數 */}
              <div
                style={{ animationDelay: '240ms' }}
                className="bg-white border border-[#DFD9CE] rounded-xl p-4 reveal-kpi"
              >
                <div className="text-xs text-[#78716C]">進站次數</div>
                <div className="mt-2 space-y-1 tabular-nums">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs font-medium text-[#1C1917]">{driverA.code}</span>
                    <span className="text-xl font-bold text-[#1C1917]">
                      {bundle.pitStopsA} <span className="text-xs font-normal text-[#78716C]">次</span>
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs font-medium text-[#1B4332]">{driverB.code}</span>
                    <span className="text-base font-semibold text-[#1B4332]">
                      {bundle.pitStopsB} <span className="text-xs font-normal text-[#78716C]">次</span>
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* Focused Analytics Tabs (Progressive Disclosure) */}
            <section className="space-y-4">
              <div className="flex flex-wrap items-center gap-2 border-b border-[#DFD9CE] pb-2">
                {(
                  [
                    { id: 'telemetry', label: '遙測對比' },
                    { id: 'laps', label: '單圈與配速' },
                    { id: 'tyres', label: '輪胎與策略' },
                    { id: 'circuit', label: '賽道與區段' },
                  ] as Array<{ id: AnalyticsTab; label: string }>
                ).map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setAnalyticsTab(tab.id)}
                    className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
                      analyticsTab === tab.id
                        ? 'bg-[#1C1917] text-white'
                        : 'bg-white border border-[#DFD9CE] text-[#57534E] hover:text-[#1C1917]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div key={analyticsTab} className="tab-crossfade">
                {analyticsTab === 'telemetry' && <TelemetryChartsTab bundle={bundle} />}
                {analyticsTab === 'laps' && <LapPaceTab bundle={bundle} />}
                {analyticsTab === 'tyres' && <TyreStrategyTab bundle={bundle} />}
                {analyticsTab === 'circuit' && <CircuitSectorsTab bundle={bundle} />}
              </div>
            </section>
          </>
        )}

        {mainPage === 'schedule' && (
          <ScheduleView
            selectedGpId={gpId}
            onSelectGpForTelemetry={handleSelectGpFromSchedule}
          />
        )}

        {mainPage === 'standings' && (
          <StandingsView
            driverACode={driverACode}
            driverBCode={driverBCode}
            onAssignDriver={handleAssignDriver}
          />
        )}
        {/* Grand Prix Post-Race Media Funnel (IG & YouTube) */}
        <section className="bg-white border border-[#DFD9CE] rounded-2xl p-5 flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-[11px] font-medium text-[#9E3B33] tabular-nums">
              <span className="w-1.5 h-1.5 rounded-full bg-[#9E3B33]" />
              LOG 02 // 賽道數據室
            </div>
            <h3 className="heading-tc text-base font-bold text-[#1C1917]">
              大獎賽賽後復盤影音與數據圖卡
            </h3>
            <p className="text-xs text-[#57534E]">
              每站正賽結束後同步更新工程復盤短片與雙車手關鍵時差圖卡（搭配單圈 Delta 實測）。
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <a
              href="https://www.youtube.com/@hibossgen"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-full bg-[#1C1917] text-white text-xs font-medium hover:bg-[#1B4332] transition-colors"
            >
              YouTube 復盤短片
            </a>
            <a
              href="https://www.instagram.com/hiboss.gen/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-full bg-[#F6F3EC] border border-[#DFD9CE] hover:border-[#1C1917] text-xs font-medium text-[#1C1917] transition-colors"
            >
              Instagram 數據圖卡 (@hiboss.gen)
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#DFD9CE] py-5 mt-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-wrap items-center justify-between gap-3 text-xs text-[#78716C]">
          <span>© 2026 HIBOSS GEN. · 台灣</span>
          <div className="flex items-center gap-5">
            <a
              href="https://www.youtube.com/@hibossgen"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#1C1917] transition-colors"
            >
              YouTube
            </a>
            <a
              href="https://www.instagram.com/hiboss.gen/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#1C1917] transition-colors"
            >
              Instagram
            </a>
            <a
              href="https://bossliugen.github.io/GENWeb/"
              className="hover:text-[#1C1917] transition-colors"
            >
              總門戶
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
