import { useId } from 'react';

/**
 * Sao Nhi — linh vật của Tử Vi Việt.
 *
 * Một đốm sao nhỏ đội vòng quỹ đạo, mắt nhắm cong: gợi "ngôi sao đang ngủ"
 * chứ không phải ông thầy bói. Vẽ thuần SVG, không ảnh, không request mạng,
 * nên hiện được cả trong ảnh xuất (html-to-image) lẫn bìa PDF.
 */
interface Props {
  size?: number;
  className?: string;
}

export default function LinhVat({ size = 96, className = '' }: Props) {
  // useId sinh chuỗi có dấu ":" — không dùng được trong url(#...), phải lọc.
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const than = `lv-than-${uid}`;
  const quang = `lv-quang-${uid}`;

  return (
    <svg
      className={`linh-vat ${className}`}
      width={size}
      height={size}
      viewBox="0 0 120 120"
      role="img"
      aria-label="Sao Nhi — linh vật Tử Vi Việt"
    >
      <defs>
        <linearGradient id={than} x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0%" stopColor="#f9e7bb" />
          <stop offset="52%" stopColor="#e3bf7e" />
          <stop offset="100%" stopColor="#b98a41" />
        </linearGradient>
        <radialGradient id={quang} cx="50%" cy="46%" r="50%">
          <stop offset="0%" stopColor="#e9c98d" stopOpacity="0.3" />
          <stop offset="70%" stopColor="#e9c98d" stopOpacity="0.06" />
          <stop offset="100%" stopColor="#e9c98d" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="60" cy="62" r="54" fill={`url(#${quang})`} />

      {/* Vòng quỹ đạo: dấu hiệu "sao đang chạy", và là chi tiết nhận diện khi thu nhỏ. */}
      <g transform="rotate(-19 60 62)">
        <ellipse
          cx="60"
          cy="62"
          rx="49"
          ry="15"
          fill="none"
          stroke="#d8b579"
          strokeOpacity="0.4"
          strokeWidth="1.3"
        />
        <circle cx="13" cy="62" r="2.7" fill="#efd9a6" />
        <circle cx="107" cy="62" r="3.5" fill="#d8b579" />
      </g>

      {/* Thân: hơi giọt nước để không phải hình tròn vô hồn. */}
      <path
        d="M60 27c20 0 33 15 33 35S80 99 60 99 27 82 27 62s13-35 33-35z"
        fill={`url(#${than})`}
      />
      <path
        d="M60 27c20 0 33 15 33 35 0 3-.4 6-1.1 8.9C88 51.6 76 42 60 42S32 51.6 28.1 70.9C27.4 68 27 65 27 62c0-20 13-35 33-35z"
        fill="#fff6de"
        opacity="0.25"
      />

      {/* Ngôi sao trên đầu: mũ miện, đồng thời là "dấu chấm" khi in nhỏ. */}
      <path
        d="M60 4l3.3 8.2 8.8.7-6.7 5.8 2 8.6L60 22.7l-7.4 4.6 2-8.6-6.7-5.8 8.8-.7z"
        fill="#fdf1d3"
        stroke="#a4752c"
        strokeWidth="1.1"
        strokeLinejoin="round"
      />

      {/* Mắt nhắm cong + má hồng: thân thiện ở mọi kích thước. */}
      <path
        d="M44 63q5.4 5.2 10.8 0M64 63q5.4 5.2 10.8 0"
        fill="none"
        stroke="#3b2a0f"
        strokeWidth="2.7"
        strokeLinecap="round"
      />
      <ellipse cx="41" cy="72" rx="4.6" ry="2.9" fill="#d97361" opacity="0.26" />
      <ellipse cx="79" cy="72" rx="4.6" ry="2.9" fill="#d97361" opacity="0.26" />
      <path
        d="M55.4 73.6q4.6 3.8 9.2 0"
        fill="none"
        stroke="#3b2a0f"
        strokeWidth="2.3"
        strokeLinecap="round"
      />

      {/* Hai tay nhỏ ôm quyển sổ: linh vật của một công cụ tra cứu. */}
      <path
        d="M31 76q-5 4-4 10M89 76q5 4 4 10"
        fill="none"
        stroke="#a4752c"
        strokeWidth="2.2"
        strokeLinecap="round"
        opacity="0.75"
      />
      <rect
        x="50"
        y="84"
        width="20"
        height="15"
        rx="2.6"
        fill="#fdf1d3"
        stroke="#a4752c"
        strokeWidth="1.4"
      />
      <path d="M60 84v15" stroke="#a4752c" strokeWidth="1.1" opacity="0.75" />
    </svg>
  );
}
