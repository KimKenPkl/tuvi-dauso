/**
 * Smoke test render: dựng lá số thật rồi render toàn bộ cây component
 * qua react-dom/server để bắt lỗi runtime (key trùng, undefined, v.v.)
 */
import React from 'react';
import { renderToString } from 'react-dom/server';
import ChartBoard from '../../components/ChartBoard';
import ReadingPanel from '../../components/ReadingPanel';
import DetailPanel from '../../components/DetailPanel';
import AiPanel from '../../components/AiPanel';
import NoteBox from '../../components/NoteBox';
import CompatibilityView from '../../components/CompatibilityView';
import { lapLaSo, vanHan, cungTheoTen } from '../chart';
import { luanGiai } from '../interpret';
import { doiChieu } from '../synastry';
import { idLaSo } from '../storage';
import { taoPrompt } from '../ai';

let dem = 0;
const cases = [
  { ten: 'Nam 1998', gt: 'Nam' as const, ngay: '1998-09-22', gio: 2, lich: 'duong' as const },
  { ten: 'Nữ 2004', gt: 'Nữ' as const, ngay: '2004-02-29', gio: 6, lich: 'duong' as const },
  { ten: 'Nam 1985', gt: 'Nam' as const, ngay: '1985-01-01', gio: 0, lich: 'duong' as const },
  { ten: 'Nữ 2012', gt: 'Nữ' as const, ngay: '2012-12-21', gio: 12, lich: 'duong' as const },
  { ten: 'Âm lịch', gt: 'Nam' as const, ngay: '2020-04-01', gio: 4, lich: 'am' as const, nhuan: false },
];

for (const c of cases) {
  const input = {
    ten: c.ten,
    gioiTinh: c.gt,
    lich: c.lich,
    ngay: c.ngay,
    gio: c.gio,
    thangNhuan: (c as any).nhuan,
    kinhDo: null,
    dungGioThat: false,
  };
  const ls = lapLaSo(input);
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

  const htmlAi = renderToString(React.createElement(AiPanel, { laSo: ls, luanGiai: lg, namXem: 2026 }));

  const htmlNote = renderToString(React.createElement(NoteBox, { id: idLaSo(input) }));

  const htmlCompat = renderToString(
    React.createElement(CompatibilityView, {
      laSoChinh: ls,
      inputChinh: input,
      onClose: () => {},
    }),
  );

  // Đối chiếu với một lá số cố định để kiểm tra lớp synastry chạy được
  const khac = lapLaSo({
    ten: 'Đối chứng',
    gioiTinh: c.gt === 'Nam' ? 'Nữ' : 'Nam',
    lich: 'duong',
    ngay: '1995-06-15',
    gio: 3,
  });
  const kq = doiChieu(ls, khac);

  const prompt = taoPrompt(ls, lg, 2026);

  const loi: string[] = [];
  if (!htmlBoard.includes('cell-ten')) loi.push('board thiếu ô cung');
  if (htmlBoard.length < 3000) loi.push('board quá ngắn');
  if (!htmlReading.includes('Lời khuyên')) loi.push('reading thiếu lời khuyên');
  if (!htmlDetail.includes('Tam phương tứ chính')) loi.push('detail thiếu tam phương');
  if (!htmlAi.includes('Luận giải bằng AI')) loi.push('ai panel không render');
  if (!htmlNote.includes('Ghi chú của bạn')) loi.push('note box không render');
  if (!htmlCompat.includes('Đối chiếu')) loi.push('compat view không render');
  if (kq.chiTiet.length < 2) loi.push('synastry thiếu chi tiết');
  if (!kq.mucDo) loi.push('synastry thiếu mức độ');
  if (prompt.length < 800) loi.push('prompt AI quá ngắn');
  if (!prompt.includes('KHÔNG được thay đổi')) loi.push('prompt thiếu ràng buộc dữ liệu');
  for (const [ten, html] of Object.entries({ board: htmlBoard, reading: htmlReading, detail: htmlDetail, ai: htmlAi, note: htmlNote, compat: htmlCompat })) {
    if (html.includes('undefined')) loi.push(`${ten} chứa "undefined"`);
    if (html.includes('NaN')) loi.push(`${ten} chứa "NaN"`);
  }

  if (loi.length) {
    console.error(`✗ ${c.ten}:`, loi.join(' | '));
    process.exitCode = 1;
  } else {
    dem++;
    console.log(
      `✓ ${c.ten.padEnd(10)} ${ls.cuc.padEnd(14)} Mệnh ${ls.menhCung} · ${menh.chinhTinh.map((s) => s.ten).join('/') || 'vô chính diệu'} · ${lg.cachCuc.length} cách cục · đối chiếu ${kq.mucDo} (${kq.diem})`,
    );
  }
}

console.log(`\n${dem}/${cases.length} ca render thành công.`);
