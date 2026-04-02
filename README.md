# 🚧 Gate Card

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-orange.svg)](https://github.com/hacs/integration)
![version](https://img.shields.io/badge/version-1.0.0-blue)
![HA](https://img.shields.io/badge/Home%20Assistant-2023.1+-green)
![license](https://img.shields.io/badge/license-MIT-lightgrey)

> 🇻🇳 **Phiên bản tiếng Việt:** [README_vi.md](README_vi.md)

A custom Home Assistant Lovelace card for smart gate control — live camera feed, animated SVG gate diagram, motion/person sensors, gate light toggle, and a full visual editor.

**No extra plugins required. Works standalone, fully configurable through the built-in UI editor.**

---

## 📸 Preview

![Gate Card Preview](assets/preview.png)

---

## ✨ Features (v1.0.0)

### 🎨 Display & Interface
- 🚧 **Front face** — gate title, zone label, live status with colour-coded indicator, open/close progress bar, gate light toggle button
- 📷 **Live camera snapshot** — refreshes every 5 seconds via HA camera proxy, displays in true **16:9 ratio**
- 👁️ **Motion & person sensor bar** — shows last detected time for both sensors with colour highlight when active
- 🔄 **Flip animation** — smooth fade/scale transition between front (status) and back (control) face

### 🎛️ Control Panel (back face)
- **Animated SVG gate diagram** — shows gate position in real time, lock icon when fully closed, PIR sensor pulse when moving, directional motor arrows
- **3 control buttons** — Open / Stop / Close with colour-coded active states, auto-disabled when already at limit
- **⚠️ Safety warning ticker** — scrolling alert banner while gate is opening or closing
- **Status row** — coloured dot + status text + sub-label below the SVG diagram

### 🌐 Multi-language Support (10 languages)
- 🇻🇳 Tiếng Việt / 🇬🇧 English / 🇩🇪 Deutsch / 🇫🇷 Français / 🇳🇱 Nederlands
- 🇵🇱 Polski / 🇸🇪 Svenska / 🇭🇺 Magyar / 🇨🇿 Čeština / 🇮🇹 Italiano
- **Real country flag images** in language selector (via flagcdn.com)
- **Switching language instantly updates** all text on both the card and the editor

### 🎨 Visual Customisation
- **16 background gradient presets** — Default, Night, Sunset, Forest, Aurora, Desert, Ocean, Cherry, Volcano, Galaxy, Ice, Olive, Slate, Rose, Teal, Custom
- **Custom gradient** — pick any two colours with a built-in colour picker + hex input + swatch dots
- **5 colour pickers** — Accent, Text, Open button, Stop button, Close button
- **Card height slider** — adjustable from 200 px to 600 px

### 🎛️ Config Editor
- **Accordion sections** — expand/collapse: Gate Name, Language, Background, Colors, Size, Entities
- **ha-entity-picker** — native HA dropdown, auto-filtered by entity domain
- **Text inputs with focus fix** — title and zone fields fire config update only on blur/Enter, no focus loss while typing
- **All settings persist** across reloads via HA config storage

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

### Step 2 — Config Editor overview

The Config Editor is divided into **accordion sections** — click any header to expand/collapse:

| Section | Contents |
|---------|----------|
| 🚧 **Gate Name** | Display title and zone/subtitle text |
| 🌐 **Language** | 10 languages with real flag images |
| 🎨 **Background** | 16 gradient presets + custom two-colour picker |
| 🎨 **Colors** | Accent, text, and 3 button colours |
| 📐 **Size** | Card height slider (200–600 px) |
| ⚡ **Entities** | All 9 entity pickers |

---

## 🔌 Entity Reference

### Required entities

| Config key | Entity type | Description |
|---|---|:---:|
| `entity_gate_position` | `sensor` | Gate position (0–100 %) ✅ |
| `entity_gate_open` | `switch` | Open relay switch ✅ |
| `entity_gate_close` | `switch` | Close relay switch ✅ |
| `entity_gate_stop` | `switch` | Stop relay switch ✅ |

### Optional entities

| Config key | Entity type | Description |
|---|---|---|
| `entity_gate_light` | `switch` | Gate light switch |
| `entity_camera` | `camera` | Live camera (snapshot, refreshed every 5 s) |
| `entity_motion` | `binary_sensor` | Motion sensor |
| `entity_person` | `binary_sensor` | Person/occupancy sensor |
| `entity_flipped` | `input_boolean` | Flip state sync across devices |

> 💡 The `entity_flipped` input_boolean keeps the front/back flip state in sync if you have the card open on multiple devices simultaneously.

---

## ⚙️ Display options

| Config key | Values | Default | Description |
|---|---|---|---|
| `language` | `vi` / `en` / `de` / `fr` / `nl` / `pl` / `sv` / `hu` / `cs` / `it` | `vi` | Display language |
| `background_preset` | `default` / `night` / `sunset` / … / `custom` | `default` | Background gradient preset |
| `bg_color1` | hex colour | `#001e2b` | Custom gradient colour 1 (top-left) |
| `bg_color2` | hex colour | `#12c6f3` | Custom gradient colour 2 (bottom-right) |
| `accent_color` | hex colour | `#00ffcc` | Accent / glow colour |
| `btn_open_color` | hex colour | `#00ff96` | Open button highlight colour |
| `btn_stop_color` | hex colour | `#ff5252` | Stop button highlight colour |
| `btn_close_color` | hex colour | `#00dcff` | Close button highlight colour |
| `text_color` | hex colour | `#ffffff` | Primary text colour |
| `card_height` | `200`–`600` | `320` | Card height in pixels |
| `gate_title` | string | *(language default)* | Gate display name |
| `gate_zone` | string | *(language default)* | Zone / subtitle text |

---

## 📝 Full YAML example

```yaml
type: custom:gate-card
language: en
background_preset: default
accent_color: "#00ffcc"
btn_open_color: "#00ff96"
btn_stop_color: "#ff5252"
btn_close_color: "#00dcff"
text_color: "#ffffff"
card_height: 320
gate_title: Side Gate
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

### v1.0.0
- 🚀 **Initial release**
- 🔄 Flip card — front status face / back control face with fade animation
- 📷 Live camera snapshot (16:9, refreshed every 5 s)
- 🎨 SVG gate diagram — real-time position, lock icon, PIR pulse, motor arrows
- ⚠️ Safety warning ticker while gate is moving
- 🌐 10 languages with real country flag images (flagcdn.com)
- 🎨 16 background gradient presets + full custom two-colour picker
- 🎛️ Visual Config Editor — accordion sections, ha-entity-picker, colour pickers, height slider
- 🐛 Input focus fix — title/zone text fields no longer lose focus on every keystroke

---

## 📄 License

MIT License — free to use, modify, and distribute.
If you find this useful, please ⭐ **star the repo**!

---

## 🙏 Credits

Designed and developed by **[@doanlong1412](https://github.com/doanlong1412)** from 🇻🇳 Vietnam.
