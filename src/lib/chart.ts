/**
 * Lõi tính lá số Tử Vi Đẩu Số.
 *
 * Dùng `iztro` (MIT) làm engine an sao — engine này đã được kiểm chứng qua
 * hàng nghìn lá số và có bộ test hồi quy riêng. Toàn bộ nhãn tiếng Trung
 * được chuyển sang tiếng Việt bằng lớp `dict.ts` do dự án tự viết.
 */

import { astro } from 'iztro';
import {
  BRANCH_VI,
  FIVE_ELEMENTS_VI,
  GIO_SINH,
  MUTAGEN_VI,
  PALACE_VI,
  SIGN_VI,
  STAR_VI,
  STEM_VI,
  ZODIAC_VI,
  gioSangIndex,
  indexSangGio,
  type GioSinh,
} from './dict';

// ─────────────────────────────────────────────────────────────────
// Kiểu dữ liệu
// ─────────────────────────────────────────────────────────────────

export type GioiTinh = 'Nam' | 'Nữ';
export type LoaiLich = 'duong' | 'am';

export interface BirthInput {
  ten?: string;
  gioiTinh: GioiTinh;
  lich: LoaiLich;
  /** yyyy-mm-dd */
  ngay: string;
  /** 0..12 theo bảng GIO_SINH */
  gio: number;
  /** Chỉ dùng khi lich = 'am' */
  thangNhuan?: boolean;
  /** Tuỳ chọn: kinh độ nơi sinh để quy đổi giờ thật (true solar time) */
  kinhDo?: number | null;
  /** Có áp dụng chỉnh giờ thật hay không */
  dungGioThat?: boolean;
}

export interface Sao {
  ten: string;
  tenGoc: string;
  loai: 'chinh' | 'phu' | 'tap' | 'luu';
  doSang?: string;
  tuHoa?: string;
  scope?: string;
}

export interface DaiHan {
  tuoiBatDau: number;
  tuoiKetThuc: number;
  can: string;
  chi: string;
}

export interface Cung {
  index: number;
  ten: string;
  tenGoc: string;
  can: string;
  chi: string;
  laThan: boolean;
  laLaiNhan: boolean;
  chinhTinh: Sao[];
  phuTinh: Sao[];
  tapTinh: Sao[];
  truongSinh: string;
  bacSi: string;
  tuongTinh: string;
  tueTien: string;
  daiHan: DaiHan;
  tieuHan: number[];
  /** Vị trí trên lưới 4×4 */
  row: number;
  col: number;
}

export interface Tru {
  can: string;
  chi: string;
  nhan: string;
}

export interface LaSo {
  ten: string;
  gioiTinh: GioiTinh;
  duongLich: string;
  amLich: string;
  amLichSo: { ngay: number; thang: number; nam: number; nhuan: boolean };
  tuTru: Tru[];
  gio: GioSinh;
  gioDaChinh: boolean;
  cuc: string;
  conGiap: string;
  cungHoangDao: string;
  menhChu: string;
  thanChu: string;
  menhCung: string;
  thanCung: string;
  cung: Cung[];
  duLieuGoc: unknown;
}

// ─────────────────────────────────────────────────────────────────
// Bố cục 12 cung trên lưới 4×4 (chuẩn: Tý ở dưới, đi ngược chiều kim đồng hồ)
//
//   Tỵ   Ngọ  Mùi  Thân
//   Thìn  [trung tâm]  Dậu
//   Mão   [trung tâm]  Tuất
//   Dần  Sửu  Tý   Hợi
// ─────────────────────────────────────────────────────────────────

const LUOI: Record<string, { row: number; col: number }> = {
  Tỵ: { row: 0, col: 0 },
  Ngọ: { row: 0, col: 1 },
  Mùi: { row: 0, col: 2 },
  Thân: { row: 0, col: 3 },
  Thìn: { row: 1, col: 0 },
  Dậu: { row: 1, col: 3 },
  Mão: { row: 2, col: 0 },
  Tuất: { row: 2, col: 3 },
  Dần: { row: 3, col: 0 },
  Sửu: { row: 3, col: 1 },
  Tý: { row: 3, col: 2 },
  Hợi: { row: 3, col: 3 },
};

// ─────────────────────────────────────────────────────────────────
// Tiện ích
// ─────────────────────────────────────────────────────────────────

const pad = (n: number) => String(n).padStart(2, '0');

function branchVi(b: string): string {
  return BRANCH_VI[b] ?? b;
}

function stemVi(s: string): string {
  return STEM_VI[s] ?? s;
}

function dichSao(raw: any, loai: Sao['loai']): Sao {
  return {
    ten: STAR_VI[raw.name] ?? raw.name,
    tenGoc: raw.name,
    loai,
    doSang: raw.brightness ? (['庙', '旺', '得', '利', '平', '不', '陷'].includes(raw.brightness) ? { 庙: 'Miếu', 旺: 'Vượng', 得: 'Đắc', 利: 'Lợi', 平: 'Bình', 不: 'Bất', 陷: 'Hãm' }[raw.brightness as string] : raw.brightness) : undefined,
    tuHoa: raw.mutagen ? MUTAGEN_VI[raw.mutagen] ?? raw.mutagen : undefined,
    scope: raw.scope,
  };
}

/** Tách "戊寅 辛酉 壬申 壬寅" → 4 trụ */
function tachTuTru(chineseDate: string): Tru[] {
  const nhan = ['Năm', 'Tháng', 'Ngày', 'Giờ'];
  return chineseDate
    .trim()
    .split(/\s+/)
    .slice(0, 4)
    .map((tru, i) => ({
      can: stemVi(tru[0] ?? ''),
      chi: branchVi(tru[1] ?? ''),
      nhan: nhan[i] ?? '',
    }));
}

/** Quy đổi giờ thật theo kinh độ (kinh tuyến chuẩn của VN là 105°E) */
function chinhGioThat(ngay: string, gio: number, kinhDo: number) {
  const [y, m, d] = ngay.split('-').map(Number);
  const g = GIO_SINH[gio] ?? GIO_SINH[0];
  // Lấy giữa khung giờ làm mốc để tránh rơi đúng biên
  const [batDau, ketThuc] = g.khoang.split('–').map((s) => s.trim());
  const [h1, m1] = batDau.split(':').map(Number);
  const [h2, m2] = ketThuc.split(':').map(Number);
  const giuaPhut = (h1 * 60 + m1 + h2 * 60 + m2) / 2;

  const lechPhut = (kinhDo - 105) * 4;
  const tongPhut = giuaPhut + lechPhut;

  const moc = new Date(y, m - 1, d, 0, 0, 0);
  moc.setMinutes(Math.round(tongPhut));

  const ngayMoi = `${moc.getFullYear()}-${pad(moc.getMonth() + 1)}-${pad(moc.getDate())}`;
  const gioMoi = moc.getHours();
  return { ngay: ngayMoi, gio: gioSangIndex(gioMoi), phutLech: lechPhut };
}

// ─────────────────────────────────────────────────────────────────
// Hàm chính
// ─────────────────────────────────────────────────────────────────

export function lapLaSo(input: BirthInput): LaSo {
  const { gioiTinh, lich, ngay, gio, thangNhuan, dungGioThat, kinhDo } = input;

  let ngayDung = ngay;
  let gioDung = gio;
  let daChinh = false;

  if (dungGioThat && kinhDo != null) {
    const kq = chinhGioThat(ngay, gio, kinhDo);
    if (kq.ngay !== ngay || kq.gio !== gio) daChinh = true;
    ngayDung = kq.ngay;
    gioDung = kq.gio;
  }

  const gender = gioiTinh === 'Nam' ? '男' : '女';

  let a: any;
  if (lich === 'am') {
    const [y, m, d] = ngayDung.split('-').map(Number);
    a = astro.byLunar(`${y}-${m}-${d}`, gioDung, gender as any, !!thangNhuan, true, 'zh-CN' as any);
  } else {
    const [y, m, d] = ngayDung.split('-').map(Number);
    a = astro.bySolar(`${y}-${m}-${d}`, gioDung, gender as any, true, 'zh-CN' as any);
  }

  const raw = a.rawDates?.lunarDate ?? {};

  const cung: Cung[] = (a.palaces as any[]).map((p) => {
    const chi = branchVi(p.earthlyBranch);
    const viTri = LUOI[chi] ?? { row: 0, col: 0 };
    return {
      index: p.index,
      ten: PALACE_VI[p.name] ?? p.name,
      tenGoc: p.name,
      can: stemVi(p.heavenlyStem),
      chi,
      laThan: !!p.isBodyPalace,
      laLaiNhan: !!p.isOriginalPalace,
      chinhTinh: (p.majorStars ?? []).map((s: any) => dichSao(s, 'chinh')),
      phuTinh: (p.minorStars ?? []).map((s: any) => dichSao(s, 'phu')),
      tapTinh: (p.adjectiveStars ?? []).map((s: any) => dichSao(s, 'tap')),
      truongSinh: STAR_VI[p.changsheng12] ?? p.changsheng12,
      bacSi: STAR_VI[p.boshi12] ?? p.boshi12,
      tuongTinh: STAR_VI[p.jiangqian12] ?? p.jiangqian12,
      tueTien: STAR_VI[p.suiqian12] ?? p.suiqian12,
      daiHan: {
        tuoiBatDau: p.decadal?.range?.[0] ?? 0,
        tuoiKetThuc: p.decadal?.range?.[1] ?? 0,
        can: stemVi(p.decadal?.heavenlyStem ?? ''),
        chi: branchVi(p.decadal?.earthlyBranch ?? ''),
      },
      tieuHan: p.ages ?? [],
      row: viTri.row,
      col: viTri.col,
    };
  });

  const ngaySinh = ngayDung;
  const [yy, mm, dd] = ngaySinh.split('-');

  return {
    ten: (input.ten ?? '').trim(),
    gioiTinh,
    duongLich: `${dd}/${mm}/${yy}`,
    amLich: `${raw.lunarDay ?? '?'}/${raw.lunarMonth ?? '?'}${raw.isLeap ? ' nhuận' : ''} năm ${a.chineseDate?.split(' ')[0] ? stemVi(a.chineseDate.split(' ')[0][0]) + ' ' + branchVi(a.chineseDate.split(' ')[0][1]) : ''}`,
    amLichSo: {
      ngay: raw.lunarDay ?? 0,
      thang: raw.lunarMonth ?? 0,
      nam: raw.lunarYear ?? 0,
      nhuan: !!raw.isLeap,
    },
    tuTru: tachTuTru(a.chineseDate ?? ''),
    gio: indexSangGio(gioDung),
    gioDaChinh: daChinh,
    cuc: FIVE_ELEMENTS_VI[a.fiveElementsClass] ?? a.fiveElementsClass,
    conGiap: ZODIAC_VI[a.zodiac] ?? a.zodiac,
    cungHoangDao: SIGN_VI[a.sign] ?? a.sign,
    menhChu: STAR_VI[a.soul] ?? a.soul,
    thanChu: STAR_VI[a.body] ?? a.body,
    menhCung: branchVi(a.earthlyBranchOfSoulPalace),
    thanCung: branchVi(a.earthlyBranchOfBodyPalace),
    cung,
    duLieuGoc: a,
  };
}

// ─────────────────────────────────────────────────────────────────
// Tiện ích truy xuất
// ─────────────────────────────────────────────────────────────────

export const cungTheoTen = (ls: LaSo, ten: string): Cung | undefined =>
  ls.cung.find((c) => c.ten === ten);

export const cungTheoChi = (ls: LaSo, chi: string): Cung | undefined =>
  ls.cung.find((c) => c.chi === chi);

/**
 * Tam phương tứ chính của một cung:
 * bản cung + xung chiếu (đối cung) + hai cung tam hợp.
 */
export function tamPhuongTuChinh(cung: Cung[], viTri: Cung): Cung[] {
  const chiThuTu = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];
  const i = chiThuTu.indexOf(viTri.chi);
  if (i < 0) return [viTri];
  const lay = (offset: number) => {
    const chi = chiThuTu[(i + offset + 12) % 12];
    return cung.find((c) => c.chi === chi);
  };
  return [viTri, lay(6), lay(4), lay(8)].filter(Boolean) as Cung[];
}

export interface VanHan {
  daiHan: { index: number; tuoi: [number, number]; can: string; chi: string };
  tieuHan: { index: number; tuoi: number };
  luuNien: { index: number; nam: number; can: string; chi: string };
}

/** Vận hạn của một năm dương lịch cụ thể */
export function vanHan(ls: LaSo, namDuongLich: number): VanHan {
  const a = ls.duLieuGoc as any;
  const h = a.horoscope(`${namDuongLich}-6-15`);
  const cungDaiHan = ls.cung.find((c) => c.index === h.decadal.index);
  const tuoiDaiHan: [number, number] = cungDaiHan
    ? [cungDaiHan.daiHan.tuoiBatDau, cungDaiHan.daiHan.tuoiKetThuc]
    : [
        h.decadal?.ageRange?.[0] ?? h.decadal?.yearRange?.[0] ?? 0,
        h.decadal?.ageRange?.[1] ?? h.decadal?.yearRange?.[1] ?? 0,
      ];
  return {
    daiHan: {
      index: h.decadal.index,
      tuoi: tuoiDaiHan,
      can: stemVi(h.decadal.heavenlyStem),
      chi: branchVi(h.decadal.earthlyBranch),
    },
    tieuHan: { index: h.age.index, tuoi: h.age.nominalAge },
    luuNien: {
      index: h.yearly.index,
      nam: namDuongLich,
      can: stemVi(h.yearly.heavenlyStem),
      chi: branchVi(h.yearly.earthlyBranch),
    },
  };
}

/** Một mục tứ hoá: sao nào hoá thành gì */
export interface TuHoaItem {
  sao: string;
  hoa: string;
}

/** Tứ hoá của năm sinh và của lưu niên */
export function tuHoa(
  ls: LaSo,
  namDuongLich?: number,
): { goc: TuHoaItem[]; luuNien: TuHoaItem[] } {
  const a = ls.duLieuGoc as any;
  const goc: TuHoaItem[] = a.palaces
    .flatMap((p: any) => [...(p.majorStars ?? []), ...(p.minorStars ?? []), ...(p.adjectiveStars ?? [])])
    .filter((s: any) => s.mutagen)
    .map((s: any): TuHoaItem => ({ sao: STAR_VI[s.name] ?? s.name, hoa: MUTAGEN_VI[s.mutagen] ?? s.mutagen }));

  if (!namDuongLich) return { goc, luuNien: [] };

  const h = a.horoscope(`${namDuongLich}-6-15`);
  const luuNien: TuHoaItem[] = (h.yearly.mutagen ?? []).map((name: string, i: number): TuHoaItem => ({
    sao: STAR_VI[name] ?? name,
    hoa: ['Lộc', 'Quyền', 'Khoa', 'Kỵ'][i],
  }));
  return { goc, luuNien };
}
