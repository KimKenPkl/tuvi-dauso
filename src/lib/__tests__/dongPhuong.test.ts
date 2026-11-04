/**
 * Test hồi quy cho nhóm công cụ phương Đông:
 * cân lượng, sao hạn Cửu Diệu, phong thuỷ Bát Trạch, Kinh Dịch.
 *
 * Chạy bằng `npx tsx src/lib/__tests__/dongPhuong.test.ts`.
 */
import {
  BANG_LUAN,
  GIO_W,
  NAM_W,
  NGAY_W,
  THANG_W,
  canChiNam,
  docLuong,
  tinhCanLuong,
} from '../canLuong';
import { CUU_DIEU, saoChieuMenh, viTriSao } from '../saoHan';
import {
  HUONG_QUAI,
  Y_NGHIA_DU_NIEN,
  duNienCua,
  menhQuai,
  xemPhongThuy,
} from '../phongThuy';
import { NHI_PHAN_QUAI, QUE, gieoQue, queTheoHao } from '../kinhDich';
import { NGU_NHAC, NGU_QUAN, TAM_DINH, TU_DOC } from '../tuongSo';

let loi = 0;

function kiemTra(dieuKien: boolean, moTa: string, chiTiet?: string) {
  if (dieuKien) {
    console.log(`✓ ${moTa}`);
  } else {
    loi++;
    console.error(`✗ ${moTa}${chiTiet ? ` — ${chiTiet}` : ''}`);
  }
}

// ── 1. Cân lượng ─────────────────────────────────────────────────────────

console.log('— Cân lượng —');
kiemTra(NAM_W.length === 60, 'Bảng năm có đủ 60 Giáp Tý', `có ${NAM_W.length}`);
kiemTra(THANG_W.length === 12, 'Bảng tháng có 12 mức', `có ${THANG_W.length}`);
kiemTra(NGAY_W.length === 30, 'Bảng ngày có 30 mức', `có ${NGAY_W.length}`);
kiemTra(GIO_W.length === 12, 'Bảng giờ có 12 mức', `có ${GIO_W.length}`);
kiemTra(BANG_LUAN.length === 52, 'Bảng luận có 52 mức', `có ${BANG_LUAN.length}`);

const tongDayDu = BANG_LUAN.every((m, i) => m.tong === 21 + i);
kiemTra(tongDayDu, 'Bảng luận chạy liên tục 2.1 → 7.2');

kiemTra(canChiNam(1999) === 'Kỷ Mão', 'Năm 1999 là Kỷ Mão', canChiNam(1999));
kiemTra(canChiNam(2026) === 'Bính Ngọ', 'Năm 2026 là Bính Ngọ', canChiNam(2026));
kiemTra(canChiNam(1990) === 'Canh Ngọ', 'Năm 1990 là Canh Ngọ', canChiNam(1990));

// Ca đã biết: 23/11/1999 dương → 16/10 Kỷ Mão, giờ Thân
const kl = tinhCanLuong({ ngay: 16, thang: 10, nam: 1999, gioChi: 'Thân', gioiTinh: 'Nam' });
kiemTra(kl.tongMuoi === 43, '16/10 Kỷ Mão giờ Thân = 4 lượng 3 chỉ', kl.tongChu);
kiemTra(kl.tongChu === '4 lượng 3 chỉ', 'Đọc đúng chuỗi 4.3', kl.tongChu);
kiemTra(
  kl.phan.map((p) => p.muoi).join(',') === '19,8,8,8',
  'Bốn phần đúng trọng số 1.9 / 0.8 / 0.8 / 0.8',
  kl.phan.map((p) => p.muoi).join(','),
);
kiemTra(docLuong(50) === '5 lượng', 'Đọc 5.0 gọn thành "5 lượng"', docLuong(50));
kiemTra(docLuong(21) === '2 lượng 1 chỉ', 'Đọc 2.1 đúng', docLuong(21));

// ── 2. Sao hạn Cửu Diệu ─────────────────────────────────────────────────

console.log('— Sao hạn —');
kiemTra(CUU_DIEU.length === 9, 'Có đủ 9 sao Cửu Diệu', `có ${CUU_DIEU.length}`);

const nam10 = saoChieuMenh(2017, 'Nam', 2026);
kiemTra(nam10.tuoiMu === 10, 'Nam 2017 xem 2026 là tuổi mụ 10', String(nam10.tuoiMu));
kiemTra(nam10.sao.ten === 'La Hầu', 'Nam tuổi mụ 10 gặp La Hầu', nam10.sao.ten);

const nu10 = saoChieuMenh(2017, 'Nữ', 2026);
kiemTra(nu10.sao.ten === 'Kế Đô', 'Nữ tuổi mụ 10 gặp Kế Đô', nu10.sao.ten);

const nam19 = saoChieuMenh(2017, 'Nam', 2035);
kiemTra(nam19.sao.ten === 'La Hầu', 'Chu kỳ 9 năm: tuổi mụ 19 lặp La Hầu', nam19.sao.ten);

const vongNam = Array.from({ length: 9 }, (_, i) => viTriSao(10 + i, 'Nam'));
kiemTra(new Set(vongNam).size === 9, '9 năm liên tiếp đi qua đủ 9 sao');
kiemTra(viTriSao(10, 'Nam') === 0, 'Nam tuổi mụ 10 ở vị trí 0 (La Hầu)');

// ── 3. Phong thuỷ Bát Trạch ─────────────────────────────────────────────

console.log('— Phong thuỷ —');
kiemTra(menhQuai(1990, 'Nam').quai === 'Khảm', 'Nam 1990 mệnh Khảm', menhQuai(1990, 'Nam').quai);
kiemTra(menhQuai(1995, 'Nam').quai === 'Khôn', 'Nam 1995 mệnh Khôn', menhQuai(1995, 'Nam').quai);
kiemTra(menhQuai(1995, 'Nữ').quai === 'Khảm', 'Nữ 1995 mệnh Khảm', menhQuai(1995, 'Nữ').quai);
kiemTra(menhQuai(2000, 'Nam').quai === 'Ly', 'Nam 2000 mệnh Ly', menhQuai(2000, 'Nam').quai);
kiemTra(menhQuai(2000, 'Nữ').quai === 'Càn', 'Nữ 2000 mệnh Càn', menhQuai(2000, 'Nữ').quai);

kiemTra(
  menhQuai(1990, 'Nam').nhom === 'Đông tứ mệnh',
  'Khảm thuộc Đông tứ mệnh',
  menhQuai(1990, 'Nam').nhom,
);
kiemTra(
  menhQuai(1990, 'Nam').huongTot.length === 4,
  'Mỗi mệnh có đúng 4 hướng tốt',
  String(menhQuai(1990, 'Nam').huongTot.length),
);
kiemTra(
  menhQuai(1990, 'Nam').huongXau.length === 4,
  'Mỗi mệnh có đúng 4 hướng xấu',
  String(menhQuai(1990, 'Nam').huongXau.length),
);

// Bảng du niên phải đối xứng: A nhìn B và B nhìn A cùng một sao
const QUAI_LIST = ['Càn', 'Khảm', 'Cấn', 'Chấn', 'Tốn', 'Ly', 'Khôn', 'Đoài'] as const;
let doiXung = true;
for (const a of QUAI_LIST) {
  for (const b of QUAI_LIST) {
    if (duNienCua(a, b) !== duNienCua(b, a)) {
      doiXung = false;
      console.error(`   lệch: ${a}/${b} = ${duNienCua(a, b)} vs ${duNienCua(b, a)}`);
    }
  }
}
kiemTra(doiXung, 'Bảng du niên đối xứng qua 8 quái');

const duNienCuaTungQuai = QUAI_LIST.every((q) => {
  const tot = QUAI_LIST.filter((x) => Y_NGHIA_DU_NIEN[duNienCua(q, x)].tot).length;
  return tot === 4;
});
kiemTra(duNienCuaTungQuai, 'Mỗi quái có đúng 4 hướng cát');

kiemTra(HUONG_QUAI.length === 8, 'Đủ 8 hướng', String(HUONG_QUAI.length));
kiemTra(
  duNienCua('Khảm', 'Tốn') === 'Sinh Khí',
  'Khảm mệnh: Đông Nam là Sinh Khí',
  duNienCua('Khảm', 'Tốn'),
);
kiemTra(
  duNienCua('Khảm', 'Khảm') === 'Phục Vị',
  'Khảm mệnh: Bắc là Phục Vị',
  duNienCua('Khảm', 'Khảm'),
);

const pt = xemPhongThuy(1990, 'Nam');
kiemTra(pt.canChi === 'Canh Ngọ', 'Năm 1990 là Canh Ngọ', pt.canChi);
kiemTra(pt.napAm === 'Lộ Bàng Thổ', 'Nạp âm 1990 là Lộ Bàng Thổ', pt.napAm);
kiemTra(pt.hanhBanMenh === 'Thổ', 'Bản mệnh 1990 hành Thổ', pt.hanhBanMenh);
kiemTra(pt.huong.length === 8, 'Trả đủ 8 hướng chi tiết', String(pt.huong.length));

// ── 4. Kinh Dịch ────────────────────────────────────────────────────────

console.log('— Kinh Dịch —');
kiemTra(QUE.length === 64, 'Có đủ 64 quẻ', `có ${QUE.length}`);
kiemTra(new Set(QUE.map((q) => q.so)).size === 64, 'Số quẻ không trùng');
kiemTra(
  QUE.every((q, i) => q.so === i + 1),
  'Số quẻ chạy đúng 1 → 64',
);

const khoa = QUE.map((q) => NHI_PHAN_QUAI[q.duoi] + NHI_PHAN_QUAI[q.tren]);
kiemTra(new Set(khoa).size === 64, '64 quẻ có 64 mã hào khác nhau', `có ${new Set(khoa).size}`);

kiemTra(
  queTheoHao([7, 7, 7, 7, 7, 7])?.so === 1,
  'Sáu hào dương là quẻ 1 Thuần Càn',
  String(queTheoHao([7, 7, 7, 7, 7, 7])?.so),
);
kiemTra(
  queTheoHao([8, 8, 8, 8, 8, 8])?.so === 2,
  'Sáu hào âm là quẻ 2 Thuần Khôn',
  String(queTheoHao([8, 8, 8, 8, 8, 8])?.so),
);
kiemTra(
  queTheoHao([7, 8, 7, 8, 7, 8])?.so === 63,
  'Ký Tế = hào 1,3,5 dương',
  String(queTheoHao([7, 8, 7, 8, 7, 8])?.so),
);

// rng = 0 → mọi lần tung đều sấp (2) → tổng 6 = lão âm, 6 hào động
const cựcAm = gieoQue(() => 0);
kiemTra(cựcAm.hao.every((h) => h.giaTri === 6 && h.dong), 'rng=0 cho 6 hào lão âm động');
kiemTra(cựcAm.chu.so === 2, 'Quẻ chủ là Thuần Khôn', String(cựcAm.chu.so));
kiemTra(cựcAm.bien?.so === 1, 'Quẻ biến là Thuần Càn', String(cựcAm.bien?.so));
kiemTra(cựcAm.viTriDong.length === 6, 'Có 6 hào động', String(cựcAm.viTriDong.length));

// rng = 0.99 → mọi lần tung đều ngửa (3) → tổng 9 = lão dương
const cựcDuong = gieoQue(() => 0.99);
kiemTra(cựcDuong.chu.so === 1, 'rng=1 cho quẻ Thuần Càn', String(cựcDuong.chu.so));
kiemTra(cựcDuong.bien?.so === 2, 'Quẻ biến là Thuần Khôn', String(cựcDuong.bien?.so));

// rng xen kẽ: 2 lần ngửa 1 lần sấp → tổng 8 = thiếu âm, không động
let dem = 0;
const khongDong = gieoQue(() => (dem++ % 3 === 2 ? 0 : 1));
kiemTra(khongDong.hao.every((h) => h.giaTri === 8 && !h.dong), 'Tổng 8 là hào tĩnh');
kiemTra(khongDong.chu.so === 2, 'Toàn hào 8 cũng ra Thuần Khôn', String(khongDong.chu.so));
kiemTra(khongDong.bien === null, 'Không có hào động thì không có quẻ biến');

// Mọi quẻ phải tra ngược lại được từ chính mã hào của nó
const traNguoc = QUE.every((q) => {
  const hao = (NHI_PHAN_QUAI[q.duoi] + NHI_PHAN_QUAI[q.tren]).split('').map((c) => (c === '1' ? 7 : 8));
  return queTheoHao(hao)?.so === q.so;
});
kiemTra(traNguoc, 'Tra ngược 64 quẻ từ mã hào đều đúng');

// ── 5. Tướng học ────────────────────────────────────────────────────────

console.log('— Tướng học —');
kiemTra(TAM_DINH.length === 3, 'Tam đình có 3 mục', String(TAM_DINH.length));
kiemTra(NGU_NHAC.length === 5, 'Ngũ nhạc có 5 mục', String(NGU_NHAC.length));
kiemTra(NGU_QUAN.length === 5, 'Ngũ quan có 5 mục', String(NGU_QUAN.length));
kiemTra(TU_DOC.length === 4, 'Tứ độc có 4 mục', String(TU_DOC.length));
kiemTra(
  [...TAM_DINH, ...NGU_NHAC, ...NGU_QUAN, ...TU_DOC].every((m) => m.ten && m.yNghia),
  'Mọi mục tướng học đều có tên và luận giải',
);

// ── Kết luận ────────────────────────────────────────────────────────────

if (loi === 0) {
  console.log('\nTất cả kiểm tra phương Đông đều đạt.');
} else {
  console.error(`\n${loi} kiểm tra thất bại.`);
  process.exit(1);
}
