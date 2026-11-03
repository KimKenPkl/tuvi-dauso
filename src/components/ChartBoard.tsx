import type { Cung, LaSo, VanHan } from '../lib/chart';
import CenterCard from './CenterCard';
import PalaceCell from './PalaceCell';

interface Props {
  laSo: LaSo;
  vanHan: VanHan;
  namXem: number;
  cungDangChon: Cung | null;
  onChon: (c: Cung) => void;
}

export default function ChartBoard({ laSo, vanHan, namXem, cungDangChon, onChon }: Props) {
  const nhan = (c: Cung): string[] => {
    const out: string[] = [];
    if (c.index === vanHan.daiHan.index) out.push('ĐH');
    if (c.index === vanHan.luuNien.index) out.push('LN');
    if (c.index === vanHan.tieuHan.index) out.push('TH');
    return out;
  };

  return (
    <div className="board">
      {laSo.cung.map((c) => (
        <PalaceCell
          key={c.index}
          cung={c}
          laMenh={c.ten === 'Mệnh'}
          dangChon={cungDangChon?.index === c.index}
          onClick={() => onChon(c)}
          nhanVanHan={nhan(c)}
        />
      ))}

      <div className="center-wrap">
        <CenterCard laSo={laSo} vanHan={vanHan} namXem={namXem} />
      </div>

      <div className="board-legend">
        <span><b>ĐH</b> Đại hạn</span>
        <span><b>LN</b> Lưu niên</span>
        <span><b>TH</b> Tiểu hạn</span>
        <span><b>Miếu/Vượng</b> tốt · <b>Hãm</b> yếu</span>
        <span>
          <i className="hoa hoa-loc">Lộc</i>
          <i className="hoa hoa-quyen">Quyền</i>
          <i className="hoa hoa-khoa">Khoa</i>
          <i className="hoa hoa-ky">Kỵ</i>
        </span>
      </div>
    </div>
  );
}
