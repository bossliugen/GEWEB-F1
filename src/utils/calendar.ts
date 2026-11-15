import { GrandPrixInfo } from '../data/f1Data';
import { CIRCUIT_STORIES } from '../data/circuitStories';

function toUtcCompact(iso: string): string {
  const d = new Date(iso);
  return d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
}

export function buildGoogleCalendarUrl(
  gp: GrandPrixInfo,
  type: 'race' | 'quali' = 'race'
): string {
  const meta = CIRCUIT_STORIES[gp.id];
  const startIso =
    type === 'quali'
      ? meta?.isoQualiStart ?? `${gp.date}T13:00:00+08:00`
      : meta?.isoRaceStart ?? `${gp.date}T21:00:00+08:00`;

  const startDate = new Date(startIso);
  const endDate = new Date(startDate.getTime() + (type === 'quali' ? 60 : 120) * 60 * 1000);

  const startStr = toUtcCompact(startDate.toISOString());
  const endStr = toUtcCompact(endDate.toISOString());

  const title =
    type === 'quali'
      ? `F1 ${gp.zhName} 排位賽 (${gp.name})`
      : `F1 ${gp.zhName} 正賽 (${gp.name})`;

  const details = `${gp.zhCircuitName} · ${gp.laps} 圈 (${gp.lengthKm} km)\n${meta?.story ?? ''}`;

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: `${startStr}/${endStr}`,
    details,
    location: `${gp.circuitName}, ${gp.location}`,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function downloadIcsEvent(
  gp: GrandPrixInfo,
  type: 'race' | 'quali' = 'race'
): void {
  const meta = CIRCUIT_STORIES[gp.id];
  const startIso =
    type === 'quali'
      ? meta?.isoQualiStart ?? `${gp.date}T13:00:00+08:00`
      : meta?.isoRaceStart ?? `${gp.date}T21:00:00+08:00`;

  const startDate = new Date(startIso);
  const endDate = new Date(startDate.getTime() + (type === 'quali' ? 60 : 120) * 60 * 1000);

  const title =
    type === 'quali'
      ? `F1 ${gp.zhName} 排位賽`
      : `F1 ${gp.zhName} 正賽`;

  const icsLines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//GEN. F1//Race Calendar//ZH',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `UID:gen-f1-2026-${gp.id}-${type}@geweb-f1`,
    `DTSTAMP:${toUtcCompact(new Date().toISOString())}`,
    `DTSTART:${toUtcCompact(startDate.toISOString())}`,
    `DTEND:${toUtcCompact(endDate.toISOString())}`,
    `SUMMARY:${title}`,
    `LOCATION:${gp.circuitName} (${gp.location})`,
    `DESCRIPTION:${gp.zhCircuitName} · 正賽 ${gp.laps} 圈 · 台灣時間開賽`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsLines], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `F1-2026-R${gp.round}-${gp.id}-${type}.ics`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
