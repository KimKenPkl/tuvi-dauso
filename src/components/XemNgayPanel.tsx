import { useState } from 'react';
import { xemNgayTotXau } from '../lib/canChi';

interface XemNgayPanelProps {
  onClose: () => void;
}

const nhan = (dat: boolean, chu: string) => (
  <span
    style={{
      display: 'inline-block',
      padding: '3px 10px',
      borderRadius: 999,
      fontSize: 12,
      fontWeight: 600,
      letterSpacing: '0.02em',
      color: dat ? 'var(--green)' : 'var(--red)',
      background: dat ? 'var(--green-mo)' : 'var(--red-mo)',
      border: `1px solid ${dat ? 'var(--green-vien)' : 'var(--red-vien)'}`,
    }}
  >
    {chu}
  </span>
);

export default function XemNgayPanel({ onClose }: XemNgayPanelProps) {
  const [selectedDate, setSelectedDate] = useState(
    () => new Date().toISOString().split('T')[0],
  );
  const date = new Date(`${selectedDate}T00:00:00`);
  const hopLe = !Number.isNaN(date.getTime());
  const result = hopLe ? xemNgayTotXau(date) : null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
        <header className="modal-head">
          <div>
            <h2>Xem ngày tốt xấu</h2>
            <p>Can Chi, 12 Trực và giờ Hoàng Đạo theo lịch vạn niên</p>
          </div>
          <button className="modal-close" onClick={onClose} aria-label="Đóng">
            ✕
          </button>
        </header>

        <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 20 }}>
          <label style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <span style={{ color: 'var(--muted)', fontSize: 14 }}>Chọn ngày dương lịch</span>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              style={{
                padding: '10px 14px',
                borderRadius: 10,
                border: '1px solid var(--line)',
                background: 'var(--sheen-1)',
                color: 'var(--text)',
                fontSize: 15,
              }}
            />
          </label>

          {!result && (
            <p style={{ color: 'var(--red)', margin: 0 }}>Ngày không hợp lệ, vui lòng chọn lại.</p>
          )}

          {result && (
            <>
              <div
                style={{
                  padding: 20,
                  borderRadius: 12,
                  background: 'linear-gradient(180deg, var(--gold-mo), transparent)',
                  border: '1px solid var(--line-strong)',
                  textAlign: 'center',
                }}
              >
                <p style={{ margin: 0, color: 'var(--muted)', fontSize: 14 }}>
                  {result.duongLich} · Âm lịch {result.amLich}
                </p>
                <h3
                  style={{
                    margin: '8px 0',
                    fontSize: 30,
                    color: 'var(--gold)',
                    fontFamily: 'var(--font-display)',
                    letterSpacing: '0.02em',
                  }}
                >
                  {result.canChi}
                </h3>
                <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 10 }}>
                  {nhan(result.hoangDao, result.hoangDao ? 'Hoàng Đạo' : 'Hắc Đạo')}
                  <span
                    style={{
                      display: 'inline-block',
                      padding: '3px 10px',
                      borderRadius: 999,
                      fontSize: 12,
                      fontWeight: 600,
                      color: 'var(--gold-2)',
                      background: 'var(--gold-mo)',
                      border: '1px solid var(--line-strong)',
                    }}
                  >
                    Trực {result.truc}
                  </span>
                </div>
                <p style={{ margin: 0, color: 'var(--text)', lineHeight: 1.7 }}>{result.danhGia}</p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 12 }}>
                {[
                  { nhan: 'Ngày', gia: result.canChi, phu: 'Can Chi ngày' },
                  { nhan: 'Tháng', gia: result.canChiThang, phu: 'Can Chi tháng âm' },
                  { nhan: 'Năm', gia: result.canChiNam, phu: 'Can Chi năm âm' },
                ].map((o) => (
                  <div
                    key={o.nhan}
                    style={{
                      padding: '12px 14px',
                      borderRadius: 10,
                      background: 'var(--sheen-1)',
                      border: '1px solid var(--line)',
                      textAlign: 'center',
                    }}
                  >
                    <p style={{ margin: 0, color: 'var(--muted)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      {o.nhan}
                    </p>
                    <strong style={{ display: 'block', margin: '6px 0 2px', color: 'var(--cream)', fontSize: 16 }}>
                      {o.gia}
                    </strong>
                    <span style={{ color: 'var(--muted-2)', fontSize: 12 }}>{o.phu}</span>
                  </div>
                ))}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div
                  style={{
                    padding: 16,
                    borderRadius: 12,
                    background: 'var(--green-mo)',
                    border: '1px solid var(--green-vien)',
                  }}
                >
                  <h4 style={{ margin: '0 0 12px', color: 'var(--green)', fontSize: 15 }}>✓ Nên làm</h4>
                  <ul style={{ margin: 0, paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {result.tot.map((item) => (
                      <li key={item} style={{ color: 'var(--text)', fontSize: 14, lineHeight: 1.6 }}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div
                  style={{
                    padding: 16,
                    borderRadius: 12,
                    background: 'var(--red-mo)',
                    border: '1px solid var(--red-vien)',
                  }}
                >
                  <h4 style={{ margin: '0 0 12px', color: 'var(--red)', fontSize: 15 }}>✗ Nên tránh</h4>
                  <ul style={{ margin: 0, paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {result.xau.map((item) => (
                      <li key={item} style={{ color: 'var(--text)', fontSize: 14, lineHeight: 1.6 }}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <h4 style={{ margin: '0 0 4px', color: 'var(--text)', fontSize: 15 }}>
                  Giờ Hoàng Đạo ({result.gioHoangDao.length} giờ)
                </h4>
                <p style={{ margin: '0 0 12px', color: 'var(--muted)', fontSize: 13 }}>
                  Sáu giờ tốt trong ngày, tính theo vòng khởi Thanh Long.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 10 }}>
                  {result.gioHoangDao.map((g) => (
                    <div
                      key={g.gio}
                      style={{
                        padding: '10px 12px',
                        borderRadius: 10,
                        background: 'var(--gold-mo)',
                        border: '1px solid var(--line)',
                        textAlign: 'center',
                      }}
                    >
                      <strong style={{ color: 'var(--gold)', fontSize: 15 }}>Giờ {g.gio}</strong>
                      <p style={{ margin: '4px 0 2px', color: 'var(--cream)', fontSize: 12 }}>{g.gioChi}</p>
                      <span style={{ color: 'var(--muted)', fontSize: 12 }}>{g.than}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div
                style={{
                  padding: '14px 18px',
                  borderRadius: 10,
                  background: 'var(--sheen-1)',
                  border: '1px solid var(--line)',
                }}
              >
                <p style={{ margin: 0, color: 'var(--muted)', fontSize: 13, lineHeight: 1.7 }}>
                  <strong style={{ color: 'var(--text)' }}>Lưu ý:</strong> Tam Tai, Kim Lâu và giờ Hoàng Đạo ở đây
                  theo cách xem phổ thông trong dân gian, chỉ nên tham khảo cùng hoàn cảnh thực tế. Ngày tốt cho
                  việc lớn vẫn nên hỏi thêm người có kinh nghiệm.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
