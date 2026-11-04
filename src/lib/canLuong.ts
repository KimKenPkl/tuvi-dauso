/**
 * Cân lượng chỉ (称骨算命) — cân xương tính số.
 *
 * Mỗi năm, tháng, ngày, giờ sinh (âm lịch) có một trọng số quy ước tính bằng
 * "lượng" và "chỉ". Cộng bốn phần lại ra tổng cân nặng của "bộ xương số mệnh",
 * rồi tra bảng luận giải tương ứng.
 *
 * Toàn bộ trọng số lưu bằng số nguyên "phân lượng" (1 = 0,1 lượng) để tránh
 * sai số dấu phẩy động khi cộng.
 *
 * Nguồn bảng: bản 称骨算命 lưu hành phổ biến (đối chiếu nhiều trang tra cứu
 * tiếng Việt và tiếng Trung). Luận giải ở đây là bản tóm tắt do dự án biên
 * soạn, không sao chép nguyên văn bài ca cổ.
 */

export const CAN = [
  'Giáp',
  'Ất',
  'Bính',
  'Đinh',
  'Mậu',
  'Kỷ',
  'Canh',
  'Tân',
  'Nhâm',
  'Quý',
] as const;

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

/**
 * Trọng số 60 năm, thứ tự Giáp Tý → Quý Hợi, đơn vị phân lượng.
 * 1.2 lượng = 12.
 */
export const NAM_W: readonly number[] = [
  12, 9, 6, 7, 12, 5, 9, 8, 7, 8, 5, 9, 16, 8, 8, 19, 12, 6, 8, 7, 5, 15, 6, 16,
  15, 8, 9, 12, 10, 7, 15, 6, 5, 14, 14, 9, 7, 7, 9, 12, 8, 7, 13, 5, 14, 5, 9,
  17, 5, 5, 12, 8, 8, 6, 19, 6, 8, 16, 10, 7,
];

/** Trọng số 12 tháng âm lịch, tháng 1 → 12. */
export const THANG_W: readonly number[] = [6, 7, 18, 9, 5, 16, 9, 15, 18, 8, 9, 5];

/** Trọng số 30 ngày âm lịch, ngày 1 → 30. */
export const NGAY_W: readonly number[] = [
  5, 10, 8, 15, 16, 15, 8, 16, 8, 16, 9, 17, 8, 17, 10, 8, 9, 18, 5, 15, 10, 9, 8,
  9, 15, 18, 7, 8, 16, 6,
];

/** Trọng số 12 giờ theo chi, Tý → Hợi. */
export const GIO_W: readonly number[] = [16, 6, 7, 10, 9, 16, 10, 8, 8, 9, 6, 6];

/** Chỉ số 0..59 của năm dương lịch (Giáp Tý = năm 4). */
export function chiSoNam(nam: number): number {
  return (((nam - 4) % 60) + 60) % 60;
}

/** Can Chi của một năm dương lịch. */
export function canChiNam(nam: number): string {
  const i = chiSoNam(nam);
  return `${CAN[i % 10]} ${CHI[i % 12]}`;
}

/** "4 lượng 3 chỉ" / "5 lượng" */
export function docLuong(muoi: number): string {
  const luong = Math.floor(muoi / 10);
  const chi = muoi % 10;
  if (!chi) return `${luong} lượng`;
  return `${luong} lượng ${chi} chỉ`;
}

export interface MucCanLuong {
  /** Tổng phân lượng, ví dụ 43 = 4 lượng 3 chỉ */
  tong: number;
  ten: string;
  tomTat: string;
  nhom: 'thap' | 'trung' | 'kha' | 'cao';
}

/**
 * 52 mức từ 2 lượng 1 chỉ đến 7 lượng 2 chỉ.
 * Luận giải là bản tóm tắt một dòng, chỉ mang tính tham khảo.
 */
export const BANG_LUAN: readonly MucCanLuong[] = [
  { tong: 21, ten: 'Thân cô thế cô', tomTat: 'Nhiều phen vất vả, ít người nâng đỡ; cần bền chí và tránh liều lĩnh lớn.', nhom: 'thap' },
  { tong: 22, ten: 'Lận đận buổi đầu', tomTat: 'Tuổi trẻ long đong, về sau mới có chỗ dựa; giữ sức khoẻ và tiết kiệm.', nhom: 'thap' },
  { tong: 23, ten: 'Gánh nặng một mình', tomTat: 'Việc gì cũng phải tự lo, khó nhờ vả; hợp nghề thủ công, kỹ thuật.', nhom: 'thap' },
  { tong: 24, ten: 'Cầu tài khó đạt', tomTat: 'Tiền tài đến chậm, dễ hao vì việc ngoài; nên làm việc có kế hoạch dài.', nhom: 'thap' },
  { tong: 25, ten: 'Gốc nhà mỏng', tomTat: 'Ít được hưởng của ông bà, phải tự lập sớm; đi xa lại dễ thành công.', nhom: 'thap' },
  { tong: 26, ten: 'Lao tâm lao lực', tomTat: 'Bôn ba vì cơm áo; cuối đời nhẹ nhõm hơn nếu biết giữ mình.', nhom: 'thap' },
  { tong: 27, ten: 'Mưu nhiều thành ít', tomTat: 'Tính toán nhiều mà kết quả chưa tương xứng; nên chọn một hướng rồi theo tới cùng.', nhom: 'thap' },
  { tong: 28, ten: 'Nổi trôi như cánh bèo', tomTat: 'Đổi chỗ, đổi nghề nhiều lần; duyên xa quê mạnh hơn ở quê.', nhom: 'thap' },
  { tong: 29, ten: 'Chưa gặp thời', tomTat: 'Buổi đầu lận đận, từ trung vận mới khá; kiên nhẫn tích luỹ.', nhom: 'thap' },
  { tong: 30, ten: 'Vất vả cầu sinh', tomTat: 'Mọi thứ đến từ mồ hôi nước mắt; hợp nghề buôn bán nhỏ, dịch vụ.', nhom: 'thap' },
  { tong: 31, ten: 'Bận rộn quanh năm', tomTat: 'Công việc cuốn đi, ít thời gian an nhàn; cần sắp xếp để giữ sức.', nhom: 'thap' },
  { tong: 32, ten: 'Khởi nghiệp gian nan', tomTat: 'Những năm đầu dễ thất bại; càng về sau càng vững nếu không bỏ cuộc.', nhom: 'thap' },
  { tong: 33, ten: 'Việc lớn khó thành', tomTat: 'Nên làm việc vừa sức, tránh ôm đồm; thành quả đến từ tích tiểu thành đại.', nhom: 'thap' },
  { tong: 34, ten: 'Phúc mỏng tài mọn', tomTat: 'Cuộc sống thiếu hụt lúc trẻ; về già đủ ăn nếu biết vun vén.', nhom: 'thap' },
  { tong: 35, ten: 'Có tài mà thiếu thời', tomTat: 'Năng lực khá nhưng ít đất dụng võ; gặp người đỡ đầu thì bật lên.', nhom: 'thap' },
  { tong: 36, ten: 'Tự lực cánh sinh', tomTat: 'Không ỷ được vào ai, bù lại có ý chí; nên học một nghề chắc tay.', nhom: 'trung' },
  { tong: 37, ten: 'Việc nào cũng dở dang', tomTat: 'Dễ bỏ giữa chừng; cần người đồng hành và kỷ luật cá nhân.', nhom: 'trung' },
  { tong: 38, ten: 'Thanh cao, ít bạn', tomTat: 'Sống sạch sẽ, khó hoà đồng; hợp học thuật, nghiên cứu, giáo dục.', nhom: 'trung' },
  { tong: 39, ten: 'Vận trẻ chưa thông', tomTat: 'Ba mươi năm đầu còn chật vật, sau đó mới mở; đừng nôn nóng.', nhom: 'trung' },
  { tong: 40, ten: 'Cơm áo đầy đủ', tomTat: 'Đời sống vật chất ổn định, ít sóng gió lớn; giữ nếp thì bền.', nhom: 'trung' },
  { tong: 41, ten: 'Khác người, có nét riêng', tomTat: 'Đi con đường riêng, dễ thành công ở lĩnh vực mới; tránh a dua.', nhom: 'trung' },
  { tong: 42, ten: 'Càng rộng càng hanh thông', tomTat: 'Biết buông bớt thì được nhiều; hợp làm ăn có đối tác.', nhom: 'trung' },
  { tong: 43, ten: 'Thông minh, lanh lợi', tomTat: 'Học nhanh, ứng biến tốt; cần tránh nóng nảy và ham hơn thua.', nhom: 'trung' },
  { tong: 44, ten: 'Cầu gì được nấy', tomTat: 'Duyên may đến sớm; chớ ỷ vào vận may mà buông lơi.', nhom: 'trung' },
  { tong: 45, ten: 'Bốn phương đều có đường', tomTat: 'Đi đâu cũng có kế sinh nhai; càng xa quê càng phát.', nhom: 'trung' },
  { tong: 46, ten: 'Cuối đời mới vượng', tomTat: 'Tuổi trẻ chật vật, trung niên khởi sắc, già an nhàn.', nhom: 'trung' },
  { tong: 47, ten: 'Khởi đầu chậm', tomTat: 'Vạn sự khởi đầu nan; sau ba mươi mới thấy thành quả.', nhom: 'trung' },
  { tong: 48, ten: 'Phúc khí không nhỏ', tomTat: 'Được người quý mến, có của ăn của để; giữ chữ tín thì bền.', nhom: 'trung' },
  { tong: 49, ten: 'Danh lợi cùng tới', tomTat: 'Có thể đạt cả tiếng và tiền; nên chia sẻ để giữ phúc.', nhom: 'trung' },
  { tong: 50, ten: 'Hanh thông một đời', tomTat: 'Việc gì cũng xuôi, ít trở ngại; cần khiêm nhường để không mất lòng.', nhom: 'kha' },
  { tong: 51, ten: 'Phúc lộc vẹn toàn', tomTat: 'Gia đạo yên ấm, sự nghiệp vững; hợp làm chủ.', nhom: 'kha' },
  { tong: 52, ten: 'Tướng mạo đường hoàng', tomTat: 'Có uy, được nể trọng; cẩn thận kẻo tự mãn.', nhom: 'kha' },
  { tong: 53, ten: 'Khí chất thanh nhã', tomTat: 'Trong sáng, dễ được đề bạt; hợp văn hoá, giáo dục, y dược.', nhom: 'kha' },
  { tong: 54, ten: 'Có hậu vận', tomTat: 'Về sau dư dả, con cháu nhờ; nên lo từ sớm cho tuổi già.', nhom: 'kha' },
  { tong: 55, ten: 'Cầu tài có lộc', tomTat: 'Buôn bán thuận, tiền vào ra đều; tránh cờ bạc.', nhom: 'kha' },
  { tong: 56, ten: 'Lễ nghĩa vẹn toàn', tomTat: 'Được lòng người, quan hệ rộng; nên giữ chữ tín làm gốc.', nhom: 'kha' },
  { tong: 57, ten: 'Phú quý như ý', tomTat: 'Tiền của dồi dào, gia đình hoà thuận; tránh xa hoa phù phiếm.', nhom: 'kha' },
  { tong: 58, ten: 'Tiền của tự đến', tomTat: 'Có lộc trời cho, làm gì cũng dễ về tiền; giữ đức để lộc bền.', nhom: 'kha' },
  { tong: 59, ten: 'Thông minh, sang trọng', tomTat: 'Trí tuệ và phong thái đều tốt; có khả năng dẫn dắt tập thể.', nhom: 'kha' },
  { tong: 60, ten: 'Một bước lên mây', tomTat: 'Có quý nhân, dễ đạt công danh; đừng để vinh hoa làm mờ mắt.', nhom: 'kha' },
  { tong: 61, ten: 'Không phải quan nhưng có danh', tomTat: 'Giàu có, tiếng tăm vang; hợp kinh doanh và nghề tự do.', nhom: 'cao' },
  { tong: 62, ten: 'Phúc không cạn', tomTat: 'Số hưởng sung sướng, ít phải lo toan; cần tu dưỡng để giữ.', nhom: 'cao' },
  { tong: 63, ten: 'Quyền uy, danh vọng', tomTat: 'Có chức vị hoặc uy tín lớn; nên dùng quyền để giúp người.', nhom: 'cao' },
  { tong: 64, ten: 'Uy thế hiếm có', tomTat: 'Sự nghiệp lớn, tiếng tăm mạnh; tránh độc đoán.', nhom: 'cao' },
  { tong: 65, ten: 'Phúc đức sâu dày', tomTat: 'Hưởng lộc tổ tiên, gia đạo yên; giữ hiếu nghĩa thì thêm phúc.', nhom: 'cao' },
  { tong: 66, ten: 'Một đời an nhàn', tomTat: 'Cửa nhà êm ấm, tiền bạc đủ dùng; ít sóng gió lớn.', nhom: 'cao' },
  { tong: 67, ten: 'Cơ nghiệp tự gây', tomTat: 'Tay trắng dựng cơ đồ, về sau con cháu kế nghiệp.', nhom: 'cao' },
  { tong: 68, ten: 'Số làm quan', tomTat: 'Quan lộ thênh thang, được trọng vọng; giữ liêm chính.', nhom: 'cao' },
  { tong: 69, ten: 'Trẻ gian nan, già sung túc', tomTat: 'Vượt qua thời trẻ vất vả sẽ hưởng yên vui về sau.', nhom: 'cao' },
  { tong: 70, ten: 'Lưng đeo kim ngọc', tomTat: 'Bậc đại phú, của cải dồi dào; rủi ro nằm ở chỗ tham quá.', nhom: 'cao' },
  { tong: 71, ten: 'Số hiếm có', tomTat: 'Vượng từ rất sớm, tài quyền đủ cả; phải tránh kiêu và độc.', nhom: 'cao' },
  { tong: 72, ten: 'Bậc quyền quý hiếm thấy', tomTat: 'Địa vị cao, phúc lộc dày; giữ đức độ để bền lâu.', nhom: 'cao' },
];

export function mucTheo(tongMuoi: number): MucCanLuong {
  const i = Math.min(Math.max(tongMuoi, 21), 72) - 21;
  return BANG_LUAN[i] ?? BANG_LUAN[0];
}

export interface PhanCanLuong {
  nhan: string;
  chiTiet: string;
  muoi: number;
}

export interface KetQuaCanLuong {
  canChiNam: string;
  amLich: string;
  phan: PhanCanLuong[];
  tongMuoi: number;
  tongChu: string;
  muc: MucCanLuong;
  gioiTinh: 'Nam' | 'Nữ';
}

export interface DauVaoCanLuong {
  /** Ngày âm lịch 1..30 */
  ngay: number;
  /** Tháng âm lịch 1..12 */
  thang: number;
  /** Năm âm lịch, ví dụ 1999 */
  nam: number;
  /** Tên chi của giờ sinh */
  gioChi: string;
  gioiTinh: 'Nam' | 'Nữ';
}

export function tinhCanLuong(v: DauVaoCanLuong): KetQuaCanLuong {
  const ngay = Math.min(Math.max(Math.round(v.ngay), 1), 30);
  const thang = Math.min(Math.max(Math.round(v.thang), 1), 12);
  const namIndex = chiSoNam(v.nam);
  const gioIndex = Math.max(0, CHI.indexOf(v.gioChi as (typeof CHI)[number]));

  const pNam = NAM_W[namIndex];
  const pThang = THANG_W[thang - 1];
  const pNgay = NGAY_W[ngay - 1];
  const pGio = GIO_W[gioIndex];
  const tongMuoi = pNam + pThang + pNgay + pGio;

  return {
    canChiNam: `${CAN[namIndex % 10]} ${CHI[namIndex % 12]}`,
    amLich: `${ngay}/${thang}${v.nam ? `/${v.nam}` : ''}`,
    gioiTinh: v.gioiTinh,
    phan: [
      { nhan: 'Năm', chiTiet: `${CAN[namIndex % 10]} ${CHI[namIndex % 12]}`, muoi: pNam },
      { nhan: 'Tháng', chiTiet: `Tháng ${thang} âm`, muoi: pThang },
      { nhan: 'Ngày', chiTiet: `Ngày ${ngay} âm`, muoi: pNgay },
      { nhan: 'Giờ', chiTiet: `Giờ ${v.gioChi}`, muoi: pGio },
    ],
    tongMuoi,
    tongChu: docLuong(tongMuoi),
    muc: mucTheo(tongMuoi),
  };
}

/** Lấy dữ liệu từ lá số đã lập (chính xác hơn vì đã quy đổi âm lịch). */
export function tuLaSo(
  ls: {
    amLichSo: { ngay: number; thang: number; nam: number };
    gio: { index: number };
    gioiTinh: 'Nam' | 'Nữ';
  },
): KetQuaCanLuong {
  const gioChi = CHI[ls.gio.index % 12];
  return tinhCanLuong({
    ngay: ls.amLichSo.ngay,
    thang: ls.amLichSo.thang,
    nam: ls.amLichSo.nam,
    gioChi,
    gioiTinh: ls.gioiTinh,
  });
}
