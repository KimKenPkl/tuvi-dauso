import { useEffect, useState, type AnchorHTMLAttributes, type ReactNode } from 'react';

/**
 * Router tối giản, không phụ thuộc thư viện.
 *
 * Dùng History API để mỗi công cụ có URL riêng (tốt cho chia sẻ và SEO).
 * Vì GitHub Pages không tự trả index.html cho đường dẫn con, `404.html` sẽ
 * chuyển hướng về `/?p=<đường-dẫn>` rồi `khoiPhucDuong()` trả lại URL đẹp.
 */

/** Base do Vite chèn: '' khi dev, '/tuvi-viet' khi build cho GitHub Pages. */
export const BASE = import.meta.env.BASE_URL.replace(/\/+$/, '');

const SU_KIEN = 'tuvi:dieu-huong';

/** Ghép base vào một đường dẫn nội bộ. */
export function href(duong: string): string {
  const d = duong.startsWith('/') ? duong : `/${duong}`;
  return `${BASE}${d}`;
}

/** Đường dẫn hiện tại, đã bỏ base và dấu / cuối. */
export function docDuong(): string {
  let p = window.location.pathname;
  if (BASE && p.startsWith(BASE)) p = p.slice(BASE.length);
  if (!p.startsWith('/')) p = `/${p}`;
  p = p.replace(/\/+$/, '');
  return p || '/';
}

export function chuyen(duong: string, thayThe = false): void {
  const url = href(duong);
  const hienTai = `${window.location.pathname}${window.location.search}`;
  if (url === hienTai) return;
  if (thayThe) window.history.replaceState(null, '', url);
  else window.history.pushState(null, '', url);
  window.dispatchEvent(new Event(SU_KIEN));
  window.scrollTo(0, 0);
}

export function useDuong(): string {
  const [duong, setDuong] = useState<string>(() => docDuong());
  useEffect(() => {
    const capNhat = () => setDuong(docDuong());
    window.addEventListener('popstate', capNhat);
    window.addEventListener(SU_KIEN, capNhat);
    return () => {
      window.removeEventListener('popstate', capNhat);
      window.removeEventListener(SU_KIEN, capNhat);
    };
  }, []);
  return duong;
}

type Props = { to: string; children: ReactNode } & Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  'href'
>;

/** Thẻ <a> nội bộ: giữ khả năng mở tab mới, nhưng điều hướng mượt khi bấm thường. */
export function LienKet({ to, children, onClick, ...rest }: Props) {
  return (
    <a
      {...rest}
      href={href(to)}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
          return;
        }
        e.preventDefault();
        chuyen(to);
      }}
    >
      {children}
    </a>
  );
}

/** Trả lại URL đẹp sau khi GitHub Pages trả 404.html. Gọi một lần trước khi render. */
export function khoiPhucDuong(): void {
  const q = new URLSearchParams(window.location.search);
  const p = q.get('p');
  if (!p) return;
  q.delete('p');
  const con = q.toString();
  const url = `${href(p)}${con ? `?${con}` : ''}${window.location.hash}`;
  window.history.replaceState(null, '', url);
}

/** Cập nhật title / description / canonical theo từng trang. */
export function useMeta(tieuDe: string, moTa: string): void {
  useEffect(() => {
    document.title = tieuDe;

    const datMeta = (attr: 'name' | 'property', khoa: string, noiDung: string) => {
      let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${khoa}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, khoa);
        document.head.appendChild(el);
      }
      el.setAttribute('content', noiDung);
    };

    datMeta('name', 'description', moTa);
    datMeta('property', 'og:title', tieuDe);
    datMeta('property', 'og:description', moTa);

    let canon = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canon) {
      canon = document.createElement('link');
      canon.rel = 'canonical';
      document.head.appendChild(canon);
    }
    canon.href = `https://kimkenpkl.github.io${href(docDuong())}`;
  }, [tieuDe, moTa]);
}
