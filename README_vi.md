# 🚧 Gate Card

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-orange.svg)](https://github.com/hacs/integration)
![version](https://img.shields.io/badge/version-1.1.2-blue)
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

## ✨ Tính năng (v1.1.2)

### 🎨 Hiển thị & Giao diện
- 🚧 **Mặt trước** — tên cổng, nhãn khu vực, trạng thái thời gian thực với chỉ báo màu, thanh tiến trình, nút đèn cổng
- 📷 **Camera trực tiếp** — làm mới mỗi 5 giây qua HA camera proxy, hiển thị đúng tỷ lệ **16:9**
- 👁️ **Thanh cảm biến chuyển động & người** — thời gian phát hiện gần nhất, đổi màu khi kích hoạt
- 🔄 **Hiệu ứng lật** — chuyển đổi mượt mà giữa mặt trước (trạng thái) và mặt sau (điều khiển)

### 🏠 Hai kiểu sơ đồ (mặt sau)
- **🚧 Cổng trượt** — SVG cổng trượt ngang, biểu tượng khóa khi đóng, PIR nhấp nháy, mũi tên motor
- **🏠 Cửa cuốn / Nhà xe** — cảnh nhà xe động: nan cuộn lên/xuống theo vị trí thực, cờ Việt Nam, xe với biển số tùy chỉnh, đèn tường sáng khi bật đèn cổng

### 🚗 Chế độ không cảm biến vị trí
- Bật **"Không có cảm biến vị trí"** trong editor để tính vị trí theo thời gian
- Nhập **thời gian hành trình (giây)** — card tự ước tính 0→100% theo thời gian relay chạy

### 🎛️ Bảng điều khiển (mặt sau)
- **3 nút** — Mở / Dừng / Đóng với màu trạng thái, tự vô hiệu hóa khi đã ở giới hạn
- **⚠️ Băng cảnh báo cuộn** — hiển thị liên tục khi cổng đang chuyển động
- Icon nút tự đổi: `↑↓` cho cửa cuốn, `←→` cho cổng trượt

### 🌐 10 ngôn ngữ
- 🇻🇳 Tiếng Việt / 🇬🇧 English / 🇩🇪 Deutsch / 🇫🇷 Français / 🇳🇱 Nederlands
- 🇵🇱 Polski / 🇸🇪 Svenska / 🇭🇺 Magyar / 🇨🇿 Čeština / 🇮🇹 Italiano
- **Ảnh cờ quốc gia thật** qua flagcdn.com

### 🎨 Tùy chỉnh giao diện
- **16 preset gradient nền** — Default, Night, Sunset, Forest, Aurora, Desert, Ocean, Cherry, Volcano, Galaxy, Ice, Olive, Slate, Rose, Teal, Custom
- **5 bộ chọn màu** — Nhấn, Chữ, nút Mở, nút Dừng, nút Đóng

---

## 📦 Cài đặt

### Cách 1 — HACS (khuyến nghị)

**Bước 1:** Thêm Custom Repository vào HACS:

[![Open HACS Repository](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=doanlong1412&repository=gate-card&category=plugin)

> Nếu nút không hoạt động:
> **HACS → Frontend → ⋮ → Custom repositories**
> → URL: `https://github.com/doanlong1412/gate-card` → Type: **Dashboard** → Add

**Bước 2:** Tìm **Gate Card** → **Install**

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

Sau khi thêm, nhấn **✏️ Edit** để mở Config Editor.

### Bước 2 — Các phần trong Config Editor

| # | Phần | Nội dung |
|---|------|----------|
| 1 | 🌐 **Ngôn ngữ** | 10 ngôn ngữ với ảnh cờ thật |
| 2 | 🏠 **Kiểu cổng / cửa** | Cổng trượt hoặc cửa cuốn nhà xe |
| 3 | 🚧 **Tên cổng** | Tên, zone, biển số (dòng 1 & 2), tên My Home |
| 4 | ⚡ **Thực thể** | Các entity + chế độ không cảm biến + thời gian hành trình |
| 5 | 🎨 **Màu sắc** | Nhấn, chữ và 3 màu nút |
| 6 | 🎨 **Màu nền** | 16 preset + bộ chọn hai màu tùy chỉnh |

---

## 🔄 Hướng dẫn tạo nút lật (Flip Button)

Card có hai mặt — **mặt trước** (trạng thái) và **mặt sau** (điều khiển). Nhấn thanh **ĐIỀU KHIỂN ▶** ở cuối card để lật sang bảng điều khiển; nhấn **◀ QUAY LẠI** để trở về. Để trạng thái lật được lưu sau khi tải lại trang và đồng bộ trên nhiều thiết bị, bạn cần tạo một **helper Toggle** trong Home Assistant.

### Bước 1 — Tạo helper Toggle

Vào **Settings → Devices & Services → Helpers** → **+ Create helper** → **Toggle**

| Trường | Giá trị |
|--------|---------|
| **Name** | `gate card flipped` (HA tự tạo entity `input_boolean.gate_card_flipped`) |
| **Icon** | *(tuỳ chọn)* `mdi:rotate-3d-variant` |

Nhấn **Create**.

> 💡 **Có nhiều card?** Tạo một helper riêng cho mỗi card và đặt tên khác nhau — ví dụ `input_boolean.garage_card_flipped` và `input_boolean.side_gate_flipped`. Nếu hai card dùng chung một helper, lật card này sẽ lật luôn card kia.

### Bước 2 — Gán vào Config Editor

Mở editor của card → mở rộng mục **Thực thể** → tìm trường **🔄 Input Boolean lật card** → chọn `input_boolean.gate_card_flipped`.

Hoặc nhập thẳng vào YAML:

```yaml
entity_flipped: input_boolean.gate_card_flipped
```

### Bước 3 — Hoàn tất ✅

Trạng thái lật giờ được lưu trong Home Assistant — không bị mất khi tải lại trang và đồng bộ trên tất cả thiết bị.

> ⚠️ Nếu không có helper này, nút lật vẫn hoạt động trong phiên trình duyệt hiện tại, nhưng trạng thái sẽ bị reset khi tải lại trang và không đồng bộ giữa các thiết bị.

---

## 🔌 Tham chiếu thực thể

### Bắt buộc

| Config key | Loại | Mô tả |
|---|---|---|
| `entity_gate_open` | `switch` | Relay mở ✅ |
| `entity_gate_close` | `switch` | Relay đóng ✅ |
| `entity_gate_stop` | `switch` | Relay dừng ✅ |

### Tuỳ chọn

| Config key | Loại | Mô tả |
|---|---|---|
| `entity_gate_position` | `sensor` | Vị trí cổng (0–100%). Không cần nếu `no_sensor: true` |
| `entity_gate_light` | `switch` | Đèn cổng — đèn tường sáng trong sơ đồ nhà xe |
| `entity_camera` | `camera` | Camera trực tiếp (làm mới mỗi 5 giây) |
| `entity_motion` | `binary_sensor` | Cảm biến chuyển động |
| `entity_person` | `binary_sensor` | Cảm biến người / hiện diện |
| `entity_flipped` | `input_boolean` | Trạng thái lật — xem [Hướng dẫn tạo nút lật](#-hướng-dẫn-tạo-nút-lật-flip-button) |

---

## ⚙️ Tham chiếu cấu hình đầy đủ

| Config key | Kiểu | Mặc định | Mô tả |
|---|---|---|---|
| `language` | string | `vi` | `vi`/`en`/`de`/`fr`/`nl`/`pl`/`sv`/`hu`/`cs`/`it` |
| `gate_style` | string | `slide` | `slide` = cổng trượt · `shutter` = cửa cuốn nhà xe |
| `gate_title` | string | *(theo ngôn ngữ)* | Tên hiển thị trên card |
| `gate_zone` | string | *(theo ngôn ngữ)* | Khu vực / phụ đề |
| `home_name` | string | `MY HOME` | Nhãn trên hộp motor trong sơ đồ nhà xe |
| `license_plate_line1` | string | `99A` | Biển số xe dòng 1 |
| `license_plate_line2` | string | `873.76` | Biển số xe dòng 2 |
| `no_sensor` | boolean | `false` | Chế độ tính vị trí theo thời gian khi không có cảm biến |
| `travel_time_sec` | number | `20` | Thời gian hành trình (giây) — yêu cầu `no_sensor: true` |
| `background_preset` | string | `default` | Tên preset gradient |
| `bg_color1` | hex | `#001e2b` | Màu gradient tùy chỉnh 1 (trên trái) |
| `bg_color2` | hex | `#12c6f3` | Màu gradient tùy chỉnh 2 (dưới phải) |
| `accent_color` | hex | `#00ffcc` | Màu nhấn / glow |
| `btn_open_color` | hex | `#00ff96` | Màu nút Mở |
| `btn_stop_color` | hex | `#ff5252` | Màu nút Dừng |
| `btn_close_color` | hex | `#00dcff` | Màu nút Đóng |
| `text_color` | hex | `#ffffff` | Màu chữ chính |
| `entity_flipped` | entity | — | `input_boolean` lưu trạng thái lật |

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

### Không có cảm biến vị trí

```yaml
type: custom:gate-card
language: vi
gate_style: shutter
no_sensor: true
travel_time_sec: 18
entity_gate_open: switch.cua_xe_open
entity_gate_close: switch.cua_xe_close
entity_gate_stop: switch.cua_xe_stop
entity_flipped: input_boolean.gate_card_flipped
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

### v1.1.2
- 🐛 Sửa lỗi và cải thiện độ ổn định

### v1.1.0
- 🏠 Kiểu sơ đồ mới `gate_style: shutter` — cửa cuốn nhà xe
- 🚗 Biển số xe tùy chỉnh (`license_plate_line1` / `license_plate_line2`)
- 🏠 Tên My Home tùy chỉnh (`home_name`)
- ⏱️ Chế độ không cảm biến (`no_sensor` + `travel_time_sec`)
- 🌐 6 ngôn ngữ mới — 🇫🇷 🇳🇱 🇵🇱 🇸🇪 🇭🇺 🇨🇿 (tổng 10) với ảnh cờ thật
- 🎨 16 preset gradient nền (thêm 8 mới)
- 🎛️ Sắp xếp lại editor; bỏ thanh trượt kích thước
- 🐛 Sửa camera 16:9 · sửa mất focus khi nhập text

### v1.0.0
- 🚀 Phát hành lần đầu

---

## 📄 Giấy phép

MIT License — miễn phí sử dụng, chỉnh sửa và phân phối.
Nếu bạn thấy hữu ích, hãy ⭐ **star repo** nhé!

---

## 🙏 Credits

Thiết kế và phát triển bởi **[@doanlong1412](https://github.com/doanlong1412)** từ 🇻🇳 Việt Nam.
