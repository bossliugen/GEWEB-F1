import React, { useState } from 'react';
import { formatLapTime, SessionTelemetryBundle } from '../data/f1Data';

interface Props {
  bundle: SessionTelemetryBundle;
}

export const LapPaceTab: React.FC<Props> = ({ bundle }) => {
  const [fuelCorrected, setFuelCorrected] = useState(false);
  const [hoveredLap, setHoveredLap] = useState<number | null>(null);

  const laps = bundle.laps;
  const timesA = laps.map((l) => (fuelCorrected ? l.fuelCorrectedA : l.timeA) ?? 0);
  const timesB = laps.map((l) => (fuelCorrected ? l.fuelCorrectedB : l.timeB) ?? 0);

  const allValid = [...timesA, ...timesB].filter((t) => t > 0);
  const minT = Math.floor((Math.min(...allValid) - 0.5) * 10) / 10;
  const maxT = Math.ceil((Math.max(...allValid) + 0.5) * 10) / 10;

  const w = 880;
  const h = 280;
  const padL = 56;
  const padR = 20;
  const padT = 18;
  const padB = 30;
  const plotW = w - padL - padR;
  const plotH = h - padT - padB;

  const toX = (lap: number) =>
    padL + ((lap - 1) / Math.max(1, laps.length - 1)) * plotW;
  const toY = (sec: number) =>
    padT + plotH - ((sec - minT) / (maxT - minT || 1)) * plotH;

  const pathA = laps
    .map((l, i) => {
      const val = fuelCorrected ? l.fuelCorrectedA : l.timeA;
      return val ? `${i === 0 ? 'M' : 'L'} ${toX(l.lap).toFixed(1)} ${toY(val).toFixed(1)}` : '';
    })
    .join(' ');

  const pathB = laps
    .map((l, i) => {
      const val = fuelCorrected ? l.fuelCorrectedB : l.timeB;
      return val ? `${i === 0 ? 'M' : 'L'} ${toX(l.lap).toFixed(1)} ${toY(val).toFixed(1)}` : '';
    })
    .join(' ');

  const activeLap =
    hoveredLap !== null
      ? laps.find((l) => l.lap === hoveredLap) ?? laps[0]
      : laps[Math.floor(laps.length / 2)];

  const yTicks = [minT, (minT + maxT) / 2, maxT];

  return (
    <div className="space-y-4 animate-fade-up">
      <div className="bg-white border border-[#DFD9CE] rounded-xl p-5">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="text-base font-semibold text-[#1C1917]">
              單圈時間分佈與配速趨勢
            </h3>
            <p className="text-xs text-[#78716C] mt-0.5">
              進站圈已標記於軸線；可切換燃油修正模式以觀察純輪胎與車手節奏
            </p>
          </div>

          <button
            type="button"
            onClick={() => setFuelCorrected((v) => !v)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition-colors cursor-pointer ${
              fuelCorrected
                ? 'bg-[#1C1917] text-white border-[#1C1917]'
                : 'bg-[#F6F3EC] text-[#1C1917] border-[#DFD9CE] hover:border-[#1C1917]'
            }`}
          >
            {fuelCorrected ? '✓ 燃油修正配速：開啟' : '燃油修正配速：關閉'}
          </button>
        </div>

        {/* Active Tooltip Summary Strip */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3 px-3 py-2 bg-[#F6F3EC] rounded-lg border border-[#DFD9CE] text-xs tabular-nums">
          <span className="font-medium text-[#1C1917]">
            第 {activeLap.lap} 圈
          </span>
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-[#1C1917]">
              <strong className="font-semibold">{bundle.driverA.code}</strong>:{' '}
              {formatLapTime(
                (fuelCorrected ? activeLap.fuelCorrectedA : activeLap.timeA) ?? 0
              )}{' '}
              <span className="text-[#78716C]">({activeLap.compoundA})</span>
              {activeLap.pitA && (
                <span className="ml-1.5 px-1.5 py-0.5 bg-[#DFD9CE] text-[#1C1917] rounded text-[10px]">
                  PIT
                </span>
              )}
            </span>
            <span className="text-[#1B4332]">
              <strong className="font-semibold">{bundle.driverB.code}</strong>:{' '}
              {formatLapTime(
                (fuelCorrected ? activeLap.fuelCorrectedB : activeLap.timeB) ?? 0
              )}{' '}
              <span className="text-[#78716C]">({activeLap.compoundB})</span>
              {activeLap.pitB && (
                <span className="ml-1.5 px-1.5 py-0.5 bg-[#DFD9CE] text-[#1B4332] rounded text-[10px]">
                  PIT
                </span>
              )}
            </span>
          </div>
        </div>

        <svg
          viewBox={`0 0 ${w} ${h}`}
          className="w-full h-auto overflow-visible select-none cursor-crosshair"
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const relX = ((e.clientX - rect.left) / rect.width) * w;
            const ratio = Math.max(0, Math.min(1, (relX - padL) / plotW));
            const idx = Math.round(ratio * (laps.length - 1));
            setHoveredLap(laps[idx]?.lap ?? 1);
          }}
          onMouseLeave={() => setHoveredLap(null)}
        >
          {yTicks.map((t, idx) => (
            <g key={idx}>
              <line
                x1={padL}
                y1={toY(t)}
                x2={w - padR}
                y2={toY(t)}
                stroke="#EFECE6"
                strokeWidth="1"
              />
              <text
                x={padL - 8}
                y={toY(t) + 3.5}
                textAnchor="end"
                className="fill-[#78716C] text-[10px] tabular-nums"
              >
                {formatLapTime(t)}
              </text>
            </g>
          ))}

          {/* X-axis lap ticks */}
          {laps
            .filter((l) => l.lap === 1 || l.lap % 10 === 0 || l.lap === laps.length)
            .map((l) => (
              <text
                key={l.lap}
                x={toX(l.lap)}
                y={h - 6}
                textAnchor="middle"
                className="fill-[#78716C] text-[10px] tabular-nums"
              >
                L{l.lap}
              </text>
            ))}

          {/* Driver B Line + Dots */}
          <path d={pathB} fill="none" stroke="#1B4332" strokeWidth="1.6" opacity="0.85" />
          {laps.map((l) => {
            const val = fuelCorrected ? l.fuelCorrectedB : l.timeB;
            if (!val) return null;
            return (
              <circle
                key={`b-${l.lap}`}
                cx={toX(l.lap)}
                cy={toY(val)}
                r={l.pitB ? 4 : 2.3}
                fill={l.pitB ? '#FFFFFF' : '#1B4332'}
                stroke="#1B4332"
                strokeWidth={l.pitB ? 1.8 : 0}
              />
            );
          })}

          {/* Driver A Line + Dots */}
          <path d={pathA} fill="none" stroke="#1C1917" strokeWidth="1.8" />
          {laps.map((l) => {
            const val = fuelCorrected ? l.fuelCorrectedA : l.timeA;
            if (!val) return null;
            return (
              <circle
                key={`a-${l.lap}`}
                cx={toX(l.lap)}
                cy={toY(val)}
                r={l.pitA ? 4 : 2.3}
                fill={l.pitA ? '#FFFFFF' : '#1C1917'}
                stroke="#1C1917"
                strokeWidth={l.pitA ? 1.8 : 0}
              />
            );
          })}

          {hoveredLap !== null && (
            <line
              x1={toX(hoveredLap)}
              y1={padT}
              x2={toX(hoveredLap)}
              y2={h - padB}
              stroke="#A8A29E"
              strokeWidth="1"
              strokeDasharray="3 3"
            />
          )}
        </svg>
      </div>
    </div>
  );
};
