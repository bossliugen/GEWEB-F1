import React, { useState } from 'react';
import { Calendar, CalendarPlus, Clock, Download, Flag, MapPin, ArrowUpRight } from 'lucide-react';
import { CIRCUIT_STORIES } from '../data/circuitStories';
import { GRAND_PRIX_CALENDAR, GrandPrixInfo } from '../data/f1Data';
import { buildGoogleCalendarUrl, downloadIcsEvent } from '../utils/calendar';

interface Props {
  selectedGpId: string;
  onSelectGpForTelemetry: (gpId: string) => void;
}

type FilterMode = 'all' | 'upcoming' | 'completed' | 'sprint';

export const ScheduleView: React.FC<Props> = ({
  selectedGpId,
  onSelectGpForTelemetry,
}) => {
  const [filter, setFilter] = useState<FilterMode>('all');

  const filtered = GRAND_PRIX_CALENDAR.filter((gp) => {
    if (filter === 'upcoming') return gp.status === 'upcoming';
    if (filter === 'completed') return gp.status === 'completed';
    if (filter === 'sprint') return gp.isSprint;
    return true;
  });

  return (
    <div className="space-y-5 animate-fade-up">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="heading-tc text-2xl font-bold text-[#1C1917]">
            2026 F1 賽程表與台灣比賽時段
          </h2>
          <p className="text-sm text-[#57534E] mt-1">
            全賽季 24 站完整賽程，所有開賽時間已換算為台灣時間 (UTC+8)，含排位賽、衝刺賽與正賽圈數資訊。
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 bg-white border border-[#DFD9CE] rounded-full p-1">
          {(
            [
              { id: 'all', label: '全部 24 站' },
              { id: 'upcoming', label: '即將開賽 (3)' },
              { id: 'completed', label: '已完賽 (21)' },
              { id: 'sprint', label: '衝刺賽週 (6)' },
            ] as Array<{ id: FilterMode; label: string }>
          ).map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setFilter(item.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                filter === item.id
                  ? 'bg-[#1C1917] text-white'
                  : 'text-[#57534E] hover:text-[#1C1917]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((gp: GrandPrixInfo) => {
          const isSelected = gp.id === selectedGpId;
          const isUpcoming = gp.status === 'upcoming';
          return (
            <div
              key={gp.id}
              className={`bg-white rounded-xl border p-5 flex flex-col justify-between transition-colors ${
                isSelected
                  ? 'border-[#1C1917]'
                  : 'border-[#DFD9CE] hover:border-[#A8A29E]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-[#F6F3EC] border border-[#DFD9CE] text-[#1C1917] tabular-nums">
                      R{String(gp.round).padStart(2, '0')}
                    </span>
                    {gp.isSprint && (
                      <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-[#1B4332]/10 text-[#1B4332] border border-[#1B4332]/20">
                        Sprint 衝刺賽
                      </span>
                    )}
                  </div>
                  <span
                    className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${
                      isUpcoming
                        ? 'bg-[#1B4332] text-white'
                        : 'bg-[#F6F3EC] text-[#78716C] border border-[#DFD9CE]'
                    }`}
                  >
                    {isUpcoming ? '即將開賽' : '已完賽'}
                  </span>
                </div>

                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="heading-tc text-lg font-bold text-[#1C1917] leading-snug">
                      {gp.flag} {gp.zhName}
                    </h3>
                    <div className="text-xs text-[#57534E] mt-1 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 shrink-0 text-[#78716C]" />
                      <span>
                        {gp.location} · {gp.zhCircuitName}
                      </span>
                    </div>
                  </div>

                  {/* Mini 2D SVG Circuit Preview */}
                  <svg
                    viewBox="0 0 500 300"
                    className="w-20 h-14 shrink-0 opacity-85"
                    aria-label={gp.circuitName}
                  >
                    <path
                      d={gp.svgPath}
                      fill="none"
                      stroke={isUpcoming ? '#1B4332' : '#1C1917'}
                      strokeWidth="12"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                {/* Circuit Story Snippet */}
                {CIRCUIT_STORIES[gp.id] && (
                  <p className="mt-3 pt-3 border-t border-[#EFECE6] text-xs text-[#57534E] leading-relaxed line-clamp-3">
                    {CIRCUIT_STORIES[gp.id].story}
                  </p>
                )}

                {/* Circuit & Taiwan Time Details */}
                <div className="mt-4 pt-3 border-t border-[#EFECE6] space-y-1.5 text-xs tabular-nums">
                  <div className="flex items-center justify-between text-[#57534E]">
                    <span className="flex items-center gap-1.5">
                      <Flag className="w-3.5 h-3.5 text-[#78716C]" />
                      正賽圈數 / 單圈長度
                    </span>
                    <span className="font-medium text-[#1C1917]">
                      {gp.laps} 圈 · {gp.lengthKm} km
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[#57534E]">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#78716C]" />
                      台灣排位賽時間
                    </span>
                    <span className="font-medium text-[#1C1917]">{gp.taiwanQualiTime}</span>
                  </div>
                  {gp.taiwanSprintTime && (
                    <div className="flex items-center justify-between text-[#57534E]">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#1B4332]" />
                        台灣衝刺賽時間
                      </span>
                      <span className="font-medium text-[#1B4332]">{gp.taiwanSprintTime}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between text-[#1C1917]">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Clock className="w-3.5 h-3.5 text-[#1C1917]" />
                      台灣正賽時間 (UTC+8)
                    </span>
                    <span className="font-semibold">{gp.taiwanRaceTime}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#EFECE6] flex flex-wrap items-center justify-between gap-2">
                {gp.status === 'completed' ? (
                  <>
                    <div className="text-xs text-[#57534E] tabular-nums">
                      冠軍：<strong className="text-[#1C1917]">{gp.winnerCode}</strong>{' '}
                      <span className="text-[#78716C]">({gp.winnerTeam})</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => onSelectGpForTelemetry(gp.id)}
                      className="inline-flex items-center gap-1 text-xs font-medium text-[#1C1917] hover:text-[#1B4332] cursor-pointer transition-colors"
                    >
                      查看遙測
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </>
                ) : (
                  <div className="flex flex-wrap items-center justify-between gap-2 w-full">
                    <a
                      href={buildGoogleCalendarUrl(gp, 'race')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-medium text-[#1B4332] hover:underline"
                    >
                      <CalendarPlus className="w-3.5 h-3.5" />
                      Google 行事曆
                    </a>
                    <button
                      type="button"
                      onClick={() => downloadIcsEvent(gp, 'race')}
                      className="inline-flex items-center gap-1 text-xs font-medium text-[#1C1917] hover:text-[#1B4332] cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      下載 .ics
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
