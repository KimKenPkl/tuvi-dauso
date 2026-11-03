import { useEffect, useRef, useState } from 'react';
import { chayAi, taoPrompt, GOI_Y_MODEL } from '../lib/ai';
import type { LaSo } from '../lib/chart';
import type { LuanGiai } from '../lib/interpret';
import { docCauHinhAi, luuCauHinhAi, type CauHinhAi } from '../lib/storage';

interface Props {
  laSo: LaSo;
  luanGiai: LuanGiai;
  namXem: number;
}

/** Render Markdown tối giản: tiêu đề, in đậm, gạch đầu dòng, đánh số */
function Markdown({ text }: { text: string }) {
  const dong = text.split('\n');
  const out: React.ReactNode[] = [];
  let list: string[] = [];

  const flush = () => {
    if (!list.length) return;
    out.push(
      <ul key={`ul-${out.length}`}>
        {list.map((li, i) => (
          <li key={i} dangerouslySetInnerHTML={{ __html: dam(li) }} />
        ))}
      </ul>,
    );
    list = [];
  };

  const dam = (s: string) =>
    s
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>');

  for (const raw of dong) {
    const line = raw.trimEnd();
    if (/^#{1,4}\s/.test(line)) {
      flush();
      const cap = line.match(/^#+/)?.[0].length ?? 2;
      const noiDung = line.replace(/^#{1,4}\s*/, '');
      out.push(
        <h4 key={`h-${out.length}`} className={cap <= 2 ? 'md-h2' : 'md-h3'}>
          {noiDung}
        </h4>,
      );
    } else if (/^\s*[-*•]\s+/.test(line)) {
      list.push(line.replace(/^\s*[-*•]\s+/, ''));
    } else if (/^\s*\d+[.)]\s+/.test(line)) {
      list.push(line.replace(/^\s*\d+[.)]\s+/, ''));
    } else if (!line.trim()) {
      flush();
    } else {
      flush();
      out.push(<p key={`p-${out.length}`} dangerouslySetInnerHTML={{ __html: dam(line) }} />);
    }
  }
  flush();
  return <div className="md">{out}</div>;
}

export default function AiPanel({ laSo, luanGiai, namXem }: Props) {
  const [cauHinh, setCauHinh] = useState<CauHinhAi>(() => docCauHinhAi());
  const [moCaiDat, setMoCaiDat] = useState(false);
  const [dangChay, setDangChay] = useState(false);
  const [ketQua, setKetQua] = useState('');
  const [loi, setLoi] = useState('');
  const abort = useRef<AbortController | null>(null);
  const vungKetQua = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setKetQua('');
    setLoi('');
  }, [namXem, laSo.duongLich]);

  useEffect(() => {
    vungKetQua.current?.scrollTo({ top: vungKetQua.current.scrollHeight });
  }, [ketQua]);

  async function chay() {
    if (!cauHinh.apiKey.trim()) {
      setMoCaiDat(true);
      setLoi('Nhập API key trước đã — key chỉ lưu trên máy bạn.');
      return;
    }
    setLoi('');
    setKetQua('');
    setDangChay(true);
    abort.current = new AbortController();
    try {
      const prompt = taoPrompt(laSo, luanGiai, namXem);
      await chayAi({
        cauHinh,
        prompt,
        signal: abort.current.signal,
        onChunk: (t) => setKetQua((cu) => cu + t),
      });
    } catch (e: any) {
      if (e?.name !== 'AbortError') setLoi(e?.message ?? 'Không gọi được API.');
    } finally {
      setDangChay(false);
      abort.current = null;
    }
  }

  function dung() {
    abort.current?.abort();
    setDangChay(false);
  }

  function luuCauHinh(c: CauHinhAi) {
    setCauHinh(c);
    luuCauHinhAi(c);
  }

  return (
    <section className="ai-panel">
      <header className="ai-head">
        <div>
          <h3>Luận giải bằng AI</h3>
          <p>
            Gửi cấu trúc lá số tới model bạn chọn để có bản luận sâu hơn. API key lưu trong trình
            duyệt của bạn, không đi qua máy chủ nào khác.
          </p>
        </div>
        <div className="ai-actions">
          <button type="button" className="btn-ghost" onClick={() => setMoCaiDat((v) => !v)}>
            {moCaiDat ? 'Đóng cài đặt' : 'Cài đặt'}
          </button>
          {dangChay ? (
            <button type="button" className="btn-ghost danger" onClick={dung}>
              Dừng
            </button>
          ) : (
            <button type="button" className="btn-ghost primary" onClick={chay}>
              {ketQua ? 'Luận lại' : 'Bắt đầu luận giải'}
            </button>
          )}
        </div>
      </header>

      {moCaiDat && (
        <div className="ai-config">
          <div className="form-row">
            <label className="field">
              <span className="label">Nhà cung cấp</span>
              <select
                value={cauHinh.provider}
                onChange={(e) => {
                  const provider = e.target.value as CauHinhAi['provider'];
                  luuCauHinh({ ...cauHinh, provider, model: GOI_Y_MODEL[provider][0] });
                }}
              >
                <option value="gemini">Google Gemini</option>
                <option value="openai">OpenAI / tương thích OpenAI</option>
              </select>
            </label>

            <label className="field">
              <span className="label">Model</span>
              <input
                list="ds-model"
                value={cauHinh.model}
                onChange={(e) => luuCauHinh({ ...cauHinh, model: e.target.value })}
              />
              <datalist id="ds-model">
                {GOI_Y_MODEL[cauHinh.provider].map((m) => (
                  <option key={m} value={m} />
                ))}
              </datalist>
            </label>

            <label className="field field-wide">
              <span className="label">API key</span>
              <input
                type="password"
                autoComplete="off"
                value={cauHinh.apiKey}
                placeholder={cauHinh.provider === 'gemini' ? 'AIza...' : 'sk-...'}
                onChange={(e) => luuCauHinh({ ...cauHinh, apiKey: e.target.value })}
              />
            </label>
          </div>

          {cauHinh.provider === 'openai' && (
            <label className="field">
              <span className="label">Base URL (để trống nếu dùng OpenAI chính thức)</span>
              <input
                value={cauHinh.baseUrl ?? ''}
                placeholder="https://api.openai.com/v1"
                onChange={(e) => luuCauHinh({ ...cauHinh, baseUrl: e.target.value })}
              />
            </label>
          )}

          <p className="hint">
            Lấy key: <b>Gemini</b> tại aistudio.google.com/apikey · <b>OpenAI</b> tại
            platform.openai.com/api-keys. Key được lưu ở <code>localStorage</code> của trình duyệt
            này. Nếu dùng máy công cộng, nhớ xoá key sau khi xong.
          </p>
        </div>
      )}

      {loi && <p className="error">{loi}</p>}

      {(dangChay || ketQua) && (
        <div className="ai-output" ref={vungKetQua}>
          {ketQua ? <Markdown text={ketQua} /> : <p className="muted">Đang chờ phản hồi…</p>}
          {dangChay && <span className="caret" />}
        </div>
      )}
    </section>
  );
}
