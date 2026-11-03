/**
 * Lưu lá số và ghi chú vào localStorage.
 * Mọi dữ liệu chỉ nằm trên máy người dùng, không gửi đi đâu.
 */

import type { BirthInput } from './chart';

export interface LaSoDaLuu {
  id: string;
  ten: string;
  gioiTinh: 'Nam' | 'Nữ';
  ngay: string;
  gio: number;
  lich: 'duong' | 'am';
  thangNhuan?: boolean;
  /** nhãn phụ do người dùng đặt, ví dụ "Mẹ", "Khách A" */
  nhan?: string;
  taoLuc: number;
  capNhatLuc: number;
}

const KEY_LS = 'tuvi.danhSach';
const KEY_NOTE = 'tuvi.ghiChu';
const KEY_AI = 'tuvi.ai';

function doc<T>(key: string, macDinh: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return macDinh;
    return JSON.parse(raw) as T;
  } catch {
    return macDinh;
  }
}

function ghi(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* hết dung lượng hoặc bị chặn */
  }
}

/** Khoá định danh một lá số, dùng chung cho ghi chú */
export function idLaSo(input: BirthInput): string {
  return [
    input.gioiTinh,
    input.lich,
    input.ngay,
    input.gio,
    input.thangNhuan ? 'n' : '',
  ].join('|');
}

export function danhSachLaSo(): LaSoDaLuu[] {
  return doc<LaSoDaLuu[]>(KEY_LS, []).sort((a, b) => b.capNhatLuc - a.capNhatLuc);
}

export function luuLaSo(input: BirthInput, nhan?: string): LaSoDaLuu {
  const id = idLaSo(input);
  const cu = danhSachLaSo();
  const tonTai = cu.find((x) => x.id === id);
  const now = Date.now();

  const moi: LaSoDaLuu = {
    id,
    ten: input.ten ?? '',
    gioiTinh: input.gioiTinh,
    ngay: input.ngay,
    gio: input.gio,
    lich: input.lich,
    thangNhuan: input.thangNhuan,
    nhan: nhan ?? tonTai?.nhan,
    taoLuc: tonTai?.taoLuc ?? now,
    capNhatLuc: now,
  };

  ghi(KEY_LS, [moi, ...cu.filter((x) => x.id !== id)].slice(0, 50));
  return moi;
}

export function xoaLaSo(id: string) {
  ghi(KEY_LS, danhSachLaSo().filter((x) => x.id !== id));
  const notes = doc<Record<string, string>>(KEY_NOTE, {});
  delete notes[id];
  ghi(KEY_NOTE, notes);
}

export function datTen(id: string, nhan: string) {
  const ds = danhSachLaSo().map((x) => (x.id === id ? { ...x, nhan, capNhatLuc: Date.now() } : x));
  ghi(KEY_LS, ds);
}

export function laSoSangInput(ls: LaSoDaLuu): BirthInput {
  return {
    ten: ls.ten,
    gioiTinh: ls.gioiTinh,
    lich: ls.lich,
    ngay: ls.ngay,
    gio: ls.gio,
    thangNhuan: ls.thangNhuan,
    kinhDo: null,
    dungGioThat: false,
  };
}

// ── Ghi chú ──────────────────────────────────────────────────────

export function docGhiChu(id: string): string {
  return doc<Record<string, string>>(KEY_NOTE, {})[id] ?? '';
}

export function luuGhiChu(id: string, noiDung: string) {
  const notes = doc<Record<string, string>>(KEY_NOTE, {});
  if (noiDung.trim()) notes[id] = noiDung;
  else delete notes[id];
  ghi(KEY_NOTE, notes);
}

// ── Cấu hình AI ──────────────────────────────────────────────────

export interface CauHinhAi {
  provider: 'gemini' | 'openai';
  apiKey: string;
  model: string;
  baseUrl?: string;
}

export const AI_MAC_DINH: CauHinhAi = {
  provider: 'gemini',
  apiKey: '',
  model: 'gemini-2.5-flash',
  baseUrl: '',
};

export function docCauHinhAi(): CauHinhAi {
  return { ...AI_MAC_DINH, ...doc<Partial<CauHinhAi>>(KEY_AI, {}) };
}

export function luuCauHinhAi(c: CauHinhAi) {
  ghi(KEY_AI, c);
}
