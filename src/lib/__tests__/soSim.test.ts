/**
 * Test hồi quy cho module luận dãy số (số điện thoại, biển số xe).
 * Chạy: npx tsx src/lib/__tests__/soSim.test.ts
 */
import { phanTichDaySo, tachSo, timMauSo } from '../soSim';

let loi = 0;

function kiemTra(dieuKien: boolean, moTa: string, chiTiet?: string) {
  if (dieuKien) {
    console.log(`✓ ${moTa}`);
  } else {
    loi++;
    console.error(`✗ ${moTa}${chiTiet ? ` — ${chiTiet}` : ''}`);
  }
}

console.log('- Tách số -');
kiemTra(tachSo('0905 123.456') === '0905123456', 'Bỏ dấu cách và dấu chấm');
kiemTra(tachSo('43A-123.45') === '4312345', 'Bỏ cả chữ cái trên biển số');
kiemTra(tachSo('') === '', 'Chuỗi rỗng trả về rỗng');

console.log('- Biên độ dài -');
kiemTra(phanTichDaySo('123') === null, 'Dưới 4 chữ số thì từ chối');
kiemTra(phanTichDaySo('1234567890123456') === null, 'Trên 15 chữ số thì từ chối');
kiemTra(phanTichDaySo('0905') !== null, 'Đúng 4 chữ số thì nhận');

console.log('- Khởi quái Mai Hoa -');
const kq = phanTichDaySo('0905123456');
kiemTra(kq !== null, 'Dãy 10 số lập được quẻ');
if (kq) {
  kiemTra(kq.daySo === '0905123456', 'Giữ nguyên dãy số đã tách', kq.daySo);
  kiemTra(kq.soLuong === 10, 'Đếm đúng 10 chữ số', String(kq.soLuong));
  kiemTra(kq.tong === 35, 'Tổng bằng 35', String(kq.tong));
  kiemTra(kq.nut === 8, 'Rút gọn còn 8 nút', String(kq.nut));
  // Nửa đầu 0+9+0+5+1 = 15 → 15 % 8 = 7 (Cấn); nửa sau 2+3+4+5+6 = 20 → 20 % 8 = 4 (Chấn)
  kiemTra(kq.thuongQuai === 'Cấn', 'Thượng quái là Cấn', kq.thuongQuai);
  kiemTra(kq.haQuai === 'Chấn', 'Hạ quái là Chấn', kq.haQuai);
  kiemTra(kq.haoDong === 5, 'Động hào 5 (35 % 6 = 5)', String(kq.haoDong));
  kiemTra(kq.que.tren === 'Cấn' && kq.que.duoi === 'Chấn', 'Ghép đúng quẻ Cấn trên Chấn dưới');
  kiemTra(kq.bien !== null && kq.bien.so !== kq.que.so, 'Có quẻ biến khác quẻ chủ');
  kiemTra(kq.hanh === 'Thuỷ', 'Chữ số cuối 6 → hành Thuỷ', kq.hanh);
}

console.log('- Quẻ trùng quái (dư 0 lấy 8) -');
const tam = phanTichDaySo('8888');
kiemTra(tam !== null, 'Dãy 8888 lập được quẻ');
if (tam) {
  kiemTra(tam.thuongQuai === 'Khôn', 'Tổng nửa đầu 16 → 16 % 8 = 0 → lấy 8 (Khôn)', tam.thuongQuai);
  kiemTra(tam.que.ten === 'Thuần Khôn', 'Trùng quái Khôn trên Khôn dưới', tam.que.ten);
}

console.log('- Mẫu số nhận diện -');
const mauTuQuy = timMauSo('8888');
kiemTra(
  mauTuQuy.some((m) => m.key === 'tu-quy'),
  '8888 nhận diện tứ quý',
);
const mauLocPhat = timMauSo('0905686868');
kiemTra(
  mauLocPhat.some((m) => m.key === 'loc-phat'),
  'Có cặp 68 nhận diện lộc phát',
);
const mauTien = timMauSo('0912345678');
kiemTra(
  mauTien.some((m) => m.key === 'tien'),
  'Chuỗi 123 nhận diện số tiến',
);
kiemTra(timMauSo('0905123456').length <= 4, 'Danh sách mẫu tối đa 4 mục');

console.log('- Đối chiếu bản mệnh -');
const coMenh = phanTichDaySo('0905123456', 1990);
kiemTra(coMenh !== null && coMenh.quanHeMenh !== null, 'Có năm sinh thì tính quan hệ bản mệnh');
if (coMenh?.quanHeMenh) {
  kiemTra(coMenh.quanHeMenh.hanhMenh.length > 0, 'Có hành bản mệnh');
  kiemTra(coMenh.quanHeMenh.quanHe.length > 0, 'Có câu mô tả quan hệ');
}
kiemTra(
  phanTichDaySo('0905123456', 1700)?.quanHeMenh === null,
  'Năm sinh ngoài khoảng 1800–2200 thì bỏ qua',
);

if (loi === 0) {
  console.log('\nTất cả kiểm tra dãy số đều đạt.');
} else {
  console.error(`\n${loi} kiểm tra thất bại.`);
  process.exit(1);
}
