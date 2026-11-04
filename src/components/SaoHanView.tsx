import { useMemo, useState } from 'react';
import type { NguCanh } from '../lib/phien';
import { CUU_DIEU, LE_VAT, THOI_GIAN_CUNG, saoChieuMenh, taoVanKhan } from '../lib/saoHan';
import { amLichHomNay } from '../lib/amlich';
import { Card, Field, GhiChu, NutChon, Pill, inputStyle } from './dp-ui';

const MAU_TINH: Record<string, { tone: 'green' | 'red' | 'gold'; chu: string }> = {
  cat: { tone: 'green', chu: 'Cát' },
  hung: { tone: 'red', chu: 'Hung' },
  binh: { tone: 'gold', chu: 'Bình' },
};

export default function SaoHanView({ nguCanh }: { nguCanh?: NguCanh | null }) {
  const homNay = useMemo(() => amLichHomNay(), []);
  const namNay = new Date().getFullYear();

  const [namSinh, setNamSinh] = useState(nguCanh?.nam ?? 1990);
  const [gioiTinh, setGioiTinh] = useState<'Nam' | 'Nữ'>(nguCanh?.gioiTinh ?? 'Nam');
  const [namXem, setNamXem] = useState(namNay);
  const [ten, setTen] = useState(nguCanh?.ten ?? '');
  const [diaChi, setDiaChi] = useState('');
  const [daChep, setDaChep] = useState(false);

  const kq = useMemo(() => saoChieuMenh(namSinh, gioiTinh, namXem), [namSinh, gioiTinh, namXem]);
  const tinh = MAU_TINH[kq.sao.tinhChat];

  const vanKhan = useMemo(
    () =>
      taoVanKhan({
        ten,
        namSinh,
        tuoiMu: kq.tuoiMu,
        diaChi,
        sao: kq.sao.ten,
        danhHieu: kq.sao.danhHieu,
        ngay: homNay.ngay,
        thang: homNay.thang,
        nam: homNay.nam,
      }),
    [ten, namSinh, kq.tuoiMu, kq.sao.ten, kq.sao.danhHieu, diaChi, homNay],
  );

  async function chep() {
    try {
      await navigator.clipboard.writeText(vanKhan);
      setDaChep(true);
      setTimeout(() => setDaChep(false), 2000);
    } catch {
      window.prompt('Sao chép văn khấn:', vanKhan);
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <p style={{ margin: 0, color: 'var(--muted)', fontSize: 13.5, lineHeight: 1.7 }}>
        Chín sao Cửu Diệu luân phiên chiếu mệnh theo chu kỳ 9 năm. Nam tuổi mụ 10 gặp La Hầu,
        nữ tuổi mụ 10 gặp Kế Đô, các năm sau tiến dần một sao.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12 }}>
        <Field label="Năm sinh âm lịch">
          <input
            style={inputStyle}
            type="number"
            min={1800}
            max={2200}
            value={namSinh}
            onChange={(e) => setNamSinh(Number(e.target.value) || 1990)}
          />
        </Field>
        <Field label="Năm xem">
          <input
            style={inputStyle}
            type="number"
            min={1900}
            max={2200}
            value={namXem}
            onChange={(e) => setNamXem(Number(e.target.value) || namNay)}
          />
        </Field>
        <Field label="Giới tính">
          <NutChon value={gioiTinh} options={['Nam', 'Nữ'] as const} onChange={setGioiTinh} />
        </Field>
      </div>

      <Card
        style={{
          padding: 22,
          background: 'linear-gradient(180deg, rgba(217,178,106,0.13), transparent)',
          border: '1px solid var(--line-strong)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
          <div>
            <p style={{ margin: 0, color: 'var(--muted)', fontSize: 12.5 }}>
              Năm {namXem} · tuổi mụ {kq.tuoiMu} · {gioiTinh}
            </p>
            <h3
              style={{
                margin: '6px 0 2px',
                fontSize: 30,
                color: 'var(--gold)',
                fontFamily: 'var(--font-display)',
              }}
            >
              Sao {kq.sao.ten}
            </h3>
            <p style={{ margin: 0, color: 'var(--muted-2)', fontSize: 14 }}>{kq.sao.han}</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start' }}>
            <Pill tone={tinh.tone}>{tinh.chu}</Pill>
          </div>
        </div>
        <p style={{ margin: '12px 0 0', color: 'var(--text)', lineHeight: 1.75 }}>{kq.sao.yNghia}</p>
        <p style={{ margin: '10px 0 0', color: 'var(--muted)', fontSize: 13 }}>
          Năm trước: {kq.truoc.ten} · Năm sau: {kq.sau.ten}
        </p>
      </Card>

      <div>
        <h4 style={{ margin: '0 0 10px', fontSize: 14, color: 'var(--text)' }}>Vòng Cửu Diệu</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 8 }}>
          {CUU_DIEU.map((s) => {
            const dang = s.key === kq.sao.key;
            const t = MAU_TINH[s.tinhChat];
            return (
              <div
                key={s.key}
                style={{
                  padding: '10px 12px',
                  borderRadius: 10,
                  textAlign: 'center',
                  border: `1px solid ${dang ? 'var(--line-strong)' : 'var(--line)'}`,
                  background: dang ? 'rgba(217,178,106,0.12)' : 'rgba(255,255,255,0.02)',
                }}
              >
                <strong style={{ display: 'block', color: dang ? 'var(--gold-2)' : 'var(--cream)', fontSize: 13.5 }}>
                  {s.ten}
                </strong>
                <span style={{ color: t.tone === 'red' ? 'var(--red)' : t.tone === 'green' ? 'var(--green)' : 'var(--muted)', fontSize: 11.5 }}>
                  {t.chu}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
        <Card>
          <h4 style={{ margin: '0 0 8px', fontSize: 14 }}>Lễ vật</h4>
          <ul style={{ margin: 0, paddingLeft: 18, color: 'var(--text)', fontSize: 13.5, lineHeight: 1.8 }}>
            {LE_VAT.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </Card>
        <Card>
          <h4 style={{ margin: '0 0 8px', fontSize: 14 }}>Thời gian cúng</h4>
          <p style={{ margin: 0, color: 'var(--text)', fontSize: 13.5, lineHeight: 1.75 }}>{THOI_GIAN_CUNG}</p>
        </Card>
      </div>

      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, flexWrap: 'wrap', marginBottom: 8 }}>
          <h4 style={{ margin: 0, fontSize: 14 }}>Bài tụng &amp; văn khấn</h4>
          <button className="btn-ghost" onClick={chep} type="button">
            {daChep ? 'Đã chép ✓' : 'Chép văn khấn'}
          </button>
        </div>
        <Card style={{ padding: 14 }}>
          <p style={{ margin: '0 0 8px', color: 'var(--muted)', fontSize: 12.5 }}>
            Niệm danh hiệu (3 hoặc 9 lần):
          </p>
          <p style={{ margin: '0 0 12px', color: 'var(--gold-2)', fontSize: 14, fontWeight: 600 }}>
            {kq.sao.danhHieu}
          </p>
          <pre
            style={{
              margin: 0,
              whiteSpace: 'pre-wrap',
              fontFamily: 'inherit',
              fontSize: 13,
              lineHeight: 1.75,
              color: 'var(--text)',
            }}
          >
            {vanKhan}
          </pre>
        </Card>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 10 }}>
        <Field label="Tên người cúng (điền vào văn khấn)">
          <input style={inputStyle} value={ten} onChange={(e) => setTen(e.target.value)} placeholder="Họ và tên" />
        </Field>
        <Field label="Địa chỉ">
          <input style={inputStyle} value={diaChi} onChange={(e) => setDiaChi(e.target.value)} placeholder="Thôn/xóm, xã, tỉnh" />
        </Field>
      </div>

      <GhiChu>
        <strong style={{ color: 'var(--text)' }}>Lưu ý:</strong> ngày tháng trong văn khấn đang lấy theo
        âm lịch hôm nay ({homNay.ngay}/{homNay.thang}/{homNay.nam}). Văn khấn là bản lưu hành phổ biến,
        mỗi địa phương có thể có dị bản; nên theo gia lễ của nhà mình.
      </GhiChu>
    </div>
  );
}
