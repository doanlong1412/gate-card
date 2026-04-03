# 🚧 Gate Card

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-orange.svg)](https://github.com/hacs/integration)
![version](https://img.shields.io/badge/version-1.1.0-blue)
![HA](https://img.shields.io/badge/Home%20Assistant-2023.1+-green)
![license](https://img.shields.io/badge/license-MIT-lightgrey)

> 🇬🇧 **English version:** [README.md](README.md)

Card tùy chỉnh cho Home Assistant Lovelace — điều khiển cổng và cửa cuốn thông minh với camera trực tiếp, hai kiểu sơ đồ (cổng trượt & cửa cuốn nhà xe), cảm biến chuyển động/người, đèn cổng, chế độ không cảm biến và trình chỉnh sửa giao diện trực quan đầy đủ.

**Không cần plugin bổ sung. Hoạt động độc lập, cấu hình hoàn toàn qua giao diện chỉnh sửa tích hợp.**

---

## 📸 Xem trước

![Gate Card Preview](assets/preview.png)

---

## 🎛️ Visual Config Editor

![Gate Card Editor](assets/editor-preview.png)

---

## ✨ Tính năng (v1.1.0)

### 🎨 Hiển thị & Giao diện
- 🚧 **Mặt trước** — tên cổng, nhãn khu vực, trạng thái theo thời gian thực với chỉ báo màu, thanh tiến trình mở/đóng, nút bật/tắt đèn cổng
- 📷 **Ảnh camera trực tiếp** — làm mới mỗi 5 giây qua camera proxy của HA, hiển thị đúng tỷ lệ **16:9**
- 👁️ **Thanh cảm biến chuyển động & người** — hiển thị thời gian phát hiện gần nhất, đổi màu khi đang kích hoạt
- 🔄 **Hiệu ứng lật** — chuyển đổi mượt mà giữa mặt trước (trạng thái) và mặt sau (điều khiển)

### 🏠 Hai kiểu sơ đồ (mặt sau)
- **🚧 Cổng trượt** — SVG cổng trượt ngang, biểu tượng khóa khi đóng, cảm biến PIR nhấp nháy, mũi tên hướng motor
- **🏠 Cửa cuốn / Nhà xe** — cảnh nhà xe với cửa cuốn: nan cuộn lên/xuống theo vị trí thực, cờ Việt Nam, xe hơi với biển số tùy chỉnh, đèn tường sáng khi đèn cổng bật, bầu trời được cắt bớt để tối ưu không gian

### 🚗 Chế độ không cảm biến vị trí
- Bật **"Không có cảm biến vị trí"** trong editor để dùng chế độ tính vị trí theo thời gian
- Nhập **thời gian hành trình (giây)** — card tự động ước tính vị trí từ 0→100% theo thời gian relay chạy

### 🎛️ Bảng điều khiển (mặt sau)
- **3 nút điều khiển** — Mở / Dừng / Đóng với trạng thái màu sắc, tự động vô hiệu hóa khi đã ở giới hạn
- **⚠️ Băng chuyền cảnh báo an toàn** — cuộn liên tục khi cổng đang mở hoặc đóng
- **Hàng trạng thái** — chấm màu + văn bản trạng thái + nhãn phụ bên dưới sơ đồ
- Icon nút tự đổi: `↑↓` cho kiểu cửa cuốn, `←→` cho cổng trượt

### 🌐 Hỗ trợ đa ngôn ngữ (10 ngôn ngữ)
- 🇻🇳 Tiếng Việt / 🇬🇧 English / 🇩🇪 Deutsch / 🇫🇷 Français / 🇳🇱 Nederlands
- 🇵🇱 Polski / 🇸🇪 Svenska / 🇭🇺 Magyar / 🇨🇿 Čeština / 🇮🇹 Italiano
- **Ảnh cờ quốc gia thật** trong bộ chọn ngôn ngữ (qua flagcdn.com)
- **Chuyển ngôn ngữ cập nhật ngay lập tức** toàn bộ văn bản trên card và editor

### 🎨 Tùy chỉnh giao diện
- **16 preset gradient nền** — Default, Night, Sunset, Forest, Aurora, Desert, Ocean, Cherry, Volcano, Galaxy, Ice, Olive, Slate, Rose, Teal, Custom
- **Gradient tùy chỉnh** — chọn hai màu bất kỳ với bộ chọn màu + nhập hex + chấm màu mẫu
- **5 bộ chọn màu** — Nhấn, Chữ, nút Mở, nút Dừng, nút Đóng
- Chiều cao card cố định: `min 290px / max 400px` — không cần điều chỉnh thủ công

### 🎛️ Trình chỉnh sửa cấu hình
- **Các phần accordion** theo thứ tự ưu tiên: Ngôn ngữ → Kiểu cổng → Tên cổng → Thực thể → Màu sắc → Màu nền
- **ha-entity-picker** — dropdown HA gốc, tự động lọc theo domain
- **Biển số xe** — tùy chỉnh biển số xe hiển thị trong sơ đồ nhà xe (dòng 1 và dòng 2)
- **Tên My Home** — tùy chỉnh nhãn "MY HOME" trên hộp motor
- **Sửa text không mất con trỏ** — ô nhập văn bản chỉ cập nhật config khi blur/Enter

---

## 📦 Cài đặt

### Cách 1 — HACS (khuyến nghị)

**Bước 1:** Thêm Custom Repository vào HACS:

[![Open HACS Repository](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=doanlong1412&repository=gate-card&category=plugin)

> Nếu nút không hoạt động, thêm thủ công:
> **HACS → Frontend → ⋮ → Custom repositories**
> → URL: `https://github.com/doanlong1412/gate-card` → Type: **Dashboard** → Add

**Bước 2:** Tìm kiếm **Gate Card** → **Install**

**Bước 3:** Hard-reload trình duyệt (`Ctrl+Shift+R`)

---

### Cách 2 — Thủ công

1. Tải [`gate-card.js`](https://github.com/doanlong1412/gate-card/releases/latest)
2. Sao chép vào `/config/www/gate-card.js`
3. Vào **Settings → Dashboards → Resources** → **Add resource**:
   ```
   URL:  /local/gate-card.js
   Type: JavaScript module
   ```
4. Hard-reload trình duyệt (`Ctrl+Shift+R`)

---

## ⚙️ Cấu hình Card

### Bước 1 — Thêm card vào dashboard

```yaml
type: custom:gate-card
```

Sau khi thêm card, nhấn **✏️ Edit** để mở Config Editor.

### Bước 2 — Các phần trong Config Editor

| # | Phần | Nội dung |
|---|------|----------|
| 1 | 🌐 **Ngôn ngữ** | 10 ngôn ngữ với ảnh cờ thật |
| 2 | 🏠 **Kiểu cổng / cửa** | Cổng trượt hoặc cửa cuốn nhà xe |
| 3 | 🚧 **Tên cổng** | Tên, zone, biển số xe (dòng 1 & 2), tên My Home |
| 4 | ⚡ **Thực thể** | 9 bộ chọn thực thể + chế độ không cảm biến + thời gian hành trình |
| 5 | 🎨 **Màu sắc** | Nhấn, chữ và 3 màu nút |
| 6 | 🎨 **Màu nền** | 16 preset gradient + bộ chọn hai màu tùy chỉnh |

---

## 🔌 Tham chiếu thực thể

### Thực thể bắt buộc

| Config key | Loại thực thể | Mô tả |
|---|---|---|
| `entity_gate_open` | `switch` | Switch relay mở ✅ |
| `entity_gate_close` | `switch` | Switch relay đóng ✅ |
| `entity_gate_stop` | `switch` | Switch relay dừng ✅ |

### Thực thể tùy chọn

| Config key | Loại thực thể | Mô tả |
|---|---|---|
| `entity_gate_position` | `sensor` | Vị trí cổng (0–100%). Không cần nếu `no_sensor: true` |
| `entity_gate_light` | `switch` | Switch đèn cổng — đèn tường sáng trong sơ đồ nhà xe |
| `entity_camera` | `camera` | Camera trực tiếp (snapshot, làm mới mỗi 5 giây) |
| `entity_motion` | `binary_sensor` | Cảm biến chuyển động |
| `entity_person` | `binary_sensor` | Cảm biến người/hiện diện |
| `entity_flipped` | `input_boolean` | Đồng bộ trạng thái lật giữa nhiều thiết bị |

> 💡 `entity_flipped` giữ trạng thái lật đồng bộ khi mở card trên nhiều thiết bị cùng lúc.

---

## ⚙️ Tham chiếu cấu hình đầy đủ

| Config key | Kiểu | Mặc định | Mô tả |
|---|---|---|---|
| `language` | string | `vi` | Ngôn ngữ (`vi`/`en`/`de`/`fr`/`nl`/`pl`/`sv`/`hu`/`cs`/`it`) |
| `gate_style` | string | `slide` | Kiểu sơ đồ: `slide` = cổng trượt, `shutter` = cửa cuốn nhà xe |
| `gate_title` | string | *(mặc định theo ngôn ngữ)* | Tên hiển thị cổng |
| `gate_zone` | string | *(mặc định theo ngôn ngữ)* | Khu vực / phụ đề |
| `home_name` | string | `MY HOME` | Nhãn trên hộp motor trong sơ đồ nhà xe |
| `license_plate_line1` | string | `99A` | Biển số xe dòng 1 (hiển thị trong sơ đồ nhà xe) |
| `license_plate_line2` | string | `873.76` | Biển số xe dòng 2 |
| `no_sensor` | boolean | `false` | Bật chế độ tính vị trí theo thời gian khi không có cảm biến |
| `travel_time_sec` | number | `20` | Thời gian hành trình (giây) — dùng khi `no_sensor: true` |
| `background_preset` | string | `default` | Preset gradient nền |
| `bg_color1` | hex | `#001e2b` | Màu gradient tùy chỉnh 1 (trên trái) |
| `bg_color2` | hex | `#12c6f3` | Màu gradient tùy chỉnh 2 (dưới phải) |
| `accent_color` | hex | `#00ffcc` | Màu nhấn / glow |
| `btn_open_color` | hex | `#00ff96` | Màu nút Mở |
| `btn_stop_color` | hex | `#ff5252` | Màu nút Dừng |
| `btn_close_color` | hex | `#00dcff` | Màu nút Đóng |
| `text_color` | hex | `#ffffff` | Màu chữ chính |

---

## 📝 Ví dụ YAML đầy đủ

```yaml
type: custom:gate-card
language: vi
gate_style: shutter
gate_title: Nhà Xe
gate_zone: ZONE-A · GARAGE CONTROL
home_name: NHÀ XE
license_plate_line1: 99A
license_plate_line2: 873.76
no_sensor: false
travel_time_sec: 20

background_preset: default
accent_color: "#00ffcc"
btn_open_color: "#00ff96"
btn_stop_color: "#ff5252"
btn_close_color: "#00dcff"
text_color: "#ffffff"

entity_gate_position: sensor.cua_xe_position
entity_gate_open: switch.cua_xe_open
entity_gate_close: switch.cua_xe_close
entity_gate_stop: switch.cua_xe_stop
entity_gate_light: switch.den_cua_xe
entity_camera: camera.camera_nhaxe
entity_motion: binary_sensor.camera_nhaxe_motion
entity_person: binary_sensor.camera_nhaxe_person_occupancy
entity_flipped: input_boolean.gate_card_flipped
```

### Ví dụ không có cảm biến vị trí

```yaml
type: custom:gate-card
language: vi
gate_style: shutter
no_sensor: true
travel_time_sec: 18

entity_gate_open: switch.cua_xe_open
entity_gate_close: switch.cua_xe_close
entity_gate_stop: switch.cua_xe_stop
```

---

## 🖥️ Tương thích

| | |
|---|---|
| Home Assistant | 2023.1+ |
| Lovelace | Dashboard mặc định & tùy chỉnh |
| Thiết bị | Mobile & Desktop |
| Phụ thuộc | Không — hoàn toàn độc lập |
| Trình duyệt | Chrome, Firefox, Safari, Edge |

---

## 📋 Lịch sử thay đổi

### v1.1.0
- 🏠 **Sơ đồ cửa cuốn / nhà xe** — `gate_style: shutter` mới với nan cuốn động, mặt tiền nhà, cờ Việt Nam, xe hơi và đèn tường
- 🚗 **Biển số xe tùy chỉnh** — `license_plate_line1` / `license_plate_line2` hiển thị trên xe trong sơ đồ
- 🏠 **Tên My Home tùy chỉnh** — `home_name` trên hộp motor
- ⏱️ **Chế độ không cảm biến** — `no_sensor: true` + `travel_time_sec` ước tính vị trí theo thời gian relay
- 🌐 **6 ngôn ngữ mới** — 🇫🇷 Français, 🇳🇱 Nederlands, 🇵🇱 Polski, 🇸🇪 Svenska, 🇭🇺 Magyar, 🇨🇿 Čeština (tổng 10)
- 🏳️ **Ảnh cờ quốc gia thật** trong bộ chọn ngôn ngữ qua flagcdn.com
- 🎨 **16 preset gradient nền** (thêm 8 mới: Cherry, Volcano, Galaxy, Ice, Olive, Slate, Rose, Teal)
- 📐 **Chiều cao card cố định** — `min 290px / max 400px`, bỏ thanh trượt kích thước
- 🎛️ **Sắp xếp lại editor** — Ngôn ngữ → Kiểu → Tên → Thực thể → Màu sắc → Màu nền
- 🐛 **Sửa camera 16:9** — `object-fit: contain` không còn bị zoom/cắt ảnh
- 🐛 **Sửa lỗi mất focus** — ô nhập văn bản không mất con trỏ khi gõ

### v1.0.0
- 🚀 Phát hành lần đầu — cổng trượt với hiệu ứng lật, camera, sơ đồ SVG, cảm biến, 4 ngôn ngữ, visual editor

---

## 📄 Giấy phép

MIT License — miễn phí sử dụng, chỉnh sửa và phân phối.
Nếu bạn thấy hữu ích, hãy ⭐ **star repo** nhé!

---

## 🙏 Credits

Thiết kế và phát triển bởi **[@doanlong1412](https://github.com/doanlong1412)** từ 🇻🇳 Việt Nam.
