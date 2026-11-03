import { useState } from 'react';
import { xemNgayTotXau } from '../lib/canChi';

interface XemNgayPanelProps {
  onClose: () => void;
}

export default function XemNgayPanel({ onClose }: XemNgayPanelProps) {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const date = new Date(selectedDate + 'T00:00:00');
  const result = xemNgayTotXau(date);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
        <header className="modal-head">
          <div>
            <h2>Xem ngày tốt xấu</h2>
            <p>Theo Can Chi - Tham khảo nhanh hàng ngày</p>
          </div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </header>

        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ color: 'var(--muted)', fontSize: '14px' }}>Chọn ngày</span>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                style={{
                  padding: '10px 14px',
                  borderRadius: '10px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'rgba(255,255,255,0.02)',
                  color: 'var(--text)',
                  fontSize: '15px',
                }}
              />
            </label>
          </div>

          <div style={{ padding: '20px', borderRadius: '12px', background: 'linear-gradient(180deg, rgba(201,162,77,0.15), transparent)', border: '1px solid rgba(201,162,77,0.4)', textAlign: 'center' }}>
            <p style={{ margin: 0, color: 'var(--muted)', fontSize: '14px' }}>Ngày {date.toLocaleDateString('vi-VN')}</p>
            <h3 style={{ margin: '8px 0', fontSize: '28px', color: 'var(--gold)', fontFamily: 'var(--serif)' }}>{result.canChi}</h3>
            <p style={{ margin: 0, color: 'var(--text)', fontWeight: 600 }}>Đánh giá: {result.danhGia}</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{ padding: '16px', borderRadius: '12px', background: 'rgba(46, 204, 113, 0.08)', border: '1px solid rgba(46, 204, 113, 0.4)' }}>
              <h4 style={{ margin: '0 0 12px 0', color: '#2ecc71' }}>✓ Nên làm</h4>
              <ul style={{ margin: 0, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {result.tot.map((item, i) => (
                  <li key={i} style={{ color: 'var(--text)', fontSize: '14px' }}>{item}</li>
                ))}
              </ul>
            </div>
            <div style={{ padding: '16px', borderRadius: '12px', background: 'rgba(231, 76, 60, 0.08)', border: '1px solid rgba(231, 76, 60, 0.4)' }}>
              <h4 style={{ margin: '0 0 12px 0', color: '#e74c3c' }}>✗ Nên tránh</h4>
              <ul style={{ margin: 0, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {result.xau.map((item, i) => (
                  <li key={i} style={{ color: 'var(--text)', fontSize: '14px' }}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h4 style={{ margin: '0 0 12px 0', color: 'var(--text)' }}>Giờ Hoàng Đạo</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '10px' }}>
              {result.gioHoangDao.map((g, i) => (
                <div key={i} style={{ padding: '10px 14px', borderRadius: '10px', background: 'rgba(201,162,77,0.12)', border: '1px solid rgba(201,162,77,0.4)', textAlign: 'center' }}>
                  <strong style={{ color: 'var(--gold)' }}>{g.gio}</strong>
                  <p style={{ margin: '4px 0 0 0', color: 'var(--muted)', fontSize: '12px' }}>{g.gioChi}</p>
                </div>
              ))}
            </div>
          </div>

          <div style={{ padding: '14px 18px', borderRadius: '10px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <p style={{ margin: 0, color: 'var(--muted)', fontSize: '13px', lineHeight: 1.6 }}>
              <strong style={{ color: 'var(--text)' }}>Lưu ý:</strong> Chỉ mang tính tham khảo theo quan niệm dân gian. Quyết định quan trọng vẫn cần cân nhắc thực tế.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
