import { useState, type CSSProperties } from 'react';
import { xemTuoiCuoiHoi, xemTuoiXayNha, type KiemTra } from '../lib/canChi';

interface XemTuoiPanelProps {
  onClose: () => void;
}

const NAM_HIEN_TAI = new Date().getFullYear();

const oNhap: React.CSSProperties = {
  padding: '10px 14px',
  borderRadius: 10,
  border: '1px solid var(--line)',
  background: 'var(--sheen-1)',
  color: 'var(--text)',
  fontSize: 15,
};

function DanhSachKiemTra({ items }: { items: KiemTra[] }) {
  return (
    <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
      {items.map((k) => (
        <li
          key={k.ten}
          style={{
            display: 'flex',
            gap: 12,
            alignItems: 'flex-start',
            padding: '12px 14px',
            borderRadius: 10,
            background: k.dat ? 'var(--green-mo)' : 'var(--red-mo)',
            border: `1px solid ${k.dat ? 'var(--green-vien)' : 'var(--red-vien)'}`,
          }}
        >
          <span
            aria-hidden
            style={{
              flex: '0 0 auto',
              width: 22,
              height: 22,
              borderRadius: '50%',
              display: 'grid',
              placeItems: 'center',
              fontSize: 13,
              fontWeight: 700,
              color: k.dat ? 'var(--green)' : 'var(--red)',
              background: k.dat ? 'var(--green-mo)' : 'var(--red-mo)',
            }}
          >
            {k.dat ? '✓' : '✗'}
          </span>
          <div style={{ minWidth: 0 }}>
            <strong style={{ display: 'block', color: 'var(--cream)', fontSize: 14, marginBottom: 2 }}>
              {k.ten}
            </strong>
            <span style={{ color: 'var(--muted)', fontSize: 13, lineHeight: 1.6 }}>{k.chiTiet}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}

function TheTomTat({
  nhan,
  tuoi,
  tuoiMu,
  canChiTuoi,
  canChiNam,
  ketLuan,
  lyDo,
}: {
  nhan: string;
  tuoi: number;
  tuoiMu?: number;
  canChiTuoi: string;
  canChiNam: string;
  ketLuan: string;
  lyDo: string;
}) {
  return (
    <div
      style={{
        padding: 20,
        borderRadius: 12,
        background: 'linear-gradient(180deg, var(--gold-mo), transparent)',
        border: '1px solid var(--line-strong)',
      }}
    >
      <p style={{ margin: 0, color: 'var(--muted)', fontSize: 13 }}>
        {nhan}: {tuoi} tuổi{tuoiMu ? ` · tuổi mụ ${tuoiMu}` : ''}
      </p>
      <p style={{ margin: '6px 0 10px', color: 'var(--cream)', fontSize: 15 }}>
        {canChiTuoi} <span style={{ color: 'var(--muted)' }}>xem năm</span> {canChiNam}
      </p>
      <h3
        style={{
          margin: '0 0 8px',
          fontSize: 22,
          color: 'var(--gold)',
          fontFamily: 'var(--font-display)',
          lineHeight: 1.35,
        }}
      >
        {ketLuan}
      </h3>
      <p style={{ margin: 0, color: 'var(--text)', lineHeight: 1.7, fontSize: 14 }}>{lyDo}</p>
    </div>
  );
}

function KhoiKhuyenNghi({ items }: { items: string[] }) {
  return (
    <div>
      <h4 style={{ margin: '0 0 10px', color: 'var(--text)', fontSize: 15 }}>Khuyến nghị</h4>
      <ul style={{ margin: 0, paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {items.map((k) => (
          <li key={k} style={{ color: 'var(--muted)', lineHeight: 1.65, fontSize: 14 }}>
            {k}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function XemTuoiPanel({ onClose }: XemTuoiPanelProps) {
  const [tab, setTab] = useState<'nha' | 'cuoi'>('nha');
  const [namSinh, setNamSinh] = useState(1995);
  const [namSinhNam, setNamSinhNam] = useState(1995);
  const [namSinhNu, setNamSinhNu] = useState(1997);
  const [namXem, setNamXem] = useState(NAM_HIEN_TAI);

  const ketQuaNha = xemTuoiXayNha(namSinh, namXem);
  const ketQuaCuoi = xemTuoiCuoiHoi(namSinhNam, namSinhNu, namXem);

  const nutTab = (khoa: 'nha' | 'cuoi', chu: string) => (
    <button
      onClick={() => setTab(khoa)}
      aria-pressed={tab === khoa}
      style={{
        flex: 1,
        padding: 10,
        borderRadius: 8,
        border: 'none',
        background:
          tab === khoa ? 'linear-gradient(90deg, var(--gold-nen-1), var(--gold-nen-2))' : 'transparent',
        color: tab === khoa ? '#0b0e17' : 'var(--text)',
        fontWeight: tab === khoa ? 600 : 400,
        cursor: 'pointer',
        fontFamily: 'inherit',
        fontSize: 14,
      }}
    >
      {chu}
    </button>
  );

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-panel" style={{ maxWidth: 720 }} onClick={(e) => e.stopPropagation()}>
        <header className="modal-head">
          <div>
            <h2>Xem tuổi xây nhà &amp; cưới hỏi</h2>
            <p>Tam Tai · Kim Lâu · Hoang Ốc và quan hệ tuổi</p>
          </div>
          <button className="modal-close" onClick={onClose} aria-label="Đóng">
            ✕
          </button>
        </header>

        <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 22 }}>
          <div
            style={{
              display: 'flex',
              gap: 8,
              padding: 4,
              background: 'var(--sheen-1)',
              borderRadius: 10,
              border: '1px solid var(--line)',
            }}
          >
            {nutTab('nha', 'Xây nhà / Động thổ')}
            {nutTab('cuoi', 'Cưới hỏi')}
          </div>

          {tab === 'nha' && (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <label style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <span style={{ color: 'var(--muted)', fontSize: 14 }}>Năm sinh gia chủ</span>
                  <input
                    type="number"
                    value={namSinh}
                    min={1900}
                    max={2100}
                    onChange={(e) => setNamSinh(Number(e.target.value))}
                    style={oNhap}
                  />
                </label>
                <label style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <span style={{ color: 'var(--muted)', fontSize: 14 }}>Năm xem</span>
                  <input
                    type="number"
                    value={namXem}
                    min={1900}
                    max={2100}
                    onChange={(e) => setNamXem(Number(e.target.value))}
                    style={oNhap}
                  />
                </label>
              </div>

              <TheTomTat
                nhan={`Năm ${namXem}`}
                tuoi={ketQuaNha.tuoi}
                tuoiMu={ketQuaNha.tuoiMu}
                canChiTuoi={ketQuaNha.canChiTuoi}
                canChiNam={ketQuaNha.canChiNam}
                ketLuan={ketQuaNha.ketLuan}
                lyDo={ketQuaNha.lyDo}
              />

              <div>
                <h4 style={{ margin: '0 0 10px', color: 'var(--text)', fontSize: 15 }}>Ba cửa kiểm tra</h4>
                <DanhSachKiemTra items={ketQuaNha.kiemTra} />
              </div>

              <KhoiKhuyenNghi items={ketQuaNha.khuyenNghi} />
            </>
          )}

          {tab === 'cuoi' && (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 14 }}>
                <label style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <span style={{ color: 'var(--muted)', fontSize: 14 }}>Năm sinh nam</span>
                  <input
                    type="number"
                    value={namSinhNam}
                    min={1900}
                    max={2100}
                    onChange={(e) => setNamSinhNam(Number(e.target.value))}
                    style={oNhap}
                  />
                </label>
                <label style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <span style={{ color: 'var(--muted)', fontSize: 14 }}>Năm sinh nữ</span>
                  <input
                    type="number"
                    value={namSinhNu}
                    min={1900}
                    max={2100}
                    onChange={(e) => setNamSinhNu(Number(e.target.value))}
                    style={oNhap}
                  />
                </label>
                <label style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <span style={{ color: 'var(--muted)', fontSize: 14 }}>Năm xem</span>
                  <input
                    type="number"
                    value={namXem}
                    min={1900}
                    max={2100}
                    onChange={(e) => setNamXem(Number(e.target.value))}
                    style={oNhap}
                  />
                </label>
              </div>

              <TheTomTat
                nhan={`Năm ${namXem} · nam ${ketQuaCuoi.tuoiNam} tuổi, nữ ${ketQuaCuoi.tuoiNu} tuổi`}
                tuoi={ketQuaCuoi.tuoiNam}
                canChiTuoi={ketQuaCuoi.canChiNamNguoi}
                canChiNam={ketQuaCuoi.canChiNamNguoi}
                ketLuan={ketQuaCuoi.ketLuan}
                lyDo={ketQuaCuoi.lyDo}
              />

              <div
                style={{
                  padding: '12px 16px',
                  borderRadius: 10,
                  background: 'var(--sheen-1)',
                  border: '1px solid var(--line)',
                }}
              >
                <p style={{ margin: 0, color: 'var(--muted)', fontSize: 13 }}>Quan hệ hai tuổi</p>
                <p style={{ margin: '4px 0 0', color: 'var(--cream)', fontSize: 15, lineHeight: 1.6 }}>
                  {ketQuaCuoi.canChiNamNguoi} &amp; {ketQuaCuoi.canChiNuNguoi} — {ketQuaCuoi.quanHe}
                </p>
              </div>

              <div>
                <h4 style={{ margin: '0 0 10px', color: 'var(--text)', fontSize: 15 }}>Ba cửa kiểm tra</h4>
                <DanhSachKiemTra items={ketQuaCuoi.kiemTra} />
              </div>

              <KhoiKhuyenNghi items={ketQuaCuoi.khuyenNghi} />
            </>
          )}

          <div
            style={{
              padding: '14px 18px',
              borderRadius: 10,
              background: 'var(--sheen-1)',
              border: '1px solid var(--line)',
            }}
          >
            <p style={{ margin: 0, color: 'var(--muted)', fontSize: 13, lineHeight: 1.7 }}>
              <strong style={{ color: 'var(--text)' }}>Lưu ý:</strong> {tab === 'nha' ? ketQuaNha.chuY : ketQuaCuoi.chuY}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
