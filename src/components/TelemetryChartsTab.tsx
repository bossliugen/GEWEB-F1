import React, { useState } from 'react';
import { SessionTelemetryBundle } from '../data/f1Data';

interface Props {
  bundle: SessionTelemetryBundle;
}

export const TelemetryChartsTab: React.FC<Props> = ({ bundle }) => {
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const pts = bundle.telemetry;
  const maxDist = pts[pts.length - 1]?.distanceM || 5000;

  const activePt = hoverIdx !== null ? pts[hoverIdx] : pts[Math.floor(pts.length * 0.42)];

  const renderChart = (
    title: string,
    unit: string,
    height: number,
    minVal: number,
    maxVal: number,
    getA: (p: (typeof pts)[0]) => number,
    getB: (p: (typeof pts)[0]) => number,
    zeroLine?: boolean
  ) => {
    const w = 880;
    const padL = 44;
    const padR = 16;
    const padT = 14;
    const padB = 22;
    const plotW = w - padL - padR;
    const plotH = height - padT - padB;

    const toX = (idx: number) => padL + (idx / (pts.length - 1)) * plotW;
    const toY = (val: number) => {
      const clamped = Math.max(minVal, Math.min(maxVal, val));
      return padT + plotH - ((clamped - minVal) / (maxVal - minVal || 1)) * plotH;
    };

    const pathA = pts
      .map((p, i) => `${i === 0 ? 'M' : 'L'} ${toX(i).toFixed(1)} ${toY(getA(p)).toFixed(1)}`)
      .join(' ');
    const pathB = pts
      .map((p, i) => `${i === 0 ? 'M' : 'L'} ${toX(i).toFixed(1)} ${toY(getB(p)).toFixed(1)}`)
      .join(' ');

    const ticks = [minVal, (minVal + maxVal) / 2, maxVal];

    return (
      <div className="bg-white border border-[#DFD9CE] rounded-xl p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-baseline gap-2">
            <h3 className="text-sm font-semibold text-[#1C1917]">{title}</h3>
            <span className="text-xs text-[#78716C]">{unit}</span>
          </div>
          <div className="flex items-center gap-4 text-xs tabular-nums">
            <span className="flex items-center gap-1.5 text-[#1C1917] font-medium">
              <span className="w-2.5 h-0.5 bg-[#1C1917] inline-block" />
              {bundle.driverA.code}: {getA(activePt)} {unit}
            </span>
            <span className="flex items-center gap-1.5 text-[#1B4332] font-medium">
              <span className="w-2.5 h-0.5 bg-[#1B4332] inline-block" />
              {bundle.driverB.code}: {getB(activePt)} {unit}
            </span>
            <span className="text-[#78716C] hidden sm:inline">
              距離 {activePt.distanceM} m
            </span>
          </div>
        </div>

        <svg
          viewBox={`0 0 ${w} ${height}`}
          className="w-full h-auto overflow-visible select-none cursor-crosshair"
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const relX = ((e.clientX - rect.left) / rect.width) * w;
            const ratio = Math.max(0, Math.min(1, (relX - padL) / plotW));
            setHoverIdx(Math.round(ratio * (pts.length - 1)));
          }}
          onMouseLeave={() => setHoverIdx(null)}
        >
          {/* Gridlines */}
          {ticks.map((t, idx) => {
            const y = toY(t);
            return (
              <g key={idx}>
                <line
                  x1={padL}
                  y1={y}
                  x2={w - padR}
                  y2={y}
                  stroke="#EFECE6"
                  strokeWidth="1"
                />
                <text
                  x={padL - 8}
                  y={y + 3.5}
                  textAnchor="end"
                  className="fill-[#78716C] text-[10px] tabular-nums"
                >
                  {Number.isInteger(t) ? t : t.toFixed(2)}
                </text>
              </g>
            );
          })}

          {zeroLine && (
            <line
              x1={padL}
              y1={toY(0)}
              x2={w - padR}
              y2={toY(0)}
              stroke="#DFD9CE"
              strokeWidth="1.2"
              strokeDasharray="4 4"
            />
          )}

          {/* Distance Axis Labels */}
          {[0, 0.25, 0.5, 0.75, 1].map((r) => (
            <text
              key={r}
              x={padL + r * plotW}
              y={height - 4}
              textAnchor="middle"
              className="fill-[#78716C] text-[10px] tabular-nums"
            >
              {Math.round(r * maxDist)}m
            </text>
          ))}

          {/* Driver B Trace */}
          <path
            d={pathB}
            fill="none"
            stroke="#1B4332"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.88"
          />

          {/* Driver A Trace */}
          <path
            d={pathA}
            fill="none"
            stroke="#1C1917"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Synchronized Crosshair */}
          {hoverIdx !== null && (
            <g>
              <line
                x1={toX(hoverIdx)}
                y1={padT}
                x2={toX(hoverIdx)}
                y2={height - padB}
                stroke="#A8A29E"
                strokeWidth="1"
                strokeDasharray="3 3"
              />
              <circle
                cx={toX(hoverIdx)}
                cy={toY(getB(pts[hoverIdx]))}
                r="3.5"
                fill="#1B4332"
                stroke="#FFFFFF"
                strokeWidth="1.5"
              />
              <circle
                cx={toX(hoverIdx)}
                cy={toY(getA(pts[hoverIdx]))}
                r="3.5"
                fill="#1C1917"
                stroke="#FFFFFF"
                strokeWidth="1.5"
              />
            </g>
          )}
        </svg>
      </div>
    );
  };

  const deltaMin = Math.min(-0.35, ...pts.map((p) => p.deltaSec));
  const deltaMax = Math.max(0.35, ...pts.map((p) => p.deltaSec));

  return (
    <div className="space-y-4 animate-fade-up">
      <div className="flex flex-wrap items-center justify-between gap-2 px-1 text-xs text-[#57534E]">
        <span>移動滑鼠至任一圖表可同步檢視距離點遙測數據與彎道時間差。</span>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 font-medium text-[#1C1917]">
            <span className="w-3 h-0.5 bg-[#1C1917] inline-block" />
            {bundle.driverA.zhName} ({bundle.driverA.code})
          </span>
          <span className="flex items-center gap-1.5 font-medium text-[#1B4332]">
            <span className="w-3 h-0.5 bg-[#1B4332] inline-block" />
            {bundle.driverB.zhName} ({bundle.driverB.code})
          </span>
        </div>
      </div>

      {renderChart(
        '速度曲線 Speed',
        'km/h',
        175,
        60,
        bundle.gp.topSpeedKmh + 15,
        (p) => p.speedA,
        (p) => p.speedB
      )}

      {renderChart(
        '逐彎時間差 Delta (正值代表車手 A 領先)',
        's',
        135,
        Number(deltaMin.toFixed(2)),
        Number(deltaMax.toFixed(2)),
        (p) => p.deltaSec,
        () => 0,
        true
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {renderChart(
          '油門開度 Throttle',
          '%',
          135,
          0,
          100,
          (p) => p.throttleA,
          (p) => p.throttleB
        )}
        {renderChart(
          '煞車壓力 Brake',
          '%',
          135,
          0,
          100,
          (p) => p.brakeA,
          (p) => p.brakeB
        )}
      </div>

      {renderChart(
        '檔位變化 Gear (1–8 檔) & DRS 狀態',
        '檔',
        125,
        1,
        8,
        (p) => p.gearA,
        (p) => p.gearB
      )}
    </div>
  );
};
