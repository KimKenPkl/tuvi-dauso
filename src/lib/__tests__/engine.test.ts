import { lapLaSo, vanHan, tuHoa, tamPhuongTuChinh, cungTheoTen } from '../chart';

const ls = lapLaSo({
  ten: 'Nguyễn Tuấn Minh',
  gioiTinh: 'Nam',
  lich: 'duong',
  ngay: '1998-09-22',
  gio: 2,
});

console.log('=== THÔNG TIN CHUNG ===');
console.log('Tên:', ls.ten, '|', ls.gioiTinh);
console.log('Dương lịch:', ls.duongLich, '| Âm lịch:', ls.amLich);
console.log('Tứ trụ:', ls.tuTru.map((t) => `${t.can} ${t.chi}`).join(' | '));
console.log('Giờ:', ls.gio.ten, ls.gio.khoang);
console.log('Cục:', ls.cuc, '| Con giáp:', ls.conGiap, '| Cung hoàng đạo:', ls.cungHoangDao);
console.log('Mệnh chủ:', ls.menhChu, '| Thân chủ:', ls.thanChu);
console.log('Mệnh cung:', ls.menhCung, '| Thân cung:', ls.thanCung);

console.log('\n=== 12 CUNG ===');
for (const c of [...ls.cung].sort((a, b) => a.index - b.index)) {
  const ct = c.chinhTinh.map((s) => `${s.ten}${s.doSang ? `(${s.doSang})` : ''}${s.tuHoa ? `[${s.tuHoa}]` : ''}`).join(', ');
  console.log(
    `${String(c.index).padStart(2)} ${c.ten.padEnd(10)} ${c.can} ${c.chi}  lưới[${c.row},${c.col}]  ` +
      `chính: ${ct || '—'}  | phụ: ${c.phuTinh.map((s) => s.ten + (s.tuHoa ? `[${s.tuHoa}]` : '')).join(', ') || '—'}  ` +
      `| ĐH ${c.daiHan.tuoiBatDau}-${c.daiHan.tuoiKetThuc}`,
  );
}

console.log('\n=== TỨ HOÁ NĂM SINH ===');
console.log(tuHoa(ls).goc.map((x) => `${x.sao}→${x.hoa}`).join(', '));

console.log('\n=== VẬN HẠN 2026 ===');
const vh = vanHan(ls, 2026);
console.log(JSON.stringify(vh));

console.log('\n=== TAM PHƯƠNG TỨ CHÍNH CUNG MỆNH ===');
const menh = cungTheoTen(ls, 'Mệnh')!;
console.log(tamPhuongTuChinh(ls.cung, menh).map((c) => c.ten).join(' — '));
