import type { BirthInput, LaSo } from './chart';
import { CHI } from './canLuong';

/**
 * Ngữ cảnh gọn để các công cụ Phương Đông điền sẵn thông tin.
 *
 * Cố ý không truyền cả `LaSo` sang trang công cụ: làm vậy sẽ kéo `iztro`
 * (~700 kB) vào mọi trang. Chỉ cần 6 trường dưới đây là đủ.
 */
export interface NguCanh {
  ten: string;
  gioiTinh: 'Nam' | 'Nữ';
  /** Ngày âm lịch */
  ngay: number;
  /** Tháng âm lịch */
  thang: number;
  /** Năm âm lịch */
  nam: number;
  /** Chi giờ sinh, ví dụ "Tý" */
  gioChi: string;
}

const KHOA = 'tuvi:phien';

export interface Phien {
  input: BirthInput;
  namXem: number;
  nguCanh: NguCanh | null;
}

export function nguCanhTuLaSo(laSo: LaSo): NguCanh {
  return {
    ten: laSo.ten,
    gioiTinh: laSo.gioiTinh,
    ngay: laSo.amLichSo.ngay,
    thang: laSo.amLichSo.thang,
    nam: laSo.amLichSo.nam,
    gioChi: CHI[laSo.gio.index % 12] ?? 'Tý',
  };
}

/** Lưu phiên làm việc để chuyển trang không mất lá số đang xem. */
export function luuPhien(p: Phien): void {
  try {
    sessionStorage.setItem(KHOA, JSON.stringify(p));
  } catch {
    /* trình duyệt chặn storage — bỏ qua */
  }
}

export function docPhien(): Phien | null {
  try {
    const raw = sessionStorage.getItem(KHOA);
    if (!raw) return null;
    const p = JSON.parse(raw) as Phien;
    if (!p?.input?.ngay) return null;
    return p;
  } catch {
    return null;
  }
}

export function xoaPhien(): void {
  try {
    sessionStorage.removeItem(KHOA);
  } catch {
    /* bỏ qua */
  }
}
