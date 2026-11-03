import { useMemo, useState } from 'react';
import { GIO_SINH } from '../lib/dict';
import { lapLaSo, type BirthInput, type LaSo } from '../lib/chart';
import { doiChieu, type KetQuaDoiChieu } from '../lib/synastry';

interface Props {
  laSoChinh: LaSo;
  inputChinh: BirthInput;
  onClose: () => void;
}

const NAM_MIN = 1900;
const NAM_MAX = 2100;
const namList = Array.from({ length: NAM_MAX - NAM_MIN + 1 }, (_, i) => NAM_MAX - i);

export default function CompatibilityView({ laSoChinh, inputChinh, onClose }: Props) {
  const [ten, setTen] = useState('');
  const [gioiTinh, setGioiTinh] = useState<'Nam' | 'Nữ'>(inputChinh.gioiTinh === 'Nam' ? 'Nữ' : 'Nam');
  const [lich, setLich] = useState<'duong' | 'am'>('duong');
  const [ngayDuong, setNgayDuong] = useState('1998-09-22');
  const [ngayAm, setNgayAm] = useState(15);
  const [thangAm, setThangAm] = useState(8);
  const [namAm, setNamAm] = useState(1998);
  const [nhuan, setNhuan] = useState(false);
  const [gio, setGio] = useState(2);
  const [loi, setLoi] = useState('');

  const [ketQua, setKetQua] = useState<KetQuaDoiChieu | null>(null);
  const [laSoPhu, setLaSoPhu] = useState<LaSo | null>(null);

  const menhChinh = useMemo(() => {
    const m = laSoChinh.cung.find((c) => c.ten === 'Mệnh');
    return m ? `${m.chi}${m.chinhTinh[0] ? ` · ${m.chinhTinh[0].ten}` : ''}` : '';
  }, [laSoChinh]);

  function doiChieuNgay(e: React.FormEvent) {
    e.preventDefault();
    setLoi('');

    const ngay =
      lich === 'duong'
        ? ngayDuong
        : `${namAm}-${String(thangAm).padStart(2, '0')}-${String(ngayAm).padStart(2, '0')}`;

    if (!/^\d{4}-\d{2}-\d{2}$/.test(ngay)) {
      setLoi('Ngày sinh chưa hợp lệ.');
      return;
    }
    if (lich === 'am' && (thangAm < 1 || thangAm > 12 || ngayAm < 1 || ngayAm > 30)) {
      setLoi('Ngày/tháng âm lịch phải trong khoảng 1–30 và 1–12.');
      return;
    }

    try {
      const phu = lapLaSo({
        ten,
        gioiTinh,
        lich,
        ngay,
        gio,
        thangNhuan: nhuan,
        kinhDo: null,
        dungGioThat: false,
      });
      setLaSoPhu(phu);
      setKetQua(doiChieu(laSoChinh, phu));
    } catch (err) {
      console.error(err);
      setLoi('Không lập được lá số thứ hai. Kiểm tra lại ngày giờ sinh.');
    }
  }

  return (
    <div className="drawer-backdrop" onClick={onClose} role="presentation">
      <aside
        className="drawer drawer-wide"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Đối chiếu hai lá số"
      >
        <header className="drawer-head">
          <div>
            <h3>Đối chiếu hai lá số</h3>
            <p className="drawer-sub">
              So lá số của {laSoChinh.ten || 'bạn'} ({menhChinh}) với một người khác
            </p>
          </div>
          <button type="button" className="close" onClick={onClose} aria-label="Đóng">
            ✕
          </button>
        </header>

        <div className="drawer-body">
          <form className="compat-form" onSubmit={doiChieuNgay}>
            <div className="form-row">
              <label className="field field-wide">
                <span className="label">Tên người thứ hai</span>
                <input
                  value={ten}
                  onChange={(e) => setTen(e.target.value)}
                  placeholder="Không bắt buộc"
                  autoComplete="off"
                />
              </label>

              <div className="field">
                <span className="label">Giới tính</span>
                <div className="seg">
                  {(['Nam', 'Nữ'] as const).map((g) => (
                    <button
                      type="button"
                      key={g}
                      className={gioiTinh === g ? 'on' : ''}
                      onClick={() => setGioiTinh(g)}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              <div className="field">
                <span className="label">Loại lịch</span>
                <div className="seg">
                  <button
                    type="button"
                    className={lich === 'duong' ? 'on' : ''}
                    onClick={() => setLich('duong')}
                  >
                    Dương
                  </button>
                  <button type="button" className={lich === 'am' ? 'on' : ''} onClick={() => setLich('am')}>
                    Âm
                  </button>
                </div>
              </div>
            </div>

            {lich === 'duong' ? (
              <div className="form-row">
                <label className="field">
                  <span className="label">Ngày sinh</span>
                  <input type="date" value={ngayDuong} onChange={(e) => setNgayDuong(e.target.value)} />
                </label>
                <label className="field">
                  <span className="label">Giờ sinh</span>
                  <select value={gio} onChange={(e) => setGio(Number(e.target.value))}>
                    {GIO_SINH.map((g) => (
                      <option key={g.index} value={g.index}>
                        {g.ten} — {g.khoang}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            ) : (
              <div className="form-row form-row-4">
                <label className="field">
                  <span className="label">Ngày</span>
                  <select value={ngayAm} onChange={(e) => setNgayAm(Number(e.target.value))}>
                    {Array.from({ length: 30 }, (_, i) => i + 1).map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </label>
                <label className="field">
                  <span className="label">Tháng</span>
                  <select value={thangAm} onChange={(e) => setThangAm(Number(e.target.value))}>
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </label>
                <label className="field">
                  <span className="label">Năm</span>
                  <select value={namAm} onChange={(e) => setNamAm(Number(e.target.value))}>
                    {namList.map((y) => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                </label>
                <label className="field">
                  <span className="label">Giờ sinh</span>
                  <select value={gio} onChange={(e) => setGio(Number(e.target.value))}>
                    {GIO_SINH.map((g) => (
                      <option key={g.index} value={g.index}>
                        {g.ten} — {g.khoang}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="check check-wide">
                  <input type="checkbox" checked={nhuan} onChange={(e) => setNhuan(e.target.checked)} />
                  <span>Tháng nhuận</span>
                </label>
              </div>
            )}

            {loi && <p className="error">{loi}</p>}

            <button type="submit" className="btn-ghost primary">
              Đối chiếu
            </button>
          </form>

          {ketQua && laSoPhu && (
            <div className="compat-result">
              <div className="compat-score">
                <strong>{ketQua.mucDo}</strong>
                <span>
                  {laSoChinh.ten || 'Bạn'} · {ketQua.menhA}
                </span>
                <span>
                  {laSoPhu.ten || ten || 'Người thứ hai'} · {ketQua.menhB}
                </span>
              </div>

              <p className="compat-mo-ta">{ketQua.moTa}</p>

              <div className="compat-grid">
                {ketQua.chiTiet.map((c, i) => (
                  <article key={i} className={`compat-item ${c.diem > 0 ? 'thuan' : c.diem < 0 ? 'khac' : ''}`}>
                    <div className="compat-item-head">
                      <b>{c.nhan}</b>
                      <span>{c.diem > 0 ? `+${c.diem}` : c.diem}</span>
                    </div>
                    <p>{c.ghiChu}</p>
                  </article>
                ))}
              </div>

              <div className="compat-goiy">
                <h4>Nên lưu ý</h4>
                <ul>
                  {ketQua.goiY.map((g, i) => (
                    <li key={i}>{g}</li>
                  ))}
                </ul>
              </div>

              <p className="disclaimer">
                Đối chiếu chỉ dùng các quan hệ cổ điển giữa địa chi cung Mệnh, ngũ hành chính tinh và
                sao cung Phu Thê. Đây là một lớp tham khảo, không phải kết luận về một mối quan hệ —
                và tuyệt đối không dùng để quyết định thay ai.
              </p>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}
