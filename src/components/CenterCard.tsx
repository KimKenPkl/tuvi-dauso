import type { LaSo, VanHan } from '../lib/chart';

interface Props {
  laSo: LaSo;
  vanHan: VanHan;
  namXem: number;
}

export default function CenterCard({ laSo, vanHan, namXem }: Props) {
  return (
    <div className="center">
      <div className="center-name">
        {laSo.ten || 'Lá số'}
        <span className="center-sub">
          {laSo.gioiTinh} · {laSo.conGiap} · {laSo.cungHoangDao}
        </span>
      </div>

      <dl className="center-grid">
        <div>
          <dt>Dương lịch</dt>
          <dd>{laSo.duongLich}</dd>
        </div>
        <div>
          <dt>Âm lịch</dt>
          <dd>{laSo.amLich}</dd>
        </div>
        <div>
          <dt>Giờ sinh</dt>
          <dd>
            {laSo.gio.ten}
            {laSo.gioDaChinh && <em className="chinh-gio"> (đã quy đổi giờ thật)</em>}
          </dd>
        </div>
        <div>
          <dt>Ngũ hành cục</dt>
          <dd>{laSo.cuc}</dd>
        </div>
        <div>
          <dt>Mệnh chủ</dt>
          <dd>{laSo.menhChu}</dd>
        </div>
        <div>
          <dt>Thân chủ</dt>
          <dd>{laSo.thanChu}</dd>
        </div>
        <div>
          <dt>Mệnh cung</dt>
          <dd>{laSo.menhCung}</dd>
        </div>
        <div>
          <dt>Thân cung</dt>
          <dd>{laSo.thanCung}</dd>
        </div>
      </dl>

      <div className="tu-tru">
        {laSo.tuTru.map((t) => (
          <div key={t.nhan}>
            <span>{t.nhan}</span>
            <strong>
              {t.can} {t.chi}
            </strong>
          </div>
        ))}
      </div>

      <div className="center-vh">
        <div>
          <span>Đại hạn</span>
          <strong>
            {vanHan.daiHan.tuoi[0]}–{vanHan.daiHan.tuoi[1]} tuổi
          </strong>
        </div>
        <div>
          <span>Lưu niên {namXem}</span>
          <strong>
            {vanHan.luuNien.can} {vanHan.luuNien.chi}
          </strong>
        </div>
        <div>
          <span>Tiểu hạn</span>
          <strong>{vanHan.tieuHan.tuoi} tuổi</strong>
        </div>
      </div>
    </div>
  );
}
