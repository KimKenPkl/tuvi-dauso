/**
 * Công cụ thực tế: xem ngày tốt xấu và xem tuổi xây nhà / cưới hỏi.
 *
 * Can Chi, âm lịch và 12 Trực lấy thẳng từ `amlich.ts` — cùng một nguồn với
 * lá số, nên không bao giờ lệch nhau. Giờ Hoàng Đạo theo quy tắc khởi Thanh
 * Long của lịch vạn niên. Tam Tai, Kim Lâu, Hoang Ốc và quan hệ tam hợp /
 * lục hợp / lục xung / lục hại tính tại chỗ, không gọi mạng.
 */

import { CAN, CHI, amLichCuaNgay, canChiNam, jdFromDate, type Truc } from './amlich';

export { CAN, CHI };

const mod = (a: number, n: number) => ((a % n) + n) % n;

/** Mười hai vị thần trông coi 12 giờ trong ngày, theo vòng tròn. */
const THAN = [
  'Thanh Long',
  'Minh Đường',
  'Thiên Hình',
  'Chu Tước',
  'Kim Quỹ',
  'Thiên Đức',
  'Bạch Hổ',
  'Ngọc Đường',
  'Thiên Lao',
  'Huyền Vũ',
  'Tư Mệnh',
  'Câu Trần',
] as const;

/** Sáu vị thần thuộc Hoàng Đạo. */
const THAN_HOANG_DAO = new Set([0, 1, 4, 5, 7, 10]);

const KHUNG_GIO = [
  '23:00 – 01:00',
  '01:00 – 03:00',
  '03:00 – 05:00',
  '05:00 – 07:00',
  '07:00 – 09:00',
  '09:00 – 11:00',
  '11:00 – 13:00',
  '13:00 – 15:00',
  '15:00 – 17:00',
  '17:00 – 19:00',
  '19:00 – 21:00',
  '21:00 – 23:00',
] as const;

export interface GioHoangDao {
  gio: string;
  gioChi: string;
  than: string;
}

/**
 * Giờ Hoàng Đạo của một ngày, theo quy tắc khởi Thanh Long:
 * Tý – Ngọ khởi Thân, Sửu – Mùi khởi Tuất, Dần – Thân khởi Tý,
 * Mão – Dậu khởi Dần, Thìn – Tuất khởi Thìn, Tỵ – Hợi khởi Ngọ.
 *
 * @param chiNgay chỉ số chi của ngày (0 = Tý)
 */
export function gioHoangDaoCuaNgay(chiNgay: number): GioHoangDao[] {
  const batDau = mod(chiNgay * 2 + 8, 12);
  const ketQua: GioHoangDao[] = [];
  for (let gio = 0; gio < 12; gio++) {
    const than = mod(gio - batDau, 12);
    if (THAN_HOANG_DAO.has(than)) {
      ketQua.push({ gio: CHI[gio], gioChi: KHUNG_GIO[gio], than: THAN[than] });
    }
  }
  return ketQua;
}

/** Việc nên làm và nên tránh theo 12 Trực (phổ thông, không thay thế thầy xem ngày). */
const TRUC_VIEC: Record<Truc, { tot: string[]; xau: string[] }> = {
  Kiến: {
    tot: ['Khởi sự, mở đầu công việc', 'Xuất hành, gặp gỡ', 'Cầu tài, ký kết'],
    xau: ['An táng', 'Động thổ quy mô lớn'],
  },
  Trừ: {
    tot: ['Dọn dẹp, tẩy trần', 'Chữa bệnh, an dưỡng', 'Cầu an, trừ tà'],
    xau: ['Cưới hỏi', 'Khai trương'],
  },
  Mãn: {
    tot: ['Tế tự, cầu phúc', 'Nhập học', 'Thu nạp, tích lũy'],
    xau: ['Động thổ', 'An táng'],
  },
  Bình: {
    tot: ['Sửa chữa nhỏ', 'Giao dịch, mua bán', 'Dọn dẹp nhà cửa'],
    xau: ['Cưới hỏi', 'Khởi công'],
  },
  Định: {
    tot: ['Cưới hỏi, đính hôn', 'Ký kết hợp đồng', 'An vị, nhập học'],
    xau: ['Kiện tụng', 'Xuất hành đường xa'],
  },
  Chấp: {
    tot: ['Cắt may, sửa chữa', 'Xây dựng nhỏ', 'Thu hoạch'],
    xau: ['Khai trương', 'Cưới hỏi', 'Xuất hành'],
  },
  Phá: {
    tot: ['Phá dỡ, tháo gỡ', 'Chữa bệnh', 'Dọn dẹp'],
    xau: ['Cưới hỏi', 'Khai trương', 'Khởi công', 'An táng'],
  },
  Nguy: {
    tot: ['Cầu an, tế tự', 'Nghỉ ngơi, tĩnh dưỡng'],
    xau: ['Xuất hành', 'Động thổ', 'Cưới hỏi', 'Ký kết'],
  },
  Thành: {
    tot: ['Khai trương, khởi nghiệp', 'Cưới hỏi', 'Nhập học, ký kết', 'Động thổ'],
    xau: ['Kiện tụng', 'Tranh chấp'],
  },
  Thu: {
    tot: ['Thu hoạch, nhập kho', 'Cầu tài, thu nợ', 'Tuyển dụng'],
    xau: ['Khai trương', 'An táng', 'Xuất hành đường xa'],
  },
  Khai: {
    tot: ['Khai trương', 'Xuất hành', 'Cưới hỏi', 'Nhập học', 'Cầu tài'],
    xau: ['An táng', 'Động thổ'],
  },
  Bế: {
    tot: ['Tu bổ, đắp lũy', 'Sửa mộ, cải táng', 'Giữ gìn, bảo quản'],
    xau: ['Khai trương', 'Xuất hành', 'Cưới hỏi'],
  },
};

export interface KetQuaXemNgay {
  /** Ngày dương lịch dạng dd/mm/yyyy */
  duongLich: string;
  /** Ngày âm lịch dạng d/m(nhuận)/yyyy */
  amLich: string;
  canChi: string;
  canChiThang: string;
  canChiNam: string;
  truc: Truc;
  hoangDao: boolean;
  danhGia: string;
  tot: string[];
  xau: string[];
  gioHoangDao: GioHoangDao[];
}

const haiChuSo = (n: number) => String(n).padStart(2, '0');

/** Xem ngày tốt xấu: Can Chi, 12 Trực, giờ Hoàng Đạo và việc nên tránh. */
export function xemNgayTotXau(date: Date): KetQuaXemNgay {
  const a = amLichCuaNgay(date);
  const jd = jdFromDate(date.getDate(), date.getMonth() + 1, date.getFullYear());
  const chiNgay = mod(jd + 1, 12);
  const viec = TRUC_VIEC[a.truc];

  return {
    duongLich: `${haiChuSo(date.getDate())}/${haiChuSo(date.getMonth() + 1)}/${date.getFullYear()}`,
    amLich: `${a.ngay}/${a.thang}${a.nhuan ? ' nhuận' : ''}/${a.nam}`,
    canChi: a.canChiNgay,
    canChiThang: a.canChiThang,
    canChiNam: a.canChiNam,
    truc: a.truc,
    hoangDao: a.hoangDao,
    danhGia: a.hoangDao
      ? `Ngày Hoàng Đạo — thuận cho việc khởi sự (Trực ${a.truc})`
      : `Ngày Hắc Đạo — nên thận trọng (Trực ${a.truc})`,
    tot: viec.tot,
    xau: viec.xau,
    gioHoangDao: gioHoangDaoCuaNgay(chiNgay),
  };
}

// ── Xem tuổi ─────────────────────────────────────────────────────────────

/** Chỉ số chi của một năm (0 = Tý). */
export function chiCuaNam(nam: number): number {
  return mod(nam + 8, 12);
}

export interface KiemTra {
  ten: string;
  dat: boolean;
  chiTiet: string;
}

/** Ba năm Tam Tai ứng với chi năm sinh. */
function tamTaiCuaChi(chi: number): number[] {
  if ([8, 0, 4].includes(chi)) return [2, 3, 4]; // Thân – Tý – Thìn → Dần, Mão, Thìn
  if ([5, 9, 1].includes(chi)) return [11, 0, 1]; // Tỵ – Dậu – Sửu → Hợi, Tý, Sửu
  if ([2, 6, 10].includes(chi)) return [8, 9, 10]; // Dần – Ngọ – Tuất → Thân, Dậu, Tuất
  return [5, 6, 7]; // Hợi – Mão – Mùi → Tỵ, Ngọ, Mùi
}

/** Kim Lâu tính theo tuổi mụ (tuổi âm). */
function kimLauCuaTuoi(tuoiMu: number): { pham: boolean; loai: string } {
  const du = mod(tuoiMu, 9);
  const bang: Record<number, string> = {
    1: 'Kim Lâu Thân — kỵ cho chính người làm nhà',
    3: 'Kim Lâu Thê — kỵ cho vợ',
    6: 'Kim Lâu Tử — kỵ cho con',
    8: 'Kim Lâu Lục Súc — kỵ cho vật nuôi, gia sản',
  };
  return du in bang
    ? { pham: true, loai: bang[du] }
    : { pham: false, loai: 'Không phạm Kim Lâu' };
}

/** Hoang Ốc tính theo tuổi mụ, vòng sáu cung. */
function hoangOcCuaTuoi(tuoiMu: number): { tot: boolean; ten: string } {
  const du = mod(tuoiMu, 6) || 6;
  const bang: Record<number, { tot: boolean; ten: string }> = {
    1: { tot: true, ten: 'Nhất Cát — làm nhà thuận, mọi việc hanh thông' },
    2: { tot: true, ten: 'Nhì Nghi — làm nhà tốt, gia đạo yên ổn' },
    3: { tot: false, ten: 'Tam Địa Sát — dễ hao tài, bệnh tật' },
    4: { tot: true, ten: 'Tứ Tấn Tài — làm nhà phát tài lộc' },
    5: { tot: false, ten: 'Ngũ Thọ Tử — chia lìa, hao người' },
    6: { tot: false, ten: 'Lục Hoang Ốc — khó thành, dễ dở dang' },
  };
  return bang[du];
}

export interface KetQuaXayNha {
  tuoi: number;
  tuoiMu: number;
  namXem: number;
  canChiTuoi: string;
  canChiNam: string;
  kiemTra: KiemTra[];
  ketLuan: string;
  lyDo: string;
  khuyenNghi: string[];
  chuY: string;
}

/**
 * Xem tuổi xây nhà theo ba cửa chính: Tam Tai, Kim Lâu, Hoang Ốc.
 * Tuổi mụ = năm xem − năm sinh + 1 (theo cách tính dân gian).
 */
export function xemTuoiXayNha(namSinh: number, namXem: number): KetQuaXayNha {
  const tuoi = namXem - namSinh;
  const tuoiMu = tuoi + 1;
  const chiSinh = chiCuaNam(namSinh);
  const chiXem = chiCuaNam(namXem);

  const tamTai = tamTaiCuaChi(chiSinh).includes(chiXem);
  const kimLau = kimLauCuaTuoi(tuoiMu);
  const hoangOc = hoangOcCuaTuoi(tuoiMu);

  const kiemTra: KiemTra[] = [
    {
      ten: 'Tam Tai',
      dat: !tamTai,
      chiTiet: tamTai
        ? `Năm ${canChiNam(namXem)} rơi vào Tam Tai của tuổi ${canChiNam(namSinh)}`
        : `Năm ${canChiNam(namXem)} không phạm Tam Tai`,
    },
    { ten: 'Kim Lâu', dat: !kimLau.pham, chiTiet: `${kimLau.loai} (tuổi mụ ${tuoiMu})` },
    { ten: 'Hoang Ốc', dat: hoangOc.tot, chiTiet: `${hoangOc.ten} (tuổi mụ ${tuoiMu})` },
  ];

  const soDat = kiemTra.filter((k) => k.dat).length;
  const ketLuan =
    soDat === 3
      ? 'Rất thuận lợi để động thổ'
      : soDat === 2
        ? 'Có thể tiến hành, nên chọn thêm ngày tốt'
        : soDat === 1
          ? 'Nên cân nhắc, tốt nhất chờ năm khác'
          : 'Chưa nên động thổ trong năm này';

  const lyDo = `Tuổi ${canChiNam(namSinh)}, xem năm ${canChiNam(namXem)}: đạt ${soDat}/3 điều kiện (Tam Tai, Kim Lâu, Hoang Ốc).`;

  const khuyenNghi = [
    soDat === 3
      ? 'Có thể tiến hành động thổ, khởi công theo kế hoạch'
      : 'Ưu tiên chuẩn bị, hoàn thiện thiết kế và thủ tục trước',
    'Chọn ngày Hoàng Đạo, tránh Trực Phá và Trực Nguy để động thổ',
    'Tránh tháng 7 âm lịch và các ngày kỵ của gia đình theo tục lệ',
    soDat < 3 ? 'Nếu buộc phải làm, nên mượn tuổi người thân hợp tuổi' : 'Vẫn nên xem kỹ ngày giờ trước khi khởi công',
  ];

  return {
    tuoi,
    tuoiMu,
    namXem,
    canChiTuoi: canChiNam(namSinh),
    canChiNam: canChiNam(namXem),
    kiemTra,
    ketLuan,
    lyDo,
    khuyenNghi,
    chuY: 'Tam Tai – Kim Lâu – Hoang Ốc là cách xem phổ thông trong dân gian, chỉ nên tham khảo cùng điều kiện thực tế.',
  };
}

export interface KetQuaCuoiHoi {
  tuoiNam: number;
  tuoiNu: number;
  namXem: number;
  canChiNamNguoi: string;
  canChiNuNguoi: string;
  quanHe: string;
  kiemTra: KiemTra[];
  ketLuan: string;
  lyDo: string;
  khuyenNghi: string[];
  chuY: string;
}

/**
 * Xem tuổi cưới hỏi: quan hệ chi của hai người (tam hợp / lục hợp / lục xung /
 * lục hại), Tam Tai và Kim Lâu của cô dâu trong năm xem.
 */
export function xemTuoiCuoiHoi(namSinhNam: number, namSinhNu: number, namXem: number): KetQuaCuoiHoi {
  const tuoiNam = namXem - namSinhNam;
  const tuoiNu = namXem - namSinhNu;
  const chiNam = chiCuaNam(namSinhNam);
  const chiNu = chiCuaNam(namSinhNu);

  const hieu = mod(chiNam - chiNu, 12);
  const tong = mod(chiNam + chiNu, 12);

  let quanHe: string;
  let diem: number;
  if (hieu === 4 || hieu === 8) {
    quanHe = 'Tam hợp — hai tuổi hợp nhau, dễ đồng thuận';
    diem = 2;
  } else if (tong === 1) {
    quanHe = 'Lục hợp — hai tuổi tương trợ, thuận cho hôn nhân';
    diem = 2;
  } else if (hieu === 6) {
    quanHe = 'Lục xung — hai tuổi xung khắc, cần nhường nhịn nhiều';
    diem = -2;
  } else if (tong === 7) {
    quanHe = 'Lục hại — dễ va chạm, cần thấu hiểu';
    diem = -2;
  } else {
    quanHe = 'Bình hòa — không hợp cũng không xung';
    diem = 0;
  }

  const tamTaiNam = tamTaiCuaChi(chiNam).includes(chiCuaNam(namXem));
  const tamTaiNu = tamTaiCuaChi(chiNu).includes(chiCuaNam(namXem));
  const kimLauNu = kimLauCuaTuoi(tuoiNu + 1);

  if (kimLauNu.pham) diem -= 2;
  if (tamTaiNam) diem -= 1;
  if (tamTaiNu) diem -= 1;

  const kiemTra: KiemTra[] = [
    { ten: 'Quan hệ tuổi', dat: diem >= 0, chiTiet: quanHe },
    {
      ten: 'Tam Tai',
      dat: !tamTaiNam && !tamTaiNu,
      chiTiet: tamTaiNam || tamTaiNu
        ? `Phạm Tam Tai: ${[tamTaiNam ? 'nam' : '', tamTaiNu ? 'nữ' : ''].filter(Boolean).join(' và ')}`
        : 'Cả hai không phạm Tam Tai trong năm này',
    },
    { ten: 'Kim Lâu (cô dâu)', dat: !kimLauNu.pham, chiTiet: `${kimLauNu.loai} (tuổi mụ ${tuoiNu + 1})` },
  ];

  const ketLuan =
    diem >= 3
      ? 'Rất thuận lợi cho hôn nhân'
      : diem >= 1
        ? 'Khá thuận lợi'
        : diem === 0
          ? 'Trung tính — thuận hay không do vun đắp'
          : diem >= -2
            ? 'Cần cân nhắc kỹ'
            : 'Chưa nên tiến hành trong năm này';

  const lyDo = `Tuổi ${canChiNam(namSinhNam)} và ${canChiNam(namSinhNu)}: ${quanHe.toLowerCase()}.`;

  const khuyenNghi = [
    'Tìm hiểu kỹ và bàn bạc thấu đáo trước khi quyết định',
    'Chọn ngày Hoàng Đạo, tránh Trực Phá, Trực Nguy để làm lễ',
    kimLauNu.pham ? 'Nếu năm nay phạm Kim Lâu, có thể chờ năm sau hoặc làm lễ đơn giản' : 'Năm nay không phạm Kim Lâu, thuận cho việc cưới hỏi',
    'Tham khảo thêm ý kiến hai bên gia đình',
  ];

  return {
    tuoiNam,
    tuoiNu,
    namXem,
    canChiNamNguoi: canChiNam(namSinhNam),
    canChiNuNguoi: canChiNam(namSinhNu),
    quanHe,
    kiemTra,
    ketLuan,
    lyDo,
    khuyenNghi,
    chuY: 'Đây là cách xem tham khảo theo dân gian. Sự thấu hiểu và tôn trọng nhau mới là nền tảng của hôn nhân.',
  };
}
