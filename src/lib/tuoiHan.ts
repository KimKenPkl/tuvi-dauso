/**
 * Vận hạn theo tuổi trong một năm.
 *
 * CĂN CỨ CỔ:
 * 1. Quan hệ địa chi (地支) — 三命通會, 淵海子平:
 *      Tam hợp (三合): Thân–Tý–Thìn, Tỵ–Dậu–Sửu, Dần–Ngọ–Tuất, Hợi–Mão–Mùi
 *      Lục hợp (六合): Tý–Sửu, Dần–Hợi, Mão–Tuất, Thìn–Dậu, Tỵ–Thân, Ngọ–Mùi
 *      Lục xung (六沖): Tý–Ngọ, Sửu–Mùi, Dần–Thân, Mão–Dậu, Thìn–Tuất, Tỵ–Hợi
 *      Lục hại (六害): Tý–Mùi, Sửu–Ngọ, Dần–Tỵ, Mão–Thìn, Thân–Hợi, Dậu–Tuất
 * 2. Tam Tai, Kim Lâu, Hoang Ốc: lấy lại từ `canChi.ts` (đã kiểm chứng bằng
 *    test hồi quy) để toàn site dùng đúng một nguồn.
 * 3. Sao chiếu mệnh Cửu Diệu: lấy từ `saoHan.ts`.
 *
 * Không đặt ra "điểm số vận may" tuỳ tiện: mức thuận / trung / cần thận chỉ
 * cộng trừ theo đúng các yếu tố cổ điển ở trên, và nói rõ vì sao.
 */

import { CHI, canChiNam } from './amlich';
import { chiCuaNam, xemTuoiXayNha, type KiemTra } from './canChi';
import { saoChieuMenh, type KetQuaSaoHan, type TinhChat } from './saoHan';

export type LoaiQuanHe = 'tam-hop' | 'luc-hop' | 'xung' | 'hai' | 'binh';

const TAM_HOP: number[][] = [
  [8, 0, 4], // Thân – Tý – Thìn
  [5, 9, 1], // Tỵ – Dậu – Sửu
  [2, 6, 10], // Dần – Ngọ – Tuất
  [11, 3, 7], // Hợi – Mão – Mùi
];

const LUC_HOP: number[][] = [
  [0, 1], // Tý – Sửu
  [2, 11], // Dần – Hợi
  [3, 10], // Mão – Tuất
  [4, 9], // Thìn – Dậu
  [5, 8], // Tỵ – Thân
  [6, 7], // Ngọ – Mùi
];

const XUNG: number[][] = [
  [0, 6],
  [1, 7],
  [2, 8],
  [3, 9],
  [4, 10],
  [5, 11],
];

const HAI: number[][] = [
  [0, 7],
  [1, 6],
  [2, 5],
  [3, 4],
  [8, 11],
  [9, 10],
];

function coCap(ds: number[][], a: number, b: number): boolean {
  return ds.some((c) => (c[0] === a && c[1] === b) || (c[0] === b && c[1] === a));
}

export function quanHeChi(chiTuoi: number, chiNam: number): LoaiQuanHe {
  if (chiTuoi === chiNam) return 'binh';
  if (TAM_HOP.some((g) => g.includes(chiTuoi) && g.includes(chiNam))) return 'tam-hop';
  if (coCap(LUC_HOP, chiTuoi, chiNam)) return 'luc-hop';
  if (coCap(XUNG, chiTuoi, chiNam)) return 'xung';
  if (coCap(HAI, chiTuoi, chiNam)) return 'hai';
  return 'binh';
}

export const MO_TA_QUAN_HE: Record<LoaiQuanHe, string> = {
  'tam-hop': 'Tam hợp — năm thuận, dễ có người nâng đỡ, hợp khởi sự.',
  'luc-hop': 'Lục hợp — hoà thuận, thuận về giao tế và hôn nhân.',
  xung: 'Tương xung — năm nhiều xáo trộn, nên giữ nhịp độ vừa phải.',
  hai: 'Tương hại — đề phòng khẩu thiệt, giấy tờ và hiểu lầm.',
  binh: 'Bình hoà — không thuận cũng không xung, tuỳ việc mà tính.',
};

export interface DongTrongBang {
  chi: string;
  conGiap: string;
  quanHe: LoaiQuanHe;
  moTa: string;
}

export interface KetQuaTuoiHan {
  namSinh: number;
  namXem: number;
  gioiTinh: 'Nam' | 'Nữ';
  tuoiMu: number;
  chiTuoi: number;
  chiNam: number;
  canChiTuoi: string;
  canChiNam: string;
  conGiap: string;
  quanHe: LoaiQuanHe;
  quanHeText: string;
  sao: KetQuaSaoHan;
  kiemTra: KiemTra[];
  tamTai: boolean;
  muc: 'thuan' | 'trung' | 'can-than';
  mucText: string;
  lyDo: string[];
  loiKhuyen: string[];
  bang: DongTrongBang[];
}

const TINH_CHAT_DIEM: Record<TinhChat, number> = { cat: 1, binh: 0, hung: -1 };

function diemQuanHe(q: LoaiQuanHe): number {
  if (q === 'tam-hop') return 2;
  if (q === 'luc-hop') return 1;
  if (q === 'xung') return -2;
  if (q === 'hai') return -1;
  return 0;
}

export function xemTuoiTheoNam(
  namSinh: number,
  gioiTinh: 'Nam' | 'Nữ',
  namXem: number,
): KetQuaTuoiHan {
  const chiTuoi = chiCuaNam(namSinh);
  const chiNam = chiCuaNam(namXem);
  const quanHe = quanHeChi(chiTuoi, chiNam);
  const sao = saoChieuMenh(namSinh, gioiTinh, namXem);

  const xayNha = xemTuoiXayNha(namSinh, namXem);
  const tamTai = xayNha.kiemTra.find((k) => k.ten === 'Tam Tai')?.dat === false;

  const lyDo: string[] = [MO_TA_QUAN_HE[quanHe]];
  lyDo.push(`Sao chiếu mệnh: ${sao.sao.ten} (${sao.sao.tinhChat === 'cat' ? 'cát' : sao.sao.tinhChat === 'hung' ? 'hung' : 'bình'}).`);
  if (tamTai) lyDo.push('Năm nay phạm Tam Tai theo nhóm tam hợp của tuổi.');

  let diem = diemQuanHe(quanHe) + TINH_CHAT_DIEM[sao.sao.tinhChat] + (tamTai ? -1 : 0);
  if (quanHe === 'binh' && chiTuoi === chiNam) diem += 0; // năm bản mệnh: giữ trung tính

  const muc: KetQuaTuoiHan['muc'] = diem >= 2 ? 'thuan' : diem <= -1 ? 'can-than' : 'trung';
  const mucText =
    muc === 'thuan'
      ? 'Thuận — có thể triển khai việc đã chuẩn bị kỹ.'
      : muc === 'can-than'
        ? 'Cần thận — nên giữ nhịp, tránh quyết định lớn khi chưa chắc.'
        : 'Trung tính — thuận hay không tuỳ cách làm và thời điểm.';

  const loiKhuyen: string[] = [];
  if (quanHe === 'xung' || quanHe === 'hai') {
    loiKhuyen.push('Giấy tờ, hợp đồng nên đọc kỹ và lưu bản sao.');
    loiKhuyen.push('Hạn chế tranh luận nóng; việc lớn chia nhỏ để giảm rủi ro.');
  }
  if (quanHe === 'tam-hop' || quanHe === 'luc-hop') {
    loiKhuyen.push('Nên nhờ người có chuyên môn góp ý trước khi chốt việc lớn.');
  }
  if (sao.sao.tinhChat === 'hung') {
    loiKhuyen.push(`Năm gặp ${sao.sao.ten}: chú ý sức khoẻ, đi lại và chuyện tiền bạc.`);
  }
  if (tamTai) {
    loiKhuyen.push('Phạm Tam Tai: hạn chế khởi công lớn, đi xa đường hiểm.');
  }
  if (chiTuoi === chiNam) {
    loiKhuyen.push('Năm bản mệnh (Thái Tuế): nên ổn định, tránh đổi lớn nếu không cần.');
  }
  if (!loiKhuyen.length) {
    loiKhuyen.push('Không có yếu tố xấu rõ rệt; giữ kế hoạch hiện tại và theo dõi sức khoẻ.');
  }

  const bang: DongTrongBang[] = CHI.map((c, i) => {
    const q = quanHeChi(i, chiNam);
    return { chi: c, conGiap: c, quanHe: q, moTa: MO_TA_QUAN_HE[q] };
  });

  return {
    namSinh,
    namXem,
    gioiTinh,
    tuoiMu: namXem - namSinh + 1,
    chiTuoi,
    chiNam,
    canChiTuoi: canChiNam(namSinh),
    canChiNam: canChiNam(namXem),
    conGiap: CHI[chiTuoi],
    quanHe,
    quanHeText: MO_TA_QUAN_HE[quanHe],
    sao,
    kiemTra: xayNha.kiemTra,
    tamTai,
    muc,
    mucText,
    lyDo,
    loiKhuyen,
    bang,
  };
}
