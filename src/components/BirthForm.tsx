import { useMemo, useState } from 'react';
import { GIO_SINH } from '../lib/dict';
import { TINH_THANH } from '../lib/provinces';
import type { BirthInput } from '../lib/chart';

interface Props {
  onSubmit: (input: BirthInput) => void;
  namMacDinh: number;
}

const NAM_MIN = 1900;
const NAM_MAX = 2100;

export default function BirthForm({ onSubmit, namMacDinh }: Props) {
  const [ten, setTen] = useState('');
  const [gioiTinh, setGioiTinh] = useState<'Nam' | 'Nữ'>('Nam');
  const [lich, setLich] = useState<'duong' | 'am'>('duong');
  const [ngayDuong, setNgayDuong] = useState('1998-09-22');
  const [ngayAm, setNgayAm] = useState(15);
  const [thangAm, setThangAm] = useState(8);
  const [namAm, setNamAm] = useState(1998);
  const [nhuan, setNhuan] = useState(false);
  const [gio, setGio] = useState(2);
  const [moRong, setMoRong] = useState(false);
  const [tinh, setTinh] = useState('');
  const [dungGioThat, setDungGioThat] = useState(false);
  const [namXem, setNamXem] = useState(namMacDinh);
  const [loi, setLoi] = useState('');

  const kinhDo = useMemo(() => TINH_THANH.find((t) => t.ten === tinh)?.kinhDo ?? null, [tinh]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoi('');

    const ngay =
      lich === 'duong'
        ? ngayDuong
        : `${namAm}-${String(thangAm).padStart(2, '0')}-${String(ngayAm).padStart(2, '0')}`;

    if (!ngay || !/^\d{4}-\d{2}-\d{2}$/.test(ngay)) {
      setLoi('Vui lòng chọn ngày sinh hợp lệ.');
      return;
    }

    if (lich === 'am') {
      if (thangAm > 12 || thangAm < 1) {
        setLoi('Tháng âm lịch phải từ 1 đến 12.');
        return;
      }
      if (ngayAm > 30 || ngayAm < 1) {
        setLoi('Ngày âm lịch phải từ 1 đến 30.');
        return;
      }
    }

    if (namXem < 1900 || namXem > 2200) {
      setLoi('Năm xem vận hạn phải trong khoảng 1900 – 2200.');
      return;
    }

    onSubmit({
      ten,
      gioiTinh,
      lich,
      ngay,
      gio,
      thangNhuan: nhuan,
      kinhDo,
      dungGioThat: dungGioThat && kinhDo != null,
    });
  }

  const namList = Array.from({ length: NAM_MAX - NAM_MIN + 1 }, (_, i) => NAM_MAX - i);

  return (
    <form className="form" onSubmit={submit}>
      <div className="form-row">
        <label className="field field-wide">
          <span className="label">Họ và tên <em>(không bắt buộc)</em></span>
          <input
            type="text"
            value={ten}
            onChange={(e) => setTen(e.target.value)}
            placeholder="Nguyễn Văn A"
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
            <button type="button" className={lich === 'duong' ? 'on' : ''} onClick={() => setLich('duong')}>
              Dương lịch
            </button>
            <button type="button" className={lich === 'am' ? 'on' : ''} onClick={() => setLich('am')}>
              Âm lịch
            </button>
          </div>
        </div>
      </div>

      {lich === 'duong' ? (
        <div className="form-row">
          <label className="field">
            <span className="label">Ngày sinh (dương lịch)</span>
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
            <span className="label">Ngày (âm lịch)</span>
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

      <div className="form-row">
        <label className="field">
          <span className="label">Năm xem vận hạn</span>
          <input
            type="number"
            value={namXem}
            min={1900}
            max={2200}
            onChange={(e) => setNamXem(Number(e.target.value))}
          />
        </label>

        <button type="button" className="link-btn" onClick={() => setMoRong((v) => !v)}>
          {moRong ? '− Ẩn tuỳ chọn nâng cao' : '+ Tuỳ chọn nâng cao (giờ thật)'}
        </button>
      </div>

      {moRong && (
        <div className="advanced">
          <p className="hint">
            Giờ thật (true solar time) điều chỉnh theo kinh độ nơi sinh. Việt Nam dùng múi giờ UTC+7
            (kinh tuyến chuẩn 105°Đ), nên nếu sinh ở nơi khác kinh tuyến này, giờ đồng hồ lệch với
            giờ mặt trời thật. Bật tuỳ chọn này để lá số chính xác hơn về mặt thiên văn.
          </p>
          <div className="form-row">
            <label className="field">
              <span className="label">Nơi sinh</span>
              <select value={tinh} onChange={(e) => setTinh(e.target.value)}>
                <option value="">— Không chọn —</option>
                {TINH_THANH.map((t) => (
                  <option key={t.ten} value={t.ten}>
                    {t.ten} ({t.kinhDo}°Đ)
                  </option>
                ))}
              </select>
            </label>

            <label className="check">
              <input
                type="checkbox"
                checked={dungGioThat}
                disabled={!tinh}
                onChange={(e) => setDungGioThat(e.target.checked)}
              />
              <span>Quy đổi theo giờ thật</span>
            </label>
          </div>
        </div>
      )}

      {loi && <p className="error">{loi}</p>}

      <button type="submit" className="submit">
        Lập lá số
      </button>
    </form>
  );
}
