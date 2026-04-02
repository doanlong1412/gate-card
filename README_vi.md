# 🚧 Gate Card

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-orange.svg)](https://github.com/hacs/integration)
![version](https://img.shields.io/badge/version-1.0.0-blue)
![HA](https://img.shields.io/badge/Home%20Assistant-2023.1+-green)
![license](https://img.shields.io/badge/license-MIT-lightgrey)

> 🇬🇧 **English version:** [README.md](README.md)

Card tùy chỉnh cho Home Assistant Lovelace — điều khiển cổng thông minh với camera trực tiếp, sơ đồ cổng SVG động, cảm biến chuyển động/người, nút đèn cổng và trình chỉnh sửa giao diện trực quan đầy đủ.

**Không cần plugin bổ sung. Hoạt động độc lập, cấu hình hoàn toàn qua giao diện chỉnh sửa tích hợp.**

---

## 📸 Xem trước

![Gate Card Preview](assets/preview.png)

---

## ✨ Tính năng (v1.0.0)

### 🎨 Hiển thị & Giao diện
- 🚧 **Mặt trước** — tên cổng, nhãn khu vực, trạng thái theo thời gian thực với chỉ báo màu, thanh tiến trình mở/đóng, nút bật/tắt đèn cổng
- 📷 **Ảnh camera trực tiếp** — làm mới mỗi 5 giây qua camera proxy của HA, hiển thị đúng tỷ lệ **16:9**
- 👁️ **Thanh cảm biến chuyển động & người** — hiển thị thời gian phát hiện gần nhất cho cả hai cảm biến, đổi màu khi đang kích hoạt
- 🔄 **Hiệu ứng lật** — chuyển đổi mượt mà giữa mặt trước (trạng thái) và mặt sau (điều khiển)

### 🎛️ Bảng điều khiển (mặt sau)
- **Sơ đồ cổng SVG động** — hiển thị vị trí cổng theo thời gian thực, biểu tượng khóa khi đóng hoàn toàn, cảm biến PIR nhấp nháy khi di chuyển, mũi tên hướng motor
- **3 nút điều khiển** — Mở / Dừng / Đóng với trạng thái màu sắc, tự động vô hiệu hóa khi đã ở giới hạn
- **⚠️ Thanh cảnh báo an toàn cuộn** — băng chuyền cảnh báo trong khi cổng đang mở hoặc đóng
- **Hàng trạng thái** — chấm màu + văn bản trạng thái + nhãn phụ bên dưới sơ đồ SVG

### 🌐 Hỗ trợ đa ngôn ngữ (10 ngôn ngữ)
- 🇻🇳 Tiếng Việt / 🇬🇧 English / 🇩🇪 Deutsch / 🇫🇷 Français / 🇳🇱 Nederlands
- 🇵🇱 Polski / 🇸🇪 Svenska / 🇭🇺 Magyar / 🇨🇿 Čeština / 🇮🇹 Italiano
- **Ảnh cờ quốc gia thật** trong bộ chọn ngôn ngữ (qua flagcdn.com)
- **Chuyển ngôn ngữ cập nhật ngay lập tức** toàn bộ văn bản trên card và editor

### 🎨 Tùy chỉnh giao diện
- **16 preset gradient nền** — Default, Night, Sunset, Forest, Aurora, Desert, Ocean, Cherry, Volcano, Galaxy, Ice, Olive, Slate, Rose, Teal, Custom
- **Gradient tùy chỉnh** — chọn hai màu bất kỳ với bộ chọn màu tích hợp + nhập hex + chấm màu mẫu
- **5 bộ chọn màu** — Nhấn, Chữ, nút Mở, nút Dừng, nút Đóng
- **Thanh trượt chiều cao card** — điều chỉnh từ 200 px đến 600 px

### 🎛️ Trình chỉnh sửa cấu hình
- **Các phần accordion** — thu/mở: Tên cổng, Ngôn ngữ, Nền, Màu sắc, Kích thước, Thực thể
- **ha-entity-picker** — dropdown HA gốc, tự động lọc theo domain thực thể
- **Sửa text không mất con trỏ** — ô tên và mô tả chỉ cập nhật config khi blur/Enter, không mất focus khi đang gõ
- **Tất cả cài đặt được lưu** qua HA config storage

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

### Bước 2 — Tổng quan Config Editor

Config Editor chia thành **các phần accordion** — nhấn tiêu đề để mở/đóng:

| Phần | Nội dung |
|---------|----------|
| 🚧 **Tên cổng** | Tên hiển thị và nhãn khu vực/phụ đề |
| 🌐 **Ngôn ngữ** | 10 ngôn ngữ với ảnh cờ thật |
| 🎨 **Màu nền** | 16 preset gradient + bộ chọn hai màu tùy chỉnh |
| 🎨 **Màu sắc** | Nhấn, chữ và 3 màu nút |
| 📐 **Kích thước** | Thanh trượt chiều cao card (200–600 px) |
| ⚡ **Thực thể** | 9 bộ chọn thực thể |

---

## 🔌 Tham chiếu thực thể

### Thực thể bắt buộc

| Config key | Loại thực thể | Mô tả |
|---|---|:---:|
| `entity_gate_position` | `sensor` | Vị trí cổng (0–100 %) ✅ |
| `entity_gate_open` | `switch` | Switch relay mở ✅ |
| `entity_gate_close` | `switch` | Switch relay đóng ✅ |
| `entity_gate_stop` | `switch` | Switch relay dừng ✅ |

### Thực thể tùy chọn

| Config key | Loại thực thể | Mô tả |
|---|---|---|
| `entity_gate_light` | `switch` | Switch đèn cổng |
| `entity_camera` | `camera` | Camera trực tiếp (snapshot, làm mới mỗi 5 giây) |
| `entity_motion` | `binary_sensor` | Cảm biến chuyển động |
| `entity_person` | `binary_sensor` | Cảm biến người/hiện diện |
| `entity_flipped` | `input_boolean` | Đồng bộ trạng thái lật giữa các thiết bị |

> 💡 `entity_flipped` input_boolean giữ trạng thái lật đồng bộ nếu bạn mở card trên nhiều thiết bị cùng lúc.

---

## ⚙️ Tùy chọn hiển thị

| Config key | Giá trị | Mặc định | Mô tả |
|---|---|---|---|
| `language` | `vi` / `en` / `de` / `fr` / `nl` / `pl` / `sv` / `hu` / `cs` / `it` | `vi` | Ngôn ngữ hiển thị |
| `background_preset` | `default` / `night` / `sunset` / … / `custom` | `default` | Preset gradient nền |
| `bg_color1` | màu hex | `#001e2b` | Màu gradient tùy chỉnh 1 (trên trái) |
| `bg_color2` | màu hex | `#12c6f3` | Màu gradient tùy chỉnh 2 (dưới phải) |
| `accent_color` | màu hex | `#00ffcc` | Màu nhấn / glow |
| `btn_open_color` | màu hex | `#00ff96` | Màu nút Mở |
| `btn_stop_color` | màu hex | `#ff5252` | Màu nút Dừng |
| `btn_close_color` | màu hex | `#00dcff` | Màu nút Đóng |
| `text_color` | màu hex | `#ffffff` | Màu chữ chính |
| `card_height` | `200`–`600` | `320` | Chiều cao card (pixel) |
| `gate_title` | chuỗi | *(mặc định theo ngôn ngữ)* | Tên hiển thị cổng |
| `gate_zone` | chuỗi | *(mặc định theo ngôn ngữ)* | Khu vực / phụ đề |

---

## 📝 Ví dụ YAML đầy đủ

```yaml
type: custom:gate-card
language: vi
background_preset: default
accent_color: "#00ffcc"
btn_open_color: "#00ff96"
btn_stop_color: "#ff5252"
btn_close_color: "#00dcff"
text_color: "#ffffff"
card_height: 320
gate_title: Cổng Phụ
gate_zone: ZONE-B · GATE CONTROL

entity_gate_position: sensor.gate_position
entity_gate_open: switch.gate_open
entity_gate_close: switch.gate_close
entity_gate_stop: switch.gate_stop
entity_gate_light: switch.gate_light
entity_camera: camera.gate_camera
entity_motion: binary_sensor.gate_motion
entity_person: binary_sensor.gate_person
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

### v1.0.0
- 🚀 **Phát hành lần đầu**
- 🔄 Card lật — mặt trước trạng thái / mặt sau điều khiển với hiệu ứng fade
- 📷 Ảnh camera trực tiếp (16:9, làm mới mỗi 5 giây)
- 🎨 Sơ đồ cổng SVG — vị trí thời gian thực, biểu tượng khóa, PIR nhấp nháy, mũi tên motor
- ⚠️ Băng chuyền cảnh báo an toàn khi cổng di chuyển
- 🌐 10 ngôn ngữ với ảnh cờ quốc gia thật (flagcdn.com)
- 🎨 16 preset gradient nền + bộ chọn hai màu tùy chỉnh
- 🎛️ Config Editor trực quan — accordion, ha-entity-picker, bộ chọn màu, thanh trượt chiều cao
- 🐛 Sửa lỗi mất focus ô nhập text — ô tên/mô tả không còn mất con trỏ khi gõ

---

## 📄 Giấy phép

MIT License — miễn phí sử dụng, chỉnh sửa và phân phối.
Nếu bạn thấy hữu ích, hãy ⭐ **star repo** nhé!

---

## 🙏 Credits

Thiết kế và phát triển bởi **[@doanlong1412](https://github.com/doanlong1412)** từ 🇻🇳 Việt Nam.
