/**
 * Đối chiếu hai lá số — "hợp duyên" theo Tử Vi Đẩu Số.
 *
 * Chỉ dùng các quan hệ cổ điển có thể giải thích được: tam hợp, lục hợp,
 * xung, hại giữa địa chi cung Mệnh; ngũ hành chính tinh; sao trong cung
 * Phu Thê của người này so với cung Mệnh của người kia.
 *
 * Không cho điểm tuyệt đối, không phán "phải lấy / không nên lấy".
 */

import { CHINH_TINH } from './content';
import { cungTheoTen, type LaSo } from './chart';

const TAM_HOP: string[][] = [
  ['Tý', 'Thìn', 'Thân'],
  ['Sửu', 'Tỵ', 'Dậu'],
  ['Dần', 'Ngọ', 'Tuất'],
  ['Mão', 'Mùi', 'Hợi'],
];

const LUC_HOP: [string, string][] = [
  ['Tý', 'Sửu'],
  ['Dần', 'Hợi'],
  ['Mão', 'Tuất'],
  ['Thìn', 'Dậu'],
  ['Tỵ', 'Thân'],
  ['Ngọ', 'Mùi'],
];

const XUNG: [string, string][] = [
  ['Tý', 'Ngọ'],
  ['Sửu', 'Mùi'],
  ['Dần', 'Thân'],
  ['Mão', 'Dậu'],
  ['Thìn', 'Tuất'],
  ['Tỵ', 'Hợi'],
];

const HAI: [string, string][] = [
  ['Tý', 'Mùi'],
  ['Sửu', 'Ngọ'],
  ['Dần', 'Tỵ'],
  ['Mão', 'Thìn'],
  ['Thân', 'Hợi'],
  ['Dậu', 'Tuất'],
];

const NGU_HANH_SINH: Record<string, string> = {
  Mộc: 'Hỏa',
  Hỏa: 'Thổ',
  Thổ: 'Kim',
  Kim: 'Thủy',
  Thủy: 'Mộc',
};

const NGU_HANH_KHAC: Record<string, string> = {
  Mộc: 'Thổ',
  Thổ: 'Thủy',
  Thủy: 'Hỏa',
  Hỏa: 'Kim',
  Kim: 'Mộc',
};

/** Lấy ngũ hành từ chuỗi kiểu "Âm Thổ" */
function hanhCua(s: string): string {
  for (const h of ['Kim', 'Mộc', 'Thủy', 'Hỏa', 'Thổ']) {
    if (s.includes(h)) return h;
  }
  return '';
}

export interface DiemTuongHop {
  nhan: string;
  diem: number;
  ghiChu: string;
}

export interface KetQuaDoiChieu {
  diem: number;
  mucDo: string;
  moTa: string;
  chiTiet: DiemTuongHop[];
  menhA: string;
  menhB: string;
  goiY: string[];
}

function capTrong(danhSach: [string, string][], a: string, b: string): boolean {
  return danhSach.some(([x, y]) => (x === a && y === b) || (x === b && y === a));
}

export function doiChieu(a: LaSo, b: LaSo): KetQuaDoiChieu {
  const chiTiet: DiemTuongHop[] = [];

  const menhA = cungTheoTen(a, 'Mệnh');
  const menhB = cungTheoTen(b, 'Mệnh');
  const phuTheA = cungTheoTen(a, 'Phu Thê');
  const phuTheB = cungTheoTen(b, 'Phu Thê');

  const chiA = menhA?.chi ?? '';
  const chiB = menhB?.chi ?? '';

  // 1. Quan hệ địa chi cung Mệnh
  let diemChi = 0;
  let moTaChi = 'Quan hệ địa chi bình hoà.';
  if (TAM_HOP.some((nhom) => nhom.includes(chiA) && nhom.includes(chiB)) && chiA !== chiB) {
    diemChi = 3;
    moTaChi = `Hai cung Mệnh (${chiA} — ${chiB}) thuộc cùng bộ tam hợp: dễ đồng điệu về giá trị sống và nhịp sống.`;
  } else if (capTrong(LUC_HOP, chiA, chiB)) {
    diemChi = 2;
    moTaChi = `Hai cung Mệnh (${chiA} — ${chiB}) lục hợp: bổ trợ tự nhiên, dễ thông cảm cho nhau.`;
  } else if (capTrong(XUNG, chiA, chiB)) {
    diemChi = -2;
    moTaChi = `Hai cung Mệnh (${chiA} — ${chiB}) xung nhau: dễ khác quan điểm, cần thoả thuận rõ ràng ngay từ đầu.`;
  } else if (capTrong(HAI, chiA, chiB)) {
    diemChi = -1;
    moTaChi = `Hai cung Mệnh (${chiA} — ${chiB}) hại nhau: va chạm âm thầm, nên nói thẳng thay vì đoán ý.`;
  } else if (chiA === chiB) {
    diemChi = 1;
    moTaChi = 'Hai cung Mệnh trùng địa chi: dễ thấu hiểu nhưng cũng dễ giống nhau đến mức thiếu góc nhìn mới.';
  }

  chiTiet.push({ nhan: 'Địa chi cung Mệnh', diem: diemChi, ghiChu: moTaChi });

  // 2. Ngũ hành chính tinh chủ của hai Mệnh
  const saoA = menhA?.chinhTinh[0]?.ten ?? '';
  const saoB = menhB?.chinhTinh[0]?.ten ?? '';
  const hanhA = hanhCua(CHINH_TINH[saoA]?.hanh ?? '');
  const hanhB = hanhCua(CHINH_TINH[saoB]?.hanh ?? '');

  let diemHanh = 0;
  let moTaHanh = 'Chưa đủ dữ liệu để luận ngũ hành.';
  if (hanhA && hanhB) {
    if (hanhA === hanhB) {
      diemHanh = 1;
      moTaHanh = `Hai bên cùng ${hanhA}: dễ đồng cảm, nhưng cần người chủ động phá thế bí khi cả hai cùng do dự.`;
    } else if (NGU_HANH_SINH[hanhA] === hanhB) {
      diemHanh = 2;
      moTaHanh = `${hanhA} sinh ${hanhB}: ${a.ten || 'Người A'} có xu hướng nâng đỡ ${b.ten || 'người B'}.`;
    } else if (NGU_HANH_SINH[hanhB] === hanhA) {
      diemHanh = 2;
      moTaHanh = `${hanhB} sinh ${hanhA}: ${b.ten || 'Người B'} có xu hướng nâng đỡ ${a.ten || 'bạn'}.`;
    } else if (NGU_HANH_KHAC[hanhA] === hanhB || NGU_HANH_KHAC[hanhB] === hanhA) {
      diemHanh = -1;
      moTaHanh = `${hanhA} và ${hanhB} tương khắc: khác nhịp, cần học cách nhường nhau ở việc nhỏ.`;
    } else {
      moTaHanh = `${hanhA} và ${hanhB} trung tính.`;
    }
  }
  chiTiet.push({ nhan: 'Ngũ hành chủ mệnh', diem: diemHanh, ghiChu: moTaHanh });

  // 3. Sao trong Phu Thê của người này có hội về Mệnh người kia không
  const saoMenhA = new Set(menhA?.chinhTinh.map((s) => s.ten) ?? []);
  const saoMenhB = new Set(menhB?.chinhTinh.map((s) => s.ten) ?? []);
  const saoPhuTheA = new Set(phuTheA?.chinhTinh.map((s) => s.ten) ?? []);
  const saoPhuTheB = new Set(phuTheB?.chinhTinh.map((s) => s.ten) ?? []);

  const giaoA = [...saoPhuTheA].filter((s) => saoMenhB.has(s));
  const giaoB = [...saoPhuTheB].filter((s) => saoMenhA.has(s));

  if (giaoA.length && giaoB.length) {
    chiTiet.push({
      nhan: 'Phu Thê ↔ Mệnh',
      diem: 3,
      ghiChu: `Cả hai chiều đều giao nhau (${[...new Set([...giaoA, ...giaoB])].join(', ')}): mức độ tương thích cao về cách nhìn đối phương.`,
    });
  } else if (giaoA.length || giaoB.length) {
    chiTiet.push({
      nhan: 'Phu Thê ↔ Mệnh',
      diem: 1,
      ghiChu: `Một chiều giao nhau (${[...giaoA, ...giaoB].join(', ')}): một người thấy ở đối phương mẫu người mình hướng tới, chiều còn lại chưa rõ.`,
    });
  } else {
    chiTiet.push({
      nhan: 'Phu Thê ↔ Mệnh',
      diem: 0,
      ghiChu: 'Không có sao chính tinh trùng nhau — không phải điềm xấu, chỉ là hai mẫu người khác nhau, cần nhiều thời gian tìm tiếng nói chung.',
    });
  }

  // 4. Sao tình duyên tại Phu Thê
  const tinhDuyen = ['Hồng Loan', 'Thiên Hỷ'];
  const A = [...(phuTheA?.phuTinh ?? []), ...(phuTheA?.tapTinh ?? [])].some((s) => tinhDuyen.includes(s.ten));
  const B = [...(phuTheB?.phuTinh ?? []), ...(phuTheB?.tapTinh ?? [])].some((s) => tinhDuyen.includes(s.ten));
  if (A && B) {
    chiTiet.push({ nhan: 'Sao tình duyên', diem: 1, ghiChu: 'Cả hai đều có Hồng Loan hoặc Thiên Hỷ tại Phu Thê: duyên gặp gỡ thuận, dễ có sự kiện vui.' });
  }

  const tong = chiTiet.reduce((s, x) => s + x.diem, 0);

  let mucDo = 'Trung tính';
  let moTa =
    'Hai lá số không xung khắc rõ rệt cũng không quá tương hợp. Đây là mức phổ biến nhất — chất lượng quan hệ phụ thuộc vào cách hai người vận hành hơn là vào lá số.';
  if (tong >= 6) {
    mucDo = 'Rất tương hợp';
    moTa =
      'Nhiều chỉ dấu thuận lợi cùng xuất hiện. Đây là nền tảng tốt, nhưng vẫn cần hai bên chủ động giữ nhịp — lá số không tự giữ hộ mối quan hệ.';
  } else if (tong >= 3) {
    mucDo = 'Khá tương hợp';
    moTa = 'Có điểm tựa để đồng hành. Khác biệt còn lại nên xem là phần bổ sung chứ không phải lý do để loại trừ.';
  } else if (tong <= -2) {
    mucDo = 'Cần lưu tâm';
    moTa =
      'Có vài điểm xung khắc, chủ yếu ở cách phản ứng và nhịp sống. Không phải lời can ngăn — chỉ là nhắc bạn nói rõ kỳ vọng sớm, đừng để hiểu lầm tích tụ.';
  }

  const goiY: string[] = [];
  if (diemChi <= -1) {
    goiY.push(
      'Địa chi cung Mệnh xung/hại: thống nhất trước về tiền bạc, nhà ở và cách nuôi con — đây là ba điểm dễ va chạm nhất.',
    );
  }
  if (diemHanh === -1) {
    goiY.push(
      'Ngũ hành tương khắc: mỗi người có nhịp xử lý khác nhau. Người chậm không phải lười, người nhanh không phải hời hợt.',
    );
  }
  if (!giaoA.length && !giaoB.length) {
    goiY.push(
      'Hai mẫu người khác nhau: hãy nói về kỳ vọng bằng ví dụ cụ thể ("cuối tuần tôi muốn…") thay vì nhận xét tính cách.',
    );
  }
  goiY.push(
    'Đối chiếu lá số chỉ là một lớp thông tin. Nó không thay thế được việc quan sát cách đối phương hành xử khi có chuyện — đó mới là dữ liệu đáng tin nhất.',
  );

  return {
    diem: tong,
    mucDo,
    moTa,
    chiTiet,
    menhA: `${chiA}${saoA ? ` · ${saoA}` : ''}`,
    menhB: `${chiB}${saoB ? ` · ${saoB}` : ''}`,
    goiY,
  };
}
