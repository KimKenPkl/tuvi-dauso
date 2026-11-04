import { LUU_Y_TUONG_SO, NGU_NHAC, NGU_QUAN, TAM_DINH, TU_DOC } from '../lib/tuongSo';
import { Card, GhiChu } from './dp-ui';

function Muc({
  ten,
  han,
  moTa,
  yNghia,
}: {
  ten: string;
  han: string;
  moTa: string;
  yNghia: string;
}) {
  return (
    <div
      style={{
        padding: '12px 14px',
        borderRadius: 10,
        background: 'var(--sheen-0)',
        border: '1px solid var(--line)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, alignItems: 'baseline' }}>
        <strong style={{ color: 'var(--cream)', fontSize: 14 }}>{ten}</strong>
        <span style={{ color: 'var(--gold)', fontSize: 13 }}>{han}</span>
      </div>
      <p style={{ margin: '6px 0 4px', color: 'var(--muted)', fontSize: 12.5 }}>{moTa}</p>
      <p style={{ margin: 0, color: 'var(--text)', fontSize: 13, lineHeight: 1.7 }}>{yNghia}</p>
    </div>
  );
}

export default function TuongSoView() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <p style={{ margin: 0, color: 'var(--muted)', fontSize: 13.5, lineHeight: 1.7 }}>
        Tướng học phương Đông chia khuôn mặt thành các vùng để luận. Dưới đây là những khái niệm
        nền tảng, dùng để đọc hiểu sách tướng — không phải để phán một con người.
      </p>

      <section>
        <h4 style={{ margin: '0 0 10px', fontSize: 14 }}>Tam đình — ba phần khuôn mặt</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 10 }}>
          {TAM_DINH.map((m) => (
            <Muc key={m.ten} {...m} />
          ))}
        </div>
      </section>

      <section>
        <h4 style={{ margin: '0 0 10px', fontSize: 14 }}>Ngũ nhạc — năm gò chính</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 10 }}>
          {NGU_NHAC.map((m) => (
            <Muc key={m.ten} {...m} />
          ))}
        </div>
      </section>

      <section>
        <h4 style={{ margin: '0 0 10px', fontSize: 14 }}>Ngũ quan — năm bộ phận luận chính</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 10 }}>
          {NGU_QUAN.map((m) => (
            <Muc key={m.ten} {...m} />
          ))}
        </div>
      </section>

      <section>
        <h4 style={{ margin: '0 0 10px', fontSize: 14 }}>Tứ độc — bốn chỗ lộ thần khí</h4>
        <Card style={{ padding: 14 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 10 }}>
            {TU_DOC.map((m) => (
              <div key={m.ten}>
                <strong style={{ color: 'var(--cream)', fontSize: 13.5 }}>
                  {m.ten} <span style={{ color: 'var(--gold)', fontWeight: 400 }}>{m.han}</span>
                </strong>
                <p style={{ margin: '4px 0 0', color: 'var(--muted)', fontSize: 12.5 }}>{m.yNghia}</p>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <GhiChu>
        {LUU_Y_TUONG_SO.map((x) => (
          <span key={x} style={{ display: 'block' }}>
            • {x}
          </span>
        ))}
      </GhiChu>
    </div>
  );
}
