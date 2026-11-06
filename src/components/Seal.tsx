/**
 * The round stamp a registered professional presses onto a drawing.
 *
 * Both arcs are drawn left point to right point so the tangent runs with the
 * reading direction at the top and at the bottom of the circle — sweep 1 goes
 * over the top, sweep 0 under the bottom, and the glyphs stay upright on both.
 *
 * Roughly 18 characters is the limit on the top arc and 14 on the bottom.
 */
export default function Seal({
  id,
  top,
  bottom = 'RCC · BHOPAL',
  center,
  accent,
  /** The disc behind the ring. Transparent suits a watermark. */
  fill = 'rgba(7,7,7,0.82)',
}: {
  /** Unique within the page: the two arc paths are referenced by id. */
  id: string;
  top: string;
  bottom?: string;
  center: string;
  accent: string;
  fill?: string;
}) {
  const topArc = `seal-${id}-top`;
  const bottomArc = `seal-${id}-bottom`;

  return (
    <svg viewBox="0 0 120 120" aria-hidden="true" className="w-full h-full">
      <defs>
        <path id={topArc} d="M 15.5,60 A 44.5,44.5 0 0 1 104.5,60" fill="none" />
        <path id={bottomArc} d="M 19,60 A 41,41 0 0 0 101,60" fill="none" />
      </defs>

      <circle cx="60" cy="60" r="57" fill={fill} />
      <circle cx="60" cy="60" r="57" fill="none" stroke={accent} strokeOpacity="0.6" strokeWidth="2" />
      <circle cx="60" cy="60" r="50" fill="none" stroke={accent} strokeOpacity="0.3" strokeWidth="1" />
      <circle cx="60" cy="60" r="34" fill="none" stroke={accent} strokeOpacity="0.35" strokeWidth="1" />

      <text fill={accent} fillOpacity="0.9" fontSize="9" fontWeight="700" letterSpacing="1.1">
        <textPath href={`#${topArc}`} startOffset="50%" textAnchor="middle">
          {top}
        </textPath>
      </text>
      <text fill={accent} fillOpacity="0.6" fontSize="7.5" fontWeight="700" letterSpacing="1.4">
        <textPath href={`#${bottomArc}`} startOffset="50%" textAnchor="middle">
          {bottom}
        </textPath>
      </text>

      {/* Pips where the two arcs meet, as on a pressed stamp */}
      <circle cx="12.5" cy="60" r="1.6" fill={accent} fillOpacity="0.55" />
      <circle cx="107.5" cy="60" r="1.6" fill={accent} fillOpacity="0.55" />

      <text
        x="60"
        y="60"
        textAnchor="middle"
        dominantBaseline="central"
        fill={accent}
        fontSize={center.length > 2 ? 19 : 23}
        fontWeight="800"
        letterSpacing="1.5"
      >
        {center}
      </text>
    </svg>
  );
}
