/**
 * Test hồi quy cho lịch âm: các mốc Tết, tháng nhuận và Can Chi đã biết.
 * Chạy bằng `npx tsx src/lib/__tests__/amlich.test.ts`.
 */
import { amLichCuaNgay, canChiNgay, jdFromDate, trucCuaNgay } from '../amlich';

interface Ca {
  ngay: string;
  am: string;
  canChiNam: string;
  canChiNgay: string;
  truc: string;
  hoangDao: boolean;
}

const CASES: Ca[] = [
  // Tết Nguyên đán
  { ngay: '2024-02-10', am: '1/1/2024', canChiNam: 'Giáp Thìn', canChiNgay: 'Giáp Thìn', truc: 'Mãn', hoangDao: true },
  { ngay: '2025-01-29', am: '1/1/2025', canChiNam: 'Ất Tỵ', canChiNgay: 'Mậu Tuất', truc: 'Thành', hoangDao: true },
  { ngay: '2026-02-17', am: '1/1/2026', canChiNam: 'Bính Ngọ', canChiNgay: 'Nhâm Tuất', truc: 'Thành', hoangDao: true },
  // Tháng nhuận
  { ngay: '2023-03-22', am: '1/2 nhuận/2023', canChiNam: 'Quý Mão', canChiNgay: 'Kỷ Mão', truc: 'Kiến', hoangDao: false },
  { ngay: '2023-02-20', am: '1/2/2023', canChiNam: 'Quý Mão', canChiNgay: 'Kỷ Dậu', truc: 'Phá', hoangDao: false },
  { ngay: '2020-05-23', am: '1/4 nhuận/2020', canChiNam: 'Canh Tý', canChiNgay: 'Bính Dần', truc: 'Thu', hoangDao: false },
];

let loi = 0;

for (const c of CASES) {
  const [y, m, d] = c.ngay.split('-').map(Number);
  const a = amLichCuaNgay(new Date(y, m - 1, d));
  const thucTe = `${a.ngay}/${a.thang}${a.nhuan ? ' nhuận' : ''}/${a.nam}`;
  const sai: string[] = [];
  if (thucTe !== c.am) sai.push(`âm lịch ${thucTe} ≠ ${c.am}`);
  if (a.canChiNam !== c.canChiNam) sai.push(`can chi năm ${a.canChiNam} ≠ ${c.canChiNam}`);
  if (a.canChiNgay !== c.canChiNgay) sai.push(`can chi ngày ${a.canChiNgay} ≠ ${c.canChiNgay}`);
  if (a.truc !== c.truc) sai.push(`trực ${a.truc} ≠ ${c.truc}`);
  if (a.hoangDao !== c.hoangDao) sai.push(`hoàng đạo ${a.hoangDao} ≠ ${c.hoangDao}`);

  if (sai.length) {
    loi++;
    console.error(`✗ ${c.ngay}: ${sai.join(' | ')}`);
  } else {
    console.log(`✓ ${c.ngay} → ${thucTe} · ${a.canChiNgay} · Trực ${a.truc}`);
  }
}

// Kiểm tra công thức Can Chi ngày và Trực ở mức đơn vị
const jd = jdFromDate(10, 2, 2024);
if (canChiNgay(jd) !== 'Giáp Thìn') {
  loi++;
  console.error(`✗ canChiNgay(2024-02-10) = ${canChiNgay(jd)}`);
}
if (trucCuaNgay(4, 1) !== 'Mãn') {
  loi++;
  console.error(`✗ trucCuaNgay(Thìn, tháng 1) = ${trucCuaNgay(4, 1)}`);
}

if (loi) {
  process.exitCode = 1;
  console.error(`\n${loi} lỗi lịch âm.`);
} else {
  console.log(`\n${CASES.length}/${CASES.length} mốc lịch âm khớp.`);
}
