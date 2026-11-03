import type { Cung } from '../lib/chart';

interface Props {
  cung: Cung;
  laMenh: boolean;
  dangChon: boolean;
  onClick: () => void;
  nhanVanHan?: string[];
}

const HOA_CLASS: Record<string, string> = {
  Lộc: 'hoa-loc',
  Quyền: 'hoa-quyen',
  Khoa: 'hoa-khoa',
  Kỵ: 'hoa-ky',
};

export default function PalaceCell({ cung, laMenh, dangChon, onClick, nhanVanHan }: Props) {
  return (
    <button
      type="button"
      className={`cell${laMenh ? ' cell-menh' : ''}${dangChon ? ' cell-chon' : ''}`}
      style={{ gridRow: cung.row + 1, gridColumn: cung.col + 1, order: cung.row * 4 + cung.col }}
      onClick={onClick}
      aria-label={`Cung ${cung.ten}, can chi ${cung.can} ${cung.chi}`}
    >
      <span className="cell-top">
        <span className="cell-ten">
          {cung.ten}
          {cung.laThan && <em className="badge-than">Thân</em>}
          {cung.laLaiNhan && <em className="badge-lai">Lai Nhân</em>}
        </span>
        <span className="cell-canc">
          {cung.can} {cung.chi}
        </span>
      </span>

      <span className="cell-sao">
        {cung.chinhTinh.length === 0 && <em className="vo-chinh">vô chính diệu</em>}
        {cung.chinhTinh.map((s) => (
          <span key={s.tenGoc} className="sao-chinh">
            <span className="sao-ten">{s.ten}</span>
            {s.doSang && <span className="sao-sang">{s.doSang}</span>}
            {s.tuHoa && <span className={`hoa ${HOA_CLASS[s.tuHoa] ?? ''}`}>{s.tuHoa}</span>}
          </span>
        ))}
      </span>

      {cung.phuTinh.length > 0 && (
        <span className="cell-phu">
          {cung.phuTinh.map((s) => (
            <span key={s.tenGoc} className="sao-phu">
              {s.ten}
              {s.tuHoa && <span className={`hoa ${HOA_CLASS[s.tuHoa] ?? ''}`}>{s.tuHoa}</span>}
            </span>
          ))}
        </span>
      )}

      <span className="cell-foot">
        <span className="dai-han">
          {cung.daiHan.tuoiBatDau}–{cung.daiHan.tuoiKetThuc}
        </span>
        {nhanVanHan?.map((n) => (
          <span key={n} className="nhan-van-han">
            {n}
          </span>
        ))}
      </span>
    </button>
  );
}
