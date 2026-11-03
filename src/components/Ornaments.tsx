/**
 * Hoạ tiết trang trí thuần SVG — không ảnh, không request mạng.
 * Tông: vàng kim trên nền mực, gợi bàn sao và la bàn cổ.
 */

interface SvgProps {
  className?: string;
}

/** Dải sao mờ cho phần hero */
export function StarField({ className = '' }: SvgProps) {
  const sao = [
    [8, 18, 1.1], [21, 7, 0.8], [33, 26, 1.4], [46, 12, 0.9], [58, 30, 1.2],
    [70, 9, 1.0], [82, 22, 1.5], [93, 14, 0.8], [14, 38, 1.0], [27, 47, 0.7],
    [41, 41, 1.2], [55, 52, 0.9], [68, 44, 1.3], [79, 55, 0.8], [91, 40, 1.1],
    [5, 56, 0.9], [36, 60, 0.7], [62, 63, 1.0], [88, 62, 0.8], [18, 68, 1.2],
  ];
  return (
    <svg
      className={`ornament ornament-stars ${className}`}
      viewBox="0 0 100 75"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {sao.map(([cx, cy, r], i) => (
        <circle key={i} cx={cx} cy={cy} r={r * 0.18} fill="currentColor" opacity={0.35 + (i % 3) * 0.18} />
      ))}
    </svg>
  );
}

/** Vòng la bàn 12 cung — đặt mờ sau thẻ trung tâm */
export function BaguaRing({ className = '' }: SvgProps) {
  const chi = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];
  return (
    <svg className={`ornament ornament-ring ${className}`} viewBox="0 0 200 200" aria-hidden="true">
      <defs>
        <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.42" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.08" />
        </linearGradient>
      </defs>
      <circle cx="100" cy="100" r="92" fill="none" stroke="url(#ringGrad)" strokeWidth="0.7" />
      <circle cx="100" cy="100" r="78" fill="none" stroke="currentColor" strokeWidth="0.4" opacity="0.25" />
      <circle cx="100" cy="100" r="54" fill="none" stroke="currentColor" strokeWidth="0.4" opacity="0.18" />
      {chi.map((c, i) => {
        const a = (i * 30 * Math.PI) / 180 - Math.PI / 2;
        const x = 100 + Math.cos(a) * 85;
        const y = 100 + Math.sin(a) * 85;
        return (
          <text
            key={c}
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize="6.5"
            fill="currentColor"
            opacity="0.32"
            fontFamily="Noto Serif, serif"
          >
            {c}
          </text>
        );
      })}
      {Array.from({ length: 12 }, (_, i) => {
        const a = (i * 30 * Math.PI) / 180 - Math.PI / 2;
        return (
          <line
            key={`l${i}`}
            x1={100 + Math.cos(a) * 78}
            y1={100 + Math.sin(a) * 78}
            x2={100 + Math.cos(a) * 92}
            y2={100 + Math.sin(a) * 92}
            stroke="currentColor"
            strokeWidth="0.5"
            opacity="0.22"
          />
        );
      })}
    </svg>
  );
}

/** Góc trang trí cho khung lá số */
export function CornerMark({ className = '' }: SvgProps) {
  return (
    <svg className={`ornament ornament-corner ${className}`} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M1 9V5a4 4 0 0 1 4-4h4M1 9l2-2M9 1L7 3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Đường phân cách có hoa văn */
export function Divider({ className = '' }: SvgProps) {
  return (
    <svg className={`ornament ornament-divider ${className}`} viewBox="0 0 300 18" aria-hidden="true">
      <line x1="0" y1="9" x2="120" y2="9" stroke="currentColor" strokeWidth="0.6" opacity="0.3" />
      <line x1="180" y1="9" x2="300" y2="9" stroke="currentColor" strokeWidth="0.6" opacity="0.3" />
      <circle cx="150" cy="9" r="2.6" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.55" />
      <circle cx="150" cy="9" r="1" fill="currentColor" opacity="0.6" />
      <circle cx="138" cy="9" r="1.1" fill="currentColor" opacity="0.35" />
      <circle cx="162" cy="9" r="1.1" fill="currentColor" opacity="0.35" />
      <path d="M142 9l4-3.2v6.4z" fill="currentColor" opacity="0.3" />
      <path d="M158 9l-4-3.2v6.4z" fill="currentColor" opacity="0.3" />
    </svg>
  );
}
