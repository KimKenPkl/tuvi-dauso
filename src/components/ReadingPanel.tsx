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
  { key: 'boSao', ten: 'Bộ sao' },
  { key: 'muoiHaiCung', ten: '12 cung' },
  { key: 'vanHan', ten: 'Vận hạn' },
] as const;

type TabKey = (typeof TABS)[number]['key'];
type MucKey = Exclude<TabKey, 'boSao' | 'muoiHaiCung'>;

/** Đổi nhãn tiếng Việt thành class ASCII để CSS không phụ thuộc bảng mã. */
const slugMuc = (m: string): string => {
  const map: Record<string, string> = {
    'tốt': 'tot',
    'khá': 'kha',
    'cần lưu ý': 'can-luu-y',
    'thuận': 'thuan',
    'trung tính': 'trung-tinh',
  };
  return map[m] ?? 'khac';
};

const MUC_KEYS: MucKey[] = [
  'tongQuan',
  'tinhCach',
  'suNghiep',
  'taiLoc',
  'tinhCam',
  'sucKhoe',
  'vanHan',
];

function Muc({ muc }: { muc: MucLuanGiai[] }) {
  return (
    <div className="muc-list">
      {muc.map((m, i) => (
        <article className="muc" key={`${m.tieuDe}-${i}`}>
          <h4>{m.tieuDe}</h4>
          <p style={{ whiteSpace: 'pre-line' }}>{m.noiDung}</p>
          {m.canCu && (
            <p className="muc-can-cu">
              <span>Căn cứ</span> {m.canCu}
            </p>
          )}
          {m.hoi && (
            <p className="muc-hoi">
              <span>Tự đối chiếu</span> {m.hoi}
            </p>
          )}
        </article>
      ))}
    </div>
  );
}

function BoSaoView({ ds }: { ds: LuanGiai['boSao'] }) {
  if (!ds.length) {
    return (
      <p className="lg-trong">
        Tam phương tứ chính cung Mệnh không tụ đủ bộ sao nào trong danh mục. Không có bộ sao lớn
        không phải là bất lợi: lá số khi đó đọc theo từng sao và theo cung, ít bị một bộ sao chi phối
        toàn bộ cuộc đời.
      </p>
    );
  }
  return (
    <div className="bo-sao-grid">
      {ds.map((b) => (
        <article key={b.ten} className={`bo-sao-item bs-${slugMuc(b.mucDo)}`}>
          <div className="bs-head">
            <strong>{b.ten}</strong>
            <span className="bs-muc">{b.mucDo}</span>
          </div>
          <div className="bs-sao">
            {b.sao.map((s) => (
              <span key={s} className="bs-chip">
                {s}
              </span>
            ))}
          </div>
          <p>{b.yNghia}</p>
        </article>
      ))}
    </div>
  );
}

function MuoiHaiCungView({ ds }: { ds: LuanGiai['muoiHaiCung'] }) {
  return (
    <div className="cung-bang">
      {ds.map((c) => (
        <article key={c.ten} className={`cb-row cb-${slugMuc(c.mucDo)}`}>
          <div className="cb-head">
            <strong>
              {c.ten} <em>({c.chi})</em>
            </strong>
            <span className="cb-muc">{c.mucDo}</span>
          </div>
          <div className="cb-sao">
            <span>Chính tinh: {c.chinhTinh}</span>
            <span>Phụ tinh: {c.phuTinh}</span>
          </div>
          <p>{c.nhanXet}</p>
        </article>
      ))}
    </div>
  );
}

export default function ReadingPanel({ luanGiai, namXem }: Props) {
  const [tab, setTab] = useState<TabKey>('tongQuan');

  return (
    <section className="reading">
      <div className="lg-tom-tat">
        <p className="lg-chot">{luanGiai.tomTat.cauChot}</p>
        <div className="lg-meta">
          <span>
            <em>Mệnh</em> {luanGiai.tomTat.menh}
          </span>
          <span>
            <em>Thân</em> {luanGiai.tomTat.thanCu}
          </span>
          <span>
            <em>Âm dương</em> {luanGiai.tomTat.amDuong}
          </span>
        </div>
      </div>

      {luanGiai.cachCuc.length > 0 && (
        <div className="cach-cuc">
          <h3>Cách cục nổi bật</h3>
          <div className="cach-cuc-grid">
            {luanGiai.cachCuc.map((c) => (
              <article key={c.ten} className={`cach-cuc-item cc-${slugMuc(c.mucDo)}`}>
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
        {tab === 'boSao' && <BoSaoView ds={luanGiai.boSao} />}
        {tab === 'muoiHaiCung' && <MuoiHaiCungView ds={luanGiai.muoiHaiCung} />}
        {MUC_KEYS.includes(tab as MucKey) && <Muc muc={luanGiai[tab as MucKey]} />}
      </div>

      <div className="cau-hoi">
        <h3>Câu hỏi tự đối chiếu</h3>
        <p className="cau-hoi-dan">
          Lá số chỉ là bản đồ thiên hướng. Giá trị thật nằm ở chỗ bạn đối chiếu nó với trải nghiệm
          của chính mình — dưới đây là vài câu để bắt đầu.
        </p>
        <ul>
          {luanGiai.cauHoi.map((q, i) => (
            <li key={i}>{q}</li>
          ))}
        </ul>
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
