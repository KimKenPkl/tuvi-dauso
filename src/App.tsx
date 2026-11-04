import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import BirthForm from './components/BirthForm';
import ChartBoard from './components/ChartBoard';
import DetailPanel from './components/DetailPanel';
import ReadingPanel from './components/ReadingPanel';
import HistoryPanel from './components/HistoryPanel';
import CompatibilityView from './components/CompatibilityView';
import NoteBox from './components/NoteBox';
import CareerOrientation from './components/CareerOrientation';
import VanHanPanel from './components/VanHanPanel';
import XemNgayPanel from './components/XemNgayPanel';
import XemTuoiPanel from './components/XemTuoiPanel';
import { StarField, Divider } from './components/Ornaments';
import {
  lapLaSo,
  vanHan,
  cungTheoTen,
  type BirthInput,
  type Cung,
  type LaSo,
} from './lib/chart';
import { luanGiai } from './lib/interpret';
import { amLichHomNay } from './lib/amlich';
import { danhSachLaSo, idLaSo, laSoSangInput, luuLaSo } from './lib/storage';

type CheDo = 'la-so' | 'luan-giai';

const NAM_NAY = new Date().getFullYear();

/** Đọc tham số chia sẻ từ URL */
function tuUrl(): { input: BirthInput; namXem: number } | null {
  try {
    const q = new URLSearchParams(window.location.search);
    const ngay = q.get('ngay');
    if (!ngay || !/^\d{4}-\d{2}-\d{2}$/.test(ngay)) return null;
    return {
      input: {
        ten: q.get('ten') ?? '',
        gioiTinh: q.get('gt') === 'Nữ' ? 'Nữ' : 'Nam',
        lich: q.get('lich') === 'am' ? 'am' : 'duong',
        ngay,
        gio: Number(q.get('gio') ?? 2),
        thangNhuan: q.get('nhuan') === '1',
        kinhDo: null,
        dungGioThat: false,
      },
      namXem: Number(q.get('nam') ?? NAM_NAY),
    };
  } catch {
    return null;
  }
}

/** Bỏ dấu tiếng Việt để đặt tên file an toàn */
function slug(s: string): string {
  return s
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/gi, 'd')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();
}

export default function App() {
  const [laSo, setLaSo] = useState<LaSo | null>(null);
  const [input, setInput] = useState<BirthInput | null>(null);
  const [namXem, setNamXem] = useState(NAM_NAY);
  const [cheDo, setCheDo] = useState<CheDo>('la-so');
  const [cungChon, setCungChon] = useState<Cung | null>(null);
  const [daSaoChep, setDaSaoChep] = useState(false);
  const [moLichSu, setMoLichSu] = useState(false);
  const [moSoSanh, setMoSoSanh] = useState(false);
  const [moHuongNghiep, setMoHuongNghiep] = useState(false);
  const [moVanHan, setMoVanHan] = useState(false);
  const [moXemNgay, setMoXemNgay] = useState(false);
  const [moXemTuoi, setMoXemTuoi] = useState(false);
  const [daLuu, setDaLuu] = useState(false);
  const [dangXuatAnh, setDangXuatAnh] = useState(false);
  const [dangXuatPdf, setDangXuatPdf] = useState(false);
  const boardRef = useRef<HTMLDivElement>(null);
  const readingRef = useRef<HTMLDivElement>(null);
  const noteRef = useRef<HTMLDivElement>(null);
  const am = useMemo(() => amLichHomNay(), []);

  // Khôi phục từ URL khi mở trang
  useEffect(() => {
    const u = tuUrl();
    if (!u) return;
    try {
      const ls = lapLaSo(u.input);
      setLaSo(ls);
      setInput(u.input);
      setNamXem(u.namXem);
    } catch {
      /* bỏ qua tham số hỏng */
    }
  }, []);

  const taoLaSo = useCallback((i: BirthInput) => {
    try {
      const ls = lapLaSo(i);
      setLaSo(ls);
      setInput(i);
      setCungChon(null);
      setCheDo('la-so');
      setDaLuu(false);
    } catch (e) {
      alert(
        'Không lập được lá số với thông tin đã nhập. Vui lòng kiểm tra lại ngày giờ sinh (đặc biệt là ngày âm lịch và tháng nhuận).',
      );
      console.error(e);
    }
  }, []);

  const vh = useMemo(() => (laSo ? vanHan(laSo, namXem) : null), [laSo, namXem]);
  const lg = useMemo(() => (laSo ? luanGiai(laSo, namXem) : null), [laSo, namXem]);
  const khoa = useMemo(() => (input ? idLaSo(input) : ''), [input]);

  const linkChiaSe = useMemo(() => {
    if (!input) return '';
    const q = new URLSearchParams({
      ngay: input.ngay,
      gio: String(input.gio),
      gt: input.gioiTinh,
      lich: input.lich,
      nam: String(namXem),
    });
    if (input.ten) q.set('ten', input.ten);
    if (input.thangNhuan) q.set('nhuan', '1');
    return `${window.location.origin}${window.location.pathname}?${q.toString()}`;
  }, [input, namXem]);

  async function saoChep() {
    try {
      await navigator.clipboard.writeText(linkChiaSe);
      setDaSaoChep(true);
      setTimeout(() => setDaSaoChep(false), 2000);
    } catch {
      window.prompt('Sao chép liên kết lá số:', linkChiaSe);
    }
  }

  function luu() {
    if (!input) return;
    luuLaSo(input);
    setDaLuu(true);
    setTimeout(() => setDaLuu(false), 2400);
  }

  /**
   * Xuất ảnh lá số. Thư viện html-to-image được nạp động để không làm nặng
   * bundle chính — ai chỉ xem lá số thì không phải tải thêm ~15 kB.
   */
  async function taiAnh() {
    const node = boardRef.current;
    if (!node || !laSo) return;
    setDangXuatAnh(true);
    try {
      const { toPng } = await import('html-to-image');
      const dataUrl = await toPng(node, {
        backgroundColor: '#080a11',
        pixelRatio: 2,
        cacheBust: true,
        filter: (el) => !(el as HTMLElement).classList?.contains('board-legend'),
      });
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = `la-so-${slug(laSo.ten || 'tu-vi')}-${slug(laSo.duongLich)}.png`;
      a.click();
    } catch (e) {
      console.error(e);
      alert('Không xuất được ảnh trên trình duyệt này. Bạn có thể dùng nút In để lưu thành PDF.');
    } finally {
      setDangXuatAnh(false);
    }
  }

  /**
   * Xuất PDF: ghép lá số (hoặc phần luận giải đang mở) và ghi chú thành tệp A4.
   * jspdf và html-to-image đều nạp động — chỉ tải khi người dùng bấm nút.
   */
  async function xuatPdf() {
    if (!laSo) return;
    setDangXuatPdf(true);
    try {
      const [{ jsPDF }, { toCanvas }] = await Promise.all([
        import('jspdf'),
        import('html-to-image'),
      ]);
      const nodes = [boardRef.current, readingRef.current, noteRef.current].filter(
        (n): n is HTMLDivElement => Boolean(n),
      );
      if (!nodes.length) throw new Error('Không có nội dung để xuất');

      const pdf = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });
      const rongTrang = pdf.internal.pageSize.getWidth();
      const caoTrang = pdf.internal.pageSize.getHeight();
      const le = 10;
      const rongNoiDung = rongTrang - le * 2;
      let daCoTrang = false;

      for (const node of nodes) {
        const canvas = await toCanvas(node, {
          backgroundColor: '#080a11',
          pixelRatio: 2,
          cacheBust: true,
          filter: (el) => !(el as HTMLElement).classList?.contains('board-legend'),
        });
        if (!canvas.width || !canvas.height) continue;

        const pxTrenMm = canvas.width / rongNoiDung;
        const caoDung = caoTrang - le * 2;
        let cat = 0;
        while (cat < canvas.height) {
          const caoCat = Math.min(Math.round(caoDung * pxTrenMm), canvas.height - cat);
          const mieng = document.createElement('canvas');
          mieng.width = canvas.width;
          mieng.height = caoCat;
          const ctx = mieng.getContext('2d');
          if (!ctx) break;
          ctx.fillStyle = '#080a11';
          ctx.fillRect(0, 0, mieng.width, mieng.height);
          ctx.drawImage(canvas, 0, cat, canvas.width, caoCat, 0, 0, canvas.width, caoCat);

          if (daCoTrang) pdf.addPage();
          pdf.addImage(
            mieng.toDataURL('image/jpeg', 0.92),
            'JPEG',
            le,
            le,
            rongNoiDung,
            caoCat / pxTrenMm,
          );
          daCoTrang = true;
          cat += caoCat;
        }
      }

      if (!daCoTrang) throw new Error('Không có nội dung để xuất');
      pdf.save(`tu-vi-${slug(laSo.ten || 'la-so')}-${namXem}.pdf`);
    } catch (e) {
      console.error(e);
      alert(
        'Không xuất được PDF trên trình duyệt này. Bạn có thể dùng nút In rồi chọn "Lưu thành PDF".',
      );
    } finally {
      setDangXuatPdf(false);
    }
  }

  return (
    <>
      <header className="site-head">
        <a className="brand" href="./">
          <span className="brand-mark">紫</span>
          <span className="brand-text">
            <strong>Tử Vi Việt</strong>
            <em>Lá số theo cổ pháp</em>
          </span>
        </a>
        <nav className="head-nav">
          <button onClick={() => setMoHuongNghiep(true)}>Định hướng nghề nghiệp</button>
          {laSo && <button onClick={() => setMoVanHan(true)}>Vận hạn</button>}
          <button onClick={() => setMoXemNgay(true)}>Xem ngày</button>
          <button onClick={() => setMoXemTuoi(true)}>Xây nhà/Cưới hỏi</button>
          <button onClick={() => setMoLichSu(true)}>Lịch sử</button>
          {laSo && (
            <>
              <button className={cheDo === 'la-so' ? 'on' : ''} onClick={() => setCheDo('la-so')}>
                Lá số
              </button>
              <button
                className={cheDo === 'luan-giai' ? 'on' : ''}
                onClick={() => setCheDo('luan-giai')}
              >
                Luận giải
              </button>
            </>
          )}
          {laSo && (
            <button
              className="btn-new"
              onClick={() => {
                setLaSo(null);
                setInput(null);
                setCungChon(null);
              }}
            >
              Lá số mới
            </button>
          )}
        </nav>
      </header>

      <main className="site-main">
        {!laSo && (
          <>
            <section className="hero">
              <StarField />
              <p className="eyebrow">Tử Vi Việt · 紫微斗數</p>
              <h1>
                Lá số của bạn,
                <br />
                <span>đọc bằng tiếng Việt.</span>
              </h1>
              <p className="hero-desc">
                Lập lá số 12 cung, 14 chính tinh, tứ hoá, đại hạn và lưu niên — dựa trên thuật toán
                an sao cổ pháp, hoàn toàn miễn phí và chạy ngay trên trình duyệt. Không gửi dữ liệu
                ngày sinh lên máy chủ nào.
              </p>

              <div className="hero-stats">
                <div>
                  <strong>12</strong>
                  <span>cung</span>
                </div>
                <div>
                  <strong>14</strong>
                  <span>chính tinh</span>
                </div>
                <div>
                  <strong>100+</strong>
                  <span>phụ tinh</span>
                </div>
                <div>
                  <strong>0đ</strong>
                  <span>trọn đời</span>
                </div>
              </div>
            </section>

            <section className="form-wrap">
              <BirthForm onSubmit={taoLaSo} namMacDinh={NAM_NAY} />
            </section>

            {(() => {
              const ganDay = danhSachLaSo().slice(0, 3);
              if (!ganDay.length) return null;
              return (
                <section className="recent">
                  <div className="recent-head">
                    <h2>Lá số gần đây</h2>
                    <button className="btn-ghost" onClick={() => setMoLichSu(true)}>
                      Xem tất cả
                    </button>
                  </div>
                  <div className="recent-grid">
                    {ganDay.map((ls) => (
                      <button
                        key={ls.id}
                        className="recent-card"
                        onClick={() => taoLaSo(laSoSangInput(ls))}
                      >
                        <strong>{ls.nhan || ls.ten || 'Không tên'}</strong>
                        <span>
                          {ls.gioiTinh} · {ls.ngay.split('-').reverse().join('/')} ·{' '}
                          {ls.lich === 'am' ? 'âm lịch' : 'dương lịch'}
                        </span>
                      </button>
                    ))}
                  </div>
                </section>
              );
            })()}

            <Divider className="section-divider" />

            <section className="features">
              <article>
                <h3>An sao chuẩn cổ pháp</h3>
                <p>
                  Dùng engine <code>iztro</code> (MIT) đã kiểm chứng qua hàng nghìn lá số, kèm bộ
                  test hồi quy cho tháng nhuận, tiết khí và biên giới Lập Xuân.
                </p>
              </article>
              <article>
                <h3>Thuật ngữ Việt chuẩn</h3>
                <p>
                  Toàn bộ tên sao, cung, độ sáng (Miếu/Vượng/Đắc/Hãm) và tứ hoá (Lộc/Quyền/Khoa/Kỵ)
                  được viết lại cho người Việt — không dùng bản dịch máy.
                </p>
              </article>
              <article>
                <h3>Luận giải có căn cứ</h3>
                <p>
                  Nhận định bám theo dữ liệu thật của lá số: chính tinh, độ sáng, tứ hoá, tam
                  phương tứ chính và cách cục. Không hù doạ, không hứa hẹn tuyệt đối.
                </p>
              </article>
              <article>
                <h3>Lưu lại và đối chiếu</h3>
                <p>
                  Cất lá số kèm ghi chú riêng trên máy, mở lại bất cứ lúc nào, và đối chiếu hai lá
                  số để thấy mức tương hợp cùng những điểm cần bàn rõ trước.
                </p>
              </article>
            </section>
          </>
        )}

        {laSo && vh && (
          <>
            <div className="chart-toolbar">
              <div className="chart-title">
                <h2>{laSo.ten || 'Lá số Tử Vi'}</h2>
                <p>
                  {laSo.gioiTinh} · sinh {laSo.gio.ten} ngày {laSo.duongLich} · {laSo.cuc}
                </p>
              </div>
              <div className="chart-actions">
                <label className="nam-xem">
                  <span>Năm xem</span>
                  <input
                    type="number"
                    value={namXem}
                    min={1900}
                    max={2200}
                    onChange={(e) => setNamXem(Number(e.target.value) || NAM_NAY)}
                  />
                </label>
                <span
                  className={`am-chip ${am.hoangDao ? 'tot' : 'xau'}`}
                  title={`Hôm nay: ${am.canChiNam} · ${am.canChiThang} · ${am.nhan}`}
                >
                  <b>
                    Âm {am.ngay}/{am.thang}
                    {am.nhuan ? ' nhuận' : ''}
                  </b>
                  <em>{am.canChiNgay}</em>
                  <i>Trực {am.truc}</i>
                </span>
                <button className="btn-ghost" onClick={luu}>
                  {daLuu ? 'Đã lưu ✓' : 'Lưu lá số'}
                </button>
                <button className="btn-ghost" onClick={() => setMoSoSanh(true)}>
                  Đối chiếu
                </button>
                <button className="btn-ghost" onClick={taiAnh} disabled={dangXuatAnh}>
                  {dangXuatAnh ? 'Đang xuất…' : 'Tải ảnh'}
                </button>
                <button className="btn-ghost" onClick={saoChep}>
                  {daSaoChep ? 'Đã chép ✓' : 'Chia sẻ'}
                </button>
                <button className="btn-ghost" onClick={xuatPdf} disabled={dangXuatPdf}>
                  {dangXuatPdf ? 'Đang xuất…' : 'Xuất PDF'}
                </button>
                <button className="btn-ghost" onClick={() => window.print()}>
                  In
                </button>
              </div>
            </div>

            {cheDo === 'la-so' && (
              <>
                <div ref={boardRef}>
                  <ChartBoard
                    laSo={laSo}
                    vanHan={vh}
                    namXem={namXem}
                    cungDangChon={cungChon}
                    onChon={setCungChon}
                  />
                </div>
                <p className="board-hint">
                  Nhấn vào một cung để xem chi tiết các sao, ý nghĩa cung và tam phương tứ chính.
                </p>
                <div className="quick-menh">
                  {(() => {
                    const menh = cungTheoTen(laSo, 'Mệnh');
                    if (!menh) return null;
                    return (
                      <div className="quick-card">
                        <h3>
                          Cung Mệnh — {menh.can} {menh.chi}
                        </h3>
                        <p>
                          Chính tinh:{' '}
                          <b>
                            {menh.chinhTinh.length
                              ? menh.chinhTinh
                                  .map(
                                    (s) =>
                                      `${s.ten}${s.doSang ? ` (${s.doSang})` : ''}${s.tuHoa ? ` [${s.tuHoa}]` : ''}`,
                                  )
                                  .join(', ')
                              : 'Vô chính diệu'}
                          </b>
                        </p>
                        <button className="btn-ghost" onClick={() => setCheDo('luan-giai')}>
                          Xem luận giải đầy đủ →
                        </button>
                      </div>
                    );
                  })()}
                </div>
                <div ref={noteRef}>
                  <NoteBox id={khoa} />
                </div>
              </>
            )}

            {cheDo === 'luan-giai' && lg && (
              <div ref={readingRef}>
                <ReadingPanel luanGiai={lg} namXem={namXem} />
              </div>
            )}
          </>
        )}
      </main>

      <footer className="site-foot">
        <p>
          <b>Tử Vi Việt</b> — mã nguồn mở, engine an sao <code>iztro</code> (MIT). Nội dung luận
          giải do dự án tự biên soạn bằng tiếng Việt. Dữ liệu bạn nhập và ghi chú chỉ nằm trong trình
          duyệt của bạn.
        </p>
        <p className="muted">
          Công cụ tham khảo, không phải lời khuyên y tế / pháp lý / tài chính. Không có lá số nào đủ
          để quyết định thay bạn.
        </p>
      </footer>

      {cungChon && <DetailPanel cung={cungChon} laSo={laSo!} onClose={() => setCungChon(null)} />}

      {moLichSu && <HistoryPanel onLoad={taoLaSo} onClose={() => setMoLichSu(false)} />}

      {moSoSanh && input && (
        <CompatibilityView
          laSoChinh={laSo!}
          inputChinh={input}
          onClose={() => setMoSoSanh(false)}
        />
      )}

      {moHuongNghiep && <CareerOrientation onClose={() => setMoHuongNghiep(false)} />}
      {moVanHan && laSo && <VanHanPanel laSo={laSo} onClose={() => setMoVanHan(false)} />}
      {moXemNgay && <XemNgayPanel onClose={() => setMoXemNgay(false)} />}
      {moXemTuoi && <XemTuoiPanel onClose={() => setMoXemTuoi(false)} />}
    </>
  );
}
