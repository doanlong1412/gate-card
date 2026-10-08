/**
 * Gate Card — Custom Home Assistant Lovelace Card
 * v1.3.0 Designed by @doanlong1412 from 🇻🇳 Vietnam
 * HACS-compatible Web Component
 *
 * ─── What's new in v1.3.0 ────────────────────────────────────────────────────
 *  🚪 gate_style: 'cover'  — 2-wing swing gate (cổng 2 cánh mở vào trong)
 *      Transparent background (fence wall + pillars with lamps stay intact).
 *      Both wings open inward symmetrically based on position (0–100%).
 *      Center lock icon fades out as gate opens.
 *      Pillar design, lamp posts and gate panel visuals ported from the
 *      cover_gate_v4_fixed reference, adapted to SVG for HA Lovelace.
 *
 * ─── What's new in v1.1.0 ────────────────────────────────────────────────────
 *  🏠 gate_style: 'shutter'  — Rolling shutter / garage door diagram
 *  🚗 plate_line1 / plate_line2
 *  🌍 country: flag on the pole + licence plate band (vn, de, at, ch, nl, fr, it, pl, se, hu, cz, gb)
 *  🚙 car_brand: rear logo (toyota, seat, vw, none) · car_model: rear badge text · car_trim: trim badge on the right (e.g. FR)
 *     car_color: body colour
 *  🏠 house_theme: garage house look (beige, dark, white, brick – brick has a flat roof and an arched gate)
 *  🚪 side_door: pedestrian door right (default), left or none (garage door centred)
 *  📷 camera extras: entity_vehicle, entity_animal, entity_floodlight, entity_floodlight_mode, entity_recording –
 *     tap the motion/person bar to open a drawer with them
 *  🏠 home_name
 *  ⏱  no_sensor + travel_time_sec
 *  🌐 6 new languages (total 10)
 *  🎨 16 background gradient presets
 *  🎛  Editor reordered: Language → Style → Name → Entities → Colors → BG
 *  🐛 Camera fix / Focus fix
 * ─────────────────────────────────────────────────────────────────────────────
 */

// ─── i18n ─────────────────────────────────────────────────────────────────────
const TRANSLATIONS = {
  vi: {
    lang: 'Tiếng Việt', flag: 'vn',
    title: 'Cổng Phụ', zone: 'ZONE-B · GATE CONTROL',
    status: {
      opening: 'ĐANG MỞ CỔNG', closing: 'ĐANG ĐÓNG CỔNG', stopped: 'ĐANG DỪNG',
      opened: 'CỔNG ĐÃ MỞ', closed: 'ĐÃ ĐÓNG AN TOÀN', partial: p => `DỪNG ${Math.round(p)}%`,
    },
    sub: {
      opening: 'Relay MỞ · Motor tiến', closing: 'Relay ĐÓNG · Motor lùi',
      stopped: 'Motor ngừng · Giữ vị trí', opened: 'Khóa mở · Sẵn sàng vào',
      closed: 'Khóa chốt · Sẵn sàng', partial: p => `Dừng giữa chừng · ${Math.round(p)}% mở`,
    },
    time: { justNow: 'vừa xong', minsAgo: m => `${m} phút trước`, hAgo: (h,m) => `${h} giờ${m>0?' '+m+' phút':''} trước` },
    light: on => `ĐÈN CỔNG · ${on?'BẬT':'TẮT'}`,
    motion: 'Chuyển động:', person: 'Người:',
    control: 'ĐIỀU KHIỂN ▶', back: '◀ QUAY LẠI',
    open: 'Mở', stop: 'Dừng', close: 'Đóng',
    warn_open: '⚠️ CỔNG ĐANG MỞ — CHÚ Ý AN TOÀN',
    warn_close: '⚠️ CỔNG ĐANG ĐÓNG — CHÚ Ý AN TOÀN',
    posClose: 'ĐÓNG', posOpen: 'MỞ', position: p => `POSITION ${Math.round(p)}%`,
    bgLabel: 'Màu nền gradient', bgPresets: 'Preset',
    colorLabel: 'Màu sắc', accentColor: 'Màu nhấn (accent)',
    btnOpenColor: 'Màu nút Mở', btnStopColor: 'Màu nút Dừng', btnCloseColor: 'Màu nút Đóng',
    textColor: 'Màu chữ', sizeLabel: 'Kích thước', cardHeight: 'Chiều cao card (px)',
    entityLabel: 'Thực thể (Entity)',
    entityGatePos: '📡 Cảm biến vị trí cổng', entityGateOpen: '🔓 Switch Mở cổng',
    entityGateClose: '🔒 Switch Đóng cổng', entityGateStop: '🛑 Switch Dừng cổng',
    entityGateLight: '💡 Switch Đèn cổng', entityGateLock: '🔐 Switch Khóa cổng', entityCamera: '📷 Camera',
    entityMotion: '🏃 Cảm biến chuyển động', entityPerson: '👤 Cảm biến người',
    entityFlipped: '🔄 Input Boolean lật card',
    color1: 'Màu 1 (trên trái)', color2: 'Màu 2 (dưới phải)',
    edLang: 'Ngôn ngữ',
    edStyle: 'Kiểu cổng / cửa',
    edName: 'Tên cổng',
    edStyleSlide: '🚧 CỔNG TRƯỢT',
    edStyleShutter: '🏠 CỬA CUỐN',
    edStyleCover: '🚪 CỔNG 2 CÁNH',
    edGateTitle: '🚧 Tên cổng (hiển thị trên card)',
    edGateZone: '📍 Zone / mô tả phụ',
    edPlate1: '🚗 Biển số xe (dòng 1)',
    edPlate2: '🚗 Biển số xe (dòng 2)',
    edCountry: '🌍 Quốc gia (cờ & biển số)',
    edHouseTheme: '🏠 Kiểu nhà',
    vehicle: 'Xe', animal: 'Động vật', floodlight: 'Đèn pha', recording: 'Ghi hình', recOn: 'Đang ghi', recOff: 'Tạm dừng', now: 'bây giờ', edCarTrim: '🚙 Phiên bản (vd. FR)', edSideDoor: '🚪 Cửa phụ', sideDoors: { left: 'Trái', right: 'Phải', none: 'Không' }, on: 'BẬT', off: 'TẮT', floodModes: { off: 'tắt', auto: 'tự động', schedule: 'lịch' },
    entityVehicle: '🚗 Xe (AI)', entityAnimal: '🐾 Động vật (AI)', entityFloodlight: '🔦 Đèn pha camera', entityFloodlightMode: '🔦 Chế độ đèn pha', entityRecording: '⏺ Ghi hình camera',
    houseThemes: { beige: 'Be', dark: 'Tối', white: 'Trắng', brick: 'Gạch' },
    edCarBrand: '🚙 Hãng xe (logo)',
    edCarModel: '🚙 Dòng xe (chữ đuôi xe)',
    edCarColor: '🎨 Màu xe',
    edSensorPos: '📡 Cảm biến cổng',
    edHomeName: '🏠 Tên My Home',
    edNoSensor: '⏱ Không có cảm biến vị trí',
    edTravelTime: '⏱ Thời gian hành trình (giây)',
    edNoSensorHint: 'Bật nếu cổng không có cảm biến vị trí. Card sẽ tính vị trí theo thời gian.',
    edInvertSensor: '🔄 Đảo chiều cảm biến vị trí',
    edInvertSensorHint: 'Bật nếu cảm biến báo ngược (100% = đóng). Card sẽ tự đảo giá trị vị trí.',
    edPulseSwitch: '⚡ Công tắc nhấn nhả (Pulse)',
    edPulseSwitchHint: 'Bật nếu relay chỉ bật tầm 1-3s rồi tắt nhưng motor vẫn chạy hết hành trình. Timer sẽ chạy đến cuối bất kể relay tắt.',
    edUseLock: '🔐 Dùng khóa cổng',
    edUseLockHint: 'Bật để kích hoạt tính năng khóa. Khi đang bật và trạng thái khóa là ON, nút Mở cổng sẽ bị vô hiệu hóa.',
    lightBtn: 'ĐÈN',
  },
  en: {
    lang: 'English', flag: 'gb',
    title: 'Side Gate', zone: 'ZONE-B · GATE CONTROL',
    status: {
      opening: 'OPENING GATE', closing: 'CLOSING GATE', stopped: 'STOPPED',
      opened: 'GATE OPEN', closed: 'GATE SECURED', partial: p => `STOPPED ${Math.round(p)}%`,
    },
    sub: {
      opening: 'Open Relay · Motor forward', closing: 'Close Relay · Motor reverse',
      stopped: 'Motor stopped · Holding', opened: 'Unlocked · Ready',
      closed: 'Latched · Ready', partial: p => `Mid-stop · ${Math.round(p)}% open`,
    },
    time: { justNow: 'just now', minsAgo: m => `${m} min ago`, hAgo: (h,m) => `${h}h${m>0?' '+m+'m':''} ago` },
    light: on => `GATE LIGHT · ${on?'ON':'OFF'}`,
    motion: 'Motion:', person: 'Person:',
    control: 'CONTROLS ▶', back: '◀ BACK',
    open: 'Open', stop: 'Stop', close: 'Close',
    warn_open: '⚠️ GATE OPENING — CAUTION', warn_close: '⚠️ GATE CLOSING — CAUTION',
    posClose: 'CLOSE', posOpen: 'OPEN', position: p => `POSITION ${Math.round(p)}%`,
    bgLabel: 'Gradient background', bgPresets: 'Preset',
    colorLabel: 'Colors', accentColor: 'Accent color',
    btnOpenColor: 'Open button color', btnStopColor: 'Stop button color', btnCloseColor: 'Close button color',
    textColor: 'Text color', sizeLabel: 'Size', cardHeight: 'Card height (px)',
    entityLabel: 'Entities',
    entityGatePos: '📡 Gate position sensor', entityGateOpen: '🔓 Gate open switch',
    entityGateClose: '🔒 Gate close switch', entityGateStop: '🛑 Gate stop switch',
    entityGateLight: '💡 Gate light switch', entityGateLock: '🔐 Gate lock switch', entityCamera: '📷 Camera',
    entityMotion: '🏃 Motion sensor', entityPerson: '👤 Person sensor',
    entityFlipped: '🔄 Flip state boolean',
    color1: 'Color 1 (top left)', color2: 'Color 2 (bottom right)',
    edLang: 'Language',
    edStyle: 'Gate / Door Style',
    edName: 'Gate Name',
    edStyleSlide: '🚧 SLIDING GATE',
    edStyleShutter: '🏠 SHUTTER DOOR',
    edStyleCover: '🚪 SWING GATE',
    edGateTitle: '🚧 Gate name (shown on card)',
    edGateZone: '📍 Zone / subtitle',
    edPlate1: '🚗 License plate (line 1)',
    edPlate2: '🚗 License plate (line 2)',
    edCountry: '🌍 Country (flag & plate)',
    edHouseTheme: '🏠 House style',
    vehicle: 'Vehicle', animal: 'Animal', floodlight: 'Floodlight', recording: 'Recording', recOn: 'on', recOff: 'paused', now: 'now', edCarTrim: '🚙 Trim badge (e.g. FR)', edSideDoor: '🚪 Side door', sideDoors: { left: 'Left', right: 'Right', none: 'None' }, on: 'ON', off: 'OFF', floodModes: { off: 'off', auto: 'auto', schedule: 'schedule' },
    entityVehicle: '🚗 Vehicle detection', entityAnimal: '🐾 Animal detection', entityFloodlight: '🔦 Camera floodlight', entityFloodlightMode: '🔦 Floodlight mode', entityRecording: '⏺ Camera recording',
    houseThemes: { beige: 'Beige', dark: 'Dark', white: 'White', brick: 'Brick' },
    edCarBrand: '🚙 Car brand (logo)',
    edCarModel: '🚙 Car model (rear badge)',
    edCarColor: '🎨 Car colour',
    edSensorPos: '📡 Gate sensor',
    edHomeName: '🏠 My Home name',
    edNoSensor: '⏱ No position sensor',
    edTravelTime: '⏱ Travel time (seconds)',
    edNoSensorHint: 'Enable if the gate has no position sensor. Position will be estimated by timer.',
    edInvertSensor: '🔄 Invert position sensor',
    edInvertSensorHint: 'Enable if sensor reports reversed values (100% = closed). Card will invert the position.',
    edPulseSwitch: '⚡ Pulse switch',
    edPulseSwitchHint: 'Enable if relay only pulses briefly (~1-3s) but motor runs the full travel. Timer runs to completion regardless of relay state.',
    edUseLock: '🔐 Use gate lock',
    edUseLockHint: 'Enable to activate lock feature. When on and lock entity is ON, the Open button will be disabled.',
    lightBtn: 'LIGHT',
  },
  de: {
    lang: 'Deutsch', flag: 'de',
    title: 'Nebentor', zone: 'ZONE-B · TOR-STEUERUNG',
    status: {
      opening: 'TOR ÖFFNET', closing: 'TOR SCHLIESST', stopped: 'GESTOPPT',
      opened: 'TOR OFFEN', closed: 'TOR GESICHERT', partial: p => `GESTOPPT ${Math.round(p)}%`,
    },
    sub: {
      opening: 'Relais ÖFFNEN · Motor vor', closing: 'Relais SCHLIESSEN · Motor zurück',
      stopped: 'Motor gestoppt', opened: 'Entsperrt · Frei', closed: 'Verriegelt · Bereit',
      partial: p => `Halbweg · ${Math.round(p)}% offen`,
    },
    time: { justNow: 'gerade eben', minsAgo: m => `vor ${m} Min`, hAgo: (h,m) => `vor ${h}h${m>0?' '+m+'m':''}` },
    light: on => `TORLEUCHTE · ${on?'AN':'AUS'}`,
    motion: 'Bewegung:', person: 'Person:',
    control: 'STEUERUNG ▶', back: '◀ ZURÜCK',
    open: 'Öffnen', stop: 'Stop', close: 'Schließen',
    warn_open: '⚠️ TOR ÖFFNET — VORSICHT', warn_close: '⚠️ TOR SCHLIESST — VORSICHT',
    posClose: 'ZU', posOpen: 'AUF', position: p => `POSITION ${Math.round(p)}%`,
    bgLabel: 'Verlaufshintergrund', bgPresets: 'Voreinstellung',
    colorLabel: 'Farben', accentColor: 'Akzentfarbe',
    btnOpenColor: 'Öffnen-Button', btnStopColor: 'Stop-Button', btnCloseColor: 'Schließen-Button',
    textColor: 'Textfarbe', sizeLabel: 'Größe', cardHeight: 'Karten-Höhe (px)',
    entityLabel: 'Entitäten',
    entityGatePos: '📡 Positionssensor', entityGateOpen: '🔓 Schalter Öffnen',
    entityGateClose: '🔒 Schalter Schließen', entityGateStop: '🛑 Schalter Stopp',
    entityGateLight: '💡 Schalter Licht', entityGateLock: '🔐 Schalter Schloss', entityCamera: '📷 Kamera',
    entityMotion: '🏃 Bewegungssensor', entityPerson: '👤 Personensensor',
    entityFlipped: '🔄 Input Boolean Flip',
    color1: 'Farbe 1 (oben links)', color2: 'Farbe 2 (unten rechts)',
    edLang: 'Sprache',
    edStyle: 'Tor- / Türart',
    edName: 'Torname',
    edStyleSlide: '🚧 SCHIEBETOR',
    edStyleShutter: '🏠 ROLLTOR',
    edStyleCover: '🚪 FLÜGELTOR',
    edGateTitle: '🚧 Torname (auf Karte)',
    edGateZone: '📍 Zone / Untertitel',
    edPlate1: '🚗 Kennzeichen (Zeile 1)',
    edPlate2: '🚗 Kennzeichen (Zeile 2)',
    edCountry: '🌍 Land (Fahne & Kennzeichen)',
    edHouseTheme: '🏠 Haus-Stil',
    vehicle: 'Fahrzeug', animal: 'Tier', floodlight: 'Scheinwerfer', recording: 'Aufnahme', recOn: 'läuft', recOff: 'pausiert', now: 'jetzt', edCarTrim: '🚙 Ausstattung (z. B. FR)', edSideDoor: '🚪 Pforte', sideDoors: { left: 'Links', right: 'Rechts', none: 'Keine' }, on: 'AN', off: 'AUS', floodModes: { off: 'manuell', auto: 'Auto', schedule: 'Zeitplan' },
    entityVehicle: '🚗 Fahrzeug-Erkennung', entityAnimal: '🐾 Tier-Erkennung', entityFloodlight: '🔦 Kamera-Scheinwerfer', entityFloodlightMode: '🔦 Scheinwerfer-Modus', entityRecording: '⏺ Kamera-Aufzeichnung',
    houseThemes: { beige: 'Beige', dark: 'Anthrazit', white: 'Weiß', brick: 'Klinker' },
    edCarBrand: '🚙 Automarke (Logo)',
    edCarModel: '🚙 Modell (Schriftzug)',
    edCarColor: '🎨 Autofarbe',
    edSensorPos: '📡 Tor-Sensor',
    edHomeName: '🏠 My Home Name',
    edNoSensor: '⏱ Kein Positionssensor',
    edTravelTime: '⏱ Fahrzeit (Sekunden)',
    edNoSensorHint: 'Aktivieren, wenn kein Positionssensor vorhanden. Position wird per Timer geschätzt.',
    edInvertSensor: '🔄 Positionssensor umkehren',
    edInvertSensorHint: 'Aktivieren, wenn Sensor umgekehrte Werte liefert (100% = geschlossen).',
    edPulseSwitch: '⚡ Impulsschalter (Pulse)',
    edPulseSwitchHint: 'Aktivieren wenn Relais nur kurz (~1-3s) schaltet, Motor aber volle Strecke fährt.',
    edUseLock: '🔐 Schloss verwenden',
    edUseLockHint: 'Aktivieren um das Schloss zu nutzen. Wenn aktiv und Schloss EIN, wird die Öffnen-Taste deaktiviert.',
    lightBtn: 'LICHT',
  },
  fr: {
    lang: 'Français', flag: 'fr',
    title: 'Portail Secondaire', zone: 'ZONE-B · CONTRÔLE DU PORTAIL',
    status: {
      opening: 'PORTAIL EN OUVERTURE', closing: 'PORTAIL EN FERMETURE', stopped: 'ARRÊTÉ',
      opened: 'PORTAIL OUVERT', closed: 'PORTAIL SÉCURISÉ', partial: p => `ARRÊTÉ ${Math.round(p)}%`,
    },
    sub: {
      opening: 'Relais OUVERT · Moteur avant', closing: 'Relais FERMÉ · Moteur arrière',
      stopped: 'Moteur arrêté', opened: 'Déverrouillé · Prêt', closed: 'Verrouillé · Prêt',
      partial: p => `Arrêt partiel · ${Math.round(p)}% ouvert`,
    },
    time: { justNow: 'à l\'instant', minsAgo: m => `il y a ${m} min`, hAgo: (h,m) => `il y a ${h}h${m>0?' '+m+'m':''}` },
    light: on => `LUMIÈRE DU PORTAIL · ${on?'ALLUMÉE':'ÉTEINTE'}`,
    motion: 'Mouvement:', person: 'Personne:',
    control: 'COMMANDES ▶', back: '◀ RETOUR',
    open: 'Ouvrir', stop: 'Stop', close: 'Fermer',
    warn_open: '⚠️ PORTAIL EN OUVERTURE — ATTENTION', warn_close: '⚠️ PORTAIL EN FERMETURE — ATTENTION',
    posClose: 'FERMÉ', posOpen: 'OUVERT', position: p => `POSITION ${Math.round(p)}%`,
    bgLabel: 'Dégradé de fond', bgPresets: 'Préréglage',
    colorLabel: 'Couleurs', accentColor: 'Couleur d\'accent',
    btnOpenColor: 'Bouton Ouvrir', btnStopColor: 'Bouton Stop', btnCloseColor: 'Bouton Fermer',
    textColor: 'Couleur du texte', sizeLabel: 'Taille', cardHeight: 'Hauteur de la carte (px)',
    entityLabel: 'Entités',
    entityGatePos: '📡 Capteur de position', entityGateOpen: '🔓 Interrupteur Ouverture',
    entityGateClose: '🔒 Interrupteur Fermeture', entityGateStop: '🛑 Interrupteur Stop',
    entityGateLight: '💡 Interrupteur Lumière', entityGateLock: '🔐 Interrupteur Verrou', entityCamera: '📷 Caméra',
    entityMotion: '🏃 Détecteur de mouvement', entityPerson: '👤 Détecteur de personne',
    entityFlipped: '🔄 Booléen de retournement',
    color1: 'Couleur 1 (haut gauche)', color2: 'Couleur 2 (bas droite)',
    edLang: 'Langue',
    edStyle: 'Type de portail',
    edName: 'Nom du portail',
    edStyleSlide: '🚧 PORTAIL COULISSANT',
    edStyleShutter: '🏠 PORTE ROULANTE',
    edStyleCover: '🚪 PORTAIL BATTANT',
    edGateTitle: '🚧 Nom (affiché sur la carte)',
    edGateZone: '📍 Zone / sous-titre',
    edPlate1: '🚗 Plaque (ligne 1)',
    edPlate2: '🚗 Plaque (ligne 2)',
    edCountry: '🌍 Pays (drapeau & plaque)',
    edHouseTheme: '🏠 Style de maison',
    houseThemes: { beige: 'Beige', dark: 'Anthracite', white: 'Blanc', brick: 'Brique' },
    edCarBrand: '🚙 Marque (logo)',
    edCarModel: '🚙 Modèle (badge arrière)',
    edCarColor: '🎨 Couleur de la voiture',
    edSensorPos: '📡 Capteur de portail',
    edHomeName: '🏠 Nom My Home',
    edNoSensor: '⏱ Pas de capteur de position',
    edTravelTime: '⏱ Temps de course (secondes)',
    edNoSensorHint: 'Activer si le portail n\'a pas de capteur. La position sera estimée par minuterie.',
    edInvertSensor: '🔄 Inverser le capteur de position',
    edInvertSensorHint: 'Activer si le capteur renvoie des valeurs inversées (100% = fermé).',
    edPulseSwitch: '⚡ Interrupteur impulsion',
    edPulseSwitchHint: 'Activer si le relais ne pulse que brièvement (~1-3s) mais le moteur fait le trajet complet.',
    edUseLock: '🔐 Utiliser le verrou',
    edUseLockHint: 'Activer pour utiliser le verrou. Si actif et verrou ON, le bouton Ouvrir sera désactivé.',
    lightBtn: 'LUMIÈRE',
  },
  nl: {
    lang: 'Nederlands', flag: 'nl',
    title: 'Zijpoort', zone: 'ZONE-B · POORTBESTURING',
    status: {
      opening: 'POORT OPENT', closing: 'POORT SLUIT', stopped: 'GESTOPT',
      opened: 'POORT OPEN', closed: 'POORT BEVEILIGD', partial: p => `GESTOPT ${Math.round(p)}%`,
    },
    sub: {
      opening: 'Relais OPEN · Motor vooruit', closing: 'Relais GESLOTEN · Motor achteruit',
      stopped: 'Motor gestopt', opened: 'Ontgrendeld · Klaar', closed: 'Vergrendeld · Klaar',
      partial: p => `Halverwege gestopt · ${Math.round(p)}% open`,
    },
    time: { justNow: 'zojuist', minsAgo: m => `${m} min geleden`, hAgo: (h,m) => `${h}u${m>0?' '+m+'m':''} geleden` },
    light: on => `POORTLICHT · ${on?'AAN':'UIT'}`,
    motion: 'Beweging:', person: 'Persoon:',
    control: 'BEDIENING ▶', back: '◀ TERUG',
    open: 'Openen', stop: 'Stop', close: 'Sluiten',
    warn_open: '⚠️ POORT OPENT — VOORZICHTIG', warn_close: '⚠️ POORT SLUIT — VOORZICHTIG',
    posClose: 'DICHT', posOpen: 'OPEN', position: p => `POSITIE ${Math.round(p)}%`,
    bgLabel: 'Verloopachtergrond', bgPresets: 'Voorinstelling',
    colorLabel: 'Kleuren', accentColor: 'Accentkleur',
    btnOpenColor: 'Knop Openen', btnStopColor: 'Knop Stop', btnCloseColor: 'Knop Sluiten',
    textColor: 'Tekstkleur', sizeLabel: 'Grootte', cardHeight: 'Kaarthoogte (px)',
    entityLabel: 'Entiteiten',
    entityGatePos: '📡 Positiesensor', entityGateOpen: '🔓 Schakelaar Openen',
    entityGateClose: '🔒 Schakelaar Sluiten', entityGateStop: '🛑 Schakelaar Stop',
    entityGateLight: '💡 Schakelaar Licht', entityGateLock: '🔐 Schakelaar Slot', entityCamera: '📷 Camera',
    entityMotion: '🏃 Bewegingssensor', entityPerson: '👤 Persoonssensor',
    entityFlipped: '🔄 Invoerbooleaan flip',
    color1: 'Kleur 1 (linksboven)', color2: 'Kleur 2 (rechtsonder)',
    edLang: 'Taal',
    edStyle: 'Poort- / Deurstijl',
    edName: 'Poortnaam',
    edStyleSlide: '🚧 SCHUIFPOORT',
    edStyleShutter: '🏠 ROLLUIK',
    edStyleCover: '🚪 DRAAIHEK',
    edGateTitle: '🚧 Poortnaam (op kaart)',
    edGateZone: '📍 Zone / ondertitel',
    edPlate1: '🚗 Kenteken (regel 1)',
    edPlate2: '🚗 Kenteken (regel 2)',
    edCountry: '🌍 Land (vlag & kenteken)',
    edHouseTheme: '🏠 Huisstijl',
    houseThemes: { beige: 'Beige', dark: 'Antraciet', white: 'Wit', brick: 'Baksteen' },
    edCarBrand: '🚙 Automerk (logo)',
    edCarModel: '🚙 Model (achterlogo)',
    edCarColor: '🎨 Autokleur',
    edSensorPos: '📡 Poortsensor',
    edHomeName: '🏠 My Home naam',
    edNoSensor: '⏱ Geen positiesensor',
    edTravelTime: '⏱ Looptijd (seconden)',
    edNoSensorHint: 'Inschakelen als de poort geen positiesensor heeft. Positie wordt geschat via timer.',
    edInvertSensor: '🔄 Positiesensor omkeren',
    edInvertSensorHint: 'Inschakelen als sensor omgekeerde waarden geeft (100% = gesloten).',
    edPulseSwitch: '⚡ Pulsschakelaar',
    edPulseSwitchHint: 'Inschakelen als relais kort pulst (~1-3s) maar motor volledig doorloopt.',
    edUseLock: '🔐 Slot gebruiken',
    edUseLockHint: 'Inschakelen om het slot te activeren. Als ingeschakeld en slot AAN, wordt de Openen-knop uitgeschakeld.',
    lightBtn: 'LICHT',
  },
  pl: {
    lang: 'Polski', flag: 'pl',
    title: 'Brama Boczna', zone: 'STREFA-B · STEROWANIE BRAMĄ',
    status: {
      opening: 'BRAMA OTWIERA SIĘ', closing: 'BRAMA ZAMYKA SIĘ', stopped: 'ZATRZYMANA',
      opened: 'BRAMA OTWARTA', closed: 'BRAMA ZABEZPIECZONA', partial: p => `ZATRZYMANA ${Math.round(p)}%`,
    },
    sub: {
      opening: 'Przekaźnik OTWARTY · Silnik do przodu', closing: 'Przekaźnik ZAMKNIĘTY · Silnik wstecz',
      stopped: 'Silnik zatrzymany', opened: 'Odblokowana · Gotowa', closed: 'Zablokowana · Gotowa',
      partial: p => `Zatrzymana w połowie · ${Math.round(p)}% otwarta`,
    },
    time: { justNow: 'przed chwilą', minsAgo: m => `${m} min temu`, hAgo: (h,m) => `${h}g${m>0?' '+m+'m':''} temu` },
    light: on => `ŚWIATŁO BRAMY · ${on?'WŁ':'WYŁ'}`,
    motion: 'Ruch:', person: 'Osoba:',
    control: 'STEROWANIE ▶', back: '◀ POWRÓT',
    open: 'Otwórz', stop: 'Stop', close: 'Zamknij',
    warn_open: '⚠️ BRAMA OTWIERA SIĘ — UWAGA', warn_close: '⚠️ BRAMA ZAMYKA SIĘ — UWAGA',
    posClose: 'ZAMKNIĘTA', posOpen: 'OTWARTA', position: p => `POZYCJA ${Math.round(p)}%`,
    bgLabel: 'Tło gradientowe', bgPresets: 'Ustawienie wstępne',
    colorLabel: 'Kolory', accentColor: 'Kolor akcentu',
    btnOpenColor: 'Przycisk Otwórz', btnStopColor: 'Przycisk Stop', btnCloseColor: 'Przycisk Zamknij',
    textColor: 'Kolor tekstu', sizeLabel: 'Rozmiar', cardHeight: 'Wysokość karty (px)',
    entityLabel: 'Encje',
    entityGatePos: '📡 Czujnik pozycji', entityGateOpen: '🔓 Przełącznik Otwieranie',
    entityGateClose: '🔒 Przełącznik Zamykanie', entityGateStop: '🛑 Przełącznik Stop',
    entityGateLight: '💡 Przełącznik Światło', entityGateLock: '🔐 Przełącznik Zamek', entityCamera: '📷 Kamera',
    entityMotion: '🏃 Czujnik ruchu', entityPerson: '👤 Czujnik osoby',
    entityFlipped: '🔄 Wartość logiczna odwrócenia',
    color1: 'Kolor 1 (lewy górny)', color2: 'Kolor 2 (prawy dolny)',
    edLang: 'Język',
    edStyle: 'Typ bramy / drzwi',
    edName: 'Nazwa bramy',
    edStyleSlide: '🚧 BRAMA PRZESUWNA',
    edStyleShutter: '🏠 BRAMA ROLOWANA',
    edStyleCover: '🚪 BRAMA DWUSKRZYDŁOWA',
    edGateTitle: '🚧 Nazwa (widoczna na karcie)',
    edGateZone: '📍 Strefa / podtytuł',
    edPlate1: '🚗 Tablica rejestracyjna (linia 1)',
    edPlate2: '🚗 Tablica rejestracyjna (linia 2)',
    edCountry: '🌍 Kraj (flaga i tablica)',
    edHouseTheme: '🏠 Styl domu',
    houseThemes: { beige: 'Beżowy', dark: 'Antracyt', white: 'Biały', brick: 'Cegła' },
    edCarBrand: '🚙 Marka (logo)',
    edCarModel: '🚙 Model (napis z tyłu)',
    edCarColor: '🎨 Kolor auta',
    edSensorPos: '📡 Czujnik bramy',
    edHomeName: '🏠 Nazwa My Home',
    edNoSensor: '⏱ Brak czujnika pozycji',
    edTravelTime: '⏱ Czas przejazdu (sekundy)',
    edNoSensorHint: 'Włącz, jeśli brama nie ma czujnika. Pozycja będzie szacowana przez timer.',
    edInvertSensor: '🔄 Odwróć czujnik pozycji',
    edInvertSensorHint: 'Włącz jeśli czujnik podaje odwrócone wartości (100% = zamknięta).',
    edPulseSwitch: '⚡ Przełącznik impulsowy',
    edPulseSwitchHint: 'Włącz jeśli przekaźnik działa krótko (~1-3s), a silnik przejeżdża pełen dystans.',
    edUseLock: '🔐 Używaj zamka',
    edUseLockHint: 'Włącz aby aktywować zamek. Gdy aktywny i zamek ON, przycisk Otwórz będzie wyłączony.',
    lightBtn: 'ŚWIATŁO',
  },
  sv: {
    lang: 'Svenska', flag: 'se',
    title: 'Sidogrind', zone: 'ZON-B · GRINDSTYRNING',
    status: {
      opening: 'GRINDEN ÖPPNAR', closing: 'GRINDEN STÄNGER', stopped: 'STOPPAD',
      opened: 'GRINDEN ÖPPEN', closed: 'GRINDEN SÄKRAD', partial: p => `STOPPAD ${Math.round(p)}%`,
    },
    sub: {
      opening: 'Relä ÖPPET · Motor framåt', closing: 'Relä STÄNGT · Motor bakåt',
      stopped: 'Motor stoppad', opened: 'Olåst · Redo', closed: 'Låst · Redo',
      partial: p => `Halvvägs stopp · ${Math.round(p)}% öppen`,
    },
    time: { justNow: 'just nu', minsAgo: m => `${m} min sedan`, hAgo: (h,m) => `${h}t${m>0?' '+m+'m':''} sedan` },
    light: on => `GRINDBELYSNING · ${on?'PÅ':'AV'}`,
    motion: 'Rörelse:', person: 'Person:',
    control: 'KONTROLLER ▶', back: '◀ TILLBAKA',
    open: 'Öppna', stop: 'Stopp', close: 'Stäng',
    warn_open: '⚠️ GRINDEN ÖPPNAR — VARNING', warn_close: '⚠️ GRINDEN STÄNGER — VARNING',
    posClose: 'STÄNGD', posOpen: 'ÖPPEN', position: p => `POSITION ${Math.round(p)}%`,
    bgLabel: 'Gradientbakgrund', bgPresets: 'Förinställning',
    colorLabel: 'Färger', accentColor: 'Accentfärg',
    btnOpenColor: 'Knapp Öppna', btnStopColor: 'Knapp Stopp', btnCloseColor: 'Knapp Stäng',
    textColor: 'Textfärg', sizeLabel: 'Storlek', cardHeight: 'Korthöjd (px)',
    entityLabel: 'Entiteter',
    entityGatePos: '📡 Positionssensor', entityGateOpen: '🔓 Brytare Öppna',
    entityGateClose: '🔒 Brytare Stänga', entityGateStop: '🛑 Brytare Stopp',
    entityGateLight: '💡 Brytare Belysning', entityGateLock: '🔐 Brytare Lås', entityCamera: '📷 Kamera',
    entityMotion: '🏃 Rörelsesensor', entityPerson: '👤 Personsensor',
    entityFlipped: '🔄 Boolesk flip',
    color1: 'Färg 1 (övre vänster)', color2: 'Färg 2 (nedre höger)',
    edLang: 'Språk',
    edStyle: 'Grind- / Dörrstil',
    edName: 'Grindnamn',
    edStyleSlide: '🚧 SKJUTGRIND',
    edStyleShutter: '🏠 RULLPORT',
    edStyleCover: '🚪 GRINDFLYGEL',
    edGateTitle: '🚧 Grindnamn (visas på kort)',
    edGateZone: '📍 Zon / underrubrik',
    edPlate1: '🚗 Registreringsskylt (rad 1)',
    edPlate2: '🚗 Registreringsskylt (rad 2)',
    edCountry: '🌍 Land (flagga & skylt)',
    edHouseTheme: '🏠 Husstil',
    houseThemes: { beige: 'Beige', dark: 'Antracit', white: 'Vit', brick: 'Tegel' },
    edCarBrand: '🚙 Bilmärke (logotyp)',
    edCarModel: '🚙 Modell (emblem bak)',
    edCarColor: '🎨 Bilfärg',
    edSensorPos: '📡 Grindgivare',
    edHomeName: '🏠 My Home namn',
    edNoSensor: '⏱ Ingen positionssensor',
    edTravelTime: '⏱ Körtid (sekunder)',
    edNoSensorHint: 'Aktivera om grinden saknar positionssensor. Position beräknas via timer.',
    edInvertSensor: '🔄 Invertera positionssensor',
    edInvertSensorHint: 'Aktivera om sensorn rapporterar omvända värden (100% = stängd).',
    edPulseSwitch: '⚡ Pulsbrytare',
    edPulseSwitchHint: 'Aktivera om reläet bara pulserar kort (~1-3s) men motorn kör hela sträckan.',
    edUseLock: '🔐 Använd lås',
    edUseLockHint: 'Aktivera för låsfunktion. När aktiv och lås PÅ, inaktiveras Öppna-knappen.',
    lightBtn: 'LJUS',
  },
  hu: {
    lang: 'Magyar', flag: 'hu',
    title: 'Oldalsó Kapu', zone: 'B-ZÓNA · KAPUVEZÉRLÉS',
    status: {
      opening: 'KAPU NYÍLIK', closing: 'KAPU ZÁRUL', stopped: 'MEGÁLLÍTVA',
      opened: 'KAPU NYITVA', closed: 'KAPU BIZTONSÁGBAN', partial: p => `MEGÁLLÍTVA ${Math.round(p)}%`,
    },
    sub: {
      opening: 'Relé NYITVA · Motor előre', closing: 'Relé ZÁRVA · Motor hátra',
      stopped: 'Motor megállítva', opened: 'Feloldva · Kész', closed: 'Zárva · Kész',
      partial: p => `Félúton megállítva · ${Math.round(p)}% nyitva`,
    },
    time: { justNow: 'az imént', minsAgo: m => `${m} perce`, hAgo: (h,m) => `${h} órája${m>0?' '+m+' perce':''}` },
    light: on => `KAPUVILÁGÍTÁS · ${on?'BE':'KI'}`,
    motion: 'Mozgás:', person: 'Személy:',
    control: 'VEZÉRLÉS ▶', back: '◀ VISSZA',
    open: 'Nyitás', stop: 'Stop', close: 'Zárás',
    warn_open: '⚠️ KAPU NYÍLIK — FIGYELEM', warn_close: '⚠️ KAPU ZÁRUL — FIGYELEM',
    posClose: 'ZÁRVA', posOpen: 'NYITVA', position: p => `POZÍCIÓ ${Math.round(p)}%`,
    bgLabel: 'Gradiens háttér', bgPresets: 'Előbeállítás',
    colorLabel: 'Színek', accentColor: 'Kiemelőszín',
    btnOpenColor: 'Nyitás gomb', btnStopColor: 'Stop gomb', btnCloseColor: 'Zárás gomb',
    textColor: 'Szövegszín', sizeLabel: 'Méret', cardHeight: 'Kártya magassága (px)',
    entityLabel: 'Entitások',
    entityGatePos: '📡 Pozícióérzékelő', entityGateOpen: '🔓 Kapcsoló Nyitás',
    entityGateClose: '🔒 Kapcsoló Zárás', entityGateStop: '🛑 Kapcsoló Stop',
    entityGateLight: '💡 Kapcsoló Világítás', entityGateLock: '🔐 Kapcsoló Zár', entityCamera: '📷 Kamera',
    entityMotion: '🏃 Mozgásérzékelő', entityPerson: '👤 Személyérzékelő',
    entityFlipped: '🔄 Logikai flip',
    color1: 'Szín 1 (bal felső)', color2: 'Szín 2 (jobb alsó)',
    edLang: 'Nyelv',
    edStyle: 'Kapu / Ajtó típus',
    edName: 'Kapu neve',
    edStyleSlide: '🚧 TOLÓKAPU',
    edStyleShutter: '🏠 REDŐNYKAPU',
    edStyleCover: '🚪 KÉTSZÁRNYÚ KAPU',
    edGateTitle: '🚧 Kapu neve (kártyán látható)',
    edGateZone: '📍 Zóna / alcím',
    edPlate1: '🚗 Rendszám (1. sor)',
    edPlate2: '🚗 Rendszám (2. sor)',
    edCountry: '🌍 Ország (zászló és rendszám)',
    edHouseTheme: '🏠 Ház stílusa',
    houseThemes: { beige: 'Bézs', dark: 'Antracit', white: 'Fehér', brick: 'Tégla' },
    edCarBrand: '🚙 Autómárka (logó)',
    edCarModel: '🚙 Modell (hátsó felirat)',
    edCarColor: '🎨 Autó színe',
    edSensorPos: '📡 Kapuérzékelő',
    edHomeName: '🏠 My Home neve',
    edNoSensor: '⏱ Nincs pozícióérzékelő',
    edTravelTime: '⏱ Menetidő (másodperc)',
    edNoSensorHint: 'Aktiváld, ha a kapunak nincs pozícióérzékelője. A pozíció időzítővel lesz becsülve.',
    edInvertSensor: '🔄 Pozícióérzékelő invertálása',
    edInvertSensorHint: 'Aktiváld, ha az érzékelő fordított értékeket ad (100% = zárva).',
    edPulseSwitch: '⚡ Impulzuskapcsoló',
    edPulseSwitchHint: 'Aktiváld ha a relé csak röviden (~1-3s) kapcsol, de a motor teljes utat tesz meg.',
    edUseLock: '🔐 Zár használata',
    edUseLockHint: 'Aktiváld a zárfunkció engedélyezéséhez. Ha aktív és a zár BE, a Nyitás gomb letiltásra kerül.',
    lightBtn: 'LÁMPA',
  },
  cs: {
    lang: 'Čeština', flag: 'cz',
    title: 'Boční Brána', zone: 'ZÓNA-B · OVLÁDÁNÍ BRÁNY',
    status: {
      opening: 'BRÁNA SE OTEVÍRÁ', closing: 'BRÁNA SE ZAVÍRÁ', stopped: 'ZASTAVENA',
      opened: 'BRÁNA OTEVŘENA', closed: 'BRÁNA ZABEZPEČENA', partial: p => `ZASTAVENA ${Math.round(p)}%`,
    },
    sub: {
      opening: 'Relé OTEVŘENO · Motor vpřed', closing: 'Relé ZAVŘENO · Motor vzad',
      stopped: 'Motor zastaven', opened: 'Odemčeno · Připraveno', closed: 'Zamčeno · Připraveno',
      partial: p => `Zastavena v půli · ${Math.round(p)}% otevřena`,
    },
    time: { justNow: 'právě teď', minsAgo: m => `před ${m} min`, hAgo: (h,m) => `před ${h}h${m>0?' '+m+'m':''}` },
    light: on => `SVĚTLO BRÁNY · ${on?'ZAP':'VYP'}`,
    motion: 'Pohyb:', person: 'Osoba:',
    control: 'OVLÁDÁNÍ ▶', back: '◀ ZPĚT',
    open: 'Otevřít', stop: 'Stop', close: 'Zavřít',
    warn_open: '⚠️ BRÁNA SE OTEVÍRÁ — POZOR', warn_close: '⚠️ BRÁNA SE ZAVÍRÁ — POZOR',
    posClose: 'ZAVŘENA', posOpen: 'OTEVŘENA', position: p => `POLOHA ${Math.round(p)}%`,
    bgLabel: 'Přechodové pozadí', bgPresets: 'Předvolba',
    colorLabel: 'Barvy', accentColor: 'Barva zvýraznění',
    btnOpenColor: 'Tlačítko Otevřít', btnStopColor: 'Tlačítko Stop', btnCloseColor: 'Tlačítko Zavřít',
    textColor: 'Barva textu', sizeLabel: 'Velikost', cardHeight: 'Výška karty (px)',
    entityLabel: 'Entity',
    entityGatePos: '📡 Senzor polohy', entityGateOpen: '🔓 Přepínač Otevření',
    entityGateClose: '🔒 Přepínač Zavření', entityGateStop: '🛑 Přepínač Stop',
    entityGateLight: '💡 Přepínač Světlo', entityGateLock: '🔐 Přepínač Zámek', entityCamera: '📷 Kamera',
    entityMotion: '🏃 Senzor pohybu', entityPerson: '👤 Senzor osoby',
    entityFlipped: '🔄 Logická hodnota překlápění',
    color1: 'Barva 1 (vlevo nahoře)', color2: 'Barva 2 (vpravo dole)',
    edLang: 'Jazyk',
    edStyle: 'Typ brány / dveří',
    edName: 'Název brány',
    edStyleSlide: '🚧 POSUVNÁ BRÁNA',
    edStyleShutter: '🏠 ROLOVACÍ BRÁNA',
    edStyleCover: '🚪 DVOUKŘÍDLÁ BRÁNA',
    edGateTitle: '🚧 Název (zobrazený na kartě)',
    edGateZone: '📍 Zóna / podnadpis',
    edPlate1: '🚗 Registrační značka (řádek 1)',
    edPlate2: '🚗 Registrační značka (řádek 2)',
    edCountry: '🌍 Země (vlajka a značka)',
    edHouseTheme: '🏠 Styl domu',
    houseThemes: { beige: 'Béžová', dark: 'Antracit', white: 'Bílá', brick: 'Cihla' },
    edCarBrand: '🚙 Značka auta (logo)',
    edCarModel: '🚙 Model (nápis vzadu)',
    edCarColor: '🎨 Barva auta',
    edSensorPos: '📡 Snímač brány',
    edHomeName: '🏠 Název My Home',
    edNoSensor: '⏱ Bez snímače polohy',
    edTravelTime: '⏱ Čas jízdy (sekundy)',
    edNoSensorHint: 'Zapnout pokud brána nemá snímač polohy. Pozice bude odhadnuta časovačem.',
    edInvertSensor: '🔄 Invertovat snímač polohy',
    edInvertSensorHint: 'Zapnout pokud snímač hlásí obrácené hodnoty (100% = zavřeno).',
    edPulseSwitch: '⚡ Impulsní spínač',
    edPulseSwitchHint: 'Zapnout pokud relé sepne jen krátce (~1-3s), ale motor projede celou dráhu.',
    edUseLock: '🔐 Použít zámek',
    edUseLockHint: 'Zapnout pro aktivaci zámku. Pokud aktivní a zámek ZAPNUT, tlačítko Otevřít bude deaktivováno.',
    lightBtn: 'SVĚTLO',
  },
  it: {
    lang: 'Italiano', flag: 'it',
    title: 'Cancello Secondario', zone: 'ZONA-B · CONTROLLO CANCELLO',
    status: {
      opening: 'CANCELLO IN APERTURA', closing: 'CANCELLO IN CHIUSURA', stopped: 'FERMATO',
      opened: 'CANCELLO APERTO', closed: 'CANCELLO CHIUSO', partial: p => `FERMATO ${Math.round(p)}%`,
    },
    sub: {
      opening: 'Relè APERTO · Motore avanti', closing: 'Relè CHIUSO · Motore indietro',
      stopped: 'Motore fermo', opened: 'Sbloccato · Pronto', closed: 'Agganciato · Pronto',
      partial: p => `Fermato a metà · ${Math.round(p)}% aperto`,
    },
    time: { justNow: 'proprio ora', minsAgo: m => `${m} min fa`, hAgo: (h,m) => `${h}h${m>0?' '+m+'m':''} fa` },
    light: on => `LUCE CANCELLO · ${on?'ACCESA':'SPENTA'}`,
    motion: 'Movimento:', person: 'Persona:',
    control: 'CONTROLLI ▶', back: '◀ INDIETRO',
    open: 'Apri', stop: 'Stop', close: 'Chiudi',
    warn_open: '⚠️ CANCELLO IN APERTURA — ATTENZIONE', warn_close: '⚠️ CANCELLO IN CHIUSURA — ATTENZIONE',
    posClose: 'CHIUSO', posOpen: 'APERTO', position: p => `POSIZIONE ${Math.round(p)}%`,
    bgLabel: 'Sfondo sfumato', bgPresets: 'Preimpostazione',
    colorLabel: 'Colori', accentColor: 'Colore accento',
    btnOpenColor: 'Pulsante Apri', btnStopColor: 'Pulsante Stop', btnCloseColor: 'Pulsante Chiudi',
    textColor: 'Colore testo', sizeLabel: 'Dimensioni', cardHeight: 'Altezza card (px)',
    entityLabel: 'Entità',
    entityGatePos: '📡 Sensore posizione', entityGateOpen: '🔓 Switch Apertura',
    entityGateClose: '🔒 Switch Chiusura', entityGateStop: '🛑 Switch Stop',
    entityGateLight: '💡 Switch Luce', entityGateLock: '🔐 Switch Serratura', entityCamera: '📷 Telecamera',
    entityMotion: '🏃 Sensore movimento', entityPerson: '👤 Sensore presenza',
    entityFlipped: '🔄 Input Boolean flip',
    color1: 'Colore 1 (in alto a sinistra)', color2: 'Colore 2 (in basso a destra)',
    edLang: 'Lingua',
    edStyle: 'Tipo di cancello',
    edName: 'Nome cancello',
    edStyleSlide: '🚧 CANCELLO SCORREVOLE',
    edStyleShutter: '🏠 PORTA AVVOLGIBILE',
    edStyleCover: '🚪 CANCELLO BATTENTE',
    edGateTitle: '🚧 Nome (mostrato sulla card)',
    edGateZone: '📍 Zona / sottotitolo',
    edPlate1: '🚗 Targa (riga 1)',
    edPlate2: '🚗 Targa (riga 2)',
    edCountry: '🌍 Paese (bandiera e targa)',
    edHouseTheme: '🏠 Stile casa',
    houseThemes: { beige: 'Beige', dark: 'Antracite', white: 'Bianco', brick: 'Mattoni' },
    edCarBrand: '🚙 Marca auto (logo)',
    edCarModel: '🚙 Modello (scritta posteriore)',
    edCarColor: '🎨 Colore auto',
    edSensorPos: '📡 Sensore cancello',
    edHomeName: '🏠 Nome My Home',
    edNoSensor: '⏱ Nessun sensore posizione',
    edTravelTime: '⏱ Tempo di corsa (secondi)',
    edNoSensorHint: 'Attiva se il cancello non ha sensore. La posizione sarà stimata tramite timer.',
    edInvertSensor: '🔄 Inverti sensore posizione',
    edInvertSensorHint: 'Attiva se il sensore riporta valori invertiti (100% = chiuso).',
    edPulseSwitch: '⚡ Interruttore a impulso',
    edPulseSwitchHint: "Attiva se il relè pulsa brevemente (~1-3s) ma il motore percorre l'intera corsa.",
    edUseLock: '🔐 Usa il blocco',
    edUseLockHint: 'Attiva per abilitare il blocco. Se attivo e blocco ON, il pulsante Apri sarà disabilitato.',
    lightBtn: 'LUCE',
  },
};

// ─── Background presets ────────────────────────────────────────────────────────
const BG_PRESETS = [
  { id: 'default', label: 'Default',  c1: '#001e2b', c2: '#12c6f3' },
  { id: 'night',   label: 'Night',    c1: '#0d0d1a', c2: '#1a0a3a' },
  { id: 'sunset',  label: 'Sunset',   c1: '#1a0a00', c2: '#ff6b35' },
  { id: 'forest',  label: 'Forest',   c1: '#0a1a0a', c2: '#1a5c1a' },
  { id: 'aurora',  label: 'Aurora',   c1: '#0a0a1a', c2: '#00cc88' },
  { id: 'desert',  label: 'Desert',   c1: '#1a0e00', c2: '#c8860a' },
  { id: 'ocean',   label: 'Ocean',    c1: '#001020', c2: '#0055aa' },
  { id: 'cherry',  label: 'Cherry',   c1: '#1a0010', c2: '#cc2255' },
  { id: 'volcano', label: 'Volcano',  c1: '#1a0500', c2: '#dd3300' },
  { id: 'galaxy',  label: 'Galaxy',   c1: '#080818', c2: '#6633cc' },
  { id: 'ice',     label: 'Ice',      c1: '#0a1828', c2: '#88ddff' },
  { id: 'olive',   label: 'Olive',    c1: '#0e1200', c2: '#7a9a00' },
  { id: 'slate',   label: 'Slate',    c1: '#101820', c2: '#445566' },
  { id: 'rose',    label: 'Rose',     c1: '#1a0808', c2: '#ee6688' },
  { id: 'teal',    label: 'Teal',     c1: '#001818', c2: '#00aa88' },
  { id: 'custom',  label: '✏ Custom', c1: null,      c2: null       },
];

function presetGradient(preset, c1, c2) {
  const p = BG_PRESETS.find(x => x.id === preset) || BG_PRESETS[0];
  const gc1 = (preset === 'custom' ? c1 : p.c1) || '#001e2b';
  const gc2 = (preset === 'custom' ? c2 : p.c2) || '#12c6f3';
  return `linear-gradient(135deg, ${gc1}bb 0%, ${gc2}44 100%)`;
}

// ─── Default config ────────────────────────────────────────────────────────────
const DEFAULT_CONFIG = {
  language: 'vi',
  gate_title: '',
  gate_zone: '',
  gate_style: 'slide',   // 'slide' = cổng trượt ngang | 'shutter' = cửa cuốn nhà xe | 'cover' = cổng 2 cánh
  background_preset: 'default',
  bg_color1: '#001e2b',
  bg_color2: '#12c6f3',
  accent_color: '#00ffcc',
  btn_open_color: '#00ff96',
  btn_stop_color: '#ff5252',
  btn_close_color: '#00dcff',
  text_color: '#ffffff',
  entity_gate_position: '',
  entity_gate_open: '',
  entity_gate_close: '',
  entity_gate_stop: '',
  entity_gate_light: '',
  entity_gate_lock: '',
  entity_camera: '',
  entity_motion: '',
  entity_person: '',
  entity_flipped: '',
  home_name: '',
  no_sensor: false,
  invert_sensor: false,
  pulse_switch: false,
  travel_time_sec: 20,
  use_lock: false,
  backdrop_blur: 12,
  country: 'vn',          // flag + licence plate band (shutter style)
  car_brand: 'toyota',    // rear logo: toyota | seat | vw | none
  car_model: 'VIOS',      // rear badge text ('' = none)
  car_trim: '',           // trim badge on the right side of the boot ('' = none), e.g. FR
  car_color: '#c8bc98',   // car body colour
  house_theme: 'beige',   // garage house look: beige | dark | white | brick
  side_door: 'right',     // pedestrian door: right | left | none
  entity_vehicle: '',          // camera extras (optional): AI vehicle detection
  entity_animal: '',           //   AI animal detection
  entity_floodlight: '',       //   camera floodlight (light)
  entity_floodlight_mode: '',  //   floodlight mode (select, shown as text)
  entity_recording: '',        //   recording on/off (switch)
};

// ─── Country flag, licence plate & car (shutter style) ───────────────────────
const COUNTRIES = {
  vn: 'Việt Nam', de: 'Deutschland', at: 'Österreich', ch: 'Schweiz', nl: 'Nederland', fr: 'France',
  it: 'Italia', pl: 'Polska', se: 'Sverige', hu: 'Magyarország', cz: 'Česko', gb: 'United Kingdom',
};
const CAR_BRANDS = { toyota: 'Toyota', seat: 'SEAT', vw: 'Volkswagen', none: '—' };

// Flag inside the box x,y,w,h
function flagSvg(c, x, y, w, h) {
  const hz = (a, b, d) => `<rect x="${x}" y="${y}" width="${w}" height="${h / 3}" fill="${a}"/><rect x="${x}" y="${y + h / 3}" width="${w}" height="${h / 3}" fill="${b}"/><rect x="${x}" y="${y + 2 * h / 3}" width="${w}" height="${h / 3}" fill="${d}"/>`;
  const vt = (a, b, d) => `<rect x="${x}" y="${y}" width="${w / 3}" height="${h}" fill="${a}"/><rect x="${x + w / 3}" y="${y}" width="${w / 3}" height="${h}" fill="${b}"/><rect x="${x + 2 * w / 3}" y="${y}" width="${w / 3}" height="${h}" fill="${d}"/>`;
  switch (c) {
    case 'de': return hz('#000000', '#dd0000', '#ffce00');
    case 'at': return hz('#ed2939', '#ffffff', '#ed2939');
    case 'nl': return hz('#ae1c28', '#ffffff', '#21468b');
    case 'hu': return hz('#ce2939', '#ffffff', '#477050');
    case 'fr': return vt('#002395', '#ffffff', '#ed2939');
    case 'it': return vt('#009246', '#ffffff', '#ce2b37');
    case 'pl': return `<rect x="${x}" y="${y}" width="${w}" height="${h / 2}" fill="#ffffff"/><rect x="${x}" y="${y + h / 2}" width="${w}" height="${h / 2}" fill="#dc143c"/>`;
    case 'cz': return `<rect x="${x}" y="${y}" width="${w}" height="${h / 2}" fill="#ffffff"/><rect x="${x}" y="${y + h / 2}" width="${w}" height="${h / 2}" fill="#d7141a"/><polygon points="${x},${y} ${x + w / 2},${y + h / 2} ${x},${y + h}" fill="#11457e"/>`;
    case 'se': return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#006aa7"/><rect x="${x + w * 5 / 16}" y="${y}" width="${w / 8}" height="${h}" fill="#fecc00"/><rect x="${x}" y="${y + h * 2 / 5}" width="${w}" height="${h / 5}" fill="#fecc00"/>`;
    case 'ch': return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#da291c"/><rect x="${x + w / 2 - 2.5}" y="${y + h / 2 - 8}" width="5" height="16" fill="#ffffff"/><rect x="${x + w / 2 - 8}" y="${y + h / 2 - 2.5}" width="16" height="5" fill="#ffffff"/>`;
    case 'gb': return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#012169"/>
      <path d="M${x},${y}L${x + w},${y + h}M${x + w},${y}L${x},${y + h}" stroke="#ffffff" stroke-width="5"/>
      <path d="M${x},${y}L${x + w},${y + h}M${x + w},${y}L${x},${y + h}" stroke="#c8102e" stroke-width="1.6"/>
      <path d="M${x + w / 2},${y}V${y + h}M${x},${y + h / 2}H${x + w}" stroke="#ffffff" stroke-width="7"/>
      <path d="M${x + w / 2},${y}V${y + h}M${x},${y + h / 2}H${x + w}" stroke="#c8102e" stroke-width="4"/>`;
    default: // vn
      return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="1.5" fill="#da251d"/><polygon points="54,101 56,106.5 62,106.5 57.5,109.5 59.2,115 54,112 48.8,115 50.5,109.5 46,106.5 52,106.5" fill="#ffff00"/>`;
  }
}

// Licence plate (rear view) incl. country band and text
function plateSvg(c, l1, l2) {
  const eu = { de: 'D', at: 'A', nl: 'NL', fr: 'F', it: 'I', pl: 'PL', se: 'S', hu: 'H', cz: 'CZ' };
  const yellow = c === 'nl' || c === 'gb';
  const bg = yellow ? '#f7d117' : '#f0f0f0';
  const border = c === 'vn' ? '#2233bb' : '#222222';
  let band = '';
  if (c === 'vn') {
    band = `<rect x="236" y="317" width="15" height="24" rx="2" fill="#cc0000"/>
    <text x="243.5" y="324" font-size="5" fill="white" font-family="Arial" font-weight="bold" text-anchor="middle">VN</text>
    <text x="243.5" y="335" font-size="8" fill="#FFD700" font-family="Arial" text-anchor="middle">★</text>`;
  } else if (eu[c]) {
    const stars = Array.from({ length: 12 }, (_, i) => `<circle cx="${(243.5 + 3.6 * Math.cos(i * Math.PI / 6)).toFixed(2)}" cy="${(323.5 + 3.6 * Math.sin(i * Math.PI / 6)).toFixed(2)}" r="0.55" fill="#FFD700"/>`).join('');
    band = `<rect x="236" y="317" width="13" height="24" rx="2" fill="#003399"/>${stars}
    <text x="242.5" y="337.5" font-size="${eu[c].length > 1 ? 5.5 : 7}" fill="white" font-family="Arial" font-weight="bold" text-anchor="middle">${eu[c]}</text>`;
  } else if (c === 'gb') {
    band = `<rect x="236" y="317" width="13" height="24" rx="2" fill="#003399"/>
    <text x="242.5" y="332" font-size="5.5" fill="white" font-family="Arial" font-weight="bold" text-anchor="middle">UK</text>`;
  }
  // text centred in the remaining plate area (no band: whole plate)
  const cx = band ? (c === 'vn' ? 279 : 278) : 271;
  const font = c === 'vn' ? 'Arial Black' : 'Arial';
  const text = (l2 ? `
    <text x="${cx}" y="328" text-anchor="middle" font-size="9.5" fill="#111" font-family="${font}" font-weight="900" letter-spacing="1">${l1}</text>
    <text x="${cx}" y="338" text-anchor="middle" font-size="9.5" fill="#111" font-family="${font}" font-weight="900" letter-spacing="0.5">${l2}</text>` : `
    <text x="${cx}" y="333" text-anchor="middle" font-size="${Math.min(10.5, (band ? 50 : 62) / (String(l1).length * 0.66)).toFixed(1)}" fill="#111" font-family="${font}" font-weight="700" letter-spacing="0.3">${l1}</text>`);
  return `<rect x="233" y="314" width="76" height="30" rx="3" fill="#181820" stroke="#777" stroke-width="0.8"/>
    <rect x="236" y="317" width="70" height="24" rx="2" fill="${bg}" stroke="${border}" stroke-width="${c === 'vn' ? 1.4 : 0.9}"/>
    ${band}${text}`;
}

// Rear logo centred on cx,cy
function carLogoSvg(brand, cx, cy) {
  const chrome = '#c8c8cc';
  switch (brand) {
    case 'none': return '';
    case 'seat': // stylised angular "S"
      return `<circle cx="${cx}" cy="${cy}" r="12" fill="#1a1a20" stroke="${chrome}" stroke-width="1"/>
      <path d="M${cx + 6.5},${cy - 6.5} L${cx - 4.5},${cy - 6.5} L${cx - 6.5},${cy - 1.2} L${cx + 6.5},${cy + 1.2} L${cx + 4.5},${cy + 6.5} L${cx - 6.5},${cy + 6.5}"
        fill="none" stroke="${chrome}" stroke-width="2.6" stroke-linejoin="miter" stroke-linecap="square"/>`;
    case 'vw':
      return `<circle cx="${cx}" cy="${cy}" r="12" fill="#1a3a70" stroke="${chrome}" stroke-width="1.6"/>
      <path d="M${cx - 5},${cy - 8} L${cx},${cy - 0.5} L${cx + 5},${cy - 8}" fill="none" stroke="${chrome}" stroke-width="1.6" stroke-linejoin="round"/>
      <path d="M${cx - 9},${cy - 3} L${cx - 4.5},${cy + 8} L${cx},${cy + 1.5} L${cx + 4.5},${cy + 8} L${cx + 9},${cy - 3}" fill="none" stroke="${chrome}" stroke-width="1.6" stroke-linejoin="round"/>`;
    default: // toyota: interlocked 3-oval design
      return `<circle cx="${cx}" cy="${cy}" r="14" fill="#1a1a20" stroke="#c0b898" stroke-width="1.5"/>
      <ellipse cx="${cx}" cy="${cy}" rx="11" ry="7.5" fill="none" stroke="#c0b898" stroke-width="1.6"/>
      <ellipse cx="${cx - 3}" cy="${cy}" rx="4.8" ry="7" fill="none" stroke="#c0b898" stroke-width="1.6"/>
      <ellipse cx="${cx + 3}" cy="${cy}" rx="4.8" ry="7" fill="none" stroke="#c0b898" stroke-width="1.6"/>
      <line x1="${cx - 11}" y1="${cy - 7}" x2="${cx + 11}" y2="${cy - 7}" stroke="#c0b898" stroke-width="1.8" stroke-linecap="round"/>`;
  }
}

// Garage house colour themes (shutter style)
const HOUSE_THEMES = {
  beige: {
    wall: '#cfc4ae', wallTop: '#d4c9b4', band: '#b8ad98', balcony: '#c8bda8', rail: '#9a9080',
    roof: ['#d0cec8', '#c2c0ba', '#d8d6d0', '#e8e4dc'], eave: '#e0ddd6', eaveLine: '#c8c4bc', gutter: '#b8b4ac', gable: '#dedad4',
    louver: ['#b8bec8', '#8a9aaa', '#ccd2da'], frame: ['#5a6068', '#4a5058', '#3a4048'],
    slat: (i) => { const l = 185 + i * 2; return `rgb(${l},${l - 8},${l - 22})`; }, slatLine: '#aea496', vent: '#8a8070',
    door: ['#cec4ae', '#d8ceb8', '#aaa090', '#3a4858', '#888078'], lamp: ['#2a3240', '#3a4250', '#1e2838', '#2e3848'],
  },
  dark: {
    wall: '#3a3f44', wallTop: '#41464b', band: '#2c3035', balcony: '#363b40', rail: '#24282c',
    roof: ['#2a2d31', '#222529', '#30343a', '#3d4248'], eave: '#353a40', eaveLine: '#25292d', gutter: '#1e2125', gable: '#33383e',
    louver: ['#2c3136', '#22262a', '#3a4046'], frame: ['#1f2327', '#181b1e', '#121416'],
    slat: (i) => { const l = 52 + i * 2; return `rgb(${l},${l + 4},${l + 9})`; }, slatLine: '#2a2e33', vent: '#1a1d20',
    door: ['#3a3f44', '#2f3439', '#24282c', '#1a2430', '#9aa3a9'], lamp: ['#1a1d21', '#30353a', '#15181b', '#2a2e33'],
    cassette: true,
  },
  white: {
    wall: '#e4e8ea', wallTop: '#eef1f3', band: '#cfd5d9', balcony: '#dde2e5', rail: '#9aa3a9',
    roof: ['#5b6168', '#4f555b', '#666c73', '#7a8087'], eave: '#eceff1', eaveLine: '#b0b8be', gutter: '#9aa3a9', gable: '#e4e8ea',
    louver: ['#c8cfd4', '#aab3ba', '#dfe4e7'], frame: ['#8a9299', '#7a828a', '#6a7178'],
    slat: (i) => { const l = 200 + i * 2; return `rgb(${l},${l + 4},${l + 7})`; }, slatLine: '#aab3ba', vent: '#8a949b',
    door: ['#dfe3e6', '#eef1f3', '#b0b8be', '#4a5866', '#8a949b'], lamp: ['#e8ecef', '#b0b8be', '#d0d6da', '#a0a8ae'],
  },
  brick: {
    brick: true, flatRoof: true, archDoor: true, noBalcony: true, cassette: true,
    wall: '#c47a3c', mortar: '#dcae7c', plinth: '#3c2a24', plinthMortar: '#5c4840',
    roof: ['#3e4348'], gutter: '#2a2d31', frame: ['#1c1e21', '#16181a', '#101113'],
    slat: () => '#202326', slatLine: '#2c3034', vent: '#15171a',
    lamp: ['#f2f2f0', '#cfcfcb', '#e6e6e2', '#bdbdb8'],
  },
};
function houseTheme(name) {
  const alias = { anthrazit: 'dark', weiss: 'white', klinker: 'brick' };
  return HOUSE_THEMES[alias[name] || name] || HOUSE_THEMES.beige;
}

// Lighten (f > 0) or darken (f < 0) a #rrggbb colour
function shadeHex(hex, f) {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex || '');
  if (!m) return hex;
  const n = parseInt(m[1], 16);
  const ch = (v) => Math.max(0, Math.min(255, Math.round(f >= 0 ? v + (255 - v) * f : v * (1 + f))));
  return '#' + [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => ch(v).toString(16).padStart(2, '0')).join('');
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function sv(hass, e) { return hass?.states?.[e]?.state || ''; }
function parsePos(hass, e) { return parseFloat(sv(hass, e) || 0); }
function timeDiff(hass, e) {
  const s = hass?.states?.[e];
  if (!s) return -1;
  return Math.floor((Date.now() - new Date(s.last_changed)) / 60000);
}
function fmtTime(diff, t) {
  if (diff < 0) return '—';
  if (diff < 1) return t.time.justNow;
  if (diff < 60) return t.time.minsAgo(diff);
  return t.time.hAgo(Math.floor(diff / 60), diff % 60);
}
function hexRgb(hex) {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return r ? `${parseInt(r[1],16)},${parseInt(r[2],16)},${parseInt(r[3],16)}` : '0,0,0';
}

// ═══════════════════════════════════════════════════════════════════════════════
//  MAIN CARD
// ═══════════════════════════════════════════════════════════════════════════════
class GateCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._config   = { ...DEFAULT_CONFIG };
    this._hass     = null;
    this._flipped  = false;
    this._built    = false;
    this._interval = null;
    // Timer-based position (for gates without position sensor)
    this._timerPos      = 0;   // 0=closed, 100=open
    this._timerDir      = 0;   // 1=opening, -1=closing, 0=idle
    this._timerInterval = null;
    this._lastOpenState  = false;
    this._lastCloseState = false;
    this._lastStopState  = false;
  }

  setConfig(config) {
    this._config = { ...DEFAULT_CONFIG, ...config };
    this._built  = false;
    this._buildDOM();
  }

  set hass(hass) {
    this._hass = hass;
    if (!this._built) {
      // First render: sync flip state from HA entity
      this._flipped = sv(hass, this._config.entity_flipped) === 'on';
      this._buildDOM();
    } else {
      // Keep local flip in sync if HA entity changes externally
      // but only if we are NOT in the middle of a local flip (debounce)
      if (!this._localFlipping) {
        const haFlipped = sv(hass, this._config.entity_flipped) === 'on';
        if (haFlipped !== this._flipped) {
          this._flipped = haFlipped;
          this._swapFace();
        }
      }
      this._patch();
    }
    // Timer-based position: detect relay state changes
    if (this._config.no_sensor) {
      const isOpen  = sv(hass, this._config.entity_gate_open)  === 'on';
      const isClose = sv(hass, this._config.entity_gate_close) === 'on';
      const isStop  = sv(hass, this._config.entity_gate_stop)  === 'on';

      if (this._config.pulse_switch) {
        // Pulse mode: only react on rising edge — relay clicks briefly then turns off
        // but motor runs full travel. Never stop timer on relay going LOW.
        const openRising  = isOpen  && !this._lastOpenState;
        const closeRising = isClose && !this._lastCloseState;
        const stopRising  = isStop  && !this._lastStopState;
        if      (openRising)  this._startTimerPos(1);
        else if (closeRising) this._startTimerPos(-1);
        else if (stopRising)  this._startTimerPos(0);
      } else {
        // Hold mode: timer follows relay state directly
        if (isOpen !== this._lastOpenState || isClose !== this._lastCloseState) {
          this._startTimerPos(isOpen ? 1 : isClose ? -1 : 0);
        }
      }
      this._lastOpenState  = isOpen;
      this._lastCloseState = isClose;
      this._lastStopState  = isStop;
    }
    this._syncCamera();
  }

  // ── Timer-based position engine ──────────────────────────────────────────────
  _startTimerPos(dir) {
    if (this._timerInterval) clearInterval(this._timerInterval);
    this._timerDir = dir;
    if (dir === 0) return;
    const travel  = Math.max(5, parseInt(this._config.travel_time_sec) || 20);
    const tickMs  = 200;
    const step    = (100 / (travel * 1000)) * tickMs;
    this._timerInterval = setInterval(() => {
      this._timerPos = Math.max(0, Math.min(100, this._timerPos + dir * step));
      if (this._timerPos >= 100 || this._timerPos <= 0) {
        clearInterval(this._timerInterval);
        this._timerInterval = null;
        this._timerDir = 0;
      }
      this._patch();
    }, tickMs);
  }

  connectedCallback()    { this._interval = setInterval(() => this._patch(), 30000); }
  disconnectedCallback() {
    clearInterval(this._interval);
    if (this._timerInterval) clearInterval(this._timerInterval);
    // Clear snapshot refresh timer
    const slot = this.shadowRoot?.getElementById('cam-slot');
    if (slot?._snapTimer) clearInterval(slot._snapTimer);
  }

  get t() { return TRANSLATIONS[this._config.language] || TRANSLATIONS.vi; }

  // ── Camera: show live snapshot via HA proxy URL, refreshed every 5s ──────────
  _syncCamera() {
    if (!this._hass || !this._config.entity_camera) return;
    const slot = this.shadowRoot.getElementById('cam-slot');
    if (!slot) return;

    // Build snapshot URL via HA camera proxy
    const entityId = this._config.entity_camera;
    const token    = this._hass?.states?.[entityId]?.attributes?.access_token;
    const snapUrl  = token
      ? `/api/camera_proxy/${entityId}?token=${token}&t=${Date.now()}`
      : `/api/camera_proxy/${entityId}&t=${Date.now()}`;

    let img = slot._snapEl;
    if (!img) {
      img = document.createElement('img');
      img.style.cssText = '';
      img.alt = '';
      slot.appendChild(img);
      slot._snapEl = img;
      // Refresh snapshot every 5 seconds
      slot._snapTimer = setInterval(() => this._refreshSnapshot(), 5000);
    }
    // Only update src if URL changed (avoid flicker)
    const newSrc = `/api/camera_proxy/${entityId}?token=${token || ''}&t=${Math.floor(Date.now()/5000)}`;
    if (img.dataset.src !== newSrc) {
      img.dataset.src = newSrc;
      const fresh = new Image();
      fresh.onload  = () => { img.src = fresh.src; };
      fresh.src = newSrc;
    }
  }

  _refreshSnapshot() {
    if (!this._hass || !this._config.entity_camera) return;
    const slot = this.shadowRoot.getElementById('cam-slot');
    if (!slot?._snapEl) return;
    const entityId = this._config.entity_camera;
    const token    = this._hass?.states?.[entityId]?.attributes?.access_token;
    const img      = slot._snapEl;
    const newSrc   = `/api/camera_proxy/${entityId}?token=${token || ''}&t=${Date.now()}`;
    const fresh    = new Image();
    fresh.onload   = () => { img.src = fresh.src; };
    fresh.src = newSrc;
  }

  // ── Full DOM build ───────────────────────────────────────────────────────────
  _buildDOM() {
    const cfg   = this._config;
    const t     = this.t;
    const bg    = presetGradient(cfg.background_preset, cfg.bg_color1, cfg.bg_color2);
    const accent= cfg.accent_color || '#00ffcc';

    this.shadowRoot.innerHTML = `
<style>
@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;700&display=swap');
:host{display:block;}*{box-sizing:border-box;}
.card{
  container-type:inline-size;container-name:gatecard;
  background:${bg};
  backdrop-filter:blur(${cfg.backdrop_blur ?? 12}px);-webkit-backdrop-filter:blur(${cfg.backdrop_blur ?? 12}px);
  border-radius:22px;border:1px solid rgba(0,255,255,0.3);
  box-shadow:0 12px 40px rgba(0,0,0,.55),inset 0 1px 0 rgba(255,255,255,.15);
  overflow:hidden;position:relative;
  min-height:290px;max-height:${cfg.gate_style === 'shutter' ? 370 : 340}px;
  display:flex;flex-direction:column;
}
.card[data-extras]{max-height:${(cfg.gate_style === 'shutter' ? 370 : 340) + 80}px;}
.card[data-cover-back]{background:transparent!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;border-color:rgba(0,255,255,0.18);}
.card[data-cover-back]::before{display:none;}
.card::before{content:"";position:absolute;inset:0;
  background:linear-gradient(135deg,rgba(0,0,0,.45) 0%,rgba(0,0,0,.05) 100%);
  z-index:1;pointer-events:none;}
.inner{position:relative;z-index:2;display:flex;flex-direction:column;flex:1;min-height:0;animation:fadeIn .35s ease;}
@keyframes fadeIn{from{opacity:0;transform:scale(.97)}to{opacity:1;transform:scale(1)}}
@keyframes arrowBlink{0%,100%{opacity:1}50%{opacity:.15}}
@keyframes pirPulse{0%,100%{opacity:1}50%{opacity:.4}}
@keyframes warnScroll{from{transform:translateX(0)}to{transform:translateX(-33.333%)}}
.front,.back{display:flex;flex-direction:column;flex:1;min-height:0;}
.row-main{display:flex;flex:1;min-height:0;overflow:hidden;}
.info-col{flex:1;display:flex;flex-direction:column;overflow:hidden;}
.cam-col{flex:0 0 55%;max-width:55%;border-left:1px solid rgba(0,255,255,.2);overflow:hidden;position:relative;background:#000;display:flex;flex-direction:column;}
.cam-col #cam-slot{flex:1;min-height:0;overflow:hidden;position:relative;display:flex;align-items:center;justify-content:center;}
.cam-col #cam-slot img{width:100%;height:100%;object-fit:contain;object-position:center;display:block;}
.cam-col ha-camera-stream,.cam-col hui-image{width:100%;height:100%;display:block;}
.cam-title{position:absolute;top:0;left:0;right:0;z-index:10;
  display:flex;align-items:center;gap:5px;padding:4px 7px;
  background:linear-gradient(180deg,rgba(0,0,0,.65) 0%,rgba(0,0,0,0) 100%);
  pointer-events:none;margin:0;}
.cam-title-dot{width:6px;height:6px;border-radius:50%;background:#ff3b30;
  box-shadow:0 0 6px #ff3b30;animation:camLive 1.5s ease-in-out infinite;flex-shrink:0;}
@keyframes camLive{0%,100%{opacity:1}50%{opacity:.3}}
.cam-title-txt{font-family:monospace;font-size:9px;letter-spacing:1.5px;
  color:rgba(255,255,255,.9);text-transform:uppercase;text-shadow:0 1px 4px rgba(0,0,0,.9);}
.sensor-row{display:flex;align-items:center;justify-content:space-between;
  padding:5px 10px;background:rgba(0,0,0,.35);border-top:1px solid rgba(0,255,255,.15);
  gap:6px;backdrop-filter:blur(4px);flex-shrink:0;white-space:nowrap;overflow:hidden;}
.sensor-item{display:flex;align-items:center;gap:3px;flex:1;min-width:0;overflow:hidden;}
.sdiv{width:1px;height:16px;background:rgba(255,255,255,.2);flex-shrink:0;}
.sensor-row.has-extras{cursor:pointer;}
.extras-arrow{flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:22px;height:18px;border-radius:9px;
  border:1px solid var(--gc-accent);background:color-mix(in srgb, var(--gc-accent) 18%, transparent);color:var(--gc-accent);
  box-shadow:0 0 6px color-mix(in srgb, var(--gc-accent) 35%, transparent);margin-left:2px;}
.extras-arrow svg{transition:transform .2s;}
.extras-arrow.open svg{transform:rotate(180deg);}
.extras{display:none;flex-direction:column;gap:6px;padding:6px 10px 8px;background:rgba(0,0,0,.35);
  border-top:1px solid rgba(0,255,255,.1);flex-shrink:0;}
.extras.open{display:flex;}
.extras-row{display:flex;gap:6px;}
.ex-chip{flex:1;min-width:0;display:flex;align-items:center;gap:5px;padding:5px 8px;border-radius:8px;
  background:rgba(0,0,0,.3);border:1px solid rgba(255,255,255,.18);font-family:monospace;font-size:10px;
  color:rgba(255,255,255,.7);white-space:nowrap;overflow:hidden;}
.ex-chip.btn{cursor:pointer;}
.ex-chip .ex-v{overflow:hidden;text-overflow:ellipsis;margin-left:auto;}
.flip-btn{display:flex;align-items:center;justify-content:center;
  background:rgba(0,0,0,.35);border-top:1px solid rgba(0,255,255,.2);
  cursor:pointer;backdrop-filter:blur(4px);flex-shrink:0;user-select:none;}
.flip-btn:active{filter:brightness(1.3);}
.light-btn{margin:0 12px 10px 18px;display:inline-flex;align-items:center;gap:7px;
  padding:5px 12px;border-radius:8px;cursor:pointer;backdrop-filter:blur(4px);flex-shrink:0;}
.svg-wrap{padding:0;flex:1;display:flex;flex-direction:column;min-height:0;overflow:hidden;}
.svg-wrap.transparent-bg{background:transparent!important;}
.back.cover-mode{background:transparent!important;}
.back.cover-mode~*,.cover-mode *{}
.status-row{display:flex;align-items:center;gap:8px;padding:5px 8px 2px;flex-shrink:0;}
.warn-scroll{overflow:hidden;white-space:nowrap;flex-shrink:0;padding:2px 8px 3px;
  font-size:10px;letter-spacing:1.5px;color:#c8861a;}
.warn-inner{display:inline-flex;width:max-content;animation:warnScroll 10s linear infinite;}
.ctrl-row{display:flex;padding:0 10px 4px;flex-shrink:0;align-items:center;}
.ctrl-btn{flex:1;border-radius:10px;backdrop-filter:blur(4px);cursor:pointer;
  display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;
  border:1px solid rgba(255,255,255,.15);background:rgba(0,0,0,.25);
  transition:opacity .4s,background .2s;padding:0;}
.ctrl-btn:active{filter:brightness(1.3);}
.ctrl-btn{min-width:0;}
.ctrl-btn > div{min-width:0;max-width:100%;}
.ctrl-btn .bl{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
/* narrow cards (phones): icon above label so all four buttons fit */
@container gatecard (max-width: 460px) {
  .ctrl-btn > div{flex-direction:column;gap:1px !important;padding:0 2px !important;}
  .ctrl-btn .bl{font-size:9.5px !important;letter-spacing:0.3px !important;}
  .f-title{font-size:15px !important;letter-spacing:0.5px !important;}
}
.prog-track{width:100%;height:5px;border-radius:3px;
  background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.15);overflow:hidden;margin-top:4px;}
.prog-fill{height:100%;border-radius:3px;box-shadow:0 0 6px rgba(0,255,200,.6);transition:width .5s linear;}
</style>
<div class="card">
  <div class="inner" id="inner">
    ${this._flipped ? this._backHTML() : this._frontHTML()}
  </div>
</div>`;

    this._bindEvents();
    this._built = true;
    // Apply transparent bg for cover back face on initial build
    const card = this.shadowRoot.querySelector('.card');
    if (card) {
      const isCoverBack = this._flipped && (this._config.gate_style === 'cover' || this._config.gate_style === 'shutter');
      card.toggleAttribute('data-cover-back', isCoverBack);
    }
    this._patch();
    // Defer camera setup so element is in DOM
    requestAnimationFrame(() => this._syncCamera());
  }

  // ── Patch — targeted DOM updates only ───────────────────────────────────────
  _patch() {
    if (!this._built || !this._hass) return;
    const sr  = this.shadowRoot;
    const st  = this._computeStatus();
    const t   = this.t;
    const cfg = this._config;

    if (!this._flipped) {
      const { frontColor, frontStatus, frontSub, pos } = st;
      const pct = Math.round(pos);

      const lightOn  = sv(this._hass, cfg.entity_gate_light) === 'on';
      const motionOn = sv(this._hass, cfg.entity_motion)     === 'on';
      const personOn = sv(this._hass, cfg.entity_person)     === 'on';
      const mTime    = fmtTime(timeDiff(this._hass, cfg.entity_motion), t);
      const pTime    = fmtTime(timeDiff(this._hass, cfg.entity_person), t);
      const mColor   = motionOn ? '#ffe066' : 'rgba(255,255,255,0.6)';
      const pColor   = personOn ? '#ff8a65' : 'rgba(255,255,255,0.6)';

      const set = (id, fn) => { const el = sr.getElementById(id); if(el) fn(el); };
      set('f-dot',    el => { el.style.background = frontColor; el.style.boxShadow = `0 0 10px ${frontColor},0 0 20px ${frontColor}55`; });
      set('f-stxt',   el => { el.textContent = frontStatus; el.style.color = frontColor; el.style.textShadow = `0 0 10px ${frontColor}`; });
      set('f-sub',    el => { el.textContent = frontSub; });
      set('f-pct',    el => { el.textContent = `${pct}%`; el.style.color = cfg.no_sensor ? 'rgba(255,70,70,0.9)' : 'rgba(255,255,255,.7)'; });
      set('f-fill',   el => { el.style.width = `${pct}%`; el.style.background = cfg.no_sensor ? `linear-gradient(90deg,#cc2222,${pct>50?'#ff4444':'#ff6666'})` : `linear-gradient(90deg,#00ccaa,${pct>50?'#00ffcc':'#00eeff'})`; el.style.boxShadow = cfg.no_sensor ? '0 0 6px rgba(255,60,60,.6)' : '0 0 6px rgba(0,255,200,.6)'; });
      set('f-lbtn',   el => { el.style.background = lightOn?'rgba(255,220,50,0.25)':'rgba(0,0,0,0.3)'; el.style.border=`1px solid ${lightOn?'rgba(255,220,50,0.7)':'rgba(255,255,255,0.25)'}`; });
      set('f-ltxt',   el => { el.textContent=t.light(lightOn); el.style.color=lightOn?'#ffd740':'rgba(255,255,255,0.7)'; el.style.textShadow=lightOn?'0 0 8px rgba(255,215,64,0.9)':'none'; });
      set('f-mt',     el => { el.textContent=mTime; el.style.color=mColor; el.style.fontWeight=motionOn?'700':'400'; });
      set('f-pt',     el => { el.textContent=pTime; el.style.color=pColor; el.style.fontWeight=personOn?'700':'400'; });
      this._updateExtras();

    } else {
      const { pos, isOpen, isClose, isStop, isMoving, isClosed, statusText, statusColor, subText } = st;
      const bOpen  = cfg.btn_open_color  || '#00ff96';
      const bStop  = cfg.btn_stop_color  || '#ff5252';
      const bClose = cfg.btn_close_color || '#00dcff';
      const set = (id, fn) => { const el = sr.getElementById(id); if(el) fn(el); };

      const lightOn = sv(this._hass, cfg.entity_gate_light) === 'on';
      const lockOn  = sv(this._hass, cfg.entity_gate_lock)  === 'on';

      const svgEl = sr.getElementById('b-svg');
      if (svgEl) {
        const isShutter = (cfg.gate_style || 'slide') === 'shutter';
        const isCover   = (cfg.gate_style || 'slide') === 'cover';
        svgEl.innerHTML = isShutter
          ? this._svgShutter(pos, isOpen, isClose, isStop, isClosed, isMoving, lightOn, lockOn)
          : isCover
          ? this._svgCover(pos, isOpen, isClose, isStop, isClosed, isMoving, lightOn, lockOn)
          : this._svgInner(pos, isOpen, isClose, isStop, isClosed, isMoving, lightOn);
      }

      set('b-dot',  el => { el.style.background = statusColor; el.style.boxShadow = `0 0 8px ${statusColor}`; });
      set('b-stat', el => { el.textContent = statusText; el.style.color = statusColor; el.style.textShadow = `0 0 10px ${statusColor}99`; });
      set('b-sub',  el => { el.textContent = subText; });
      set('b-pct',  el => { el.textContent = `${Math.round(pos)}%`; });
      set('b-wo',   el => { el.style.display = isOpen  ? '' : 'none'; });
      set('b-wc',   el => { el.style.display = isClose ? '' : 'none'; });

      // Light button state
      set('b-bl', el => {
        el.style.background  = lightOn ? 'rgba(255,220,50,0.22)' : 'rgba(0,0,0,0.25)';
        el.style.borderColor = lightOn ? 'rgba(255,220,50,0.75)' : 'rgba(255,255,255,0.15)';
      });
      set('b-bl-ico', el => { el.style.color = lightOn ? '#ffd740' : 'rgba(255,220,50,0.55)'; });

      const applyBtn = (id, active, color, disabled) => {
        set(id, el => {
          el.style.opacity       = disabled ? '0.3' : '1';
          el.style.pointerEvents = disabled ? 'none' : 'auto';
          el.style.background    = active ? `rgba(${hexRgb(color)},0.2)` : 'rgba(0,0,0,0.25)';
          el.style.borderColor   = active ? color : 'rgba(255,255,255,0.15)';
          const ico = el.querySelector('ha-icon'); if(ico) ico.style.color = active ? color : `${color}b3`;
          const lbl = el.querySelector('.bl');     if(lbl) lbl.style.color = active ? color : 'rgba(255,255,255,0.85)';
        });
      };
      const lockBlocked = cfg.use_lock && lockOn;

      applyBtn('b-bo', isOpen,  bOpen,  pos >= 99 || lockBlocked);
      applyBtn('b-bs', isStop,  bStop,  false);
      applyBtn('b-bc', isClose, bClose, pos <= 1);
    }
  }

  // ── Compute gate status ──────────────────────────────────────────────────────
  _computeStatus() {
    const hass  = this._hass;
    const cfg   = this._config;
    const t     = this.t;
    // Use timer-based position if no_sensor is enabled, otherwise read sensor
    const rawPos = cfg.no_sensor ? this._timerPos : parsePos(hass, cfg.entity_gate_position);
    const pos    = cfg.invert_sensor && !cfg.no_sensor ? 100 - rawPos : rawPos;
    const isOpen  = sv(hass, cfg.entity_gate_open)  === 'on';
    const isClose = sv(hass, cfg.entity_gate_close) === 'on';
    const isStop  = sv(hass, cfg.entity_gate_stop)  === 'on';
    const isMoving  = isOpen || isClose;
    const isOpened  = !isMoving && !isStop && pos >= 99;
    const isClosed  = !isMoving && !isStop && pos <= 1;
    const isPartial = !isMoving && !isStop && pos > 1 && pos < 99;

    let statusText, statusColor, subText;
    if (isOpen)        { statusText=t.status.opening; statusColor='#22cc77'; subText=t.sub.opening; }
    else if (isClose)  { statusText=t.status.closing; statusColor='#2288ee'; subText=t.sub.closing; }
    else if (isStop)   { statusText=t.status.stopped; statusColor='#ee4444'; subText=t.sub.stopped; }
    else if (isOpened) { statusText=t.status.opened;  statusColor='#00ffcc'; subText=t.sub.opened; }
    else if (isPartial){ statusText=t.status.partial(pos); statusColor='#ffaa00'; subText=t.sub.partial(pos); }
    else               { statusText=t.status.closed;  statusColor='#00ccaa'; subText=t.sub.closed; }

    let frontStatus, frontColor;
    if (isOpen)        { frontStatus=t.status.opening; frontColor='#00ffcc'; }
    else if (isClose)  { frontStatus=t.status.closing; frontColor='#00eeff'; }
    else if (isStop)   { frontStatus=t.status.stopped; frontColor='#ff6b6b'; }
    else if (pos >= 99){ frontStatus=t.status.opened;  frontColor='#00ffcc'; }
    else if (pos <= 1) { frontStatus=t.status.closed;  frontColor='#00ffcc'; }
    else               { frontStatus=t.status.partial(pos); frontColor='#ffaa00'; }

    let frontSub = '';
    if (isOpen)       frontSub = fmtTime(timeDiff(hass, cfg.entity_gate_open), t);
    else if (isClose) frontSub = fmtTime(timeDiff(hass, cfg.entity_gate_close), t);
    else if (isStop)  frontSub = fmtTime(timeDiff(hass, cfg.entity_gate_stop), t);
    else {
      const t1 = hass?.states?.[cfg.entity_gate_close]?.last_changed;
      const t2 = hass?.states?.[cfg.entity_gate_open]?.last_changed;
      const useClose = t1 && t2 ? new Date(t1) > new Date(t2) : !!t1;
      frontSub = fmtTime(timeDiff(hass, useClose ? cfg.entity_gate_close : cfg.entity_gate_open), t);
    }

    return { pos, isOpen, isClose, isStop, isMoving, isOpened, isClosed, isPartial,
             statusText, statusColor, subText, frontStatus, frontColor, frontSub };
  }

  _toggle(entityId) {
    if (!entityId || !this._hass) return;
    this._hass.callService('homeassistant', 'toggle', { entity_id: entityId });
  }

  // ── Front HTML ───────────────────────────────────────────────────────────────
  _frontHTML() {
    const cfg    = this._config;
    const t      = this.t;
    const accent = cfg.accent_color || '#00ffcc';
    const tc     = cfg.text_color   || '#ffffff';
    const btnH   = 36;

    // Camera: placeholder div — real element injected via _syncCamera()
    const cameraHTML = cfg.entity_camera
      ? `<div id="cam-slot"></div>`
      : `<div style="display:flex;align-items:center;justify-content:center;height:100%;opacity:.25;">
           <ha-icon icon="mdi:cctv-off" style="--mdi-icon-size:40px;color:#fff;"></ha-icon>
         </div>`;

    return `
<div class="front">
  <div class="row-main">
    <div class="info-col">
      <div style="padding:5px 8px 6px 10px;flex:1;display:flex;flex-direction:column;justify-content:center;overflow:hidden;">
        <div style="display:flex;align-items:center;gap:4px;margin-bottom:7px;">
          <div style="font-size:22px;line-height:1;filter:drop-shadow(0 0 10px rgba(0,0,0,.8));flex-shrink:0;">🚧</div>
          <div style="min-width:0;overflow:hidden;">
            <div class="f-title" style="font-family:Rajdhani,sans-serif;font-size:18px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:${tc};line-height:1;text-shadow:0 2px 8px rgba(0,0,0,.8);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${cfg.gate_title || t.title}</div>
            <div style="font-family:monospace;font-size:9px;letter-spacing:0.8px;color:rgba(255,255,255,.85);margin-top:3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${cfg.gate_zone || t.zone}</div>
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:6px;margin-top:2px;">
          <div id="f-dot" style="width:8px;height:8px;border-radius:50%;flex-shrink:0;background:#00ffcc;box-shadow:0 0 10px #00ffcc;"></div>
          <span id="f-stxt" style="font-family:monospace;font-size:10px;letter-spacing:1px;font-weight:700;color:#00ffcc;text-shadow:0 0 10px #00ffcc;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;"></span>
        </div>
        <div id="f-sub" style="font-family:monospace;font-size:9px;color:rgba(255,255,255,.55);margin-top:4px;letter-spacing:0.8px;"></div>
        <div style="margin-top:8px;">
          <div style="display:flex;justify-content:space-between;font-family:monospace;font-size:8px;color:rgba(255,255,255,.4);margin-bottom:3px;letter-spacing:0.8px;">
            <span>${t.posClose}</span>
            <span id="f-pct" style="color:rgba(255,255,255,.7);font-weight:700;">0%</span>
            <span>${t.posOpen}</span>
          </div>
          <div class="prog-track"><div id="f-fill" class="prog-fill" style="width:0%;background:linear-gradient(90deg,#00ccaa,#00eeff);"></div></div>
        </div>
      </div>
      <div id="f-lbtn" class="light-btn" style="background:rgba(0,0,0,.3);border:1px solid rgba(255,255,255,.25);margin:0 8px 8px 10px;padding:4px 8px;" data-action="toggle-light">
        <span style="font-size:13px;">🔦</span>
        <span id="f-ltxt" style="font-family:monospace;font-size:9px;letter-spacing:1px;color:rgba(255,255,255,.7);font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${t.light(false)}</span>
      </div>
    </div>
    <div class="cam-col" ${cfg.entity_camera ? 'data-action="open-camera" style="cursor:pointer;"' : ''}>
      ${cfg.entity_camera ? `
      <div class="cam-title">
        <div class="cam-title-dot"></div>
        <span class="cam-title-txt">${cfg.gate_title ? cfg.gate_title.substring(0,14) : 'CAMERA'} · LIVE</span>
      </div>` : ''}
      ${cameraHTML}
    </div>
  </div>
  <div class="sensor-row ${this._hasExtras() ? 'has-extras' : ''}" ${this._hasExtras() ? 'data-action="toggle-extras"' : ''}>
    <div class="sensor-item">
      <span style="font-size:12px;flex-shrink:0;">👁️</span>
      <span style="font-family:monospace;font-size:10px;letter-spacing:.5px;color:rgba(255,255,255,.6);white-space:nowrap;">${t.motion}</span>
      <span id="f-mt" style="font-family:monospace;font-size:10px;letter-spacing:.5px;color:rgba(255,255,255,.6);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">—</span>
    </div>
    <div class="sdiv"></div>
    <div class="sensor-item" style="justify-content:flex-end;">
      <span style="font-size:12px;flex-shrink:0;">🏃</span>
      <span style="font-family:monospace;font-size:10px;letter-spacing:.5px;color:rgba(255,255,255,.6);white-space:nowrap;">${t.person}</span>
      <span id="f-pt" style="font-family:monospace;font-size:10px;letter-spacing:.5px;color:rgba(255,255,255,.6);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">—</span>
    </div>
    ${this._hasExtras() ? `<span class="extras-arrow ${this._extrasOpen ? 'open' : ''}" id="f-xarrow" style="--gc-accent:${cfg.accent_color || '#00ffcc'}"><svg viewBox="0 0 10 6" width="10" height="6"><path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></span>` : ''}
  </div>
  ${this._hasExtras() ? this._extrasHTML() : ''}
  <div class="flip-btn" style="height:${btnH}px;" data-action="flip">
    <span style="font-family:monospace;font-size:11px;letter-spacing:4px;color:${accent};text-transform:uppercase;text-shadow:0 0 10px ${accent}99;">${t.control}</span>
  </div>
</div>`;
  }

  // ── Camera extras drawer (front face) ──────────────────────────────────────
  _hasExtras() {
    const c = this._config;
    return !!(c.entity_vehicle || c.entity_animal || c.entity_floodlight || c.entity_recording);
  }

  _extrasHTML() {
    const c = this._config;
    const t = this.t;
    const chip = (id, icon, label, action) => `<div class="ex-chip ${action ? 'btn' : ''}" id="${id}" ${action ? `data-action="${action}"` : ''}>
      <span style="font-size:12px;">${icon}</span><span>${label}</span><span class="ex-v" id="${id}-v">—</span></div>`;
    const row1 = [c.entity_vehicle && chip('x-veh', '🚗', t.vehicle || 'Vehicle'), c.entity_animal && chip('x-ani', '🐾', t.animal || 'Animal')].filter(Boolean);
    const row2 = [c.entity_floodlight && chip('x-flo', '🔦', t.floodlight || 'Floodlight', 'toggle-floodlight'),
                  c.entity_recording && chip('x-rec', '⏺', t.recording || 'Recording', 'toggle-recording')].filter(Boolean);
    return `<div class="extras ${this._extrasOpen ? 'open' : ''}" id="f-extras">
      ${row1.length ? `<div class="extras-row">${row1.join('')}</div>` : ''}
      ${row2.length ? `<div class="extras-row">${row2.join('')}</div>` : ''}
    </div>`;
  }

  _updateExtras() {
    if (!this._hasExtras()) return;
    const sr = this.shadowRoot, c = this._config, t = this.t, h = this._hass;
    const set = (id, fn) => { const el = sr.getElementById(id); if (el) fn(el); };
    const detect = (id, ent, color) => set(id, (el) => {
      const on = sv(h, ent) === 'on';
      el.style.borderColor = on ? color : 'rgba(255,255,255,.18)';
      el.style.color = on ? color : 'rgba(255,255,255,.7)';
      set(id + '-v', (v) => { v.textContent = on ? (t.now || 'now') : fmtTime(timeDiff(h, ent), t); v.style.fontWeight = on ? '700' : '400'; });
    });
    if (c.entity_vehicle) detect('x-veh', c.entity_vehicle, '#4fc3f7');
    if (c.entity_animal) detect('x-ani', c.entity_animal, '#a5d6a7');
    if (c.entity_floodlight) set('x-flo', (el) => {
      const on = sv(h, c.entity_floodlight) === 'on';
      const mode = c.entity_floodlight_mode ? sv(h, c.entity_floodlight_mode) : '';
      el.style.borderColor = on ? 'rgba(255,220,50,.7)' : 'rgba(255,255,255,.18)';
      el.style.background = on ? 'rgba(255,220,50,.2)' : 'rgba(0,0,0,.3)';
      const m = mode ? ((t.floodModes || {})[mode] || mode) : '';
      set('x-flo-v', (v) => { v.textContent = `${on ? (t.on || 'ON') : (t.off || 'OFF')}${m ? ' · ' + m : ''}`; v.style.color = on ? '#ffd740' : 'rgba(255,255,255,.6)'; });
    });
    if (c.entity_recording) set('x-rec', (el) => {
      const on = sv(h, c.entity_recording) === 'on';
      el.style.borderColor = on ? 'rgba(255,82,82,.7)' : 'rgba(255,255,255,.18)';
      set('x-rec-v', (v) => { v.textContent = on ? (t.recOn || 'Recording') : (t.recOff || 'Paused'); v.style.color = on ? '#ff6e6e' : 'rgba(255,255,255,.6)'; });
    });
  }

  // ── Back HTML ────────────────────────────────────────────────────────────────
  _backHTML() {
    const cfg   = this._config;
    const t     = this.t;
    const bOpen = cfg.btn_open_color  || '#00ff96';
    const bStop = cfg.btn_stop_color  || '#ff5252';
    const bClose= cfg.btn_close_color || '#00dcff';
    const isShutter = (cfg.gate_style || 'slide') === 'shutter';
    const isCover   = (cfg.gate_style || 'slide') === 'cover';
    const openIcon  = isShutter ? 'mdi:arrow-up-bold'   : isCover ? 'mdi:gate-open' : 'mdi:arrow-expand-left';
    const closeIcon = isShutter ? 'mdi:arrow-down-bold' : isCover ? 'mdi:gate'      : 'mdi:arrow-expand-right';

    const initLight = this._hass ? sv(this._hass, this._config.entity_gate_light) === 'on' : false;
    const initLock  = this._hass ? sv(this._hass, this._config.entity_gate_lock)  === 'on' : false;
    const timerBadge = cfg.no_sensor ? `<span style="font-family:monospace;font-size:8px;color:rgba(255,60,60,0.9);letter-spacing:0.5px;background:rgba(255,40,40,0.12);border:1px solid rgba(255,60,60,0.4);border-radius:4px;padding:1px 5px;">⏱ TIMER</span>` : '';
    const svgViewBox = isShutter ? '0 0 660 390' : isCover ? '0 0 560 310' : '0 0 560 175';
    return `
<div class="back">
  <div class="svg-wrap">
    <svg id="b-svg" viewBox="${svgViewBox}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" style="display:block;width:100%;height:100%;flex:1;min-height:0;">
      ${isShutter ? this._svgShutter(0, false, false, false, true, false, initLight, initLock)
       : isCover  ? this._svgCover(0, false, false, false, true, false, initLight, initLock)
                  : this._svgInner(0, false, false, false, true, false, initLight)}
    </svg>
    <div class="status-row">
      <div id="b-dot" style="width:9px;height:9px;border-radius:50%;background:#00ccaa;box-shadow:0 0 8px #00ccaa;flex-shrink:0;"></div>
      <span id="b-stat" style="font-size:12px;font-weight:700;letter-spacing:2px;color:#00ccaa;text-transform:uppercase;text-shadow:0 0 10px #00ccaa99;"></span>
      <span id="b-sub" style="font-size:10px;color:rgba(255,255,255,.55);letter-spacing:1px;margin-left:4px;"></span>
      <span style="margin-left:auto;display:flex;align-items:center;gap:5px;flex-shrink:0;">
        ${timerBadge}
        <span style="font-family:monospace;font-size:9px;color:rgba(255,255,255,0.35);letter-spacing:0.5px;">${cfg.no_sensor ? '⏱' : t.edSensorPos}</span>
        <span id="b-pct" style="font-family:monospace;font-size:10px;color:${cfg.no_sensor ? 'rgba(255,70,70,0.9)' : 'rgba(56,189,248,0.85)'};letter-spacing:1px;font-weight:700;"></span>
      </span>
    </div>
  </div>
  <div id="b-wo" class="warn-scroll" style="display:none;"><span class="warn-inner"><span style="padding-right:60px;">${t.warn_open}</span><span style="padding-right:60px;">${t.warn_open}</span><span style="padding-right:60px;">${t.warn_open}</span></span></div>
  <div id="b-wc" class="warn-scroll" style="display:none;"><span class="warn-inner"><span style="padding-right:60px;">${t.warn_close}</span><span style="padding-right:60px;">${t.warn_close}</span><span style="padding-right:60px;">${t.warn_close}</span></span></div>
  <div class="ctrl-row" style="flex:1;">
    <button id="b-bo" class="ctrl-btn" style="margin:4px 3px 4px 0;height:40px;" data-action="open-gate">
      <div style="display:flex;align-items:center;gap:5px;padding:0 8px;">
        <ha-icon icon="${openIcon}" style="color:${bOpen}b3;--mdi-icon-size:16px;flex-shrink:0;"></ha-icon>
        <span class="bl" style="font-family:monospace;font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:rgba(255,255,255,.85);">${t.open}</span>
      </div>
    </button>
    <button id="b-bs" class="ctrl-btn" style="margin:4px 3px;height:40px;" data-action="stop-gate">
      <div style="display:flex;align-items:center;gap:5px;padding:0 8px;">
        <ha-icon icon="mdi:stop" style="color:${bStop}b3;--mdi-icon-size:16px;flex-shrink:0;"></ha-icon>
        <span class="bl" style="font-family:monospace;font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:rgba(255,255,255,.85);">${t.stop}</span>
      </div>
    </button>
    <button id="b-bc" class="ctrl-btn" style="margin:4px 3px;height:40px;" data-action="close-gate">
      <div style="display:flex;align-items:center;gap:5px;padding:0 8px;">
        <ha-icon icon="${closeIcon}" style="color:${bClose}b3;--mdi-icon-size:16px;flex-shrink:0;"></ha-icon>
        <span class="bl" style="font-family:monospace;font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:rgba(255,255,255,.85);">${t.close}</span>
      </div>
    </button>
    <button id="b-bl" class="ctrl-btn" style="margin:4px 0 4px 3px;height:40px;" data-action="toggle-light">
      <div style="display:flex;align-items:center;gap:5px;padding:0 8px;">
        <ha-icon icon="mdi:lightbulb" id="b-bl-ico" style="color:rgba(255,220,50,0.7);--mdi-icon-size:16px;flex-shrink:0;"></ha-icon>
        <span class="bl" style="font-family:monospace;font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:rgba(255,255,255,.85);">${t.lightBtn}</span>
      </div>
    </button>
  </div>
  <div class="flip-btn" style="height:34px;border-top:1px solid rgba(0,255,255,.15);" data-action="flip">
    <span style="font-family:monospace;font-size:11px;letter-spacing:3px;color:rgba(255,255,255,.75);text-transform:uppercase;text-shadow:0 0 8px rgba(0,255,255,.4);">${t.back}</span>
  </div>
</div>`;
  }

  // ── SVG inner ────────────────────────────────────────────────────────────────
  _svgInner(pos, isOpening, isClosing, isStopped, isClosed, isMoving, lightOn = false) {
    const gateX     = (pos / 100) * -316;
    const barFill   = pos > 50 ? 'url(#ibh)' : 'url(#ib)';
    const spFill    = pos > 50 ? '#2a5a2e' : '#2e5a70';
    const pirFill   = isMoving ? '#00aa44' : '#0a1a0a';
    const pirStroke = isMoving ? '#00aa44' : '#1a3a1a';
    const isMovAnim = isMoving ? 'animation:pirPulse .8s ease-in-out infinite;' : '';
    const t = this.t;

    const bars = [130,152,174,196,218,240,262,284,306,328,350,372,394,416];
    const spks = [135,157,179,201,223,245,267,289,311,333,355,377,399,421];
    const bSvg = bars.map(x=>`<rect x="${x}" y="32" width="11" height="96" rx="3" fill="${barFill}" stroke="#3a6070" stroke-width=".5"/>`).join('');
    const sSvg = spks.map(x=>`<polygon points="${x},32 ${x+3},22 ${x+6},32" fill="${spFill}"/>`).join('');

    const lockSvg = isClosed ? `
<circle cx="122" cy="76" r="5" fill="#0e2030" stroke="#00ccaa" stroke-width="1.2"/>
<rect x="119" y="75" width="6" height="5" rx="1" fill="#00ccaa"/>
<path d="M119.5 75 Q119.5 71 122 71 Q124.5 71 124.5 75" fill="none" stroke="#00ccaa" stroke-width="1.2" stroke-linecap="round"/>` : '';

    const motorDot = isMoving ? '' : `<circle cx="460" cy="49" r="4" fill="${isMoving?'#ff8c00':'#1a1a0a'}" stroke="${isMoving?'#ffaa44':'#2a2a1a'}" stroke-width=".8"/>`;
    const arrowO = isOpening ? `<g style="animation:arrowBlink .5s ease-in-out infinite"><polygon points="450,49 457,43 457,46.5 470,46.5 470,51.5 457,51.5 457,55" fill="#ff8c00"/></g>` : '';
    const arrowC = isClosing ? `<g style="animation:arrowBlink .5s ease-in-out infinite"><polygon points="470,49 463,43 463,46.5 450,46.5 450,51.5 463,51.5 463,55" fill="#ff8c00"/></g>` : '';

    return `
<defs>
  <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#0a1628"/><stop offset="100%" stop-color="#0d1f3a"/></linearGradient>
  <linearGradient id="ib" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#1a2d3a"/><stop offset="50%" stop-color="#2e4d60"/><stop offset="100%" stop-color="#1a2d3a"/></linearGradient>
  <linearGradient id="ibh" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#1e3a20"/><stop offset="50%" stop-color="#2a5a2e"/><stop offset="100%" stop-color="#1e3a20"/></linearGradient>
  <linearGradient id="plL" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#1a2a3a"/><stop offset="40%" stop-color="#2d4a5a"/><stop offset="100%" stop-color="#162030"/></linearGradient>
  <linearGradient id="plR" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#162030"/><stop offset="60%" stop-color="#2d4a5a"/><stop offset="100%" stop-color="#1a2a3a"/></linearGradient>
  <linearGradient id="gnd" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#182a1a"/><stop offset="100%" stop-color="#0e1a0f"/></linearGradient>
  <linearGradient id="mb" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#111e2e"/><stop offset="50%" stop-color="#1a2e42"/><stop offset="100%" stop-color="#111e2e"/></linearGradient>
  <clipPath id="gc"><rect x="80" y="15" width="400" height="130"/></clipPath>
</defs>
<rect x="0" y="0" width="560" height="175" fill="url(#sky)"/>
<rect x="0" y="148" width="560" height="27" fill="url(#gnd)"/>
<line x1="0" y1="148" x2="560" y2="148" stroke="#1e3a1e" stroke-width="1"/>
<ellipse cx="110" cy="152" rx="60" ry="4" fill="rgba(0,0,0,.35)"/>
<ellipse cx="450" cy="152" rx="60" ry="4" fill="rgba(0,0,0,.35)"/>
<rect x="80" y="10" width="42" height="142" rx="5" fill="url(#plL)" stroke="#2a4a6a" stroke-width=".8"/>
<rect x="80" y="10" width="42" height="10" rx="3" fill="#2e5a7a" stroke="#3a7a9a" stroke-width=".5"/>
<rect x="80" y="142" width="42" height="10" rx="3" fill="#1e3a4a" stroke="#2a5a7a" stroke-width=".5"/>
<rect x="85" y="24" width="32" height="112" rx="2" fill="rgba(0,0,0,.2)" stroke="#1e3a5a" stroke-width=".5"/>
<circle cx="101" cy="90" r="4" fill="${pirFill}" stroke="${pirStroke}" stroke-width=".8" style="${isMovAnim}"/>
<text x="101" y="106" text-anchor="middle" font-size="7" fill="#2a4a6a" font-family="monospace" letter-spacing=".5">PIR</text>
<rect x="438" y="10" width="42" height="142" rx="5" fill="url(#plR)" stroke="#2a4a6a" stroke-width=".8"/>
<rect x="438" y="10" width="42" height="10" rx="3" fill="#2e5a7a" stroke="#3a7a9a" stroke-width=".5"/>
<rect x="438" y="142" width="42" height="10" rx="3" fill="#1e3a4a" stroke="#2a5a7a" stroke-width=".5"/>
<rect x="443" y="38" width="34" height="22" rx="4" fill="#0a1218" stroke="#1e3050" stroke-width=".8"/>
${motorDot}${arrowO}${arrowC}
<rect x="442" y="112" width="36" height="22" rx="3" fill="url(#mb)" stroke="#1e3a5a" stroke-width=".7"/>
<rect x="446" y="116" width="28" height="14" rx="2" fill="#060e1a"/>
<text x="460" y="125" text-anchor="middle" font-size="7" fill="#1e4a6a" font-family="monospace" letter-spacing=".5">MOTOR</text>
<line x1="480" y1="138" x2="122" y2="138" stroke="#1a2e40" stroke-width="2" stroke-dasharray="4,3"/>
<g clip-path="url(#gc)">
  <g style="transform:translateX(${gateX}px);transition:transform 1.2s linear;will-change:transform;">
    <rect x="122" y="20" width="316" height="10" rx="3" fill="url(#ib)" stroke="#3a6a7a" stroke-width=".7"/>
    <rect x="122" y="76" width="316" height="8" rx="2" fill="url(#ib)" stroke="#2a5060" stroke-width=".6"/>
    <rect x="122" y="130" width="316" height="10" rx="3" fill="url(#ib)" stroke="#3a6a7a" stroke-width=".7"/>
    ${bSvg}${sSvg}${lockSvg}
  </g>
</g>
<rect x="80" y="143" width="42" height="5" rx="1" fill="#0e1e0e"/>
<rect x="438" y="143" width="42" height="5" rx="1" fill="#0e1e0e"/>
<!-- Gate post lamps -->
<circle cx="101" cy="18" r="4" fill="${lightOn?'#ffe880':'#1a1a0a'}" stroke="${lightOn?'#ffcc44':'#2a2a1a'}" stroke-width="1"/>
${lightOn?`<circle cx="101" cy="18" r="18" fill="rgba(255,220,80,0.18)"/><circle cx="101" cy="18" r="10" fill="rgba(255,220,80,0.25)"/>`:''}
<circle cx="459" cy="18" r="4" fill="${lightOn?'#ffe880':'#1a1a0a'}" stroke="${lightOn?'#ffcc44':'#2a2a1a'}" stroke-width="1"/>
${lightOn?`<circle cx="459" cy="18" r="18" fill="rgba(255,220,80,0.18)"/><circle cx="459" cy="18" r="10" fill="rgba(255,220,80,0.25)"/>`:''}
<text x="280" y="168" text-anchor="middle" font-size="9" fill="rgba(255,255,255,.35)" font-family="monospace" letter-spacing="1">${t.position(pos)}</text>`;
  }

  // ── SVG Shutter (cửa cuốn nhà xe) ───────────────────────────────────────────
  _svgShutter(pos, isOpening, isClosing, isStopped, isClosed, isMoving, lightOn = false, lockOn = false) {
    const t = this.t;
    const isOpened  = !isMoving && !isStopped && pos >= 99;
    const isPartial = !isMoving && !isStopped && pos > 1 && pos < 99;

    const statusText  = isOpening ? t.status.opening
                      : isClosing ? t.status.closing
                      : isStopped ? t.status.stopped
                      : isOpened  ? t.status.opened
                      : isPartial ? t.status.partial(pos)
                      : t.status.closed;
    const statusColor = isOpening ? '#22dd88'
                      : isClosing ? '#33aaff'
                      : isStopped ? '#ff5555'
                      : isOpened  ? '#00ffcc'
                      : isPartial ? '#ffaa00'
                      : '#00ccaa';
    const subText     = isOpening ? (t.sub.opening || 'Motor tiến · Cuộn lên')
                      : isClosing ? (t.sub.closing || 'Motor lùi · Cuộn xuống')
                      : isStopped ? t.sub.stopped
                      : isOpened  ? t.sub.opened
                      : isPartial ? t.sub.partial(pos)
                      : t.sub.closed;

    // Shutter geometry
    const SLAT_COUNT  = 11;
    const SLAT_H      = 11;
    const SLAT_PITCH  = 12;
    const OPENING_TOP = 230;
    const OPENING_H   = 128;
    const OPENING_L   = 115;
    const OPENING_W   = 312;
    const DOOR_BOTTOM = 372;
    const scrolled    = (pos / 100) * (OPENING_H + 22);
    const doorBottomY = DOOR_BOTTOM - scrolled;
    const visibleTop  = Math.max(OPENING_TOP, doorBottomY);
    const visibleH    = Math.max(0, DOOR_BOTTOM - visibleTop);

    const th = houseTheme(this._config.house_theme);
    let slatsSvg = '';
    for (let i = 0; i < SLAT_COUNT; i++) {
      const baseY = OPENING_TOP + OPENING_H - SLAT_H - (i * SLAT_PITCH);
      const y     = baseY - scrolled;
      const fill  = th.slat(i);
      slatsSvg += `<rect x="${OPENING_L}" y="${y}" width="${OPENING_W}" height="${SLAT_H}" rx="1" fill="${fill}" stroke="${th.slatLine}" stroke-width="0.5"/>`;
      // sectional door look: recessed cassettes
      if (th.cassette) {
        for (let v = 0; v < 6; v++) slatsSvg += `<rect x="${OPENING_L + 6 + v * 51}" y="${y + 1.5}" width="46" height="${SLAT_H - 3}" rx="0.8" fill="rgba(0,0,0,0.18)" stroke="rgba(255,255,255,0.05)" stroke-width="0.5"/>`;
      }
      slatsSvg += `<rect x="${OPENING_L + 4}" y="${y + 1}" width="${OPENING_W - 8}" height="3" rx="1" fill="rgba(255,255,255,0.2)"/>`;
      slatsSvg += `<rect x="${OPENING_L + 4}" y="${y + SLAT_H - 3}" width="${OPENING_W - 8}" height="2" rx="1" fill="rgba(0,0,0,0.1)"/>`;
      if (i >= SLAT_COUNT - 3) {
        for (let v = 0; v < 5; v++) {
          if (!th.cassette) slatsSvg += `<rect x="${OPENING_L + 16 + v * 58}" y="${y + 2.5}" width="40" height="6" rx="1" fill="rgba(0,0,0,0.32)" stroke="${th.vent}" stroke-width="0.4"/>`;
        }
      }
      if (i === 0) {
        const lkOp = pos <= 1 ? '1' : '0';
        slatsSvg += `<rect x="${OPENING_L + OPENING_W / 2 - 30}" y="${y}" width="60" height="${SLAT_H}" rx="3" fill="rgba(0,200,120,0.28)" stroke="rgba(0,220,140,0.65)" stroke-width="1" opacity="${lkOp}"/>`;
      }
    }

    const glowOp    = lightOn ? '0.9' : '0';
    const bulbFill  = lightOn ? '#ffe880' : '#1a1208';
    const glassFill = lightOn ? '#fff4aa' : '#0d1520';

    const motorDot  = isMoving ? '' : `<circle cx="403" cy="221" r="4.5" fill="#1a0a0a" stroke="#2a1818" stroke-width="0.7"/>`;
    const arrowUp   = isOpening ? `<g style="animation:shutterBlink 0.55s ease-in-out infinite"><polygon points="368,224 376,214 384,224 381,224 381,228 371,228 371,224" fill="#22dd88"/></g>` : '';
    const arrowDown = isClosing ? `<g style="animation:shutterBlink 0.55s ease-in-out infinite"><polygon points="368,216 376,226 384,216 381,216 381,213 371,213 371,216" fill="#33aaff"/></g>` : '';

    return `
<defs>
  <clipPath id="haDoorOpenClip"><rect x="113" y="${visibleTop}" width="316" height="${visibleH}"/></clipPath>
  <clipPath id="haDoorClip"><rect x="105" y="230" width="330" height="152"/></clipPath>
  ${th.louver ? `<pattern id="haLouverPat" x="0" y="0" width="28" height="11" patternUnits="userSpaceOnUse">
    <rect x="0" y="0" width="28" height="11" fill="${th.louver[0]}"/>
    <rect x="0" y="2" width="28" height="6" rx="1" fill="${th.louver[1]}" stroke="rgba(0,0,0,0.15)" stroke-width="0.5"/>
    <rect x="0" y="0" width="28" height="1.5" fill="${th.louver[2]}"/>
  </pattern>` : ''}
  ${th.brick ? `<pattern id="haBrick" x="0" y="0" width="16" height="8" patternUnits="userSpaceOnUse">
    <rect width="16" height="8" fill="${th.wall}"/>
    <path d="M0,3.6H16M0,7.6H16M8,0V3.6M0,4V7.6M16,4V7.6" stroke="${th.mortar}" stroke-width="0.8"/>
  </pattern>
  <pattern id="haPlinth" x="0" y="0" width="16" height="8" patternUnits="userSpaceOnUse">
    <rect width="16" height="8" fill="${th.plinth}"/>
    <path d="M0,3.6H16M0,7.6H16M8,0V3.6M0,4V7.6M16,4V7.6" stroke="${th.plinthMortar}" stroke-width="0.8"/>
  </pattern>
  <pattern id="haTiles" x="0" y="0" width="10" height="6" patternUnits="userSpaceOnUse">
    <rect width="10" height="6" fill="${th.roof[0]}"/>
    <path d="M0,6 Q5,2 10,6" fill="none" stroke="rgba(0,0,0,0.35)" stroke-width="0.8"/>
    <path d="M0,0.5H10" stroke="rgba(255,255,255,0.06)" stroke-width="0.8"/>
  </pattern>` : ''}
  <clipPath id="haGableClip"><polygon points="252,162 408,162 330,78"/></clipPath>
  <radialGradient id="haGlow" cx="50%" cy="50%" r="50%">
    <stop offset="0%" stop-color="#fff8c0" stop-opacity="1"/>
    <stop offset="40%" stop-color="#ffdd44" stop-opacity="0.55"/>
    <stop offset="100%" stop-color="#ffaa00" stop-opacity="0"/>
  </radialGradient>
  <linearGradient id="haCarBody" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="${shadeHex(this._config.car_color || '#c8bc98', 0.12)}"/><stop offset="50%" stop-color="${this._config.car_color || '#c8bc98'}"/><stop offset="100%" stop-color="${shadeHex(this._config.car_color || '#c8bc98', -0.16)}"/>
  </linearGradient>
  <linearGradient id="haCarRoof" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="${shadeHex(this._config.car_color || '#c8bc98', -0.08)}"/><stop offset="100%" stop-color="${shadeHex(this._config.car_color || '#c8bc98', -0.23)}"/>
  </linearGradient>
  <linearGradient id="haRearWin" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#1a2838"/><stop offset="100%" stop-color="#0a1420"/>
  </linearGradient>
</defs>
<style>@keyframes shutterBlink{0%,100%{opacity:1}50%{opacity:0.3}}</style>
<!-- FLAG -->
<rect x="26" y="282" width="12" height="16" rx="2" fill="#8a9098"/>
<rect x="29" y="96" width="4" height="188" fill="#c8d0d8"/>
<circle cx="31" cy="94" r="4" fill="#d8c060"/>
${flagSvg(this._config.country || 'vn', 33, 96, 42, 25)}
<!-- WALLS (house_theme) -->
${th.brick ? `<rect x="85" y="160" width="490" height="212" fill="url(#haBrick)"/>
<rect x="85" y="344" width="490" height="28" fill="url(#haPlinth)"/>
<rect x="85" y="343" width="490" height="1.5" fill="rgba(0,0,0,0.25)"/>` : `<rect x="85" y="248" width="490" height="124" fill="${th.wall}"/>
<rect x="85" y="162" width="490" height="90" fill="${th.wallTop}"/>
<rect x="85" y="246" width="490" height="5" fill="${th.band}"/>
<rect x="85" y="182" width="490" height="1.5" fill="rgba(0,0,0,0.07)"/>
<rect x="85" y="202" width="490" height="1.5" fill="rgba(0,0,0,0.07)"/>
<rect x="85" y="222" width="490" height="1.5" fill="rgba(0,0,0,0.05)"/>`}
${th.noBalcony ? '' : `<!-- Balcony -->
<rect x="455" y="168" width="118" height="80" fill="${th.balcony}"/>
<rect x="455" y="240" width="118" height="5" rx="1" fill="${th.rail}"/>
<rect x="455" y="168" width="118" height="5" rx="1" fill="${th.rail}"/>
<line x1="470" y1="173" x2="470" y2="245" stroke="${th.rail}" stroke-width="1.5"/>
<line x1="486" y1="173" x2="486" y2="245" stroke="${th.rail}" stroke-width="1.5"/>
<line x1="502" y1="173" x2="502" y2="245" stroke="${th.rail}" stroke-width="1.5"/>
<line x1="518" y1="173" x2="518" y2="245" stroke="${th.rail}" stroke-width="1.5"/>
<line x1="534" y1="173" x2="534" y2="245" stroke="${th.rail}" stroke-width="1.5"/>
<line x1="550" y1="173" x2="550" y2="245" stroke="${th.rail}" stroke-width="1.5"/>`}
${th.flatRoof ? `<!-- FLAT ROOF with tiled fascia (brick theme) -->
<rect x="72" y="142" width="516" height="22" fill="url(#haTiles)"/>
<rect x="72" y="141" width="516" height="2.5" fill="${th.gutter}"/>
<rect x="72" y="163" width="516" height="4" fill="${th.gutter}"/>
` : `<!-- ROOF -->
<polygon points="72,162 330,60 588,162" fill="${th.roof[0]}"/>
<polygon points="72,162 330,60 330,162" fill="${th.roof[1]}"/>
<polygon points="330,60 588,162 330,162" fill="${th.roof[2]}"/>
<polygon points="72,162 330,60 588,162 575,162 330,68 85,162" fill="${th.roof[3]}"/>
<rect x="72" y="160" width="516" height="7" fill="${th.eave}" stroke="${th.eaveLine}" stroke-width="0.5"/>
<rect x="72" y="165" width="516" height="5" rx="2" fill="${th.gutter}" stroke="${th.gutter}" stroke-width="0.6"/>
<line x1="72" y1="162" x2="330" y2="60" stroke="${th.gutter}" stroke-width="2.5"/>
<line x1="330" y1="60" x2="588" y2="162" stroke="${th.eaveLine}" stroke-width="2.5"/>
<polygon points="252,162 408,162 330,78" fill="${th.gable}" stroke="${th.eaveLine}" stroke-width="1.5"/>
<g clip-path="url(#haGableClip)"><rect x="252" y="78" width="156" height="84" fill="url(#haLouverPat)"/></g>
<line x1="260" y1="162" x2="330" y2="86" stroke="${th.eaveLine}" stroke-width="1.2"/>
<line x1="400" y1="162" x2="330" y2="86" stroke="${th.eaveLine}" stroke-width="1.2"/>
<polygon points="321,86 339,86 343,97 330,105 317,97" fill="${th.gable}" stroke="${th.gutter}" stroke-width="1"/>`}
<!-- garage door group (moves right when the side door is on the left) -->
<g transform="translate(${this._config.side_door === 'left' ? 72 : this._config.side_door === 'none' ? 59 : 0},0)">
<!-- MOTOR BOX -->
<rect x="103" y="212" width="336" height="18" rx="4" fill="#1e2a38" stroke="#2e3a50" stroke-width="0.8"/>
<rect x="107" y="215" width="328" height="12" rx="2" fill="rgba(0,0,0,0.45)"/>
<text x="116" y="225" font-size="8" fill="#5a9adf" font-family="monospace" letter-spacing="2.5" font-weight="bold">${(this._config.home_name || 'MY HOME').toUpperCase().substring(0,28)}</text>
${motorDot}${arrowUp}${arrowDown}
<!-- GARAGE DOOR FRAME -->
<rect x="103" y="228" width="336" height="144" rx="2" fill="${th.frame[0]}"/>
<rect x="103" y="228" width="10" height="144" fill="${th.frame[1]}"/>
<rect x="429" y="228" width="10" height="144" fill="${th.frame[1]}"/>
<rect x="103" y="369" width="336" height="6" rx="1" fill="${th.frame[2]}"/>
<!-- INTERIOR + CAR (clipped by shutter opening) -->
<g clip-path="url(#haDoorOpenClip)">
  <rect x="113" y="230" width="316" height="140" fill="#1a1e24"/>
  <rect x="113" y="350" width="316" height="22" fill="#252830"/>
  <rect x="113" y="350" width="316" height="2" fill="#303440"/>
  <ellipse cx="271" cy="363" rx="90" ry="4" fill="rgba(0,0,0,0.5)"/>
  <!-- Glow lamps -->
  <circle cx="122" cy="262" r="34" fill="url(#haGlow)" opacity="${glowOp}"/>
  <circle cx="420" cy="262" r="34" fill="url(#haGlow)" opacity="${glowOp}"/>
  <!-- WHEELS (behind car body) -->
  <!-- Left rear wheel -->
  <rect x="178" y="330" width="24" height="34" rx="4" fill="#1a1a1a" stroke="#2a2a2a" stroke-width="1.2"/>
  <line x1="184" y1="332" x2="184" y2="362" stroke="#3a3a3a" stroke-width="2"/>
  <line x1="190" y1="332" x2="190" y2="362" stroke="#3a3a3a" stroke-width="2"/>
  <line x1="196" y1="332" x2="196" y2="362" stroke="#3a3a3a" stroke-width="2"/>
  <!-- Right rear wheel -->
  <rect x="340" y="330" width="24" height="34" rx="4" fill="#1a1a1a" stroke="#2a2a2a" stroke-width="1.2"/>
  <line x1="346" y1="332" x2="346" y2="362" stroke="#3a3a3a" stroke-width="2"/>
  <line x1="352" y1="332" x2="352" y2="362" stroke="#3a3a3a" stroke-width="2"/>
  <line x1="358" y1="332" x2="358" y2="362" stroke="#3a3a3a" stroke-width="2"/>
  <!-- CAR body scaled -->
  <g transform="translate(271,295) scale(0.82) translate(-271,-295)">
    <!-- Bumper / undercarriage -->
    <rect x="163" y="338" width="216" height="20" rx="5" fill="#222228" stroke="#18181e" stroke-width="1"/>
    <rect x="180" y="342" width="182" height="13" rx="2" fill="#1a1a20"/>
    <!-- Tail lights housing left -->
    <rect x="165" y="340" width="14" height="16" rx="2" fill="#bb1010"/>
    <!-- Tail lights housing right -->
    <rect x="363" y="340" width="14" height="16" rx="2" fill="#bb1010"/>
    <!-- Wheel arches (4 small ellipses for dual rear) -->
    <ellipse cx="190" cy="354" rx="7" ry="5" fill="#505050" stroke="#777" stroke-width="1"/>
    <ellipse cx="190" cy="354" rx="4" ry="3" fill="#1a1a1a"/>
    <ellipse cx="204" cy="354" rx="7" ry="5" fill="#505050" stroke="#777" stroke-width="1"/>
    <ellipse cx="204" cy="354" rx="4" ry="3" fill="#1a1a1a"/>
    <ellipse cx="338" cy="354" rx="7" ry="5" fill="#505050" stroke="#777" stroke-width="1"/>
    <ellipse cx="338" cy="354" rx="4" ry="3" fill="#1a1a1a"/>
    <ellipse cx="352" cy="354" rx="7" ry="5" fill="#505050" stroke="#777" stroke-width="1"/>
    <ellipse cx="352" cy="354" rx="4" ry="3" fill="#1a1a1a"/>
    <!-- Car body -->
    <path d="M163,262 Q161,290 161,338 L381,338 Q381,290 379,262 Z" fill="url(#haCarBody)"/>
    <!-- Body highlight -->
    <path d="M176,264 Q175,288 175,318 L367,318 Q367,288 367,264 Z" fill="rgba(255,255,255,0.07)"/>
    <!-- Boot / trunk lid -->
    <path d="M178,250 Q180,241 271,235 Q362,241 364,250 L366,268 Q330,263 271,261 Q212,263 176,268 Z" fill="url(#haCarBody)" stroke="${shadeHex(this._config.car_color || '#c8bc98', -0.1)}" stroke-width="0.5"/>
    <!-- Trunk highlight -->
    <path d="M194,247 Q240,240 271,238 Q302,240 348,247" fill="none" stroke="rgba(255,255,255,0.22)" stroke-width="1.8"/>
    <!-- Rear window -->
    <path d="M196,250 Q215,224 271,218 Q327,224 346,250 L342,254 Q323,231 271,225 Q219,231 200,254 Z" fill="url(#haRearWin)" stroke="#777" stroke-width="0.8"/>
    <!-- Rear window wiper -->
    <line x1="224" y1="248" x2="318" y2="242" stroke="#444" stroke-width="1.5" stroke-linecap="round"/>
    <!-- Roof spoiler strip -->
    <path d="M210,250 Q271,241 332,250 L329,246 Q271,237 213,246 Z" fill="${shadeHex(this._config.car_color || '#c8bc98', -0.3)}" stroke="${shadeHex(this._config.car_color || '#c8bc98', -0.4)}" stroke-width="0.5"/>
    <!-- Roof -->
    <path d="M174,250 L196,250 Q215,224 271,218 Q327,224 346,250 L368,250 L365,262 Q330,255 271,253 Q212,255 177,262 Z" fill="url(#haCarRoof)"/>
    <!-- LEFT tail light full assembly -->
    <path d="M161,266 Q159,276 159,298 L178,296 Q177,276 178,266 Z" fill="#cc1111" stroke="#990000" stroke-width="0.8"/>
    <rect x="161" y="270" width="14" height="22" rx="1" fill="#ff3333" opacity="0.85"/>
    <line x1="163" y1="273" x2="173" y2="273" stroke="#ff8888" stroke-width="1.2"/>
    <line x1="163" y1="277" x2="173" y2="277" stroke="#ff8888" stroke-width="1.2"/>
    <line x1="163" y1="281" x2="173" y2="281" stroke="#ff8888" stroke-width="1.2"/>
    <line x1="163" y1="285" x2="173" y2="285" stroke="#ff8888" stroke-width="1.2"/>
    <line x1="163" y1="289" x2="173" y2="289" stroke="#ff8888" stroke-width="1.2"/>
    <path d="M161,266 Q159,276 159,298 L178,296 Q177,276 178,266 Z" fill="none" stroke="#c0b8a0" stroke-width="1"/>
    <!-- RIGHT tail light full assembly -->
    <path d="M381,266 Q383,276 383,298 L364,296 Q365,276 364,266 Z" fill="#cc1111" stroke="#990000" stroke-width="0.8"/>
    <rect x="367" y="270" width="14" height="22" rx="1" fill="#ff3333" opacity="0.85"/>
    <line x1="369" y1="273" x2="379" y2="273" stroke="#ff8888" stroke-width="1.2"/>
    <line x1="369" y1="277" x2="379" y2="277" stroke="#ff8888" stroke-width="1.2"/>
    <line x1="369" y1="281" x2="379" y2="281" stroke="#ff8888" stroke-width="1.2"/>
    <line x1="369" y1="285" x2="379" y2="285" stroke="#ff8888" stroke-width="1.2"/>
    <line x1="369" y1="289" x2="379" y2="289" stroke="#ff8888" stroke-width="1.2"/>
    <path d="M381,266 Q383,276 383,298 L364,296 Q365,276 364,266 Z" fill="none" stroke="#c0b8a0" stroke-width="1"/>
    <!-- Rear light bar across -->
    <rect x="178" y="294" width="186" height="5" rx="1" fill="#dd1111"/>
    <rect x="180" y="295" width="182" height="3" rx="1" fill="#ff4444" opacity="0.6"/>
    <!-- Body crease line -->
    <rect x="180" y="262" width="182" height="2.5" rx="1" fill="#c8c4a8" opacity="0.65"/>
    <!-- REAR LOGO (car_brand) -->
    ${carLogoSvg(this._config.car_brand || 'toyota', 271, 272)}
    <!-- MODEL BADGE (car_model) -->
    ${(() => { const m = String(this._config.car_model ?? 'VIOS'); if (!m) return '';
      // SEAT puts the model name centred below the logo; others on the left of the boot lid
      if ((this._config.car_brand || 'toyota') === 'seat') {
        return `<text x="271" y="292" font-size="7.5" fill="#d8d8d8" font-family="Arial" font-style="italic" font-weight="bold" letter-spacing="0.6" text-anchor="middle" stroke="#666" stroke-width="0.4" paint-order="stroke">${m}</text>`;
      }
      const fs = m.length > 5 ? Math.max(6.5, 10.5 * 5 / m.length) : 10.5;  // long names get smaller to stay on the boot lid
      return `<text x="222" y="275" font-size="${fs.toFixed(1)}" fill="#d8d8d8" font-family="Arial" font-weight="bold" letter-spacing="${m.length > 5 ? 1 : 2}" text-anchor="end" stroke="#666" stroke-width="0.6" paint-order="stroke">${m}</text>`; })()}
    <!-- TRIM BADGE (car_trim), right side of the boot lid -->
    ${this._config.car_trim ? `<text x="320" y="276" font-size="10" fill="#e0e0e0" font-family="Arial Black,Arial" font-weight="900" font-style="italic" letter-spacing="0.5" text-anchor="start" stroke="#555" stroke-width="0.5" paint-order="stroke">${String(this._config.car_trim).substring(0, 8)}</text>` : ''}
    <!-- LICENSE PLATE (country) -->
    ${(() => { const c = this._config.country || 'vn'; return plateSvg(c, this._config.plate_line1 || (c === 'vn' ? '99A' : ''), this._config.plate_line2 || (c === 'vn' ? '873.76' : '')); })()}
    <circle cx="239" cy="319" r="1.2" fill="#aaa"/>
    <circle cx="304" cy="319" r="1.2" fill="#aaa"/>
    <circle cx="239" cy="339" r="1.2" fill="#aaa"/>
    <circle cx="304" cy="339" r="1.2" fill="#aaa"/>
    <!-- EXHAUST PIPES (bô xe) -->
    <ellipse cx="192" cy="356" rx="7" ry="5" fill="#303030" stroke="#555" stroke-width="1"/>
    <ellipse cx="192" cy="356" rx="5" ry="3.5" fill="#1a1a1a"/>
    <ellipse cx="192" cy="356" rx="3" ry="2" fill="#111" stroke="#444" stroke-width="0.5"/>
    <ellipse cx="350" cy="356" rx="7" ry="5" fill="#303030" stroke="#555" stroke-width="1"/>
    <ellipse cx="350" cy="356" rx="5" ry="3.5" fill="#1a1a1a"/>
    <ellipse cx="350" cy="356" rx="3" ry="2" fill="#111" stroke="#444" stroke-width="0.5"/>
  </g>
</g>
<!-- SHUTTER SLATS -->
<g clip-path="url(#haDoorClip)">${slatsSvg}</g>
</g>
<!-- PEDESTRIAN DOOR (house_theme, side_door) -->
<g transform="translate(${this._config.side_door === 'left' ? -345 : 0},0)" ${this._config.side_door === 'none' ? 'display="none"' : ''}>
${th.archDoor ? `<path d="M446,372 V282 A32,32 0 0 1 510,282 V372 Z" fill="#141516" stroke="${th.mortar}" stroke-width="3"/>
<g fill="none" stroke="#f0f0ee" stroke-width="1.3">
  <path d="M449,372 V283 A29,29 0 0 1 507,283 V372"/>
  <path d="M478,256 V372 M449,300 H507 M449,336 H507"/>
  <circle cx="463.5" cy="318" r="7"/><circle cx="492.5" cy="318" r="7"/>
  <circle cx="463.5" cy="354" r="7"/><circle cx="492.5" cy="354" r="7"/>
  <path d="M458,284 q5,-12 20,-12 q15,0 20,12"/>
  <path d="M466,292 q4,-8 12,-8 q8,0 12,8"/>
</g>` : `<rect x="442" y="252" width="72" height="120" rx="3" fill="${th.door[0]}"/>
<rect x="444" y="254" width="68" height="116" rx="2" fill="${th.door[1]}" stroke="${th.door[2]}" stroke-width="1.2"/>
<rect x="458" y="264" width="12" height="96" rx="2" fill="${th.door[3]}"/>
<rect x="474" y="264" width="12" height="96" rx="2" fill="${th.door[3]}"/>
<rect x="490" y="264" width="12" height="96" rx="2" fill="${th.door[3]}"/>
<rect x="448" y="304" width="7" height="18" rx="3" fill="${th.door[4]}"/>`}
</g>
<!-- WALL LAMPS -->
<g transform="translate(${this._config.side_door === 'left' ? 72 : this._config.side_door === 'none' ? 59 : 0},0)">
<rect x="113" y="230" width="18" height="28" rx="3" fill="${th.lamp[0]}" stroke="${th.lamp[1]}" stroke-width="0.8"/>
<polygon points="113,242 131,242 128,258 116,258" fill="${th.lamp[2]}" stroke="${th.lamp[3]}" stroke-width="0.7"/>
<rect x="115" y="243" width="12" height="10" rx="1" fill="${glassFill}"/>
<ellipse cx="122" cy="248" rx="4" ry="3" fill="${bulbFill}"/>
<rect x="411" y="230" width="18" height="28" rx="3" fill="${th.lamp[0]}" stroke="${th.lamp[1]}" stroke-width="0.8"/>
<polygon points="411,242 429,242 426,258 414,258" fill="${th.lamp[2]}" stroke="${th.lamp[3]}" stroke-width="0.7"/>
<rect x="413" y="243" width="12" height="10" rx="1" fill="${glassFill}"/>
<ellipse cx="420" cy="248" rx="4" ry="3" fill="${bulbFill}"/>
</g>
<!-- LOCK BUTTON — right wall beside pedestrian door -->
${this._config.entity_gate_lock ? (() => {
  // ON = locked (green, shackle down), OFF = unlocked (red, shackle up)
  const lx = 543, ly = 300;
  const col    = lockOn ? '#00cc77' : '#ee3333';
  const glow   = lockOn ? 'rgba(0,200,100,0.22)' : 'rgba(238,50,50,0.22)';
  const stroke = lockOn ? 'rgba(0,220,120,0.8)'  : 'rgba(238,80,80,0.8)';
  const shY    = lockOn ? ly - 18 : ly - 24;   // shackle top Y — up when unlocked
  const shH    = lockOn ? 10      : 14;         // shackle visible height
  const label  = lockOn ? 'LOCKED' : 'OPEN';
  return `
<rect x="${lx-24}" y="${ly-28}" width="48" height="58" rx="9"
  fill="${glow}" stroke="${stroke}" stroke-width="1.8"
  data-action="toggle-lock" style="cursor:pointer;"/>
<path d="M${lx-9},${shY+shH} L${lx-9},${shY} A9,9 0 0,1 ${lx+9},${shY} L${lx+9},${shY+shH}"
  fill="none" stroke="${col}" stroke-width="4.5" stroke-linecap="round"
  data-action="toggle-lock" style="cursor:pointer;"/>
<rect x="${lx-14}" y="${ly-8}" width="28" height="22" rx="5"
  fill="${col}" data-action="toggle-lock" style="cursor:pointer;"/>
<circle cx="${lx}" cy="${ly+2}" r="4.5"
  fill="${lockOn?'#007744':'#880000'}"
  data-action="toggle-lock" style="cursor:pointer;"/>
<rect x="${lx-2}" y="${ly+3}" width="4" height="6" rx="1.5"
  fill="${lockOn?'#007744':'#880000'}"
  data-action="toggle-lock" style="cursor:pointer;"/>
<text x="${lx}" y="${ly+40}" text-anchor="middle"
  font-size="8" fill="${col}" font-family="monospace" font-weight="bold" letter-spacing="0.5"
  data-action="toggle-lock" style="cursor:pointer;">${label}</text>`;
})() : ''}
<!-- POSITION inside SVG (subtle) -->
<text x="330" y="395" text-anchor="middle" font-size="8" fill="rgba(255,255,255,0.22)" font-family="monospace" letter-spacing="1">${t.position(pos)}</text>`;
  }

  // ── SVG Cover — cổng 2 cánh mở vào trong ─────────────────────────────────
  // viewBox: 0 0 560 220
  // Background is transparent (fence/wall theme), pillars with lamps on both sides.
  // Wings swing inward: angle = pos * 90 / 100 degrees, visualised as cosine shrink.
  _svgCover(pos, isOpening, isClosing, isStopped, isClosed, isMoving, lightOn = false, lockOn = false) {
    const t       = this.t;
    const angleDeg = (pos / 100) * 90;
    const cosA     = Math.cos(angleDeg * Math.PI / 180);

    // Layout constants — shifted down 90px so lamp clears top of viewBox (560×310)
    const LHX = 178; // left hinge X  (280 - GW)
    const RHX = 382; // right hinge X (280 + GW) — wings meet exactly at centre
    const GT  = 132; // gate top Y  (was 42 + 90)
    const GB  = 268; // gate bottom Y (was 178 + 90)
    const GH  = GB - GT;
    const GW  = 102; // full gate wing width (closed)
    const visW = Math.max(1, GW * cosA);

    // Pillar dims
    const PW = 38;
    const PH = 148;
    const PY = 120; // was 30 + 90

    // Light glow
    const lampFill  = lightOn ? '#ffe066' : '#1a1a0a';
    const lampStroke= lightOn ? '#ffcc44' : '#2a2a1a';
    const glowA     = lightOn ? '0.9' : '0';

    // Motion indicator
    const pirFill   = isMoving ? '#00aa44' : '#0a1a0a';
    const pirStroke = isMoving ? '#00aa44' : '#1a3a1a';
    const movAnim   = isMoving ? 'animation:cvPulse .8s ease-in-out infinite;' : '';

    // Vertical energy-line animations — run along the inner edge of each pillar
    // Opening: line travels bottom → top (from GB up to PY)
    // Closing:  line travels top → bottom (from PY down to GB)
    const lineX_L = LHX + 3;   // inner edge of left pillar  (just inside, toward gate)
    const lineX_R = RHX - 3;   // inner edge of right pillar (just inside, toward gate)
    const lineTop  = PY;        // top of pillar body
    const lineBot  = GB + 1;    // bottom of pillar body (base top)
    const arcLen   = lineBot - lineTop; // total path length

    const sweepKeyframes = `
@keyframes riseUp {
  0%   { stroke-dashoffset: ${arcLen};  opacity: 1; }
  80%  { stroke-dashoffset: 0;          opacity: 1; }
  100% { stroke-dashoffset: 0;          opacity: 0; }
}
@keyframes fallDown {
  0%   { stroke-dashoffset: 0;          opacity: 1; }
  80%  { stroke-dashoffset: ${arcLen};  opacity: 1; }
  100% { stroke-dashoffset: ${arcLen};  opacity: 0; }
}
@keyframes glintRise {
  0%   { stroke-dashoffset: ${arcLen + 18}; }
  100% { stroke-dashoffset: -18; }
}
@keyframes glintFall {
  0%   { stroke-dashoffset: -18; }
  100% { stroke-dashoffset: ${arcLen + 18}; }
}`;

    // Helper: vertical line SVG (bottom to top = pathStart at bottom, drawn upward)
    // SVG lines go top→bottom normally; to animate bottom→top we flip dash direction:
    //   path goes from lineBot to lineTop (upward), dashoffset starts full (hidden) → 0 (revealed)
    const lLinePath = `M ${lineX_L} ${lineBot} L ${lineX_L} ${lineTop}`;
    const rLinePath = `M ${lineX_R} ${lineBot} L ${lineX_R} ${lineTop}`;

    const arcOpen = isOpening ? `
<defs><style>${sweepKeyframes}</style></defs>
<g>
  <!-- left pillar rise line -->
  <line x1="${lineX_L}" y1="${lineTop}" x2="${lineX_L}" y2="${lineBot}" stroke="rgba(34,204,119,0.15)" stroke-width="8" stroke-linecap="round"/>
  <path d="${lLinePath}" fill="none" stroke="#22cc77" stroke-width="3" stroke-linecap="round"
    stroke-dasharray="${arcLen}" stroke-dashoffset="${arcLen}"
    style="animation:riseUp .8s ease-out infinite"/>
  <path d="${lLinePath}" fill="none" stroke="rgba(180,255,220,0.9)" stroke-width="1.5" stroke-linecap="round"
    stroke-dasharray="10 ${arcLen}" stroke-dashoffset="${arcLen + 18}"
    style="animation:glintRise .8s linear infinite"/>
  <!-- right pillar rise line -->
  <line x1="${lineX_R}" y1="${lineTop}" x2="${lineX_R}" y2="${lineBot}" stroke="rgba(34,204,119,0.15)" stroke-width="8" stroke-linecap="round"/>
  <path d="${rLinePath}" fill="none" stroke="#22cc77" stroke-width="3" stroke-linecap="round"
    stroke-dasharray="${arcLen}" stroke-dashoffset="${arcLen}"
    style="animation:riseUp .8s ease-out infinite"/>
  <path d="${rLinePath}" fill="none" stroke="rgba(180,255,220,0.9)" stroke-width="1.5" stroke-linecap="round"
    stroke-dasharray="10 ${arcLen}" stroke-dashoffset="${arcLen + 18}"
    style="animation:glintRise .8s linear infinite"/>
</g>` : '';

    const arcClose = isClosing ? `
<defs><style>${sweepKeyframes}</style></defs>
<g>
  <!-- left pillar fall line -->
  <line x1="${lineX_L}" y1="${lineTop}" x2="${lineX_L}" y2="${lineBot}" stroke="rgba(51,170,255,0.15)" stroke-width="8" stroke-linecap="round"/>
  <path d="${lLinePath}" fill="none" stroke="#33aaff" stroke-width="3" stroke-linecap="round"
    stroke-dasharray="${arcLen}" stroke-dashoffset="0"
    style="animation:fallDown .8s ease-in infinite"/>
  <path d="${lLinePath}" fill="none" stroke="rgba(180,230,255,0.9)" stroke-width="1.5" stroke-linecap="round"
    stroke-dasharray="10 ${arcLen}" stroke-dashoffset="-18"
    style="animation:glintFall .8s linear infinite"/>
  <!-- right pillar fall line -->
  <line x1="${lineX_R}" y1="${lineTop}" x2="${lineX_R}" y2="${lineBot}" stroke="rgba(51,170,255,0.15)" stroke-width="8" stroke-linecap="round"/>
  <path d="${rLinePath}" fill="none" stroke="#33aaff" stroke-width="3" stroke-linecap="round"
    stroke-dasharray="${arcLen}" stroke-dashoffset="0"
    style="animation:fallDown .8s ease-in infinite"/>
  <path d="${rLinePath}" fill="none" stroke="rgba(180,230,255,0.9)" stroke-width="1.5" stroke-linecap="round"
    stroke-dasharray="10 ${arcLen}" stroke-dashoffset="-18"
    style="animation:glintFall .8s linear infinite"/>
</g>` : '';

    const arrowOpen  = arcOpen;
    const arrowClose = arcClose;

    // Left wing: hinge at LHX, free end to the right (open → free end moves right)
    const lwX0 = LHX;
    const lwX1 = LHX + visW;
    // Right wing: hinge at RHX, free end to the left
    const rwX0 = RHX - visW;
    const rwX1 = RHX;

    // Wing face gradient
    const wGradL = `<linearGradient id="cvWL" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#4a6878"/><stop offset="30%" stop-color="#7ab0cc"/><stop offset="60%" stop-color="#9ad0e8"/><stop offset="100%" stop-color="#4a6878"/></linearGradient>`;
    const wGradR = `<linearGradient id="cvWR" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#4a6878"/><stop offset="40%" stop-color="#9ad0e8"/><stop offset="70%" stop-color="#7ab0cc"/><stop offset="100%" stop-color="#4a6878"/></linearGradient>`;

    // Slats for each wing
    const numSlats = 10;
    const slatH    = 9;
    const slatGap  = (GH - numSlats * slatH) / (numSlats + 1);
    const buildSlats = (x0, x1) => {
      let s = '';
      for (let i = 0; i < numSlats; i++) {
        const sy = GT + slatGap + i * (slatH + slatGap);
        s += `<rect x="${x0.toFixed(1)}" y="${sy.toFixed(1)}" width="${Math.max(0,x1-x0).toFixed(1)}" height="${slatH}" rx="0" fill="url(#cvSL)" stroke="none"/>`;
        s += `<line x1="${(x0+2).toFixed(1)}" y1="${(sy+1).toFixed(1)}" x2="${(x1-2).toFixed(1)}" y2="${(sy+1).toFixed(1)}" stroke="rgba(200,240,255,0.45)" stroke-width="0.7"/>`;
        s += `<line x1="${(x0+2).toFixed(1)}" y1="${(sy+slatH-1).toFixed(1)}" x2="${(x1-2).toFixed(1)}" y2="${(sy+slatH-1).toFixed(1)}" stroke="rgba(0,0,0,0.35)" stroke-width="0.8"/>`;
      }
      return s;
    };
    const slatGrad = `<linearGradient id="cvSL" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#4a6878"/><stop offset="30%" stop-color="#8abcd0"/><stop offset="60%" stop-color="#b0d8ec"/><stop offset="100%" stop-color="#5a8098"/></linearGradient>`;

    // Stiffeners
    const buildStiffeners = (x0, x1) => {
      if (x1 - x0 < 4) return '';
      const w = x1 - x0;
      return [0.33, 0.66].map(f => {
        const sx = (x0 + f * w).toFixed(1);
        return `<line x1="${sx}" y1="${GT}" x2="${sx}" y2="${GB}" stroke="rgba(20,50,70,0.7)" stroke-width="4"/>
                <line x1="${(parseFloat(sx)+1).toFixed(1)}" y1="${GT}" x2="${(parseFloat(sx)+1).toFixed(1)}" y2="${GB}" stroke="rgba(130,200,230,0.25)" stroke-width="0.8"/>`;
      }).join('');
    };

    // Top decorative strip
    const buildTopStrip = (x0, x1) => {
      if (x1 - x0 < 4) return '';
      const w = x1 - x0;
      let s = `<rect x="${x0.toFixed(1)}" y="${GT}" width="${w.toFixed(1)}" height="8" rx="0" fill="rgba(8,20,36,0.55)"/>`;
      for (let i = 0; i < 4; i++) {
        const bx = (x0 + (0.15 + i * 0.23) * w).toFixed(1);
        s += `<circle cx="${bx}" cy="${(GT+4).toFixed(1)}" r="2" fill="rgba(15,45,65,0.9)"/>`;
      }
      return s;
    };

    // Hinge bolts
    const buildHingeBolts = (hx) => {
      return [GT + 22, GB - 22].map(hy => `
        <circle cx="${hx}" cy="${hy}" r="4.5" fill="#1a3a50" stroke="#5a8aaa" stroke-width="0.8"/>
        <circle cx="${hx}" cy="${hy}" r="2" fill="#3a6a80"/>
      `).join('');
    };

    // Pillar with lamp
    const buildPillar = (hingeX, side) => {
      const px = side === 'left' ? hingeX - PW : hingeX;
      const pcx = px + PW / 2;
      const gradId = `cvPl${side}`;
      let grad, capGrad;
      // Stone/granite texture — warm grey with subtle veining
      if (side === 'left') {
        grad = `<linearGradient id="${gradId}" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stop-color="#4a4540"/>
          <stop offset="20%"  stop-color="#7a7268"/>
          <stop offset="45%"  stop-color="#9a9088"/>
          <stop offset="65%"  stop-color="#8a8078"/>
          <stop offset="85%"  stop-color="#6a6258"/>
          <stop offset="100%" stop-color="#4a4540"/>
        </linearGradient>`;
      } else {
        grad = `<linearGradient id="${gradId}" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stop-color="#4a4540"/>
          <stop offset="15%"  stop-color="#6a6258"/>
          <stop offset="35%"  stop-color="#8a8078"/>
          <stop offset="55%"  stop-color="#9a9088"/>
          <stop offset="80%"  stop-color="#7a7268"/>
          <stop offset="100%" stop-color="#4a4540"/>
        </linearGradient>`;
      }
      capGrad = `<linearGradient id="${gradId}C" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%"   stop-color="#3e3a36"/>
        <stop offset="50%"  stop-color="#a09888"/>
        <stop offset="100%" stop-color="#3e3a36"/>
      </linearGradient>`;

      // shadow ellipse
      const shadowEl = `<ellipse cx="${pcx}" cy="${GB+7}" rx="${PW*0.6}" ry="4" fill="rgba(0,0,0,0.32)"/>`;

      // pillar body — stone texture
      const body = `<rect x="${px}" y="${PY}" width="${PW}" height="${PH}" rx="3" fill="url(#${gradId})" stroke="#2e2a26" stroke-width="0.8"/>`;

      // groove lines (mortar joints — horizontal bands)
      const grooves = [PY+18, PY+40, PY+62, PY+84, PY+106, PY+128].map(gy =>
        `<line x1="${px+2}" y1="${gy}" x2="${px+PW-2}" y2="${gy}" stroke="rgba(0,0,0,0.35)" stroke-width="1.2"/>
         <line x1="${px+2}" y1="${gy+1}" x2="${px+PW-2}" y2="${gy+1}" stroke="rgba(255,255,255,0.08)" stroke-width="0.5"/>`).join('');

      // subtle diagonal vein lines for granite look
      const veins = `
        <line x1="${px+6}"  y1="${PY+10}"  x2="${px+18}" y2="${PY+55}"  stroke="rgba(255,255,255,0.06)" stroke-width="0.8"/>
        <line x1="${px+22}" y1="${PY+30}"  x2="${px+32}" y2="${PY+90}"  stroke="rgba(0,0,0,0.08)"       stroke-width="0.6"/>
        <line x1="${px+10}" y1="${PY+70}"  x2="${px+28}" y2="${PY+130}" stroke="rgba(255,255,255,0.05)" stroke-width="0.7"/>`;

      // cap + base
      const cap  = `<rect x="${px-5}" y="${PY-8}" width="${PW+10}" height="10" rx="3" fill="url(#${gradId}C)" stroke="#2a2622" stroke-width="0.6"/>`;
      const base = `<rect x="${px-4}" y="${GB+1}" width="${PW+8}" height="8" rx="2" fill="#3a3632" stroke="#222" stroke-width="0.5"/>`;

      // lamp — simple round bulb sitting directly on top of pillar cap
      const capTopY = PY - 8; // top of cap rect
      const bulbCY  = capTopY - 13; // bulb centre just above cap
      const bulbR   = 13;
      const bulb = lightOn
        ? `<circle cx="${pcx}" cy="${bulbCY}" r="${bulbR+10}" fill="rgba(255,220,60,0.14)"/>
           <circle cx="${pcx}" cy="${bulbCY}" r="${bulbR+5}" fill="rgba(255,210,40,0.26)"/>
           <circle cx="${pcx}" cy="${bulbCY}" r="${bulbR}" fill="#fffbe6" stroke="#ffe066" stroke-width="1.4"/>
           <circle cx="${pcx}" cy="${bulbCY}" r="${bulbR-4}" fill="#fff7c0"/>`
        : `<circle cx="${pcx}" cy="${bulbCY}" r="${bulbR}" fill="#d8d8d8" stroke="#aaa" stroke-width="1"/>
           <circle cx="${pcx}" cy="${bulbCY}" r="${bulbR-4}" fill="#c8c8c8"/>`;
      // small socket/base connecting bulb to cap
      const socket = `<rect x="${pcx-5}" y="${bulbCY+bulbR-2}" width="10" height="9" rx="2" fill="#3a4a5a" stroke="#4a6a80" stroke-width="0.5"/>`;
      const lampSlats = '';
      const housingBase = '';
      const pole = ''; const arm = ''; const housing = '';
      const roof = ''; const finial = '';

      // lock/intercom box on pillar
      const bxCx = pcx;
      const bxY  = PY + 42;
      let boxContent = '';
      if (side === 'left') {
        // lock icon
        boxContent = `
<rect x="${bxCx-8}" y="${bxY}" width="16" height="24" rx="2" fill="#0a1520" stroke="#1e3a5a" stroke-width="0.6"/>
<circle cx="${bxCx}" cy="${bxY+14}" r="3.5" fill="#0a1828" stroke="#00cc88" stroke-width="0.8"/>
<rect x="${bxCx-2.5}" y="${bxY+13}" width="5" height="4" rx="1" fill="#00cc88"/>
<path d="M${bxCx-2.5},${bxY+13} Q${bxCx-2.5},${bxY+9} ${bxCx},${bxY+9} Q${bxCx+2.5},${bxY+9} ${bxCx+2.5},${bxY+13}" fill="none" stroke="#00cc88" stroke-width="0.8" stroke-linecap="round"/>`;
      } else {
        // intercom dots
        const dots = [[4,5],[8,5],[12,5],[4,9],[8,9],[12,9],[6,13],[10,13]];
        boxContent = `<rect x="${bxCx-8}" y="${bxY}" width="16" height="24" rx="2" fill="#0a1520" stroke="#1e3a5a" stroke-width="0.6"/>` +
          dots.map(([dx,dy]) => `<circle cx="${bxCx-8+dx}" cy="${bxY+dy}" r="0.9" fill="#2a4a5a"/>`).join('') +
          `<circle cx="${bxCx}" cy="${bxY+18}" r="3.5" fill="#004a30" stroke="#00cc66" stroke-width="0.8"/>`;
      }

      return { defs: grad + capGrad, svg: `${shadowEl}${body}${grooves}${veins}${cap}${base}${socket}${bulb}${boxContent}` };
    };

    const lp = buildPillar(LHX, 'left');
    const rp = buildPillar(RHX, 'right');

    // Center lock icon (fades out as gate opens)
    const lockAlpha = Math.max(0, 1 - angleDeg / 35);
    const lockSvg = lockAlpha > 0 ? `
<g opacity="${lockAlpha.toFixed(2)}">
  <rect x="270" y="${(GT+GB)/2-14}" width="20" height="28" rx="2" fill="#0a1828" stroke="#1a4a6a" stroke-width="0.8"/>
  <rect x="273" y="${(GT+GB)/2-8}" width="14" height="10" rx="2" fill="#0e2235" stroke="#00cc88" stroke-width="0.8"/>
  <path d="M273,${(GT+GB)/2-8} Q273,${(GT+GB)/2-16} 280,${(GT+GB)/2-16} Q287,${(GT+GB)/2-16} 287,${(GT+GB)/2-8}" fill="none" stroke="#00cc88" stroke-width="1.2" stroke-linecap="round"/>
  <circle cx="280" cy="${(GT+GB)/2-2}" r="2.5" fill="#001828" stroke="#00cc88" stroke-width="0.6"/>
  <rect x="279" cy="${(GT+GB)/2-1}" width="2" height="4" rx="1" fill="#001828"/>
</g>` : '';

    // Fence wall segments — vertical slat style, fully transparent (no background rect)
    const fenceSlats = (x0, x1, fenceH, fenceY) => {
      const slotW = 7, gap = 5;
      const step  = slotW + gap;
      const count = Math.floor((x1 - x0) / step);
      let s = '';
      // top & bottom rail only
      s += `<rect x="${x0}" y="${fenceY}" width="${x1-x0}" height="4" rx="0" fill="#2e3f52" opacity="0.75"/>`;
      s += `<rect x="${x0}" y="${fenceY+fenceH-4}" width="${x1-x0}" height="4" rx="0" fill="#2e3f52" opacity="0.75"/>`;
      for (let i = 0; i < count; i++) {
        const sx = x0 + i * step + gap / 2;
        s += `<rect x="${sx.toFixed(1)}" y="${(fenceY+4).toFixed(1)}" width="${slotW}" height="${(fenceH-8).toFixed(1)}" rx="2" fill="#3a5268" stroke="#4a6a82" stroke-width="0.5" opacity="0.85"/>`;
        s += `<line x1="${(sx+1).toFixed(1)}" y1="${(fenceY+6).toFixed(1)}" x2="${(sx+1).toFixed(1)}" y2="${(fenceY+fenceH-6).toFixed(1)}" stroke="rgba(160,210,240,0.22)" stroke-width="0.6"/>`;
      }
      return s;
    };
    const fenceH  = PH - 10;
    const fenceY  = PY + 8;
    const fenceLeft  = fenceSlats(0, LHX - PW, fenceH, fenceY);
    const fenceRight = fenceSlats(RHX + PW, 560, fenceH, fenceY);

    // Ground rail only (no ground strip rect — transparent bg)
    const groundRail = `<line x1="${LHX}" y1="${GB+3}" x2="${RHX}" y2="${GB+3}" stroke="#1a4a2a" stroke-width="1.5" stroke-dasharray="5,3" opacity="${Math.max(0.12, 0.65 - angleDeg / 90 * 0.53).toFixed(2)}"/>`;

    return `
<defs>
  ${wGradL}${wGradR}${slatGrad}
  ${lp.defs}${rp.defs}
  <style>@keyframes cvBlink{0%,100%{opacity:1}50%{opacity:0.3}}@keyframes cvPulse{0%,100%{opacity:1}50%{opacity:0.35}}</style>
</defs>
${fenceLeft}${fenceRight}

<!-- LEFT WING -->
<g>
  <rect x="${lwX0.toFixed(1)}" y="${GT}" width="${visW.toFixed(1)}" height="${GH}" rx="0" fill="url(#cvWL)" stroke="#aad8ee" stroke-width="1.2"/>
  ${buildSlats(lwX0, lwX1)}
  ${buildStiffeners(lwX0, lwX1)}
  ${buildTopStrip(lwX0, lwX1)}
  ${buildHingeBolts(LHX)}
</g>

<!-- RIGHT WING -->
<g>
  <rect x="${rwX0.toFixed(1)}" y="${GT}" width="${visW.toFixed(1)}" height="${GH}" rx="0" fill="url(#cvWR)" stroke="#aad8ee" stroke-width="1.2"/>
  ${buildSlats(rwX0, rwX1)}
  ${buildStiffeners(rwX0, rwX1)}
  ${buildTopStrip(rwX0, rwX1)}
  ${buildHingeBolts(RHX)}
</g>

${groundRail}
${lockSvg}
${arrowOpen}${arrowClose}

<!-- PIR motion indicator -->
<circle cx="${LHX - PW/2 - 8}" cy="${PY + PH*0.55}" r="4" fill="${pirFill}" stroke="${pirStroke}" stroke-width="0.7" style="${movAnim}"/>
<text x="${LHX - PW/2 - 8}" y="${PY + PH*0.55 + 12}" text-anchor="middle" font-size="5.5" fill="#2a4a6a" font-family="monospace">PIR</text>

<!-- PILLARS (drawn on top of wings) -->
${lp.svg}
${rp.svg}

<text x="280" y="298" text-anchor="middle" font-size="8" fill="rgba(255,255,255,0.3)" font-family="monospace" letter-spacing="1">${t.position(pos)}</text>`;
  }

  _bindEvents() {
    this.shadowRoot.addEventListener('click', e => {
      const el = e.target.closest('[data-action]');
      if (!el) return;
      const cfg    = this._config;
      const action = el.dataset.action;

      if (action === 'flip') {
        // Guard so set hass() doesn't fight us during the toggle
        this._localFlipping = true;
        this._flipped = !this._flipped;
        this._swapFace();
        // Sync input_boolean to HA (best-effort, non-blocking)
        if (cfg.entity_flipped) this._toggle(cfg.entity_flipped);
        // Release guard after HA has had time to bounce back
        clearTimeout(this._flipTimer);
        this._flipTimer = setTimeout(() => { this._localFlipping = false; }, 2000);
        return;
      }

      if (action === 'toggle-extras') {
        this._extrasOpen = !this._extrasOpen;
        const sr = this.shadowRoot;
        sr.getElementById('f-extras')?.classList.toggle('open', this._extrasOpen);
        sr.getElementById('f-xarrow')?.classList.toggle('open', this._extrasOpen);
        sr.querySelector('.card')?.toggleAttribute('data-extras', this._extrasOpen);
        return;
      }

      if (action === 'open-camera') {
        // Fire the same event picture-entity fires — opens HA more-info camera dialog
        this.dispatchEvent(new CustomEvent('hass-more-info', {
          detail: { entityId: cfg.entity_camera },
          bubbles: true,
          composed: true,
        }));
        return;
      }

      const map = {
        'toggle-light': cfg.entity_gate_light,
        'toggle-lock':  cfg.entity_gate_lock,
        'open-gate':    cfg.entity_gate_open,
        'stop-gate':    cfg.entity_gate_stop,
        'close-gate':   cfg.entity_gate_close,
        'toggle-floodlight': cfg.entity_floodlight,
        'toggle-recording':  cfg.entity_recording,
      };

      // Block open-gate when use_lock is enabled and lock entity is ON
      if (action === 'open-gate' && cfg.use_lock) {
        const lockState = this._hass ? (this._hass.states?.[cfg.entity_gate_lock]?.state || '') : '';
        if (lockState === 'on') return; // locked — do nothing
      }

      this._toggle(map[action]);
    });
  }

  // Swap front↔back without tearing down the whole shadow DOM
  // (preserves camera stream and event listeners on shadowRoot)
  _swapFace() {
    const inner = this.shadowRoot.getElementById('inner');
    if (!inner) { this._buildDOM(); return; }
    inner.innerHTML = this._flipped ? this._backHTML() : this._frontHTML();
    // Toggle transparent background for cover style back face
    const card = this.shadowRoot.querySelector('.card');
    if (card) {
      const isCoverBack = this._flipped && (this._config.gate_style === 'cover' || this._config.gate_style === 'shutter');
      card.toggleAttribute('data-cover-back', isCoverBack);
    }
    // Re-bind inner click targets (shadowRoot listener already exists)
    this._patch();
    requestAnimationFrame(() => this._syncCamera());
  }

  getCardSize() { return 7; }
  static getConfigElement() { return document.createElement('gate-card-editor'); }
  static getStubConfig()    { return { ...DEFAULT_CONFIG }; }
}

// ═══════════════════════════════════════════════════════════════════════════════
//  EDITOR — mirrors solar-weather-card: ha-entity-picker + _syncPickers()
// ═══════════════════════════════════════════════════════════════════════════════
class GateCardEditor extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._config = { ...DEFAULT_CONFIG };
    this._hass   = null;
    this._open   = { name: true, lang: true, bg: true, colors: false, style: true, entities: true };
    this._picker = null;
  }

  setConfig(config) {
    this._config = { ...DEFAULT_CONFIG, ...config };
    this._render();
  }

  set hass(h) {
    this._hass = h;
    this._syncPickers();
  }

  get t() { return TRANSLATIONS[this._config.language] || TRANSLATIONS.vi; }

  _fire() {
    this.dispatchEvent(new CustomEvent('config-changed', {
      detail: { config: this._config }, bubbles: true, composed: true,
    }));
  }

  // ── Inject hass + saved values into every ha-entity-picker ──────────────────
  _syncPickers() {
    if (!this._hass || !this.shadowRoot) return;
    const apply = () => {
      this.shadowRoot.querySelectorAll('ha-entity-picker').forEach(p => {
        p.hass = this._hass;
        const domain = p.dataset.domain;
        if (domain) p.includeDomains = [domain];
        const key   = p.dataset.key;
        const saved = this._config[key] || '';
        if (saved && p.value !== saved) {
          p.value = saved;
          p.setAttribute('value', saved);
        }
      });
    };
    apply();
    requestAnimationFrame(() => requestAnimationFrame(apply));
  }

  // ── Toggle accordion section without full re-render (preserves picker state) ─
  _toggleSection(id) {
    this._open[id] = !this._open[id];
    const body  = this.shadowRoot.getElementById('body-' + id);
    const arrow = this.shadowRoot.getElementById('arrow-' + id);
    if (body) {
      body.style.display = this._open[id] ? 'block' : 'none';
      if (arrow) arrow.textContent = this._open[id] ? '▾' : '▸';
      if (this._open[id]) this._syncPickers();
    }
  }

  // ── Color picker row ─────────────────────────────────────────────────────────
  _colorRow(key, label) {
    const value  = this._config[key] || '#ffffff';
    const isOpen = this._picker === key;
    const swatches = ['#00ffcc','#00ff96','#ff5252','#00dcff','#ffd740','#ff8a65',
                      '#ffffff','#aaaaaa','#ffaa00','#22cc77','#2288ee','#ee4444'];
    return `
<div class="ci">
  <div class="ci-hdr" data-cp="${key}">
    <div class="ci-swatch" style="background:${value};"></div>
    <span class="ci-label">${label}</span>
    <code class="ci-code">${value}</code>
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" class="ci-chv">
      <path d="${isOpen?'M7.41 15.41 12 10.83l4.59 4.58L18 14l-6-6-6 6z':'M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z'}"/>
    </svg>
  </div>
  ${isOpen ? `
  <div class="ci-body">
    <input type="color" data-cp-native="${key}" value="${value}" class="ci-native"/>
    <div class="ci-hex-wrap">
      <span class="ci-hash">#</span>
      <input type="text" data-cp-hex="${key}" value="${value.replace('#','')}" maxlength="6" placeholder="rrggbb" class="ci-hex-inp"/>
    </div>
    <div class="ci-swatches">
      ${swatches.map(c=>`<div data-cp-dot="${key}" data-color="${c}" class="ci-dot"
        style="background:${c};outline:${value===c?'2px solid var(--primary-color)':'2px solid transparent'};"></div>`).join('')}
    </div>
  </div>` : ''}
</div>`;
  }

  // ── Entity row using native ha-entity-picker ─────────────────────────────────
  _entityField(key, label, domain) {
    return `
<div class="row">
  <label>${label}</label>
  <ha-entity-picker
    data-key="${key}"
    data-domain="${domain}"
    allow-custom-entity
  ></ha-entity-picker>
</div>`;
  }

  _render() {
    const cfg = this._config;
    const t   = this.t;
    const bgP = cfg.background_preset || 'default';

    this.shadowRoot.innerHTML = `
<style>
  :host { display:block; font-family:var(--primary-font-family,'Roboto',sans-serif); }
  .editor { background:var(--card-background-color,#fff); color:var(--primary-text-color); }
  .credit { display:flex;align-items:center;gap:8px;padding:12px 16px 8px;font-size:12px;
            color:var(--primary-color);font-weight:500;border-bottom:1px solid var(--divider-color); }
  /* accordion */
  .acc-wrap { border-bottom:1px solid var(--divider-color); }
  .acc-head { display:flex;align-items:center;gap:10px;padding:14px 16px;cursor:pointer;
              user-select:none;font-size:14px;font-weight:500;color:var(--primary-text-color);
              background:var(--secondary-background-color); }
  .acc-head:hover { filter:brightness(.96); }
  .acc-head ha-icon { color:var(--secondary-text-color);--mdi-icon-size:18px; }
  .acc-arrow { margin-left:auto;font-size:14px;color:var(--secondary-text-color);transition:transform .2s; }
  .acc-body { padding:12px 14px;border-top:1px solid var(--divider-color);
              background:var(--card-background-color,#fff); }
  /* fields */
  .row { display:flex;flex-direction:column;margin-bottom:12px; }
  .row:last-child { margin-bottom:0; }
  .row label { font-size:12px;color:var(--secondary-text-color);margin-bottom:4px;font-weight:600; }
  ha-entity-picker { display:block;width:100%; }
  /* language */
  .lang-grid { display:flex;flex-wrap:wrap;gap:6px; }
  .lang-btn { display:flex;align-items:center;gap:5px;padding:7px 10px;border-radius:8px;
              border:1.5px solid var(--divider-color);background:var(--secondary-background-color);
              cursor:pointer;font-size:12px;color:var(--primary-text-color);transition:all .2s; }
  .lang-btn.on { border-color:var(--primary-color);background:rgba(3,169,244,.12);
                 color:var(--primary-color);font-weight:700; }
  /* bg presets grid */
  .bg-grid { display:grid;grid-template-columns:repeat(5,1fr);gap:5px;margin-bottom:10px; }
  .bgs { border-radius:7px;height:40px;cursor:pointer;border:2px solid transparent;
         display:flex;align-items:flex-end;padding:3px 5px;font-size:9px;font-family:monospace;
         color:rgba(255,255,255,.85);text-shadow:0 1px 3px rgba(0,0,0,.9);transition:border-color .15s;
         white-space:nowrap;overflow:hidden; }
  .bgs.on { border-color:var(--primary-color); }
  /* color rows */
  .ci { border:1px solid var(--divider-color);border-radius:8px;overflow:hidden;margin-bottom:8px; }
  .ci:last-child { margin-bottom:0; }
  .ci-hdr { display:flex;align-items:center;gap:10px;padding:10px 12px;cursor:pointer;
            background:var(--card-background-color,#fff); }
  .ci-swatch { width:24px;height:24px;border-radius:4px;border:1px solid rgba(0,0,0,.1);flex-shrink:0; }
  .ci-label { font-size:13px;flex:1;color:var(--primary-text-color); }
  .ci-code { font-size:11px;color:var(--secondary-text-color);font-family:monospace;
             background:var(--secondary-background-color);padding:2px 6px;border-radius:3px; }
  .ci-chv { color:var(--secondary-text-color);flex-shrink:0; }
  .ci-body { padding:12px 14px;background:var(--secondary-background-color);
             border-top:1px solid var(--divider-color);display:flex;flex-direction:column;gap:10px; }
  .ci-native { width:100%;height:44px;border:1px solid var(--divider-color);border-radius:6px;
               cursor:pointer;padding:2px;background:transparent; }
  .ci-hex-wrap { display:flex;align-items:center;gap:6px;border:1px solid var(--divider-color);
                 border-radius:4px;padding:6px 10px;background:var(--card-background-color,#fff); }
  .ci-hash { color:var(--secondary-text-color);font-size:12px;font-family:monospace; }
  .ci-hex-inp { border:none;outline:none;width:100%;font-size:14px;
                color:var(--primary-text-color);font-family:monospace;background:transparent; }
  .ci-swatches { display:flex;gap:6px;flex-wrap:wrap; }
  .ci-dot { width:24px;height:24px;border-radius:50%;cursor:pointer;
            transition:transform .1s;outline-offset:2px; }
  .ci-dot:hover { transform:scale(1.15); }
  /* slider */
  .sl-row { display:flex;align-items:center;gap:10px; }
  .sl-row label { font-size:12px;font-weight:600;color:var(--secondary-text-color);min-width:140px; }
  .sl-row input[type=range] { flex:1;accent-color:var(--primary-color); }
  .slv { font-size:12px;font-weight:700;color:var(--primary-color);min-width:44px;
         text-align:right;font-family:monospace; }
  /* text inputs */
  .txt-inp { background:var(--input-fill-color,rgba(0,0,0,.04));border:1px solid var(--divider-color,#e0e0e0);
             border-radius:8px;padding:8px 12px;font-size:13px;color:var(--primary-text-color);
             width:100%;box-sizing:border-box; }
</style>
<div class="editor">
  <div class="credit">🚧 <strong>Gate Card</strong>
    <span style="color:var(--secondary-text-color);font-weight:400;">v1.3 Designed by @doanlong1412 from 🇻🇳 Vietnam</span>
  </div>

  <!-- 1. Language -->
  <div class="acc-wrap">
    <div class="acc-head" id="head-lang">
      <ha-icon icon="mdi:translate"></ha-icon> ${t.edLang}
      <span class="acc-arrow" id="arrow-lang">${this._open.lang?'▾':'▸'}</span>
    </div>
    <div class="acc-body" id="body-lang" style="display:${this._open.lang?'block':'none'}">
      <div class="lang-grid">
        ${Object.entries(TRANSLATIONS).map(([code,tr])=>`
          <div class="lang-btn ${cfg.language===code?'on':''}" data-lang="${code}">
            <img src="https://flagcdn.com/20x15/${tr.flag}.png" width="20" height="15" alt="${tr.lang}" style="border-radius:2px;flex-shrink:0;display:block;">
            ${tr.lang}
          </div>`).join('')}
      </div>
    </div>
  </div>

  <!-- 2. Gate Style -->
  <div class="acc-wrap">
    <div class="acc-head" id="head-style">
      <ha-icon icon="mdi:garage-variant"></ha-icon> ${t.edStyle}
      <span class="acc-arrow" id="arrow-style">${this._open.style?'▾':'▸'}</span>
    </div>
    <div class="acc-body" id="body-style" style="display:${this._open.style?'block':'none'}">
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;">
        <div class="style-btn ${(cfg.gate_style||'slide')==='slide'?'on':''}" data-style="slide" style="cursor:pointer;border-radius:10px;border:2px solid ${(cfg.gate_style||'slide')==='slide'?'var(--primary-color)':'var(--divider-color)'};padding:10px 8px;background:var(--secondary-background-color);display:flex;flex-direction:column;align-items:center;gap:6px;">
          <svg viewBox="0 0 80 40" width="60" height="30" style="display:block;">
            <rect x="0" y="5" width="78" height="32" rx="3" fill="#1a2a3a" stroke="#2a4a6a" stroke-width="1"/>
            <rect x="2" y="7" width="30" height="28" rx="2" fill="#2e4d60" stroke="#3a6070" stroke-width="0.5"/>
            <rect x="34" y="7" width="4" height="28" rx="1" fill="#2e4d60"/>
            <rect x="40" y="7" width="4" height="28" rx="1" fill="#2e4d60" opacity="0.4"/>
            <rect x="2" y="7" width="30" height="4" rx="1" fill="#3a6a7a"/>
            <rect x="2" y="19" width="30" height="3" rx="1" fill="#3a6a7a" opacity="0.6"/>
            <rect x="2" y="31" width="30" height="4" rx="1" fill="#3a6a7a"/>
            <circle cx="70" cy="20" r="4" fill="#1e3050"/>
            <polygon points="66,20 61,16 61,18.5 55,18.5 55,21.5 61,21.5 61,24" fill="#ff8c00" opacity="0.8"/>
          </svg>
          <span style="font-family:monospace;font-size:9px;font-weight:700;letter-spacing:0.8px;color:${(cfg.gate_style||'slide')==='slide'?'var(--primary-color)':'var(--secondary-text-color)'};">${t.edStyleSlide}</span>
        </div>
        <div class="style-btn ${(cfg.gate_style||'slide')==='shutter'?'on':''}" data-style="shutter" style="cursor:pointer;border-radius:10px;border:2px solid ${(cfg.gate_style||'slide')==='shutter'?'var(--primary-color)':'var(--divider-color)'};padding:10px 8px;background:var(--secondary-background-color);display:flex;flex-direction:column;align-items:center;gap:6px;">
          <svg viewBox="0 0 80 40" width="60" height="30" style="display:block;">
            <rect x="0" y="0" width="80" height="40" rx="3" fill="#1a1e24" stroke="#3a4048" stroke-width="1"/>
            <rect x="0" y="0" width="80" height="10" rx="2" fill="#b8b4ac"/>
            <rect x="5" y="11" width="70" height="5" rx="1" fill="#c0b8a8" stroke="#a0a090" stroke-width="0.4"/>
            <rect x="5" y="18" width="70" height="5" rx="1" fill="#b8b0a0" stroke="#a0a090" stroke-width="0.4"/>
            <rect x="5" y="25" width="70" height="5" rx="1" fill="#b0a898" stroke="#a0a090" stroke-width="0.4"/>
            <rect x="5" y="32" width="70" height="5" rx="1" fill="#a8a090" stroke="#a0a090" stroke-width="0.4"/>
          </svg>
          <span style="font-family:monospace;font-size:9px;font-weight:700;letter-spacing:0.8px;color:${(cfg.gate_style||'slide')==='shutter'?'var(--primary-color)':'var(--secondary-text-color)'};">${t.edStyleShutter}</span>
        </div>
        <div class="style-btn ${(cfg.gate_style||'slide')==='cover'?'on':''}" data-style="cover" style="cursor:pointer;border-radius:10px;border:2px solid ${(cfg.gate_style||'slide')==='cover'?'var(--primary-color)':'var(--divider-color)'};padding:10px 8px;background:var(--secondary-background-color);display:flex;flex-direction:column;align-items:center;gap:6px;">
          <svg viewBox="0 0 80 40" width="60" height="30" style="display:block;">
            <rect x="0" y="2" width="80" height="36" rx="2" fill="#0d1520"/>
            <rect x="0" y="4" width="14" height="32" rx="2" fill="#2a3a4e" stroke="#3a5570" stroke-width="0.8"/>
            <rect x="66" y="4" width="14" height="32" rx="2" fill="#2a3a4e" stroke="#3a5570" stroke-width="0.8"/>
            <rect x="14" y="8" width="22" height="26" rx="1" fill="#5a8ca8" stroke="#8ac8e0" stroke-width="0.8"/>
            <line x1="21" y1="8" x2="21" y2="34" stroke="rgba(20,50,70,0.6)" stroke-width="3"/>
            <line x1="28" y1="8" x2="28" y2="34" stroke="rgba(20,50,70,0.6)" stroke-width="3"/>
            <rect x="44" y="8" width="22" height="26" rx="1" fill="#5a8ca8" stroke="#8ac8e0" stroke-width="0.8"/>
            <line x1="51" y1="8" x2="51" y2="34" stroke="rgba(20,50,70,0.6)" stroke-width="3"/>
            <line x1="58" y1="8" x2="58" y2="34" stroke="rgba(20,50,70,0.6)" stroke-width="3"/>
            <circle cx="7" cy="10" r="3" fill="#1a1a0a" stroke="#2a2a1a" stroke-width="0.6"/>
            <circle cx="73" cy="10" r="3" fill="#1a1a0a" stroke="#2a2a1a" stroke-width="0.6"/>
          </svg>
          <span style="font-family:monospace;font-size:9px;font-weight:700;letter-spacing:0.8px;color:${(cfg.gate_style||'slide')==='cover'?'var(--primary-color)':'var(--secondary-text-color)'};">${t.edStyleCover||'🚪 2-WING'}</span>
        </div>
      </div>
    </div>
  </div>

  <!-- 3. Gate name, zone & license plate -->
  <div class="acc-wrap">
    <div class="acc-head" id="head-name">
      <ha-icon icon="mdi:tag-edit-outline"></ha-icon> ${t.edName}
      <span class="acc-arrow" id="arrow-name">${this._open.name?'▾':'▸'}</span>
    </div>
    <div class="acc-body" id="body-name" style="display:${this._open.name?'block':'none'}">
      <div class="row">
        <label>${t.edGateTitle}</label>
        <input class="txt-inp" type="text" id="inp-gate-title"
          placeholder="${t.title}" value="${cfg.gate_title||''}"/>
      </div>
      <div class="row">
        <label>${t.edGateZone}</label>
        <input class="txt-inp" type="text" id="inp-gate-zone"
          placeholder="${t.zone}" value="${cfg.gate_zone||''}"/>
      </div>
      <div class="row">
        <label>${t.edHomeName}</label>
        <input class="txt-inp" type="text" id="inp-home-name"
          placeholder="My Home" value="${cfg.home_name||''}"/>
      </div>
      <div class="row">
        <label>${t.edPlate1}</label>
        <input class="txt-inp" type="text" id="inp-plate-line1"
          placeholder="99A" maxlength="10" value="${cfg.plate_line1||'99A'}"/>
      </div>
      <div class="row">
        <label>${t.edPlate2}</label>
        <input class="txt-inp" type="text" id="inp-plate-line2"
          placeholder="873.76" maxlength="10" value="${cfg.plate_line2||''}"/>
      </div>
      <div class="row">
        <label>${t.edCountry||'🌍 Country'}</label>
        <select class="txt-inp" id="inp-country">
          ${Object.entries(COUNTRIES).map(([k, n]) => `<option value="${k}" ${(cfg.country||'vn')===k?'selected':''}>${n}</option>`).join('')}
        </select>
      </div>
      <div class="row">
        <label>${t.edHouseTheme||'🏠 House style'}</label>
        <select class="txt-inp" id="inp-house-theme">
          ${['beige', 'dark', 'white', 'brick'].map((k) => `<option value="${k}" ${(houseTheme(cfg.house_theme) === HOUSE_THEMES[k])?'selected':''}>${(t.houseThemes||{})[k]||k}</option>`).join('')}
        </select>
      </div>
      <div class="row">
        <label>${t.edSideDoor||'🚪 Side door'}</label>
        <select class="txt-inp" id="inp-side-door">
          ${['right', 'left', 'none'].map((k) => `<option value="${k}" ${(cfg.side_door||'right')===k?'selected':''}>${(t.sideDoors||{})[k]||k}</option>`).join('')}
        </select>
      </div>
      <div class="row">
        <label>${t.edCarBrand||'🚙 Car brand'}</label>
        <select class="txt-inp" id="inp-car-brand">
          ${Object.entries(CAR_BRANDS).map(([k, n]) => `<option value="${k}" ${(cfg.car_brand||'toyota')===k?'selected':''}>${n}</option>`).join('')}
        </select>
      </div>
      <div class="row">
        <label>${t.edCarModel||'🚙 Car model'}</label>
        <input class="txt-inp" type="text" id="inp-car-model"
          placeholder="VIOS" maxlength="14" value="${cfg.car_model ?? 'VIOS'}"/>
      </div>
      <div class="row">
        <label>${t.edCarTrim||'🚙 Trim badge'}</label>
        <input class="txt-inp" type="text" id="inp-car-trim"
          placeholder="FR" maxlength="8" value="${cfg.car_trim || ''}"/>
      </div>
      <div class="row">
        <label>${t.edCarColor||'🎨 Car colour'}</label>
        <input type="color" id="inp-car-color" value="${cfg.car_color||'#c8bc98'}" style="width:48px;height:32px;border:none;background:none;cursor:pointer;"/>
      </div>
    </div>
  </div>

  <!-- 4. Entities -->
  <div class="acc-wrap">
    <div class="acc-head" id="head-entities">
      <ha-icon icon="mdi:lightning-bolt"></ha-icon> ${t.entityLabel}
      <span class="acc-arrow" id="arrow-entities">${this._open.entities?'▾':'▸'}</span>
    </div>
    <div class="acc-body" id="body-entities" style="display:${this._open.entities?'block':'none'}">
      <div style="padding:4px 0 8px;border-bottom:1px solid var(--divider-color);margin-bottom:6px;">
        <label style="display:flex;align-items:center;gap:10px;cursor:pointer;user-select:none;padding:4px 0;">
          <div style="position:relative;width:40px;height:22px;flex-shrink:0;">
            <span id="toggle-no-sensor" style="
              position:absolute;inset:0;border-radius:11px;cursor:pointer;transition:background .2s;
              background:${cfg.no_sensor?'var(--primary-color,#03a9f4)':'rgba(0,0,0,0.12)'};
              border:1px solid ${cfg.no_sensor?'var(--primary-color,#03a9f4)':'var(--divider-color)'};
            ">
              <span style="
                position:absolute;top:2px;left:${cfg.no_sensor?'20':'2'}px;width:16px;height:16px;
                border-radius:50%;background:#fff;transition:left .2s;
                box-shadow:0 1px 3px rgba(0,0,0,0.3);
              "></span>
            </span>
          </div>
          <div style="flex:1;">
            <div style="font-size:13px;font-weight:600;color:var(--primary-text-color);">${t.edNoSensor}</div>
            <div style="font-size:11px;color:var(--secondary-text-color);margin-top:2px;line-height:1.4;">${t.edNoSensorHint}</div>
          </div>
        </label>
        ${cfg.no_sensor ? `
        <div style="margin-top:8px;padding:0 2px;">
          <div style="font-size:12px;font-weight:600;color:var(--secondary-text-color);margin-bottom:6px;">${t.edTravelTime}</div>
          <div style="display:flex;align-items:center;gap:10px;">
            <input type="range" id="inp-travel-time" min="5" max="120" step="1"
              value="${cfg.travel_time_sec||20}"
              style="flex:1;accent-color:var(--primary-color);">
            <span id="travel-time-val" style="font-family:monospace;font-size:14px;font-weight:700;color:var(--primary-color);min-width:40px;text-align:right;">${cfg.travel_time_sec||20}s</span>
          </div>
        </div>
        <label style="display:flex;align-items:center;gap:10px;cursor:pointer;user-select:none;padding:8px 2px 2px;">
          <div style="position:relative;width:40px;height:22px;flex-shrink:0;">
            <span id="toggle-pulse-switch" style="
              position:absolute;inset:0;border-radius:11px;cursor:pointer;transition:background .2s;
              background:${cfg.pulse_switch?'var(--primary-color,#03a9f4)':'rgba(0,0,0,0.12)'};
              border:1px solid ${cfg.pulse_switch?'var(--primary-color,#03a9f4)':'var(--divider-color)'};
            ">
              <span style="
                position:absolute;top:2px;left:${cfg.pulse_switch?'20':'2'}px;width:16px;height:16px;
                border-radius:50%;background:#fff;transition:left .2s;
                box-shadow:0 1px 3px rgba(0,0,0,0.3);
              "></span>
            </span>
          </div>
          <div style="flex:1;">
            <div style="font-size:13px;font-weight:600;color:var(--primary-text-color);">${t.edPulseSwitch}</div>
            <div style="font-size:11px;color:var(--secondary-text-color);margin-top:2px;line-height:1.4;">${t.edPulseSwitchHint}</div>
          </div>
        </label>` : ''}
      </div>
      <div style="padding:4px 0 8px;border-bottom:1px solid var(--divider-color);margin-bottom:6px;">
        <label style="display:flex;align-items:center;gap:10px;cursor:pointer;user-select:none;padding:4px 0;">
          <div style="position:relative;width:40px;height:22px;flex-shrink:0;">
            <span id="toggle-invert-sensor" style="
              position:absolute;inset:0;border-radius:11px;cursor:pointer;transition:background .2s;
              background:${cfg.invert_sensor?'var(--primary-color,#03a9f4)':'rgba(0,0,0,0.12)'};
              border:1px solid ${cfg.invert_sensor?'var(--primary-color,#03a9f4)':'var(--divider-color)'};
            ">
              <span style="
                position:absolute;top:2px;left:${cfg.invert_sensor?'20':'2'}px;width:16px;height:16px;
                border-radius:50%;background:#fff;transition:left .2s;
                box-shadow:0 1px 3px rgba(0,0,0,0.3);
              "></span>
            </span>
          </div>
          <div style="flex:1;">
            <div style="font-size:13px;font-weight:600;color:var(--primary-text-color);">${t.edInvertSensor}</div>
            <div style="font-size:11px;color:var(--secondary-text-color);margin-top:2px;line-height:1.4;">${t.edInvertSensorHint}</div>
          </div>
        </label>
      </div>
      <div style="padding:4px 0 8px;border-bottom:1px solid var(--divider-color);margin-bottom:6px;">
        <label style="display:flex;align-items:center;gap:10px;cursor:pointer;user-select:none;padding:4px 0;">
          <div style="position:relative;width:40px;height:22px;flex-shrink:0;">
            <span id="toggle-use-lock" style="
              position:absolute;inset:0;border-radius:11px;cursor:pointer;transition:background .2s;
              background:${cfg.use_lock?'#cc2200':'rgba(0,0,0,0.12)'};
              border:1px solid ${cfg.use_lock?'#ee3311':'var(--divider-color)'};
            ">
              <span style="
                position:absolute;top:2px;left:${cfg.use_lock?'20':'2'}px;width:16px;height:16px;
                border-radius:50%;background:#fff;transition:left .2s;
                box-shadow:0 1px 3px rgba(0,0,0,0.3);
              "></span>
            </span>
          </div>
          <div style="flex:1;">
            <div style="font-size:13px;font-weight:600;color:var(--primary-text-color);">${t.edUseLock || '🔐 Dùng khóa cổng'}</div>
            <div style="font-size:11px;color:var(--secondary-text-color);margin-top:2px;line-height:1.4;">${t.edUseLockHint || 'Khi bật và trạng thái khóa là ON, nút Mở cổng sẽ bị vô hiệu hóa.'}</div>
          </div>
        </label>
      </div>
      ${cfg.no_sensor ? '' : this._entityField('entity_gate_position', t.entityGatePos, 'sensor')}
      ${this._entityField('entity_gate_open',     t.entityGateOpen,  'switch')}
      ${this._entityField('entity_gate_close',    t.entityGateClose, 'switch')}
      ${this._entityField('entity_gate_stop',     t.entityGateStop,  'switch')}
      ${this._entityField('entity_gate_light',    t.entityGateLight, 'switch')}
      ${this._entityField('entity_gate_lock',     t.entityGateLock,  'switch')}
      ${this._entityField('entity_camera',        t.entityCamera,    'camera')}
      ${this._entityField('entity_motion',        t.entityMotion,    'binary_sensor')}
      ${this._entityField('entity_person',        t.entityPerson,    'binary_sensor')}
      ${this._entityField('entity_vehicle',       t.entityVehicle || '🚗 Vehicle detection', 'binary_sensor')}
      ${this._entityField('entity_animal',        t.entityAnimal || '🐾 Animal detection', 'binary_sensor')}
      ${this._entityField('entity_floodlight',    t.entityFloodlight || '🔦 Camera floodlight', 'light')}
      ${this._entityField('entity_floodlight_mode', t.entityFloodlightMode || '🔦 Floodlight mode', 'select')}
      ${this._entityField('entity_recording',     t.entityRecording || '⏺ Camera recording', 'switch')}
      ${this._entityField('entity_flipped',       t.entityFlipped,   'input_boolean')}
    </div>
  </div>

  <!-- 5. Colors -->
  <div class="acc-wrap">
    <div class="acc-head" id="head-colors">
      <ha-icon icon="mdi:format-color-fill"></ha-icon> ${t.colorLabel}
      <span class="acc-arrow" id="arrow-colors">${this._open.colors?'▾':'▸'}</span>
    </div>
    <div class="acc-body" id="body-colors" style="display:${this._open.colors?'block':'none'}">
      ${this._colorRow('accent_color',    t.accentColor)}
      ${this._colorRow('text_color',      t.textColor)}
      ${this._colorRow('btn_open_color',  t.btnOpenColor)}
      ${this._colorRow('btn_stop_color',  t.btnStopColor)}
      ${this._colorRow('btn_close_color', t.btnCloseColor)}
      <div style="margin-top:14px;padding-top:12px;border-top:1px solid var(--divider-color);">
        <div class="sl-row">
          <label>💧 Blur nền (backdrop)</label>
          <input type="range" id="inp-backdrop-blur" min="0" max="30" step="1"
            value="${cfg.backdrop_blur ?? 12}"
            style="flex:1;accent-color:var(--primary-color);">
          <span id="blur-val" class="slv">${cfg.backdrop_blur ?? 12}px</span>
        </div>
      </div>
    </div>
  </div>

  <!-- 6. Background (bottom) -->
  <div class="acc-wrap">
    <div class="acc-head" id="head-bg">
      <ha-icon icon="mdi:palette"></ha-icon> ${t.bgLabel}
      <span class="acc-arrow" id="arrow-bg">${this._open.bg?'▾':'▸'}</span>
    </div>
    <div class="acc-body" id="body-bg" style="display:${this._open.bg?'block':'none'}">
      <div style="font-size:11px;font-weight:700;color:var(--secondary-text-color);margin-bottom:8px;letter-spacing:.4px;">${t.bgPresets}</div>
      <div class="bg-grid">
        ${BG_PRESETS.map(p => {
          const c1 = p.c1||'#888', c2 = p.c2||'#444';
          const isC = p.id === 'custom';
          return `<div class="bgs ${bgP===p.id?'on':''}" data-bg="${p.id}"
            style="${isC?'background:linear-gradient(135deg,#e0e0e0,#bdbdbd);color:#555;text-shadow:none;':'background:linear-gradient(135deg,'+c1+'bb 0%,'+c2+'44 100%);'}">${p.label}</div>`;
        }).join('')}
      </div>
      ${bgP === 'custom' ? `
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
        ${this._colorRow('bg_color1', t.color1)}
        ${this._colorRow('bg_color2', t.color2)}
      </div>` : ''}
    </div>
  </div>
</div>`;

    this._bindEditorEvents();
    this._syncPickers();
  }

  _bindEditorEvents() {
    const sr = this.shadowRoot;

    // backdrop blur slider
    const blurSlider = sr.getElementById('inp-backdrop-blur');
    const blurVal    = sr.getElementById('blur-val');
    if (blurSlider) {
      blurSlider.addEventListener('input', () => {
        const v = parseInt(blurSlider.value);
        this._config = { ...this._config, backdrop_blur: v };
        if (blurVal) blurVal.textContent = v + 'px';
        this._fire();
      });
    }

    // accordion headers
    ['name','lang','bg','colors','style','entities'].forEach(id => {
      const hdr = sr.getElementById('head-' + id);
      if (hdr) hdr.addEventListener('click', () => this._toggleSection(id));
    });

    // language buttons
    sr.querySelectorAll('[data-lang]').forEach(btn =>
      btn.addEventListener('click', () => {
        this._config = { ...this._config, language: btn.dataset.lang };
        this._fire();
        this._render(); // re-render editor with new language labels
      }));

    // bg preset tiles
    sr.querySelectorAll('[data-bg]').forEach(tile =>
      tile.addEventListener('click', () => {
        this._config = { ...this._config, background_preset: tile.dataset.bg };
        this._fire();
        this._render();
      }));

    // color picker header toggle
    sr.querySelectorAll('[data-cp]').forEach(hdr =>
      hdr.addEventListener('click', () => {
        const k = hdr.dataset.cp;
        this._picker = this._picker === k ? null : k;
        this._render();
      }));

    // native color input
    sr.querySelectorAll('[data-cp-native]').forEach(inp => {
      inp.addEventListener('input', () => {
        const ci   = inp.closest('.ci');
        const sw   = ci?.querySelector('.ci-swatch');
        const code = ci?.querySelector('.ci-code');
        const hex  = sr.querySelector(`[data-cp-hex="${inp.dataset.cpNative}"]`);
        if (sw)   sw.style.background = inp.value;
        if (code) code.textContent    = inp.value;
        if (hex)  hex.value           = inp.value.replace('#','');
        this._config[inp.dataset.cpNative] = inp.value;
        this._fire();
      });
      inp.addEventListener('change', () => {
        this._config[inp.dataset.cpNative] = inp.value;
        this._fire();
        this._render();
      });
    });

    // hex text input
    sr.querySelectorAll('[data-cp-hex]').forEach(inp =>
      inp.addEventListener('change', () => {
        const val = '#' + inp.value.replace('#','');
        if (/^#[0-9a-fA-F]{6}$/.test(val)) {
          this._config[inp.dataset.cpHex] = val;
          this._fire();
          this._render();
        }
      }));

    // swatch dot
    sr.querySelectorAll('[data-cp-dot]').forEach(dot =>
      dot.addEventListener('click', () => {
        this._config[dot.dataset.cpDot] = dot.dataset.color;
        this._fire();
        this._render();
      }));

    // gate style buttons
    sr.querySelectorAll('[data-style]').forEach(btn =>
      btn.addEventListener('click', () => {
        this._config = { ...this._config, gate_style: btn.dataset.style };
        this._fire();
        this._render();
      }));

    // gate title / zone text inputs — update state on every keystroke but only fire on blur/Enter
    const titleInp = sr.getElementById('inp-gate-title');
    const zoneInp  = sr.getElementById('inp-gate-zone');
    const wireTextInput = (el, key) => {
      if (!el) return;
      el.addEventListener('input', () => {
        this._config = { ...this._config, [key]: el.value };
        // do NOT call _fire() here — HA would re-render editor and destroy the input
      });
      el.addEventListener('change', () => {
        this._config = { ...this._config, [key]: el.value };
        this._fire();
      });
      el.addEventListener('blur', () => {
        this._config = { ...this._config, [key]: el.value };
        this._fire();
      });
      el.addEventListener('keydown', e => {
        if (e.key === 'Enter') { el.blur(); }
      });
    };
    wireTextInput(titleInp, 'gate_title');
    wireTextInput(zoneInp,  'gate_zone');

    const homeNameInp = sr.getElementById('inp-home-name');
    wireTextInput(homeNameInp, 'home_name');

    const plate1Inp = sr.getElementById('inp-plate-line1');
    const plate2Inp = sr.getElementById('inp-plate-line2');
    wireTextInput(plate1Inp, 'plate_line1');
    wireTextInput(plate2Inp, 'plate_line2');
    wireTextInput(sr.getElementById('inp-car-model'), 'car_model');
    wireTextInput(sr.getElementById('inp-car-trim'), 'car_trim');

    // country / car brand / car colour
    [['inp-country', 'country'], ['inp-house-theme', 'house_theme'], ['inp-side-door', 'side_door'], ['inp-car-brand', 'car_brand'], ['inp-car-color', 'car_color']].forEach(([id, key]) => {
      const el = sr.getElementById(id);
      if (!el) return;
      el.addEventListener('change', () => {
        this._config = { ...this._config, [key]: el.value };
        this._fire();
        this._render();
      });
    });

    // no-sensor toggle
    const noSensorToggle = sr.getElementById('toggle-no-sensor');
    if (noSensorToggle) {
      noSensorToggle.addEventListener('click', () => {
        const val = !this._config.no_sensor;
        this._config = { ...this._config, no_sensor: val };
        this._fire();
        this._render();
      });
    }

    // invert-sensor toggle
    const invertSensorToggle = sr.getElementById('toggle-invert-sensor');
    if (invertSensorToggle) {
      invertSensorToggle.addEventListener('click', () => {
        const val = !this._config.invert_sensor;
        this._config = { ...this._config, invert_sensor: val };
        this._fire();
        this._render();
      });
    }

    // use-lock toggle
    const useLockToggle = sr.getElementById('toggle-use-lock');
    if (useLockToggle) {
      useLockToggle.addEventListener('click', () => {
        const val = !this._config.use_lock;
        this._config = { ...this._config, use_lock: val };
        this._fire();
        this._render();
      });
    }

    // pulse-switch toggle
    const pulseSwitchToggle = sr.getElementById('toggle-pulse-switch');
    if (pulseSwitchToggle) {
      pulseSwitchToggle.addEventListener('click', () => {
        const val = !this._config.pulse_switch;
        this._config = { ...this._config, pulse_switch: val };
        this._fire();
        this._render();
      });
    }

    // travel time slider — live preview, fire on change
    const travelSlider = sr.getElementById('inp-travel-time');
    const travelVal    = sr.getElementById('travel-time-val');
    if (travelSlider) {
      travelSlider.addEventListener('input', () => {
        this._config = { ...this._config, travel_time_sec: parseInt(travelSlider.value) };
        if (travelVal) travelVal.textContent = travelSlider.value + 's';
      });
      travelSlider.addEventListener('change', () => {
        this._config = { ...this._config, travel_time_sec: parseInt(travelSlider.value) };
        this._fire();
      });
    }

    // ha-entity-picker — listen for value-changed (native HA event)
    sr.querySelectorAll('ha-entity-picker').forEach(picker =>
      picker.addEventListener('value-changed', e => {
        const k = picker.dataset.key;
        const v = e.detail.value;
        const c = { ...this._config };
        if (v) c[k] = v; else delete c[k];
        this._config = c;
        this._fire();
      }));
  }
}

// ─── Register ──────────────────────────────────────────────────────────────────
customElements.define('gate-card',        GateCard);
customElements.define('gate-card-editor', GateCardEditor);

window.customCards = window.customCards || [];
window.customCards.push({
  type: 'gate-card',
  name: 'Gate Card',
  description: 'Smart gate control card with live camera, SVG gate diagram (slide/shutter/cover 2-wing), motion/person sensors and full visual editor. By @doanlong1412',
  preview: true,
  documentationURL: 'https://github.com/doanlong1412/gate-card',
});
