# KI-tomat Designsystem

Verbindliche Referenz für alle UI-Beiträge im `web/`-Unterordner. Quelle der Wahrheit: [`web/src/styles/global.css`](../src/styles/global.css). Diese Doku spiegelt nur — Änderungen am Designsystem werden in `global.css` gemacht, nicht hier.

## Inhalt

1. [Goldene Regeln](#goldene-regeln)
2. [Farbpalette](#farbpalette)
3. [Typography](#typography)
4. [Spacing](#spacing)
5. [Border Radii](#border-radii)
6. [Schatten](#schatten)
7. [Buttons](#buttons)
8. [Cards](#cards)
9. [Badges und Status](#badges-und-status)
10. [Inputs und Forms](#inputs-und-forms)
11. [Navigation](#navigation)
12. [Light, Dark und Print](#light-dark-und-print)
13. [Komponenten-Bestand](#komponenten-bestand)
14. [Migrations-Hinweise](#migrations-hinweise)

---

## Goldene Regeln

1. **CSS-Variablen statt Hex-Werte.** Niemals `#E63329` im JSX/CSS — immer `var(--tomato)`.
2. **Vorhandene Komponenten zuerst.** Vor Neuanlage prüfen, ob `<Icon>`, `<Avatar>`, `<MetricTile>`, `<Badge>`, `<EmptyState>` etc. passen.
3. **Neue Komponenten im Stil der bestehenden** — gleiche Token, gleiche Klassen-Konventionen.
4. **Keine Inline-Styles** außer für dynamische Werte (z. B. eine User-spezifische Avatar-Farbe), die nicht als Klasse ausdrückbar sind.
5. **Seitenstruktur respektieren** — neue Views nutzen `<main className="page"> > <div className="container">`-Wrapper.
6. **Muster ab zweifacher Nutzung in eine Komponente** unter `src/components/`.
7. **Light und Dark Mode immer testen.** Alle neuen Elemente müssen beide Modi unterstützen — Dark-Overrides leben unter `body.dark { … }` in `global.css`.
8. **Print-Styles im Blick:** strukturelle Änderungen ggf. in `src/styles/print.css` spiegeln.
9. **Pfade ohne Leerzeichen, Klammern oder Umlaute.** Vite-Configs nutzen `path.resolve()`, nie String-Konkat.

---

## Farbpalette

**Verwendung:** ausschließlich über CSS-Variablen. Werte unten sind dokumentarisch — sie können sich ändern, der Variablenname nicht.

### Surfaces

Backgrounds und Schichten — von dunkel (Page-BG) nach hell (Card-Inner).

| Variable | Light | Dark | Verwendung |
|---|---|---|---|
| `--bg` | `#FBF9F5` | `#0D0E11` | Hauptseiten-Hintergrund |
| `--bg-2` | `#F1EEE6` | `#15171C` | Subtiler Hover-Background, Strip-Sections |
| `--surface` | `#FFFFFF` | `#1A1D23` | Karten, Modals, Headers |
| `--surface-2` | `#FAF7F1` | `#21242B` | Sekundäre Karten, Inputs |
| `--surface-3` | `#F6F2EA` | `#272A32` | Hover auf Surface-2 |

### Ink (Schrift)

| Variable | Light | Dark | Verwendung |
|---|---|---|---|
| `--ink` | `#1A1916` | `#F5F2EC` | Primärtext, Headlines |
| `--ink-2` | `#4A4742` | `#D6D2CA` | Sekundärtext, Labels |
| `--ink-3` | `#847F77` | `#ADA89E` | Muted, Helper-Text, Captions |

### Lines (Borders)

| Variable | Light | Dark |
|---|---|---|
| `--line` | `#E8E4DC` | `rgba(255,255,255,.07)` |
| `--line-2` | `#D9D3C7` | `rgba(255,255,255,.12)` |
| `--line-strong` | `#C7C0B0` | `rgba(255,255,255,.22)` |

### Brand (Tomato)

Primärfarbe der Marke — sparsam verwenden, vor allem für CTAs, aktive States, Brand-Akzente.

| Variable | Light | Dark | Verwendung |
|---|---|---|---|
| `--tomato` | `#E63329` | gleich | Primary-Button-Gradient, Akzente |
| `--tomato-2` | `#F0524A` | `#F4554C` | Hover, Hellere Variante |
| `--tomato-deep` | `#B82318` | `#FF6B62` | Tiefe Akzente, Focus-Rings |
| `--tomato-soft` | `#FDECEA` | `rgba(230,51,41,.18)` | Hintergrund für Tomato-Tints |
| `--tomato-tint` | `#FFF6F5` | `rgba(230,51,41,.08)` | Sehr subtiler Background |
| `--tomato-glow` | `rgba(230,51,41,.35)` | `rgba(230,51,41,.55)` | Shadows, Focus-Glow |

### Status-Farben

Jede Status-Familie hat 4 Varianten: Haupt-, Soft-Background, Ink (für Text auf Soft), Border (nur Light).

| Familie | Bedeutung | Variablen |
|---|---|---|
| `--leaf-*` | Erfolg, Grün | `--leaf`, `--leaf-soft`, `--leaf-ink`, `--leaf-border` |
| `--amber-*` | Warnung, Gelb | `--amber`, `--amber-soft`, `--amber-ink`, `--amber-border` |
| `--slate-*` | Neutral, Grau | `--slate`, `--slate-soft`, `--slate-ink` |
| `--bronze-*` | Auszeichnung, Gold | `--bronze`, `--bronze-soft`, `--bronze-ink` |
| `--post-*` | Speziell, Lila | `--post`, `--post-soft`, `--post-ink` |

---

## Typography

### Schriften (via Google Fonts CDN, siehe [ADR-005](decisions/005-fonts.md))

- **Manrope** — Primärschrift (Sans-Serif), Weights 400/500/600/700
- **JetBrains Mono** — Monospace für Labels, Badges, technische Texte, Code-Snippets

### Klassen

| Klasse | Größe / Weight | Verwendung |
|---|---|---|
| `.h1` | 44px / 700 | Hauptüberschrift einer Seite, einmal pro View |
| `.h2` | 28px / 700 | Section-Überschrift |
| `.h3` | 19px / 700 | Sub-Section-Überschrift |
| `.h-eyebrow` | 12px / 500 / Mono / Uppercase | Mini-Eyebrow über Headlines, „AP1a Platzhalter", „SECTION" |
| `.muted` | Erbschrift / `--ink-3` | Helper-Text, Captions, Subtitle |

### Letter-Spacing

Tight für große Headlines (`-.025em` bei `.h1`), normal für Body, ausgeweitet (`.05em`) für `.h-eyebrow`.

---

## Spacing

8px-Raster mit gezielten Zwischenstufen. Verwende möglichst diese Werte für Padding, Margin, Gap:

`3px | 6px | 8px | 12px | 14px | 18px | 22px | 24px | 28px | 32px | 36px | 56px | 80px`

Beispiele:
- Card-Innenabstand: `22px` oder `28px`
- Section-Trenner: `56px` oder `80px`
- Inline-Gap zwischen Icon + Text: `8px` oder `12px`

---

## Border Radii

| Variable | Wert | Verwendung |
|---|---|---|
| `--radius-xs` | 6px | Kleine Badges, Tags |
| `--radius-sm` | 10px | Buttons (Default), Inputs |
| `--radius` | 14px | Standard-Card-Radius |
| `--radius-lg` | 18px | Featured Cards, Modals |
| `--radius-xl` | 22px | Hero-Sections |
| `--radius-2xl` | 28px | Auffällige Hero-Container, Glow-Cards |

---

## Schatten

Fünf semantische Stufen — von subtil (xs) zu prominent (xl). Light verwendet weiche, helle Schatten; Dark deutlich tiefere, glossigere.

| Variable | Verwendung |
|---|---|
| `--shadow-xs` | Default-Cards in Ruhe |
| `--shadow-sm` | Subtile Erhebung, Toast |
| `--shadow-md` | Hover auf Karten, Dropdowns |
| `--shadow-lg` | Modals (kleine) |
| `--shadow-xl` | Modals (große), Floating Action |

Zusätzlich: `--highlight` für die obere Glanzkante auf Cards (innerhalb der Shadow-Komposition).

---

## Buttons

### Klassen

| Klasse | Stil | Verwendung |
|---|---|---|
| `.btn` | Basis (immer kombinieren) | Pflichtklasse |
| `.btn-primary` | Tomato-Gradient + weiß | CTA, Submit, Hauptaktion |
| `.btn-secondary` | Surface-2 + Border | Sekundäraktion, Cancel |
| `.btn-ghost` | Transparent + Hover-BG | Inline-Aktionen, Toggle |
| `.btn-sm` | Klein (padding 7/12) | Toolbar, dichte Listen |
| `.btn-lg` | Groß (padding 13/22) | Hero-CTAs |

### Beispiel

```jsx
<button className="btn btn-primary">Beitrag einreichen</button>
<button className="btn btn-secondary btn-sm">Filter</button>
<button className="btn btn-ghost">Verwerfen</button>
```

---

## Cards

### Klassen

| Klasse | Verwendung |
|---|---|
| `.card` | Basis-Container, Border + Shadow + Highlight |
| `.card-hover` | Optional, für klickbare Karten — Hover-Lift |

### Aufbau

```jsx
<div className="card" style={{ padding: 22 }}>
  <div className="h-eyebrow">Kategorie</div>
  <h3 className="h3">Titel</h3>
  <p className="muted">Beschreibung</p>
</div>
```

Padding wird **nicht** automatisch gesetzt — bewusst gewählt (manche Karten haben Bilder ohne Padding am Rand). Standard-Padding: `22px` oder `28px`.

---

## Badges und Status

### Basis-Klasse + Varianten

| Klasse | Farbe / Bedeutung |
|---|---|
| `.badge` | Basis (immer kombinieren) |
| `.badge-green` | Leaf — OK, Approved |
| `.badge-yellow` | Amber — Pending, Warning |
| `.badge-red` | Tomato — Risiko, Blocker |
| `.badge-neutral` | Slate — neutral, Info |
| `.badge-bronze` | Bronze — Auszeichnung, Gold-Status |
| `.badge-post` | Post — speziell, Phase-Marker |
| `.badge-draft` | Slate Soft — WIP |
| `.badge-comingsoon` | Subtil — Roadmap-Vorausschau |

### React-Komponenten

Für domänenspezifische Badges existieren typisierte Wrapper (Implementierung folgt in AP3a/AP4):

- `<RiskBadge level="low|medium|high">` — Risiko-Klassifizierung
- `<TypeBadge type="prompt|dataset|industry">` — Artefakt-Typ
- `<GoldBadge>` — Gold-Status-Auszeichnung
- `<PhaseBadge phase="draft|review|published">` — Workflow-Phase

Vor Neuanlage: schaut, ob einer dieser Wrapper passt.

---

## Inputs und Forms

| Klasse | Verwendung |
|---|---|
| `.input` | Text-, Number-, Date-Inputs |
| `.select` | Dropdown-Selects |

Beide nutzen Surface-2 + Border + Inset-Shadow. **Niemals Inline-Styles** für die Optik — wenn etwas fehlt, in `global.css` ergänzen und hier dokumentieren.

```jsx
<input type="text" className="input" placeholder="Suche nach Titel oder Quelle" />
<select className="select">
  <option>Alle Typen</option>
</select>
```

---

## Navigation

### Klassen

| Klasse | Verwendung |
|---|---|
| `.nav-link` | Header-Navigationslink, Inaktiv-State |
| `.nav-link.active` | Aktive Route — Ink-Background, Bg-Text |
| `.chip` | Filter-Chip (Library, Detail-Tags) |
| `.chip-active` | Aktiver Filter-Chip |

### Beispiel

```jsx
<nav style={{ display: 'flex', gap: 6 }}>
  {ROUTES.map((r) => (
    <a
      key={r.id}
      href={`#/${r.id}`}
      className={`nav-link${currentRoute === r.id ? ' active' : ''}`}
    >
      {r.label}
    </a>
  ))}
</nav>
```

---

## Light, Dark und Print

### Theme-Wechsel

- Theme wird in `localStorage` unter Schlüssel `kitomat_theme_v1` persistiert.
- Aktiver Mode: `<body class="dark">` (Light = keine Klasse).
- Default: System-Preference via `matchMedia('(prefers-color-scheme: dark)')`.

### Dark-Mode-Regeln

Alle Variablen sind im `body.dark { … }`-Block überschrieben. Für **neue Komponenten** gilt:

1. **Keine direkten Hex-Werte** — durch Variablen die Dark-Anpassung automatisch greift.
2. **Wenn doch nötig** (z. B. dynamisch berechnete Farbe für Avatar): beide Modi visuell prüfen.
3. **Test bei jedem PR**: Toggle in App-Header, alle neuen Elemente klicken/lesen.

### Print

`src/styles/print.css` enthält Print-spezifische Overrides:
- Hintergründe weiß
- Schatten entfernt
- Navigation ausgeblendet
- Page-breaks an Section-Grenzen

Bei strukturellen Änderungen an Views: Print-Variante prüfen (auch wenn der Print-Modus erst in einer späteren Phase relevant wird).

---

## Komponenten-Bestand

Was bereits in `web/design/kitomat-remix-1/components.jsx` existiert und in AP3a/AP4–AP6 migriert wird:

### Geteilt (AP3a)

`Icon`, `RiskBadge`, `TypeBadge`, `GoldBadge`, `PhaseBadge`, `Avatar`, `ThemeToggle`, `Header`, `RoleSwitcher`, `MobileNav`, `Footer`, `FooterCol`, `MetricTile`, `EmptyState`, `ProcessStrip`

### Modals (AP3b)

`ChatbotWidget`, `VideoModal`, `AdminLoginModal`, `Toast` (→ Context)

### Views (AP4–AP6)

- AP4: `Dashboard`, `Library`, `Detail`
- AP5: `Contribution`, `Community`, `MyRequests`, `FAQ`, `About`
- AP6: `Review`, `Admin`

---

## Migrations-Hinweise

Das Übergabepaket nutzt Browser-Babel + `window.*`-Globale. Bei der Migration nach ESM gilt:

| Alt | Neu |
|---|---|
| `window.KitomatData.LIBRARY` | `import { LIBRARY } from '@/data/library'` |
| `window.kitomatToast({ … })` | `const { show } = useToast(); show({ … })` |
| `window.ViewLibrary = ViewLibrary` | `export default function ViewLibrary(…)` |
| `window.location.hash` Handling | Bereits in `src/app/App.jsx` zentralisiert |

Konkrete Treffer-Liste: siehe AP1a-PR-Body („Migrations-Inventar").

---

## Änderungen am Designsystem

Designsystem-Änderungen sind keine View-Aufgabe:

1. Issue mit Label `area: web` und `type: design-system` öffnen.
2. Diskussion im Team — neue Variable oder Klassenkonvention.
3. Änderung in `global.css` + Update dieses Dokuments im selben PR.
4. Light + Dark + Print prüfen, Screenshots beifügen.

Kein freihändiges Hinzufügen von Farben oder Klassen in einer View.
