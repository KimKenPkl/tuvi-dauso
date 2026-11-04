/**
 * Phong thuỷ Bát Trạch: mệnh quái, Đông/Tây tứ mệnh, tám hướng cát hung.
 *
 * Công thức mệnh quái theo năm sinh âm lịch và giới tính (phép Bát Trạch):
 *   Nam  : (100 − 2 số cuối năm) chia 9 lấy dư   (thế kỷ 21 dùng 99)
 *   Nữ   : (2 số cuối năm − 4) chia 9 lấy dư     (thế kỷ 21 dùng +6)
 * Dư 0 tính là 9. Dư 5: nam quy Khôn, nữ quy Cấn.
 *
 * Bảng du niên đối chiếu theo Đại Du Niên ca (八宅明镜), đã kiểm tra tính
 * đối xứng của cả 8 quái.
 */

export type Quai = 'Càn' | 'Khảm' | 'Cấn' | 'Chấn' | 'Tốn' | 'Ly' | 'Khôn' | 'Đoài';
export type DuNien =
  | 'Sinh Khí'
  | 'Thiên Y'
  | 'Diên Niên'
  | 'Phục Vị'
  | 'Tuyệt Mệnh'
  | 'Ngũ Quỷ'
  | 'Lục Sát'
  | 'Họa Hại';

export const QUAI: readonly Quai[] = [
  'Càn',
  'Khảm',
  'Cấn',
  'Chấn',
  'Tốn',
  'Ly',
  'Khôn',
  'Đoài',
];

export const NGU_HANH_QUAI: Record<Quai, 'Kim' | 'Thủy' | 'Mộc' | 'Hỏa' | 'Thổ'> = {
  Càn: 'Kim',
  Đoài: 'Kim',
  Ly: 'Hỏa',
  Chấn: 'Mộc',
  Tốn: 'Mộc',
  Khảm: 'Thủy',
  Cấn: 'Thổ',
  Khôn: 'Thổ',
};

export const QUAI_HAN: Record<Quai, string> = {
  Càn: '☰',
  Đoài: '☱',
  Ly: '☲',
  Chấn: '☳',
  Tốn: '☴',
  Khảm: '☵',
  Cấn: '☶',
  Khôn: '☷',
};

/** Hướng → quái */
export const HUONG_QUAI: { huong: string; quai: Quai; do: number }[] = [
  { huong: 'Bắc', quai: 'Khảm', do: 0 },
  { huong: 'Đông Bắc', quai: 'Cấn', do: 45 },
  { huong: 'Đông', quai: 'Chấn', do: 90 },
  { huong: 'Đông Nam', quai: 'Tốn', do: 135 },
  { huong: 'Nam', quai: 'Ly', do: 180 },
  { huong: 'Tây Nam', quai: 'Khôn', do: 225 },
  { huong: 'Tây', quai: 'Đoài', do: 270 },
  { huong: 'Tây Bắc', quai: 'Càn', do: 315 },
];

const BANG: Record<Quai, Record<Quai, DuNien>> = {
  Càn: {
    Càn: 'Phục Vị',
    Khảm: 'Lục Sát',
    Cấn: 'Thiên Y',
    Chấn: 'Ngũ Quỷ',
    Tốn: 'Họa Hại',
    Ly: 'Tuyệt Mệnh',
    Khôn: 'Diên Niên',
    Đoài: 'Sinh Khí',
  },
  Khảm: {
    Càn: 'Lục Sát',
    Khảm: 'Phục Vị',
    Cấn: 'Ngũ Quỷ',
    Chấn: 'Thiên Y',
    Tốn: 'Sinh Khí',
    Ly: 'Diên Niên',
    Khôn: 'Tuyệt Mệnh',
    Đoài: 'Họa Hại',
  },
  Cấn: {
    Càn: 'Thiên Y',
    Khảm: 'Ngũ Quỷ',
    Cấn: 'Phục Vị',
    Chấn: 'Lục Sát',
    Tốn: 'Tuyệt Mệnh',
    Ly: 'Họa Hại',
    Khôn: 'Sinh Khí',
    Đoài: 'Diên Niên',
  },
  Chấn: {
    Càn: 'Ngũ Quỷ',
    Khảm: 'Thiên Y',
    Cấn: 'Lục Sát',
    Chấn: 'Phục Vị',
    Tốn: 'Diên Niên',
    Ly: 'Sinh Khí',
    Khôn: 'Họa Hại',
    Đoài: 'Tuyệt Mệnh',
  },
  Tốn: {
    Càn: 'Họa Hại',
    Khảm: 'Sinh Khí',
    Cấn: 'Tuyệt Mệnh',
    Chấn: 'Diên Niên',
    Tốn: 'Phục Vị',
    Ly: 'Thiên Y',
    Khôn: 'Ngũ Quỷ',
    Đoài: 'Lục Sát',
  },
  Ly: {
    Càn: 'Tuyệt Mệnh',
    Khảm: 'Diên Niên',
    Cấn: 'Họa Hại',
    Chấn: 'Sinh Khí',
    Tốn: 'Thiên Y',
    Ly: 'Phục Vị',
    Khôn: 'Lục Sát',
    Đoài: 'Ngũ Quỷ',
  },
  Khôn: {
    Càn: 'Diên Niên',
    Khảm: 'Tuyệt Mệnh',
    Cấn: 'Sinh Khí',
    Chấn: 'Họa Hại',
    Tốn: 'Ngũ Quỷ',
    Ly: 'Lục Sát',
    Khôn: 'Phục Vị',
    Đoài: 'Thiên Y',
  },
  Đoài: {
    Càn: 'Sinh Khí',
    Khảm: 'Họa Hại',
    Cấn: 'Diên Niên',
    Chấn: 'Tuyệt Mệnh',
    Tốn: 'Lục Sát',
    Ly: 'Ngũ Quỷ',
    Khôn: 'Thiên Y',
    Đoài: 'Phục Vị',
  },
};

export const Y_NGHIA_DU_NIEN: Record<DuNien, { tot: boolean; nghia: string; dung: string }> = {
  'Sinh Khí': {
    tot: true,
    nghia: 'Đại cát: sinh tài, sinh lộc, con cái hanh thông.',
    dung: 'Cửa chính, bàn làm việc, hướng ngồi học',
  },
  'Thiên Y': {
    tot: true,
    nghia: 'Cát: sức khoẻ, quý nhân, chữa bệnh thuận.',
    dung: 'Giường ngủ, bếp, hướng bàn ăn',
  },
  'Diên Niên': {
    tot: true,
    nghia: 'Cát: hoà thuận, bền vững, hôn nhân ổn định.',
    dung: 'Giường vợ chồng, phòng khách',
  },
  'Phục Vị': {
    tot: true,
    nghia: 'Bình cát: yên ổn, giữ được của, ít biến động.',
    dung: 'Bàn thờ, nơi làm việc cần tĩnh',
  },
  'Tuyệt Mệnh': {
    tot: false,
    nghia: 'Đại hung: hao tài, bệnh nặng, dễ gặp chuyện dữ.',
    dung: 'Kỵ cửa chính, giường ngủ, bếp',
  },
  'Ngũ Quỷ': {
    tot: false,
    nghia: 'Hung: thị phi, mất của, dễ bị lừa.',
    dung: 'Kỵ bếp, cửa chính',
  },
  'Lục Sát': {
    tot: false,
    nghia: 'Hung: khẩu thiệt, kiện cáo, quan hệ đổ vỡ.',
    dung: 'Kỵ giường ngủ, bàn làm việc',
  },
  'Họa Hại': {
    tot: false,
    nghia: 'Hung nhẹ: tiểu nhân, hao tài vặt, bệnh lặt vặt.',
    dung: 'Kỵ cửa chính, bếp',
  },
};

/** Tra du niên giữa mệnh quái và quái của hướng. */
export function duNienCua(menh: Quai, huong: Quai): DuNien {
  return BANG[menh][huong];
}

export interface MenhQuai {
  quai: Quai;
  han: string;
  nguHanh: string;
  nhom: 'Đông tứ mệnh' | 'Tây tứ mệnh';
  huongTot: string[];
  huongXau: string[];
}

export function menhQuai(namSinh: number, gioiTinh: 'Nam' | 'Nữ'): MenhQuai {
  const yy = ((namSinh % 100) + 100) % 100;
  let n: number;
  if (gioiTinh === 'Nam') n = (namSinh < 2000 ? 100 : 99) - yy;
  else n = namSinh < 2000 ? yy - 4 : yy + 6;
  let r = ((n % 9) + 9) % 9;
  if (r === 0) r = 9;

  const theoDu: Record<number, Quai> = {
    1: 'Khảm',
    2: 'Khôn',
    3: 'Chấn',
    4: 'Tốn',
    5: gioiTinh === 'Nam' ? 'Khôn' : 'Cấn',
    6: 'Càn',
    7: 'Đoài',
    8: 'Cấn',
    9: 'Ly',
  };
  const quai = theoDu[r];
  const nhom = ['Khảm', 'Ly', 'Chấn', 'Tốn'].includes(quai)
    ? 'Đông tứ mệnh'
    : 'Tây tứ mệnh';

  const huongTot: string[] = [];
  const huongXau: string[] = [];
  for (const h of HUONG_QUAI) {
    const dn = BANG[quai][h.quai];
    if (Y_NGHIA_DU_NIEN[dn].tot) huongTot.push(h.huong);
    else huongXau.push(h.huong);
  }

  return {
    quai,
    han: QUAI_HAN[quai],
    nguHanh: NGU_HANH_QUAI[quai],
    nhom,
    huongTot,
    huongXau,
  };
}

export interface HuongChiTiet {
  huong: string;
  quai: Quai;
  do: number;
  duNien: DuNien;
  tot: boolean;
  nghia: string;
  dung: string;
}

export interface KetQuaPhongThuy {
  namSinh: number;
  gioiTinh: 'Nam' | 'Nữ';
  canChi: string;
  napAm: string;
  hanhBanMenh: string;
  menh: MenhQuai;
  huong: HuongChiTiet[];
  mauHop: string[];
  mauKy: string[];
  soHop: number[];
  vatPham: string[];
}

/** 30 cặp nạp âm, thứ tự Giáp Tý → Quý Hợi. */
const NAP_AM: readonly [string, string][] = [
  ['Hải Trung Kim', 'Kim'],
  ['Lô Trung Hỏa', 'Hỏa'],
  ['Đại Lâm Mộc', 'Mộc'],
  ['Lộ Bàng Thổ', 'Thổ'],
  ['Kiếm Phong Kim', 'Kim'],
  ['Sơn Đầu Hỏa', 'Hỏa'],
  ['Giản Hạ Thủy', 'Thủy'],
  ['Thành Đầu Thổ', 'Thổ'],
  ['Bạch Lạp Kim', 'Kim'],
  ['Dương Liễu Mộc', 'Mộc'],
  ['Tuyền Trung Thủy', 'Thủy'],
  ['Ốc Thượng Thổ', 'Thổ'],
  ['Tích Lịch Hỏa', 'Hỏa'],
  ['Tùng Bách Mộc', 'Mộc'],
  ['Trường Lưu Thủy', 'Thủy'],
  ['Sa Trung Kim', 'Kim'],
  ['Sơn Hạ Hỏa', 'Hỏa'],
  ['Bình Địa Mộc', 'Mộc'],
  ['Bích Thượng Thổ', 'Thổ'],
  ['Kim Bạch Kim', 'Kim'],
  ['Phúc Đăng Hỏa', 'Hỏa'],
  ['Thiên Hà Thủy', 'Thủy'],
  ['Đại Trạch Thổ', 'Thổ'],
  ['Thoa Xuyến Kim', 'Kim'],
  ['Tang Đố Mộc', 'Mộc'],
  ['Đại Khê Thủy', 'Thủy'],
  ['Sa Trung Thổ', 'Thổ'],
  ['Thiên Thượng Hỏa', 'Hỏa'],
  ['Thạch Lựu Mộc', 'Mộc'],
  ['Đại Hải Thủy', 'Thủy'],
];

const CAN = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];
const CHI = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];

export const MAU_THEO_HANH: Record<string, { hop: string[]; ky: string[]; so: number[]; vatPham: string[] }> = {
  Kim: {
    hop: ['Trắng', 'Xám', 'Bạc', 'Vàng kim'],
    ky: ['Đỏ', 'Hồng', 'Tím'],
    so: [4, 9],
    vatPham: ['Đồ kim loại', 'Chuông gió kim loại', 'Tượng đồng', 'Đồng hồ'],
  },
  Thủy: {
    hop: ['Đen', 'Xanh dương', 'Xanh nước biển'],
    ky: ['Vàng đất', 'Nâu', 'Be'],
    so: [1, 6],
    vatPham: ['Bể cá', 'Đài phun nước', 'Tranh sông nước', 'Bình thuỷ tinh'],
  },
  Mộc: {
    hop: ['Xanh lá', 'Xanh ngọc'],
    ky: ['Trắng', 'Xám', 'Bạc'],
    so: [3, 8],
    vatPham: ['Cây xanh', 'Tranh rừng', 'Đồ gỗ', 'Chậu hoa'],
  },
  Hỏa: {
    hop: ['Đỏ', 'Hồng', 'Cam', 'Tím'],
    ky: ['Đen', 'Xanh dương'],
    so: [2, 7],
    vatPham: ['Đèn', 'Nến', 'Tranh mặt trời', 'Đồ gốm đỏ'],
  },
  Thổ: {
    hop: ['Vàng đất', 'Nâu', 'Be', 'Vàng nhạt'],
    ky: ['Xanh lá', 'Xanh ngọc'],
    so: [5, 0],
    vatPham: ['Đá tự nhiên', 'Đồ gốm', 'Pha lê', 'Tượng đất nung'],
  },
};

export function xemPhongThuy(namSinh: number, gioiTinh: 'Nam' | 'Nữ'): KetQuaPhongThuy {
  const i = (((namSinh - 4) % 60) + 60) % 60;
  const canChi = `${CAN[i % 10]} ${CHI[i % 12]}`;
  const [napAm, hanh] = NAP_AM[Math.floor(i / 2)];
  const menh = menhQuai(namSinh, gioiTinh);
  const info = MAU_THEO_HANH[hanh];

  const huong: HuongChiTiet[] = HUONG_QUAI.map((h) => {
    const dn = BANG[menh.quai][h.quai];
    return {
      huong: h.huong,
      quai: h.quai,
      do: h.do,
      duNien: dn,
      tot: Y_NGHIA_DU_NIEN[dn].tot,
      nghia: Y_NGHIA_DU_NIEN[dn].nghia,
      dung: Y_NGHIA_DU_NIEN[dn].dung,
    };
  });

  return {
    namSinh,
    gioiTinh,
    canChi,
    napAm,
    hanhBanMenh: hanh,
    menh,
    huong,
    mauHop: info.hop,
    mauKy: info.ky,
    soHop: info.so,
    vatPham: info.vatPham,
  };
}
