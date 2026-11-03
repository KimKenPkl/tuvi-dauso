/**
 * Smoke test render: dựng lá số thật rồi render toàn bộ cây component
 * qua react-dom/server để bắt lỗi runtime (key trùng, undefined, v.v.)
 */
import React from 'react';
import { renderToString } from 'react-dom/server';
import ChartBoard from '../../components/ChartBoard';
import ReadingPanel from '../../components/ReadingPanel';
import DetailPanel from '../../components/DetailPanel';
import { lapLaSo, vanHan, cungTheoTen } from '../chart';
import { luanGiai } from '../interpret';

let dem = 0;
const cases = [
  { ten: 'Nam 1998', gt: 'Nam' as const, ngay: '1998-09-22', gio: 2, lich: 'duong' as const },
  { ten: 'Nữ 2004', gt: 'Nữ' as const, ngay: '2004-02-29', gio: 6, lich: 'duong' as const },
  { ten: 'Nam 1985', gt: 'Nam' as const, ngay: '1985-01-01', gio: 0, lich: 'duong' as const },
  { ten: 'Nữ 2012', gt: 'Nữ' as const, ngay: '2012-12-21', gio: 12, lich: 'duong' as const },
  { ten: 'Âm lịch', gt: 'Nam' as const, ngay: '2020-04-01', gio: 4, lich: 'am' as const, nhuan: false },
];

for (const c of cases) {
  const ls = lapLaSo({
    ten: c.ten,
    gioiTinh: c.gt,
    lich: c.lich,
    ngay: c.ngay,
    gio: c.gio,
    thangNhuan: (c as any).nhuan,
  });
  const vh = vanHan(ls, 2026);
  const lg = luanGiai(ls, 2026);
  const menh = cungTheoTen(ls, 'Mệnh')!;

  const htmlBoard = renderToString(
    React.createElement(ChartBoard, {
      laSo: ls,
      vanHan: vh,
      namXem: 2026,
      cungDangChon: null,
      onChon: () => {},
    }),
  );

  const htmlReading = renderToString(React.createElement(ReadingPanel, { luanGiai: lg, namXem: 2026 }));

  const htmlDetail = renderToString(
    React.createElement(DetailPanel, { cung: menh, laSo: ls, onClose: () => {} }),
  );

  const loi: string[] = [];
  if (!htmlBoard.includes('cell-ten')) loi.push('board thiếu ô cung');
  if (htmlBoard.length < 3000) loi.push('board quá ngắn');
  if (!htmlReading.includes('Lời khuyên')) loi.push('reading thiếu lời khuyên');
  if (!htmlDetail.includes('Tam phương tứ chính')) loi.push('detail thiếu tam phương');
  if (htmlBoard.includes('undefined')) loi.push('board chứa "undefined"');
  if (htmlReading.includes('undefined')) loi.push('reading chứa "undefined"');
  if (htmlDetail.includes('undefined')) loi.push('detail chứa "undefined"');

  if (loi.length) {
    console.error(`✗ ${c.ten}:`, loi.join(' | '));
    process.exitCode = 1;
  } else {
    dem++;
    console.log(
      `✓ ${c.ten.padEnd(10)} ${ls.cuc.padEnd(14)} Mệnh ${ls.menhCung} · ${menh.chinhTinh.map((s) => s.ten).join('/') || 'vô chính diệu'} · ${lg.cachCuc.length} cách cục`,
    );
  }
}

console.log(`\n${dem}/${cases.length} ca render thành công.`);
