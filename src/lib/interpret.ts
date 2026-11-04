/**
 * Sinh luận giải tiếng Việt từ dữ liệu lá số.
 *
 * Nguyên tắc:
 *  - Chỉ nhận định dựa trên dữ liệu thực có trong lá số (chính tinh, độ sáng,
 *    tứ hoá, bộ sao, tam phương tứ chính, Thân cư). Không bịa thêm sao.
 *  - Mỗi mục đều kèm "Căn cứ" để người đọc tự kiểm chứng, và một câu hỏi
 *    tự đối chiếu thay vì phán định.
 *  - Không hù doạ, không hứa hẹn kết quả tuyệt đối.
 */

import {
  CACH_CUC,
  CHINH_TINH,
  NGU_HANH,
  PHU_TINH_INFO,
  cungInfo,
  type CachCuc,
} from './content';
import {
  cungTheoTen,
  tamPhuongTuChinh,
  tuHoa,
  vanHan,
  type Cung,
  type LaSo,
  type Sao,
} from './chart';

export interface MucLuanGiai {
  tieuDe: string;
  noiDung: string;
  /** Vì sao có nhận định này — liệt kê đúng sao/cung đã dùng. */
  canCu?: string;
  /** Câu hỏi để người đọc tự đối chiếu với trải nghiệm của mình. */
  hoi?: string;
}

export interface BoSao {
  ten: string;
  sao: string[];
  yNghia: string;
  mucDo: 'thuận' | 'trung tính' | 'cần lưu ý';
}

export interface TuHoaNhapCung {
  hoa: string;
  sao: string;
  cung: string;
  yNghia: string;
}

export interface CungTomTat {
  ten: string;
  chi: string;
  chinhTinh: string;
  phuTinh: string;
  nhanXet: string;
  mucDo: 'thuận' | 'trung tính' | 'cần lưu ý';
}

export interface LuanGiai {
  tomTat: {
    menh: string;
    thanCu: string;
    amDuong: string;
    cauChot: string;
  };
  tongQuan: MucLuanGiai[];
  tinhCach: MucLuanGiai[];
  suNghiep: MucLuanGiai[];
  taiLoc: MucLuanGiai[];
  tinhCam: MucLuanGiai[];
  sucKhoe: MucLuanGiai[];
  boSao: BoSao[];
  muoiHaiCung: CungTomTat[];
  tuHoaCung: TuHoaNhapCung[];
  cachCuc: { ten: string; yNghia: string; mucDo: CachCuc['mucDo'] }[];
  vanHan: MucLuanGiai[];
  cauHoi: string[];
  loiKhuyen: string[];
}

// ─────────────────────────────────────────────────────────────────
// Tiện ích
// ─────────────────────────────────────────────────────────────────

const tenSao = (s: Sao[]) => s.map((x) => x.ten);

const moTaDoSang = (s: Sao): string => {
  if (!s.doSang) return '';
  switch (s.doSang) {
    case 'Miếu':
      return 'nhập Miếu — phát huy tối đa mặt tốt';
    case 'Vượng':
      return 'nhập Vượng — mạnh mẽ, thuận lợi';
    case 'Đắc':
      return 'nhập Đắc — khá tốt, cần thêm trợ lực';
    case 'Lợi':
      return 'ở mức Lợi — trung bình, tuỳ cách dùng';
    case 'Bình':
      return 'ở mức Bình — trung tính';
    case 'Bất':
      return 'ở mức Bất — hơi yếu';
    case 'Hãm':
      return 'nhập Hãm — mặt mạnh bị giảm, cần bù đắp bằng nỗ lực';
    default:
      return '';
  }
};

const gomSao = (cungs: Cung[]): string[] => {
  const out = new Set<string>();
  for (const c of cungs) {
    for (const s of [...c.chinhTinh, ...c.phuTinh, ...c.tapTinh]) out.add(s.ten);
  }
  return [...out];
};

const moTaTuHoa = (hot: string, sao: string): string => {
  switch (hot) {
    case 'Lộc':
      return `${sao} hoá Lộc — mở ra nguồn lợi, cơ hội tài chính và sự thuận lợi tự nhiên.`;
    case 'Quyền':
      return `${sao} hoá Quyền — tăng quyền chủ động, khả năng quyết định và vị thế.`;
    case 'Khoa':
      return `${sao} hoá Khoa — tăng danh tiếng, học vấn, sự công nhận và may mắn trong thi cử, giấy tờ.`;
    case 'Kỵ':
      return `${sao} hoá Kỵ — điểm cần lưu tâm: dễ vướng mắc, hiểu lầm hoặc chậm trễ ở lĩnh vực liên quan.`;
    default:
      return '';
  }
};

/** Tìm một sao theo tên trong toàn lá số, kèm cung chứa nó. */
function timSao(ls: LaSo, ten: string): { sao: Sao; cung: Cung } | null {
  for (const c of ls.cung) {
    const s = [...c.chinhTinh, ...c.phuTinh, ...c.tapTinh].find((x) => x.ten === ten);
    if (s) return { sao: s, cung: c };
  }
  return null;
}

const CAT_TINH = [
  'Tả Phù',
  'Hữu Bật',
  'Văn Xương',
  'Văn Khúc',
  'Thiên Khôi',
  'Thiên Việt',
  'Lộc Tồn',
  'Thiên Mã',
  'Long Trì',
  'Phụng Các',
  'Ân Quang',
  'Thiên Quý',
  'Tam Thai',
  'Bát Toạ',
  'Thiên Quan',
  'Thiên Phúc',
  'Thiên Tài',
  'Thiên Thọ',
  'Thiên Hỷ',
  'Hồng Loan',
];

const SAT_TINH = [
  'Kình Dương',
  'Đà La',
  'Hỏa Tinh',
  'Linh Tinh',
  'Địa Không',
  'Địa Kiếp',
  'Thiên Hình',
  'Thiên Diêu',
  'Âm Sát',
  'Kiếp Sát',
  'Phá Toái',
  'Cô Thần',
  'Quả Tú',
  'Thiên Khốc',
  'Thiên Hư',
  'Đại Hao',
  'Tiểu Hao',
  'Tuần Không',
  'Triệt Không',
];

const demCatSat = (cungs: Cung[]) => {
  const ds = gomSao(cungs);
  return {
    cat: ds.filter((s) => CAT_TINH.includes(s)),
    sat: ds.filter((s) => SAT_TINH.includes(s)),
  };
};

// ─────────────────────────────────────────────────────────────────
// Tứ hoá nhập cung
// ─────────────────────────────────────────────────────────────────

/** Lĩnh vực của từng cung, dùng để viết câu "hoá Lộc nhập ..." cho tự nhiên. */
const LINH_VUC_HOA: Record<string, string> = {
  Mệnh: 'bản thân và con đường đời',
  'Huynh Đệ': 'anh chị em và bạn ngang hàng',
  'Phu Thê': 'hôn nhân và bạn đời',
  'Tử Nữ': 'con cái và người kế nghiệp',
  'Tài Bạch': 'tiền bạc và cách kiếm tiền',
  'Tật Ách': 'sức khoẻ và thể chất',
  'Thiên Di': 'ra ngoài, đi xa và quan hệ xã hội',
  'Nô Bộc': 'nhân viên, cấp dưới và đối tác',
  'Quan Lộc': 'sự nghiệp và vị trí công việc',
  'Điền Trạch': 'nhà cửa và tài sản cố định',
  'Phúc Đức': 'phúc khí, tinh thần và họ hàng',
  'Phụ Mẫu': 'cha mẹ, người trên và bằng cấp',
};

function luanTuHoaNhapCung(ls: LaSo): TuHoaNhapCung[] {
  const out: TuHoaNhapCung[] = [];
  let ds: { sao: string; hoa: string }[] = [];
  try {
    ds = tuHoa(ls).goc;
  } catch {
    return out;
  }
  for (const item of ds) {
    const found = timSao(ls, item.sao);
    if (!found) continue;
    const lv = LINH_VUC_HOA[found.cung.ten] ?? 'lĩnh vực tương ứng';
    let yNghia = '';
    switch (item.hoa) {
      case 'Lộc':
        yNghia = `Dòng tiền và cơ hội dễ đến qua ${lv}. Đây là cửa nên đầu tư thời gian nhất, vì lực đẩy tự nhiên nằm ở đó.`;
        break;
      case 'Quyền':
        yNghia = `Bạn có xu hướng nắm quyền chủ động ở ${lv}. Càng đứng ra chịu trách nhiệm, càng dễ được giao việc lớn — nhưng cũng dễ ôm quá nhiều.`;
        break;
      case 'Khoa':
        yNghia = `Danh tiếng và sự công nhận đến từ ${lv}. Đây là chỗ nên xây hồ sơ, bằng cấp, sản phẩm có tên mình.`;
        break;
      case 'Kỵ':
        yNghia = `Điểm nghẽn nằm ở ${lv}: dễ hiểu lầm, chậm trễ hoặc phải làm lại. Biết trước để giữ giấy tờ rõ ràng và nói chuyện thẳng thắn hơn.`;
        break;
      default:
        yNghia = `${item.sao} hoá ${item.hoa} nhập cung ${found.cung.ten}.`;
    }
    out.push({
      hoa: item.hoa,
      sao: item.sao,
      cung: found.cung.ten,
      yNghia,
    });
  }
  return out;
}

// ─────────────────────────────────────────────────────────────────
// Bộ sao — đọc theo cụm, không đọc từng sao rời
// ─────────────────────────────────────────────────────────────────

interface BoSaoDinhNghia {
  ten: string;
  sao: string[];
  /** Số sao tối thiểu để coi là "có bộ" */
  toiThieu: number;
  yNghia: string;
  mucDo: BoSao['mucDo'];
}

const BO_SAO: BoSaoDinhNghia[] = [
  {
    ten: 'Tử Phủ Vũ Tướng',
    sao: ['Tử Vi', 'Thiên Phủ', 'Vũ Khúc', 'Thiên Tướng'],
    toiThieu: 3,
    yNghia:
      'Bộ sao của người quản trị và giữ của: coi trọng cấu trúc, sổ sách, uy tín. Hợp với vận hành, tài chính, hành chính, quản lý quy mô vừa và lớn. Điểm trừ là dễ bảo thủ khi đã ổn định.',
    mucDo: 'thuận',
  },
  {
    ten: 'Cơ Nguyệt Đồng Lương',
    sao: ['Thiên Cơ', 'Thái Âm', 'Thiên Đồng', 'Thiên Lương'],
    toiThieu: 3,
    yNghia:
      'Bộ sao của người làm chuyên môn sâu: giỏi tích luỹ, thích nghi chậm nhưng chắc. Hợp giáo dục, y tế, nghiên cứu, kỹ thuật, văn hoá. Thành tựu thường đến sau tuổi 30 và bền hơn người nổi sớm.',
    mucDo: 'thuận',
  },
  {
    ten: 'Sát Phá Lang',
    sao: ['Thất Sát', 'Phá Quân', 'Tham Lang'],
    toiThieu: 2,
    yNghia:
      'Bộ sao tiên phong: dám mở đường, chấp nhận rủi ro, học nhanh từ thất bại. Hợp khởi nghiệp, kinh doanh, thị trường mới. Cái giá là cuộc đời nhiều đoạn rẽ và dễ mất kiên nhẫn giữa đường.',
    mucDo: 'trung tính',
  },
  {
    ten: 'Nhật Nguyệt đồng chiếu',
    sao: ['Thái Dương', 'Thái Âm'],
    toiThieu: 2,
    yNghia:
      'Hai sao sáng cùng chiếu: bạn có cả mặt lý trí và mặt cảm xúc, dễ làm cầu nối giữa hai nhóm người khác nhau. Nếu một sáng một mờ, phần đó sẽ chi phối cách bạn ra quyết định.',
    mucDo: 'thuận',
  },
  {
    ten: 'Cự Nhật',
    sao: ['Cự Môn', 'Thái Dương'],
    toiThieu: 2,
    yNghia:
      'Cái miệng đi cùng ánh sáng: nói có trọng lượng, hợp giảng dạy, ngoại giao, truyền thông, tư vấn. Cùng một câu nói có thể mở cửa hoặc đóng cửa — tuỳ thời điểm.',
    mucDo: 'thuận',
  },
  {
    ten: 'Liêm Tướng',
    sao: ['Liêm Trinh', 'Thiên Tướng'],
    toiThieu: 2,
    yNghia:
      'Bộ sao của người có nguyên tắc và gu hành xử: mạnh ở vai trò trung gian, giám sát, tuân thủ. Dễ bị kẹt khi phải chọn phe vì sợ mất tính công bằng.',
    mucDo: 'thuận',
  },
  {
    ten: 'Vũ Tham',
    sao: ['Vũ Khúc', 'Tham Lang'],
    toiThieu: 2,
    yNghia:
      'Tay làm ra tiền gặp lòng ham muốn: động cơ kiếm tiền mạnh, dám thử nhiều nguồn thu. Cần một giới hạn chi tiêu viết ra giấy, nếu không tiền vào bao nhiêu cũng hết.',
    mucDo: 'trung tính',
  },
  {
    ten: 'Lộc Mã giao trì',
    sao: ['Lộc Tồn', 'Thiên Mã'],
    toiThieu: 2,
    yNghia:
      'Tiền gắn với sự dịch chuyển: đi xa, đổi chỗ, làm việc với nơi khác mới có lộc. Ngồi yên một chỗ quá lâu dễ thấy bí.',
    mucDo: 'thuận',
  },
  {
    ten: 'Tả Hữu',
    sao: ['Tả Phù', 'Hữu Bật'],
    toiThieu: 2,
    yNghia:
      'Hai tay trợ lực: làm việc nhóm tốt hơn làm một mình, dễ có người đỡ khi khó. Nên chủ động xây đội thay vì cố tự làm hết.',
    mucDo: 'thuận',
  },
  {
    ten: 'Xương Khúc',
    sao: ['Văn Xương', 'Văn Khúc'],
    toiThieu: 2,
    yNghia:
      'Bộ sao học vấn và biểu đạt: viết, nói, thi cử, sáng tạo nội dung. Đây là lợi thế nên dùng làm nghề phụ hoặc thương hiệu cá nhân.',
    mucDo: 'thuận',
  },
  {
    ten: 'Khôi Việt',
    sao: ['Thiên Khôi', 'Thiên Việt'],
    toiThieu: 2,
    yNghia:
      'Hai quý nhân một nam một nữ: nhiều lần được giới thiệu, nâng đỡ đúng lúc. Cần chủ động giữ liên lạc, vì quý nhân chỉ đến khi bạn còn trong vòng kết nối.',
    mucDo: 'thuận',
  },
  {
    ten: 'Không Kiếp',
    sao: ['Địa Không', 'Địa Kiếp'],
    toiThieu: 2,
    yNghia:
      'Cặp sao của sự đứt gãy và tư duy vượt khung: dễ mất tiền đột ngột nhưng cũng dễ nghĩ ra thứ người khác không nghĩ. Quy tắc an toàn: không dồn quá 20% tài sản vào một canh bạc.',
    mucDo: 'cần lưu ý',
  },
  {
    ten: 'Kình Đà',
    sao: ['Kình Dương', 'Đà La'],
    toiThieu: 2,
    yNghia:
      'Hai thanh gươm kéo chậm: việc gì cũng phải làm hai lần hoặc kéo dài hơn dự kiến. Bù lại là sức bền và khả năng chịu áp lực cao hơn người thường.',
    mucDo: 'cần lưu ý',
  },
  {
    ten: 'Hỏa Linh',
    sao: ['Hỏa Tinh', 'Linh Tinh'],
    toiThieu: 2,
    yNghia:
      'Lửa nóng và lửa âm ỉ: phản ứng nhanh, quyết liệt, dễ bùng nổ rồi tự tiếc. Nên có một quy tắc "chờ 24 giờ" trước khi trả lời những việc quan trọng.',
    mucDo: 'cần lưu ý',
  },
  {
    ten: 'Tứ linh',
    sao: ['Long Trì', 'Phụng Các', 'Hồng Loan', 'Thiên Hỷ'],
    toiThieu: 3,
    yNghia:
      'Bộ sao của duyên và thẩm mỹ: dễ tạo thiện cảm, hợp nghề cần hình ảnh và quan hệ. Chuyện tình cảm thường đến qua môi trường đông người.',
    mucDo: 'thuận',
  },
  {
    ten: 'Hình Riêu',
    sao: ['Thiên Hình', 'Thiên Diêu'],
    toiThieu: 2,
    yNghia:
      'Cặp sao dễ vướng chuyện giấy tờ, pháp lý hoặc hiểu lầm trong quan hệ. Cách hoá giải thực dụng: mọi thoả thuận quan trọng đều viết thành văn bản.',
    mucDo: 'cần lưu ý',
  },
  {
    ten: 'Khốc Hư',
    sao: ['Thiên Khốc', 'Thiên Hư'],
    toiThieu: 2,
    yNghia:
      'Cảm xúc sâu và dễ tổn thương: buồn nhanh, vui cũng nhanh. Hợp nghệ thuật, viết lách, công việc cần sự đồng cảm; cần tránh quyết định lớn lúc đang buồn.',
    mucDo: 'trung tính',
  },
  {
    ten: 'Tang Hổ',
    sao: ['Tang Môn', 'Bạch Hổ'],
    toiThieu: 2,
    yNghia:
      'Bộ sao của việc nặng và mất mát: dễ phải lo tang sự, giấy tờ thừa kế hoặc trách nhiệm với người lớn tuổi. Nhìn trước để chuẩn bị, không phải để sợ.',
    mucDo: 'cần lưu ý',
  },
];

function timBoSao(ls: LaSo): BoSao[] {
  const menh = cungTheoTen(ls, 'Mệnh');
  if (!menh) return [];
  const ds = gomSao(tamPhuongTuChinh(ls.cung, menh));
  return BO_SAO.filter((b) => b.sao.filter((s) => ds.includes(s)).length >= b.toiThieu).map((b) => ({
    ten: b.ten,
    sao: b.sao.filter((s) => ds.includes(s)),
    yNghia: b.yNghia,
    mucDo: b.mucDo,
  }));
}

// ─────────────────────────────────────────────────────────────────
// Cách cục
// ─────────────────────────────────────────────────────────────────

function timCachCuc(ls: LaSo): LuanGiai['cachCuc'] {
  const menh = cungTheoTen(ls, 'Mệnh');
  if (!menh) return [];
  const tamPhuong = tamPhuongTuChinh(ls.cung, menh);
  const tatCaSao = gomSao(tamPhuong);
  const chinhTinhMenh = tenSao(menh.chinhTinh);

  return CACH_CUC.filter((cc) => {
    try {
      return cc.dieuKien(tatCaSao, chinhTinhMenh);
    } catch {
      return false;
    }
  }).map((cc) => ({ ten: cc.ten, yNghia: cc.yNghia, mucDo: cc.mucDo }));
}

// ─────────────────────────────────────────────────────────────────
// 12 cung — bảng đọc nhanh
// ─────────────────────────────────────────────────────────────────

function tomTatCung(ls: LaSo, cung: Cung): CungTomTat {
  const info = cungInfo(cung.ten);
  const { cat, sat } = demCatSat([cung]);
  const phu = cung.phuTinh.filter((s) => PHU_TINH_INFO[s.ten]).slice(0, 4);
  const chinh = cung.chinhTinh
    .map((s) => `${s.ten}${s.doSang ? ` (${s.doSang})` : ''}${s.tuHoa ? ` [${s.tuHoa}]` : ''}`)
    .join(', ');

  let nhanXet: string;
  let mucDo: CungTomTat['mucDo'];

  if (cung.chinhTinh.length) {
    const manh = cung.chinhTinh.some((s) => ['Miếu', 'Vượng', 'Đắc'].includes(s.doSang ?? ''));
    const yeu = cung.chinhTinh.some((s) => ['Hãm', 'Bất'].includes(s.doSang ?? ''));
    const first = CHINH_TINH[cung.chinhTinh[0].ten];
    nhanXet =
      `${info?.linhVuc ?? cung.ten}. ` +
      (first ? `${first.chuQuan}. ` : '') +
      (manh
        ? 'Chính tinh đắc địa nên phần việc này khá thuận, ít phải gồng.'
        : yeu
          ? 'Chính tinh hãm địa nên đây là vùng phải chủ động bù đắp, không nên thả trôi.'
          : 'Chính tinh ở mức trung bình, kết quả phụ thuộc khá nhiều vào cách làm.');
    mucDo = manh ? 'thuận' : yeu ? 'cần lưu ý' : 'trung tính';
  } else {
    nhanXet = `${info?.linhVuc ?? cung.ten}. Không có chính tinh: phần việc này chịu ảnh hưởng từ cung xung chiếu và từ hoàn cảnh nhiều hơn từ ý chí cá nhân.`;
    mucDo = 'trung tính';
  }

  if (sat.length && mucDo === 'thuận') {
    nhanXet += ` Có ${sat.join(', ')} nên vẫn có chỗ gợn, đừng chủ quan.`;
  } else if (sat.length) {
    nhanXet += ` Điểm cần chú ý: ${sat.join(', ')}.`;
  }
  if (cat.length) {
    nhanXet += ` Trợ lực: ${cat.join(', ')}.`;
  }

  return {
    ten: cung.ten,
    chi: cung.chi,
    chinhTinh: chinh || 'Vô chính diệu',
    phuTinh: phu.map((s) => s.ten).join(', ') || '—',
    nhanXet,
    mucDo,
  };
}

// ─────────────────────────────────────────────────────────────────
// Thân cư, âm dương
// ─────────────────────────────────────────────────────────────────

const THAN_CU: Record<string, { noiDung: string; hoi: string }> = {
  Mệnh: {
    noiDung:
      'Thân cư Mệnh: hậu vận gắn chặt với chính mình. Càng về sau, thành bại càng ít phụ thuộc hoàn cảnh và càng phụ thuộc vào năng lực tự xây. Đây là cách của người tự lập, khó dựa vào ai lâu dài.',
    hoi: 'Khi mọi lựa chọn đều do bạn quyết, bạn có thấy mình dễ tự tạo áp lực không?',
  },
  'Phu Thê': {
    noiDung:
      'Thân cư Phu Thê: hậu vận xoay quanh bạn đời. Chọn đúng người thì nửa sau cuộc đời nhẹ đi rõ rệt; chọn sai thì mất nhiều năm để sửa. Đây là lý do nên chậm mà chắc trong hôn nhân.',
    hoi: 'Tiêu chuẩn chọn bạn đời của bạn hiện nay là do bạn tự đặt ra hay do người khác áp vào?',
  },
  'Quan Lộc': {
    noiDung:
      'Thân cư Quan Lộc: hậu vận gắn với sự nghiệp. Công việc không chỉ là phương tiện kiếm sống mà là nơi định hình giá trị bản thân. Giai đoạn sau tuổi 30, công việc sẽ chi phối phần lớn nhịp sống.',
    hoi: 'Nếu phải chọn giữa công việc ổn định và công việc có ý nghĩa, bạn nghiêng về đâu?',
  },
  'Tài Bạch': {
    noiDung:
      'Thân cư Tài Bạch: hậu vận gắn với tiền bạc và khả năng kiếm sống. Bạn thấy an tâm khi có tích luỹ, và dễ bất an khi tài chính không rõ ràng. Quản lý tiền là kỹ năng sống còn với bạn.',
    hoi: 'Mức dự phòng hiện tại của bạn đủ cho bao nhiêu tháng chi tiêu?',
  },
  'Thiên Di': {
    noiDung:
      'Thân cư Thiên Di: hậu vận gắn với ra ngoài. Càng đi xa, càng đổi môi trường, càng dễ gặp cơ hội. Ở yên một chỗ quá lâu thường thấy bí hơn mức cần thiết.',
    hoi: 'Lần cuối bạn chủ động thay đổi môi trường sống hoặc làm việc là khi nào?',
  },
  'Phúc Đức': {
    noiDung:
      'Thân cư Phúc Đức: hậu vận gắn với phúc khí và tinh thần. Bạn sống được nhờ nền tảng gia đình, sức khoẻ tinh thần và sự an tâm hơn là nhờ tranh đua. Coi trọng việc giữ tâm trí nhẹ hơn là chạy theo thành tích.',
    hoi: 'Điều gì đang lấy đi sự an tâm của bạn nhiều nhất hiện tại?',
  },
};

function amDuong(ls: LaSo): { nhanXet: string; thuanLy: boolean } {
  const can = ls.tuTru?.[0]?.can ?? '';
  const duongCan = ['Giáp', 'Bính', 'Mậu', 'Canh', 'Nhâm'].includes(can);
  const nam = ls.gioiTinh === 'Nam';
  const thuanLy = (duongCan && nam) || (!duongCan && !nam);
  return {
    thuanLy,
    nhanXet: thuanLy
      ? `Can năm ${can}, ${nam ? 'nam' : 'nữ'} mệnh: dương nam / âm nữ — thuận lý. Cách này thường cho người đi đúng nhịp với hoàn cảnh, ít phải sống ngược với bản chất.`
      : `Can năm ${can}, ${nam ? 'nam' : 'nữ'} mệnh: âm nam / dương nữ — nghịch lý. Cách này thường cho người phải nỗ lực nhiều hơn để đạt cùng kết quả, nhưng bù lại hiểu mình sớm và chịu được nghịch cảnh.`,
  };
}

// ─────────────────────────────────────────────────────────────────
// Câu chốt theo chính tinh thủ Mệnh
// ─────────────────────────────────────────────────────────────────

const CAU_CHOT: Record<string, string> = {
  'Tử Vi': 'Uy tín là vốn; học cách chia việc trước khi quá muộn.',
  'Thiên Cơ': 'Trí tuệ là lợi thế; đừng để tính toán thay cho quyết định.',
  'Thái Dương': 'Toả sáng bằng việc làm; đừng cạn năng lượng vì phải chứng minh.',
  'Vũ Khúc': 'Tay làm ra tiền; kỷ luật là bạn đồng hành.',
  'Thiên Đồng': 'An nhàn là phúc; nhưng cần một việc đủ khó để neo mình.',
  'Liêm Trinh': 'Nguyên tắc tạo uy; mềm mỏng giữ được đường dài.',
  'Thiên Phủ': 'Kho lẫm vững; đừng biến an toàn thành bảo thủ.',
  'Thái Âm': 'Tinh tế là sức mạnh; cần người hiểu mới phát huy hết.',
  'Tham Lang': 'Ham muốn là động cơ; chọn đúng thứ để ham.',
  'Cự Môn': 'Cái miệng mở cửa; cũng có thể đóng cửa.',
  'Thiên Tướng': 'Đứng giữa thì phải công bằng; chọn phe thì mất uy.',
  'Thiên Lương': 'Già dặn trước tuổi; đừng gánh việc của người khác.',
  'Thất Sát': 'Dám làm là lợi thế; cần người giữ nhịp.',
  'Phá Quân': 'Phá để xây; nhưng phải biết điểm dừng.',
};

// ─────────────────────────────────────────────────────────────────
// Luận tổng thể
// ─────────────────────────────────────────────────────────────────

export function luanGiai(ls: LaSo, namXem?: number): LuanGiai {
  const menh = cungTheoTen(ls, 'Mệnh');
  const quan = cungTheoTen(ls, 'Quan Lộc');
  const tai = cungTheoTen(ls, 'Tài Bạch');
  const phuThe = cungTheoTen(ls, 'Phu Thê');
  const tatAch = cungTheoTen(ls, 'Tật Ách');
  const phucDuc = cungTheoTen(ls, 'Phúc Đức');

  const chinhTinhMenh = menh?.chinhTinh.map((s) => s.ten) ?? [];
  const tenChinhMenh = chinhTinhMenh.length ? chinhTinhMenh.join(' — ') : 'Vô chính diệu';
  const ad = amDuong(ls);
  // Lưu ý: ls.thanCung là CHI (chi của cung Thân), không phải tên cung.
  // Phải tìm cung có laThan = true rồi lấy tên cung của nó.
  const cungThan = ls.cung.find((c) => c.laThan);
  const tenThanCu = cungThan?.ten ?? '';
  const thanCuInfo = THAN_CU[tenThanCu];

  // ── Tổng quan ──────────────────────────────────────────────────
  const tongQuan: MucLuanGiai[] = [];
  tongQuan.push({
    tieuDe: 'Cấu trúc lá số',
    noiDung:
      `${ls.gioiTinh === 'Nam' ? 'Nam mệnh' : 'Nữ mệnh'} sinh ${ls.gio.ten} ngày ${ls.duongLich} (âm lịch ${ls.amLich}), ` +
      `an theo ${ls.cuc}. Cung Mệnh tại ${ls.menhCung}, cung Thân tại ${ls.thanCung}. ` +
      `Mệnh chủ ${ls.menhChu}, Thân chủ ${ls.thanChu}.`,
    canCu: `Giờ sinh ${ls.gio.ten}${ls.gioDaChinh ? ' (đã chỉnh giờ thật)' : ''}; cục ${ls.cuc}; Mệnh ${ls.menhCung}, Thân ${ls.thanCung}.`,
  });

  tongQuan.push({
    tieuDe: 'Âm dương thuận lý',
    noiDung: ad.nhanXet,
    canCu: `Can năm sinh ${ls.tuTru?.[0]?.can ?? '?'}; giới tính ${ls.gioiTinh.toLowerCase()}.`,
    hoi: 'Bạn thấy con đường của mình thường thuận theo số đông hay phải đi ngược lại để đúng với mình?',
  });

  if (NGU_HANH[ls.cuc]) {
    tongQuan.push({ tieuDe: `Ngũ hành cục — ${ls.cuc}`, noiDung: NGU_HANH[ls.cuc] });
  }

  tongQuan.push({
    tieuDe: 'Chính tinh thủ Mệnh',
    noiDung: chinhTinhMenh.length
      ? `Cung Mệnh thủ ${tenChinhMenh}. Đây là bộ sao định hình tính cách gốc và cách bạn phản ứng với hoàn cảnh.`
      : `Cung Mệnh không có chính tinh (vô chính diệu). Cách này không xấu: bạn là người thích nghi cao, chịu ảnh hưởng của môi trường và thường phát triển tốt khi được đặt đúng chỗ.`,
    canCu: menh
      ? `Cung Mệnh tại ${menh.chi}: ${menh.chinhTinh.map((s) => `${s.ten}${s.doSang ? ` (${s.doSang})` : ''}`).join(', ') || 'không có chính tinh'}.`
      : undefined,
  });

  if (thanCuInfo) {
    tongQuan.push({
      tieuDe: `Thân cư ${tenThanCu}`,
      noiDung: thanCuInfo.noiDung,
      canCu: `Cung Thân trùng cung ${tenThanCu} tại ${cungThan?.chi ?? '?'}.`,
      hoi: thanCuInfo.hoi,
    });
  }

  // ── Tứ hoá năm sinh nhập cung ─────────────────────────────────
  const tuHoaCung = luanTuHoaNhapCung(ls);
  if (tuHoaCung.length) {
    tongQuan.push({
      tieuDe: 'Tứ hoá năm sinh nhập cung',
      noiDung: tuHoaCung.map((x) => `• ${x.sao} hoá ${x.hoa} nhập ${x.cung}: ${x.yNghia}`).join('\n'),
      canCu: `Bốn sao hoá của năm sinh: ${tuHoaCung.map((x) => `${x.sao}→${x.hoa}`).join(', ')}.`,
    });
  }

  // ── Bộ sao ────────────────────────────────────────────────────
  const boSao = timBoSao(ls);

  // ── Tính cách ──────────────────────────────────────────────────
  const tinhCach: MucLuanGiai[] = [];
  if (menh) {
    for (const s of menh.chinhTinh) {
      const chi = CHINH_TINH[s.ten];
      if (chi) {
        tinhCach.push({
          tieuDe: s.ten,
          noiDung: `${chi.tinhCach} ${chi.menh}`,
          canCu: `${s.ten}${s.doSang ? ` ${s.doSang}` : ''} thủ cung Mệnh tại ${menh.chi}.`,
          hoi: `Bạn thấy mô tả này đúng ở mức nào: đúng hẳn, đúng khi ở nhà, hay chỉ đúng lúc gặp người lạ?`,
        });
      }
    }
    const phu = menh.phuTinh.filter((s) => PHU_TINH_INFO[s.ten]);
    if (phu.length) {
      tinhCach.push({
        tieuDe: 'Phụ tinh ảnh hưởng tính cách',
        noiDung: phu.map((s) => `• ${s.ten}: ${PHU_TINH_INFO[s.ten]}`).join('\n'),
        canCu: `Phụ tinh tại cung Mệnh: ${phu.map((s) => s.ten).join(', ')}.`,
      });
    }
    const { cat, sat } = demCatSat([menh]);
    if (cat.length || sat.length) {
      tinhCach.push({
        tieuDe: 'Cán cân trợ lực và lực cản',
        noiDung:
          `Cung Mệnh có ${cat.length ? `${cat.length} sao trợ lực (${cat.join(', ')})` : 'ít sao trợ lực'}` +
          ` và ${sat.length ? `${sat.length} sao gây gợn (${sat.join(', ')})` : 'không có sao gây gợn đáng kể'}. ` +
          (cat.length > sat.length
            ? 'Nhìn chung bạn được nâng nhiều hơn bị cản — lợi thế lớn nhất là dám nhờ người khác giúp.'
            : sat.length > cat.length
              ? 'Lực cản nhỉnh hơn trợ lực: bạn thường phải tự xoay xở. Đây là kiểu người lớn lên bằng va vấp, và cũng vì thế mà bền.'
              : 'Hai bên khá cân bằng: cuộc đời bạn không quá dễ cũng không quá khó, kết quả phụ thuộc vào lựa chọn nhiều hơn vào may mắn.'),
        canCu: `Đếm sao trong tam phương tứ chính cung Mệnh: ${cat.length} cát tinh, ${sat.length} sát tinh.`,
      });
    }
  }
  if (!tinhCach.length) {
    tinhCach.push({
      tieuDe: 'Tính cách',
      noiDung:
        'Cung Mệnh không có chính tinh nên tính cách chịu ảnh hưởng mạnh từ cung Thiên Di và môi trường sống. Bạn dễ thích nghi nhưng cần chủ động chọn môi trường tốt cho mình.',
      canCu: 'Cung Mệnh vô chính diệu; xem thêm cung Thiên Di.',
      hoi: 'Bạn đang sống trong môi trường kéo mình lên hay giữ mình lại?',
    });
  }

  // ── Sự nghiệp ──────────────────────────────────────────────────
  const suNghiep: MucLuanGiai[] = [];
  if (quan) {
    if (quan.chinhTinh.length) {
      for (const s of quan.chinhTinh) {
        const chi = CHINH_TINH[s.ten];
        if (chi) {
          suNghiep.push({
            tieuDe: `${s.ten} tại Quan Lộc`,
            noiDung: `${chi.suNghiep}${s.doSang ? ` (${s.ten} ${moTaDoSang(s)})` : ''}`,
            canCu: `Quan Lộc tại ${quan.chi}, thủ ${s.ten}${s.doSang ? ` ${s.doSang}` : ''}.`,
          });
        }
      }
    } else {
      suNghiep.push({
        tieuDe: 'Quan Lộc vô chính diệu',
        noiDung:
          'Cung sự nghiệp không có chính tinh: con đường nghề nghiệp có thể thay đổi vài lần. Điều này không xấu, miễn là bạn xây được kỹ năng lõi có thể chuyển đổi giữa các ngành.',
        canCu: `Quan Lộc tại ${quan.chi} không có chính tinh.`,
        hoi: 'Kỹ năng nào của bạn vẫn dùng được nếu đổi hẳn ngành?',
      });
    }
    const tot = quan.phuTinh.filter((s) =>
      ['Tả Phù', 'Hữu Bật', 'Văn Xương', 'Văn Khúc', 'Thiên Khôi', 'Thiên Việt', 'Lộc Tồn'].includes(s.ten),
    );
    if (tot.length) {
      suNghiep.push({
        tieuDe: 'Trợ lực sự nghiệp',
        noiDung: tot.map((s) => `• ${s.ten}: ${PHU_TINH_INFO[s.ten]}`).join('\n'),
        canCu: `Phụ tinh tại Quan Lộc: ${tot.map((s) => s.ten).join(', ')}.`,
      });
    }
    const tamQuan = tamPhuongTuChinh(ls.cung, quan);
    const { cat, sat } = demCatSat(tamQuan);
    suNghiep.push({
      tieuDe: 'Môi trường sự nghiệp nhìn từ tam phương',
      noiDung:
        `Quanh cung Quan Lộc có ${cat.length ? cat.join(', ') : 'không nhiều sao trợ lực'}. ` +
        (sat.length ? `Điểm gợn: ${sat.join(', ')} — nên chọn nơi quy trình rõ ràng thay vì nơi phải tự chữa cháy.` : 'Không có sát tinh đáng kể: môi trường làm việc tương đối thuận.'),
      canCu: `Tam phương tứ chính Quan Lộc: ${tamQuan.map((c) => c.ten).join(', ')}.`,
    });
  }

  // ── Tài lộc ────────────────────────────────────────────────────
  const taiLoc: MucLuanGiai[] = [];
  if (tai) {
    if (tai.chinhTinh.length) {
      taiLoc.push({
        tieuDe: 'Chính tinh tại Tài Bạch',
        noiDung:
          tai.chinhTinh
            .map((s) => `${s.ten}${s.doSang ? ` (${s.doSang})` : ''}${s.tuHoa ? ` [${s.tuHoa}]` : ''}`)
            .join(', ') +
          `. ${tai.chinhTinh
            .map((s) => CHINH_TINH[s.ten]?.chuQuan ?? '')
            .filter(Boolean)
            .join('; ')}.`,
        canCu: `Cung Tài Bạch tại ${tai.chi}: ${tai.chinhTinh.map((s) => s.ten).join(', ')}.`,
      });
    } else {
      taiLoc.push({
        tieuDe: 'Tài Bạch vô chính diệu',
        noiDung:
          'Cung tài lộc không có chính tinh: thu nhập có thể đến từ nhiều nguồn khác nhau, không ổn định theo một đường duy nhất. Nên xây nhiều nguồn thu thay vì dồn vào một chỗ.',
        canCu: `Tài Bạch tại ${tai.chi} không có chính tinh.`,
      });
    }
    const locTon = tai.phuTinh.find((s) => s.ten === 'Lộc Tồn');
    if (locTon) {
      taiLoc.push({
        tieuDe: 'Lộc Tồn tại Tài Bạch',
        noiDung:
          'Dấu hiệu của người biết tích luỹ. Tiền vào không ồn ào nhưng giữ được, phù hợp đầu tư dài hạn hơn là lướt sóng.',
        canCu: 'Lộc Tồn thủ cung Tài Bạch.',
      });
    }
    const phaTai = tai.phuTinh.filter((s) => ['Địa Không', 'Địa Kiếp', 'Đại Hao', 'Tiểu Hao'].includes(s.ten));
    if (phaTai.length) {
      taiLoc.push({
        tieuDe: 'Lưu ý về hao tổn',
        noiDung:
          'Có sao hao tán tại Tài Bạch: cần tránh đầu cơ, vay nợ để đầu tư rủi ro cao, hoặc chi tiêu theo cảm xúc. Nên giữ một quỹ dự phòng tối thiểu 6 tháng chi tiêu.',
        canCu: `Sao hao tán tại Tài Bạch: ${phaTai.map((s) => s.ten).join(', ')}.`,
        hoi: 'Khoản chi lớn gần nhất của bạn là nhu cầu thật hay cảm xúc nhất thời?',
      });
    }
    const tamTai = tamPhuongTuChinh(ls.cung, tai);
    const hoaTai = tamTai
      .flatMap((c) => [...c.chinhTinh, ...c.phuTinh])
      .filter((s) => s.tuHoa === 'Lộc');
    if (hoaTai.length) {
      taiLoc.push({
        tieuDe: 'Đường tiền có hoá Lộc',
        noiDung: `Có ${hoaTai.map((s) => s.ten).join(', ')} hoá Lộc trong tam phương cung Tài: đây là cửa kiếm tiền thuận nhất, nên ưu tiên khai thác thay vì mở thêm hướng mới.`,
        canCu: `Hoá Lộc nhập tam phương Tài Bạch: ${hoaTai.map((s) => s.ten).join(', ')}.`,
      });
    }
  }

  // ── Tình cảm ───────────────────────────────────────────────────
  const tinhCam: MucLuanGiai[] = [];
  if (phuThe) {
    if (phuThe.chinhTinh.length) {
      for (const s of phuThe.chinhTinh) {
        const chi = CHINH_TINH[s.ten];
        if (chi) {
          tinhCam.push({
            tieuDe: `${s.ten} tại Phu Thê`,
            noiDung: `${chi.tinhCam}${s.doSang ? ` Sao ${moTaDoSang(s)}.` : ''}`,
            canCu: `Phu Thê tại ${phuThe.chi}, thủ ${s.ten}${s.doSang ? ` ${s.doSang}` : ''}.`,
            hoi: 'Bạn thấy mình cần được tôn trọng hay cần được chăm sóc nhiều hơn trong quan hệ?',
          });
        }
      }
    } else {
      tinhCam.push({
        tieuDe: 'Phu Thê vô chính diệu',
        noiDung:
          'Cung hôn nhân không có chính tinh: chuyện tình cảm đến muộn hơn hoặc có thể trải qua vài mối quan hệ trước khi ổn định. Điều quan trọng là chọn đúng người chứ không phải chọn sớm.',
        canCu: `Phu Thê tại ${phuThe.chi} không có chính tinh.`,
      });
    }
    const hoa = phuThe.phuTinh.filter((s) => ['Hồng Loan', 'Thiên Hỷ', 'Thiên Diêu', 'Hàm Trì'].includes(s.ten));
    if (hoa.length) {
      tinhCam.push({
        tieuDe: 'Sao tình duyên',
        noiDung: hoa.map((s) => `• ${s.ten}: ${PHU_TINH_INFO[s.ten]}`).join('\n'),
        canCu: `Sao tình duyên tại Phu Thê: ${hoa.map((s) => s.ten).join(', ')}.`,
      });
    }
    const satThe = phuThe.phuTinh.filter((s) => ['Kình Dương', 'Đà La', 'Hỏa Tinh', 'Linh Tinh', 'Thiên Hình'].includes(s.ten));
    if (satThe.length) {
      tinhCam.push({
        tieuDe: 'Điểm cần lưu tâm trong hôn nhân',
        noiDung: `Có ${satThe.join(', ')} tại Phu Thê: dễ nóng, dễ hiểu lầm, hoặc hay nhắc lại chuyện cũ. Quy tắc thực dụng: không quyết định chia tay hay cưới trong lúc đang giận.`,
        canCu: `Sát tinh tại Phu Thê: ${satThe.join(', ')}.`,
      });
    }
  }

  // ── Sức khoẻ ───────────────────────────────────────────────────
  const sucKhoe: MucLuanGiai[] = [];
  if (tatAch) {
    const st = [...tatAch.chinhTinh, ...tatAch.phuTinh];
    if (st.length) {
      sucKhoe.push({
        tieuDe: 'Cung Tật Ách',
        noiDung:
          `Các sao tại Tật Ách: ${st.map((s) => s.ten).join(', ')}. ` +
          st
            .map((s) => CHINH_TINH[s.ten]?.sucKhoe ?? '')
            .filter(Boolean)
            .join(' '),
        canCu: `Tật Ách tại ${tatAch.chi}: ${st.map((s) => s.ten).join(', ')}.`,
      });
    } else {
      sucKhoe.push({
        tieuDe: 'Cung Tật Ách',
        noiDung: 'Cung Tật Ách không có nhiều sao: nhìn chung sức khoẻ ổn định, ít bệnh nặng. Vẫn nên khám định kỳ.',
        canCu: `Tật Ách tại ${tatAch.chi} ít sao.`,
      });
    }
    if (st.some((s) => ['Kình Dương', 'Đà La', 'Hỏa Tinh', 'Linh Tinh'].includes(s.ten))) {
      sucKhoe.push({
        tieuDe: 'Lưu ý',
        noiDung:
          'Có sát tinh tại Tật Ách: dễ gặp chấn thương hoặc bệnh cấp tính. Nên cẩn thận khi vận động mạnh, lái xe và làm việc nặng.',
        canCu: `Sát tinh tại Tật Ách: ${st.filter((s) => ['Kình Dương', 'Đà La', 'Hỏa Tinh', 'Linh Tinh'].includes(s.ten)).map((s) => s.ten).join(', ')}.`,
      });
    }
    const hanh = CHINH_TINH[tatAch.chinhTinh[0]?.ten ?? '']?.hanh;
    if (hanh) {
      sucKhoe.push({
        tieuDe: 'Hướng chăm sóc theo ngũ hành',
        noiDung: `Tật Ách thủ sao hành ${hanh}: nên để ý cơ quan tương ứng và giữ nhịp sinh hoạt đều hơn là tập nặng rồi nghỉ dài.`,
        canCu: `Chính tinh tại Tật Ách thuộc hành ${hanh}.`,
      });
    }
  }

  // ── 12 cung ────────────────────────────────────────────────────
  // Thứ tự truyền thống: bắt đầu từ Mệnh rồi đi ngược chiều kim đồng hồ.
  const THU_TU_CUNG = [
    'Mệnh',
    'Huynh Đệ',
    'Phu Thê',
    'Tử Nữ',
    'Tài Bạch',
    'Tật Ách',
    'Thiên Di',
    'Nô Bộc',
    'Quan Lộc',
    'Điền Trạch',
    'Phúc Đức',
    'Phụ Mẫu',
  ];
  const muoiHaiCung = THU_TU_CUNG.map((ten) => cungTheoTen(ls, ten))
    .filter((c): c is Cung => !!c)
    .map((c) => tomTatCung(ls, c));

  // ── Vận hạn ────────────────────────────────────────────────────
  const vanHanMuc: MucLuanGiai[] = [];
  const nam = namXem ?? new Date().getFullYear();
  try {
    const vh = vanHan(ls, nam);
    const cungDH = ls.cung.find((c) => c.index === vh.daiHan.index);
    const cungLN = ls.cung.find((c) => c.index === vh.luuNien.index);
    const cungTH = ls.cung.find((c) => c.index === vh.tieuHan.index);

    vanHanMuc.push({
      tieuDe: `Đại hạn ${nam} (${vh.daiHan.tuoi[0]}–${vh.daiHan.tuoi[1]} tuổi)`,
      noiDung:
        `Đại hạn đang đi qua cung ${cungDH?.ten ?? '?'} (${vh.daiHan.can} ${vh.daiHan.chi}). ` +
        (cungDH?.chinhTinh.length
          ? `Các sao tại đây: ${cungDH.chinhTinh.map((s) => `${s.ten}${s.doSang ? `(${s.doSang})` : ''}`).join(', ')}. ` +
            cungDH.chinhTinh.map((s) => CHINH_TINH[s.ten]?.chuQuan ?? '').filter(Boolean).join('; ') + '.'
          : 'Cung này không có chính tinh — vận này nên mượn lực từ môi trường và người xung quanh.'),
      canCu: `Đại hạn ${vh.daiHan.can} ${vh.daiHan.chi} nhập cung ${cungDH?.ten ?? '?'} (${cungDH?.chi ?? '?'}).`,
    });

    vanHanMuc.push({
      tieuDe: `Lưu niên ${nam} (${vh.luuNien.can} ${vh.luuNien.chi})`,
      noiDung:
        `Năm ${nam} có lưu niên nhập cung ${cungLN?.ten ?? '?'}. ` +
        (cungLN?.chinhTinh.length ? `Sao tại đây: ${cungLN.chinhTinh.map((s) => s.ten).join(', ')}. ` : '') +
        `Tiểu hạn ${vh.tieuHan.tuoi} tuổi nhập cung ${cungTH?.ten ?? '?'}.`,
      canCu: `Lưu niên ${vh.luuNien.can} ${vh.luuNien.chi} → ${cungLN?.ten ?? '?'}; tiểu hạn → ${cungTH?.ten ?? '?'}.`,
    });

    const lnHoa = tuHoa(ls, nam).luuNien;
    if (lnHoa.length) {
      vanHanMuc.push({
        tieuDe: 'Tứ hoá lưu niên',
        noiDung: lnHoa.map((x) => moTaTuHoa(x.hoa, x.sao)).join(' '),
        canCu: `Tứ hoá của năm ${nam}: ${lnHoa.map((x) => `${x.sao}→${x.hoa}`).join(', ')}.`,
      });
    }

    // Đại hạn kế tiếp
    const keTiep = ls.cung
      .filter((c) => c.daiHan.tuoiBatDau === vh.daiHan.tuoi[1] + 1)
      .sort((a, b) => a.daiHan.tuoiBatDau - b.daiHan.tuoiBatDau)[0];
    if (keTiep) {
      vanHanMuc.push({
        tieuDe: `Đại hạn kế tiếp (${keTiep.daiHan.tuoiBatDau}–${keTiep.daiHan.tuoiKetThuc} tuổi)`,
        noiDung:
          `Vận tiếp theo nhập cung ${keTiep.ten} (${keTiep.daiHan.can} ${keTiep.daiHan.chi}). ` +
          (keTiep.chinhTinh.length
            ? `Thủ ${keTiep.chinhTinh.map((s) => s.ten).join(', ')}. ` +
              keTiep.chinhTinh.map((s) => CHINH_TINH[s.ten]?.chuQuan ?? '').filter(Boolean).join('; ') +
              '. Nên chuẩn bị trước 6–12 tháng thay vì đợi tới lúc chuyển.'
            : 'Cung này không có chính tinh: giai đoạn tới nên linh hoạt, đừng khoá mình vào một kế hoạch cứng.'),
        canCu: `Cung ${keTiep.ten} tại ${keTiep.chi}, đại hạn ${keTiep.daiHan.tuoiBatDau}–${keTiep.daiHan.tuoiKetThuc}.`,
      });
    }
  } catch {
    vanHanMuc.push({
      tieuDe: 'Vận hạn',
      noiDung: 'Không tính được vận hạn cho năm đã chọn.',
    });
  }

  if (phucDuc?.chinhTinh.length) {
    vanHanMuc.push({
      tieuDe: 'Nền tảng tinh thần (Phúc Đức)',
      noiDung: `Phúc Đức thủ ${phucDuc.chinhTinh.map((s) => s.ten).join(', ')}. ${cungInfo('Phúc Đức')?.yNghia ?? ''}`,
      canCu: `Phúc Đức tại ${phucDuc.chi}: ${phucDuc.chinhTinh.map((s) => s.ten).join(', ')}.`,
    });
  }

  // ── Câu hỏi tự đối chiếu ───────────────────────────────────────
  const cauHoi: string[] = [];
  const { cat: catMenh, sat: satMenh } = menh ? demCatSat([menh]) : { cat: [], sat: [] };
  if (satMenh.length) {
    cauHoi.push(`Cung Mệnh có ${satMenh[0]}: bạn thường phản ứng thế nào khi bị phản đối — im lặng, nói thẳng, hay làm ngược lại?`);
  }
  if (tai?.phuTinh.some((s) => ['Địa Không', 'Địa Kiếp', 'Đại Hao', 'Tiểu Hao'].includes(s.ten))) {
    cauHoi.push('Bạn có thói quen chi tiêu theo cảm xúc không? Tháng gần nhất, khoản nào là như vậy?');
  }
  if (menh && menh.chinhTinh.some((s) => ['Hãm', 'Bất'].includes(s.doSang ?? ''))) {
    cauHoi.push('Điểm yếu lớn nhất của bạn hiện tại là gì — và bạn đã có kế hoạch bù đắp chưa?');
  }
  if (quan && quan.chinhTinh.length === 0) {
    cauHoi.push('Nếu công việc hiện tại không còn, kỹ năng nào giúp bạn chuyển sang việc khác trong 3 tháng?');
  }
  if (boSao.some((b) => b.ten === 'Không Kiếp')) {
    cauHoi.push('Bạn đã từng mất một khoản tiền lớn vì quyết định nhanh chưa? Bạn rút ra quy tắc gì?');
  }
  if (boSao.some((b) => b.mucDo === 'cần lưu ý')) {
    cauHoi.push('Vùng nào trong cuộc sống bạn đang cố gắng một mình, dù có thể nhờ người khác?');
  }
  cauHoi.push('Trong 3 năm tới, nếu chỉ được chọn một thứ để giỏi hơn, bạn chọn gì?');

  // ── Lời khuyên ─────────────────────────────────────────────────
  const loiKhuyen: string[] = [];
  for (const s of menh?.chinhTinh ?? []) {
    const chi = CHINH_TINH[s.ten];
    if (chi) loiKhuyen.push(chi.loiKhuyen);
  }
  if (!loiKhuyen.length) {
    loiKhuyen.push(
      'Vì cung Mệnh vô chính diệu, lời khuyên quan trọng nhất là chủ động chọn môi trường. Bạn giỏi thích nghi, nhưng thích nghi với môi trường tốt sẽ tốt hơn nhiều.',
    );
  }

  const cc = timCachCuc(ls);
  if (cc.some((x) => x.mucDo === 'cần lưu ý')) {
    loiKhuyen.push(
      'Lá số có cách cục cần lưu ý. Điều này không phải điềm xấu cố định — nó chỉ ra vùng cần cẩn trọng hơn, và hoàn toàn có thể giảm thiểu bằng kế hoạch dự phòng.',
    );
  }
  if (boSao.some((b) => b.ten === 'Sát Phá Lang')) {
    loiKhuyen.push(
      'Bộ Sát Phá Lang cho bạn sự liều lĩnh, nhưng cũng cho xu hướng bỏ giữa đường. Hãy chia mục tiêu lớn thành các mốc 90 ngày để giữ nhịp.',
    );
  }
  if (boSao.some((b) => b.ten === 'Không Kiếp')) {
    loiKhuyen.push(
      'Với Không Kiếp, quy tắc an toàn là: không dồn quá 20% tài sản vào một canh bạc, dù bạn tin chắc đến đâu.',
    );
  }
  loiKhuyen.push(
    'Tử Vi Đẩu Số là công cụ tham khảo để hiểu xu hướng, không phải bản án. Mọi quyết định quan trọng vẫn nên dựa trên dữ liệu thực tế và ý kiến chuyên gia trong lĩnh vực tương ứng.',
  );

  const cauChot =
    (chinhTinhMenh[0] && CAU_CHOT[chinhTinhMenh[0]]) ||
    'Hiểu mình là bước đầu; chọn đúng môi trường là bước quyết định.';

  return {
    tomTat: {
      menh: `${tenChinhMenh} tại ${ls.menhCung}`,
      thanCu: `Thân cư ${tenThanCu || '—'}`,
      amDuong: ad.thuanLy ? 'Dương nam / âm nữ — thuận lý' : 'Âm nam / dương nữ — nghịch lý',
      cauChot,
    },
    tongQuan,
    tinhCach,
    suNghiep,
    taiLoc,
    tinhCam,
    sucKhoe,
    boSao,
    muoiHaiCung,
    tuHoaCung,
    cachCuc: cc,
    vanHan: vanHanMuc,
    cauHoi,
    loiKhuyen,
  };
}
