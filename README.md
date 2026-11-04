# Tử Vi Việt

Lập lá số **Tử Vi Đẩu Số (紫微斗數)** hoàn toàn bằng tiếng Việt, chạy ngay trên trình duyệt.

Không máy chủ, không tài khoản, không gửi ngày sinh đi đâu.

> Lấy cảm hứng từ repo [`Renhuai123/ziwei-doushu`](https://github.com/Renhuai123/ziwei-doushu) (MIT).
> Bản này giữ lại phần giá trị nhất — **engine an sao** — rồi viết mới toàn bộ lớp tiếng Việt
> và giao diện, để có thể chạy trên GitHub Pages với 0 đồng hạ tầng.

---

## Tính năng

| Nhóm | Chi tiết |
|---|---|
| **Lập lá số** | Dương lịch hoặc âm lịch (kể cả tháng nhuận), 13 khung giờ sinh (Tý sớm → Tý muộn) |
| **Giờ thật** | Tuỳ chọn quy đổi theo kinh độ nơi sinh (true solar time), có sẵn 34 tỉnh/thành sau sáp nhập 2025 |
| **Lá số 12 cung** | Bố cục 4×4 chuẩn cổ pháp, Tý ở dưới, đi ngược chiều kim đồng hồ |
| **Sao** | 14 chính tinh + lục cát + lục sát + tạp diệu, kèm độ sáng Miếu/Vượng/Đắc/Lợi/Bình/Bất/Hãm |
| **Tứ hoá** | Lộc / Quyền / Khoa / Kỵ — cả năm sinh và lưu niên, hiển thị dạng badge màu |
| **Vận hạn** | Đại hạn, Tiểu hạn, Lưu niên; xem theo năm hoặc theo tháng, có timeline 15 năm |
| **Luận giải** | Sinh tự động từ dữ liệu lá số: tổng quan, tính cách, sự nghiệp, tài lộc, tình cảm, sức khoẻ, vận hạn |
| **Cách cục** | Nhận diện Tử Phủ đồng cung, Cơ Nguyệt Đồng Lương, Sát Phá Lang, Vũ Tham, Nhật Nguyệt, Lộc Mã giao trì, Không Kiếp… |
| **Định hướng nghề nghiệp** | Trắc nghiệm RIASEC 24 câu, chấm điểm 6 nhóm tính cách, gợi ý ngành nghề và xuất ảnh kết quả |
| **Âm lịch & ngày cát hung** | Chip nhỏ trên thanh công cụ: ngày âm, Can Chi ngày, 12 Trực, Hoàng Đạo/Hắc Đạo — tính tại chỗ |
| **Xem ngày** | Tra ngày tốt/xấu, giờ hoàng đạo và việc nên làm theo 12 Trực |
| **Xây nhà / Cưới hỏi** | Xem tuổi hợp theo tam hợp, lục hợp, xung, hại; gợi ý năm phù hợp |
| **Lưu lá số** | Cất tối đa 50 lá số kèm nhãn riêng ("Mẹ", "Khách A"…), mở lại một chạm |
| **Lá số gần đây** | Hiển thị 3 lá số mở gần nhất ngay trang chủ |
| **Tìm kiếm lịch sử** | Lọc realtime theo tên, nhãn, ngày sinh — không phân biệt dấu |
| **Ghi chú** | Sổ tay riêng từng lá số, tự lưu sau khi ngừng gõ — để đối chiếu dần với thực tế |
| **Đối chiếu** | So hai lá số theo địa chi cung Mệnh (tam hợp / lục hợp / xung / hại), ngũ hành chính tinh và sao Phu Thê ↔ Mệnh |
| **Xuất ảnh** | Tải lá số thành PNG 2× (nạp thư viện động, không làm nặng bundle) |
| **Xuất PDF** | Ghép lá số (hoặc phần luận giải đang mở) và ghi chú thành tệp A4 nhiều trang, nạp `jspdf` động |
| **Khác** | Chia sẻ lá số qua URL, in bằng `Ctrl+P` |
| **Riêng tư** | 100% client-side. Không analytics, không backend, không API key |

---

## Chạy local

```bash
npm install
npm run dev        # http://localhost:5173
```

```bash
npm run typecheck  # kiểm tra kiểu
npm run test       # engine an sao + lịch âm + smoke test render
npm run build      # build tĩnh ra dist/
npm run preview    # xem thử bản build
```

Yêu cầu: Node 18+.

---

## Deploy lên GitHub Pages

Site đang chạy tại **https://kimkenpkl.github.io/tuvi-dauso/** theo cách deploy tĩnh:

```bash
# Windows PowerShell
$env:VITE_BASE='/tuvi-dauso/'; npm run build
# đẩy toàn bộ nội dung dist/ lên nhánh gh-pages
```

Nếu deploy ở domain gốc (`https://<user>.github.io/`), bỏ biến `VITE_BASE`.

### Tự động hoá bằng GitHub Actions (tuỳ chọn)

Repo có sẵn `.github/workflows/deploy.yml.example`. Muốn dùng Actions:

1. Cấp quyền workflow cho `gh`: `gh auth refresh -s workflow`.
2. Sao chép `deploy.yml.example` thành `deploy.yml`.
3. Vào **Settings → Pages → Source**, chọn **GitHub Actions**.

Workflow tự đặt `VITE_BASE=/<tên-repo>/` nên không cần sửa gì.

---

## Cấu trúc

```
src/
├─ lib/
│  ├─ dict.ts        # từ điển Hán → Việt (162 sao, 12 cung, can chi, tứ hoá…)
│  ├─ chart.ts       # gọi engine iztro, chuẩn hoá thành mô hình LaSo/Cung/Sao
│  ├─ content.ts     # cơ sở tri thức: 14 chính tinh, 12 cung, phụ tinh, cách cục
│  ├─ interpret.ts   # sinh luận giải từ dữ liệu lá số
│  ├─ synastry.ts    # đối chiếu hai lá số (tam hợp / lục hợp / xung / hại)
│  ├─ amlich.ts      # âm lịch, Can Chi, 12 Trực, Hoàng Đạo/Hắc Đạo
│  ├─ career.ts      # trắc nghiệm RIASEC và hồ sơ nghề nghiệp
│  ├─ storage.ts     # localStorage: lá số đã lưu, ghi chú
│  ├─ provinces.ts   # 34 tỉnh/thành + kinh độ (quy đổi giờ thật)
│  └─ __tests__/     # test engine, lịch âm và smoke test render
├─ components/
│  ├─ BirthForm.tsx  # form nhập ngày giờ sinh
│  ├─ ChartBoard.tsx # lưới 4×4
│  ├─ PalaceCell.tsx # một cung
│  ├─ CenterCard.tsx # thông tin trung tâm
│  ├─ DetailPanel.tsx# drawer chi tiết cung
│  ├─ ReadingPanel.tsx
│  ├─ HistoryPanel.tsx   # drawer lá số đã lưu + tìm kiếm
│  ├─ CompatibilityView.tsx # đối chiếu hai lá số
│  ├─ CareerOrientation.tsx # trắc nghiệm hướng nghiệp
│  ├─ VanHanPanel.tsx   # vận hạn theo năm/tháng
│  ├─ XemNgayPanel.tsx  # tra ngày cát hung
│  ├─ XemTuoiPanel.tsx  # xây nhà / cưới hỏi
│  ├─ NoteBox.tsx    # ghi chú riêng từng lá số
│  └─ Ornaments.tsx  # hoạ tiết SVG (không ảnh, không request mạng)
├─ App.tsx
└─ styles.css        # design system (mực đêm + vàng kim)
```

---

## Về engine an sao

Phần tính toán dùng [`iztro`](https://github.com/SylarLong/iztro) (MIT) — một thư viện TypeScript
đã được kiểm chứng qua hàng nghìn lá số, có xử lý tháng nhuận, tiết khí, biên giới Lập Xuân và
múi giờ. Dự án **không** tự viết lại thuật toán an sao, vì đó là phần dễ sai nhất và đã có giải
pháp tốt.

Điều dự án làm khác: **toàn bộ lớp ngôn ngữ**.

`iztro` có sẵn locale `vi-VN`, nhưng bản đó còn lỗi kiểu `天机 → "Thiên Co"` (đúng phải là
*Thiên Cơ*), `八座 → "Bát Tọa"`, `岁建 → "Tuế Kiện"`… Nên repo này gọi engine ở chế độ `zh-CN`
rồi chuyển ngữ bằng từ điển riêng trong `src/lib/dict.ts`, đảm bảo thuật ngữ đúng chuẩn.

### Về lịch âm

Ngày âm dùng [`lunar-lite`](https://github.com/SylarLong/lunar-lite) — cùng engine mà `iztro`
dùng để an sao, nên ngày âm trên thanh công cụ luôn khớp với lá số đang lập. Can Chi và 12 Trực
tính tại chỗ bằng công thức cổ điển. Sát ranh giới tiết khí, một số lịch in có thể lệch 1 ngày;
phần này chỉ nên dùng để tham khảo.

---

## Bản quyền & ghi công

- Mã nguồn dự án: **MIT**.
- Engine `iztro` và `lunar-lite`: MIT © SylarLong.
- Ý tưởng và tham chiếu tính năng: `Renhuai123/ziwei-doushu` (MIT).
- Nội dung luận giải tiếng Việt trong `src/lib/content.ts`: biên soạn cho dự án này.

---

## Miễn trừ trách nhiệm

Tử Vi Việt là một hệ thống diễn giải văn hoá truyền thống. Nội dung trong ứng dụng chỉ mang
tính **tham khảo**, không phải lời khuyên y tế, pháp lý, tài chính hay bất kỳ quyết định quan
trọng nào trong đời sống. Đừng dùng nó để thay thế bác sĩ, luật sư hay chuyên gia tài chính.

## Giấy phép

MIT — xem [LICENSE](./LICENSE).
