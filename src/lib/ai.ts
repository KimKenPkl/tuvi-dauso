/**
 * Gọi API AI trực tiếp từ trình duyệt (BYO key).
 *
 * Không có backend trung gian: API key nằm trong localStorage của chính
 * người dùng và chỉ được gửi tới nhà cung cấp mà họ chọn.
 */

import type { LaSo } from './chart';
import type { LuanGiai } from './interpret';
import type { CauHinhAi } from './storage';

export const GOI_Y_MODEL: Record<CauHinhAi['provider'], string[]> = {
  gemini: ['gemini-2.5-flash', 'gemini-2.5-pro', 'gemini-2.0-flash'],
  openai: ['gpt-4o-mini', 'gpt-4o', 'gpt-4.1-mini'],
};

// ─────────────────────────────────────────────────────────────────
// Dựng prompt từ dữ liệu lá số (không để model tự bịa sao)
// ─────────────────────────────────────────────────────────────────

export function taoPrompt(ls: LaSo, lg: LuanGiai, namXem: number): string {
  const cungText = ls.cung
    .map((c) => {
      const chinh = c.chinhTinh
        .map((s) => `${s.ten}${s.doSang ? ` (${s.doSang})` : ''}${s.tuHoa ? ` [${s.tuHoa}]` : ''}`)
        .join(', ');
      const phu = c.phuTinh.map((s) => s.ten + (s.tuHoa ? ` [${s.tuHoa}]` : '')).join(', ');
      return `- Cung ${c.ten} (${c.can} ${c.chi}): chính tinh: ${chinh || 'vô chính diệu'}; phụ tinh: ${phu || 'không'}; đại hạn ${c.daiHan.tuoiBatDau}-${c.daiHan.tuoiKetThuc} tuổi`;
    })
    .join('\n');

  const hoaText = lg.tongQuan.find((m) => m.tieuDe === 'Tứ hoá năm sinh')?.noiDung ?? '';

  return `Bạn là người luận giải Tử Vi Đẩu Số có kinh nghiệm, viết cho người Việt.

DỮ LIỆU LÁ SỐ (đã tính sẵn, KHÔNG được thay đổi hay thêm sao khác):
- Giới tính: ${ls.gioiTinh}
- Dương lịch: ${ls.duongLich} | Âm lịch: ${ls.amLich}
- Giờ sinh: ${ls.gio.ten} (${ls.gio.khoang})
- Ngũ hành cục: ${ls.cuc}
- Cung Mệnh: ${ls.menhCung} | Cung Thân: ${ls.thanCung}
- Mệnh chủ: ${ls.menhChu} | Thân chủ: ${ls.thanChu}
- Tứ trụ: ${ls.tuTru.map((t) => `${t.can} ${t.chi}`).join(' | ')}
- Năm xem vận hạn: ${namXem}

MƯỜI HAI CUNG:
${cungText}

TỨ HOÁ NĂM SINH:
${hoaText || 'không có dữ liệu'}

CÁCH CỤC ĐÃ NHẬN DIỆN: ${lg.cachCuc.map((c) => c.ten).join(', ') || 'không có'}

YÊU CẦU ĐẦU RA:
1. Viết bằng tiếng Việt tự nhiên, thuật ngữ Tử Vi dùng đúng chuẩn (Miếu, Vượng, Đắc, Hãm, Tứ Hoá, Tam Phương Tứ Chính).
2. Cấu trúc 6 phần có tiêu đề: "Chân dung cốt lõi", "Sự nghiệp", "Tài chính", "Quan hệ", "Sức khoẻ", "3 việc nên làm trong 12 tháng tới".
3. Mỗi nhận định phải bám vào một sao hoặc cung cụ thể trong dữ liệu trên. Nếu dữ liệu không đủ để kết luận, nói rõ là không đủ.
4. Tuyệt đối KHÔNG: hù doạ, khuyên cúng bái/giải hạn, hứa hẹn giàu sang, phán bệnh tật cụ thể, phán "phải ly hôn / không nên lấy".
5. Giọng văn: như một người cố vấn thẳng thắn nhưng tôn trọng. Dùng "bạn".
6. Độ dài: 600–900 từ. Không dùng emoji.
7. Kết bài bằng một câu nhắc rằng đây là công cụ tham khảo, không thay thế quyết định thực tế.`;
}

// ─────────────────────────────────────────────────────────────────
// Stream
// ─────────────────────────────────────────────────────────────────

function parseSseChunk(buffer: string): { events: string[]; rest: string } {
  const events: string[] = [];
  let rest = buffer;
  let idx = rest.indexOf('\n\n');
  while (idx !== -1) {
    events.push(rest.slice(0, idx));
    rest = rest.slice(idx + 2);
    idx = rest.indexOf('\n\n');
  }
  return { events, rest };
}

export interface GoiAi {
  cauHinh: CauHinhAi;
  prompt: string;
  onChunk: (text: string) => void;
  signal?: AbortSignal;
}

export async function chayAi({ cauHinh, prompt, onChunk, signal }: GoiAi): Promise<string> {
  const { provider, apiKey, model, baseUrl } = cauHinh;
  if (!apiKey.trim()) throw new Error('Chưa nhập API key.');

  let url: string;
  let body: unknown;
  let headers: Record<string, string> = { 'Content-Type': 'application/json' };

  if (provider === 'gemini') {
    url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(
      model,
    )}:streamGenerateContent?alt=sse&key=${encodeURIComponent(apiKey)}`;
    body = {
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.7, maxOutputTokens: 4096 },
    };
  } else {
    const base = (baseUrl?.trim() || 'https://api.openai.com/v1').replace(/\/+$/, '');
    url = `${base}/chat/completions`;
    headers = { ...headers, Authorization: `Bearer ${apiKey}` };
    body = {
      model,
      messages: [
        { role: 'system', content: 'Bạn là chuyên gia Tử Vi Đẩu Số viết cho người Việt. Không hù doạ, không mê tín cực đoan.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
      stream: true,
    };
  }

  const res = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
    signal,
  });

  if (!res.ok || !res.body) {
    let chiTiet = '';
    try {
      const t = await res.text();
      chiTiet = t.slice(0, 400);
    } catch {
      /* ignore */
    }
    throw new Error(`API trả về ${res.status}. ${chiTiet}`);
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  let full = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    const { events, rest } = parseSseChunk(buffer);
    buffer = rest;

    for (const ev of events) {
      const lines = ev.split('\n');
      for (const line of lines) {
        if (!line.startsWith('data:')) continue;
        const data = line.slice(5).trim();
        if (!data || data === '[DONE]') continue;
        try {
          const json = JSON.parse(data);
          let text = '';
          if (provider === 'gemini') {
            text = json?.candidates?.[0]?.content?.parts?.map((p: any) => p.text ?? '').join('') ?? '';
          } else {
            text = json?.choices?.[0]?.delta?.content ?? '';
          }
          if (text) {
            full += text;
            onChunk(text);
          }
        } catch {
          /* chunk hỏng, bỏ qua */
        }
      }
    }
  }

  return full;
}
