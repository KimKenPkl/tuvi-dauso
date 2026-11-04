import { useMemo, useState } from 'react';
import type { NguCanh } from '../lib/phien';
import { xemPhongThuy } from '../lib/phongThuy';
import { Card, Field, GhiChu, NutChon, Pill, inputStyle } from './dp-ui';

export default function PhongThuyView({ nguCanh }: { nguCanh?: NguCanh | null }) {
  const [namSinh, setNamSinh] = useState(nguCanh?.nam ?? 1990);
  const [gioiTinh, setGioiTinh] = useState<'Nam' | 'Nữ'>(nguCanh?.gioiTinh ?? 'Nam');
  const kq = useMemo(() => xemPhongThuy(namSinh, gioiTinh), [namSinh, gioiTinh]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <p style={{ margin: 0, color: 'var(--muted)', fontSize: 13.5, lineHeight: 1.7 }}>
        Phong thuỷ Bát Trạch: từ năm sinh âm lịch và giới tính, tính ra mệnh quái rồi suy ra
        tám hướng cát hung, màu sắc và số hợp.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12 }}>
        <Field label="Năm sinh âm lịch" hint="Nếu sinh trước Tết, chọn năm âm lịch tương ứng.">
          <input
            style={inputStyle}
            type="number"
            min={1800}
            max={2200}
            value={namSinh}
            onChange={(e) => setNamSinh(Number(e.target.value) || 1990)}
          />
        </Field>
        <Field label="Giới tính">
          <NutChon value={gioiTinh} options={['Nam', 'Nữ'] as const} onChange={setGioiTinh} />
        </Field>
      </div>

      <Card
        style={{
          padding: 22,
          background: 'linear-gradient(180deg, var(--gold-mo), transparent)',
          border: '1px solid var(--line-strong)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 34, color: 'var(--gold)', lineHeight: 1 }}>{kq.menh.han}</span>
          <div>
            <h3 style={{ margin: 0, fontSize: 24, fontFamily: 'var(--font-display)', color: 'var(--gold)' }}>
              Mệnh {kq.menh.quai} · {kq.menh.nguHanh}
            </h3>
            <p style={{ margin: '2px 0 0', color: 'var(--muted)', fontSize: 13 }}>
              {kq.canChi} · {kq.napAm} · {kq.gioiTinh}
            </p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
          <Pill tone={kq.menh.nhom === 'Đông tứ mệnh' ? 'green' : 'blue'}>{kq.menh.nhom}</Pill>
          <Pill tone="muted">Bản mệnh: {kq.hanhBanMenh}</Pill>
        </div>
      </Card>

      <div>
        <h4 style={{ margin: '0 0 10px', fontSize: 14 }}>Tám hướng theo mệnh quái</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: 10 }}>
          {kq.huong.map((h) => (
            <div
              key={h.huong}
              style={{
                padding: '12px 14px',
                borderRadius: 10,
                border: `1px solid ${h.tot ? 'var(--green-vien)' : 'var(--red-vien)'}`,
                background: h.tot ? 'var(--green-mo)' : 'var(--red-mo)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
                <strong style={{ color: 'var(--cream)', fontSize: 14.5 }}>
                  {h.huong} <span style={{ color: 'var(--muted-2)', fontWeight: 400 }}>({h.quai})</span>
                </strong>
                <Pill tone={h.tot ? 'green' : 'red'}>{h.duNien}</Pill>
              </div>
              <p style={{ margin: '8px 0 4px', color: 'var(--text)', fontSize: 12.5, lineHeight: 1.6 }}>{h.nghia}</p>
              <p style={{ margin: 0, color: 'var(--muted-2)', fontSize: 11.5 }}>{h.dung}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
        <Card>
          <h4 style={{ margin: '0 0 10px', fontSize: 14 }}>Màu hợp</h4>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {kq.mauHop.map((m) => (
              <Pill key={m} tone="green">
                {m}
              </Pill>
            ))}
          </div>
          <h4 style={{ margin: '14px 0 10px', fontSize: 14 }}>Màu nên tránh</h4>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {kq.mauKy.map((m) => (
              <Pill key={m} tone="red">
                {m}
              </Pill>
            ))}
          </div>
        </Card>
        <Card>
          <h4 style={{ margin: '0 0 10px', fontSize: 14 }}>Số hợp (Hà Đồ)</h4>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {kq.soHop.map((s) => (
              <Pill key={s} tone="gold">
                {s}
              </Pill>
            ))}
          </div>
          <h4 style={{ margin: '14px 0 10px', fontSize: 14 }}>Vật phẩm gợi ý</h4>
          <p style={{ margin: 0, color: 'var(--text)', fontSize: 13, lineHeight: 1.7 }}>
            {kq.vatPham.join(' · ')}
          </p>
        </Card>
      </div>

      <GhiChu>
        <strong style={{ color: 'var(--text)' }}>Lưu ý:</strong> mệnh quái tính theo phép Bát Trạch
        phổ biến. Hướng nhà còn phải xét hình thế đất, cửa ngõ, bếp và tuổi các thành viên — đây chỉ
        là bước tham khảo ban đầu, không thay được thầy địa phương khảo sát thực tế.
      </GhiChu>
    </div>
  );
}
