export type RIASECType = 'R' | 'I' | 'A' | 'S' | 'E' | 'C';

export interface CareerQuestion {
  id: number;
  text: string;
  type: RIASECType;
}

export interface CareerProfile {
  code: string;
  name: string;
  motto: string;
  description: string;
  strengths: string[];
  weaknesses: string[];
  suitableMajors: string[];
  suitableCareers: string[];
  advice: string[];
  quote: string;
}

export const CAREER_QUESTIONS: CareerQuestion[] = [
  // R - Thực tế (Realistic)
  { id: 1, text: 'Tôi thích sửa chữa, lắp ráp hoặc vận hành các thiết bị, máy móc.', type: 'R' },
  { id: 2, text: 'Tôi thích làm việc ngoài trời hơn là ngồi văn phòng suốt ngày.', type: 'R' },
  { id: 3, text: 'Tôi thích các công việc đòi hỏi sự khéo léo, thực hành nhiều hơn lý thuyết.', type: 'R' },
  { id: 4, text: 'Tôi thấy hài lòng khi hoàn thành một việc gì đó bằng tay cụ thể.', type: 'R' },

  // I - Nghiên cứu (Investigative)
  { id: 5, text: 'Tôi thích tìm hiểu nguyên nhân "tại sao" của sự vật hiện tượng.', type: 'I' },
  { id: 6, text: 'Tôi thích phân tích, giải thích hoặc nghiên cứu vấn đề phức tạp.', type: 'I' },
  { id: 7, text: 'Tôi thích đọc sách, tài liệu để tìm câu trả lời cho thắc mắc.', type: 'I' },
  { id: 8, text: 'Tôi thích thử nghiệm, kiểm chứng để đi đến kết luận.', type: 'I' },

  // A - Nghệ thuật (Artistic)
  { id: 9, text: 'Tôi thích sáng tạo, thiết kế hoặc thể hiện ý tưởng bằng hình ảnh, âm nhạc.', type: 'A' },
  { id: 10, text: 'Tôi thích làm những việc độc đáo, khác biệt thay vì theo khuôn mẫu cứng nhắc.', type: 'A' },
  { id: 11, text: 'Tôi nhạy cảm với màu sắc, bố cục, không gian hoặc cảm xúc.', type: 'A' },
  { id: 12, text: 'Tôi thích tự do thể hiện bản thân hơn là bị ràng buộc chặt chẽ.', type: 'A' },

  // S - Xã hội (Social)
  { id: 13, text: 'Tôi thích giúp đỡ, tư vấn hoặc hỗ trợ người khác giải quyết vấn đề.', type: 'S' },
  { id: 14, text: 'Tôi dễ trò chuyện, lắng nghe và thấu hiểu cảm xúc của người khác.', type: 'S' },
  { id: 15, text: 'Tôi thích giảng giải, hướng dẫn để người khác học được điều mới.', type: 'S' },
  { id: 16, text: 'Tôi cảm thấy vui khi thấy người khác tiến bộ nhờ sự giúp đỡ của mình.', type: 'S' },

  // E - Doanh nghiệp (Enterprising)
  { id: 17, text: 'Tôi thích thuyết phục, đàm phán hoặc dẫn dắt người khác theo ý tưởng của mình.', type: 'E' },
  { id: 18, text: 'Tôi thích lập kế hoạch, tổ chức và chịu trách nhiệm với mục tiêu.', type: 'E' },
  { id: 19, text: 'Tôi dám mạo hiểm có tính toán để đạt được kết quả mong muốn.', type: 'E' },
  { id: 20, text: 'Tôi quan tâm đến việc tạo cơ hội, kinh doanh hoặc tổ chức sự việc.', type: 'E' },

  // C - Quy ước (Conventional)
  { id: 21, text: 'Tôi thích làm việc có quy trình, rõ ràng, ngăn nắp và có thứ tự.', type: 'C' },
  { id: 22, text: 'Tôi cẩn thận với số liệu, hồ sơ, tài liệu và chi tiết.', type: 'C' },
  { id: 23, text: 'Tôi thích môi trường làm việc ổn định, có kế hoạch rõ ràng.', type: 'C' },
  { id: 24, text: 'Tôi thấy thoải mái khi tuân thủ quy định và hoàn thành đúng hạn.', type: 'C' },
];

interface TypeInfo {
  ten: string;
  ngan: string;
  motto: string;
  strengths: string[];
  weaknesses: string[];
  suitableMajors: string[];
  suitableCareers: string[];
  advice: string[];
  quote: string;
}

const TYPE_INFO: Record<RIASECType, TypeInfo> = {
  R: {
    ten: 'Thực tế',
    ngan: 'giỏi thực hành, thích làm việc cụ thể bằng tay',
    motto: '"Hành động tạo nên giá trị"',
    strengths: ['Khéo léo thực hành', 'Kiên trì', 'Tập trung vào kết quả', 'Ổn định dưới áp lực'],
    weaknesses: ['Ít kiên nhẫn với lý thuyết trừu tượng', 'Có thể ngại công việc giấy tờ'],
    suitableMajors: ['Cơ khí - Tự động hóa', 'Điện - Điện tử', 'Công nghệ ô tô', 'Nông nghiệp - Thủy sản', 'Xây dựng dân dụng'],
    suitableCareers: ['Kỹ sư cơ khí', 'Kỹ thuật viên bảo trì', 'Thợ lành nghề', 'Kỹ sư nông nghiệp', 'Kiến trúc sư kỹ thuật'],
    advice: ['Chọn ngành có nhiều giờ thực hành xưởng/phòng thí nghiệm', 'Tìm hiểu nghề kỹ thuật viên trước khi quyết định', 'Rèn thêm kỹ năng mềm để thăng tiến'],
    quote: '"Làm một lần nhớ lâu hơn nghe một trăm lần."',
  },
  I: {
    ten: 'Nghiên cứu',
    ngan: 'ham phân tích, tò mò tìm hiểu nguyên nhân',
    motto: '"Hiểu sâu để đi xa"',
    strengths: ['Tư duy logic', 'Ham học hỏi', 'Kiên nhẫn nghiên cứu', 'Chú ý chi tiết'],
    weaknesses: ['Có thể phân tích quá lâu', 'Ngại trình bày trước đám đông'],
    suitableMajors: ['Toán - Ứng dụng', 'Vật lý', 'Hóa học', 'Sinh học', 'Khoa học máy tính', 'Y khoa'],
    suitableCareers: ['Nhà nghiên cứu', 'Chuyên viên phân tích dữ liệu', 'Bác sĩ', 'Khoa học dữ liệu', 'Giảng viên'],
    advice: ['Ưu tiên ngành có hướng nghiên cứu rõ ràng', 'Học thêm ngoại ngữ để đọc tài liệu quốc tế', 'Kết hợp nghiên cứu với ứng dụng thực tế'],
    quote: '"Câu hỏi hay quan trọng hơn câu trả lời dễ."',
  },
  A: {
    ten: 'Nghệ thuật',
    ngan: 'giàu trí tưởng tượng, nhạy cảm với thẩm mỹ',
    motto: '"Sáng tạo là bản năng"',
    strengths: ['Sáng tạo', 'Nhạy cảm thẩm mỹ', 'Tư duy mở', 'Biểu đạt tốt'],
    weaknesses: ['Ít thích quy trình cứng nhắc', 'Có thể thiếu kiên nhẫn với chi tiết kỹ thuật'],
    suitableMajors: ['Thiết kế đồ họa', 'Kiến trúc', 'Âm nhạc', 'Điện ảnh - Truyền thông', 'Nghệ thuật biểu diễn'],
    suitableCareers: ['Nhà thiết kế', 'Biên đạo', 'Nhà văn - Biên kịch', 'Nhiếp ảnh gia', 'Chuyên viên sáng tạo nội dung'],
    advice: ['Xây dựng portfolio từ sớm', 'Kết hợp sáng tạo với kỹ năng số', 'Học cách quản lý thời gian dự án'],
    quote: '"Không có sáng tạo nào vô ích nếu bạn dám làm."',
  },
  S: {
    ten: 'Xã hội',
    ngan: 'quan tâm con người, giỏi hỗ trợ và đồng hành',
    motto: '"Giúp người, kết nối người"',
    strengths: ['Thấu cảm', 'Giỏi giao tiếp', 'Kiên nhẫn', 'Có trách nhiệm'],
    weaknesses: ['Dễ quá hy sinh', 'Khó nói từ chối'],
    suitableMajors: ['Sư phạm', 'Y - Dược', 'Điều dưỡng', 'Công tác xã hội', 'Tâm lý học'],
    suitableCareers: ['Giáo viên', 'Y tá - Điều dưỡng', 'Nhân viên xã hội', 'Tư vấn viên', 'Chuyên viên nhân sự'],
    advice: ['Chọn ngành được tiếp xúc trực tiếp với người', 'Rèn kỹ năng lắng nghe', 'Học cách bảo vệ ranh giới cá nhân'],
    quote: '"Một người thầy giỏi thay đổi cả một thế hệ."',
  },
  E: {
    ten: 'Doanh nghiệp',
    ngan: 'thích dẫn dắt, thuyết phục và dám chấp nhận rủi ro',
    motto: '"Dám nghĩ, dám làm"',
    strengths: ['Quyết đoán', 'Thuyết phục', 'Tầm nhìn', 'Năng động'],
    weaknesses: ['Có thể vội vàng', 'Ít kiên nhẫn với chi tiết'],
    suitableMajors: ['Quản trị kinh doanh', 'Marketing', 'Tài chính - Ngân hàng', 'Luật kinh tế', 'Khởi nghiệp'],
    suitableCareers: ['Quản lý dự án', 'Kinh doanh', 'Chuyên viên quan hệ công chúng', 'Khởi nghiệp', 'Quản lý vận hành'],
    advice: ['Học quản trị tài chính cơ bản', 'Rèn kỹ năng đàm phán', 'Tìm người cố vấn sớm'],
    quote: '"Cơ hội thuộc về người dám hành động."',
  },
  C: {
    ten: 'Quy ước',
    ngan: 'chuộng ngăn nắp, chính xác, có hệ thống',
    motto: '"Chỉn chu tạo niềm tin"',
    strengths: ['Cẩn thận', 'Kỷ luật', 'Có tổ chức', 'Đáng tin cậy'],
    weaknesses: ['Có thể chậm thích ứng', 'Ngại thay đổi đột ngột'],
    suitableMajors: ['Kế toán', 'Tài chính', 'Thuật toán - Dữ liệu', 'Quản trị văn phòng', 'Kiểm toán'],
    suitableCareers: ['Kế toán viên', 'Kiểm toán viên', 'Chuyên viên hành chính', 'Ngân hàng', 'Chuyên viên kiểm soát chất lượng'],
    advice: ['Chọn ngành có lộ trình nghề nghiệp rõ ràng', 'Học chứng chỉ chuyên môn sớm', 'Rèn thêm tư duy linh hoạt'],
    quote: '"Chi tiết nhỏ quyết định chất lượng lớn."',
  },
};

/** Thứ tự ưu tiên cố định để canonical hóa mã Holland */
const PRIORITY: RIASECType[] = ['R', 'I', 'A', 'S', 'E', 'C'];

function dedupe<T>(arr: T[]): T[] {
  return Array.from(new Set(arr));
}

function mergeInfo(types: RIASECType[]): CareerProfile {
  const infos = types.map((t) => TYPE_INFO[t]);
  return {
    code: types.join(''),
    name: infos.map((i) => i.ten).join(' – '),
    motto: infos.map((i) => i.motto).join(' · '),
    description: `Bạn là người kết hợp giữa ${infos[0].ngan}, ${infos[1].ngan} và ${infos[2].ngan}. Tổ hợp này giúp bạn vừa có nền tảng vững chắc, vừa linh hoạt trong học tập và làm việc — điều rất được săn đón trên thị trường lao động hiện nay.`,
    strengths: dedupe(infos.flatMap((i) => i.strengths)).slice(0, 6),
    weaknesses: dedupe(infos.flatMap((i) => i.weaknesses)).slice(0, 4),
    suitableMajors: dedupe(infos.flatMap((i) => i.suitableMajors)).slice(0, 6),
    suitableCareers: dedupe(infos.flatMap((i) => i.suitableCareers)).slice(0, 6),
    advice: dedupe(infos.flatMap((i) => i.advice)).slice(0, 4),
    quote: infos[0].quote,
  };
}

/** Sinh đầy đủ 20 tổ hợp Holland canonical (chọn 3 trong 6, theo thứ tự ưu tiên) */
function buildAllProfiles(): Record<string, CareerProfile> {
  const out: Record<string, CareerProfile> = {};
  for (let i = 0; i < PRIORITY.length - 2; i++) {
    for (let j = i + 1; j < PRIORITY.length - 1; j++) {
      for (let k = j + 1; k < PRIORITY.length; k++) {
        const combo: RIASECType[] = [PRIORITY[i], PRIORITY[j], PRIORITY[k]];
        const profile = mergeInfo(combo);
        out[profile.code] = profile;
      }
    }
  }
  return out;
}

export const CAREER_PROFILES: Record<string, CareerProfile> = buildAllProfiles();

export function getTopCode(scores: Record<RIASECType, number>): string {
  const sorted = [...PRIORITY].sort((a, b) => {
    const diff = scores[b] - scores[a];
    return diff !== 0 ? diff : PRIORITY.indexOf(a) - PRIORITY.indexOf(b);
  });
  const top3 = sorted.slice(0, 3) as RIASECType[];
  return top3.sort((a, b) => PRIORITY.indexOf(a) - PRIORITY.indexOf(b)).join('');
}

export function calculateScores(answers: Record<number, boolean>): Record<RIASECType, number> {
  const scores: Record<RIASECType, number> = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };

  CAREER_QUESTIONS.forEach((q) => {
    if (answers[q.id]) {
      scores[q.type]++;
    }
  });

  return scores;
}
