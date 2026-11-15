import React from 'react';

export const GenCarLineIcon: React.FC<{ className?: string }> = ({ className = 'h-[28px] w-auto shrink-0' }) => (
  <svg
    viewBox="16 12 154 76"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="GEN. F1 Car Icon"
  >
    {/* Rear Wing */}
    <path
      d="M 18 28 L 36 28 L 36 72 L 18 72 M 26 28 L 26 72"
      stroke="#1C1917"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Rear Wheels */}
    <rect x="30" y="14" width="22" height="14" rx="4" stroke="#1C1917" strokeWidth="1.7" />
    <rect x="30" y="72" width="22" height="14" rx="4" stroke="#1C1917" strokeWidth="1.7" />
    {/* Rear Suspension & Floor */}
    <path d="M 52 21 L 92 21 M 52 79 L 92 79" stroke="#1C1917" strokeWidth="1.65" strokeLinecap="round" />
    <path d="M 41 28 L 41 37 M 41 72 L 41 63" stroke="#1C1917" strokeWidth="1.65" />
    {/* Subtle #1B4332 Sidepod / Bargeboard Accents */}
    <path
      d="M 106 23 C 110 23 114 27 114 35 L 106 34 Z"
      fill="#1B4332"
    />
    <path
      d="M 106 77 C 110 77 114 73 114 65 L 106 66 Z"
      fill="#1B4332"
    />
    {/* Main Chassis & Sidepods */}
    <path
      d="M 36 37 L 54 37 C 68 37 78 22 96 22 C 106 22 110 34 118 37 L 154 43 C 160 44 162 47 162 50 C 162 53 160 56 154 57 L 118 63 C 110 66 106 78 96 78 C 78 78 68 63 54 63 L 36 63"
      stroke="#1C1917"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Engine Cover / Spine */}
    <path
      d="M 36 50 L 66 50 C 74 50 78 42 88 42 C 98 42 104 47 114 50 C 104 53 98 58 88 58 C 78 58 74 50 66 50"
      stroke="#1C1917"
      strokeWidth="1.65"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Cockpit & Halo */}
    <path
      d="M 86 44 L 96 44 C 102 44 105 47 105 50 C 105 53 102 56 96 56 L 86 56 Z"
      stroke="#1C1917"
      strokeWidth="1.65"
      strokeLinejoin="round"
    />
    {/* Front Wheels */}
    <rect x="124" y="16" width="20" height="13" rx="4" stroke="#1C1917" strokeWidth="1.7" />
    <rect x="124" y="71" width="20" height="13" rx="4" stroke="#1C1917" strokeWidth="1.7" />
    {/* Front Suspension */}
    <path
      d="M 134 29 L 128 38 M 134 29 L 140 39 M 134 71 L 128 62 M 134 71 L 140 61"
      stroke="#1C1917"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
    {/* Front Wing */}
    <path
      d="M 149 16 L 160 16 L 168 50 L 160 84 L 149 84 C 149 72 153 60 158 56 L 158 44 C 153 40 149 28 149 16 Z"
      stroke="#1C1917"
      strokeWidth="1.7"
      strokeLinejoin="round"
    />
  </svg>
);

export const BrandLogo: React.FC = () => (
  <div className="inline-flex items-center gap-2.5 select-none bg-transparent">
    <GenCarLineIcon className="h-[28px] w-auto shrink-0" />
    <span className="font-brand text-[30px] leading-none tracking-tight text-[#1C1917]">
      GEN<span className="text-[#1B4332]">.</span>
    </span>
  </div>
);
