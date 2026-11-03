import { useState } from 'react';
import type { LuanGiai, MucLuanGiai } from '../lib/interpret';

interface Props {
  luanGiai: LuanGiai;
  namXem: number;
}

const TABS = [
  { key: 'tongQuan', ten: 'Tổng quan' },
  { key: 'tinhCach', ten: 'Tính cách' },
  { key: 'suNghiep', ten: 'Sự nghiệp' },
  { key: 'taiLoc', ten: 'Tài lộc' },
  { key: 'tinhCam', ten: 'Tình cảm' },
  { key: 'sucKhoe', ten: 'Sức khoẻ' },
  { key: 'vanHan', ten: 'Vận hạn' },
] as const;

type TabKey = (typeof TABS)[number]['key'];

function Muc({ muc }: { muc: MucLuanGiai[] }) {
  return (
    <div className="muc-list">
      {muc.map((m, i) => (
        <article className="muc" key={`${m.tieuDe}-${i}`}>
          <h4>{m.tieuDe}</h4>
          <p style={{ whiteSpace: 'pre-line' }}>{m.noiDung}</p>
        </article>
      ))}
    </div>
  );
}

export default function ReadingPanel({ luanGiai, namXem }: Props) {
  const [tab, setTab] = useState<TabKey>('tongQuan');

  return (
    <section className="reading">
      {luanGiai.cachCuc.length > 0 && (
        <div className="cach-cuc">
          <h3>Cách cục nổi bật</h3>
          <div className="cach-cuc-grid">
            {luanGiai.cachCuc.map((c) => (
              <article key={c.ten} className={`cach-cuc-item cc-${c.mucDo.replace(/\s/g, '-')}`}>
                <span className="cc-ten">{c.ten}</span>
                <span className="cc-muc">{c.mucDo}</span>
                <p>{c.yNghia}</p>
              </article>
            ))}
          </div>
        </div>
      )}

      <div className="tabs" role="tablist">
        {TABS.map((t) => (
          <button
            key={t.key}
            role="tab"
            aria-selected={tab === t.key}
            className={tab === t.key ? 'on' : ''}
            onClick={() => setTab(t.key)}
          >
            {t.ten}
          </button>
        ))}
      </div>

      <div className="tab-body">
        <Muc muc={luanGiai[tab]} />
      </div>

      <div className="loi-khuyen">
        <h3>Lời khuyên</h3>
        <ul>
          {luanGiai.loiKhuyen.map((l, i) => (
            <li key={i}>{l}</li>
          ))}
        </ul>
        <p className="disclaimer">
          Nội dung luận giải được sinh tự động từ cấu trúc lá số theo cổ pháp Tử Vi Đẩu Số, dùng để
          tham khảo. Không thay thế tư vấn y tế, pháp lý hoặc tài chính chuyên môn. Năm xem vận hạn
          hiện tại: <b>{namXem}</b>.
        </p>
      </div>
    </section>
  );
}
