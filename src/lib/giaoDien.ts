/**
 * Chế độ hiển thị của site: "toi" (nền tối dịu, mặc định) và "sang" (nền giấy).
 *
 * Lựa chọn lưu ở localStorage; nếu người dùng chưa chọn thì theo cài đặt hệ
 * điều hành (prefers-color-scheme). Script trong index.html đặt sẵn thuộc tính
 * trước khi React chạy để không bị nháy trắng/đen lúc tải.
 */
import { useEffect, useState } from 'react';

export type GiaoDien = 'toi' | 'sang';

const KHOA = 'tuvi:giao-dien';
const SU_KIEN = 'tuvi:giao-dien';

export function docGiaoDien(): GiaoDien {
  if (typeof window === 'undefined') return 'toi';
  try {
    const v = window.localStorage.getItem(KHOA);
    if (v === 'sang' || v === 'toi') return v;
  } catch {
    /* chế độ riêng tư có thể chặn localStorage */
  }
  return window.matchMedia?.('(prefers-color-scheme: light)').matches ? 'sang' : 'toi';
}

export function apGiaoDien(g: GiaoDien): void {
  const r = document.documentElement;
  r.dataset.giaoDien = g;
  r.style.colorScheme = g === 'sang' ? 'light' : 'dark';
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', g === 'sang' ? '#f6f2e9' : '#0e1219');
}

export function datGiaoDien(g: GiaoDien): void {
  try {
    window.localStorage.setItem(KHOA, g);
  } catch {
    /* không lưu được thì vẫn đổi cho phiên này */
  }
  apGiaoDien(g);
  window.dispatchEvent(new Event(SU_KIEN));
}

/** Đọc theme hiện tại và trả về hàm đảo theme. */
export function useGiaoDien(): { giaoDien: GiaoDien; doi: () => void } {
  const [giaoDien, setGiaoDien] = useState<GiaoDien>(() =>
    document.documentElement.dataset.giaoDien === 'sang' ? 'sang' : 'toi',
  );

  useEffect(() => {
    const capNhat = () =>
      setGiaoDien(document.documentElement.dataset.giaoDien === 'sang' ? 'sang' : 'toi');
    window.addEventListener(SU_KIEN, capNhat);
    return () => window.removeEventListener(SU_KIEN, capNhat);
  }, []);

  const doi = () => datGiaoDien(giaoDien === 'sang' ? 'toi' : 'sang');

  return { giaoDien, doi };
}
