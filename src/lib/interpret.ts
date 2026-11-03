/**
 * Sinh luận giải tiếng Việt từ dữ liệu lá số.
 *
 * Nguyên tắc: chỉ đưa ra nhận định dựa trên dữ liệu thực có trong lá số
 * (chính tinh, độ sáng, tứ hoá, cách cục, tam phương tứ chính). Không bịa
 * thêm sao, không hù doạ, không hứa hẹn kết quả tuyệt đối.
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
}

export interface LuanGiai {
  tongQuan: MucLuanGiai[];
  tinhCach: MucLuanGiai[];
  suNghiep: MucLuanGiai[];
  taiLoc: MucLuanGiai[];
  tinhCam: MucLuanGiai[];
  sucKhoe: MucLuanGiai[];
  cachCuc: { ten: string; yNghia: string; mucDo: CachCuc['mucDo'] }[];
  vanHan: MucLuanGiai[];
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
// Luận theo từng cung
// ─────────────────────────────────────────────────────────────────

function luanCung(ls: LaSo, ten: string): MucLuanGiai[] {
  const cung = cungTheoTen(ls, ten);
  const info = cungInfo(ten);
  const out: MucLuanGiai[] = [];
  if (!cung || !info) return out;

  if (cung.chinhTinh.length === 0) {
    // Mệnh vô chính diệu → mượn cung xung chiếu
    const doiCung = cungTheoTen(ls, doiTenCung(ten));
    const muon = doiCung?.chinhTinh ?? [];
    out.push({
      tieuDe: `${ten} — vô chính diệu`,
      noiDung:
        `${info.yNghia} Cung này không có chính tinh thủ, nên phải mượn sao từ cung xung chiếu` +
        (muon.length ? ` (${muon.map((s) => s.ten).join(', ')})` : '') +
        `. Đây là cách của người linh hoạt, chịu ảnh hưởng từ môi trường nhiều hơn từ bản thân.`,
    });
    return out;
  }

  for (const s of cung.chinhTinh) {
    const chi = CHINH_TINH[s.ten];
    if (!chi) continue;
    const hot = s.tuHoa ? ` [${s.tuHoa}]` : '';
    out.push({
      tieuDe: `${s.ten}${hot} tại cung ${ten}`,
      noiDung:
        `${chi.chuQuan}. ${chi.tinhCach} ` +
        (s.doSang ? `Sao này ${moTaDoSang(s)}. ` : '') +
        (s.tuHoa ? moTaTuHoa(s.tuHoa, s.ten) + ' ' : '') +
        `Trong phạm vi ${info.linhVuc.toLowerCase()}, ${chi[ten === 'Mệnh' ? 'menh' : ten === 'Quan Lộc' ? 'suNghiep' : ten === 'Phu Thê' ? 'tinhCam' : 'menh']}`,
    });
  }
  return out;
}

const DOI_CUNG: Record<string, string> = {
  Mệnh: 'Thiên Di',
  'Thiên Di': 'Mệnh',
  'Huynh Đệ': 'Nô Bộc',
  'Nô Bộc': 'Huynh Đệ',
  'Phu Thê': 'Quan Lộc',
  'Quan Lộc': 'Phu Thê',
  'Tử Nữ': 'Điền Trạch',
  'Điền Trạch': 'Tử Nữ',
  'Tài Bạch': 'Phúc Đức',
  'Phúc Đức': 'Tài Bạch',
  'Tật Ách': 'Phụ Mẫu',
  'Phụ Mẫu': 'Tật Ách',
};

const doiTenCung = (ten: string) => DOI_CUNG[ten] ?? '';

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

  // ── Tổng quan ──────────────────────────────────────────────────
  const tongQuan: MucLuanGiai[] = [];
  tongQuan.push({
    tieuDe: 'Cấu trúc lá số',
    noiDung:
      `${ls.gioiTinh === 'Nam' ? 'Nam mệnh' : 'Nữ mệnh'} sinh ${ls.gio.ten} ngày ${ls.duongLich} (âm lịch ${ls.amLich}), ` +
      `an theo ${ls.cuc}. Cung Mệnh tại ${ls.menhCung}, cung Thân tại ${ls.thanCung}. ` +
      `Mệnh chủ ${ls.menhChu}, Thân chủ ${ls.thanChu}.`,
  });

  if (NGU_HANH[ls.cuc]) {
    tongQuan.push({ tieuDe: `Ngũ hành cục — ${ls.cuc}`, noiDung: NGU_HANH[ls.cuc] });
  }

  tongQuan.push({
    tieuDe: 'Chính tinh thủ Mệnh',
    noiDung: chinhTinhMenh.length
      ? `Cung Mệnh thủ ${tenChinhMenh}. Đây là bộ sao định hình tính cách gốc và cách bạn phản ứng với hoàn cảnh.`
      : `Cung Mệnh không có chính tinh (vô chính diệu). Cách này không xấu: bạn là người thích nghi cao, chịu ảnh hưởng của môi trường và thường phát triển tốt khi được đặt đúng chỗ.`,
  });

  // ── Tứ hoá năm sinh ────────────────────────────────────────────
  const th = tuHoa(ls);
  if (th.goc.length) {
    tongQuan.push({
      tieuDe: 'Tứ hoá năm sinh',
      noiDung: th.goc.map((x) => moTaTuHoa(x.hoa, x.sao)).join(' '),
    });
  }

  // ── Tính cách ──────────────────────────────────────────────────
  const tinhCach: MucLuanGiai[] = [];
  if (menh) {
    for (const s of menh.chinhTinh) {
      const chi = CHINH_TINH[s.ten];
      if (chi) {
        tinhCach.push({ tieuDe: s.ten, noiDung: `${chi.tinhCach} ${chi.menh}` });
      }
    }
    const phu = menh.phuTinh.filter((s) => PHU_TINH_INFO[s.ten]);
    if (phu.length) {
      tinhCach.push({
        tieuDe: 'Phụ tinh ảnh hưởng tính cách',
        noiDung: phu.map((s) => `• ${s.ten}: ${PHU_TINH_INFO[s.ten]}`).join('\n'),
      });
    }
  }
  if (!tinhCach.length) {
    tinhCach.push({
      tieuDe: 'Tính cách',
      noiDung:
        'Cung Mệnh không có chính tinh nên tính cách chịu ảnh hưởng mạnh từ cung Thiên Di và môi trường sống. Bạn dễ thích nghi nhưng cần chủ động chọn môi trường tốt cho mình.',
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
          });
        }
      }
    } else {
      suNghiep.push({
        tieuDe: 'Quan Lộc vô chính diệu',
        noiDung:
          'Cung sự nghiệp không có chính tinh: con đường nghề nghiệp có thể thay đổi vài lần. Điều này không xấu, miễn là bạn xây được kỹ năng lõi có thể chuyển đổi giữa các ngành.',
      });
    }
    // sao tốt ở Quan Lộc
    const tot = quan.phuTinh.filter((s) => ['Tả Phù', 'Hữu Bật', 'Văn Xương', 'Văn Khúc', 'Thiên Khôi', 'Thiên Việt', 'Lộc Tồn'].includes(s.ten));
    if (tot.length) {
      suNghiep.push({
        tieuDe: 'Trợ lực sự nghiệp',
        noiDung: tot.map((s) => `• ${s.ten}: ${PHU_TINH_INFO[s.ten]}`).join('\n'),
      });
    }
  }

  // ── Tài lộc ────────────────────────────────────────────────────
  const taiLoc: MucLuanGiai[] = [];
  if (tai) {
    if (tai.chinhTinh.length) {
      taiLoc.push({
        tieuDe: 'Chính tinh tại Tài Bạch',
        noiDung: tai.chinhTinh
          .map((s) => `${s.ten}${s.doSang ? ` (${s.doSang})` : ''}${s.tuHoa ? ` [${s.tuHoa}]` : ''}`)
          .join(', ') +
          `. ${tai.chinhTinh
            .map((s) => CHINH_TINH[s.ten]?.chuQuan ?? '')
            .filter(Boolean)
            .join('; ')}.`,
      });
    } else {
      taiLoc.push({
        tieuDe: 'Tài Bạch vô chính diệu',
        noiDung:
          'Cung tài lộc không có chính tinh: thu nhập có thể đến từ nhiều nguồn khác nhau, không ổn định theo một đường duy nhất. Nên xây nhiều nguồn thu thay vì dồn vào một chỗ.',
      });
    }
    const locTon = tai.phuTinh.find((s) => s.ten === 'Lộc Tồn');
    if (locTon) {
      taiLoc.push({
        tieuDe: 'Lộc Tồn tại Tài Bạch',
        noiDung: 'Dấu hiệu của người biết tích luỹ. Tiền vào không ồn ào nhưng giữ được, phù hợp đầu tư dài hạn hơn là lướt sóng.',
      });
    }
    if (tai.phuTinh.some((s) => s.ten === 'Địa Kiếp' || s.ten === 'Địa Không')) {
      taiLoc.push({
        tieuDe: 'Lưu ý về hao tổn',
        noiDung:
          'Có Địa Không hoặc Địa Kiếp tại Tài Bạch: cần tránh đầu cơ, vay nợ để đầu tư rủi ro cao, hoặc chi tiêu theo cảm xúc. Nên giữ một quỹ dự phòng tối thiểu 6 tháng.',
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
          });
        }
      }
    } else {
      tinhCam.push({
        tieuDe: 'Phu Thê vô chính diệu',
        noiDung:
          'Cung hôn nhân không có chính tinh: chuyện tình cảm đến muộn hơn hoặc có thể trải qua vài mối quan hệ trước khi ổn định. Điều quan trọng là chọn đúng người chứ không phải chọn sớm.',
      });
    }
    const hoa = phuThe.phuTinh.filter((s) => ['Hồng Loan', 'Thiên Hỷ', 'Thiên Diêu'].includes(s.ten));
    if (hoa.length) {
      tinhCam.push({
        tieuDe: 'Sao tình duyên',
        noiDung: hoa.map((s) => `• ${s.ten}: ${PHU_TINH_INFO[s.ten]}`).join('\n'),
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
      });
    } else {
      sucKhoe.push({
        tieuDe: 'Cung Tật Ách',
        noiDung: 'Cung Tật Ách không có nhiều sao: nhìn chung sức khoẻ ổn định, ít bệnh nặng. Vẫn nên khám định kỳ.',
      });
    }
    if (st.some((s) => ['Kình Dương', 'Đà La', 'Hỏa Tinh', 'Linh Tinh'].includes(s.ten))) {
      sucKhoe.push({
        tieuDe: 'Lưu ý',
        noiDung:
          'Có sát tinh tại Tật Ách: dễ gặp chấn thương hoặc bệnh cấp tính. Nên cẩn thận khi vận động mạnh, lái xe và làm việc nặng.',
      });
    }
  }

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
    });

    vanHanMuc.push({
      tieuDe: `Lưu niên ${nam} (${vh.luuNien.can} ${vh.luuNien.chi})`,
      noiDung:
        `Năm ${nam} có lưu niên nhập cung ${cungLN?.ten ?? '?'}. ` +
        (cungLN?.chinhTinh.length
          ? `Sao tại đây: ${cungLN.chinhTinh.map((s) => s.ten).join(', ')}. `
          : '') +
        `Tiểu hạn ${vh.tieuHan.tuoi} tuổi nhập cung ${cungTH?.ten ?? '?'}.`,
    });

    const lnHoa = tuHoa(ls, nam).luuNien;
    if (lnHoa.length) {
      vanHanMuc.push({
        tieuDe: 'Tứ hoá lưu niên',
        noiDung: lnHoa.map((x) => moTaTuHoa(x.hoa, x.sao)).join(' '),
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
    });
  }

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
  loiKhuyen.push(
    'Tử Vi Đẩu Số là công cụ tham khảo để hiểu xu hướng, không phải bản án. Mọi quyết định quan trọng vẫn nên dựa trên dữ liệu thực tế và ý kiến chuyên gia trong lĩnh vực tương ứng.',
  );

  return {
    tongQuan,
    tinhCach,
    suNghiep,
    taiLoc,
    tinhCam,
    sucKhoe,
    cachCuc: cc,
    vanHan: vanHanMuc,
    loiKhuyen,
  };
}
