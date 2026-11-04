/**
 * Tướng học cơ bản — nội dung tham khảo.
 *
 * Chỉ gồm những khái niệm có nguồn gốc rõ ràng và phổ biến trong sách tướng
 * Việt/Trung: Tam đình, Ngũ nhạc, Ngũ quan, Tứ độc. Không đưa ra phán đoán
 * số mệnh cá nhân, không mô tả vị trí chi tiết dễ sai.
 */

export interface MucTuong {
  ten: string;
  han: string;
  moTa: string;
  yNghia: string;
}

export const TAM_DINH: MucTuong[] = [
  {
    ten: 'Thượng đình',
    han: '上停',
    moTa: 'Từ chân tóc đến lông mày.',
    yNghia:
      'Ứng với thời trẻ, trí tuệ và nền tảng gia đình. Thượng đình đầy đặn, rộng rãi thường được xem là có học và có hậu thuẫn.',
  },
  {
    ten: 'Trung đình',
    han: '中停',
    moTa: 'Từ lông mày đến đầu mũi.',
    yNghia:
      'Ứng với trung niên, sự nghiệp và ý chí. Trung đình cân đối, sống mũi thẳng thường được luận là làm việc có bản lĩnh.',
  },
  {
    ten: 'Hạ đình',
    han: '下停',
    moTa: 'Từ đầu mũi đến cằm.',
    yNghia:
      'Ứng với hậu vận, gia đạo và sức bền. Hạ đình tròn đầy, cằm chắc thường được xem là về già yên ổn.',
  },
];

export const NGU_NHAC: MucTuong[] = [
  { ten: 'Nam nhạc — Trán', han: '南嶽', moTa: 'Vùng trán.', yNghia: 'Xem nền tảng, học vấn và khí thế buổi đầu.' },
  { ten: 'Trung nhạc — Mũi', han: '中嶽', moTa: 'Sống mũi và đầu mũi.', yNghia: 'Xem tài lộc, sự nghiệp và bản lĩnh.' },
  { ten: 'Bắc nhạc — Cằm', han: '北嶽', moTa: 'Vùng cằm.', yNghia: 'Xem hậu vận, sức bền và con cháu.' },
  { ten: 'Đông nhạc — Má trái', han: '東嶽', moTa: 'Gò má bên trái.', yNghia: 'Xem quan hệ, anh em và sự nâng đỡ.' },
  { ten: 'Tây nhạc — Má phải', han: '西嶽', moTa: 'Gò má bên phải.', yNghia: 'Xem quan hệ, bạn bè và khả năng phối hợp.' },
];

export const NGU_QUAN: MucTuong[] = [
  {
    ten: 'Lông mày — Bảo thọ quan',
    han: '保壽官',
    moTa: 'Độ dày, dài và hướng của lông mày.',
    yNghia:
      'Luận về sức khoẻ, tính khí và anh chị em. Lông mày rậm, dài, ôm lấy mắt thường được xem là điểm tốt; quá mỏng hoặc đứt đoạn bị coi là dễ hao tổn.',
  },
  {
    ten: 'Mắt — Giám sát quan',
    han: '監察官',
    moTa: 'Thần khí, độ sáng và hình dáng mắt.',
    yNghia:
      'Luận về trí tuệ, tâm tính và sự quyết đoán. Mắt sáng, có thần thường được xem là thông minh, có chí; mắt đờ đẫn bị coi là thiếu nghị lực.',
  },
  {
    ten: 'Mũi — Thẩm biện quan',
    han: '審辨官',
    moTa: 'Sống mũi, đầu mũi và cánh mũi.',
    yNghia:
      'Luận về tài lộc và lòng tự trọng. Sống mũi thẳng, đầu mũi tròn đầy thường được xem là có của; mũi hếch hoặc lệch bị coi là khó giữ tiền.',
  },
  {
    ten: 'Miệng — Xuất nạp quan',
    han: '出納官',
    moTa: 'Độ rộng, môi và khoé miệng.',
    yNghia:
      'Luận về lời ăn tiếng nói, giao tiếp và phúc lộc. Miệng rộng, khoé miệng hướng lên thường được xem là dễ gần, có lộc ăn nói.',
  },
  {
    ten: 'Tai — Thái thính quan',
    han: '採聽官',
    moTa: 'Vành tai, độ dày và vị trí tai.',
    yNghia:
      'Luận về phúc thọ và khả năng lắng nghe. Tai dày, vành tai tròn, tai cao hơn lông mày thường được xem là có phúc.',
  },
];

export const TU_DOC: MucTuong[] = [
  { ten: 'Mắt', han: '眼', moTa: 'Phần lộ ra nhiều nhất của thần khí.', yNghia: 'Xem sự minh mẫn và ý chí.' },
  { ten: 'Mũi', han: '鼻', moTa: 'Trung tâm khuôn mặt.', yNghia: 'Xem tài lộc và bản lĩnh.' },
  { ten: 'Miệng', han: '口', moTa: 'Cửa ngõ giao tiếp.', yNghia: 'Xem lời nói và phúc ăn uống.' },
  { ten: 'Tai', han: '耳', moTa: 'Hai bên đầu.', yNghia: 'Xem sự lắng nghe và thọ khí.' },
];

export const LUU_Y_TUONG_SO = [
  'Tướng học dân gian không phải khoa học; cùng một nét mặt có thể được luận theo nhiều cách khác nhau tuỳ sách và thầy.',
  'Không nên dùng tướng mặt để đánh giá phẩm chất hay năng lực của một người.',
  'Các mục ở đây chỉ để tham khảo văn hoá, không thay thế tư vấn y tế, tâm lý hay pháp lý.',
];
