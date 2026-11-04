import { useGiaoDien } from '../lib/giaoDien';

/**
 * Nút đổi nền sáng/tối, đặt cố định ở góc dưới bên phải.
 *
 * Để một chỗ duy nhất thay vì nhét vào từng header: trang chủ, hub Phương Đông
 * và trang 404 đều dùng chung, không phải sửa ba nơi mỗi lần thêm trang.
 */
export default function NutGiaoDien() {
  const { giaoDien, doi } = useGiaoDien();
  const sang = giaoDien === 'sang';

  return (
    <button
      type="button"
      className="nut-giao-dien"
      onClick={doi}
      aria-label={sang ? 'Chuyển sang nền tối' : 'Chuyển sang nền sáng'}
      title={sang ? 'Đang ở nền sáng — bấm để đổi sang nền tối' : 'Đang ở nền tối — bấm để đổi sang nền sáng'}
    >
      <span className="nut-giao-dien-icon" aria-hidden="true">
        {sang ? '☾' : '☀'}
      </span>
      <span className="nut-giao-dien-chu">{sang ? 'Nền tối' : 'Nền sáng'}</span>
    </button>
  );
}
