import { useMemo, useState } from 'react';
import { vanHan, type LaSo } from '../lib/chart';

interface VanHanPanelProps {
  laSo: LaSo;
  onClose: () => void;
}

const NAM_HIEN_TAI = new Date().getFullYear();

export default function VanHanPanel({ laSo, onClose }: VanHanPanelProps) {
  const [namXem, setNamXem] = useState(NAM_HIEN_TAI);
  const [namBatDau, setNamBatDau] = useState(NAM_HIEN_TAI - 5);
  
  const vh = useMemo(() => vanHan(laSo, namXem), [laSo, namXem]);
  
  const namList = useMemo(() => {
    const list = [];
    for (let n = namBatDau; n <= namBatDau + 15; n++) {
      list.push(n);
    }
    return list;
  }, [namBatDau]);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-panel vanhan-panel" onClick={(e) => e.stopPropagation()}>
        <header className="modal-head">
          <div>
            <h2>Vận hạn theo năm</h2>
            <p>Theo dõi Đại hạn, Tiểu hạn, Lưu niên để nắm bắt xu hướng tương lai</p>
          </div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </header>

        <div className="vanhan-toolbar">
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
          <button className="btn-ghost" onClick={() => setNamXem(NAM_HIEN_TAI)}>
            Năm hiện tại
          </button>
        </div>

        <div className="vanhan-content">
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
