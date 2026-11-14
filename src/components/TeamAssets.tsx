import React, { useState } from 'react';
import { DriverInfo, TeamInfo } from '../data/f1Data';

export const TeamLogo: React.FC<{ team: TeamInfo; className?: string }> = ({
  team,
  className = 'w-8 h-8',
}) => {
  const c1 = team.liveryPrimary;
  const c2 = team.liverySecondary;
  const c3 = team.liveryAccent;

  switch (team.id) {
    case 'mercedes':
      return (
        <svg viewBox="0 0 40 40" fill="none" className={className} aria-label={team.name}>
          <circle cx="20" cy="20" r="16" stroke={c1} strokeWidth="2.4" />
          <path d="M20 5 L20 20 L8 28 M20 20 L32 28" stroke={c1} strokeWidth="2.2" strokeLinecap="round" />
          <circle cx="20" cy="20" r="2.2" fill={c2} />
        </svg>
      );
    case 'ferrari':
      return (
        <svg viewBox="0 0 40 40" fill="none" className={className} aria-label={team.name}>
          <path d="M9 7 H31 V22 C31 30 20 35 20 35 C20 35 9 30 9 22 Z" fill={c3} stroke={c1} strokeWidth="2" />
          <path d="M9 11 H31" stroke="#1B4332" strokeWidth="2.5" />
          <path d="M16 27 C17 22 19 18 22 16 C23 19 21 22 23 25 C20 25 18 27 16 27 Z" fill="#1C1917" />
        </svg>
      );
    case 'redbull':
      return (
        <svg viewBox="0 0 40 40" fill="none" className={className} aria-label={team.name}>
          <circle cx="20" cy="20" r="11" fill={c3} />
          <path d="M6 23 C11 19 15 19 19 22 L15 26 Z" fill={c2} />
          <path d="M34 23 C29 19 25 19 21 22 L25 26 Z" fill={c2} />
          <circle cx="20" cy="20" r="16" stroke={c1} strokeWidth="1.6" strokeDasharray="3 3" />
        </svg>
      );
    case 'mclaren':
      return (
        <svg viewBox="0 0 40 40" fill="none" className={className} aria-label={team.name}>
          <path d="M6 27 C14 14 26 11 35 15 C28 19 20 23 14 29 C11 26 8 26 6 27 Z" fill={c1} />
        </svg>
      );
    case 'rb':
      return (
        <svg viewBox="0 0 40 40" fill="none" className={className} aria-label={team.name}>
          <rect x="6" y="10" width="28" height="20" rx="5" stroke={c2} strokeWidth="2.2" />
          <path d="M11 23 L17 16 L23 23 L29 16" stroke={c3} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'alpine':
      return (
        <svg viewBox="0 0 40 40" fill="none" className={className} aria-label={team.name}>
          <path d="M8 30 L21 10 L32 30 M14 23 H28" stroke={c1} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 27 L24 14" stroke={c2} strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case 'haas':
      return (
        <svg viewBox="0 0 40 40" fill="none" className={className} aria-label={team.name}>
          <path d="M10 10 V30 M30 10 V30 M10 20 H30" stroke={c1} strokeWidth="3.5" strokeLinecap="round" />
          <path d="M10 15 H22 M18 25 H30" stroke={c2} strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      );
    case 'audi':
      return (
        <svg viewBox="0 0 40 40" fill="none" className={className} aria-label={team.name}>
          <circle cx="11" cy="20" r="5.5" stroke={c1} strokeWidth="2" />
          <circle cx="17" cy="20" r="5.5" stroke={c1} strokeWidth="2" />
          <circle cx="23" cy="20" r="5.5" stroke={c1} strokeWidth="2" />
          <circle cx="29" cy="20" r="5.5" stroke={c2} strokeWidth="2" />
        </svg>
      );
    case 'williams':
      return (
        <svg viewBox="0 0 40 40" fill="none" className={className} aria-label={team.name}>
          <path d="M7 12 L14 28 L20 15 L26 28 L33 12" stroke={c1} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 12 L17 23 L23 12" stroke={c2} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'astonmartin':
      return (
        <svg viewBox="0 0 40 40" fill="none" className={className} aria-label={team.name}>
          <path d="M4 16 L20 26 L36 16 L31 14 L20 20 L9 14 Z" fill={c1} />
          <path d="M8 19 L20 25 L32 19" stroke={c3} strokeWidth="1.4" />
        </svg>
      );
    case 'cadillac':
    default:
      return (
        <svg viewBox="0 0 40 40" fill="none" className={className} aria-label={team.name}>
          <path d="M8 10 H32 V24 L20 32 L8 24 Z" stroke={c1} strokeWidth="2.2" fill="none" />
          <path d="M12 14 H28 V22 L20 27 L12 22 Z" fill={c2} />
        </svg>
      );
  }
};

export const TeamCarSide: React.FC<{ team: TeamInfo; className?: string }> = ({
  team,
  className = 'w-full max-w-[260px] h-16',
}) => {
  return (
    <svg
      viewBox="0 0 320 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label={`${team.name} 2026 F1 Car`}
    >
      {/* Rear Wing */}
      <path d="M 24 22 L 48 22 L 44 46 L 28 46 Z" fill={team.liveryPrimary} />
      <path d="M 24 22 L 48 22 L 47 27 L 25 27 Z" fill={team.liverySecondary} />
      <rect x="33" y="44" width="6" height="14" fill="#1C1917" />

      {/* Floor & Diffuser */}
      <path d="M 42 62 L 265 64 L 272 68 L 38 67 Z" fill="#1C1917" />

      {/* Main Chassis / Engine Cover / Nose */}
      <path
        d="M 44 46 C 68 38 98 28 130 28 L 154 28 C 166 28 175 38 194 43 L 268 53 C 282 55 292 59 294 63 L 270 65 L 44 63 Z"
        fill={team.liveryPrimary}
      />

      {/* Livery Sidepod Stripe */}
      <path
        d="M 78 46 C 112 40 155 43 210 50 L 254 56 L 246 61 L 82 59 Z"
        fill={team.liverySecondary}
      />
      <path
        d="M 110 38 L 165 40 L 185 45 L 122 44 Z"
        fill={team.liveryAccent}
      />

      {/* Halo & Cockpit */}
      <path
        d="M 156 38 C 168 27 192 28 206 43"
        stroke="#1C1917"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="176" cy="36" r="5" fill={team.liveryAccent} />

      {/* Front Wing */}
      <path d="M 272 57 L 306 58 L 302 67 L 268 67 Z" fill={team.liveryPrimary} />
      <path d="M 278 55 L 304 56 L 303 59 L 276 59 Z" fill={team.liverySecondary} />

      {/* Rear Wheel */}
      <circle cx="68" cy="60" r="19" fill="#1C1917" />
      <circle cx="68" cy="60" r="13" stroke={team.liveryAccent} strokeWidth="1.5" fill="#292524" />
      <circle cx="68" cy="60" r="5" fill="#78716C" />

      {/* Front Wheel */}
      <circle cx="246" cy="60" r="19" fill="#1C1917" />
      <circle cx="246" cy="60" r="13" stroke={team.liveryAccent} strokeWidth="1.5" fill="#292524" />
      <circle cx="246" cy="60" r="5" fill="#78716C" />
    </svg>
  );
};

export const DriverPortrait: React.FC<{
  driver: DriverInfo;
  team?: TeamInfo;
  size?: 'sm' | 'md' | 'lg';
}> = ({ driver, team, size = 'md' }) => {
  const [imgFailed, setImgFailed] = useState(false);

  const dims =
    size === 'sm' ? 'w-12 h-12' : size === 'lg' ? 'w-24 h-24' : 'w-16 h-16';

  if (!imgFailed && driver.headshotUrl) {
    return (
      <img
        src={driver.headshotUrl}
        alt={driver.name}
        onError={() => setImgFailed(true)}
        className={`${dims} object-contain object-bottom select-none bg-transparent`}
        loading="lazy"
      />
    );
  }

  // 100% transparent cutout SVG fallback (Driver shoulders + racing helmet)
  const suitColor = team?.liveryPrimary ?? '#1C1917';
  const suitAccent = team?.liverySecondary ?? '#1B4332';

  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      className={dims}
      aria-label={driver.name}
    >
      {/* Shoulders / Racing Suit (Transparent background) */}
      <path
        d="M 14 78 C 16 61 26 55 40 55 C 54 55 64 61 66 78 Z"
        fill={suitColor}
      />
      <path d="M 28 57 L 40 68 L 52 57" stroke={suitAccent} strokeWidth="3" strokeLinecap="round" />
      {/* Helmet */}
      <circle cx="40" cy="34" r="17" fill={driver.helmetPrimary} stroke="#1C1917" strokeWidth="1.8" />
      {/* Visor */}
      <path d="M 27 31 C 33 28 47 28 53 31 L 51 39 C 45 41 35 41 29 39 Z" fill="#1C1917" />
      {/* Helmet Stripe */}
      <path d="M 32 19 C 38 17 42 17 48 19" stroke={driver.helmetAccent} strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
};
