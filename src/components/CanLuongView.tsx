import { useMemo, useState } from 'react';
import type { NguCanh } from '../lib/phien';
import { CHI, tinhCanLuong } from '../lib/canLuong';
import { Card, Field, GhiChu, NutChon, Pill, inputStyle } from './dp-ui';

const MAU_NHOM = {
  thap: { tone: 'red' as const, chu: 'Cần nhiều nỗ lực' },
  trung: { tone: 'blue' as const, chu: 'Trung bình, ổn định' },
  kha: { tone: 'gold' as const, chu: 'Khá tốt' },
  cao: { tone: 'green' as const, chu: 'Rất tốt' },
};

export default function CanLuongView({ nguCanh }: { nguCanh?: NguCanh | null }) {
  const [ngay, setNgay] = useState(nguCanh?.ngay ?? 15);
  const [thang, setThang] = useState(nguCanh?.thang ?? 1);
  const [nam, setNam] = useState(nguCanh?.nam ?? 1990);
  const [gioChi, setGioChi] = useState<string>(nguCanh?.gioChi ?? 'Tý');
  const [gioiTinh, setGioiTinh] = useState<'Nam' | 'Nữ'>(nguCanh?.gioiTinh ?? 'Nam');

  const kq = useMemo(
    () => tinhCanLuong({ ngay, thang, nam, gioChi, gioiTinh }),
    [ngay, thang, nam, gioChi, gioiTinh],
  );
  const nhan = MAU_NHOM[kq.muc.nhom];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <p style={{ margin: 0, color: 'var(--muted)', fontSize: 13.5, lineHeight: 1.7 }}>
        Cân xương tính số: mỗi năm, tháng, ngày, giờ sinh (âm lịch) có một trọng số riêng.
        Cộng bốn phần lại ra tổng cân lượng, rồi tra bảng luận giải.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12 }}>
        <Field label="Ngày âm lịch">
          <input
            style={inputStyle}
            type="number"
            min={1}
            max={30}
            value={ngay}
            onChange={(e) => setNgay(Number(e.target.value) || 1)}
          />
        </Field>
        <Field label="Tháng âm lịch">
          <input
            style={inputStyle}
            type="number"
            min={1}
            max={12}
            value={thang}
            onChange={(e) => setThang(Number(e.target.value) || 1)}
          />
        </Field>
        <Field label="Năm âm lịch">
          <input
            style={inputStyle}
            type="number"
            min={1800}
            max={2200}
            value={nam}
            onChange={(e) => setNam(Number(e.target.value) || 1990)}
          />
        </Field>
        <Field label="Giờ sinh">
          <select style={inputStyle} value={gioChi} onChange={(e) => setGioChi(e.target.value)}>
            {CHI.map((c) => (
              <option key={c} value={c}>
                Giờ {c}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Giới tính">
        <NutChon value={gioiTinh} options={['Nam', 'Nữ'] as const} onChange={setGioiTinh} />
      </Field>

      <Card
        style={{
          padding: 22,
          textAlign: 'center',
          background: 'linear-gradient(180deg, var(--gold-mo), transparent)',
          border: '1px solid var(--line-strong)',
        }}
      >
        <p style={{ margin: 0, color: 'var(--muted)', fontSize: 13 }}>
          {kq.amLich} · {kq.canChiNam} · giờ {gioChi} · {gioiTinh}
        </p>
        <h3
          style={{
            margin: '10px 0 6px',
            fontSize: 34,
            color: 'var(--gold)',
            fontFamily: 'var(--font-display)',
            letterSpacing: '0.02em',
          }}
        >
          {kq.tongChu}
        </h3>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Pill tone={nhan.tone}>{nhan.chu}</Pill>
          <Pill tone="muted">{kq.muc.ten}</Pill>
        </div>
        <p style={{ margin: '12px 0 0', color: 'var(--text)', lineHeight: 1.7 }}>{kq.muc.tomTat}</p>
      </Card>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 10 }}>
        {kq.phan.map((p) => (
          <Card key={p.nhan} style={{ padding: '12px 14px', textAlign: 'center' }}>
            <p
              style={{
                margin: 0,
                color: 'var(--muted)',
                fontSize: 11.5,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}
            >
              {p.nhan}
            </p>
            <strong style={{ display: 'block', margin: '6px 0 2px', color: 'var(--cream)', fontSize: 17 }}>
              {(p.muoi / 10).toFixed(1).replace('.', ',')} lượng
            </strong>
            <span style={{ color: 'var(--muted-2)', fontSize: 11.5 }}>{p.chiTiet}</span>
          </Card>
        ))}
      </div>

      <GhiChu>
        <strong style={{ color: 'var(--text)' }}>Lưu ý:</strong> bảng trọng số lấy theo bản 称骨算命
        lưu hành phổ biến; một số sách có dị bản ở vài mốc. Luận giải ở đây là bản tóm tắt do dự án
        biên soạn, chỉ để tham khảo — không dùng để quyết định việc lớn.
      </GhiChu>
    </div>
  );
}
