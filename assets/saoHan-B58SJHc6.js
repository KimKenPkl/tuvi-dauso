const c=[{key:"la-hau",ten:"La Hầu",han:"羅睺",tinhChat:"hung",yNghia:"Chủ hao tài, thị phi, bệnh về mắt và khí huyết. Năm gặp La Hầu nên giữ lời ăn tiếng nói, tránh tranh chấp và chú ý sức khoẻ.",danhHieu:"Đức Thiên cung Thần chủ La Hầu Tinh quân"},{key:"ke-do",ten:"Kế Đô",han:"計都",tinhChat:"hung",yNghia:"Chủ tai nạn, kiện cáo, hao tổn và chuyện buồn trong nhà. Nên cẩn trọng khi đi lại, giấy tờ và tránh quyết định lớn trong năm.",danhHieu:"Đức Địa cung Thần Vỹ Kế Đô Tinh quân"},{key:"thai-duong",ten:"Thái Dương",han:"太陽",tinhChat:"cat",yNghia:"Chủ quyền quý, danh tiếng, công danh. Nam gặp thì thuận, nữ gặp phải vất vả hơn vì phải gánh vác nhiều việc.",danhHieu:"Đức Nhật cung Thái Dương Thiên tử Tinh quân",hopGioiTinh:"Nam"},{key:"thai-am",ten:"Thái Âm",han:"太陰",tinhChat:"cat",yNghia:"Chủ điền sản, của cải và tình cảm. Nữ gặp thì thuận, nam gặp dễ vướng chuyện tình cảm hoặc phải lo việc nhà.",danhHieu:"Đức Nguyệt cung Thái Âm Hoàng hậu Tinh quân",hopGioiTinh:"Nữ"},{key:"moc-duc",ten:"Mộc Đức",han:"木德",tinhChat:"cat",yNghia:"Chủ phúc thọ, quý nhân, hanh thông. Năm gặp Mộc Đức dễ có người giúp, việc làm ăn và học hành thuận lợi.",danhHieu:"Đức Đông phương Giáp Ất Mộc Đức Tinh quân"},{key:"hoa-duc",ten:"Hỏa Đức",han:"火德",tinhChat:"hung",yNghia:"Chủ hoả hoạn, nóng giận, kiện tụng. Nên cẩn thận điện, lửa, xe cộ và giữ hoà khí trong gia đình.",danhHieu:"Đức Nam phương Bính Đinh Hỏa Đức Tinh quân"},{key:"tho-duc",ten:"Thổ Đức",han:"土德",tinhChat:"binh",yNghia:"Chủ an ổn, điền thổ, chậm mà chắc. Năm gặp Thổ Đức ít biến động lớn, hợp việc xây dựng, mua bán nhà đất.",danhHieu:"Đức Trung ương Mậu Kỷ Thổ Đức Tinh quân"},{key:"thai-bach",ten:"Thái Bạch",han:"太白",tinhChat:"hung",yNghia:"Chủ tang thương, đao binh, phá tài. Nên tránh đi xa đường hiểm, cẩn thận va chạm và hạn chế cho vay mượn.",danhHieu:"Đức Tây phương Canh Tân Kim đức Thái Bạch Tinh quân"},{key:"thuy-duc",ten:"Thủy Đức",han:"水德",tinhChat:"cat",yNghia:"Chủ thông minh, tài lộc, đi lại thuận. Năm gặp Thủy Đức hợp việc học, việc giao dịch và mở rộng quan hệ.",danhHieu:"Đức Bắc phương Nhâm Quý Thủy đức Tinh quân"}];function g(n,h){return h-n+1}function u(n,h){const i=h==="Nam"?0:1;return((n-10+i)%9+9)%9}function o(n,h,i){const a=g(n,i),t=u(a,h);return{namXem:i,namSinh:n,tuoiMu:a,gioiTinh:h,sao:c[t],truoc:c[(t+8)%9],sau:c[(t+1)%9]}}const m=["Hương (nhang)","Hoa tươi","Ngũ quả","Trầu cau","Rượu, nước","Gạo, muối","Tiền vàng","Đèn hoặc nến"],y="Cúng từ mùng 8 đến 15 tháng Giêng âm lịch, tốt nhất là mùng 8 hoặc Rằm. Nhiều nơi cúng vào buổi chiều tối, khoảng 17–19 giờ.";function T(n){const h=n.ten.trim()||"……………",i=n.diaChi.trim()||"……………";return`Nam mô A Di Đà Phật (3 lần)

Con lạy chín phương Trời, mười phương Chư Phật, Chư Phật mười phương.
Con kính lạy Hoàng thiên Hậu thổ, chư vị Tôn thần.
Con kính lạy các ngài Thần linh cai quản trong khu vực này.

Hôm nay là ngày ${n.ngay} tháng ${n.thang} năm ${n.nam} (âm lịch).

Tín chủ con là: ${h}
Sinh năm ${n.namSinh}, năm nay ${n.tuoiMu} tuổi mụ.
Ngụ tại: ${i}

Nhân dịp đầu năm, tín chủ con thành tâm sắm lễ: hương, hoa, ngũ quả, trầu cau, rượu, nước, gạo, muối, tiền vàng, bày ra trước án.

Cúi xin các vị Tôn thần chứng giám lòng thành, phù hộ cho tín chủ con năm nay bình an, mạnh khoẻ, làm ăn thuận lợi, gia đạo yên ấm.

Năm nay, sao chiếu mệnh của tín chủ con là: ${n.sao}.

Con kính lạy: ${n.danhHieu}.

Cúi xin Ngài giáng lâm chứng giám, ban phúc, giải trừ hạn dữ, độ cho tín chủ con tai qua nạn khỏi, vạn sự hanh thông.

Lễ bái xong, tín chủ con xin hồi hướng công đức cho ông bà tổ tiên, cha mẹ, anh chị em và tất cả chúng sinh.

Nam mô A Di Đà Phật (3 lần)`}export{c as C,m as L,y as T,o as s,T as t};
