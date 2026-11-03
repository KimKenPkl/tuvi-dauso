import { useMemo, useState } from 'react';
import { vanHan, type LaSo } from '../lib/chart';

interface VanHanPanelProps {
  laSo: LaSo;
  onClose: () => void;
}

const NAM_HIEN_TAI = new Date().getFullYear();
const THANG_HIEN_TAI = new Date().getMonth() + 1;

const THANG_LIST = [
  { so: 1, ten: 'Tháng 1' },
  { so: 2, ten: 'Tháng 2' },
  { so: 3, ten: 'Tháng 3' },
  { so: 4, ten: 'Tháng 4' },
  { so: 5, ten: 'Tháng 5' },
  { so: 6, ten: 'Tháng 6' },
  { so: 7, ten: 'Tháng 7' },
  { so: 8, ten: 'Tháng 8' },
  { so: 9, ten: 'Tháng 9' },
  { so: 10, ten: 'Tháng 10' },
  { so: 11, ten: 'Tháng 11' },
  { so: 12, ten: 'Tháng 12' },
];

export default function VanHanPanel({ laSo, onClose }: VanHanPanelProps) {
  const [cheDo, setCheDo] = useState<'nam' | 'thang'>('nam');
  const [namXem, setNamXem] = useState(NAM_HIEN_TAI);
  const [thangXem, setThangXem] = useState(THANG_HIEN_TAI);
  const [namBatDau, setNamBatDau] = useState(NAM_HIEN_TAI - 5);
  
  const vh = useMemo(() => vanHan(laSo, namXem), [laSo, namXem]);
  
  const namList = useMemo(() => {
    const list = [];
    for (let n = namBatDau; n <= namBatDau + 15; n++) {
      list.push(n);
    }
    return list;
  }, [namBatDau]);

  const thangAdvice = useMemo(() => {
    const advice = [
      { tot: ['Lập kế hoạch', 'Học hỏi, trau dồi', 'Gặp gỡ quan hệ'], xau: ['Quyết định vội vã', 'Tranh cãi không cần thiết'] },
      { tot: ['Tập trung công việc', 'Sắp xếp tài chính', 'Chăm sóc sức khỏe'], xau: ['Chi tiêu phung phí', 'Mạo hiểm lớn'] },
      { tot: ['Khai triển dự án', 'Mở rộng quan hệ', 'Học hỏi mới'], xau: ['Nghe theo lời dụ', 'Làm việc quá sức'] },
      { tot: ['Ổn định, củng cố', 'Chăm sóc gia đình', 'Rèn luyện bản thân'], xau: ['Thay đổi lớn', 'Cãi vã'] },
      { tot: ['Giao tiếp tốt', 'Tìm cơ hội', 'Giải quyết tồn đọng'], xau: ['Ngại nói ra', 'Trì hoãn'] },
      { tot: ['Cân bằng cuộc sống', 'Giúp đỡ người khác', 'Rèn lòng kiên nhẫn'], xau: ['Quá lý tưởng', 'Thiếu thực tế'] },
      { tot: ['Thu hoạch kết quả', 'Đánh giá lại kế hoạch', 'Tiết kiệm'], xau: ['So sánh với người khác', 'Nôn nóng'] },
      { tot: ['Tập trung nội lực', 'Ôn lại kinh nghiệm', 'Chăm sóc sức khỏe'], xau: ['Phô trương', 'Chi tiêu hoang phí'] },
      { tot: ['Mở rộng quan hệ', 'Tìm kiếm cơ hội', 'Học hỏi'], xau: ['Tin người vội', 'Mạo hiểm'] },
      { tot: ['Ổn định tài chính', 'Củng cố nền móng', 'Gia đình'], xau: ['Thay đổi đột ngột', 'Quá bảo thủ'] },
      { tot: ['Tổng kết năm', 'Ghi nhận thành quả', 'Biết ơn'], xau: ['Hối tiếc quá khứ', 'So sánh'] },
      { tot: ['Nghỉ ngơi điều chỉnh', 'Lên kế hoạch năm sau', 'Sum họp gia đình'], xau: ['Bắt đầu dự án lớn', 'Quá vội vã'] },
    ];
    return advice[thangXem - 1];
  }, [thangXem]);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-panel vanhan-panel" onClick={(e) => e.stopPropagation()}>
        <header className="modal-head">
          <div>
            <h2>Vận hạn theo năm & tháng</h2>
            <p>Theo dõi Đại hạn, Tiểu hạn, Lưu niên để nắm bắt xu hướng</p>
          </div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </header>

        <div className="vanhan-toolbar" style={{ justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: '8px', padding: '4px', background: 'rgba(255,255,255,0.02)', borderRadius: '10px' }}>
            <button
              onClick={() => setCheDo('nam')}
              style={{
                padding: '8px 18px',
                borderRadius: '8px',
                border: 'none',
                background: cheDo === 'nam' ? 'linear-gradient(90deg, rgba(201,162,77,0.9), rgba(201,162,77,0.7))' : 'transparent',
                color: cheDo === 'nam' ? '#0b0e17' : 'var(--text)',
                fontWeight: cheDo === 'nam' ? 600 : 400,
                cursor: 'pointer',
              }}
            >
              Theo năm
            </button>
            <button
              onClick={() => setCheDo('thang')}
              style={{
                padding: '8px 18px',
                borderRadius: '8px',
                border: 'none',
                background: cheDo === 'thang' ? 'linear-gradient(90deg, rgba(201,162,77,0.9), rgba(201,162,77,0.7))' : 'transparent',
                color: cheDo === 'thang' ? '#0b0e17' : 'var(--text)',
                fontWeight: cheDo === 'thang' ? 600 : 400,
                cursor: 'pointer',
              }}
            >
              Theo tháng
            </button>
          </div>
          {cheDo === 'nam' && (
            <label className="nam-xem">
              <span>Xem năm</span>
              <input
                type="number"
                value={namXem}
                min={1900}
                max={2100}
                onChange={(e) => setNamXem(Number(e.target.value) || NAM_HIEN_TAI)}
              />
            </label>
          )}
          {cheDo === 'thang' && (
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <label className="nam-xem">
                <span>Năm</span>
                <input
                  type="number"
                  value={namXem}
                  min={1900}
                  max={2100}
                  onChange={(e) => setNamXem(Number(e.target.value) || NAM_HIEN_TAI)}
                />
              </label>
              <select
                value={thangXem}
                onChange={(e) => setThangXem(Number(e.target.value))}
                style={{
                  padding: '8px 14px',
                  borderRadius: '10px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'rgba(255,255,255,0.02)',
                  color: 'var(--text)',
                }}
              >
                {THANG_LIST.map(t => <option key={t.so} value={t.so}>{t.ten}</option>)}
              </select>
              {thangXem === THANG_HIEN_TAI && namXem === NAM_HIEN_TAI && (
                <span style={{ padding: '6px 12px', borderRadius: '999px', background: 'rgba(201,162,77,0.15)', color: 'var(--gold)', fontSize: '12px' }}>Tháng hiện tại</span>
              )}
            </div>
          )}
        </div>

        <div className="vanhan-content">
          {cheDo === 'nam' && (
            <>
              <section className="vanhan-section">
                <h3>Vận hạn năm {namXem}</h3>
                {vh && (
                  <div className="vanhan-grid">
                    <div className="vanhan-card">
                      <span className="vanhan-label">Đại hạn</span>
                      <strong className="vanhan-value">{vh.daiHan?.ten || '-'}</strong>
                      <p className="vanhan-desc">Vận lớn 10 năm</p>
                    </div>
                    <div className="vanhan-card">
                      <span className="vanhan-label">Tiểu hạn</span>
                      <strong className="vanhan-value">{vh.tieuHan?.ten || '-'}</strong>
                      <p className="vanhan-desc">Vận hàng năm</p>
                    </div>
                    <div className="vanhan-card">
                      <span className="vanhan-label">Lưu niên</span>
                      <strong className="vanhan-value">{vh.luuNien?.ten || '-'}</strong>
                      <p className="vanhan-desc">Năm {namXem}</p>
                    </div>
                  </div>
                )}
              </section>

              <section className="vanhan-section">
                <h3>Timeline vận hạn</h3>
                <p className="section-desc">Xem nhanh xu hướng qua các năm</p>
                <div className="timeline">
                  {namList.map((n) => (
                    <button
                      key={n}
                      className={`timeline-item ${n === namXem ? 'active' : ''} ${n === NAM_HIEN_TAI ? 'current' : ''}`}
                      onClick={() => setNamXem(n)}
                    >
                      <span className="timeline-year">{n}</span>
                      {n === NAM_HIEN_TAI && <span className="timeline-badge">Hiện tại</span>}
                    </button>
                  ))}
                </div>
                <div className="timeline-nav">
                  <button className="btn-ghost" onClick={() => setNamBatDau(namBatDau - 5)}>
                    ← Trước
                  </button>
                  <button className="btn-ghost" onClick={() => setNamBatDau(namBatDau + 5)}>
                    Sau →
                  </button>
                </div>
              </section>
            </>
          )}

          {cheDo === 'thang' && (
            <>
              <section className="vanhan-section">
                <h3>Vận tháng {thangXem}/{namXem}</h3>
                {vh && (
                  <div className="vanhan-grid">
                    <div className="vanhan-card">
                      <span className="vanhan-label">Tiểu hạn năm</span>
                      <strong className="vanhan-value">{vh.tieuHan?.ten || '-'}</strong>
                      <p className="vanhan-desc">Nền vận năm {namXem}</p>
                    </div>
                    <div className="vanhan-card">
                      <span className="vanhan-label">Lưu niên</span>
                      <strong className="vanhan-value">{vh.luuNien?.ten || '-'}</strong>
                      <p className="vanhan-desc">Khí lưu năm</p>
                    </div>
                    <div className="vanhan-card">
                      <span className="vanhan-label">Tháng xem</span>
                      <strong className="vanhan-value">Tháng {thangXem}</strong>
                      <p className="vanhan-desc">{namXem}</p>
                    </div>
                  </div>
                )}
              </section>

              <section className="vanhan-section">
                <h3>Gợi ý vận tháng</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div style={{ padding: '18px', borderRadius: '12px', background: 'rgba(46, 204, 113, 0.08)', border: '1px solid rgba(46, 204, 113, 0.4)' }}>
                    <h4 style={{ margin: '0 0 12px 0', color: '#2ecc71' }}>✓ Nên làm</h4>
                    <ul style={{ margin: 0, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {thangAdvice.tot.map((item, i) => <li key={i} style={{ color: 'var(--text)', fontSize: '14px' }}>{item}</li>)}
                    </ul>
                  </div>
                  <div style={{ padding: '18px', borderRadius: '12px', background: 'rgba(231, 76, 60, 0.08)', border: '1px solid rgba(231, 76, 60, 0.4)' }}>
                    <h4 style={{ margin: '0 0 12px 0', color: '#e74c3c' }}>✗ Nên tránh</h4>
                    <ul style={{ margin: 0, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {thangAdvice.xau.map((item, i) => <li key={i} style={{ color: 'var(--text)', fontSize: '14px' }}>{item}</li>)}
                    </ul>
                  </div>
                </div>
                <p style={{ margin: '14px 0 0 0', color: 'var(--muted)', fontSize: '13px' }}>
                  *Gợi ý dựa trên xu hướng vận hạn, chỉ mang tính tham khảo giúp chủ động hơn.
                </p>
              </section>

              <section className="vanhan-section">
                <h3>Chọn nhanh tháng khác</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(90px, 1fr))', gap: '10px' }}>
                  {THANG_LIST.map(t => (
                    <button
                      key={t.so}
                      onClick={() => setThangXem(t.so)}
                      style={{
                        padding: '10px',
                        borderRadius: '10px',
                        border: t.so === thangXem ? '1px solid rgba(201,162,77,0.8)' : '1px solid rgba(255,255,255,0.08)',
                        background: t.so === thangXem ? 'rgba(201,162,77,0.18)' : 'rgba(255,255,255,0.02)',
                        color: t.so === thangXem ? 'var(--gold)' : 'var(--text)',
                        cursor: 'pointer',
                        fontWeight: t.so === thangXem ? 600 : 400,
                      }}
                    >
                      {t.ten}
                    </button>
                  ))}
                </div>
              </section>
            </>
          )}

          <div className="vanhan-note">
            <p>
              <strong>Ghi chú:</strong> Thông tin vận hạn chỉ mang tính tham khảo xu hướng, giúp bạn nắm bắt thời cơ để chủ động hơn. Không dùng để đưa ra quyết định quan trọng một cách tuyệt đối.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
