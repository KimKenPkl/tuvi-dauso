/**
 * Test hồi quy cho module vận hạn theo tuổi.
 * Chạy: npx tsx src/lib/__tests__/tuoiHan.test.ts
 */
import { MO_TA_QUAN_HE, quanHeChi, xemTuoiTheoNam } from '../tuoiHan';
import { canChiNam } from '../amlich';
import { chiCuaNam } from '../canChi';

let loi = 0;

function kiemTra(dieuKien: boolean, moTa: string, chiTiet?: string) {
  if (dieuKien) {
    console.log(`✓ ${moTa}`);
  } else {
    loi++;
    console.error(`✗ ${moTa}${chiTiet ? ` — ${chiTiet}` : ''}`);
  }
}

console.log('- Quan hệ địa chi -');
kiemTra(quanHeChi(0, 4) === 'tam-hop', 'Tý – Thìn thuộc tam hợp Thân Tý Thìn');
kiemTra(quanHeChi(6, 10) === 'tam-hop', 'Ngọ – Tuất thuộc tam hợp Dần Ngọ Tuất');
kiemTra(quanHeChi(0, 1) === 'luc-hop', 'Tý – Sửu lục hợp');
kiemTra(quanHeChi(6, 7) === 'luc-hop', 'Ngọ – Mùi lục hợp');
kiemTra(quanHeChi(0, 6) === 'xung', 'Tý – Ngọ tương xung');
kiemTra(quanHeChi(3, 9) === 'xung', 'Mão – Dậu tương xung');
kiemTra(quanHeChi(0, 7) === 'hai', 'Tý – Mùi tương hại');
kiemTra(quanHeChi(2, 2) === 'binh', 'Cùng chi thì bình hoà');
kiemTra(
  (Object.keys(MO_TA_QUAN_HE) as (keyof typeof MO_TA_QUAN_HE)[]).every(
    (k) => MO_TA_QUAN_HE[k].length > 10,
  ),
  'Mọi quan hệ đều có câu mô tả',
);

console.log('- Chi của năm -');
kiemTra(chiCuaNam(1990) === 6, '1990 là chi Ngọ', String(chiCuaNam(1990)));
kiemTra(chiCuaNam(2026) === 6, '2026 cũng là chi Ngọ', String(chiCuaNam(2026)));
kiemTra(canChiNam(1990) === 'Canh Ngọ', '1990 là Canh Ngọ', canChiNam(1990));
kiemTra(canChiNam(2028) === 'Mậu Thân', '2028 là Mậu Thân', canChiNam(2028));

console.log('- Vận hạn tuổi 1990 -');
const nam2026 = xemTuoiTheoNam(1990, 'Nam', 2026);
kiemTra(nam2026.tuoiMu === 37, 'Tuổi mụ năm 2026 là 37', String(nam2026.tuoiMu));
kiemTra(nam2026.conGiap === 'Ngọ', 'Con giáp là Ngọ', nam2026.conGiap);
kiemTra(nam2026.quanHe === 'binh', 'Năm bản mệnh nên quan hệ bình hoà', nam2026.quanHe);
kiemTra(
  nam2026.loiKhuyen.some((x) => x.toLowerCase().includes('bản mệnh')),
  'Năm bản mệnh có lời khuyên riêng',
);
kiemTra(nam2026.bang.length === 12, 'Bảng đủ 12 con giáp', String(nam2026.bang.length));
kiemTra(
  nam2026.bang.every((d) => d.chi && d.conGiap && d.moTa),
  'Mỗi dòng trong bảng đều có mô tả',
);
kiemTra(
  ['thuan', 'trung', 'can-than'].includes(nam2026.muc),
  'Mức vận hạn nằm trong ba mức',
  nam2026.muc,
);
kiemTra(nam2026.sao.sao.ten.length > 0, 'Có sao chiếu mệnh', nam2026.sao.sao.ten);
kiemTra(nam2026.kiemTra.length >= 3, 'Có ít nhất 3 phép kiểm tra tuổi');

console.log('- Tam Tai -');
const nam2028 = xemTuoiTheoNam(1990, 'Nam', 2028);
// Tuổi Ngọ thuộc nhóm Dần – Ngọ – Tuất, Tam Tai rơi vào Thân – Dậu – Tuất.
kiemTra(nam2028.tamTai === true, 'Tuổi Ngọ gặp Tam Tai năm Thân (2028)');
kiemTra(
  nam2028.loiKhuyen.some((x) => x.toLowerCase().includes('tam tai')),
  'Có lời khuyên về Tam Tai',
);
const nam2025 = xemTuoiTheoNam(1990, 'Nam', 2025);
kiemTra(nam2025.tamTai === false, 'Tuổi Ngọ không gặp Tam Tai năm Tỵ (2025)');

console.log('- Năm xung -');
const nam2032 = xemTuoiTheoNam(1990, 'Nam', 2032); // chi Tý, xung với Ngọ
kiemTra(nam2032.quanHe === 'xung', 'Tuổi Ngọ xung với năm Tý (2032)', nam2032.quanHe);
kiemTra(
  nam2032.loiKhuyen.some((x) => x.includes('Giấy tờ')),
  'Năm xung có lời khuyên về giấy tờ',
);

if (loi === 0) {
  console.log('\nTất cả kiểm tra vận hạn đều đạt.');
} else {
  console.error(`\n${loi} kiểm tra thất bại.`);
  process.exit(1);
}
