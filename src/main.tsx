import { StrictMode, Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';
import { LienKet, khoiPhucDuong, useDuong } from './lib/router';

// GitHub Pages trả 404.html cho đường dẫn con; hàm này trả lại URL đẹp trước khi render.
khoiPhucDuong();

// Tách đôi bundle: trang Tử Vi kéo theo iztro (~780 kB), các trang Phương Đông thì không.
const App = lazy(() => import('./App'));
const PhuongDongApp = lazy(() => import('./pages/PhuongDongApp'));

function DangTai() {
  return (
    <div
      style={{
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--muted)',
        fontSize: 14,
        letterSpacing: '0.04em',
      }}
    >
      Đang tải…
    </div>
  );
}

function KhongTimThay() {
  return (
    <main className="site-main">
      <nav className="pd-crumb" aria-label="Đường dẫn">
        <LienKet to="/">Tử Vi Việt</LienKet>
        <span aria-hidden="true">/</span>
        <span aria-current="page">404</span>
      </nav>
      <header className="pd-head">
        <p className="eyebrow">404</p>
        <h1>Không tìm thấy trang</h1>
        <p className="pd-lead">
          Đường dẫn này không tồn tại, có thể do gõ sai hoặc trang đã đổi địa chỉ. Ông có thể quay
          về trang Tử Vi hoặc vào mục Phương Đông.
        </p>
      </header>
      <p className="pd-links">
        <LienKet to="/">Về trang Tử Vi</LienKet>
        <LienKet to="/phuong-dong">Mục Phương Đông</LienKet>
      </p>
    </main>
  );
}

function Tuyen() {
  const duong = useDuong();

  if (duong === '/' || duong === '') return <App />;
  if (duong === '/phuong-dong' || duong.startsWith('/phuong-dong/')) return <PhuongDongApp />;
  return <KhongTimThay />;
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense fallback={<DangTai />}>
      <Tuyen />
    </Suspense>
  </StrictMode>,
);
