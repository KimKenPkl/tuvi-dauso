/**
 * Khung chờ: ba vạch sáng chạy thay cho chữ "Đang tải…".
 * Dùng ở Suspense toàn cục và ở từng công cụ Phương Đông.
 */
export default function KhungCho({ dong = 3 }: { dong?: number }) {
  const rong = ['62%', '88%', '46%', '74%', '55%'];
  return (
    <div className="khung-cho" role="status" aria-live="polite" aria-label="Đang tải nội dung">
      {Array.from({ length: dong }, (_, i) => (
        <i key={i} style={{ width: rong[i % rong.length] }} />
      ))}
    </div>
  );
}
