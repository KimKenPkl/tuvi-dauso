import { useEffect, useRef, useState } from 'react';
import { docGhiChu, luuGhiChu } from '../lib/storage';

interface Props {
  /** Khoá định danh lá số — dùng idLaSo(input) */
  id: string;
}

/**
 * Ghi chú riêng cho từng lá số. Lưu vào localStorage, tự lưu sau khi ngừng gõ.
 * Dùng cho người dạy / người nghiên cứu: ghi lại quan sát qua nhiều lần xem.
 */
export default function NoteBox({ id }: Props) {
  const [noiDung, setNoiDung] = useState(() => docGhiChu(id));
  const [trangThai, setTrangThai] = useState<'nghi' | 'dang-luu' | 'da-luu'>('nghi');
  const hen = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Đổi lá số thì nạp lại ghi chú của lá số đó
  useEffect(() => {
    setNoiDung(docGhiChu(id));
    setTrangThai('nghi');
  }, [id]);

  function thayDoi(v: string) {
    setNoiDung(v);
    setTrangThai('dang-luu');
    if (hen.current) clearTimeout(hen.current);
    hen.current = setTimeout(() => {
      luuGhiChu(id, v);
      setTrangThai('da-luu');
    }, 500);
  }

  // Lưu nốt khi rời trang
  useEffect(() => {
    return () => {
      if (hen.current) clearTimeout(hen.current);
    };
  }, []);

  return (
    <section className="note-box">
      <header className="note-head">
        <h3>Ghi chú của bạn</h3>
        <span className="note-status">
          {trangThai === 'dang-luu' ? 'đang lưu…' : trangThai === 'da-luu' ? 'đã lưu trên máy' : ''}
        </span>
      </header>
      <textarea
        value={noiDung}
        onChange={(e) => thayDoi(e.target.value)}
        placeholder={
          'Ghi lại điều bạn quan sát được qua thời gian — ví dụ:\n' +
          '· 2026: đổi việc, đúng vào đại hạn cung Quan Lộc.\n' +
          '· Tính cách thực tế khác lá số ở điểm nào?\n' +
          '· Lần xem sau cần kiểm chứng điều gì?'
        }
        rows={6}
        spellCheck={false}
      />
      <p className="note-hint">
        Ghi chú chỉ nằm trong trình duyệt này, không gửi lên máy chủ. Xoá dữ liệu trình duyệt sẽ mất
        ghi chú.
      </p>
    </section>
  );
}
