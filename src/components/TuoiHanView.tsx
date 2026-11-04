import { useMemo, useState } from 'react';
import { xemTuoiTheoNam, type LoaiQuanHe } from '../lib/tuoiHan';
import type { NguCanh } from '../lib/phien';
import { Card, Field, GhiChu, NutChon, Pill, inputStyle } from './dp-ui';

const MAU_QUAN_HE: Record<LoaiQuanHe, { tone: 'green' | 'red' | 'gold' | 'muted'; chu: string }> = {
  'tam-hop': { tone: 'green', chu: 'Tam hợp' },
  'luc-hop': { tone: 'green', chu: 'Lục hợp' },
  xung: { tone: 'red', chu: 'Tương xung' },
  hai: { tone: 'red', chu: 'Tương hại' },
  binh: { tone: 'muted', chu: 'Bình hoà' },
};

const MAU_MUC = {
  thuan: { tone: 'green' as const, chu: 'Thuận' },
  trung: { tone: 'gold' as const, chu: 'Trung tính' },
  'can-than': { tone: 'red' as const, chu: 'Cần thận' },
};

export default function TuoiHanView({ nguCanh }: { nguCanh?: NguCanh | null }) {
  const namNay = new Date().getFullYear();
  const [namSinh, setNamSinh] = useState(nguCanh?.nam ?? 1990);
  const [gioiTinh, setGioiTinh] = useState<'Nam' | 'Nữ'>(nguCanh?.gioiTinh ?? 'Nam');
  const [namXem, setNamXem] = useState(namNay);

  const kq = useMemo(() => xemTuoiTheoNam(namSinh, gioiTinh, namXem), [namSinh, gioiTinh, namXem]);
  const qh = MAU_QUAN_HE[kq.quanHe];
  const muc = MAU_MUC[kq.muc];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <p style={{ margin: 0, color: 'var(--muted)', fontSize: 13.5, lineHeight: 1.7 }}>
        Vận hạn theo tuổi trong một năm: đối chiếu địa chi của tuổi với địa chi của năm (tam hợp,
        lục hợp, tương xung, tương hại), cộng thêm sao Cửu Diệu chiếu mệnh và Tam Tai.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12 }}>
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
        <p style={{ margin: 0, color: 'var(--muted)', fontSize: 12.5 }}>
          Tuổi {kq.conGiap} · {kq.canChiTuoi} · tuổi mụ {kq.tuoiMu} · xem năm {kq.canChiNam}
        </p>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, flexWrap: 'wrap', marginTop: 6 }}>
          <h3 style={{ margin: 0, fontSize: 26, fontFamily: 'var(--font-display)', color: 'var(--gold)' }}>
            {muc.chu}
          </h3>
          <Pill tone={qh.tone}>{qh.chu}</Pill>
          <Pill tone="muted">Sao {kq.sao.sao.ten}</Pill>
        </div>
        <p style={{ margin: '10px 0 0', color: 'var(--text)', lineHeight: 1.75 }}>{kq.mucText}</p>
      </Card>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 12 }}>
        <Card>
          <h4 style={{ margin: '0 0 8px', fontSize: 14 }}>Vì sao</h4>
          <ul style={{ margin: 0, paddingLeft: 18, color: 'var(--text)', fontSize: 13.5, lineHeight: 1.8 }}>
            {kq.lyDo.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </Card>
        <Card>
          <h4 style={{ margin: '0 0 8px', fontSize: 14 }}>Nên lưu ý</h4>
          <ul style={{ margin: 0, paddingLeft: 18, color: 'var(--text)', fontSize: 13.5, lineHeight: 1.8 }}>
            {kq.loiKhuyen.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </Card>
      </div>

      <div>
        <h4 style={{ margin: '0 0 10px', fontSize: 14 }}>Kiểm tra theo tuổi</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 8 }}>
          {kq.kiemTra.map((k) => (
            <div
              key={k.ten}
              style={{
                padding: '12px 14px',
                borderRadius: 10,
                border: `1px solid ${k.dat ? 'rgba(111,179,160,0.35)' : 'rgba(198,90,72,0.32)'}`,
                background: k.dat ? 'rgba(111,179,160,0.06)' : 'rgba(198,90,72,0.06)',
              }}
            >
              <strong style={{ display: 'block', color: k.dat ? 'var(--green)' : 'var(--red)', fontSize: 13.5 }}>
                {k.ten}: {k.dat ? 'không phạm' : 'có phạm'}
              </strong>
              <span style={{ color: 'var(--muted)', fontSize: 12 }}>{k.chiTiet}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 style={{ margin: '0 0 10px', fontSize: 14 }}>
          Quan hệ 12 con giáp với năm {kq.canChiNam}
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 8 }}>
          {kq.bang.map((d) => {
            const m = MAU_QUAN_HE[d.quanHe];
            const dang = d.chi === kq.conGiap;
            return (
              <div
                key={d.chi}
                style={{
                  padding: '10px 12px',
                  borderRadius: 10,
                  border: `1px solid ${dang ? 'var(--line-strong)' : 'var(--line)'}`,
                  background: dang ? 'rgba(217,178,106,0.12)' : 'rgba(255,255,255,0.02)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 6 }}>
                  <strong style={{ color: dang ? 'var(--gold-2)' : 'var(--cream)', fontSize: 13.5 }}>
                    Tuổi {d.chi}
                  </strong>
                  <Pill tone={m.tone}>{m.chu}</Pill>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <GhiChu>
        <strong style={{ color: 'var(--text)' }}>Căn cứ:</strong> tam hợp, lục hợp, lục xung, lục hại
        của 12 địa chi theo <em>Tam Mệnh Thông Hội</em>; Tam Tai – Kim Lâu – Hoang Ốc dùng chung
        nguồn với mục Xây nhà/Cưới hỏi của site; sao chiếu mệnh theo Cửu Diệu. Mức thuận/cần thận chỉ
        là tổng hợp các yếu tố trên, không phải lời phán số mệnh.
      </GhiChu>
    </div>
  );
}
