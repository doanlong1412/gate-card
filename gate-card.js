/**
 * Gate Card — Custom Home Assistant Lovelace Card
 * V1.0 Designed by @doanlong1412 from 🇻🇳 Vietnam
 * HACS-compatible Web Component
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
    open: 'Mở Cổng', stop: 'Dừng', close: 'Đóng Cổng',
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
    entityGateLight: '💡 Switch Đèn cổng', entityCamera: '📷 Camera',
    entityMotion: '🏃 Cảm biến chuyển động', entityPerson: '👤 Cảm biến người',
    entityFlipped: '🔄 Input Boolean lật card',
    color1: 'Màu 1 (trên trái)', color2: 'Màu 2 (dưới phải)',
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
    entityGateLight: '💡 Gate light switch', entityCamera: '📷 Camera',
    entityMotion: '🏃 Motion sensor', entityPerson: '👤 Person sensor',
    entityFlipped: '🔄 Flip state boolean',
    color1: 'Color 1 (top left)', color2: 'Color 2 (bottom right)',
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
    entityGateLight: '💡 Schalter Licht', entityCamera: '📷 Kamera',
    entityMotion: '🏃 Bewegungssensor', entityPerson: '👤 Personensensor',
    entityFlipped: '🔄 Input Boolean Flip',
    color1: 'Farbe 1 (oben links)', color2: 'Farbe 2 (unten rechts)',
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
    entityGateLight: '💡 Interrupteur Lumière', entityCamera: '📷 Caméra',
    entityMotion: '🏃 Détecteur de mouvement', entityPerson: '👤 Détecteur de personne',
    entityFlipped: '🔄 Booléen de retournement',
    color1: 'Couleur 1 (haut gauche)', color2: 'Couleur 2 (bas droite)',
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
    entityGateLight: '💡 Schakelaar Licht', entityCamera: '📷 Camera',
    entityMotion: '🏃 Bewegingssensor', entityPerson: '👤 Persoonssensor',
    entityFlipped: '🔄 Invoerbooleaan flip',
    color1: 'Kleur 1 (linksboven)', color2: 'Kleur 2 (rechtsonder)',
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
    entityGateLight: '💡 Przełącznik Światło', entityCamera: '📷 Kamera',
    entityMotion: '🏃 Czujnik ruchu', entityPerson: '👤 Czujnik osoby',
    entityFlipped: '🔄 Wartość logiczna odwrócenia',
    color1: 'Kolor 1 (lewy górny)', color2: 'Kolor 2 (prawy dolny)',
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
    entityGateLight: '💡 Brytare Belysning', entityCamera: '📷 Kamera',
    entityMotion: '🏃 Rörelsesensor', entityPerson: '👤 Personsensor',
    entityFlipped: '🔄 Boolesk flip',
    color1: 'Färg 1 (övre vänster)', color2: 'Färg 2 (nedre höger)',
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
    entityGateLight: '💡 Kapcsoló Világítás', entityCamera: '📷 Kamera',
    entityMotion: '🏃 Mozgásérzékelő', entityPerson: '👤 Személyérzékelő',
    entityFlipped: '🔄 Logikai flip',
    color1: 'Szín 1 (bal felső)', color2: 'Szín 2 (jobb alsó)',
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
    entityGateLight: '💡 Přepínač Světlo', entityCamera: '📷 Kamera',
    entityMotion: '🏃 Senzor pohybu', entityPerson: '👤 Senzor osoby',
    entityFlipped: '🔄 Logická hodnota překlápění',
    color1: 'Barva 1 (vlevo nahoře)', color2: 'Barva 2 (vpravo dole)',
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
    entityGateLight: '💡 Switch Luce', entityCamera: '📷 Telecamera',
    entityMotion: '🏃 Sensore movimento', entityPerson: '👤 Sensore presenza',
    entityFlipped: '🔄 Input Boolean flip',
    color1: 'Colore 1 (in alto a sinistra)', color2: 'Colore 2 (in basso a destra)',
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
  background_preset: 'default',
  bg_color1: '#001e2b',
  bg_color2: '#12c6f3',
  accent_color: '#00ffcc',
  btn_open_color: '#00ff96',
  btn_stop_color: '#ff5252',
  btn_close_color: '#00dcff',
  text_color: '#ffffff',
  card_height: 320,
  entity_gate_position: '',
  entity_gate_open: '',
  entity_gate_close: '',
  entity_gate_stop: '',
  entity_gate_light: '',
  entity_camera: '',
  entity_motion: '',
  entity_person: '',
  entity_flipped: '',
};

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
    this._syncCamera();
  }

  connectedCallback()    { this._interval = setInterval(() => this._patch(), 30000); }
  disconnectedCallback() {
    clearInterval(this._interval);
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
    const cardH = parseInt(cfg.card_height, 10) || 320;
    const bg    = presetGradient(cfg.background_preset, cfg.bg_color1, cfg.bg_color2);
    const accent= cfg.accent_color || '#00ffcc';

    this.shadowRoot.innerHTML = `
<style>
@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;700&display=swap');
:host{display:block;}*{box-sizing:border-box;}
.card{
  background:${bg};
  backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);
  border-radius:22px;border:1px solid rgba(0,255,255,0.3);
  box-shadow:0 12px 40px rgba(0,0,0,.55),inset 0 1px 0 rgba(255,255,255,.15);
  overflow:hidden;position:relative;height:${cardH}px;
  display:flex;flex-direction:column;
}
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
.cam-col{flex:0 0 45%;max-width:45%;border-left:1px solid rgba(0,255,255,.2);overflow:hidden;position:relative;background:#000;display:flex;flex-direction:column;}
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
.flip-btn{display:flex;align-items:center;justify-content:center;
  background:rgba(0,0,0,.35);border-top:1px solid rgba(0,255,255,.2);
  cursor:pointer;backdrop-filter:blur(4px);flex-shrink:0;user-select:none;}
.flip-btn:active{filter:brightness(1.3);}
.light-btn{margin:0 12px 10px 18px;display:inline-flex;align-items:center;gap:7px;
  padding:5px 12px;border-radius:8px;cursor:pointer;backdrop-filter:blur(4px);flex-shrink:0;}
.svg-wrap{padding:6px 8px 0;flex-shrink:0;}
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
      set('f-pct',    el => { el.textContent = `${pct}%`; });
      set('f-fill',   el => { el.style.width = `${pct}%`; el.style.background = `linear-gradient(90deg,#00ccaa,${pct>50?'#00ffcc':'#00eeff'})`; });
      set('f-lbtn',   el => { el.style.background = lightOn?'rgba(255,220,50,0.25)':'rgba(0,0,0,0.3)'; el.style.border=`1px solid ${lightOn?'rgba(255,220,50,0.7)':'rgba(255,255,255,0.25)'}`; });
      set('f-ltxt',   el => { el.textContent=t.light(lightOn); el.style.color=lightOn?'#ffd740':'rgba(255,255,255,0.7)'; el.style.textShadow=lightOn?'0 0 8px rgba(255,215,64,0.9)':'none'; });
      set('f-mt',     el => { el.textContent=mTime; el.style.color=mColor; el.style.fontWeight=motionOn?'700':'400'; });
      set('f-pt',     el => { el.textContent=pTime; el.style.color=pColor; el.style.fontWeight=personOn?'700':'400'; });

    } else {
      const { pos, isOpen, isClose, isStop, isMoving, isClosed, statusText, statusColor, subText } = st;
      const bOpen  = cfg.btn_open_color  || '#00ff96';
      const bStop  = cfg.btn_stop_color  || '#ff5252';
      const bClose = cfg.btn_close_color || '#00dcff';
      const set = (id, fn) => { const el = sr.getElementById(id); if(el) fn(el); };

      const svgEl = sr.getElementById('b-svg');
      if (svgEl) svgEl.innerHTML = this._svgInner(pos, isOpen, isClose, isStop, isClosed, isMoving);

      set('b-dot',  el => { el.style.background = statusColor; el.style.boxShadow = `0 0 8px ${statusColor}`; });
      set('b-stat', el => { el.textContent = statusText; el.style.color = statusColor; el.style.textShadow = `0 0 10px ${statusColor}99`; });
      set('b-sub',  el => { el.textContent = subText; });
      set('b-wo',   el => { el.style.display = isOpen  ? '' : 'none'; });
      set('b-wc',   el => { el.style.display = isClose ? '' : 'none'; });

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
      applyBtn('b-bo', isOpen,  bOpen,  pos >= 99);
      applyBtn('b-bs', isStop,  bStop,  false);
      applyBtn('b-bc', isClose, bClose, pos <= 1);
    }
  }

  // ── Compute gate status ──────────────────────────────────────────────────────
  _computeStatus() {
    const hass  = this._hass;
    const cfg   = this._config;
    const t     = this.t;
    const pos   = parsePos(hass, cfg.entity_gate_position);
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
    this._hass.callService(entityId.split('.')[0], 'toggle', { entity_id: entityId });
  }

  // ── Front HTML ───────────────────────────────────────────────────────────────
  _frontHTML() {
    const cfg    = this._config;
    const t      = this.t;
    const accent = cfg.accent_color || '#00ffcc';
    const tc     = cfg.text_color   || '#ffffff';
    const cardH  = parseInt(cfg.card_height, 10) || 320;
    const btnH   = Math.max(34, Math.round(cardH * 0.11));

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
      <div style="padding:6px 12px 8px 18px;flex:1;display:flex;flex-direction:column;justify-content:center;overflow:hidden;">
        <div style="display:flex;align-items:center;gap:5px;margin-bottom:10px;">
          <div style="font-size:30px;line-height:1;filter:drop-shadow(0 0 14px rgba(0,0,0,.8));">🚧</div>
          <div>
            <div style="font-family:Rajdhani,sans-serif;font-size:24px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:${tc};line-height:1;text-shadow:0 2px 8px rgba(0,0,0,.8);">${cfg.gate_title || t.title}</div>
            <div style="font-family:monospace;font-size:11px;letter-spacing:1.2px;color:rgba(255,255,255,.9);margin-top:5px;">${cfg.gate_zone || t.zone}</div>
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:7px;margin-top:4px;">
          <div id="f-dot" style="width:9px;height:9px;border-radius:50%;flex-shrink:0;background:#00ffcc;box-shadow:0 0 10px #00ffcc;"></div>
          <span id="f-stxt" style="font-family:monospace;font-size:11px;letter-spacing:1.5px;font-weight:700;color:#00ffcc;text-shadow:0 0 10px #00ffcc;"></span>
        </div>
        <div id="f-sub" style="font-family:monospace;font-size:10px;color:rgba(255,255,255,.55);margin-top:6px;letter-spacing:1px;"></div>
        <div style="margin-top:10px;">
          <div style="display:flex;justify-content:space-between;font-family:monospace;font-size:9px;color:rgba(255,255,255,.4);margin-bottom:3px;letter-spacing:1px;">
            <span>${t.posClose}</span>
            <span id="f-pct" style="color:rgba(255,255,255,.7);font-weight:700;">0%</span>
            <span>${t.posOpen}</span>
          </div>
          <div class="prog-track"><div id="f-fill" class="prog-fill" style="width:0%;background:linear-gradient(90deg,#00ccaa,#00eeff);"></div></div>
        </div>
      </div>
      <div id="f-lbtn" class="light-btn" style="background:rgba(0,0,0,.3);border:1px solid rgba(255,255,255,.25);" data-action="toggle-light">
        <span style="font-size:15px;">🔦</span>
        <span id="f-ltxt" style="font-family:monospace;font-size:10px;letter-spacing:1.5px;color:rgba(255,255,255,.7);font-weight:700;">${t.light(false)}</span>
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
  <div class="sensor-row">
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
  </div>
  <div class="flip-btn" style="height:${btnH}px;" data-action="flip">
    <span style="font-family:monospace;font-size:11px;letter-spacing:4px;color:${accent};text-transform:uppercase;text-shadow:0 0 10px ${accent}99;">${t.control}</span>
  </div>
</div>`;
  }

  // ── Back HTML ────────────────────────────────────────────────────────────────
  _backHTML() {
    const cfg   = this._config;
    const t     = this.t;
    const bOpen = cfg.btn_open_color  || '#00ff96';
    const bStop = cfg.btn_stop_color  || '#ff5252';
    const bClose= cfg.btn_close_color || '#00dcff';
    const cardH = parseInt(cfg.card_height, 10) || 320;
    const btnH  = Math.max(30, Math.round(cardH * 0.10));
    const ctrlH = Math.max(48, Math.round(cardH * 0.15));

    return `
<div class="back">
  <div class="svg-wrap">
    <svg id="b-svg" viewBox="0 0 560 175" xmlns="http://www.w3.org/2000/svg" style="display:block;width:100%;max-width:560px;margin:0 auto;">
      ${this._svgInner(0, false, false, false, true, false)}
    </svg>
    <div class="status-row">
      <div id="b-dot" style="width:9px;height:9px;border-radius:50%;background:#00ccaa;box-shadow:0 0 8px #00ccaa;flex-shrink:0;"></div>
      <span id="b-stat" style="font-size:12px;font-weight:700;letter-spacing:2px;color:#00ccaa;text-transform:uppercase;text-shadow:0 0 10px #00ccaa99;"></span>
      <span id="b-sub" style="font-size:10px;color:rgba(255,255,255,.55);letter-spacing:1px;margin-left:4px;"></span>
    </div>
  </div>
  <div id="b-wo" class="warn-scroll" style="display:none;"><span class="warn-inner"><span style="padding-right:60px;">${t.warn_open}</span><span style="padding-right:60px;">${t.warn_open}</span><span style="padding-right:60px;">${t.warn_open}</span></span></div>
  <div id="b-wc" class="warn-scroll" style="display:none;"><span class="warn-inner"><span style="padding-right:60px;">${t.warn_close}</span><span style="padding-right:60px;">${t.warn_close}</span><span style="padding-right:60px;">${t.warn_close}</span></span></div>
  <div class="ctrl-row" style="flex:1;">
    <button id="b-bo" class="ctrl-btn" style="margin:4px 3px 4px 0;height:${ctrlH}px;" data-action="open-gate">
      <ha-icon icon="mdi:arrow-expand-left" style="color:${bOpen}b3;--mdi-icon-size:18px;"></ha-icon>
      <span class="bl" style="font-family:monospace;font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:rgba(255,255,255,.85);">${t.open}</span>
    </button>
    <button id="b-bs" class="ctrl-btn" style="margin:4px 3px;height:${ctrlH}px;" data-action="stop-gate">
      <ha-icon icon="mdi:stop" style="color:${bStop}b3;--mdi-icon-size:18px;"></ha-icon>
      <span class="bl" style="font-family:monospace;font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:rgba(255,255,255,.85);">${t.stop}</span>
    </button>
    <button id="b-bc" class="ctrl-btn" style="margin:4px 0 4px 3px;height:${ctrlH}px;" data-action="close-gate">
      <ha-icon icon="mdi:arrow-expand-right" style="color:${bClose}b3;--mdi-icon-size:18px;"></ha-icon>
      <span class="bl" style="font-family:monospace;font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:rgba(255,255,255,.85);">${t.close}</span>
    </button>
  </div>
  <div class="flip-btn" style="height:${btnH}px;border-top:1px solid rgba(0,255,255,.15);" data-action="flip">
    <span style="font-family:monospace;font-size:11px;letter-spacing:3px;color:rgba(255,255,255,.75);text-transform:uppercase;text-shadow:0 0 8px rgba(0,255,255,.4);">${t.back}</span>
  </div>
</div>`;
  }

  // ── SVG inner ────────────────────────────────────────────────────────────────
  _svgInner(pos, isOpening, isClosing, isStopped, isClosed, isMoving) {
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
<text x="280" y="168" text-anchor="middle" font-size="9" fill="rgba(255,255,255,.35)" font-family="monospace" letter-spacing="1">${t.position(pos)}</text>`;
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
        'open-gate':    cfg.entity_gate_open,
        'stop-gate':    cfg.entity_gate_stop,
        'close-gate':   cfg.entity_gate_close,
      };
      this._toggle(map[action]);
    });
  }

  // Swap front↔back without tearing down the whole shadow DOM
  // (preserves camera stream and event listeners on shadowRoot)
  _swapFace() {
    const inner = this.shadowRoot.getElementById('inner');
    if (!inner) { this._buildDOM(); return; }
    inner.innerHTML = this._flipped ? this._backHTML() : this._frontHTML();
    // Re-bind inner click targets (shadowRoot listener already exists)
    this._patch();
    requestAnimationFrame(() => this._syncCamera());
  }

  getCardSize() { return Math.ceil((parseInt(this._config.card_height,10)||320) / 50); }
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
    this._open   = { name: true, lang: true, bg: true, colors: false, size: false, entities: true };
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
    <span style="color:var(--secondary-text-color);font-weight:400;">V1.0 · Designed by @doanlong1412 from 🇻🇳 Vietnam</span>
  </div>

  <!-- Gate name & zone -->
  <div class="acc-wrap">
    <div class="acc-head" id="head-name">
      <ha-icon icon="mdi:tag-edit-outline"></ha-icon> Tên cổng
      <span class="acc-arrow" id="arrow-name">${this._open.name?'▾':'▸'}</span>
    </div>
    <div class="acc-body" id="body-name" style="display:${this._open.name?'block':'none'}">
      <div class="row">
        <label>🚧 Tên cổng (hiển thị trên card)</label>
        <input class="txt-inp" type="text" id="inp-gate-title"
          placeholder="${t.title}" value="${cfg.gate_title||''}"/>
      </div>
      <div class="row">
        <label>📍 Zone / mô tả phụ</label>
        <input class="txt-inp" type="text" id="inp-gate-zone"
          placeholder="${t.zone}" value="${cfg.gate_zone||''}"/>
      </div>
    </div>
  </div>

  <!-- Language -->
  <div class="acc-wrap">
    <div class="acc-head" id="head-lang">
      <ha-icon icon="mdi:translate"></ha-icon> Ngôn ngữ
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

  <!-- Background -->
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

  <!-- Colors -->
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
    </div>
  </div>

  <!-- Size -->
  <div class="acc-wrap">
    <div class="acc-head" id="head-size">
      <ha-icon icon="mdi:resize"></ha-icon> ${t.sizeLabel}
      <span class="acc-arrow" id="arrow-size">${this._open.size?'▾':'▸'}</span>
    </div>
    <div class="acc-body" id="body-size" style="display:${this._open.size?'block':'none'}">
      <div class="sl-row">
        <label>${t.cardHeight}</label>
        <input type="range" id="hslider" min="200" max="600" step="10" value="${cfg.card_height||320}"/>
        <span class="slv" id="hval">${cfg.card_height||320}px</span>
      </div>
    </div>
  </div>

  <!-- Entities -->
  <div class="acc-wrap">
    <div class="acc-head" id="head-entities">
      <ha-icon icon="mdi:lightning-bolt"></ha-icon> ${t.entityLabel}
      <span class="acc-arrow" id="arrow-entities">${this._open.entities?'▾':'▸'}</span>
    </div>
    <div class="acc-body" id="body-entities" style="display:${this._open.entities?'block':'none'}">
      ${this._entityField('entity_gate_position', t.entityGatePos,   'sensor')}
      ${this._entityField('entity_gate_open',     t.entityGateOpen,  'switch')}
      ${this._entityField('entity_gate_close',    t.entityGateClose, 'switch')}
      ${this._entityField('entity_gate_stop',     t.entityGateStop,  'switch')}
      ${this._entityField('entity_gate_light',    t.entityGateLight, 'switch')}
      ${this._entityField('entity_camera',        t.entityCamera,    'camera')}
      ${this._entityField('entity_motion',        t.entityMotion,    'binary_sensor')}
      ${this._entityField('entity_person',        t.entityPerson,    'binary_sensor')}
      ${this._entityField('entity_flipped',       t.entityFlipped,   'input_boolean')}
    </div>
  </div>
</div>`;

    this._bindEditorEvents();
    this._syncPickers();
  }

  _bindEditorEvents() {
    const sr = this.shadowRoot;

    // accordion headers
    ['name','lang','bg','colors','size','entities'].forEach(id => {
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

    // height slider
    const slider = sr.getElementById('hslider');
    const valEl  = sr.getElementById('hval');
    if (slider) {
      slider.addEventListener('input', () => {
        if (valEl) valEl.textContent = slider.value + 'px';
      });
      slider.addEventListener('change', () => {
        this._config = { ...this._config, card_height: parseInt(slider.value, 10) };
        this._fire();
      });
    }

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
  description: 'Smart gate control card with live camera, SVG gate diagram, motion/person sensors and full visual editor. By @doanlong1412',
  preview: true,
  documentationURL: 'https://github.com/doanlong1412/gate-card',
});
