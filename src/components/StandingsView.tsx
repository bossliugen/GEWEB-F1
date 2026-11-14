import React, { useState } from 'react';
import { RefreshCw, CheckCircle2 } from 'lucide-react';
import { DRIVERS, DriverInfo, TEAMS, TeamInfo } from '../data/f1Data';
import { DriverPortrait, TeamCarSide, TeamLogo } from './TeamAssets';

interface Props {
  driverACode: string;
  driverBCode: string;
  onAssignDriver: (slot: 'A' | 'B', code: string) => void;
}

export const StandingsView: React.FC<Props> = ({
  driverACode,
  driverBCode,
  onAssignDriver,
}) => {
  const [drivers, setDrivers] = useState<DriverInfo[]>(DRIVERS);
  const [teams, setTeams] = useState<TeamInfo[]>(TEAMS);
  const [syncing, setSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState<string>('已載入 2026 賽季最新積分 (聖保羅站後)');

  const handleLiveSync = async () => {
    setSyncing(true);
    try {
      const [drvRes, conRes] = await Promise.all([
        fetch('https://api.jolpi.ca/ergast/f1/2026/driverstandings/?format=json'),
        fetch('https://api.jolpi.ca/ergast/f1/2026/constructorstandings/?format=json'),
      ]);

      if (drvRes.ok && conRes.ok) {
        const drvJson = await drvRes.json();
        const conJson = await conRes.json();
        const apiDrivers =
          drvJson?.MRData?.StandingsTable?.StandingsLists?.[0]?.DriverStandings ?? [];
        const apiTeams =
          conJson?.MRData?.StandingsTable?.StandingsLists?.[0]?.ConstructorStandings ?? [];

        if (apiDrivers.length > 0) {
          setDrivers((prev) =>
            prev
              .map((d) => {
                const match = apiDrivers.find(
                  (ad: { Driver?: { code?: string } }) =>
                    ad.Driver?.code?.toUpperCase() === d.code
                );
                if (!match) return d;
                return {
                  ...d,
                  points2026: Number(match.points ?? d.points2026),
                  rank2026: Number(match.position ?? d.rank2026),
                  wins2026: Number(match.wins ?? d.wins2026),
                };
              })
              .sort((a, b) => a.rank2026 - b.rank2026)
          );
        }

        if (apiTeams.length > 0) {
          setTeams((prev) =>
            prev
              .map((t) => {
                const match = apiTeams.find((at: { Constructor?: { name?: string } }) =>
                  at.Constructor?.name?.toLowerCase().includes(t.name.toLowerCase().split(' ')[0])
                );
                if (!match) return t;
                return {
                  ...t,
                  points2026: Number(match.points ?? t.points2026),
                  rank2026: Number(match.position ?? t.rank2026),
                };
              })
              .sort((a, b) => a.rank2026 - b.rank2026)
          );
        }

        setSyncMessage(`已即時同步官方積分 (${new Date().toLocaleTimeString('zh-TW')})`);
      } else {
        setSyncMessage('目前使用本地最新 2026 賽季積分資料庫');
      }
    } catch {
      setSyncMessage('目前使用本地最新 2026 賽季積分資料庫');
    } finally {
      setSyncing(false);
    }
  };

  const maxTeamPoints = Math.max(...teams.map((t) => t.points2026), 1);

  return (
    <div className="space-y-8 animate-fade-up">
      {/* Header & Live Sync */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="font-editorial text-2xl font-bold text-[#1C1917]">
            2026 車手積分榜與車隊排行榜
          </h2>
          <p className="text-sm text-[#57534E] mt-1 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#1B4332]" />
            {syncMessage}
          </p>
        </div>

        <button
          type="button"
          onClick={handleLiveSync}
          disabled={syncing}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#DFD9CE] hover:border-[#1C1917] text-xs font-medium text-[#1C1917] transition-colors cursor-pointer disabled:opacity-60"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${syncing ? 'animate-spin' : ''}`} />
          {syncing ? '同步中...' : '更新即時積分'}
        </button>
      </div>

      {/* Constructors' Championship + Cutout Cars & Logos */}
      <section className="space-y-3">
        <div className="flex items-baseline justify-between">
          <h3 className="font-editorial text-lg font-bold text-[#1C1917]">
            車隊排行榜與 2026 賽車圖鑑 (完全去背)
          </h3>
          <span className="text-xs text-[#78716C]">共 11 支車隊</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {teams.map((team) => {
            const pct = Math.max(2, (team.points2026 / maxTeamPoints) * 100);
            return (
              <div
                key={team.id}
                className="bg-white border border-[#DFD9CE] rounded-xl p-4 sm:p-5 flex flex-col justify-between gap-3"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="w-7 text-sm font-bold text-[#78716C] tabular-nums">
                      #{team.rank2026}
                    </span>
                    <TeamLogo team={team} className="w-9 h-9 shrink-0" />
                    <div>
                      <div className="font-semibold text-[#1C1917] text-sm">
                        {team.zhName}{' '}
                        <span className="text-xs font-normal text-[#78716C]">
                          {team.name}
                        </span>
                      </div>
                      <div className="text-[11px] text-[#78716C]">
                        動力單元：{team.powerUnit} · {team.base}
                      </div>
                    </div>
                  </div>

                  <div className="text-right tabular-nums">
                    <div className="text-xl font-bold text-[#1C1917]">
                      {team.points2026}
                    </div>
                    <div className="text-[11px] text-[#78716C]">PTS</div>
                  </div>
                </div>

                {/* Transparent Side-Profile F1 Car */}
                <div className="py-1 flex items-center justify-center">
                  <TeamCarSide team={team} className="w-full max-w-[280px] h-16" />
                </div>

                {/* Points Progress Bar */}
                <div className="w-full h-1.5 bg-[#F6F3EC] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${pct}%`,
                      backgroundColor: team.rank2026 === 1 ? '#1B4332' : '#1C1917',
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Drivers' Championship + Cutout Portraits */}
      <section className="space-y-3">
        <div className="flex items-baseline justify-between">
          <h3 className="font-editorial text-lg font-bold text-[#1C1917]">
            車手即時積分榜 (點擊可設為遙測對比車手 A / B)
          </h3>
          <span className="text-xs text-[#78716C]">2026 賽季積分</span>
        </div>

        <div className="bg-white border border-[#DFD9CE] rounded-xl overflow-hidden">
          <div className="divide-y divide-[#EFECE6]">
            {drivers.map((driver) => {
              const team = teams.find((t) => t.id === driver.teamId);
              const isA = driver.code === driverACode;
              const isB = driver.code === driverBCode;
              return (
                <div
                  key={driver.id}
                  className="px-4 sm:px-5 py-3 flex flex-wrap items-center justify-between gap-3 hover:bg-[#F6F3EC]/50 transition-colors"
                >
                  <div className="flex items-center gap-3 sm:gap-4 min-w-[220px]">
                    <span className="w-6 text-sm font-bold text-[#78716C] tabular-nums">
                      {driver.rank2026}
                    </span>
                    <div className="relative flex items-end justify-center shrink-0">
                      <DriverPortrait driver={driver} team={team} size="md" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold px-1.5 py-0.5 rounded bg-[#F6F3EC] border border-[#DFD9CE] text-[#1C1917] tabular-nums">
                          #{driver.number}
                        </span>
                        <span className="font-semibold text-sm text-[#1C1917]">
                          {driver.flag} {driver.zhName}
                        </span>
                        <span className="text-xs text-[#78716C] hidden sm:inline">
                          {driver.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 mt-1 text-xs text-[#57534E]">
                        {team && <TeamLogo team={team} className="w-4 h-4" />}
                        <span>{team?.zhName}</span>
                        <span className="text-[#DFD9CE]">|</span>
                        <span className="tabular-nums">
                          {driver.wins2026} 勝 · {driver.podiums2026} 頒獎台
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 ml-auto">
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => onAssignDriver('A', driver.code)}
                        className={`px-2.5 py-1 rounded-full text-[11px] font-medium border transition-colors cursor-pointer ${
                          isA
                            ? 'bg-[#1C1917] text-white border-[#1C1917]'
                            : 'bg-white text-[#57534E] border-[#DFD9CE] hover:border-[#1C1917]'
                        }`}
                      >
                        {isA ? '車手 A ✓' : '設為 A'}
                      </button>
                      <button
                        type="button"
                        onClick={() => onAssignDriver('B', driver.code)}
                        className={`px-2.5 py-1 rounded-full text-[11px] font-medium border transition-colors cursor-pointer ${
                          isB
                            ? 'bg-[#1B4332] text-white border-[#1B4332]'
                            : 'bg-white text-[#57534E] border-[#DFD9CE] hover:border-[#1B4332]'
                        }`}
                      >
                        {isB ? '車手 B ✓' : '設為 B'}
                      </button>
                    </div>

                    <div className="w-16 text-right tabular-nums">
                      <span className="text-base font-bold text-[#1C1917]">
                        {driver.points2026}
                      </span>
                      <span className="text-[11px] text-[#78716C] ml-1">PTS</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
