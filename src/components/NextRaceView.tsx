import React, { useEffect, useMemo, useState } from 'react';
import { CalendarPlus, Clock, Download, Flag, MapPin, Search } from 'lucide-react';
import { CIRCUIT_STORIES } from '../data/circuitStories';
import { DRIVERS, GRAND_PRIX_CALENDAR, TEAMS } from '../data/f1Data';
import { buildGoogleCalendarUrl, downloadIcsEvent } from '../utils/calendar';
import { ScrollReveal } from './ScrollReveal';
import { DriverPortrait, TeamCarSide, TeamLogo } from './TeamAssets';

interface Props {
  onOpenTelemetryForLatest: () => void;
  onAssignDriverToTelemetry: (slot: 'A' | 'B', code: string) => void;
}

export const NextRaceView: React.FC<Props> = ({
  onOpenTelemetryForLatest,
  onAssignDriverToTelemetry,
}) => {
  const upcomingRaces = useMemo(
    () => GRAND_PRIX_CALENDAR.filter((g) => g.status === 'upcoming'),
    []
  );

  const [selectedUpcomingId, setSelectedUpcomingId] = useState<string>(
    upcomingRaces[0]?.id ?? 'las'
  );
  const [searchQuery, setSearchQuery] = useState('');

  const nextGp = useMemo(
    () => upcomingRaces.find((g) => g.id === selectedUpcomingId) ?? upcomingRaces[0],
    [upcomingRaces, selectedUpcomingId]
  );

  const storyMeta = CIRCUIT_STORIES[nextGp.id];

  // Live countdown to Taiwan race start
  const [countdown, setCountdown] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetIso = storyMeta?.isoRaceStart ?? `${nextGp.date}T12:00:00+08:00`;
    const update = () => {
      const diff = Math.max(0, new Date(targetIso).getTime() - Date.now());
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      setCountdown({ days, hours, minutes, seconds });
    };
    update();
    const id = window.setInterval(update, 1000);
    return () => window.clearInterval(id);
  }, [nextGp.date, storyMeta?.isoRaceStart]);

  const filteredTeams = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return TEAMS.map((team) => {
      const teamDrivers = DRIVERS.filter((d) => d.teamId === team.id);
      if (!q) return { team, drivers: teamDrivers };
      const teamMatch =
        team.zhName.toLowerCase().includes(q) || team.name.toLowerCase().includes(q);
      const matchingDrivers = teamDrivers.filter(
        (d) =>
          d.zhName.toLowerCase().includes(q) ||
          d.name.toLowerCase().includes(q) ||
          d.code.toLowerCase().includes(q) ||
          String(d.number).includes(q)
      );
      if (teamMatch) return { team, drivers: teamDrivers };
      if (matchingDrivers.length > 0) return { team, drivers: matchingDrivers };
      return null;
    }).filter(Boolean) as Array<{ team: (typeof TEAMS)[0]; drivers: typeof DRIVERS }>;
  }, [searchQuery]);

  return (
    <div className="space-y-6 tab-crossfade">
      {/* Upcoming Race Switcher Pills */}
      <div className="flex flex-wrap items-center justify-between gap-3 reveal-initial">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium text-[#78716C]">即將開賽分站：</span>
          {upcomingRaces.map((gp) => (
            <button
              key={gp.id}
              type="button"
              onClick={() => setSelectedUpcomingId(gp.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition-colors cursor-pointer ${
                nextGp.id === gp.id
                  ? 'bg-[#1B4332] text-white border-[#1B4332]'
                  : 'bg-white text-[#57534E] border-[#DFD9CE] hover:border-[#1C1917]'
              }`}
            >
              R{gp.round} · {gp.flag} {gp.zhName}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={onOpenTelemetryForLatest}
          className="text-xs font-medium text-[#1C1917] underline underline-offset-4 hover:text-[#1B4332] cursor-pointer"
        >
          查看上一站（聖保羅站）已完賽遙測數據 →
        </button>
      </div>

      {/* Hero Card: Next Race Details, Countdown, Calendar Buttons & Circuit Story */}
      <section className="bg-white border border-[#DFD9CE] rounded-xl p-5 sm:p-7 reveal-initial">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: Title, Taiwan Times, Add to Calendar, Story */}
          <div className="lg:col-span-7 space-y-5">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#1B4332]/10 text-[#1B4332] text-xs font-medium mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1B4332]" />
                下一場比賽 · Round {nextGp.round} · 尚未開賽
              </div>
              <h1 className="heading-tc text-2xl sm:text-3xl font-bold text-[#1C1917]">
                {nextGp.flag} {nextGp.zhName}
              </h1>
              <p className="text-sm text-[#57534E] mt-1 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#78716C] shrink-0" />
                <span>
                  {nextGp.location} · {nextGp.zhCircuitName} ({nextGp.circuitName})
                </span>
              </p>
            </div>

            {/* Countdown + Taiwan Schedule Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-[#F6F3EC] border border-[#DFD9CE]">
                <div className="text-xs text-[#78716C] mb-1.5 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  距離正賽燈滅起跑
                </div>
                <div className="flex items-baseline gap-3 tabular-nums text-[#1C1917]">
                  <div>
                    <span className="text-2xl font-bold">{countdown.days}</span>
                    <span className="text-xs text-[#78716C] ml-0.5">天</span>
                  </div>
                  <div>
                    <span className="text-2xl font-bold">
                      {String(countdown.hours).padStart(2, '0')}
                    </span>
                    <span className="text-xs text-[#78716C] ml-0.5">時</span>
                  </div>
                  <div>
                    <span className="text-2xl font-bold">
                      {String(countdown.minutes).padStart(2, '0')}
                    </span>
                    <span className="text-xs text-[#78716C] ml-0.5">分</span>
                  </div>
                  <div>
                    <span className="text-2xl font-bold text-[#1B4332]">
                      {String(countdown.seconds).padStart(2, '0')}
                    </span>
                    <span className="text-xs text-[#78716C] ml-0.5">秒</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#F6F3EC] border border-[#DFD9CE] space-y-1.5 text-xs tabular-nums">
                <div className="flex items-center justify-between text-[#57534E]">
                  <span>台灣排位賽時間</span>
                  <span className="font-semibold text-[#1C1917]">{nextGp.taiwanQualiTime}</span>
                </div>
                <div className="flex items-center justify-between text-[#1C1917]">
                  <span className="font-medium">台灣正賽時間 (UTC+8)</span>
                  <span className="font-bold text-[#1B4332]">{nextGp.taiwanRaceTime}</span>
                </div>
                <div className="flex items-center justify-between text-[#57534E]">
                  <span>比賽圈數 / 單圈長度</span>
                  <span className="font-medium text-[#1C1917]">
                    {nextGp.laps} 圈 · {nextGp.lengthKm} km
                  </span>
                </div>
              </div>
            </div>

            {/* Add to Calendar Actions */}
            <div className="flex flex-wrap items-center gap-2.5">
              <a
                href={buildGoogleCalendarUrl(nextGp, 'race')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#1C1917] text-white text-xs font-medium hover:bg-[#1B4332] transition-colors"
              >
                <CalendarPlus className="w-3.5 h-3.5" />
                加入 Google 行事曆 (正賽)
              </a>

              <a
                href={buildGoogleCalendarUrl(nextGp, 'quali')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white border border-[#DFD9CE] hover:border-[#1C1917] text-xs font-medium text-[#1C1917] transition-colors"
              >
                <CalendarPlus className="w-3.5 h-3.5" />
                加入 Google 行事曆 (排位賽)
              </a>

              <button
                type="button"
                onClick={() => downloadIcsEvent(nextGp, 'race')}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#F6F3EC] border border-[#DFD9CE] hover:border-[#1C1917] text-xs font-medium text-[#1C1917] transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                下載 .ics 行事曆 (Apple / Outlook)
              </button>
            </div>

            {/* Circuit Story */}
            {storyMeta && (
              <div className="pt-4 border-t border-[#EFECE6] space-y-2">
                <h2 className="heading-tc text-base font-bold text-[#1C1917]">
                  賽道故事與比賽看點
                </h2>
                <p className="text-sm text-[#44403C] leading-relaxed">{storyMeta.story}</p>
                <div className="text-xs text-[#1B4332] font-medium pt-1">
                  關鍵特性：{storyMeta.characteristics}
                </div>
              </div>
            )}
          </div>

          {/* Right: 2D SVG Circuit Map & Specs */}
          <div className="lg:col-span-5 bg-[#F6F3EC]/70 border border-[#DFD9CE] rounded-xl p-5 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-[#57534E] mb-2">
              <span className="font-medium text-[#1C1917]">2D 賽道平面圖</span>
              <span className="tabular-nums">
                {nextGp.corners} 彎道 · {nextGp.drsZones} DRS 區
              </span>
            </div>

            <svg viewBox="0 0 500 300" className="w-full h-auto my-2 select-none">
              <path
                d={nextGp.svgPath}
                fill="none"
                stroke="#DFD9CE"
                strokeWidth="14"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d={nextGp.svgPath}
                fill="none"
                stroke="#1C1917"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle
                cx={nextGp.startFinish.x}
                cy={nextGp.startFinish.y}
                r="6"
                fill="#1B4332"
                stroke="#FFFFFF"
                strokeWidth="2"
              />
              <text
                x={nextGp.startFinish.x}
                y={nextGp.startFinish.y + 20}
                textAnchor="middle"
                className="fill-[#57534E] text-[11px] font-medium"
              >
                起終點線
              </text>
            </svg>

            <div className="grid grid-cols-3 gap-2 pt-3 border-t border-[#DFD9CE] text-center tabular-nums">
              <div>
                <div className="text-[11px] text-[#78716C]">正賽圈數</div>
                <div className="text-base font-bold text-[#1C1917]">{nextGp.laps} 圈</div>
              </div>
              <div>
                <div className="text-[11px] text-[#78716C]">單圈長度</div>
                <div className="text-base font-bold text-[#1C1917]">{nextGp.lengthKm} km</div>
              </div>
              <div>
                <div className="text-[11px] text-[#78716C]">參考極速</div>
                <div className="text-base font-bold text-[#1C1917]">{nextGp.topSpeedKmh} km/h</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Full Entry List: All Teams & All Drivers */}
      <ScrollReveal>
        <section className="space-y-4">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="heading-tc text-xl font-bold text-[#1C1917] flex items-center gap-2">
                <Flag className="w-5 h-5 text-[#1B4332]" />
                下一場比賽出賽車手與車隊完整名單
              </h2>
              <p className="text-xs text-[#57534E] mt-1">
                一次瀏覽全場 11 支車隊與出賽車手（完全去背頭像、車隊 LOGO 與 2026 賽車）
              </p>
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 text-[#78716C] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜尋車手、車號或車隊..."
                className="w-full pl-8 pr-3 py-1.5 rounded-full bg-white border border-[#DFD9CE] text-xs text-[#1C1917] placeholder:text-[#78716C] focus:outline-none focus:border-[#1C1917]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTeams.map(({ team, drivers }) => (
              <div
                key={team.id}
                className="bg-white border border-[#DFD9CE] rounded-xl p-4 sm:p-5 flex flex-col justify-between gap-4"
              >
                {/* Team Header + Cutout Car */}
                <div className="flex items-center justify-between gap-3 pb-3 border-b border-[#EFECE6]">
                  <div className="flex items-center gap-3">
                    <TeamLogo team={team} className="w-9 h-9 shrink-0" />
                    <div>
                      <div className="font-semibold text-sm text-[#1C1917]">
                        {team.zhName}{' '}
                        <span className="text-xs font-normal text-[#78716C]">{team.name}</span>
                      </div>
                      <div className="text-[11px] text-[#78716C] tabular-nums">
                        車隊第 {team.rank2026} 名 · {team.points2026} PTS · {team.powerUnit}
                      </div>
                    </div>
                  </div>

                  <div className="w-32 shrink-0 hidden sm:block">
                    <TeamCarSide team={team} className="w-full h-11" />
                  </div>
                </div>

                {/* Team Drivers */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {drivers.map((driver) => (
                    <div
                      key={driver.id}
                      className="flex items-center justify-between gap-2 p-2.5 rounded-lg bg-[#F6F3EC]/70 border border-[#DFD9CE]"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <DriverPortrait driver={driver} team={team} size="md" />
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[11px] font-bold text-[#1C1917] tabular-nums">
                              #{driver.number}
                            </span>
                            <span className="text-xs font-semibold text-[#1C1917] truncate">
                              {driver.flag} {driver.zhName}
                            </span>
                          </div>
                          <div className="text-[11px] text-[#78716C] truncate">{driver.code}</div>
                          <div className="text-[11px] font-medium text-[#1B4332] tabular-nums mt-0.5">
                            第 {driver.rank2026} 名 · {driver.points2026} PTS
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-1 shrink-0">
                        <button
                          type="button"
                          onClick={() => onAssignDriverToTelemetry('A', driver.code)}
                          className="px-2 py-0.5 rounded text-[10px] font-medium border border-[#DFD9CE] bg-white hover:border-[#1C1917] text-[#1C1917] cursor-pointer"
                          title="設為遙測對比車手 A"
                        >
                          比對 A
                        </button>
                        <button
                          type="button"
                          onClick={() => onAssignDriverToTelemetry('B', driver.code)}
                          className="px-2 py-0.5 rounded text-[10px] font-medium border border-[#DFD9CE] bg-white hover:border-[#1B4332] text-[#1B4332] cursor-pointer"
                          title="設為遙測對比車手 B"
                        >
                          比對 B
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
};
