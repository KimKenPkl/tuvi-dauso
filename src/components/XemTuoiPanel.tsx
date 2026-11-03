import { useState } from 'react';
import { xemTuoiXayNha, xemTuoiCuoiHoi } from '../lib/canChi';

interface XemTuoiPanelProps {
  onClose: () => void;
}

const NAM_HIEN_TAI = new Date().getFullYear();

export default function XemTuoiPanel({ onClose }: XemTuoiPanelProps) {
  const [tab, setTab] = useState<'nha' | 'cuoi'>('nha');
  const [namSinh, setNamSinh] = useState(1995);
  const [namSinhNam, setNamSinhNam] = useState(1995);
  const [namSinhNu, setNamSinhNu] = useState(1997);
  const [namXem, setNamXem] = useState(NAM_HIEN_TAI);

  const ketQuaNha = xemTuoiXayNha(namSinh, namXem);
  const ketQuaCuoi = xemTuoiCuoiHoi(namSinhNam, namSinhNu, namXem);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-panel" style={{ maxWidth: 700 }} onClick={(e) => e.stopPropagation()}>
        <header className="modal-head">
          <div>
            <h2>Xem tuổi xây nhà & cưới hỏi</h2>
            <p>Tham khảo xu hướng theo tuổi và năm xem</p>
          </div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </header>

        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ display: 'flex', gap: '8px', padding: '4px', background: 'rgba(255,255,255,0.02)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
            <button
              onClick={() => setTab('nha')}
              style={{
                flex: 1,
                padding: '10px',
                borderRadius: '8px',
                border: 'none',
                background: tab === 'nha' ? 'linear-gradient(90deg, rgba(201,162,77,0.9), rgba(201,162,77,0.7))' : 'transparent',
                color: tab === 'nha' ? '#0b0e17' : 'var(--text)',
                fontWeight: tab === 'nha' ? 600 : 400,
                cursor: 'pointer',
              }}
            >
              Xây nhà / Động thổ
            </button>
            <button
              onClick={() => setTab('cuoi')}
              style={{
                flex: 1,
                padding: '10px',
                borderRadius: '8px',
                border: 'none',
                background: tab === 'cuoi' ? 'linear-gradient(90deg, rgba(201,162,77,0.9), rgba(201,162,77,0.7))' : 'transparent',
                color: tab === 'cuoi' ? '#0b0e17' : 'var(--text)',
                fontWeight: tab === 'cuoi' ? 600 : 400,
                cursor: 'pointer',
              }}
            >
              Cưới hỏi
            </button>
          </div>

          {tab === 'nha' && (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <label style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <span style={{ color: 'var(--muted)', fontSize: '14px' }}>Năm sinh gia chủ</span>
                  <input
                    type="number"
                    value={namSinh}
                    min={1900}
                    max={2100}
                    onChange={(e) => setNamSinh(Number(e.target.value))}
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
                <label style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <span style={{ color: 'var(--muted)', fontSize: '14px' }}>Năm xem</span>
                  <input
                    type="number"
                    value={namXem}
                    min={1900}
                    max={2100}
                    onChange={(e) => setNamXem(Number(e.target.value))}
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

              <div style={{ padding: '24px', borderRadius: '12px', background: 'linear-gradient(180deg, rgba(201,162,77,0.15), transparent)', border: '1px solid rgba(201,162,77,0.4)', textAlign: 'center' }}>
                <p style={{ margin: 0, color: 'var(--muted)', fontSize: '14px' }}>Tuổi năm {namXem}: {ketQuaNha.tuoi}</p>
                <h3 style={{ margin: '10px 0', fontSize: '24px', color: 'var(--gold)', fontFamily: 'var(--serif)' }}>{ketQuaNha.ketLuan}</h3>
                <p style={{ margin: 0, color: 'var(--text)', lineHeight: 1.7 }}>{ketQuaNha.lyDo}</p>
              </div>

              <div>
                <h4 style={{ margin: '0 0 12px 0', color: 'var(--text)' }}>Khuyến nghị</h4>
                <ul style={{ margin: 0, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {ketQuaNha.khuyenNghi.map((k, i) => (
                    <li key={i} style={{ color: 'var(--muted)', lineHeight: 1.6 }}>{k}</li>
                  ))}
                </ul>
              </div>
            </>
          )}

          {tab === 'cuoi' && (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                <label style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <span style={{ color: 'var(--muted)', fontSize: '14px' }}>Năm sinh Nam</span>
                  <input
                    type="number"
                    value={namSinhNam}
                    min={1900}
                    max={2100}
                    onChange={(e) => setNamSinhNam(Number(e.target.value))}
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
                <label style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <span style={{ color: 'var(--muted)', fontSize: '14px' }}>Năm sinh Nữ</span>
                  <input
                    type="number"
                    value={namSinhNu}
                    min={1900}
                    max={2100}
                    onChange={(e) => setNamSinhNu(Number(e.target.value))}
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
                <label style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <span style={{ color: 'var(--muted)', fontSize: '14px' }}>Năm xem</span>
                  <input
                    type="number"
                    value={namXem}
                    min={1900}
                    max={2100}
                    onChange={(e) => setNamXem(Number(e.target.value))}
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

              <div style={{ padding: '24px', borderRadius: '12px', background: 'linear-gradient(180deg, rgba(201,162,77,0.15), transparent)', border: '1px solid rgba(201,162,77,0.4)', textAlign: 'center' }}>
                <p style={{ margin: 0, color: 'var(--muted)', fontSize: '14px' }}>Tuổi Nam {ketQuaCuoi.tuoiNam} - Tuổi Nữ {ketQuaCuoi.tuoiNu}</p>
                <h3 style={{ margin: '10px 0', fontSize: '24px', color: 'var(--gold)', fontFamily: 'var(--serif)' }}>{ketQuaCuoi.ketLuan}</h3>
                <p style={{ margin: 0, color: 'var(--text)', lineHeight: 1.7 }}>{ketQuaCuoi.lyDo}</p>
              </div>

              <div>
                <h4 style={{ margin: '0 0 12px 0', color: 'var(--text)' }}>Khuyến nghị</h4>
                <ul style={{ margin: 0, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {ketQuaCuoi.khuyenNghi.map((k, i) => (
                    <li key={i} style={{ color: 'var(--muted)', lineHeight: 1.6 }}>{k}</li>
                  ))}
                </ul>
              </div>
            </>
          )}

          <div style={{ padding: '14px 18px', borderRadius: '10px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <p style={{ margin: 0, color: 'var(--muted)', fontSize: '13px', lineHeight: 1.6 }}>
              <strong style={{ color: 'var(--text)' }}>Lưu ý:</strong> {tab === 'nha' ? ketQuaNha.chuY : ketQuaCuoi.chuY}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
