# 🚧 Gate Card

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-orange.svg)](https://github.com/hacs/integration)
![version](https://img.shields.io/badge/version-1.1.0-blue)
![HA](https://img.shields.io/badge/Home%20Assistant-2023.1+-green)
![license](https://img.shields.io/badge/license-MIT-lightgrey)

> 🇻🇳 **Phiên bản tiếng Việt:** [README_vi.md](README_vi.md)

A custom Home Assistant Lovelace card for smart gate and garage door control — live camera feed, two animated diagram styles (sliding gate & rolling shutter garage), motion/person sensors, gate light toggle, no-sensor timer mode, and a full visual editor.

**No extra plugins required. Works standalone, fully configurable through the built-in UI editor.**

---

## 📸 Preview

![Gate Card Preview](assets/preview.png)

---

## 🎛️ Visual Config Editor

![Gate Card Editor](assets/editor-preview.png)

---

## ✨ Features (v1.1.0)

### 🎨 Display & Interface
- 🚧 **Front face** — gate title, zone label, live status with colour-coded indicator, open/close progress bar, gate light toggle button
- 📷 **Live camera snapshot** — refreshes every 5 seconds via HA camera proxy, displays in true **16:9 ratio**
- 👁️ **Motion & person sensor bar** — shows last detected time for both sensors with colour highlight when active
- 🔄 **Flip animation** — smooth fade/scale transition between front (status) and back (control) face

### 🏠 Two Diagram Styles (back face)
- **🚧 Sliding Gate** — animated SVG gate slides horizontally, lock icon when closed, PIR sensor pulse, directional motor arrows
- **🏠 Rolling Shutter / Garage** — animated rolling shutter house scene: slats roll up/down with the real gate position, Vietnamese flag, car with customisable license plate, wall lamps glow when gate light is on, sky cropped to maximise usable space

### 🚗 No Position Sensor Mode
- Toggle **"No position sensor"** in the editor to enable timer-based position estimation
- Set your gate's **travel time in seconds** — the card smoothly animates position from 0→100% as the relay runs

### 🎛️ Control Panel (back face)
- **3 control buttons** — Open / Stop / Close with colour-coded active states, auto-disabled when already at limit
- **⚠️ Safety warning ticker** — scrolling alert banner while gate is opening or closing
- **Status row** — coloured dot + status text + sub-label below the diagram
- Button icons auto-switch: `↑↓` for shutter style, `←→` for sliding gate style

### 🌐 Multi-language Support (10 languages)
- 🇻🇳 Tiếng Việt / 🇬🇧 English / 🇩🇪 Deutsch / 🇫🇷 Français / 🇳🇱 Nederlands
- 🇵🇱 Polski / 🇸🇪 Svenska / 🇭🇺 Magyar / 🇨🇿 Čeština / 🇮🇹 Italiano
- **Real country flag images** in language selector (via flagcdn.com)
- Switching language **instantly updates all text** on both the card and the editor

### 🎨 Visual Customisation
- **16 background gradient presets** — Default, Night, Sunset, Forest, Aurora, Desert, Ocean, Cherry, Volcano, Galaxy, Ice, Olive, Slate, Rose, Teal, Custom
- **Custom gradient** — pick any two colours with built-in colour picker + hex input + swatch dots
- **5 colour pickers** — Accent, Text, Open button, Stop button, Close button
- Fixed card height: `min 290px / max 400px` — no manual sizing needed

### 🎛️ Config Editor
- **Accordion sections** ordered by priority: Language → Gate Style → Gate Name → Entities → Colors → Background
- **ha-entity-picker** — native HA dropdown, auto-filtered by entity domain
- **License plate** — customise the car plate shown in the garage diagram (line 1 and line 2)
- **Home name** — customise the "MY HOME" label on the motor box
- **Text inputs with focus fix** — title and zone fields fire config update only on blur/Enter, no focus loss while typing

---

## 📦 Installation

### Option 1 — HACS (recommended)

**Step 1:** Add Custom Repository to HACS:

[![Open HACS Repository](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=doanlong1412&repository=gate-card&category=plugin)

> If the button doesn't work, add manually:
> **HACS → Frontend → ⋮ → Custom repositories**
> → URL: `https://github.com/doanlong1412/gate-card` → Type: **Dashboard** → Add

**Step 2:** Search for **Gate Card** → **Install**

**Step 3:** Hard-reload your browser (`Ctrl+Shift+R`)

---

### Option 2 — Manual

1. Download [`gate-card.js`](https://github.com/doanlong1412/gate-card/releases/latest)
2. Copy to `/config/www/gate-card.js`
3. Go to **Settings → Dashboards → Resources** → **Add resource**:
   ```
   URL:  /local/gate-card.js
   Type: JavaScript module
   ```
4. Hard-reload your browser (`Ctrl+Shift+R`)

---

## ⚙️ Card Configuration

### Step 1 — Add the card to your dashboard

```yaml
type: custom:gate-card
```

After adding the card, click **✏️ Edit** to open the Config Editor.

### Step 2 — Config Editor sections

| # | Section | Contents |
|---|---------|----------|
| 1 | 🌐 **Language** | 10 languages with real flag images |
| 2 | 🏠 **Gate Style** | Sliding gate or rolling shutter garage |
| 3 | 🚧 **Gate Name** | Title, zone, license plate (line 1 & 2), home name |
| 4 | ⚡ **Entities** | All 9 entity pickers + no-sensor mode + travel time |
| 5 | 🎨 **Colors** | Accent, text, and 3 button colours |
| 6 | 🎨 **Background** | 16 gradient presets + custom two-colour picker |

---

## 🔌 Entity Reference

### Required entities

| Config key | Entity type | Description |
|---|---|---|
| `entity_gate_open` | `switch` | Open relay switch ✅ |
| `entity_gate_close` | `switch` | Close relay switch ✅ |
| `entity_gate_stop` | `switch` | Stop relay switch ✅ |

### Optional entities

| Config key | Entity type | Description |
|---|---|---|
| `entity_gate_position` | `sensor` | Gate position (0–100%). Not needed if `no_sensor: true` |
| `entity_gate_light` | `switch` | Gate light switch — lamps glow in the garage diagram |
| `entity_camera` | `camera` | Live camera (snapshot, refreshed every 5 s) |
| `entity_motion` | `binary_sensor` | Motion sensor |
| `entity_person` | `binary_sensor` | Person/occupancy sensor |
| `entity_flipped` | `input_boolean` | Flip state sync across multiple devices |

> 💡 `entity_flipped` keeps the front/back flip state in sync when the card is open on multiple devices at the same time.

---

## ⚙️ Full Config Reference

| Config key | Type | Default | Description |
|---|---|---|---|
| `language` | string | `vi` | Display language (`vi`/`en`/`de`/`fr`/`nl`/`pl`/`sv`/`hu`/`cs`/`it`) |
| `gate_style` | string | `slide` | Diagram style: `slide` = sliding gate, `shutter` = rolling shutter garage |
| `gate_title` | string | *(lang default)* | Gate display name |
| `gate_zone` | string | *(lang default)* | Zone / subtitle text |
| `home_name` | string | `MY HOME` | Label shown on motor box in the garage diagram |
| `license_plate_line1` | string | `99A` | Car plate line 1 (shown in garage diagram) |
| `license_plate_line2` | string | `873.76` | Car plate line 2 |
| `no_sensor` | boolean | `false` | Enable timer-based position when no position sensor exists |
| `travel_time_sec` | number | `20` | Gate travel time in seconds (used when `no_sensor: true`) |
| `background_preset` | string | `default` | Background gradient preset |
| `bg_color1` | hex | `#001e2b` | Custom gradient colour 1 (top-left) |
| `bg_color2` | hex | `#12c6f3` | Custom gradient colour 2 (bottom-right) |
| `accent_color` | hex | `#00ffcc` | Accent / glow colour |
| `btn_open_color` | hex | `#00ff96` | Open button highlight colour |
| `btn_stop_color` | hex | `#ff5252` | Stop button highlight colour |
| `btn_close_color` | hex | `#00dcff` | Close button highlight colour |
| `text_color` | hex | `#ffffff` | Primary text colour |

---

## 📝 Full YAML example

```yaml
type: custom:gate-card
language: en
gate_style: shutter
gate_title: Garage
gate_zone: ZONE-A · GARAGE CONTROL
home_name: MY HOME
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

entity_gate_position: sensor.garage_door_position
entity_gate_open: switch.garage_door_open
entity_gate_close: switch.garage_door_close
entity_gate_stop: switch.garage_door_stop
entity_gate_light: switch.garage_light
entity_camera: camera.garage_camera
entity_motion: binary_sensor.garage_motion
entity_person: binary_sensor.garage_person
entity_flipped: input_boolean.garage_card_flipped
```

### Example without position sensor

```yaml
type: custom:gate-card
language: en
gate_style: shutter
no_sensor: true
travel_time_sec: 18

entity_gate_open: switch.garage_door_open
entity_gate_close: switch.garage_door_close
entity_gate_stop: switch.garage_door_stop
```

---

## 🖥️ Compatibility

| | |
|---|---|
| Home Assistant | 2023.1+ |
| Lovelace | Default & custom dashboards |
| Devices | Mobile & Desktop |
| Dependencies | None — fully standalone |
| Browsers | Chrome, Firefox, Safari, Edge |

---

## 📋 Changelog

### v1.1.0
- 🏠 **Rolling shutter / garage diagram** — new `gate_style: shutter` with animated slats, house facade, Vietnamese flag, car, wall lamps and sky optimised for card height
- 🚗 **Customisable license plate** — `license_plate_line1` / `license_plate_line2` shown on car in garage diagram
- 🏠 **Custom home name** — `home_name` label on motor box
- ⏱️ **No-sensor timer mode** — `no_sensor: true` + `travel_time_sec` estimates position from relay timing
- 🌐 **6 new languages** — 🇫🇷 Français, 🇳🇱 Nederlands, 🇵🇱 Polski, 🇸🇪 Svenska, 🇭🇺 Magyar, 🇨🇿 Čeština (10 total)
- 🏳️ **Real country flag images** in language selector via flagcdn.com
- 🎨 **16 background gradient presets** (8 new: Cherry, Volcano, Galaxy, Ice, Olive, Slate, Rose, Teal)
- 📐 **Fixed card height** — `min 290px / max 400px`, size slider removed
- 🎛️ **Editor reordered** — Language → Style → Name → Entities → Colors → Background
- 🐛 **Camera 16:9 fix** — `object-fit: contain` prevents zoom/crop distortion
- 🐛 **Input focus fix** — text fields no longer lose focus on every keystroke

### v1.0.0
- 🚀 Initial release — sliding gate card with flip animation, live camera, SVG diagram, motion/person sensors, 4 languages, visual config editor

---

## 📄 License

MIT License — free to use, modify, and distribute.
If you find this useful, please ⭐ **star the repo**!

---

## 🙏 Credits

Designed and developed by **[@doanlong1412](https://github.com/doanlong1412)** from 🇻🇳 Vietnam.
