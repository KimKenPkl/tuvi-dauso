/**
 * Cơ sở tri thức Tử Vi Đẩu Số bằng tiếng Việt.
 *
 * Toàn bộ nội dung dưới đây được viết cho người Việt: dùng thuật ngữ chuẩn
 * (Miếu/Vượng/Đắc/Hãm, Tứ Hoá, Tam Phương Tứ Chính…), câu văn tự nhiên,
 * tránh lối dịch máy từ tiếng Trung.
 */

// ─────────────────────────────────────────────────────────────────
// 14 CHÍNH TINH
// ─────────────────────────────────────────────────────────────────

export interface SaoInfo {
  ten: string;
  hanh: string;
  amDuong: string;
  viTri: string;
  chuQuan: string;
  tinhCach: string;
  menh: string;
  suNghiep: string;
  tinhCam: string;
  sucKhoe: string;
  loiKhuyen: string;
}

export const CHINH_TINH: Record<string, SaoInfo> = {
  'Tử Vi': {
    ten: 'Tử Vi',
    hanh: 'Âm Thổ',
    amDuong: 'Âm',
    viTri: 'Bắc Đẩu — Đế tinh',
    chuQuan: 'Quyền quý, địa vị, uy tín, khả năng lãnh đạo',
    tinhCach:
      'Tử Vi là ngôi sao đứng đầu 14 chính tinh, tượng trưng cho vua. Người có Tử Vi thủ Mệnh thường có lòng tự trọng cao, thích được tôn trọng, có khí chất lãnh đạo và gu thẩm mỹ tốt. Họ bao dung nhưng cũng dễ tự ái, đôi khi cố chấp vì muốn giữ thể diện.',
    menh:
      'Mệnh Tử Vi: khí chất đường hoàng, có tố chất thủ lĩnh, hợp với vai trò quản lý hoặc công việc cần uy tín cá nhân. Càng về trung niên càng vững.',
    suNghiep:
      'Hợp với quản lý, nhà nước, giáo dục, y tế, văn hoá, hoặc tự xây dựng thương hiệu cá nhân. Thành công đến từ uy tín hơn là từ kỹ thuật thuần tuý.',
    tinhCam:
      'Trọng nghĩa, cần sự tôn trọng trong tình cảm. Dễ tổn thương khi bị xem nhẹ. Hôn nhân bền nếu người bạn đời biết ghi nhận.',
    sucKhoe:
      'Cần để ý tỳ vị, tiêu hoá và huyết áp. Căng thẳng thường đến từ áp lực thể diện.',
    loiKhuyen:
      'Học cách lắng nghe trước khi quyết. Bớt sĩ diện sẽ giảm được phần lớn mâu thuẫn không đáng có.',
  },
  'Thiên Cơ': {
    ten: 'Thiên Cơ',
    hanh: 'Âm Mộc',
    amDuong: 'Âm',
    viTri: 'Nam Đẩu — Trí tinh',
    chuQuan: 'Trí tuệ, mưu lược, tính toán, sự biến động',
    tinhCach:
      'Thiên Cơ là sao của trí tuệ và sự khéo léo. Người có Thiên Cơ thủ Mệnh thường nhanh trí, thích tìm hiểu, giỏi phân tích và có năng khiếu về kỹ thuật. Đổi lại, họ dễ nghĩ nhiều, lo xa quá mức và khó dứt khoát.',
    menh:
      'Mệnh Thiên Cơ: đầu óc linh hoạt, học nhanh, thích hợp công việc cần tư duy. Cuộc đời có nhiều thay đổi hướng đi, nhưng mỗi lần đổi thường tiến bộ hơn.',
    suNghiep:
      'Mạnh ở kỹ thuật, công nghệ, nghiên cứu, kế toán, tư vấn, giáo dục. Càng làm việc cần động não càng phát huy.',
    tinhCam:
      'Tình cảm thiên về lý trí, dễ do dự. Cần người bạn đời kiên nhẫn, đừng thúc ép quyết định.',
    sucKhoe:
      'Hay mất ngủ, đau đầu, căng thẳng thần kinh. Cần vận động và ngủ đủ giấc.',
    loiKhuyen:
      'Đừng chờ đủ dữ kiện mới hành động. Quyết định ở mức 70% thông tin thường đã đủ tốt.',
  },
  'Thái Dương': {
    ten: 'Thái Dương',
    hanh: 'Dương Hoả',
    amDuong: 'Dương',
    viTri: 'Trung tâm — Quang minh tinh',
    chuQuan: 'Danh tiếng, sự nghiệp công khai, người cha, người chồng',
    tinhCach:
      'Thái Dương là mặt trời, chủ về sự rạng rỡ và cho đi. Người Thái Dương thủ Mệnh thường nhiệt tình, hào phóng, thích giúp người và có nhu cầu được công nhận. Họ mạnh mẽ bề ngoài nhưng cũng dễ kiệt sức vì ôm đồm.',
    menh:
      'Mệnh Thái Dương: tính hướng ngoại, có sức lan toả, dễ nổi bật trong tập thể. Nhập Miếu càng rực rỡ; Hãm địa thì vất vả hơn nhưng vẫn là người có tâm.',
    suNghiep:
      'Hợp với giáo dục, y tế, truyền thông, chính trị, quản lý cộng đồng, kinh doanh cần uy tín.',
    tinhCam:
      'Tình cảm rộng rãi, dễ bị hiểu lầm là đa tình. Cần người bạn đời hiểu rằng sự hào phóng của họ là bản chất, không phải tín hiệu mập mờ.',
    sucKhoe:
      'Chú ý tim mạch, mắt, huyết áp. Tránh làm việc quá sức kéo dài.',
    loiKhuyen:
      'Học cách nói "không". Cho đi quá mức mà không giữ giới hạn sẽ dẫn đến oán trách.',
  },
  'Vũ Khúc': {
    ten: 'Vũ Khúc',
    hanh: 'Âm Kim',
    amDuong: 'Âm',
    viTri: 'Bắc Đẩu — Tài tinh',
    chuQuan: 'Tiền bạc, tài chính, sự cương nghị',
    tinhCach:
      'Vũ Khúc là sao tài lộc nhưng mang khí chất võ tướng: quyết đoán, thực tế, nói ít làm nhiều. Người Vũ Khúc thủ Mệnh thường giỏi kiếm tiền, coi trọng hiệu quả hơn hình thức, đôi khi bị đánh giá là khô khan.',
    menh:
      'Mệnh Vũ Khúc: ý chí mạnh, tự lập sớm, hợp con đường tài chính — kinh doanh — kỹ thuật. Tiền bạc thường đến từ nỗ lực thực chất.',
    suNghiep:
      'Mạnh ở tài chính, ngân hàng, kế toán, cơ khí, xây dựng, quân sự, thể thao, hoặc kinh doanh tự thân.',
    tinhCam:
      'Tình cảm kín đáo, ít lời. Thể hiện yêu thương bằng hành động và trách nhiệm hơn là lời nói.',
    sucKhoe:
      'Chú ý phổi, hô hấp, xương khớp và dạ dày.',
    loiKhuyen:
      'Mềm mỏng hơn trong giao tiếp. Năng lực của bạn đã đủ, điều còn thiếu thường là sự khéo léo.',
  },
  'Thiên Đồng': {
    ten: 'Thiên Đồng',
    hanh: 'Dương Thuỷ',
    amDuong: 'Dương',
    viTri: 'Nam Đẩu — Phúc tinh',
    chuQuan: 'Phúc khí, sự an nhàn, cảm xúc, hưởng thụ',
    tinhCach:
      'Thiên Đồng là phúc tinh, chủ về sự nhẹ nhàng và dễ chịu. Người Thiên Đồng thủ Mệnh thường ôn hoà, dễ gần, có duyên và biết tận hưởng cuộc sống. Nhược điểm là dễ an phận, ngại va chạm và thiếu tính cạnh tranh.',
    menh:
      'Mệnh Thiên Đồng: cuộc sống thường có quý nhân, ít sóng gió lớn. Thành công đến theo hướng tích luỹ chậm mà chắc.',
    suNghiep:
      'Hợp với dịch vụ, du lịch, ẩm thực, giáo dục mầm non, chăm sóc sức khoẻ, nghệ thuật.',
    tinhCam:
      'Giàu cảm xúc, dễ đồng cảm, nhưng dễ phụ thuộc tình cảm. Cần người bạn đời ổn định.',
    sucKhoe:
      'Chú ý tiêu hoá, thận và cân nặng. Dễ mắc bệnh do lười vận động.',
    loiKhuyen:
      'Đặt cho mình mục tiêu đủ khó. Sự dễ chịu là phần thưởng, không nên là lối sống.',
  },
  'Liêm Trinh': {
    ten: 'Liêm Trinh',
    hanh: 'Âm Hoả',
    amDuong: 'Âm',
    viTri: 'Bắc Đẩu — Thứ đào hoa tinh',
    chuQuan: 'Tình cảm, quan hệ, kỷ luật, tài năng nghệ thuật',
    tinhCach:
      'Liêm Trinh là sao phức tạp, vừa nguyên tắc vừa đa cảm. Người Liêm Trinh thủ Mệnh thường có sức hút, giỏi giao tiếp, có năng khiếu nghệ thuật và rất coi trọng sĩ diện. Khi mất cân bằng dễ rơi vào cực đoan.',
    menh:
      'Mệnh Liêm Trinh: cá tính mạnh, có duyên với người khác giới, đời sống nội tâm phong phú. Cần kỷ luật tự thân để phát huy mặt tốt.',
    suNghiep:
      'Hợp với luật, ngoại giao, nghệ thuật, thiết kế, marketing, quan hệ công chúng, y dược.',
    tinhCam:
      'Đào hoa mạnh, dễ có nhiều mối quan hệ. Hôn nhân cần sự rõ ràng và ranh giới.',
    sucKhoe:
      'Chú ý tim, huyết áp, sinh lý và các bệnh liên quan đến căng thẳng.',
    loiKhuyen:
      'Đặt ra nguyên tắc cho bản thân trước khi hoàn cảnh đặt ra. Ranh giới rõ ràng chính là tự do.',
  },
  'Thiên Phủ': {
    ten: 'Thiên Phủ',
    hanh: 'Dương Thổ',
    amDuong: 'Dương',
    viTri: 'Nam Đẩu — Kho tàng',
    chuQuan: 'Tài sản, sự ổn định, khả năng quản lý và tích luỹ',
    tinhCach:
      'Thiên Phủ là kho lẫm, chủ về sự sung túc và ổn định. Người Thiên Phủ thủ Mệnh thường điềm đạm, biết lo xa, giỏi quản lý nguồn lực, sống có kế hoạch. Nhược điểm là bảo thủ, ngại thay đổi.',
    menh:
      'Mệnh Thiên Phủ: đường đời tương đối bằng phẳng, biết tích luỹ, dễ có của ăn của để. Hợp vai trò quản trị và giữ vững hệ thống.',
    suNghiep:
      'Mạnh ở quản lý, tài chính, bất động sản, hành chính, logistics, nông nghiệp.',
    tinhCam:
      'Chung thuỷ, thực tế, xem trọng sự an toàn. Cần người bạn đời cùng chí hướng tích luỹ.',
    sucKhoe:
      'Chú ý dạ dày, tỳ vị, đường tiêu hoá và mỡ máu.',
    loiKhuyen:
      'Đừng để sự an toàn trở thành cái bẫy. Mỗi năm nên thử một điều mới.',
  },
  'Thái Âm': {
    ten: 'Thái Âm',
    hanh: 'Âm Thuỷ',
    amDuong: 'Âm',
    viTri: 'Trung tâm — Tài tinh nội tâm',
    chuQuan: 'Tài lộc ngầm, sự tinh tế, người mẹ, người vợ',
    tinhCach:
      'Thái Âm là mặt trăng, chủ về sự dịu dàng và chiều sâu nội tâm. Người Thái Âm thủ Mệnh thường tinh tế, giàu trực giác, giỏi tích luỹ và có đời sống cảm xúc phong phú. Họ kín đáo, đôi khi dễ tự ti.',
    menh:
      'Mệnh Thái Âm: tính cách mềm mỏng nhưng bền bỉ, có duyên với tài lộc âm thầm. Nhập Miếu rất tốt cho tài chính dài hạn.',
    suNghiep:
      'Hợp với tài chính, kế toán, bất động sản, nghệ thuật, tâm lý, chăm sóc sức khoẻ, giáo dục.',
    tinhCam:
      'Sâu sắc, chung thuỷ, nhưng dễ giữ trong lòng rồi tổn thương. Cần học cách nói ra.',
    sucKhoe:
      'Chú ý thận, hệ bài tiết, mắt và các vấn đề liên quan đến giấc ngủ.',
    loiKhuyen:
      'Trực giác của bạn rất tốt, nhưng đừng để nó thay thế dữ liệu. Kiểm chứng trước khi quyết.',
  },
  'Tham Lang': {
    ten: 'Tham Lang',
    hanh: 'Dương Mộc (kiêm Thuỷ)',
    amDuong: 'Dương',
    viTri: 'Bắc Đẩu — Đào hoa tinh',
    chuQuan: 'Dục vọng, giao tiếp, đa tài, sự hấp dẫn',
    tinhCach:
      'Tham Lang là sao của khát vọng và sức sống. Người Tham Lang thủ Mệnh thường đa tài, giao tiếp giỏi, thích trải nghiệm và có sức hút tự nhiên. Khi định hướng tốt thì rất thành công; khi buông thả dễ tiêu hao.',
    menh:
      'Mệnh Tham Lang: năng động, nhiều sở thích, giỏi nắm bắt cơ hội. Cần một mục tiêu dài hạn để quy tụ năng lượng.',
    suNghiep:
      'Hợp với kinh doanh, marketing, giải trí, du lịch, ẩm thực, nghệ thuật, thể thao.',
    tinhCam:
      'Đào hoa mạnh, dễ thu hút. Hôn nhân bền khi cả hai có không gian riêng và sự tin tưởng.',
    sucKhoe:
      'Chú ý gan, túi mật, sinh lý và các bệnh do sinh hoạt thất thường.',
    loiKhuyen:
      'Chọn một con đường và đi sâu. Chiều rộng đã có, chiều sâu mới tạo ra giá trị.',
  },
  'Cự Môn': {
    ten: 'Cự Môn',
    hanh: 'Âm Thuỷ',
    amDuong: 'Âm',
    viTri: 'Bắc Đẩu — Ám tinh',
    chuQuan: 'Khẩu tài, tranh luận, nghiên cứu, thị phi',
    tinhCach:
      'Cự Môn chủ về cái miệng và sự đào sâu. Người Cự Môn thủ Mệnh thường có khẩu tài, tư duy sắc bén, giỏi phân tích và ưa lý lẽ. Mặt trái là dễ vướng thị phi, nói thẳng quá mức.',
    menh:
      'Mệnh Cự Môn: thông minh, có khả năng ăn nói hoặc nghiên cứu chuyên sâu. Càng về sau càng được nể trọng nếu biết tiết chế lời nói.',
    suNghiep:
      'Hợp với luật, giảng dạy, báo chí, tư vấn, nghiên cứu, ngoại ngữ, kinh doanh cần đàm phán.',
    tinhCam:
      'Thẳng thắn, đôi khi làm người khác tổn thương. Cần học cách nói mềm trước khi nói đúng.',
    sucKhoe:
      'Chú ý miệng, răng, họng, dạ dày và hệ tiêu hoá.',
    loiKhuyen:
      'Đúng về nội dung chưa đủ, cần đúng cả cách nói. Đây là kỹ năng đáng đầu tư nhất của bạn.',
  },
  'Thiên Tướng': {
    ten: 'Thiên Tướng',
    hanh: 'Dương Thuỷ',
    amDuong: 'Dương',
    viTri: 'Nam Đẩu — Ấn tinh',
    chuQuan: 'Sự trợ giúp, công bằng, ngoại giao, phục vụ',
    tinhCach:
      'Thiên Tướng là ấn tín của vua, chủ về sự hỗ trợ và công bằng. Người Thiên Tướng thủ Mệnh thường hoà nhã, biết điều, giỏi phối hợp và có duyên được người khác nâng đỡ. Đôi khi thiếu chính kiến vì muốn hài lòng mọi người.',
    menh:
      'Mệnh Thiên Tướng: đường đời nhiều quý nhân, hợp làm việc trong tổ chức lớn. Thành công đến qua uy tín và sự tín nhiệm.',
    suNghiep:
      'Hợp với hành chính, ngoại giao, nhân sự, luật, y tế, tư vấn, dịch vụ khách hàng.',
    tinhCam:
      'Chu đáo, biết chăm sóc. Cần tránh xu hướng nhẫn nhịn rồi tích tụ bất mãn.',
    sucKhoe:
      'Chú ý thận, hệ bài tiết, da và các vấn đề do stress.',
    loiKhuyen:
      'Giúp người là tốt, nhưng cần giữ chính kiến. Sự tử tế không đồng nghĩa với việc luôn đồng ý.',
  },
  'Thiên Lương': {
    ten: 'Thiên Lương',
    hanh: 'Dương Thổ',
    amDuong: 'Dương',
    viTri: 'Nam Đẩu — Thọ tinh',
    chuQuan: 'Sự che chở, nguyên tắc, y dược, tuổi thọ',
    tinhCach:
      'Thiên Lương là sao của người lớn, chủ về che chở và trường thọ. Người Thiên Lương thủ Mệnh thường chín chắn, có trách nhiệm, thích giúp đỡ và coi trọng đạo lý. Đôi khi nguyên tắc quá mức khiến họ khó tính.',
    menh:
      'Mệnh Thiên Lương: được nhiều người kính trọng, có xu hướng "anh cả" trong tập thể. Càng lớn tuổi càng có uy.',
    suNghiep:
      'Hợp với y tế, giáo dục, luật, tôn giáo, công tác xã hội, quản lý nhân sự.',
    tinhCam:
      'Nghiêm túc, bền vững, đôi khi thiếu lãng mạn. Cần người bạn đời trân trọng sự ổn định.',
    sucKhoe:
      'Chú ý dạ dày, tỳ vị, xương khớp. Nhìn chung sức bền tốt.',
    loiKhuyen:
      'Đừng biến nguyên tắc thành bức tường. Người trẻ cần được sai để trưởng thành.',
  },
  'Thất Sát': {
    ten: 'Thất Sát',
    hanh: 'Dương Kim (kiêm Âm Kim)',
    amDuong: 'Dương',
    viTri: 'Nam Đẩu — Sát tinh',
    chuQuan: 'Quyết đoán, xung phong, thay đổi, thử thách',
    tinhCach:
      'Thất Sát là tướng quân xông trận. Người Thất Sát thủ Mệnh thường dũng cảm, độc lập, quyết đoán và không ngại va chạm. Họ tiến rất nhanh nhưng dễ bỏ lỡ chi tiết, và cuộc đời thường có biến động lớn.',
    menh:
      'Mệnh Thất Sát: cá tính mạnh, tự lập sớm, hợp môi trường cạnh tranh. Cần học cách kiểm soát nhịp độ.',
    suNghiep:
      'Hợp với quân sự, công an, thể thao, kinh doanh, kỹ thuật hiện trường, khởi nghiệp.',
    tinhCam:
      'Mãnh liệt nhưng ít kiên nhẫn. Cần người bạn đời độc lập, không quá phụ thuộc.',
    sucKhoe:
      'Chú ý chấn thương, phổi, hô hấp và các bệnh cấp tính.',
    loiKhuyen:
      'Sức mạnh lớn cần phanh tốt. Nghỉ đúng lúc là một phần của chiến thắng.',
  },
  'Phá Quân': {
    ten: 'Phá Quân',
    hanh: 'Âm Thuỷ',
    amDuong: 'Âm',
    viTri: 'Bắc Đẩu — Hao tinh',
    chuQuan: 'Phá cũ lập mới, đột phá, tiêu hao, tái thiết',
    tinhCach:
      'Phá Quân chủ về sự phá cách và đổi mới. Người Phá Quân thủ Mệnh thường dám nghĩ dám làm, không thích khuôn mẫu, có khả năng tái thiết rất tốt. Mặt trái là dễ bỏ dở, tiêu hao nguồn lực và thiếu kiên định.',
    menh:
      'Mệnh Phá Quân: cuộc đời nhiều lần "đập đi xây lại", mỗi lần đều mạnh hơn. Hợp người làm cải cách, khởi nghiệp, sáng tạo.',
    suNghiep:
      'Hợp với khởi nghiệp, công nghệ, xây dựng, quân sự, nghệ thuật, các ngành cần đổi mới.',
    tinhCam:
      'Nồng nhiệt nhưng dễ thay đổi. Cần người bạn đời hiểu rằng sự đổi mới là bản chất, không phải thiếu chung thuỷ.',
    sucKhoe:
      'Chú ý thận, hệ bài tiết, răng và các bệnh do làm việc quá độ.',
    loiKhuyen:
      'Trước khi phá, hãy viết ra kế hoạch xây. Bản năng của bạn rất mạnh, nhưng cần khung.',
  },
};

// ─────────────────────────────────────────────────────────────────
// 12 CUNG
// ─────────────────────────────────────────────────────────────────

export interface CungInfo {
  ten: string;
  tenGoc: string;
  linhVuc: string;
  yNghia: string;
}

export const CUNG_INFO: CungInfo[] = [
  {
    ten: 'Mệnh',
    tenGoc: '命宫',
    linhVuc: 'Bản thân, tính cách, khí chất, con đường đời',
    yNghia:
      'Cung Mệnh là trung tâm của lá số, phản ánh bản chất con người, cách phản ứng với hoàn cảnh và tiềm năng tổng thể. Cung Mệnh mạnh thì cuộc đời chủ động; yếu thì dễ bị hoàn cảnh dẫn dắt.',
  },
  {
    ten: 'Huynh Đệ',
    tenGoc: '兄弟',
    linhVuc: 'Anh chị em, bạn thân, đối tác ngang hàng',
    yNghia:
      'Phản ánh quan hệ với anh chị em ruột và những người ngang vai trong cuộc sống. Cung này tốt thì được nâng đỡ khi khó khăn; xấu thì dễ phải tự lực.',
  },
  {
    ten: 'Phu Thê',
    tenGoc: '夫妻',
    linhVuc: 'Hôn nhân, bạn đời, tình cảm lâu dài',
    yNghia:
      'Cho biết mẫu người bạn đời phù hợp, chất lượng hôn nhân và cách bạn hành xử trong quan hệ tình cảm. Cần đọc cùng cung Mệnh để có bức tranh đầy đủ.',
  },
  {
    ten: 'Tử Nữ',
    tenGoc: '子女',
    linhVuc: 'Con cái, học trò, sản phẩm sáng tạo',
    yNghia:
      'Không chỉ nói về con cái mà còn về những gì bạn sinh ra và nuôi dưỡng: dự án, học trò, tác phẩm. Cung này tốt thường đi kèm khả năng truyền đạt.',
  },
  {
    ten: 'Tài Bạch',
    tenGoc: '财帛',
    linhVuc: 'Tiền bạc, thu nhập, cách kiếm và giữ tiền',
    yNghia:
      'Phản ánh cách bạn tạo ra và quản lý tiền. Cần đọc cùng cung Quan Lộc (kiếm tiền bằng gì) và Điền Trạch (giữ tiền ra sao).',
  },
  {
    ten: 'Tật Ách',
    tenGoc: '疾厄',
    linhVuc: 'Sức khoẻ, bệnh tật, điểm yếu thể chất',
    yNghia:
      'Chỉ ra cơ quan dễ yếu và kiểu bệnh dễ gặp. Đây là cung nên xem định kỳ để chủ động phòng bệnh hơn là để đoán bệnh.',
  },
  {
    ten: 'Thiên Di',
    tenGoc: '迁移',
    linhVuc: 'Đi xa, môi trường bên ngoài, cơ hội ngoại giao',
    yNghia:
      'Cho biết vận may khi ra ngoài, đi xa, xuất ngoại. Cung Thiên Di tốt thường là dấu hiệu nên ra khỏi vùng an toàn để phát triển.',
  },
  {
    ten: 'Nô Bộc',
    tenGoc: '仆役',
    linhVuc: 'Cấp dưới, bạn bè, cộng sự, mạng lưới quan hệ',
    yNghia:
      'Phản ánh chất lượng đội ngũ và bạn bè xung quanh. Cung tốt thì được người giỏi hỗ trợ; xấu thì cần cẩn trọng khi chọn cộng sự.',
  },
  {
    ten: 'Quan Lộc',
    tenGoc: '官禄',
    linhVuc: 'Sự nghiệp, công việc, vị trí xã hội',
    yNghia:
      'Là cung quan trọng thứ hai sau Mệnh, cho biết hướng sự nghiệp phù hợp và mức độ thành đạt. Đọc cùng Tam Phương Tứ Chính với Mệnh và Tài Bạch.',
  },
  {
    ten: 'Điền Trạch',
    tenGoc: '田宅',
    linhVuc: 'Nhà cửa, đất đai, tài sản tích luỹ, gia đình',
    yNghia:
      'Phản ánh khả năng tích luỹ tài sản và môi trường sống. Cung này tốt thường đi kèm sự ổn định dài hạn về vật chất.',
  },
  {
    ten: 'Phúc Đức',
    tenGoc: '福德',
    linhVuc: 'Tâm lý, hạnh phúc, đời sống tinh thần, phúc khí',
    yNghia:
      'Cho biết mức độ bình an nội tâm và cách bạn tận hưởng cuộc sống. Cung Phúc Đức mạnh giúp vượt qua nghịch cảnh tốt hơn nhiều so với việc chỉ có tiền.',
  },
  {
    ten: 'Phụ Mẫu',
    tenGoc: '父母',
    linhVuc: 'Cha mẹ, người bề trên, học vấn nền tảng',
    yNghia:
      'Phản ánh quan hệ với cha mẹ và những người dẫn dắt. Cũng cho biết mức độ thuận lợi trong học vấn và sự nghiệp nhờ nền tảng gia đình.',
  },
];

export const cungInfo = (ten: string): CungInfo | undefined =>
  CUNG_INFO.find((c) => c.ten === ten);

// ─────────────────────────────────────────────────────────────────
// PHỤ TINH — ý nghĩa ngắn
// ─────────────────────────────────────────────────────────────────

export const PHU_TINH_INFO: Record<string, string> = {
  'Tả Phù': 'Trợ lực, quý nhân phù trợ, khả năng tổ chức và dẫn dắt tập thể.',
  'Hữu Bật': 'Trợ lực mềm, được người giúp đỡ, duyên giao tiếp rộng.',
  'Văn Xương': 'Học vấn, thi cử, hành văn, tư duy hệ thống.',
  'Văn Khúc': 'Biểu đạt, nghệ thuật, sự khéo léo trong giao tiếp.',
  'Thiên Khôi': 'Quý nhân nam giới, cơ hội đến đúng lúc.',
  'Thiên Việt': 'Quý nhân nữ giới, sự nâng đỡ âm thầm.',
  'Kình Dương': 'Xung đột, quyết liệt, dễ tổn thương nhưng tạo đột phá.',
  'Đà La': 'Trì hoãn, dai dẳng, thử thách sự kiên nhẫn.',
  'Hỏa Tinh': 'Bốc đồng, nóng nảy, hành động nhanh nhưng thiếu bền.',
  'Linh Tinh': 'Lo âu, nhạy cảm, sắc bén nhưng dễ tự tạo áp lực.',
  'Địa Không': 'Tư tưởng thoát tục, khả năng sáng tạo, hao tổn vật chất.',
  'Địa Kiếp': 'Biến cố, mất mát bất ngờ, đổi hướng ngoài dự tính.',
  'Lộc Tồn': 'Tài lộc ổn định, biết tích luỹ, quý nhân tài chính.',
  'Thiên Mã': 'Di chuyển, thay đổi nơi ở, cơ hội từ việc đi xa.',
  'Hồng Loan': 'Hỉ sự, duyên hôn nhân, sự kiện vui.',
  'Thiên Hỷ': 'Sự kiện vui, may mắn trong các mối quan hệ.',
  'Thiên Hình': 'Kỷ luật, pháp lý, tính nguyên tắc và cẩn trọng.',
  'Thiên Diêu': 'Sức hút, duyên đào hoa, sự phóng khoáng.',
  'Cô Thần': 'Xu hướng tự lập, dễ đơn độc nếu không chủ động kết nối.',
  'Quả Tú': 'Đề cao giá trị riêng, cần học cách mở lòng.',
  'Thiên Khốc': 'Nhạy cảm, dễ xúc động, có chiều sâu cảm xúc.',
  'Thiên Hư': 'Dễ lo xa quá mức, cần neo vào thực tế.',
  'Long Trì': 'Phong thái tốt, có duyên tài lộc và uy tín.',
  'Phụng Các': 'Gu thẩm mỹ, sự tinh tế.',
  'Tam Thai': 'Được đề bạt, sự công nhận từ cấp trên.',
  'Bát Toạ': 'Sự nâng đỡ, vị trí vững vàng.',
  'Ân Quang': 'Được yêu mến nhờ sự tử tế.',
  'Thiên Quý': 'Danh dự, sự tôn trọng từ người khác.',
  'Đài Phụ': 'Sự trợ giúp về học thuật, giấy tờ.',
  'Phong Cáo': 'Danh phận, bằng cấp, sự công nhận chính thức.',
  'Thiên Quan': 'Công danh, chức vụ.',
  'Thiên Phúc': 'Phúc khí, cuộc sống nhẹ nhàng hơn.',
  'Thiên Tài': 'Sự thông minh, khả năng thể hiện.',
  'Thiên Thọ': 'Sức bền, tuổi thọ, sự trường tồn.',
  'Giải Thần': 'Giải hạn, giảm nhẹ tai ương.',
  'Âm Sát': 'Điềm báo cần cẩn trọng, dễ bị hiểu lầm.',
  'Phá Toái': 'Sự rời rạc, hao tổn nhỏ.',
  'Phi Liêm': 'Duyên với công việc giấy tờ, pháp lý.',
  'Thiên Vu': 'Sự tin tưởng của cấp trên.',
  'Thiên Nguyệt': 'Bệnh nhẹ, sự chú ý về sức khoẻ.',
  'Thiên Trù': 'Ẩm thực, sự hưởng thụ.',
  'Niên Giải': 'Giải trừ vận hạn nhỏ trong năm.',
  'Triệt Không': 'Sự chặn ngang, gián đoạn — cần kiên nhẫn.',
  'Tuần Không': 'Sự trống trải, cần lấp bằng hành động.',
  'Kiếp Sát': 'Rủi ro đột ngột, cần phòng ngừa.',
  'Đại Hao': 'Hao tổn tiền bạc hoặc công sức.',
  'Tiểu Hao': 'Hao tổn nhỏ, chi tiêu lẻ tẻ.',
  'Hoa Cái': 'Có duyên tâm linh, nghệ thuật, thích sự tĩnh lặng.',
  'Hàm Trì': 'Đào hoa lộ rõ, sức hấp dẫn bề ngoài.',
};

// ─────────────────────────────────────────────────────────────────
// CÁCH CỤC
// ─────────────────────────────────────────────────────────────────

export interface CachCuc {
  ten: string;
  dieuKien: (tenCungMenh: string[], chinhTinhMenh: string[]) => boolean;
  yNghia: string;
  mucDo: 'tốt' | 'khá' | 'cần lưu ý';
}

export const CACH_CUC: CachCuc[] = [
  {
    ten: 'Tử Phủ đồng cung',
    dieuKien: (all) => all.includes('Tử Vi') && all.includes('Thiên Phủ'),
    yNghia:
      'Tử Vi và Thiên Phủ cùng hội ở cung Mệnh — cách cục vững như kho lẫm có vua. Đây là cách quý, chủ về quyền thế và tài sản, phù hợp vị trí quản lý, lãnh đạo. Cần đề phòng tính bảo thủ khi đã ở đỉnh.',
    mucDo: 'tốt',
  },
  {
    ten: 'Cơ Nguyệt Đồng Lương',
    dieuKien: (all) =>
      ['Thiên Cơ', 'Thái Âm', 'Thiên Đồng', 'Thiên Lương'].filter((s) => all.includes(s)).length >= 3,
    yNghia:
      'Bộ tứ sao văn khúc tạo nên con người hiền hoà, giỏi chuyên môn, đời sống tinh thần ổn. Thành công đi theo hướng chậm mà bền, hợp giáo dục, y tế, nghiên cứu.',
    mucDo: 'khá',
  },
  {
    ten: 'Sát Phá Lang',
    dieuKien: (all) =>
      ['Thất Sát', 'Phá Quân', 'Tham Lang'].filter((s) => all.includes(s)).length >= 2,
    yNghia:
      'Cách của người tiên phong, dám va chạm và chấp nhận rủi ro. Cuộc đời nhiều biến động nhưng dễ tạo dấu ấn nếu có định hướng rõ. Kỵ sự thiếu kiên định.',
    mucDo: 'khá',
  },
  {
    ten: 'Vũ Tham',
    dieuKien: (all) => all.includes('Vũ Khúc') && all.includes('Tham Lang'),
    yNghia:
      'Bộ đôi tài chính — dục vọng, chủ về tay làm hàm nhai nhưng có khả năng tạo gia sản lớn. Thích hợp kinh doanh, đầu tư. Cần kiểm soát chi tiêu và đam mê.',
    mucDo: 'khá',
  },
  {
    ten: 'Nhật Nguyệt đồng cung',
    dieuKien: (all) => all.includes('Thái Dương') && all.includes('Thái Âm'),
    yNghia:
      'Thái Dương và Thái Âm hội chiếu — âm dương cân bằng, khép được cả việc công và việc nhà. Dễ thành công khi làm việc ở môi trường giao thoa Nam — Bắc hoặc các ngành đối ngoại.',
    mucDo: 'tốt',
  },
  {
    ten: 'Liêm Trinh — Thiên Tướng',
    dieuKien: (all) => all.includes('Liêm Trinh') && all.includes('Thiên Tướng'),
    yNghia:
      'Cách cục của người giỏi quan hệ nhưng có nguyên tắc, hợp với luật pháp, ngoại giao, quản lý cộng đồng. Cần thận với chuyện đào hoa.',
    mucDo: 'khá',
  },
  {
    ten: 'Cự Nhật',
    dieuKien: (all) => all.includes('Cự Môn') && all.includes('Thái Dương'),
    yNghia:
      'Cự Môn gặp Thái Dương — năng khiếu ngôn ngữ, đối ngoại, truyền thông. Rất phù hợp người làm giáo dục, ngoại ngữ, luật. Cần tránh vạ miệng.',
    mucDo: 'tốt',
  },
  {
    ten: 'Mệnh vô chính diệu',
    dieuKien: (_all, chinhTinhMenh) => chinhTinhMenh.length === 0,
    yNghia:
      'Cung Mệnh không có 14 chính tinh — đây không phải cách xấu. Cách này chủ về con người linh hoạt, dễ thích nghi, cuộc đời chịu ảnh hưởng mạnh từ môi trường. Cần mượn sao từ cung xung chiếu để luận.',
    mucDo: 'cần lưu ý',
  },
  {
    ten: 'Lộc Mã giao trì',
    dieuKien: (all) => all.includes('Lộc Tồn') && all.includes('Thiên Mã'),
    yNghia:
      'Lộc Tồn gặp Thiên Mã — tiền bạc đến từ sự dịch chuyển, hợp làm ăn xa, thương mại, xuất nhập khẩu, du lịch. Càng đi càng có lộc.',
    mucDo: 'tốt',
  },
  {
    ten: 'Không Kiếp hội chiếu',
    dieuKien: (all) => all.includes('Địa Không') && all.includes('Địa Kiếp'),
    yNghia:
      'Cặp sao không kiếp hội về — nhắc nhở tránh đầu cơ, bao thầu, và các kế hoạch thiếu phương án dự phòng. Đổi lại là trực giác và khả năng sáng tạo vượt trội.',
    mucDo: 'cần lưu ý',
  },
];

// ─────────────────────────────────────────────────────────────────
// NGŨ HÀNH TƯƠNG QUAN
// ─────────────────────────────────────────────────────────────────

export const NGU_HANH: Record<string, string> = {
  'Thủy Nhị Cục': 'Mệnh Thuỷ — cơ chế hành động chậm mà chắc, hợp phát triển dần dần.',
  'Mộc Tam Cục': 'Mệnh Mộc — thiên hướng phát triển, sinh sôi, thích ứng nhanh.',
  'Kim Tứ Cục': 'Mệnh Kim — quyết đoán, sắc bén, phù hợp công việc cần kỷ luật.',
  'Thổ Ngũ Cục': 'Mệnh Thổ — ổn định, coi trọng gốc rễ, hợp lĩnh vực tích luỹ dài hạn.',
  'Hỏa Lục Cục': 'Mệnh Hoả — nhiệt huyết, hành động nhanh, cần rèn tính kiên trì.',
};
