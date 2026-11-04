import { useMemo, useState } from 'react';
import { HAN_QUAI, NGHIA_QUAI, TEN_HAO } from '../lib/kinhDich';
import { phanTichDaySo } from '../lib/soSim';
import type { NguCanh } from '../lib/phien';
import { Card, Field, GhiChu, NutChon, Pill, inputStyle } from './dp-ui';

const MAU_QUE = {
  cat: { tone: 'green' as const, chu: 'Cát' },
  hung: { tone: 'red' as const, chu: 'Hung' },
  binh: { tone: 'gold' as const, chu: 'Bình' },
};

type Loai = 'Số điện thoại' | 'Biển số xe';

export default function SoSimView({ nguCanh }: { nguCanh?: NguCanh | null }) {
  const [loai, setLoai] = useState<Loai>('Số điện thoại');
  const [daySo, setDaySo] = useState('');
  const [namSinh, setNamSinh] = useState<string>(
    nguCanh?.nam ? String(nguCanh.nam) : '',
  );

  const kq = useMemo(() => phanTichDaySo(daySo, namSinh ? Number(namSinh) : null), [daySo, namSinh]);
  const mau = kq ? MAU_QUE[kq.que.cat] : null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <p style={{ margin: 0, color: 'var(--muted)', fontSize: 13.5, lineHeight: 1.7 }}>
        Khởi quẻ từ dãy số theo phép số khởi quái của <em>Mai Hoa Dịch Số</em>: nửa đầu dãy số
        chia 8 lấy dư làm thượng quái, nửa sau chia 8 lấy dư làm hạ quái, tổng cả dãy chia 6 lấy dư
        làm động hào. Ngũ hành dãy số lấy theo Hà Đồ.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: 12 }}>
        <Field label="Loại dãy số">
          <NutChon value={loai} options={['Số điện thoại', 'Biển số xe'] as const} onChange={setLoai} />
        </Field>
        <Field
          label={loai === 'Số điện thoại' ? 'Số điện thoại' : 'Biển số xe'}
          hint="Chỉ cần phần số, có thể dán cả dãy có dấu cách hoặc dấu chấm."
        >
          <input
            style={inputStyle}
            value={daySo}
            onChange={(e) => setDaySo(e.target.value)}
            placeholder={loai === 'Số điện thoại' ? '0905 123 456' : '43A-123.45'}
            inputMode="numeric"
          />
        </Field>
        <Field label="Năm sinh âm lịch (tuỳ chọn)" hint="Để đối chiếu ngũ hành với bản mệnh.">
          <input
            style={inputStyle}
            type="number"
            min={1800}
            max={2200}
            value={namSinh}
            onChange={(e) => setNamSinh(e.target.value)}
            placeholder="1990"
          />
        </Field>
      </div>

      {!kq && (
        <Card style={{ padding: 22, color: 'var(--muted)', textAlign: 'center' }}>
          Nhập dãy số từ 4 đến 15 chữ số để xem. Ví dụ: 0905123456.
        </Card>
      )}

      {kq && mau && (
        <>
          <Card
            style={{
              padding: 22,
              background: 'linear-gradient(180deg, rgba(217,178,106,0.13), transparent)',
              border: '1px solid var(--line-strong)',
            }}
          >
            <p style={{ margin: 0, color: 'var(--muted)', fontSize: 12.5 }}>
              Dãy số {kq.daySo} · {kq.soLuong} chữ số · tổng {kq.tong} · {kq.nut} nút
            </p>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, flexWrap: 'wrap', marginTop: 6 }}>
              <h3 style={{ margin: 0, fontSize: 26, fontFamily: 'var(--font-display)', color: 'var(--gold)' }}>
                {kq.que.so}. {kq.que.ten}
              </h3>
              <Pill tone={mau.tone}>{mau.chu}</Pill>
            </div>
            <p style={{ margin: '4px 0 0', color: 'var(--muted)', fontSize: 12.5 }}>
              {kq.que.han} · trên {NGHIA_QUAI[kq.que.tren]} {HAN_QUAI[kq.que.tren]} / dưới{' '}
              {NGHIA_QUAI[kq.que.duoi]} {HAN_QUAI[kq.que.duoi]} · động hào {kq.haoDong} ({TEN_HAO[kq.haoDong - 1]})
            </p>
            <p style={{ margin: '10px 0 0', color: 'var(--text)', lineHeight: 1.75 }}>{kq.que.tomTat}</p>
            {kq.bien && (
              <p style={{ margin: '10px 0 0', color: 'var(--gold-2)', fontSize: 13 }}>
                Quẻ biến: <b>{kq.bien.so}. {kq.bien.ten}</b> — {kq.bien.tomTat}
              </p>
            )}
          </Card>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
            <Card>
              <h4 style={{ margin: '0 0 10px', fontSize: 14 }}>Ngũ hành dãy số</h4>
              <Pill tone="gold">{kq.hanh}</Pill>
              <p style={{ margin: '10px 0 0', color: 'var(--muted)', fontSize: 12.5, lineHeight: 1.7 }}>
                Lấy theo Hà Đồ và chữ số cuối: 1–6 Thuỷ, 2–7 Hoả, 3–8 Mộc, 4–9 Kim, 5–0 Thổ.
              </p>
              {kq.quanHeMenh && (
                <p style={{ margin: '10px 0 0', color: kq.quanHeMenh.tot ? 'var(--green)' : 'var(--red)', fontSize: 12.5, lineHeight: 1.7 }}>
                  {kq.quanHeMenh.quanHe}
                </p>
              )}
            </Card>

            <Card>
              <h4 style={{ margin: '0 0 10px', fontSize: 14 }}>Mẫu số nhận diện</h4>
              {kq.mau.length ? (
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {kq.mau.map((m) => (
                    <Pill key={m.key} tone="green">
                      {m.ten}
                    </Pill>
                  ))}
                </div>
              ) : (
                <p style={{ margin: 0, color: 'var(--muted)', fontSize: 12.5 }}>
                  Không có mẫu số đặc biệt (tứ quý, tam hoa, lộc phát, thần tài, tiến lên…).
                </p>
              )}
              {kq.mau.length > 0 && (
                <p style={{ margin: '10px 0 0', color: 'var(--muted-2)', fontSize: 11.5 }}>
                  {kq.mau.map((m) => `${m.ten}: ${m.moTa.toLowerCase()}`).join(' · ')}
                </p>
              )}
            </Card>
          </div>
        </>
      )}

      <GhiChu>
        <strong style={{ color: 'var(--text)' }}>Căn cứ &amp; lưu ý:</strong> phép khởi quái theo
        <em> Mai Hoa Dịch Số</em> (Thiệu Ung), số quái theo Tiên thiên bát quái, ngũ hành theo Hà Đồ.
        Các mẫu số đẹp (lộc phát, thần tài…) chỉ là quy ước thị trường, không phải cổ thư. Đây là
        công cụ tham khảo — không có dãy số nào quyết định được vận mệnh con người.
      </GhiChu>
    </div>
  );
}
