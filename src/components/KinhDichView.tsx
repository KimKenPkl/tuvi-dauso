import { useState } from 'react';
import { HAN_QUAI, NGHIA_QUAI, TEN_HAO, gieoQue, type KetQuaGieo } from '../lib/kinhDich';
import { Card, GhiChu, Pill } from './dp-ui';

const MAU_QUE: Record<string, { tone: 'green' | 'red' | 'gold'; chu: string }> = {
  cat: { tone: 'green', chu: 'Cát' },
  hung: { tone: 'red', chu: 'Hung' },
  binh: { tone: 'gold', chu: 'Bình' },
};

function VeHao({ duong, dong, viTri }: { duong: boolean; dong: boolean; viTri: number }) {
  const mau = dong ? 'var(--gold)' : 'var(--cream)';
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <span style={{ width: 54, color: 'var(--muted-2)', fontSize: 11.5, textAlign: 'right' }}>
        {TEN_HAO[viTri - 1]}
      </span>
      <div style={{ width: 132, height: 11, display: 'flex', gap: 8 }}>
        {duong ? (
          <div style={{ flex: 1, background: mau, borderRadius: 2 }} />
        ) : (
          <>
            <div style={{ flex: 1, background: mau, borderRadius: 2 }} />
            <div style={{ flex: 1, background: mau, borderRadius: 2 }} />
          </>
        )}
      </div>
      <span style={{ width: 56, color: dong ? 'var(--gold)' : 'var(--muted-2)', fontSize: 11.5 }}>
        {dong ? 'động' : duong ? 'dương' : 'âm'}
      </span>
    </div>
  );
}

function KhoiQue({ kq }: { kq: KetQuaGieo }) {
  const mau = MAU_QUE[kq.chu.cat];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 20, alignItems: 'start' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 5, paddingTop: 4 }}>
        {[...kq.hao].reverse().map((h, i) => (
          <VeHao key={i} duong={h.duong} dong={h.dong} viTri={6 - i} />
        ))}
      </div>
      <div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
          <h3 style={{ margin: 0, fontSize: 22, fontFamily: 'var(--font-display)', color: 'var(--gold)' }}>
            {kq.chu.so}. {kq.chu.ten}
          </h3>
          <Pill tone={mau.tone}>{mau.chu}</Pill>
        </div>
        <p style={{ margin: '4px 0 0', color: 'var(--muted)', fontSize: 12.5 }}>
          {kq.chu.han} · trên {NGHIA_QUAI[kq.chu.tren]} {HAN_QUAI[kq.chu.tren]} / dưới{' '}
          {NGHIA_QUAI[kq.chu.duoi]} {HAN_QUAI[kq.chu.duoi]}
        </p>
        <p style={{ margin: '10px 0 0', color: 'var(--text)', lineHeight: 1.75, fontSize: 14 }}>
          {kq.chu.tomTat}
        </p>
        {kq.viTriDong.length > 0 && (
          <p style={{ margin: '10px 0 0', color: 'var(--gold-2)', fontSize: 12.5 }}>
            Hào động: {kq.viTriDong.map((v) => TEN_HAO[v - 1]).join(', ')}
          </p>
        )}
        {kq.bien && (
          <div
            style={{
              marginTop: 14,
              paddingTop: 12,
              borderTop: '1px solid var(--line)',
            }}
          >
            <p style={{ margin: 0, color: 'var(--muted)', fontSize: 12 }}>
              Quẻ biến
            </p>
            <strong style={{ color: 'var(--cream)', fontSize: 16 }}>
              {kq.bien.so}. {kq.bien.ten}
            </strong>
            <p style={{ margin: '4px 0 0', color: 'var(--text)', fontSize: 13, lineHeight: 1.7 }}>
              {kq.bien.tomTat}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function KinhDichView() {
  const [kq, setKq] = useState<KetQuaGieo | null>(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <p style={{ margin: 0, color: 'var(--muted)', fontSize: 13.5, lineHeight: 1.7 }}>
        Gieo quẻ tam tiền: mỗi lần tung 3 đồng xu, mặt ngửa tính 3, mặt sấp tính 2. Gieo 6 lần
        từ dưới lên để được 6 hào; hào 6 và 9 là hào động, tạo ra quẻ biến.
      </p>

      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <button className="btn-primary" type="button" onClick={() => setKq(gieoQue())}>
          {kq ? 'Gieo lại' : 'Gieo quẻ'}
        </button>
        {kq && (
          <span style={{ alignSelf: 'center', color: 'var(--muted)', fontSize: 12.5 }}>
            Quẻ chỉ ứng với thời điểm gieo; lòng thành và câu hỏi rõ ràng quan trọng hơn số lần gieo.
          </span>
        )}
      </div>

      {!kq && (
        <Card style={{ padding: 28, textAlign: 'center', color: 'var(--muted)' }}>
          Bấm “Gieo quẻ” để bắt đầu. Trước khi gieo, hãy tự hỏi một việc cụ thể — càng rõ càng dễ
          đối chiếu.
        </Card>
      )}

      {kq && (
        <Card style={{ padding: 20 }}>
          <KhoiQue kq={kq} />
        </Card>
      )}

      <GhiChu>
        <strong style={{ color: 'var(--text)' }}>Lưu ý:</strong> lời quẻ ở đây là bản tóm tắt ý
        chính của 64 quẻ, không phải lời giảng đầy đủ. Kinh Dịch cổ có nhiều tầng nghĩa (quẻ, hào,
        thể, dụng); muốn hiểu sâu nên đọc kèm sách có chú giải.
      </GhiChu>
    </div>
  );
}
