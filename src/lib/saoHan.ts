/**
 * Sao hạn Cửu Diệu (九曜) + văn khấn giải hạn.
 *
 * Chín sao luân phiên chiếu mệnh theo chu kỳ 9 năm. Quy tắc dân gian:
 *   - Nam: tuổi mụ 10 gặp La Hầu, sau đó mỗi năm tiến một sao.
 *   - Nữ : tuổi mụ 10 gặp Kế Đô, sau đó mỗi năm tiến một sao.
 *
 * Dữ liệu tên sao, tính chất cát/hung và danh hiệu tụng lấy theo bản văn khấn
 * giải hạn lưu hành phổ biến. Phần luận giải chỉ là tóm tắt tham khảo.
 */

export type TinhChat = 'cat' | 'hung' | 'binh';

export interface SaoChieu {
  key: string;
  ten: string;
  han: string;
  tinhChat: TinhChat;
  yNghia: string;
  danhHieu: string;
  /** Sao này tốt hơn cho giới tính nào (nếu có quy ước) */
  hopGioiTinh?: 'Nam' | 'Nữ';
}

export const CUU_DIEU: readonly SaoChieu[] = [
  {
    key: 'la-hau',
    ten: 'La Hầu',
    han: '羅睺',
    tinhChat: 'hung',
    yNghia:
      'Chủ hao tài, thị phi, bệnh về mắt và khí huyết. Năm gặp La Hầu nên giữ lời ăn tiếng nói, tránh tranh chấp và chú ý sức khoẻ.',
    danhHieu: 'Đức Thiên cung Thần chủ La Hầu Tinh quân',
  },
  {
    key: 'ke-do',
    ten: 'Kế Đô',
    han: '計都',
    tinhChat: 'hung',
    yNghia:
      'Chủ tai nạn, kiện cáo, hao tổn và chuyện buồn trong nhà. Nên cẩn trọng khi đi lại, giấy tờ và tránh quyết định lớn trong năm.',
    danhHieu: 'Đức Địa cung Thần Vỹ Kế Đô Tinh quân',
  },
  {
    key: 'thai-duong',
    ten: 'Thái Dương',
    han: '太陽',
    tinhChat: 'cat',
    yNghia:
      'Chủ quyền quý, danh tiếng, công danh. Nam gặp thì thuận, nữ gặp phải vất vả hơn vì phải gánh vác nhiều việc.',
    danhHieu: 'Đức Nhật cung Thái Dương Thiên tử Tinh quân',
    hopGioiTinh: 'Nam',
  },
  {
    key: 'thai-am',
    ten: 'Thái Âm',
    han: '太陰',
    tinhChat: 'cat',
    yNghia:
      'Chủ điền sản, của cải và tình cảm. Nữ gặp thì thuận, nam gặp dễ vướng chuyện tình cảm hoặc phải lo việc nhà.',
    danhHieu: 'Đức Nguyệt cung Thái Âm Hoàng hậu Tinh quân',
    hopGioiTinh: 'Nữ',
  },
  {
    key: 'moc-duc',
    ten: 'Mộc Đức',
    han: '木德',
    tinhChat: 'cat',
    yNghia:
      'Chủ phúc thọ, quý nhân, hanh thông. Năm gặp Mộc Đức dễ có người giúp, việc làm ăn và học hành thuận lợi.',
    danhHieu: 'Đức Đông phương Giáp Ất Mộc Đức Tinh quân',
  },
  {
    key: 'hoa-duc',
    ten: 'Hỏa Đức',
    han: '火德',
    tinhChat: 'hung',
    yNghia:
      'Chủ hoả hoạn, nóng giận, kiện tụng. Nên cẩn thận điện, lửa, xe cộ và giữ hoà khí trong gia đình.',
    danhHieu: 'Đức Nam phương Bính Đinh Hỏa Đức Tinh quân',
  },
  {
    key: 'tho-duc',
    ten: 'Thổ Đức',
    han: '土德',
    tinhChat: 'binh',
    yNghia:
      'Chủ an ổn, điền thổ, chậm mà chắc. Năm gặp Thổ Đức ít biến động lớn, hợp việc xây dựng, mua bán nhà đất.',
    danhHieu: 'Đức Trung ương Mậu Kỷ Thổ Đức Tinh quân',
  },
  {
    key: 'thai-bach',
    ten: 'Thái Bạch',
    han: '太白',
    tinhChat: 'hung',
    yNghia:
      'Chủ tang thương, đao binh, phá tài. Nên tránh đi xa đường hiểm, cẩn thận va chạm và hạn chế cho vay mượn.',
    danhHieu: 'Đức Tây phương Canh Tân Kim đức Thái Bạch Tinh quân',
  },
  {
    key: 'thuy-duc',
    ten: 'Thủy Đức',
    han: '水德',
    tinhChat: 'cat',
    yNghia:
      'Chủ thông minh, tài lộc, đi lại thuận. Năm gặp Thủy Đức hợp việc học, việc giao dịch và mở rộng quan hệ.',
    danhHieu: 'Đức Bắc phương Nhâm Quý Thủy đức Tinh quân',
  },
] as const;

/** Tuổi mụ = năm xem − năm sinh + 1 */
export function tuoiMu(namSinh: number, namXem: number): number {
  return namXem - namSinh + 1;
}

/** Vị trí sao trong vòng Cửu Diệu (0 = La Hầu … 8 = Thủy Đức). */
export function viTriSao(tuoi: number, gioiTinh: 'Nam' | 'Nữ'): number {
  const goc = gioiTinh === 'Nam' ? 0 : 1;
  return (((tuoi - 10 + goc) % 9) + 9) % 9;
}

export interface KetQuaSaoHan {
  namXem: number;
  namSinh: number;
  tuoiMu: number;
  gioiTinh: 'Nam' | 'Nữ';
  sao: SaoChieu;
  /** Năm trước / năm sau để người dùng thấy vòng xoay */
  truoc: SaoChieu;
  sau: SaoChieu;
}

export function saoChieuMenh(
  namSinh: number,
  gioiTinh: 'Nam' | 'Nữ',
  namXem: number,
): KetQuaSaoHan {
  const tuoi = tuoiMu(namSinh, namXem);
  const i = viTriSao(tuoi, gioiTinh);
  return {
    namXem,
    namSinh,
    tuoiMu: tuoi,
    gioiTinh,
    sao: CUU_DIEU[i],
    truoc: CUU_DIEU[(i + 8) % 9],
    sau: CUU_DIEU[(i + 1) % 9],
  };
}

export const LE_VAT = [
  'Hương (nhang)',
  'Hoa tươi',
  'Ngũ quả',
  'Trầu cau',
  'Rượu, nước',
  'Gạo, muối',
  'Tiền vàng',
  'Đèn hoặc nến',
];

export const THOI_GIAN_CUNG =
  'Cúng từ mùng 8 đến 15 tháng Giêng âm lịch, tốt nhất là mùng 8 hoặc Rằm. Nhiều nơi cúng vào buổi chiều tối, khoảng 17–19 giờ.';

export interface DauVaoVanKhan {
  ten: string;
  namSinh: number;
  tuoiMu: number;
  diaChi: string;
  sao: string;
  danhHieu: string;
  ngay: number;
  thang: number;
  nam: number;
}

/** Văn khấn giải hạn theo bản lưu hành phổ biến, đã điền sẵn chỗ trống. */
export function taoVanKhan(v: DauVaoVanKhan): string {
  const ten = v.ten.trim() || '……………';
  const diaChi = v.diaChi.trim() || '……………';
  return `Nam mô A Di Đà Phật (3 lần)

Con lạy chín phương Trời, mười phương Chư Phật, Chư Phật mười phương.
Con kính lạy Hoàng thiên Hậu thổ, chư vị Tôn thần.
Con kính lạy các ngài Thần linh cai quản trong khu vực này.

Hôm nay là ngày ${v.ngay} tháng ${v.thang} năm ${v.nam} (âm lịch).

Tín chủ con là: ${ten}
Sinh năm ${v.namSinh}, năm nay ${v.tuoiMu} tuổi mụ.
Ngụ tại: ${diaChi}

Nhân dịp đầu năm, tín chủ con thành tâm sắm lễ: hương, hoa, ngũ quả, trầu cau, rượu, nước, gạo, muối, tiền vàng, bày ra trước án.

Cúi xin các vị Tôn thần chứng giám lòng thành, phù hộ cho tín chủ con năm nay bình an, mạnh khoẻ, làm ăn thuận lợi, gia đạo yên ấm.

Năm nay, sao chiếu mệnh của tín chủ con là: ${v.sao}.

Con kính lạy: ${v.danhHieu}.

Cúi xin Ngài giáng lâm chứng giám, ban phúc, giải trừ hạn dữ, độ cho tín chủ con tai qua nạn khỏi, vạn sự hanh thông.

Lễ bái xong, tín chủ con xin hồi hướng công đức cho ông bà tổ tiên, cha mẹ, anh chị em và tất cả chúng sinh.

Nam mô A Di Đà Phật (3 lần)`;
}
