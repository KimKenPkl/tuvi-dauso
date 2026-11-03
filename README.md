# Tử Vi Việt — bản Việt hoá


Lập lá số **Tử Vi Việt (紫微斗數)** hoàn toàn bằng tiếng Việt, chạy ngay trên trình duyệt.

Không máy chủ, không tài khoản, không gửi ngày sinh đi đâu.


> Lấy cảm hứng từ repo [`Renhuai123/ziwei-doushu`](https://github.com/Renhuai123/ziwei-doushu) (14k★, MIT).
> Repo đó là một app Next.js đầy đủ nhưng cần Postgres + Redis + Anthropic API để chạy, nên không
> deploy tĩnh được. Bản này giữ lại phần giá trị nhất — **engine an sao** — rồi viết mới toàn bộ
> lớp tiếng Việt và giao diện, để có thể chạy trên GitHub Pages với 0 đồng hạ tầng.

---

## Tính năng

| Nhóm | Chi tiết |
|---|---|
| **Lập lá số** | Dương lịch hoặc âm lịch (kể cả tháng nhuận), 13 khung giờ sinh (Tý sớm → Tý muộn) |
| **Giờ thật** | Tuỳ chọn quy đổi theo kinh độ nơi sinh (true solar time), có sẵn 34 tỉnh/thành sau sáp nhập 2025 |
| **Lá số 12 cung** | Bố cục 4×4 chuẩn cổ pháp, Tý ở dưới, đi ngược chiều kim đồng hồ |
| **Sao** | 14 chính tinh + lục cát + lục sát + tạp diệu, kèm độ sáng Miếu/Vượng/Đắc/Lợi/Bình/Bất/Hãm |
| **Tứ hoá** | Lộc / Quyền / Khoa / Kỵ — cả năm sinh và lưu niên, hiển thị dạng badge màu |
| **Vận hạn** | Đại hạn, Tiểu hạn, Lưu niên theo năm tuỳ chọn |
| **Luận giải** | Sinh tự động từ dữ liệu lá số: tổng quan, tính cách, sự nghiệp, tài lộc, tình cảm, sức khoẻ, vận hạn |
| **Cách cục** | Nhận diện Tử Phủ đồng cung, Cơ Nguyệt Đồng Lương, Sát Phá Lang, Vũ Tham, Nhật Nguyệt, Lộc Mã giao trì, Không Kiếp… |
| **Lưu lá số** | Cất tối đa 50 lá số kèm nhãn riêng ("Mẹ", "Khách A"…), mở lại một chạm |
| **Ghi chú** | Sổ tay riêng từng lá số, tự lưu sau khi ngừng gõ — để đối chiếu dần với thực tế |
| **Đối chiếu** | So hai lá số theo địa chi cung Mệnh (tam hợp / lục hợp / xung / hại), ngũ hành chính tinh và sao Phu Thê ↔ Mệnh |
| **AI luận giải** | Tuỳ chọn: gọi Gemini / OpenAI bằng API key của chính bạn, streaming, prompt bị ràng buộc không cho bịa sao |
| **Xuất ảnh** | Tải lá số thành PNG 2× (nạp thư viện động, không làm nặng bundle) |
| **Khác** | Chia sẻ lá số qua URL, in / xuất PDF bằng `Ctrl+P` |
| **Riêng tư** | 100% client-side. Không analytics, không backend. API key (nếu dùng) chỉ nằm trong `localStorage` của bạn |

---

## Chạy local

```bash
npm install
npm run dev        # http://localhost:5173
```

```bash
npm run typecheck  # kiểm tra kiểu
npm run test       # test engine an sao + smoke test render
npm run build      # build tĩnh ra dist/
npm run preview    # xem thử bản build
```

Yêu cầu: Node 18+.

---

## Deploy lên GitHub Pages

### Cách 1 — GitHub Actions (khuyến nghị)

Repo có sẵn `.github/workflows/deploy.yml.example` với nội dung đã sửa cho nhánh `master`.
Vì ứng dụng Muse không có quyền tạo file workflow qua API, bạn tạo file này trực tiếp trên web GitHub:

1. Vào repo trên GitHub → **Add file → Create new file**, đặt tên `.github/workflows/deploy.yml`.
2. Dán toàn bộ nội dung của `deploy.yml.example` vào (chỉ khác ở chỗ nhánh chạy là `master`, không phải `main`).
3. Vào **Settings → Pages → Source** chọn **GitHub Actions**.
4. Push tiếp vào `master` là tự build và deploy.

Workflow tự đặt `VITE_BASE=/<tên-repo>/` nên không cần sửa gì (đọc từ `github.event.repository.name`).

### Cách 2 — build tay

```bash
# nếu deploy ở https://<user>.github.io/<repo>/
VITE_BASE=/<repo>/ npm run build
# rồi đẩy thư mục dist/ lên nhánh gh-pages
```

Nếu deploy ở domain gốc (`https://<user>.github.io/`), bỏ biến `VITE_BASE`.

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
│  ├─ storage.ts     # localStorage: lá số đã lưu, ghi chú, cấu hình AI
│  ├─ ai.ts          # dựng prompt + streaming SSE tới Gemini / OpenAI
│  ├─ provinces.ts   # 34 tỉnh/thành + kinh độ (quy đổi giờ thật)
│  └─ __tests__/     # test engine + smoke test render (6 component)
├─ components/
│  ├─ BirthForm.tsx  # form nhập ngày giờ sinh
│  ├─ ChartBoard.tsx # lưới 4×4
│  ├─ PalaceCell.tsx # một cung
│  ├─ CenterCard.tsx # thông tin trung tâm
│  ├─ DetailPanel.tsx# drawer chi tiết cung
│  ├─ ReadingPanel.tsx
│  ├─ AiPanel.tsx    # luận giải bằng API key cá nhân
│  ├─ HistoryPanel.tsx   # drawer lá số đã lưu
│  ├─ CompatibilityView.tsx # đối chiếu hai lá số
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

---

## Bản quyền & ghi công

- Mã nguồn dự án: **MIT**.
- Engine `iztro`: MIT © SylarLong.
- Ý tưởng và tham chiếu tính năng: `Renhuai123/ziwei-doushu` (MIT).
- Nội dung luận giải tiếng Việt trong `src/lib/content.ts`: biên soạn cho dự án này.

---

## Miễn trừ trách nhiệm

Tử Vi Việt là một hệ thống diễn giải văn hoá truyền thống. Nội dung trong ứng dụng chỉ mang
tính **tham khảo**, không phải lời khuyên y tế, pháp lý, tài chính hay bất kỳ quyết định quan
trọng nào trong đời sống. Đừng dùng nó để thay thế bác sĩ, luật sư hay chuyên gia tài chính.

## Giấy phép

MIT — xem [LICENSE](./LICENSE).
