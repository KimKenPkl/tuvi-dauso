/**
 * Luận dãy số (số điện thoại, biển số xe) — khởi quẻ theo Mai Hoa Dịch Số.
 *
 * CĂN CỨ CỔ:
 * 1. 梅花易數 (Mai Hoa Dịch Số, Thiệu Ung đời Tống) — phép "số khởi quái":
 *      thượng quái = tổng nửa đầu  ÷ 8 lấy dư
 *      hạ quái    = tổng nửa sau   ÷ 8 lấy dư
 *      động hào   = tổng cả dãy    ÷ 6 lấy dư
 *    Dư 0 thì lấy 8 (quái) hoặc 6 (hào). Đây là phép "chia đôi dãy số" mà các
 *    sách dạy bói sim/biển số đang dùng, gốc chính là số khởi quái của Mai Hoa.
 * 2. Tiên thiên bát quái số (先天八卦數): Càn 1, Đoài 2, Ly 3, Chấn 4,
 *    Tốn 5, Khảm 6, Cấn 7, Khôn 8.
 * 3. Hà Đồ (河圖) phối ngũ hành: 1–6 Thuỷ, 2–7 Hoả, 3–8 Mộc, 4–9 Kim, 5–0 Thổ.
 *
 * Những gì KHÔNG làm: không chấm điểm 1–10, không bịa bảng "80 linh số" —
 * các bảng đó mỗi nơi một khác và không có nguồn cổ thống nhất.
 */

import {
  NHI_PHAN_QUAI,
  QUE,
  queTheoHao,
  type Que,
  type TenQuai,
} from './kinhDich';
import { xemPhongThuy } from './phongThuy';

/** Tiên thiên bát quái số → tên quái */
const TIEN_THIEN: Record<number, TenQuai> = {
  1: 'Càn',
  2: 'Đoài',
  3: 'Ly',
  4: 'Chấn',
  5: 'Tốn',
  6: 'Khảm',
  7: 'Cấn',
  8: 'Khôn',
};

const THEO_QUAI = new Map<string, Que>(
  QUE.map((q) => [`${q.tren}|${q.duoi}`, q] as const),
);

const HANH_SO: Record<number, 'Thuỷ' | 'Hoả' | 'Mộc' | 'Kim' | 'Thổ'> = {
  1: 'Thuỷ',
  6: 'Thuỷ',
  2: 'Hoả',
  7: 'Hoả',
  3: 'Mộc',
  8: 'Mộc',
  4: 'Kim',
  9: 'Kim',
  5: 'Thổ',
  0: 'Thổ',
};

const SINH: Record<string, string> = {
  Mộc: 'Hoả',
  Hoả: 'Thổ',
  Thổ: 'Kim',
  Kim: 'Thuỷ',
  Thuỷ: 'Mộc',
};

const KHAC: Record<string, string> = {
  Mộc: 'Thổ',
  Thổ: 'Thuỷ',
  Thuỷ: 'Hoả',
  Hoả: 'Kim',
  Kim: 'Mộc',
};

export interface MauSo {
  key: string;
  ten: string;
  moTa: string;
  tot: boolean;
}

export interface KetQuaDaySo {
  /** Dãy số đã tách, chỉ còn chữ số */
  daySo: string;
  soLuong: number;
  tong: number;
  /** Tổng rút gọn về 1 chữ số (1–9) */
  nut: number;
  hanh: string;
  thuongQuai: TenQuai;
  haQuai: TenQuai;
  haoDong: number;
  que: Que;
  bien: Que | null;
  mau: MauSo[];
  /** Quan hệ ngũ hành với bản mệnh người dùng (nếu có năm sinh) */
  quanHeMenh: { hanhMenh: string; quanHe: string; tot: boolean } | null;
}

/** Chỉ giữ chữ số. */
export function tachSo(raw: string): string {
  return raw.replace(/\D+/g, '');
}

function rutGon(n: number): number {
  let x = n;
  while (x > 9) x = String(x).split('').reduce((s, c) => s + Number(c), 0);
  return x;
}

function doiHao(q: Que, viTri: number): Que | null {
  const bits = (NHI_PHAN_QUAI[q.duoi] + NHI_PHAN_QUAI[q.tren]).split('');
  const i = viTri - 1;
  if (i < 0 || i > 5) return null;
  bits[i] = bits[i] === '1' ? '0' : '1';
  return queTheoHao(bits.map((b) => (b === '1' ? 7 : 8)));
}

/** Nhận diện các mẫu số thường được ưa chuộng (chỉ mô tả hình thức, không phán vận). */
export function timMauSo(day: string): MauSo[] {
  const ds: MauSo[] = [];
  const co = (re: RegExp) => re.test(day);

  if (co(/(\d)\1{3,}/)) {
    ds.push({ key: 'tu-quy', ten: 'Tứ quý', moTa: 'Bốn số giống nhau liền nhau', tot: true });
  } else if (co(/(\d)\1{2,}/)) {
    ds.push({ key: 'tam-hoa', ten: 'Tam hoa', moTa: 'Ba số giống nhau liền nhau', tot: true });
  }
  if (co(/68|86/)) {
    ds.push({ key: 'loc-phat', ten: 'Lộc phát', moTa: 'Có cặp 68 / 86', tot: true });
  }
  if (co(/39|79/)) {
    ds.push({ key: 'than-tai', ten: 'Thần tài', moTa: 'Có cặp 39 / 79', tot: true });
  }
  if (co(/38|78/)) {
    ds.push({ key: 'ong-dia', ten: 'Ông địa', moTa: 'Có cặp 38 / 78', tot: true });
  }
  if (/(012|123|234|345|456|567|678|789)/.test(day)) {
    ds.push({ key: 'tien', ten: 'Tiến lên', moTa: 'Ba số liên tiếp tăng dần', tot: true });
  }
  if (/(\d)(\d)\2\1/.test(day)) {
    ds.push({ key: 'ganh', ten: 'Số gánh', moTa: 'Cặp số đối xứng kiểu abba', tot: true });
  }
  if (/(\d)\1{1}/.test(day) && !ds.some((m) => m.key === 'tu-quy' || m.key === 'tam-hoa')) {
    ds.push({ key: 'lap', ten: 'Số lặp', moTa: 'Có cặp số giống nhau', tot: true });
  }
  return ds.slice(0, 4);
}

export function phanTichDaySo(raw: string, namSinh?: number | null): KetQuaDaySo | null {
  const daySo = tachSo(raw);
  if (daySo.length < 4 || daySo.length > 15) return null;

  const so = daySo.split('').map(Number);
  const tong = so.reduce((s, x) => s + x, 0);
  const nut = rutGon(tong);

  const giua = Math.ceil(so.length / 2);
  const dau = so.slice(0, giua).reduce((s, x) => s + x, 0);
  const cuoi = so.slice(giua).reduce((s, x) => s + x, 0);

  const thuongSo = dau % 8 === 0 ? 8 : dau % 8;
  const haSo = cuoi % 8 === 0 ? 8 : cuoi % 8;
  const haoDong = tong % 6 === 0 ? 6 : tong % 6;

  const thuongQuai = TIEN_THIEN[thuongSo];
  const haQuai = TIEN_THIEN[haSo];
  const que = THEO_QUAI.get(`${thuongQuai}|${haQuai}`);
  if (!que) return null;

  const hanh = HANH_SO[so[so.length - 1]];

  let quanHeMenh: KetQuaDaySo['quanHeMenh'] = null;
  if (namSinh && namSinh > 1800 && namSinh < 2200) {
    const menh = xemPhongThuy(namSinh, 'Nam').hanhBanMenh;
    let quanHe = 'Bình hoà';
    let tot = true;
    if (SINH[hanh] === menh) quanHe = `Dãy số (${hanh}) sinh cho bản mệnh (${menh})`;
    else if (SINH[menh] === hanh) quanHe = `Bản mệnh (${menh}) sinh cho dãy số (${hanh}) — hao nhẹ`;
    else if (hanh === menh) quanHe = `Cùng hành ${hanh} — hoà`;
    else if (KHAC[hanh] === menh) {
      quanHe = `Dãy số (${hanh}) khắc bản mệnh (${menh})`;
      tot = false;
    } else if (KHAC[menh] === hanh) {
      quanHe = `Bản mệnh (${menh}) khắc được dãy số (${hanh}) — tạm ổn`;
      tot = true;
    }
    quanHeMenh = { hanhMenh: menh, quanHe, tot };
  }

  return {
    daySo,
    soLuong: daySo.length,
    tong,
    nut,
    hanh,
    thuongQuai,
    haQuai,
    haoDong,
    que,
    bien: doiHao(que, haoDong),
    mau: timMauSo(daySo),
    quanHeMenh,
  };
}
