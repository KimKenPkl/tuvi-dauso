/**
 * Test hồi quy cho công cụ xem ngày / xem tuổi.
 *
 * Mục tiêu chính là chặn lỗi lệch nguồn: Can Chi và 12 Trực trong `canChi.ts`
 * phải lấy từ `amlich.ts`, không được tự tính riêng. Ngoài ra kiểm tra các
 * bảng cổ điển (giờ Hoàng Đạo, Tam Tai, Kim Lâu, Hoang Ốc) bằng những ca đã
 * biết trước.
 *
 * Chạy bằng `npx tsx src/lib/__tests__/canChi.test.ts`.
 */
import { amLichCuaNgay } from '../amlich';
import { chiCuaNam, gioHoangDaoCuaNgay, xemNgayTotXau, xemTuoiCuoiHoi, xemTuoiXayNha } from '../canChi';

let loi = 0;

function kiemTra(dieuKien: boolean, moTa: string, chiTiet?: string) {
  if (dieuKien) {
    console.log(`✓ ${moTa}`);
  } else {
    loi++;
    console.error(`✗ ${moTa}${chiTiet ? ` — ${chiTiet}` : ''}`);
  }
}

// ── 1. Can Chi / Trực phải trùng nguồn với amlich.ts ─────────────────────

const NGAY = [
  '2024-02-10',
  '2025-01-29',
  '2026-02-17',
  '2023-03-22',
  '2020-05-23',
  '2026-11-04',
  '1998-09-22',
];

console.log('— Can Chi và Trực đồng bộ với amlich —');
for (const d of NGAY) {
  const [y, m, dd] = d.split('-').map(Number);
  const dt = new Date(y, m - 1, dd);
  const a = amLichCuaNgay(dt);
  const r = xemNgayTotXau(dt);
  const sai: string[] = [];
  if (r.canChi !== a.canChiNgay) sai.push(`canChi ${r.canChi} ≠ ${a.canChiNgay}`);
  if (r.canChiThang !== a.canChiThang) sai.push(`canChiThang ${r.canChiThang} ≠ ${a.canChiThang}`);
  if (r.canChiNam !== a.canChiNam) sai.push(`canChiNam ${r.canChiNam} ≠ ${a.canChiNam}`);
  if (r.truc !== a.truc) sai.push(`trực ${r.truc} ≠ ${a.truc}`);
  if (r.hoangDao !== a.hoangDao) sai.push(`hoàng đạo ${r.hoangDao} ≠ ${a.hoangDao}`);
  kiemTra(sai.length === 0, `${d} · ${r.canChi} · Trực ${r.truc}`, sai.join(' | '));
}

// ── 2. Ca đã biết: Tết Giáp Thìn 2024 ────────────────────────────────────

console.log('\n— Ca đã biết —');
const tet = xemNgayTotXau(new Date(2024, 1, 10));
kiemTra(tet.canChi === 'Giáp Thìn', 'Tết 2024-02-10 là Giáp Thìn', tet.canChi);
kiemTra(tet.amLich === '1/1/2024', 'Tết 2024-02-10 là 1/1/2024', tet.amLich);
kiemTra(tet.truc === 'Mãn', 'Tết 2024-02-10 thuộc Trực Mãn', tet.truc);
kiemTra(tet.hoangDao, 'Tết 2024-02-10 là ngày Hoàng Đạo');
kiemTra(tet.danhGia.includes('Hoàng Đạo'), 'Đánh giá nêu đúng Hoàng Đạo', tet.danhGia);

const tet2025 = xemNgayTotXau(new Date(2025, 0, 29));
kiemTra(tet2025.canChi === 'Mậu Tuất', 'Tết 2025-01-29 là Mậu Tuất', tet2025.canChi);
kiemTra(tet2025.amLich === '1/1/2025', 'Tết 2025-01-29 là 1/1/2025', tet2025.amLich);

// ── 3. Giờ Hoàng Đạo: 6 giờ mỗi ngày, đúng bảng khởi Thanh Long ──────────

console.log('\n— Giờ Hoàng Đạo —');
const gioNgayThin = gioHoangDaoCuaNgay(4);
kiemTra(gioNgayThin.length === 6, 'Ngày Thìn có đúng 6 giờ Hoàng Đạo', String(gioNgayThin.length));
kiemTra(
  gioNgayThin.map((g) => g.gio).join(',') === 'Dần,Thìn,Tỵ,Thân,Dậu,Hợi',
  'Ngày Thìn: Dần, Thìn, Tỵ, Thân, Dậu, Hợi',
  gioNgayThin.map((g) => g.gio).join(','),
);
kiemTra(gioNgayThin.some((g) => g.than === 'Thanh Long'), 'Ngày Thìn có giờ Thanh Long');

for (let chi = 0; chi < 12; chi++) {
  const ds = gioHoangDaoCuaNgay(chi);
  const hopLe =
    ds.length === 6 &&
    ds.every((g) => g.gio.length > 0 && g.gioChi.includes('–') && g.than.length > 0) &&
    new Set(ds.map((g) => g.gio)).size === 6;
  if (!hopLe) {
    loi++;
    console.error(`✗ Chi ${chi}: danh sách giờ Hoàng Đạo không hợp lệ`);
  }
}
if (loi === 0) console.log('✓ Cả 12 chi đều trả 6 giờ Hoàng Đạo hợp lệ');

// ── 4. Xây nhà: Tam Tai – Kim Lâu – Hoang Ốc ─────────────────────────────

console.log('\n— Xây nhà —');
const nha1990 = xemTuoiXayNha(1990, 2026);
kiemTra(nha1990.tuoi === 36 && nha1990.tuoiMu === 37, '1990 xem 2026: 36 tuổi, tuổi mụ 37');
kiemTra(nha1990.canChiTuoi === 'Canh Ngọ', '1990 là Canh Ngọ', nha1990.canChiTuoi);
kiemTra(nha1990.canChiNam === 'Bính Ngọ', '2026 là Bính Ngọ', nha1990.canChiNam);

const tamTai1990 = nha1990.kiemTra.find((k) => k.ten === 'Tam Tai');
const kimLau1990 = nha1990.kiemTra.find((k) => k.ten === 'Kim Lâu');
const hoangOc1990 = nha1990.kiemTra.find((k) => k.ten === 'Hoang Ốc');
kiemTra(!!tamTai1990?.dat, '1990 không phạm Tam Tai năm 2026', tamTai1990?.chiTiet);
kiemTra(!!kimLau1990 && !kimLau1990.dat, '1990 phạm Kim Lâu Thân (tuổi mụ 37)', kimLau1990?.chiTiet);
kiemTra(kimLau1990?.chiTiet.includes('Kim Lâu Thân') === true, 'Chi tiết nêu đúng Kim Lâu Thân');
kiemTra(!!hoangOc1990?.dat, '1990 được Hoang Ốc Nhất Cát', hoangOc1990?.chiTiet);
kiemTra(nha1990.ketLuan === 'Có thể tiến hành, nên chọn thêm ngày tốt', 'Kết luận 1990: 2/3 điều kiện', nha1990.ketLuan);

const nha1998 = xemTuoiXayNha(1998, 2026);
const hoangOc1998 = nha1998.kiemTra.find((k) => k.ten === 'Hoang Ốc');
kiemTra(nha1998.tuoiMu === 29, '1998 xem 2026: tuổi mụ 29', String(nha1998.tuoiMu));
kiemTra(!!hoangOc1998 && !hoangOc1998.dat, '1998 phạm Hoang Ốc Ngũ Thọ Tử', hoangOc1998?.chiTiet);

// Kim Lâu: các tuổi mụ 1, 3, 6, 8 phạm; 2, 4, 5, 7, 9 không phạm
const kimLauTheoTuoi = [1, 2, 3, 4, 5, 6, 7, 8, 9].map((mu) => {
  const kq = xemTuoiXayNha(2026 - mu + 1, 2026).kiemTra.find((k) => k.ten === 'Kim Lâu');
  return kq?.dat === false;
});
kiemTra(
  kimLauTheoTuoi.join(',') === 'true,false,true,false,false,true,false,true,false',
  'Kim Lâu đúng chu kỳ 1–3–6–8',
  kimLauTheoTuoi.join(','),
);

// ── 5. Cưới hỏi: quan hệ tuổi, Tam Tai, Kim Lâu cô dâu ───────────────────

console.log('\n— Cưới hỏi —');
const cuoi = xemTuoiCuoiHoi(1995, 1997, 2026);
kiemTra(cuoi.canChiNamNguoi === 'Ất Hợi', 'Nam 1995 là Ất Hợi', cuoi.canChiNamNguoi);
kiemTra(cuoi.canChiNuNguoi === 'Đinh Sửu', 'Nữ 1997 là Đinh Sửu', cuoi.canChiNuNguoi);
kiemTra(cuoi.quanHe.includes('Bình hòa'), 'Ất Hợi & Đinh Sửu là Bình hòa', cuoi.quanHe);
kiemTra(cuoi.kiemTra.find((k) => k.ten === 'Tam Tai')?.dat === false, 'Năm 2026 phạm Tam Tai của nam 1995');
kiemTra(
  cuoi.kiemTra.find((k) => k.ten === 'Kim Lâu (cô dâu)')?.dat === false,
  'Nữ 1997 phạm Kim Lâu Thê năm 2026',
);

// Ca tam hợp: Dần – Ngọ – Tuất (chi 2 và 6 lệch 4)
const tamHop = xemTuoiCuoiHoi(1986, 1990, 2026); // Dần & Ngọ
kiemTra(tamHop.quanHe.includes('Tam hợp'), 'Dần & Ngọ là tam hợp', tamHop.quanHe);

// Ca lục xung: Tý – Ngọ (lệch 6)
const lucXung = xemTuoiCuoiHoi(1984, 1990, 2026); // Tý & Ngọ
kiemTra(lucXung.quanHe.includes('Lục xung'), 'Tý & Ngọ là lục xung', lucXung.quanHe);

// ── 6. Công thức chi năm ─────────────────────────────────────────────────

console.log('\n— Chi năm —');
kiemTra(chiCuaNam(2024) === 4, '2024 là Thìn (chi 4)', String(chiCuaNam(2024)));
kiemTra(chiCuaNam(2026) === 6, '2026 là Ngọ (chi 6)', String(chiCuaNam(2026)));
kiemTra(chiCuaNam(1990) === 6, '1990 là Ngọ (chi 6)', String(chiCuaNam(1990)));

if (loi) {
  process.exitCode = 1;
  console.error(`\n${loi} lỗi công cụ xem ngày / xem tuổi.`);
} else {
  console.log('\nTất cả kiểm tra canChi đều đạt.');
}
