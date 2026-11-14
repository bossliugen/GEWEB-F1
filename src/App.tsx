import React, { useMemo, useState } from 'react';
import { BrandLogo } from './components/BrandLogo';
import { CircuitSectorsTab } from './components/CircuitSectorsTab';
import { LapPaceTab } from './components/LapPaceTab';
import { ScheduleView } from './components/ScheduleView';
import { StandingsView } from './components/StandingsView';
import { DriverPortrait, TeamCarSide, TeamLogo } from './components/TeamAssets';
import { TelemetryChartsTab } from './components/TelemetryChartsTab';
import { TyreStrategyTab } from './components/TyreStrategyTab';
import {
  DRIVERS,
  generateSessionTelemetry,
  GRAND_PRIX_CALENDAR,
  SeasonYear,
  SessionType,
  TEAMS,
} from './data/f1Data';

type MainPage = 'telemetry' | 'schedule' | 'standings';
type AnalyticsTab = 'telemetry' | 'laps' | 'tyres' | 'circuit';

export function App() {
  const [mainPage, setMainPage] = useState<MainPage>('telemetry');
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
      {/* Calm Sticky Session Selector Bar */}
      <header className="sticky top-0 z-30 bg-[#F6F3EC]/95 backdrop-blur-sm border-b border-[#DFD9CE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3">
          {/* Left: GEN. Brand Logo + Page Switcher */}
          <div className="flex items-center gap-5">
            <button
              type="button"
              onClick={() => setMainPage('telemetry')}
              className="cursor-pointer focus:outline-none"
            >
              <BrandLogo />
            </button>

            <nav className="flex items-center gap-1 bg-white border border-[#DFD9CE] rounded-full p-1">
              {(
                [
                  { id: 'telemetry', label: '遙測分析' },
                  { id: 'schedule', label: '賽程與台灣時間' },
                  { id: 'standings', label: '積分榜與車隊' },
                ] as Array<{ id: MainPage; label: string }>
              ).map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setMainPage(item.id)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                    mainPage === item.id
                      ? 'bg-[#1C1917] text-white'
                      : 'text-[#57534E] hover:text-[#1C1917]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Right: Clean Pill Selectors for Season, GP, Session, Driver A vs Driver B */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Season Pill */}
            <select
              aria-label="賽季"
              value={season}
              onChange={(e) => setSeason(e.target.value as SeasonYear)}
              className="px-3 py-1.5 rounded-full bg-white border border-[#DFD9CE] text-xs font-medium text-[#1C1917] focus:outline-none focus:border-[#1C1917] cursor-pointer"
            >
              <option value="2026">2026 賽季</option>
              <option value="2025">2025 賽季</option>
            </select>

            {/* Grand Prix Pill */}
            <select
              aria-label="分站"
              value={gpId}
              onChange={(e) => setGpId(e.target.value)}
              className="px-3 py-1.5 rounded-full bg-white border border-[#DFD9CE] text-xs font-medium text-[#1C1917] focus:outline-none focus:border-[#1C1917] cursor-pointer max-w-[190px]"
            >
              {GRAND_PRIX_CALENDAR.map((gp) => (
                <option key={gp.id} value={gp.id}>
                  R{String(gp.round).padStart(2, '0')} · {gp.zhName}
                </option>
              ))}
            </select>

            {/* Session Pill */}
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

            {/* Driver A Pill (#1C1917) */}
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

            {/* Driver B Pill (#1B4332) */}
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
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
        {mainPage === 'telemetry' && (
          <>
            {/* Grand Prix Editorial Title & Cutout Driver/Car Comparison Strip */}
            <section className="bg-white border border-[#DFD9CE] rounded-xl p-5 sm:p-6">
              <div className="flex flex-wrap items-start justify-between gap-4 pb-5 border-b border-[#EFECE6]">
                <div>
                  <div className="text-xs text-[#78716C] tabular-nums">
                    Round {selectedGp.round} · {season} FIA Formula 1 · {selectedGp.location}
                  </div>
                  <h1 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1C1917] mt-1">
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
                      <div className="font-editorial text-lg font-bold text-[#1C1917]">
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
                      <div className="font-editorial text-lg font-bold text-[#1B4332]">
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

            {/* Summary KPI Strip (4 crisp hairline-bordered white cards) */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              {/* KPI 1: Fastest Lap */}
              <div className="bg-white border border-[#DFD9CE] rounded-xl p-4">
                <div className="text-xs text-[#78716C]">最快單圈 Fastest Lap</div>
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

              {/* KPI 2: Best Sector Splits */}
              <div className="bg-white border border-[#DFD9CE] rounded-xl p-4">
                <div className="text-xs text-[#78716C]">最佳區段 S1 / S2 / S3</div>
                <div className="mt-2 space-y-1.5 text-xs tabular-nums">
                  <div className="flex items-center justify-between text-[#1C1917] font-semibold">
                    <span>{driverA.code}</span>
                    <span>
                      {bundle.bestS1A} · {bundle.bestS2A} · {bundle.bestS3A}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[#1B4332] font-semibold">
                    <span>{driverB.code}</span>
                    <span>
                      {bundle.bestS1B} · {bundle.bestS2B} · {bundle.bestS3B}
                    </span>
                  </div>
                </div>
              </div>

              {/* KPI 3: Top Speed */}
              <div className="bg-white border border-[#DFD9CE] rounded-xl p-4">
                <div className="text-xs text-[#78716C]">最高極速 Top Speed</div>
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

              {/* KPI 4: Pit Stop Count */}
              <div className="bg-white border border-[#DFD9CE] rounded-xl p-4">
                <div className="text-xs text-[#78716C]">進站次數 Pit Stops</div>
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

              {analyticsTab === 'telemetry' && <TelemetryChartsTab bundle={bundle} />}
              {analyticsTab === 'laps' && <LapPaceTab bundle={bundle} />}
              {analyticsTab === 'tyres' && <TyreStrategyTab bundle={bundle} />}
              {analyticsTab === 'circuit' && <CircuitSectorsTab bundle={bundle} />}
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
      </main>

      <footer className="border-t border-[#DFD9CE] py-5 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-wrap items-center justify-between gap-2 text-xs text-[#78716C]">
          <span>GEN. Formula 1 Race Data & Telemetry · 台灣時間 (UTC+8)</span>
          <span>GitHub Pages Ready · bossliugen / GEWEB F1</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
