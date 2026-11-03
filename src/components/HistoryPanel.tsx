import { useState } from 'react';
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
            <p className="drawer-sub">{ds.length} lá số · lưu trên máy này</p>
          </div>
          <button type="button" className="close" onClick={onClose} aria-label="Đóng">
            ✕
          </button>
        </header>

        <div className="drawer-body">
          {ds.length === 0 && (
            <p className="muted">
              Chưa có lá số nào. Bấm <b>Lưu lá số</b> ở trang lá số để cất lại, tiện mở nhanh cho
              người thân hoặc khách xem.
            </p>
          )}

          <ul className="history-list">
            {ds.map((ls) => (
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
