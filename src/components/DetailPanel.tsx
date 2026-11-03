import { cungInfo, CHINH_TINH, PHU_TINH_INFO } from '../lib/content';
import { tamPhuongTuChinh, type Cung, type LaSo, type Sao } from '../lib/chart';

interface Props {
  cung: Cung;
  laSo: LaSo;
  onClose: () => void;
}

const HOA_CLASS: Record<string, string> = {
  Lộc: 'hoa-loc',
  Quyền: 'hoa-quyen',
  Khoa: 'hoa-khoa',
  Kỵ: 'hoa-ky',
};

function yNghiaSao(s: Sao): string {
  const chinh = CHINH_TINH[s.ten];
  if (chinh) return chinh.chuQuan + '.';
  return PHU_TINH_INFO[s.ten] ?? '';
}

export default function DetailPanel({ cung, laSo, onClose }: Props) {
  const info = cungInfo(cung.ten);
  const tamPhuong = tamPhuongTuChinh(laSo.cung, cung);
  const tatCa = [...cung.chinhTinh, ...cung.phuTinh, ...cung.tapTinh];

  return (
    <div className="drawer-backdrop" onClick={onClose} role="presentation">
      <aside className="drawer" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <header className="drawer-head">
          <div>
            <h3>
              Cung {cung.ten}
              {cung.laThan && <em className="badge-than">Thân</em>}
            </h3>
            <p className="drawer-sub">
              {cung.can} {cung.chi} · Đại hạn {cung.daiHan.tuoiBatDau}–{cung.daiHan.tuoiKetThuc} tuổi
            </p>
          </div>
          <button type="button" className="close" onClick={onClose} aria-label="Đóng">
            ✕
          </button>
        </header>

        <div className="drawer-body">
          {info && (
            <section>
              <h4>{info.linhVuc}</h4>
              <p>{info.yNghia}</p>
            </section>
          )}

          <section>
            <h4>Sao trong cung</h4>
            {tatCa.length === 0 && <p className="muted">Không có sao.</p>}
            <ul className="sao-list">
              {tatCa.map((s) => (
                <li key={s.tenGoc} className={`sao-item sao-${s.loai}`}>
                  <span className="sao-item-head">
                    <strong>{s.ten}</strong>
                    {s.doSang && <em className="sang">{s.doSang}</em>}
                    {s.tuHoa && <em className={`hoa ${HOA_CLASS[s.tuHoa] ?? ''}`}>{s.tuHoa}</em>}
                  </span>
                  {yNghiaSao(s) && <span className="sao-item-desc">{yNghiaSao(s)}</span>}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h4>Tam phương tứ chính</h4>
            <p className="muted">
              {tamPhuong.map((c) => `Cung ${c.ten} (${c.chi})`).join(' — ')}
            </p>
            <ul className="tam-phuong">
              {tamPhuong.map((c) => (
                <li key={c.index}>
                  <b>{c.ten}</b>: {c.chinhTinh.map((s) => s.ten).join(', ') || 'vô chính diệu'}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h4>Vòng Trường Sinh — Bác Sĩ</h4>
            <p>
              Trường sinh: <b>{cung.truongSinh}</b> · Bác sĩ: <b>{cung.bacSi}</b> · Tướng tinh:{' '}
              <b>{cung.tuongTinh}</b> · Tuế tiền: <b>{cung.tueTien}</b>
            </p>
          </section>
        </div>
      </aside>
    </div>
  );
}
