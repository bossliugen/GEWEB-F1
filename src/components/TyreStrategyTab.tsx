import React from 'react';
import { formatLapTime, SessionTelemetryBundle, TyreCompound, TyreStint } from '../data/f1Data';
import { ScrollReveal } from './ScrollReveal';

interface Props {
  bundle: SessionTelemetryBundle;
}

const COMPOUND_STYLE: Record<
  TyreCompound,
  { bg: string; border: string; text: string; bar: string; label: string }
> = {
  Soft: {
    bg: 'bg-[#F8EAE8]',
    border: 'border-[#D9B6B2]',
    text: 'text-[#8C352E]',
    bar: '#A64B42',
    label: 'Soft 軟胎',
  },
  Medium: {
    bg: 'bg-[#F7F1E1]',
    border: 'border-[#DFCFA4]',
    text: 'text-[#85621E]',
    bar: '#B38B3A',
    label: 'Medium 中性胎',
  },
  Hard: {
    bg: 'bg-[#F0EFEA]',
    border: 'border-[#D4D1C7]',
    text: 'text-[#44403C]',
    bar: '#78716C',
    label: 'Hard 硬胎',
  },
};

export const TyreStrategyTab: React.FC<Props> = ({ bundle }) => {
  const totalLaps = bundle.laps.length;

  const renderStintRow = (
    driverCode: string,
    driverName: string,
    colorHex: string,
    stints: TyreStint[]
  ) => (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs">
        <span className="font-semibold flex items-center gap-2" style={{ color: colorHex }}>
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: colorHex }} />
          {driverName} ({driverCode})
        </span>
        <span className="text-[#78716C] tabular-nums">
          共 {stints.length} 段 ({totalLaps} 圈)
        </span>
      </div>

      <div className="flex w-full h-9 rounded-lg overflow-hidden border border-[#DFD9CE] bg-[#F6F3EC]">
        {stints.map((stint, idx) => {
          const stintLaps = stint.endLap - stint.startLap + 1;
          const widthPct = (stintLaps / totalLaps) * 100;
          const style = COMPOUND_STYLE[stint.compound];
          return (
            <div
              key={idx}
              style={{ width: `${widthPct}%`, backgroundColor: style.bar }}
              className="h-full flex items-center justify-center text-white text-[11px] font-medium tabular-nums border-r border-white/40 last:border-r-0 transition-all"
              title={`${style.label}: L${stint.startLap}–L${stint.endLap} (${stintLaps} 圈)`}
            >
              <span className="truncate px-1.5">
                {stint.compound[0]} · {stintLaps}L
              </span>
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-2">
        {stints.map((stint, idx) => {
          const style = COMPOUND_STYLE[stint.compound];
          return (
            <span
              key={idx}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] border tabular-nums ${style.bg} ${style.border} ${style.text}`}
            >
              <span className="font-medium">{style.label}</span>
              <span>
                L{stint.startLap}–{stint.endLap}
              </span>
              <span className="opacity-75">均速 {formatLapTime(stint.avgPaceSec)}</span>
            </span>
          );
        })}
      </div>
    </div>
  );

  // Degradation curve (Tyre Age 0..22 laps)
  const maxAge = 22;
  const w = 880;
  const h = 210;
  const padL = 48;
  const padR = 20;
  const padT = 16;
  const padB = 28;
  const plotW = w - padL - padR;
  const plotH = h - padT - padB;

  const degRateA = bundle.stintsA[0]?.degPerLap ?? 0.06;
  const degRateB = bundle.stintsB[0]?.degPerLap ?? 0.065;
  const maxLoss = Math.max(1.8, maxAge * Math.max(degRateA, degRateB) + 0.2);

  const toX = (age: number) => padL + (age / maxAge) * plotW;
  const toY = (loss: number) => padT + plotH - (loss / maxLoss) * plotH;

  const ages = Array.from({ length: maxAge + 1 }, (_, i) => i);
  const pathDegA = ages
    .map((age, i) => {
      const loss = age * degRateA + Math.pow(age / maxAge, 2) * 0.25;
      return `${i === 0 ? 'M' : 'L'} ${toX(age).toFixed(1)} ${toY(loss).toFixed(1)}`;
    })
    .join(' ');
  const pathDegB = ages
    .map((age, i) => {
      const loss = age * degRateB + Math.pow(age / maxAge, 2) * 0.28;
      return `${i === 0 ? 'M' : 'L'} ${toX(age).toFixed(1)} ${toY(loss).toFixed(1)}`;
    })
    .join(' ');

  return (
    <div className="space-y-4 tab-crossfade">
      {/* Tyre Stint Timeline */}
      <ScrollReveal>
        <div className="bg-white border border-[#DFD9CE] rounded-xl p-5 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-semibold text-[#1C1917]">
              輪胎策略與進站時間軸
            </h3>
            <p className="text-xs text-[#78716C] mt-0.5">
              各配方輪胎使用區間與平均單圈配速比較
            </p>
          </div>
          <div className="flex items-center gap-2 text-[11px]">
            {(['Soft', 'Medium', 'Hard'] as TyreCompound[]).map((c) => (
              <span
                key={c}
                className={`px-2 py-0.5 rounded-full border ${COMPOUND_STYLE[c].bg} ${COMPOUND_STYLE[c].border} ${COMPOUND_STYLE[c].text}`}
              >
                {c}
              </span>
            ))}
          </div>
        </div>

        {renderStintRow(
          bundle.driverA.code,
          bundle.driverA.zhName,
          '#1C1917',
          bundle.stintsA
        )}
        <div className="border-t border-[#EFECE6]" />
        {renderStintRow(
          bundle.driverB.code,
          bundle.driverB.zhName,
          '#1B4332',
          bundle.stintsB
        )}
        </div>
      </ScrollReveal>

      {/* Stint Degradation Curve */}
      <ScrollReveal delayMs={80}>
        <div className="bg-white border border-[#DFD9CE] rounded-xl p-5">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div>
            <h3 className="text-base font-semibold text-[#1C1917]">
              輪胎衰退曲線 (Stint Degradation)
            </h3>
            <p className="text-xs text-[#78716C] mt-0.5">
              隨輪胎磨耗圈數增加的單圈時間損失 (秒)
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs tabular-nums">
            <span className="text-[#1C1917] font-medium">
              {bundle.driverA.code}: +{(degRateA * 1000).toFixed(0)} ms/圈
            </span>
            <span className="text-[#1B4332] font-medium">
              {bundle.driverB.code}: +{(degRateB * 1000).toFixed(0)} ms/圈
            </span>
          </div>
        </div>

        <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto overflow-visible select-none">
          {[0, 0.5, 1.0, 1.5].map((loss) => (
            <g key={loss}>
              <line
                x1={padL}
                y1={toY(loss)}
                x2={w - padR}
                y2={toY(loss)}
                stroke="#EFECE6"
                strokeWidth="1"
              />
              <text
                x={padL - 8}
                y={toY(loss) + 3.5}
                textAnchor="end"
                className="fill-[#78716C] text-[10px] tabular-nums"
              >
                +{loss.toFixed(1)}s
              </text>
            </g>
          ))}

          {[0, 5, 10, 15, 20].map((age) => (
            <text
              key={age}
              x={toX(age)}
              y={h - 6}
              textAnchor="middle"
              className="fill-[#78716C] text-[10px] tabular-nums"
            >
              胎齡 {age} 圈
            </text>
          ))}

          <path d={pathDegB} fill="none" stroke="#1B4332" strokeWidth="2" strokeDasharray="5 3" className="line-draw" />
          <path d={pathDegA} fill="none" stroke="#1C1917" strokeWidth="2.2" className="line-draw" />
        </svg>
        </div>
      </ScrollReveal>
    </div>
  );
};
