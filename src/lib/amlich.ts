/**
 * Âm lịch Việt Nam — chuyển đổi Dương → Âm, Can Chi và 12 Trực.
 *
 * Phần chuyển đổi Dương → Âm dùng `lunar-lite` (cùng engine mà `iztro` dùng để
 * an sao), nhờ vậy ngày âm hiển thị trên thanh công cụ luôn khớp với lá số
 * đang lập. Can Chi và 12 Trực tính tại chỗ bằng công thức cổ điển, không gọi
 * mạng và không phụ thuộc thêm thư viện nào.
 */

import { solar2lunar } from 'lunar-lite';

export const CAN = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'] as const;
export const CHI = [
  'Tý',
  'Sửu',
  'Dần',
  'Mão',
  'Thìn',
  'Tỵ',
  'Ngọ',
  'Mùi',
  'Thân',
  'Dậu',
  'Tuất',
  'Hợi',
] as const;

export const TRUC = [
  'Kiến',
  'Trừ',
  'Mãn',
  'Bình',
  'Định',
  'Chấp',
  'Phá',
  'Nguy',
  'Thành',
  'Thu',
  'Khai',
  'Bế',
] as const;

export type Truc = (typeof TRUC)[number];

/**
 * Sáu trực thuộc Hoàng Đạo theo cách phân loại phổ thông (lục cát).
 * Đây là cách rút gọn thường thấy trên lịch Việt; các bảng chi tiết hơn còn
 * xét cả trực và giờ, nên chỉ nên xem đây là gợi ý tham khảo.
 */
const TRUC_HOANG_DAO = new Set<Truc>(['Trừ', 'Mãn', 'Bình', 'Định', 'Thành', 'Khai']);

export interface AmLich {
  /** Ngày âm (1–30) */
  ngay: number;
  /** Tháng âm (1–12) */
  thang: number;
  /** Năm âm */
  nam: number;
  /** Tháng này có phải tháng nhuận không */
  nhuan: boolean;
  /** Can Chi của ngày, ví dụ "Giáp Thìn" */
  canChiNgay: string;
  /** Can Chi của tháng âm */
  canChiThang: string;
  /** Can Chi của năm âm */
  canChiNam: string;
  /** 12 Trực của ngày */
  truc: Truc;
  /** Ngày Hoàng Đạo (cát) hay Hắc Đạo (hung) */
  hoangDao: boolean;
  /** Chuỗi hiển thị gọn: "14/10 · Giáp Thìn · Trực Bình (Hoàng Đạo)" */
  nhan: string;
}

const mod = (a: number, n: number) => ((a % n) + n) % n;

/** Ngày Julius từ ngày Dương lịch (không xét giờ trong ngày). */
export function jdFromDate(dd: number, mm: number, yy: number): number {
  const a = Math.floor((14 - mm) / 12);
  const y = yy + 4800 - a;
  const m = mm + 12 * a - 3;
  let jd =
    dd +
    Math.floor((153 * m + 2) / 5) +
    365 * y +
    Math.floor(y / 4) -
    Math.floor(y / 100) +
    Math.floor(y / 400) -
    32045;
  if (jd < 2299161) {
    jd = dd + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - 32083;
  }
  return jd;
}

/** Can Chi của ngày Julius. */
export function canChiNgay(jd: number): string {
  return `${CAN[mod(jd + 9, 10)]} ${CHI[mod(jd + 1, 12)]}`;
}

/** Can Chi của năm âm lịch. */
export function canChiNam(namAm: number): string {
  return `${CAN[mod(namAm + 6, 10)]} ${CHI[mod(namAm + 8, 12)]}`;
}

/**
 * Can Chi của tháng âm.
 * Can tháng 1 khởi từ Bính/Đinh/Mậu/Kỷ/Nhâm tùy can năm; chi tháng 1 là Dần.
 */
export function canChiThang(thangAm: number, namAm: number): string {
  const canNam = mod(namAm + 6, 10);
  const canThang = mod(canNam * 2 + thangAm + 1, 10);
  const chiThang = mod(thangAm + 1, 12);
  return `${CAN[canThang]} ${CHI[chiThang]}`;
}

/** 12 Trực của ngày: so chi ngày với chi tháng (tháng 1 = Dần). */
export function trucCuaNgay(chiNgay: number, thangAm: number): Truc {
  return TRUC[mod(chiNgay - mod(thangAm + 1, 12), 12)];
}

/** Thông tin Âm lịch đầy đủ của một ngày Dương lịch. */
export function amLichCuaNgay(ngayDuong: Date): AmLich {
  const dd = ngayDuong.getDate();
  const mm = ngayDuong.getMonth() + 1;
  const yy = ngayDuong.getFullYear();

  const lunar = solar2lunar(`${yy}-${mm}-${dd}`);
  const jd = jdFromDate(dd, mm, yy);
  const chiNgay = mod(jd + 1, 12);
  const truc = trucCuaNgay(chiNgay, lunar.lunarMonth);
  const hoangDao = TRUC_HOANG_DAO.has(truc);
  const ccn = canChiNgay(jd);

  return {
    ngay: lunar.lunarDay,
    thang: lunar.lunarMonth,
    nam: lunar.lunarYear,
    nhuan: lunar.isLeap,
    canChiNgay: ccn,
    canChiThang: canChiThang(lunar.lunarMonth, lunar.lunarYear),
    canChiNam: canChiNam(lunar.lunarYear),
    truc,
    hoangDao,
    nhan: `${lunar.lunarDay}/${lunar.lunarMonth}${lunar.isLeap ? ' nhuận' : ''} · ${ccn} · Trực ${truc} (${
      hoangDao ? 'Hoàng Đạo' : 'Hắc Đạo'
    })`,
  };
}

/** Âm lịch của hôm nay (theo ngày trên máy người dùng). */
export function amLichHomNay(): AmLich {
  return amLichCuaNgay(new Date());
}
