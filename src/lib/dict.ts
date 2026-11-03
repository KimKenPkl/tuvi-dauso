/**
 * Từ điển Hán → Việt cho toàn bộ thuật ngữ Tử Vi Đẩu Số.
 *
 * Engine `iztro` được gọi ở chế độ tiếng Trung (zh-CN) để lấy dữ liệu gốc,
 * sau đó mọi chuỗi được đi qua lớp này. Cách làm này đảm bảo thuật ngữ
 * tiếng Việt luôn đúng chuẩn, không phụ thuộc bản dịch máy của thư viện.
 */

/** 14 chính tinh + toàn bộ phụ tinh / tạp diệu / thần sát */
export const STAR_VI: Record<string, string> = {
  // ── 14 chính tinh ──────────────────────────────────────────────
  紫微: 'Tử Vi',
  天机: 'Thiên Cơ',
  太阳: 'Thái Dương',
  武曲: 'Vũ Khúc',
  天同: 'Thiên Đồng',
  廉贞: 'Liêm Trinh',
  天府: 'Thiên Phủ',
  太阴: 'Thái Âm',
  贪狼: 'Tham Lang',
  巨门: 'Cự Môn',
  天相: 'Thiên Tướng',
  天梁: 'Thiên Lương',
  七杀: 'Thất Sát',
  破军: 'Phá Quân',

  // ── Lục cát ───────────────────────────────────────────────────
  左辅: 'Tả Phù',
  右弼: 'Hữu Bật',
  文昌: 'Văn Xương',
  文曲: 'Văn Khúc',
  天魁: 'Thiên Khôi',
  天钺: 'Thiên Việt',

  // ── Lục sát ───────────────────────────────────────────────────
  擎羊: 'Kình Dương',
  陀罗: 'Đà La',
  火星: 'Hỏa Tinh',
  铃星: 'Linh Tinh',
  地空: 'Địa Không',
  地劫: 'Địa Kiếp',

  // ── Tứ hoá / Lộc Tồn / Thiên Mã ───────────────────────────────
  禄存: 'Lộc Tồn',
  天马: 'Thiên Mã',

  // ── Tạp diệu ──────────────────────────────────────────────────
  劫杀: 'Kiếp Sát',
  天空: 'Thiên Không',
  天刑: 'Thiên Hình',
  天姚: 'Thiên Diêu',
  解神: 'Giải Thần',
  阴煞: 'Âm Sát',
  天喜: 'Thiên Hỷ',
  天官: 'Thiên Quan',
  天福: 'Thiên Phúc',
  天哭: 'Thiên Khốc',
  天虚: 'Thiên Hư',
  龙池: 'Long Trì',
  凤阁: 'Phụng Các',
  红鸾: 'Hồng Loan',
  孤辰: 'Cô Thần',
  寡宿: 'Quả Tú',
  蜚廉: 'Phi Liêm',
  破碎: 'Phá Toái',
  台辅: 'Đài Phụ',
  封诰: 'Phong Cáo',
  天巫: 'Thiên Vu',
  天月: 'Thiên Nguyệt',
  三台: 'Tam Thai',
  八座: 'Bát Toạ',
  恩光: 'Ân Quang',
  天贵: 'Thiên Quý',
  天才: 'Thiên Tài',
  天寿: 'Thiên Thọ',
  截空: 'Triệt Không',
  旬中: 'Tuần Trung',
  旬空: 'Tuần Không',
  空亡: 'Không Vong',
  截路: 'Triệt Lộ',
  月德: 'Nguyệt Đức',
  天伤: 'Thiên Thương',
  天使: 'Thiên Sứ',
  天厨: 'Thiên Trù',

  // ── 12 Trường sinh ────────────────────────────────────────────
  长生: 'Trường Sinh',
  沐浴: 'Mộc Dục',
  冠带: 'Quan Đới',
  临官: 'Lâm Quan',
  帝旺: 'Đế Vượng',
  衰: 'Suy',
  病: 'Bệnh',
  死: 'Tử',
  墓: 'Mộ',
  绝: 'Tuyệt',
  胎: 'Thai',
  养: 'Dưỡng',

  // ── 12 Bác sĩ ─────────────────────────────────────────────────
  博士: 'Bác Sĩ',
  力士: 'Lực Sĩ',
  青龙: 'Thanh Long',
  小耗: 'Tiểu Hao',
  将军: 'Tướng Quân',
  奏书: 'Tấu Thư',
  飞廉: 'Phi Liêm',
  喜神: 'Hỷ Thần',
  病符: 'Bệnh Phù',
  大耗: 'Đại Hao',
  岁破: 'Tuế Phá',
  伏兵: 'Phục Binh',
  官府: 'Quan Phủ',
  岁建: 'Tuế Kiến',
  晦气: 'Hối Khí',
  丧门: 'Tang Môn',
  贯索: 'Quán Sách',
  官符: 'Quan Phù',
  龙德: 'Long Đức',
  白虎: 'Bạch Hổ',
  天德: 'Thiên Đức',
  吊客: 'Điếu Khách',

  // ── 12 Tướng tinh ─────────────────────────────────────────────
  将星: 'Tướng Tinh',
  攀鞍: 'Phan Án',
  岁驿: 'Tuế Dịch',
  息神: 'Tức Thần',
  华盖: 'Hoa Cái',
  劫煞: 'Kiếp Sát',
  灾煞: 'Tai Sát',
  天煞: 'Thiên Sát',
  指背: 'Chỉ Bối',
  咸池: 'Hàm Trì',
  月煞: 'Nguyệt Sát',
  亡神: 'Vong Thần',

  // ── Sao lưu theo Đại hạn ──────────────────────────────────────
  运魁: 'Vận Khôi',
  运钺: 'Vận Việt',
  运昌: 'Vận Xương',
  运曲: 'Vận Khúc',
  运鸾: 'Vận Loan',
  运喜: 'Vận Hỷ',
  运禄: 'Vận Lộc',
  运羊: 'Vận Dương',
  运陀: 'Vận Đà',
  运马: 'Vận Mã',

  // ── Sao lưu theo Lưu niên ─────────────────────────────────────
  流魁: 'Lưu Khôi',
  流钺: 'Lưu Việt',
  流昌: 'Lưu Xương',
  流曲: 'Lưu Khúc',
  流鸾: 'Lưu Loan',
  流喜: 'Lưu Hỷ',
  流禄: 'Lưu Lộc',
  流羊: 'Lưu Dương',
  流陀: 'Lưu Đà',
  流马: 'Lưu Mã',
  年解: 'Niên Giải',

  // ── Sao lưu theo Nguyệt / Nhật / Thời ─────────────────────────
  月魁: 'Nguyệt Khôi',
  月钺: 'Nguyệt Việt',
  月昌: 'Nguyệt Xương',
  月曲: 'Nguyệt Khúc',
  月鸾: 'Nguyệt Loan',
  月喜: 'Nguyệt Hỷ',
  月禄: 'Nguyệt Lộc',
  月羊: 'Nguyệt Dương',
  月陀: 'Nguyệt Đà',
  月马: 'Nguyệt Mã',
  日魁: 'Nhật Khôi',
  日钺: 'Nhật Việt',
  日昌: 'Nhật Xương',
  日曲: 'Nhật Khúc',
  日鸾: 'Nhật Loan',
  日喜: 'Nhật Hỷ',
  日禄: 'Nhật Lộc',
  日羊: 'Nhật Dương',
  日陀: 'Nhật Đà',
  日马: 'Nhật Mã',
  时魁: 'Thời Khôi',
  时钺: 'Thời Việt',
  时昌: 'Thời Xương',
  时曲: 'Thời Khúc',
  时鸾: 'Thời Loan',
  时喜: 'Thời Hỷ',
  时禄: 'Thời Lộc',
  时羊: 'Thời Dương',
  时陀: 'Thời Đà',
  时马: 'Thời Mã',
};

/** 12 cung */
export const PALACE_VI: Record<string, string> = {
  命宫: 'Mệnh',
  身宫: 'Thân',
  兄弟: 'Huynh Đệ',
  夫妻: 'Phu Thê',
  子女: 'Tử Nữ',
  财帛: 'Tài Bạch',
  疾厄: 'Tật Ách',
  迁移: 'Thiên Di',
  仆役: 'Nô Bộc',
  官禄: 'Quan Lộc',
  田宅: 'Điền Trạch',
  福德: 'Phúc Đức',
  父母: 'Phụ Mẫu',
  来因: 'Lai Nhân',
};

/** Độ sáng của sao */
export const BRIGHTNESS_VI: Record<string, string> = {
  庙: 'Miếu',
  旺: 'Vượng',
  得: 'Đắc',
  利: 'Lợi',
  平: 'Bình',
  不: 'Bất',
  陷: 'Hãm',
};

/** Tứ hoá */
export const MUTAGEN_VI: Record<string, string> = {
  禄: 'Lộc',
  权: 'Quyền',
  科: 'Khoa',
  忌: 'Kỵ',
};

/** Ngũ hành cục */
export const FIVE_ELEMENTS_VI: Record<string, string> = {
  水二局: 'Thủy Nhị Cục',
  木三局: 'Mộc Tam Cục',
  金四局: 'Kim Tứ Cục',
  土五局: 'Thổ Ngũ Cục',
  火六局: 'Hỏa Lục Cục',
};

/** Thiên can */
export const STEM_VI: Record<string, string> = {
  甲: 'Giáp',
  乙: 'Ất',
  丙: 'Bính',
  丁: 'Đinh',
  戊: 'Mậu',
  己: 'Kỷ',
  庚: 'Canh',
  辛: 'Tân',
  壬: 'Nhâm',
  癸: 'Quý',
};

/** Địa chi */
export const BRANCH_VI: Record<string, string> = {
  子: 'Tý',
  丑: 'Sửu',
  寅: 'Dần',
  卯: 'Mão',
  辰: 'Thìn',
  巳: 'Tỵ',
  午: 'Ngọ',
  未: 'Mùi',
  申: 'Thân',
  酉: 'Dậu',
  戌: 'Tuất',
  亥: 'Hợi',
};

/** Con giáp */
export const ZODIAC_VI: Record<string, string> = {
  鼠: 'Chuột',
  牛: 'Trâu',
  虎: 'Hổ',
  兔: 'Mèo',
  龙: 'Rồng',
  蛇: 'Rắn',
  马: 'Ngựa',
  羊: 'Dê',
  猴: 'Khỉ',
  鸡: 'Gà',
  狗: 'Chó',
  猪: 'Lợn',
};

/** Cung hoàng đạo phương Tây */
export const SIGN_VI: Record<string, string> = {
  白羊座: 'Bạch Dương',
  金牛座: 'Kim Ngưu',
  双子座: 'Song Tử',
  巨蟹座: 'Cự Giải',
  狮子座: 'Sư Tử',
  处女座: 'Xử Nữ',
  天秤座: 'Thiên Bình',
  天蝎座: 'Thiên Yết',
  射手座: 'Nhân Mã',
  摩羯座: 'Ma Kết',
  水瓶座: 'Bảo Bình',
  双鱼座: 'Song Ngư',
};

/** Tra cứu an toàn: giữ nguyên gốc nếu chưa có trong từ điển */
export function vi(map: Record<string, string>, key: string | undefined | null): string {
  if (!key) return '';
  return map[key] ?? key;
}

export const starVi = (k?: string | null) => vi(STAR_VI, k);
export const palaceVi = (k?: string | null) => vi(PALACE_VI, k);
export const brightnessVi = (k?: string | null) => vi(BRIGHTNESS_VI, k);
export const mutagenVi = (k?: string | null) => vi(MUTAGEN_VI, k);
export const stemVi = (k?: string | null) => vi(STEM_VI, k);
export const branchVi = (k?: string | null) => vi(BRANCH_VI, k);

/** 13 khung giờ sinh (timeIndex 0..12 của iztro) */
export interface GioSinh {
  index: number;
  ten: string;
  khoang: string;
  branch: string;
}

export const GIO_SINH: GioSinh[] = [
  { index: 0, ten: 'Tý (sớm)', khoang: '00:00 – 01:00', branch: 'Tý' },
  { index: 1, ten: 'Sửu', khoang: '01:00 – 03:00', branch: 'Sửu' },
  { index: 2, ten: 'Dần', khoang: '03:00 – 05:00', branch: 'Dần' },
  { index: 3, ten: 'Mão', khoang: '05:00 – 07:00', branch: 'Mão' },
  { index: 4, ten: 'Thìn', khoang: '07:00 – 09:00', branch: 'Thìn' },
  { index: 5, ten: 'Tỵ', khoang: '09:00 – 11:00', branch: 'Tỵ' },
  { index: 6, ten: 'Ngọ', khoang: '11:00 – 13:00', branch: 'Ngọ' },
  { index: 7, ten: 'Mùi', khoang: '13:00 – 15:00', branch: 'Mùi' },
  { index: 8, ten: 'Thân', khoang: '15:00 – 17:00', branch: 'Thân' },
  { index: 9, ten: 'Dậu', khoang: '17:00 – 19:00', branch: 'Dậu' },
  { index: 10, ten: 'Tuất', khoang: '19:00 – 21:00', branch: 'Tuất' },
  { index: 11, ten: 'Hợi', khoang: '21:00 – 23:00', branch: 'Hợi' },
  { index: 12, ten: 'Tý (muộn)', khoang: '23:00 – 24:00', branch: 'Tý' },
];

/** Đổi giờ:phút → timeIndex */
export function gioSangIndex(hour: number, minute = 0): number {
  const h = hour + minute / 60;
  if (h >= 23) return 12; // Tý muộn
  if (h < 1) return 0; // Tý sớm
  return Math.floor((h + 1) / 2);
}

export const indexSangGio = (i: number): GioSinh => GIO_SINH[i] ?? GIO_SINH[0];
