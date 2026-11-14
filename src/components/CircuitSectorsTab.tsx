import React, { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { SessionTelemetryBundle } from '../data/f1Data';

interface Props {
  bundle: SessionTelemetryBundle;
}

export const CircuitSectorsTab: React.FC<Props> = ({ bundle }) => {
  const pathRef = useRef<SVGPathElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [carPos, setCarPos] = useState<{ x: number; y: number }>({
    x: bundle.gp.startFinish.x,
    y: bundle.gp.startFinish.y,
  });
  const [segments, setSegments] = useState<
    Array<{ d: string; faster: 'A' | 'B'; sector: 1 | 2 | 3 }>
  >([]);

  // Compute mini-sector segments along the SVG path
  useEffect(() => {
    const el = pathRef.current;
    if (!el) return;
    const totalLen = el.getTotalLength();
    const count = bundle.miniSectors.length;
    const built: Array<{ d: string; faster: 'A' | 'B'; sector: 1 | 2 | 3 }> = [];

    for (let i = 0; i < count; i++) {
      const start = (i / count) * totalLen;
      const end = ((i + 1) / count) * totalLen;
      const samples = 8;
      const pts: string[] = [];
      for (let s = 0; s <= samples; s++) {
        const pt = el.getPointAtLength(start + ((end - start) * s) / samples);
        pts.push(`${s === 0 ? 'M' : 'L'} ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`);
      }
      built.push({
        d: pts.join(' '),
        faster: bundle.miniSectors[i].faster,
        sector: bundle.miniSectors[i].sector,
      });
    }
    setSegments(built);
  }, [bundle]);

  // Smooth animated car dot along circuit path
  useEffect(() => {
    if (!isPlaying) return;
    let frameId: number;
    let startTs: number | null = null;
    const durationMs = 7500;

    const tick = (ts: number) => {
      if (startTs === null) startTs = ts;
      const el = pathRef.current;
      if (el) {
        const totalLen = el.getTotalLength();
        const progress = ((ts - startTs) % durationMs) / durationMs;
        const pt = el.getPointAtLength(progress * totalLen);
        setCarPos({ x: pt.x, y: pt.y });
      }
      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [isPlaying, bundle.gp.id]);

  const s1A = parseFloat(bundle.bestS1A);
  const s1B = parseFloat(bundle.bestS1B);
  const s2A = parseFloat(bundle.bestS2A);
  const s2B = parseFloat(bundle.bestS2B);
  const s3A = parseFloat(bundle.bestS3A);
  const s3B = parseFloat(bundle.bestS3B);

  const sectorRows = [
    { label: 'Sector 1 (S1)', a: s1A, b: s1B },
    { label: 'Sector 2 (S2)', a: s2A, b: s2B },
    { label: 'Sector 3 (S3)', a: s3A, b: s3B },
  ];

  const aWinsCount = bundle.miniSectors.filter((m) => m.faster === 'A').length;
  const bWinsCount = bundle.miniSectors.length - aWinsCount;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 animate-fade-up">
      {/* 2D SVG Circuit Map */}
      <div className="lg:col-span-7 bg-white border border-[#DFD9CE] rounded-xl p-5 flex flex-col justify-between">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <div>
            <h3 className="text-base font-semibold text-[#1C1917]">
              {bundle.gp.zhCircuitName} · 微區段優勢地圖
            </h3>
            <p className="text-xs text-[#78716C] mt-0.5">
              {bundle.gp.location} · 全長 {bundle.gp.lengthKm} km · {bundle.gp.corners} 彎道 ·{' '}
              {bundle.gp.drsZones} DRS 區
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsPlaying((p) => !p)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#DFD9CE] bg-[#F6F3EC] hover:border-[#1C1917] text-xs font-medium text-[#1C1917] cursor-pointer transition-colors"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            {isPlaying ? '暫停模擬' : '播放模擬'}
          </button>
        </div>

        <div className="relative py-2">
          <svg viewBox="0 0 500 300" className="w-full h-auto select-none">
            {/* Hidden reference path for length sampling */}
            <path
              ref={pathRef}
              d={bundle.gp.svgPath}
              fill="none"
              stroke="transparent"
              strokeWidth="1"
            />

            {/* Soft track base */}
            <path
              d={bundle.gp.svgPath}
              fill="none"
              stroke="#EFECE6"
              strokeWidth="12"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Colored Mini-Sectors */}
            {segments.map((seg, idx) => (
              <path
                key={idx}
                d={seg.d}
                fill="none"
                stroke={seg.faster === 'A' ? '#1C1917' : '#1B4332'}
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ))}

            {/* Start / Finish Marker */}
            <circle
              cx={bundle.gp.startFinish.x}
              cy={bundle.gp.startFinish.y}
              r="5"
              fill="#FFFFFF"
              stroke="#1C1917"
              strokeWidth="2"
            />
            <text
              x={bundle.gp.startFinish.x}
              y={bundle.gp.startFinish.y + 18}
              textAnchor="middle"
              className="fill-[#78716C] text-[10px] font-medium"
            >
              起終點線
            </text>

            {/* Animated Car Dot */}
            <circle
              cx={carPos.x}
              cy={carPos.y}
              r="6"
              fill="#1B4332"
              stroke="#FFFFFF"
              strokeWidth="2"
            />
          </svg>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-[#EFECE6] text-xs">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-medium text-[#1C1917]">
              <span className="w-3 h-1.5 rounded-full bg-[#1C1917] inline-block" />
              {bundle.driverA.code} 領先 ({aWinsCount} 區段)
            </span>
            <span className="flex items-center gap-1.5 font-medium text-[#1B4332]">
              <span className="w-3 h-1.5 rounded-full bg-[#1B4332] inline-block" />
              {bundle.driverB.code} 領先 ({bWinsCount} 區段)
            </span>
          </div>
          <span className="text-[#78716C] tabular-nums">
            正賽圈數：{bundle.gp.laps} 圈
          </span>
        </div>
      </div>

      {/* S1 / S2 / S3 Comparison Table */}
      <div className="lg:col-span-5 bg-white border border-[#DFD9CE] rounded-xl p-5 flex flex-col justify-between">
        <div>
          <h3 className="text-base font-semibold text-[#1C1917]">
            S1 / S2 / S3 區段時間對比
          </h3>
          <p className="text-xs text-[#78716C] mt-0.5 mb-4">
            最佳單圈三段計時與時間差 (秒)
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-[#DFD9CE] text-xs text-[#78716C]">
                  <th className="py-2.5 text-left font-medium">區段</th>
                  <th className="py-2.5 text-right font-semibold text-[#1C1917]">
                    {bundle.driverA.code}
                  </th>
                  <th className="py-2.5 text-right font-semibold text-[#1B4332]">
                    {bundle.driverB.code}
                  </th>
                  <th className="py-2.5 text-right font-medium">差距</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EFECE6] tabular-nums">
                {sectorRows.map((row) => {
                  const diff = row.a - row.b;
                  const aFaster = diff <= 0;
                  return (
                    <tr key={row.label} className="hover:bg-[#F6F3EC]/60 transition-colors">
                      <td className="py-3 font-medium text-[#1C1917]">{row.label}</td>
                      <td
                        className={`py-3 text-right ${
                          aFaster ? 'font-semibold text-[#1C1917]' : 'text-[#57534E]'
                        }`}
                      >
                        {row.a.toFixed(3)}s
                      </td>
                      <td
                        className={`py-3 text-right ${
                          !aFaster ? 'font-semibold text-[#1B4332]' : 'text-[#57534E]'
                        }`}
                      >
                        {row.b.toFixed(3)}s
                      </td>
                      <td
                        className={`py-3 text-right text-xs font-medium ${
                          aFaster ? 'text-[#1C1917]' : 'text-[#1B4332]'
                        }`}
                      >
                        {diff > 0 ? `+${diff.toFixed(3)}` : diff.toFixed(3)}s
                      </td>
                    </tr>
                  );
                })}
                <tr className="bg-[#F6F3EC]/80 font-semibold">
                  <td className="py-3 text-[#1C1917]">最佳單圈</td>
                  <td className="py-3 text-right text-[#1C1917]">{bundle.fastestLapA}</td>
                  <td className="py-3 text-right text-[#1B4332]">{bundle.fastestLapB}</td>
                  <td className="py-3 text-right text-xs text-[#57534E]">
                    {((s1A + s2A + s3A) - (s1B + s2B + s3B)).toFixed(3)}s
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-5 pt-4 border-t border-[#EFECE6] grid grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-lg bg-[#F6F3EC] border border-[#DFD9CE]">
            <div className="text-[#78716C] mb-1">最高極速 Speed Trap</div>
            <div className="font-semibold text-[#1C1917] tabular-nums">
              {bundle.driverA.code} {bundle.topSpeedA} km/h
            </div>
            <div className="font-semibold text-[#1B4332] tabular-nums">
              {bundle.driverB.code} {bundle.topSpeedB} km/h
            </div>
          </div>
          <div className="p-3 rounded-lg bg-[#F6F3EC] border border-[#DFD9CE]">
            <div className="text-[#78716C] mb-1">進站次數 Pit Stops</div>
            <div className="font-semibold text-[#1C1917] tabular-nums">
              {bundle.driverA.code} {bundle.pitStopsA} 次
            </div>
            <div className="font-semibold text-[#1B4332] tabular-nums">
              {bundle.driverB.code} {bundle.pitStopsB} 次
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
