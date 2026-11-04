import type { CSSProperties, ReactNode } from 'react';

/** Khối nhập liệu dùng chung cho các công cụ phương Đông. */
export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <span style={{ color: 'var(--muted)', fontSize: 12, letterSpacing: '0.04em' }}>{label}</span>
      {children}
      {hint && <span style={{ color: 'var(--muted-2)', fontSize: 11.5 }}>{hint}</span>}
    </label>
  );
}

export const inputStyle: CSSProperties = {
  padding: '9px 12px',
  borderRadius: 9,
  border: '1px solid var(--line)',
  background: 'var(--sheen-1)',
  color: 'var(--text)',
  fontSize: 14.5,
  fontFamily: 'inherit',
  width: '100%',
};

export function Pill({
  children,
  tone = 'gold',
}: {
  children: ReactNode;
  tone?: 'gold' | 'green' | 'red' | 'muted' | 'blue';
}) {
  const map = {
    gold: ['var(--gold-2)', 'var(--gold-mo)', 'var(--line-strong)'],
    green: ['var(--green)', 'var(--green-mo)', 'var(--green-vien)'],
    red: ['var(--red)', 'var(--red-mo)', 'var(--red-vien)'],
    blue: ['var(--blue)', 'var(--blue-mo)', 'var(--blue-vien)'],
    muted: ['var(--muted)', 'var(--sheen-2)', 'var(--line)'],
  }[tone];
  return (
    <span
      style={{
        display: 'inline-block',
        padding: '3px 10px',
        borderRadius: 999,
        fontSize: 11.5,
        fontWeight: 600,
        letterSpacing: '0.02em',
        color: map[0],
        background: map[1],
        border: `1px solid ${map[2]}`,
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </span>
  );
}

export function Card({
  children,
  style,
}: {
  children: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <div
      style={{
        padding: 16,
        borderRadius: 12,
        background: 'var(--sheen-1)',
        border: '1px solid var(--line)',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function GhiChu({ children }: { children: ReactNode }) {
  return (
    <p
      style={{
        margin: 0,
        padding: '12px 14px',
        borderRadius: 10,
        background: 'var(--sheen-1)',
        border: '1px solid var(--line)',
        color: 'var(--muted)',
        fontSize: 12.5,
        lineHeight: 1.7,
      }}
    >
      {children}
    </p>
  );
}

export function NutChon<T extends string>({
  value,
  options,
  onChange,
}: {
  value: T;
  options: readonly T[];
  onChange: (v: T) => void;
}) {
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {options.map((o) => (
        <button
          key={o}
          type="button"
          onClick={() => onChange(o)}
          style={{
            padding: '8px 16px',
            borderRadius: 999,
            fontFamily: 'inherit',
            fontSize: 13.5,
            cursor: 'pointer',
            color: value === o ? 'var(--gold-2)' : 'var(--muted)',
            background: value === o ? 'var(--gold-mo)' : 'transparent',
            border: `1px solid ${value === o ? 'var(--line-strong)' : 'var(--line)'}`,
          }}
        >
          {o}
        </button>
      ))}
    </div>
  );
}
