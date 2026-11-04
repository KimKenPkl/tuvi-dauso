import { useMemo, useState } from 'react';
import { vanHan, type LaSo } from '../lib/chart';

interface VanHanPanelProps {
  laSo: LaSo;
  onClose: () => void;
}

const NAM_HIEN_TAI = new Date().getFullYear();
const THANG_HIEN_TAI = new Date().getMonth() + 1;

const THANG_LIST = Array.from({ length: 12 }, (_, i) => ({
  so: i + 1,
  ten: `Tháng ${i + 1}`,
}));

const THANG_TOT: string[][] = [
  ['Lập kế hoạch mới', 'Học hỏi, trau dồi', 'Gặp gỡ, kết nối', 'Cầu an, tu bổ'],
  ['Tập trung công việc', 'Sắp xếp tài chính', 'Chăm sóc sức khỏe', 'Gia đình'],
  ['Khai triển dự án', 'Mở rộng quan hệ', 'Học kỹ năng mới', 'Dọn dẹp, chỉnh đốn'],
  ['Ổn định, củng cố', 'Chăm sóc gia đình', 'Rèn luyện bản thân', 'Tổng hợp hồ sơ'],
  ['Giao tiếp, đàm phán', 'Tìm kiếm cơ hội', 'Giải quyết tồn đọng', 'Sáng tạo'],
  ['Cân bằng cuộc sống', 'Giúp đỡ người khác', 'Rèn lòng kiên nhẫn', 'Nghỉ ngơi hợp lý'],
  ['Thu hoạch kết quả', 'Đánh giá lại kế hoạch', 'Tiết kiệm, tích lũy', 'Ghi nhận thành quả'],
  ['Tập trung nội lực', 'Ôn lại kinh nghiệm', 'Chăm sóc sức khỏe', 'Hạn chế mở rộng'],
  ['Mở rộng quan hệ', 'Tìm kiếm cơ hội', 'Học hỏi, cập nhật', 'Phát triển bản thân'],
  ['Ổn định tài chính', 'Củng cố nền móng', 'Gia đình', 'Kiểm tra lại hệ thống'],
  ['Tổng kết một năm', 'Ghi nhận thành quả', 'Biết ơn, sẻ chia', 'Lên kế hoạch cuối năm'],
  ['Nghỉ ngơi, điều chỉnh', 'Sum họp gia đình', 'Lên kế hoạch năm sau', 'Hạn chế mạo hiểm'],
];

const THANG_XAU: string[][] = [
  ['Quyết định vội vã', 'Tranh cãi không cần thiết', 'Cam kết dài hạn'],
  ['Chi tiêu phung phí', 'Mạo hiểm lớn', 'Kiện tụng'],
  ['Nghe theo lời dụ', 'Làm việc quá sức', 'Bỏ bê sức khỏe'],
  ['Thay đổi lớn đột ngột', 'Cãi vã, xung đột', 'Đầu cơ'],
  ['Ngại nói ra ý kiến', 'Trì hoãn việc quan trọng', 'Tin người vội'],
  ['Quá lý tưởng', 'Thiếu thực tế', 'Chi tiêu vượt khả năng'],
  ['So sánh với người khác', 'Nôn nóng muốn thành công', 'Đánh cược lớn'],
  ['Phô trương, khoe khoang', 'Chi tiêu hoang phí', 'Xao nhãng việc nhà'],
  ['Tin người quá mức', 'Mạo hiểm tài chính', 'Bị cuốn vào thị phi'],
  ['Thay đổi đột ngột', 'Quá bảo thủ', 'Ngại thay đổi'],
  ['Hối tiếc quá khứ', 'So sánh, ghen tị', 'Cố chấp'],
  ['Bắt đầu dự án lớn', 'Quá vội vã', 'Xao nhãng gia đình'],
];

export default function VanHanPanel({ laSo, onClose }: VanHanPanelProps) {
  const [cheDo, setCheDo] = useState<'nam' | 'thang'>('nam');
  const [namXem, setNamXem] = useState(NAM_HIEN_TAI);
  const [thangXem, setThangXem] = useState(THANG_HIEN_TAI);
  const [namBatDau, setNamBatDau] = useState(NAM_HIEN_TAI - 5);

  const vh = useMemo(() => vanHan(laSo, namXem), [laSo, namXem]);

  const namList = useMemo(() => {
    const list: number[] = [];
    for (let n = namBatDau; n <= namBatDau + 15; n++) list.push(n);
    return list;
  }, [namBatDau]);

  const tenCung = (index?: number) => laSo.cung.find((c) => c.index === index)?.ten ?? '—';

  const tot = THANG_TOT[thangXem - 1];
  const xau = THANG_XAU[thangXem - 1];

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
        <header className="modal-head">
          <div>
            <h2>Vận hạn theo năm & tháng</h2>
            <p>Theo dõi Đại hạn, Tiểu hạn, Lưu niên để nắm bắt xu hướng</p>
          </div>
          <button className="modal-close" onClick={onClose}>
            ✕
          </button>
        </header>

        <div className="vanhan-toolbar">
          <div className="seg">
            <button className={cheDo === 'nam' ? 'on' : ''} onClick={() => setCheDo('nam')}>
              Theo năm
            </button>
            <button className={cheDo === 'thang' ? 'on' : ''} onClick={() => setCheDo('thang')}>
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
            <div className="thang-picker">
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
              <select value={thangXem} onChange={(e) => setThangXem(Number(e.target.value))}>
                {THANG_LIST.map((t) => (
                  <option key={t.so} value={t.so}>
                    {t.ten}
                  </option>
                ))}
              </select>
              {thangXem === THANG_HIEN_TAI && namXem === NAM_HIEN_TAI && (
                <span className="current-badge">Tháng hiện tại</span>
              )}
            </div>
          )}
        </div>

        <div className="vanhan-body">
          {cheDo === 'nam' && (
            <>
              <section className="vanhan-section">
                <h3>Vận hạn năm {namXem}</h3>
                <div className="vanhan-grid">
                  <div className="vanhan-card">
                    <span className="vanhan-label">Đại hạn (10 năm)</span>
                    <strong className="vanhan-value">
                      {vh.daiHan.can} {vh.daiHan.chi}
                    </strong>
                    <p className="vanhan-desc">
                      Cung {tenCung(vh.daiHan.index)} · Tuổi {vh.daiHan.tuoi[0]}–{vh.daiHan.tuoi[1]}
                    </p>
                  </div>
                  <div className="vanhan-card">
                    <span className="vanhan-label">Tiểu hạn (năm)</span>
                    <strong className="vanhan-value">{vh.tieuHan.tuoi} tuổi</strong>
                    <p className="vanhan-desc">Cung {tenCung(vh.tieuHan.index)}</p>
                  </div>
                  <div className="vanhan-card">
                    <span className="vanhan-label">Lưu niên</span>
                    <strong className="vanhan-value">
                      {vh.luuNien.can} {vh.luuNien.chi}
                    </strong>
                    <p className="vanhan-desc">
                      Cung {tenCung(vh.luuNien.index)} · Năm {vh.luuNien.nam}
                    </p>
                  </div>
                </div>
              </section>

              <section className="vanhan-section">
                <h3>Timeline vận hạn</h3>
                <p className="section-desc">Xem nhanh xu hướng qua các năm — nhấn để chọn năm xem</p>
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
                <h3>
                  Vận tháng {thangXem}/{namXem}
                </h3>
                <div className="vanhan-grid">
                  <div className="vanhan-card">
                    <span className="vanhan-label">Nền vận năm</span>
                    <strong className="vanhan-value">
                      {vh.daiHan.can} {vh.daiHan.chi}
                    </strong>
                    <p className="vanhan-desc">
                      Đại hạn · Cung {tenCung(vh.daiHan.index)}
                    </p>
                  </div>
                  <div className="vanhan-card">
                    <span className="vanhan-label">Lưu niên</span>
                    <strong className="vanhan-value">
                      {vh.luuNien.can} {vh.luuNien.chi}
                    </strong>
                    <p className="vanhan-desc">
                      Cung {tenCung(vh.luuNien.index)} · Năm {namXem}
                    </p>
                  </div>
                  <div className="vanhan-card">
                    <span className="vanhan-label">Tháng xem</span>
                    <strong className="vanhan-value">Tháng {thangXem}</strong>
                    <p className="vanhan-desc">Năm {namXem}</p>
                  </div>
                </div>
              </section>

              <section className="vanhan-section">
                <h3>Gợi ý vận tháng</h3>
                <div className="vanhan-advice">
                  <div className="advice-tot">
                    <h4>✓ Nên làm</h4>
                    <ul>
                      {tot.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="advice-xau">
                    <h4>✗ Nên tránh</h4>
                    <ul>
                      {xau.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <p className="section-note">
                  *Gợi ý dựa trên xu hướng vận hạn, chỉ mang tính tham khảo để chủ động hơn.
                </p>
              </section>

              <section className="vanhan-section">
                <h3>Chọn nhanh tháng khác</h3>
                <div className="thang-grid">
                  {THANG_LIST.map((t) => (
                    <button
                      key={t.so}
                      className={`thang-item ${t.so === thangXem ? 'active' : ''}`}
                      onClick={() => setThangXem(t.so)}
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
              <strong>Ghi chú:</strong> Thông tin vận hạn chỉ mang tính tham khảo xu hướng, giúp bạn
              nắm bắt thời cơ để chủ động hơn. Không dùng để đưa ra quyết định quan trọng một cách
              tuyệt đối.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
