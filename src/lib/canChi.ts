// Tính toán Can Chi đơn giản cho xem ngày tốt xấu

export const CAN = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];
export const CHI = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];

export const GIO_HOANG_DAO = [
  { gio: 'Tý', gioChi: '23:00 - 01:00', hoangDao: true },
  { gio: 'Sửu', gioChi: '01:00 - 03:00', hoangDao: false },
  { gio: 'Dần', gioChi: '03:00 - 05:00', hoangDao: true },
  { gio: 'Mão', gioChi: '05:00 - 07:00', hoangDao: true },
  { gio: 'Thìn', gioChi: '07:00 - 09:00', hoangDao: false },
  { gio: 'Tỵ', gioChi: '09:00 - 11:00', hoangDao: true },
  { gio: 'Ngọ', gioChi: '11:00 - 13:00', hoangDao: false },
  { gio: 'Mùi', gioChi: '13:00 - 15:00', hoangDao: true },
  { gio: 'Thân', gioChi: '15:00 - 17:00', hoangDao: true },
  { gio: 'Dậu', gioChi: '17:00 - 19:00', hoangDao: false },
  { gio: 'Tuất', gioChi: '19:00 - 21:00', hoangDao: true },
  { gio: 'Hợi', gioChi: '21:00 - 23:00', hoangDao: false },
];

export function getCanChi(date: Date) {
  // Tính toán đơn giản dựa trên ngày Julian
  const jd = Math.floor(date.getTime() / 86400000) + 2440588;
  const canIndex = (jd + 9) % 10;
  const chiIndex = (jd + 1) % 12;
  return {
    can: CAN[canIndex],
    chi: CHI[chiIndex],
    canChi: CAN[canIndex] + ' ' + CHI[chiIndex],
  };
}

export function xemNgayTotXau(date: Date) {
  const cc = getCanChi(date);
  const day = date.getDay();
  
  const tot = [
    'Khai trương',
    'Xuất hành',
    'Gặp gỡ, ký kết',
    'Cầu tài, cầu phúc',
    'Học tập, thi cử',
    'Chữa bệnh, dưỡng sức',
  ];
  
  const xau = [
    'Động thổ, đào móng',
    'An táng, mai táng',
    'Kiện tụng, tranh chấp',
    'Khởi công xây dựng lớn',
    'Cắt tóc (theo một số quan niệm)',
  ];
  
  // Đơn giản hóa: dựa trên Can Chi
  const seed = (cc.can.length + cc.chi.length + day) % 3;
  
  return {
    canChi: cc.canChi,
    tot: seed === 0 ? tot.slice(0, 4) : seed === 1 ? tot.slice(1, 5) : tot.slice(0, 3),
    xau: seed === 0 ? xau.slice(2, 4) : seed === 1 ? xau.slice(0, 2) : xau.slice(1, 3),
    danhGia: seed === 0 ? 'Khá tốt' : seed === 1 ? 'Trung bình' : 'Tốt',
    gioHoangDao: GIO_HOANG_DAO.filter(g => g.hoangDao),
  };
}

export function xemTuoiXayNha(namSinh: number, namXem: number) {
  const tuoi = namXem - namSinh;
  const canChiNam = getCanChi(new Date(namXem, 0, 1));
  
  // Quy tắc đơn giản tham khảo
  const hop = (tuoi % 3 === 0 || tuoi % 4 === 1);
  
  return {
    tuoi,
    namXem,
    canChiNam: canChiNam.canChi,
    ketLuan: hop ? 'Khá thuận lợi' : 'Cần cân nhắc thêm',
    lyDo: hop 
      ? 'Năm này có nhiều yếu tố thuận tiện cho việc xây dựng, sửa chữa.'
      : 'Nên xem xét kỹ thời điểm, có thể chọn năm sau sẽ thuận hơn.',
    khuyenNghi: [
      hop ? 'Có thể tiến hành các việc sửa chữa, cải tạo' : 'Ưu tiên chuẩn bị, quy hoạch trước',
      'Nên chọn ngày tốt để động thổ',
      'Tham khảo thêm ý kiến gia đình và chuyên gia',
    ],
    chuY: 'Chỉ mang tính tham khảo xu hướng, không thay thế quyết định cá nhân.',
  };
}

export function xemTuoiCuoiHoi(namSinhNam: number, namSinhNu: number, namXem: number) {
  const tuoiNam = namXem - namSinhNam;
  const tuoiNu = namXem - namSinhNu;
  const tong = (tuoiNam + tuoiNu) % 9;
  const thuan = tong >= 3 && tong <= 6;
  
  return {
    tuoiNam,
    tuoiNu,
    namXem,
    ketLuan: thuan ? 'Có xu hướng thuận lợi' : 'Cần cân nhắc kỹ lưỡng',
    lyDo: thuan
      ? 'Hai tuổi có nhiều điểm tương hợp, thuận lợi cho việc kết hôn.'
      : 'Cần tìm hiểu kỹ hơn về tương hợp, bàn bạc thấu đáo trước khi quyết định.',
    khuyenNghi: [
      'Tìm hiểu kỹ lưỡng về nhau',
      'Bàn bạc về tương lai cùng gia đình',
      'Chọn ngày lành tháng tốt để tiến hành',
      thuan ? 'Thời điểm này khá phù hợp' : 'Có thể chờ thêm thời gian sẽ thuận hơn',
    ],
    chuY: 'Chỉ mang tính tham khảo xu hướng. Tình cảm, sự thấu hiểu mới là yếu tố quan trọng nhất.',
  };
}
