import { useMemo, useState } from 'react';
import { GIO_SINH } from '../lib/dict';
import type { BirthInput } from '../lib/chart';
import {
  danhSachLaSo,
  datTen,
  laSoSangInput,
  xoaLaSo,
  type LaSoDaLuu,
} from '../lib/storage';

interface Props {
  onLoad: (input: BirthInput) => void;
  onClose: () => void;
}

/** Bỏ dấu tiếng Việt để tìm kiếm không phân biệt dấu. */
function boDau(s: string): string {
  return s
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase();
}

function moTa(ls: LaSoDaLuu): string {
  const [y, m, d] = ls.ngay.split('-');
  const gio = GIO_SINH[ls.gio]?.ten ?? '';
  const lich = ls.lich === 'am' ? 'âm lịch' : 'dương lịch';
  return `${d}/${m}/${y} · ${gio} · ${lich}`;
}

export default function HistoryPanel({ onLoad, onClose }: Props) {
  const [ds, setDs] = useState<LaSoDaLuu[]>(() => danhSachLaSo());
  const [suaId, setSuaId] = useState<string | null>(null);
  const [nhanMoi, setNhanMoi] = useState('');
  const [tuKhoa, setTuKhoa] = useState('');

  const dsLoc = useMemo(() => {
    const q = boDau(tuKhoa.trim());
    if (!q) return ds;
    return ds.filter((ls) => {
      const noiDung = boDau(
        [ls.nhan, ls.ten, ls.ngay, ls.gioiTinh, ls.lich === 'am' ? 'am lich' : 'duong lich']
          .filter(Boolean)
          .join(' '),
      );
      return noiDung.includes(q);
    });
  }, [ds, tuKhoa]);

  function xoa(id: string) {
    xoaLaSo(id);
    setDs(danhSachLaSo());
  }

  function doiTen(id: string) {
    datTen(id, nhanMoi.trim());
    setSuaId(null);
    setNhanMoi('');
    setDs(danhSachLaSo());
  }

  return (
    <div className="drawer-backdrop" onClick={onClose} role="presentation">
      <aside className="drawer" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <header className="drawer-head">
          <div>
            <h3>Lá số đã lưu</h3>
            <p className="drawer-sub">
              {ds.length} lá số · lưu trên máy này
              {tuKhoa.trim() ? ` · ${dsLoc.length} khớp` : ''}
            </p>
          </div>
          <button type="button" className="close" onClick={onClose} aria-label="Đóng">
            ✕
          </button>
        </header>

        <div className="drawer-body">
          {ds.length > 0 && (
            <div className="history-search">
              <input
                type="search"
                value={tuKhoa}
                placeholder="Tìm theo tên, nhãn hoặc ngày sinh…"
                onChange={(e) => setTuKhoa(e.target.value)}
                aria-label="Tìm kiếm lá số đã lưu"
              />
            </div>
          )}

          {ds.length === 0 && (
            <p className="muted">
              Chưa có lá số nào. Bấm <b>Lưu lá số</b> ở trang lá số để cất lại, tiện mở nhanh cho
              người thân hoặc khách xem.
            </p>
          )}

          {ds.length > 0 && dsLoc.length === 0 && (
            <p className="history-empty">Không tìm thấy lá số nào khớp “{tuKhoa.trim()}”.</p>
          )}

          <ul className="history-list">
            {dsLoc.map((ls) => (
              <li key={ls.id} className="history-item">
                <div className="history-main">
                  <strong>{ls.nhan || ls.ten || 'Không tên'}</strong>
                  <span className="history-sub">
                    {ls.ten && ls.nhan ? `${ls.ten} · ` : ''}
                    {ls.gioiTinh} · {moTa(ls)}
                  </span>
                </div>

                <div className="history-actions">
                  <button
                    type="button"
                    className="mini"
                    onClick={() => {
                      onLoad(laSoSangInput(ls));
                      onClose();
                    }}
                  >
                    Mở
                  </button>
                  <button
                    type="button"
                    className="mini"
                    onClick={() => {
                      setSuaId(ls.id);
                      setNhanMoi(ls.nhan ?? '');
                    }}
                  >
                    Đổi tên
                  </button>
                  <button type="button" className="mini danger" onClick={() => xoa(ls.id)}>
                    Xoá
                  </button>
                </div>

                {suaId === ls.id && (
                  <div className="history-rename">
                    <input
                      autoFocus
                      value={nhanMoi}
                      placeholder="Ví dụ: Mẹ, Khách A…"
                      onChange={(e) => setNhanMoi(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') doiTen(ls.id);
                        if (e.key === 'Escape') setSuaId(null);
                      }}
                    />
                    <button type="button" className="mini" onClick={() => doiTen(ls.id)}>
                      Lưu
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
}
