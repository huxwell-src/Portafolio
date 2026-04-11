# 🎨 Prompt — JobTracker: Sistema de Diseño Frontend

## Contexto
Estoy construyendo el frontend de **JobTracker**, una app de seguimiento de
postulaciones laborales en React 18 + Vite + Framer Motion. Necesito un sistema
de diseño completo, coherente y listo para implementar que defina la paleta,
tipografía, componentes, micro interacciones, modal de nueva postulación y
comportamiento responsive de toda la app.

---

## Dirección visual — "Pastel Glass"

### Concepto
La metáfora visual es una **pastelería de diseño escandinavo**: blanco como base
dominante, toques de colores pastel suaves y diversos que aparecen como detalles,
superficies traslúcidas con blur que dan profundidad sin peso, tipografía limpia y
generosa. Se siente ligero, ordenado y agradable — casi comestible en su paleta.

No es un dashboard corporativo gris. Tampoco es un producto infantil.
Es la intersección entre **premium y amigable**.

### Palabras clave
`white-first` · `pastel-accents` · `glass-surfaces` · `soft-depth`
`airy-layout` · `color-coded-states` · `gentle-motion` · `dessert-palette`

---

## Paleta de colores

```css
:root {
  /* ── Fondos ── */
  --bg-base:     #FFFFFF;
  --bg-soft:     #F8F7FF;
  --bg-gradient: linear-gradient(160deg, #FFFFFF 0%, #F8F7FF 40%, #FFF0F9 100%);

  /* ── Orbes ambientales ── */
  --orb-lavender: rgba(196, 181, 253, 0.25);
  --orb-pink:     rgba(251, 207, 232, 0.22);
  --orb-mint:     rgba(167, 243, 208, 0.20);
  --orb-peach:    rgba(254, 215, 170, 0.20);
  --orb-sky:      rgba(186, 230, 253, 0.22);

  /* ── Superficies glass ── */
  --glass:              rgba(255, 255, 255, 0.72);
  --glass-hover:        rgba(255, 255, 255, 0.88);
  --glass-modal:        rgba(255, 255, 255, 0.92);
  --glass-border:       rgba(200, 200, 230, 0.45);
  --glass-border-hover: rgba(160, 160, 210, 0.70);
  --glass-shadow:       0 2px 20px rgba(140, 130, 200, 0.08), inset 0 1px 0 rgba(255,255,255,0.85);
  --glass-shadow-hover: 0 10px 40px rgba(140, 130, 200, 0.14), inset 0 1px 0 rgba(255,255,255,0.95);

  /* ── Texto ── */
  --text:       #1E1B3A;
  --text-muted: #7B7A9A;
  --text-dim:   #C0BDD8;

  /* ── Acento principal ── */
  --violet:       #7C3AED;
  --violet-light: #EDE9FE;
  --violet-mid:   #DDD6FE;
  --indigo:       #4F46E5;
  --violet-glow:  rgba(124, 58, 237, 0.12);

  /* ── Pasteles de acento ── */
  --pastel-lavender: #C4B5FD;
  --pastel-pink:     #F9A8D4;
  --pastel-mint:     #6EE7B7;
  --pastel-peach:    #FCA5A5;
  --pastel-sky:      #7DD3FC;
  --pastel-lemon:    #FDE68A;
  --pastel-lilac:    #E9D5FF;

  /* ── Estados de postulación ── */
  --applied-color:    #7C3AED;  --applied-light:    #EDE9FE;  --applied-border:    rgba(124,58,237,0.30);
  --interview-color:  #0284C7;  --interview-light:  #E0F2FE;  --interview-border:  rgba(2,132,199,0.30);
  --technical-color:  #D97706;  --technical-light:  #FEF3C7;  --technical-border:  rgba(217,119,6,0.30);
  --offer-color:      #059669;  --offer-light:      #D1FAE5;  --offer-border:      rgba(5,150,105,0.30);
  --rejected-color:   #E11D48;  --rejected-light:   #FFE4E6;  --rejected-border:   rgba(225,29,72,0.30);
  --discarded-color:  #9CA3AF;  --discarded-light:  #F3F4F6;  --discarded-border:  rgba(156,163,175,0.30);

  /* ── Espaciado ── */
  --space-xs: 8px; --space-sm: 16px; --space-md: 24px;
  --space-lg: 40px; --space-xl: 64px;
}
```

### Reglas de uso del color
- **Blanco** domina — nunca menos del 70% de cualquier pantalla
- **Pasteles** solo en: orbes de fondo, highlights de StatCard en hover, ilustraciones de empty state
- **Violeta** `#7C3AED` es el único color de acción — botones, links activos, focus rings
- **Colores de estado** únicamente en StatusPill, borde superior de hero card, score de predicción
- **Nunca** usar colores de estado como decoración en otros contextos

---

## Tipografía

```css
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800&family=DM+Mono:wght@400;500&display=swap');

:root {
  --font-display: 'DM Sans', sans-serif;
  --font-mono:    'DM Mono', monospace;
}
```

| Rol | Font | Size | Weight | Uso |
|-----|------|------|--------|-----|
| Hero | DM Sans | clamp(28px, 5vw, 44px) | 800 | Títulos de página |
| H1 | DM Sans | clamp(20px, 4vw, 28px) | 800 | Subtítulos |
| H2 | DM Sans | 18px | 700 | Modal headers, card titles |
| Body | DM Sans | 14px | 400–500 | Texto general |
| Label | DM Mono | 10px | 500 | UPPERCASE, letter-spacing 0.12em |
| Data | DM Sans | clamp(28px,4vw,38px) | 800 | Números de métricas |
| Meta | DM Mono | 11px | 400 | Fechas, empresa, metadata |
| Micro | DM Mono | 9px | 500 | Labels de badges, UPPERCASE |

**Reglas:** Labels DM Mono siempre UPPERCASE. Números de métricas con gradiente de texto. Nunca DM Mono para texto de cuerpo.

---

## Superficies glass

```css
.glass-card {
  background: var(--glass);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid var(--glass-border);
  border-radius: 20px;
  box-shadow: var(--glass-shadow);
  transition: box-shadow 0.3s ease, border-color 0.3s ease, transform 0.25s ease;
}
.glass-card:hover {
  border-color: var(--glass-border-hover);
  box-shadow: var(--glass-shadow-hover);
}

.glass-nav {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--glass-border);
}

.glass-modal {
  background: var(--glass-modal);
  backdrop-filter: blur(32px);
  -webkit-backdrop-filter: blur(32px);
  border: 1px solid var(--glass-border);
  border-radius: 24px;
  box-shadow: 0 24px 64px rgba(140,130,200,0.18), 0 4px 16px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.95);
}
```

---

## Orbes ambientales

```css
/* position: fixed, pointer-events: none, z-index: 0 */
.orb-1 { width:560px; height:560px; background:radial-gradient(circle, var(--orb-lavender), transparent 70%); top:-180px; left:-160px; }
.orb-2 { width:420px; height:420px; background:radial-gradient(circle, var(--orb-pink),     transparent 70%); bottom:-120px; right:-100px; }
.orb-3 { width:320px; height:320px; background:radial-gradient(circle, var(--orb-mint),     transparent 70%); top:38%; right:22%; }
.orb-4 { width:260px; height:260px; background:radial-gradient(circle, var(--orb-peach),    transparent 70%); top:60%; left:15%; }
```

---

## Componentes

### Navbar
- Fondo `glass-nav`, altura 58px, sticky top
- Logo: cuadrado `border-radius: 8px`, gradiente `--violet → --indigo`, "JT" blanco
- Links: DM Sans 500 13px, activo con `background: --violet-light`, `color: --violet`, `border-radius: 10px`
- Avatar: `34×34px`, gradiente pastel, inicial del usuario
- Mobile: hamburger con dropdown glass en columna

### StatCard
- `glass-card`, `padding: 20px 18px`, `flex: 1; min-width: 140px`
- Label: DM Mono 10px UPPERCASE
- Número: DM Sans 800 clamp, gradiente de texto por métrica:
  - Total → `--violet → --indigo`
  - Respuesta → `#0284C7 → #0EA5E9`
  - Entrevistas → `#D97706 → #F59E0B`
  - Esta semana → `#059669 → #10B981`
- Hover: `translateY(-2px)`, glow del color de la métrica

### JobCard
- `glass-card`, `border-radius: 16px`, `padding: 18px`
- StatusPill arriba a la izquierda + fecha a la derecha (DM Mono 9px dim)
- Título: DM Sans 700 14px
- Empresa e industria: DM Mono 11px muted
- Hover: `translateY(-3px)`, `border-top: 2px solid color-del-estado`
- "ver detalle →" aparece con `opacity 0→1` + `translateX(6→0)` en hover

### StatusPill
- `background: --{estado}-light`
- `border: 1px solid --{estado}-border`
- `color: --{estado}-color`
- DM Mono 9px 500 UPPERCASE, `border-radius: 8px`, `padding: 3px 8px`
- Dot `●` del mismo color como span circular

### Botón primario
- `background: linear-gradient(135deg, --violet, --indigo)`
- `color: white`, DM Sans 600, `border-radius: 12px`
- `box-shadow: 0 4px 14px --violet-glow`
- Hover: gradiente más oscuro, `translateY(-1px)`, glow intensificado
- Active: `translateY(0)`, sombra reducida

### Botón secundario (ghost)
- `background: rgba(255,255,255,0.6)`, `border: 1px solid --glass-border`
- `color: --text-muted`, `border-radius: 12px`
- Hover: `background: rgba(124,58,237,0.06)`, `color: --violet`

### Botón destructivo
- `background: --rejected-light`, `border: 1px solid --rejected-border`
- `color: --rejected-color`, `border-radius: 10px`
- Hover: `background: --rejected-color`, `color: white`

### Input y Select
- Label: DM Mono 10px UPPERCASE, `color: --text-muted`, `margin-bottom: 6px`
- `background: rgba(255,255,255,0.7)`, `border: 1px solid --glass-border`, `border-radius: 12px`
- `font-family: DM Mono`, `font-size: 12px`, `color: --text`
- Focus: `border-color: rgba(124,58,237,0.6)`, `box-shadow: 0 0 0 3px --violet-glow`
- Error: `border-color: --rejected-color`, mensaje DM Mono 10px rojo

### Modal — Nueva Postulación (SIEMPRE modal, nunca página)

```
Overlay (rgba(15,15,35,0.45) + blur 6px)
└── glass-modal (max-width: 580px)
    ├── Header: label + título + botón × 
    └── Body: campos del formulario + footer con botones
```

- Click fuera cierra el modal
- Botón `×`: hover en `--rejected-color`
- Entrada: `scale(0.95→1) + opacity(0→1)` en 220ms con `ease: [0.16,1,0.3,1]`
- Salida: `scale(1→0.97) + opacity(1→0)` en 150ms
- Mobile: `width: calc(100% - 32px)`, `border-radius: 20px`

### EmptyState
- glass-card centrada, `padding: 56px 40px`
- Ícono tipográfico 40–48px en `--pastel-lavender` con `opacity: 0.6`
- Título DM Sans 700 18px, descripción DM Mono 11px muted, `max-width: 320px`
- CTA: botón primario si hay acción

### SkeletonCard
- Bloques `background: rgba(196,181,253,0.15)` (lavanda tenue)
- Shimmer: `linear-gradient(90deg, transparent 25%, rgba(255,255,255,0.5) 50%, transparent 75%)`
- `backgroundSize: 400% 100%`, `animation: shimmer 1.5s linear infinite`
- Transición → contenido: AnimatePresence fade 200ms

### FunnelChart (Recharts)
- Barras con `borderRadius: [0, 4, 4, 0]`
- Color de cada barra: `--{estado}-color`
- Track background: `rgba(0,0,0,0.04)`
- Sin ejes, sin grid lines

### TimelineChart (Recharts AreaChart)
- Línea: `stroke: --violet`, `strokeWidth: 2`
- Fill: gradiente `rgba(124,58,237,0.15) → transparent`
- Barra actual destacada en violeta

---

## Micro interacciones — Framer Motion

Archivo: `src/motion/variants.js` (todas las variantes exportadas, nunca inline)

```js
// 1. Page transitions
export const pageVariants = {
  initial:  { opacity: 0, y: 10 },
  animate:  { opacity: 1, y: 0, transition: { duration: 0.2, ease: [0.25,0.1,0.25,1] } },
  exit:     { opacity: 0, y: -8, transition: { duration: 0.15 } },
}

// 2. Stagger listas
export const listContainer = { hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }
export const listItem = {
  hidden:  { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.22, ease: "easeOut" } }
}

// 3. StatCard contador → useSpring(motionValue, { stiffness: 80, damping: 20 })

// 4. JobCard hover reveal
export const cardHoverReveal = {
  initial: { opacity: 0, x: 8 },
  hover:   { opacity: 1, x: 0, transition: { duration: 0.18 } }
}

// 5. StatusPill swap (AnimatePresence mode="wait", key={status})
export const pillSwap = {
  initial: { opacity: 0, scale: 0.85 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.15 } },
  exit:    { opacity: 0, scale: 1.08, transition: { duration: 0.1 } }
}

// 6. Modal
export const overlayVariants = {
  initial: { opacity: 0 }, animate: { opacity: 1, transition: { duration: 0.18 } },
  exit:    { opacity: 0, transition: { duration: 0.15 } }
}
export const modalVariants = {
  initial: { opacity: 0, scale: 0.95, y: 16 },
  animate: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.22, ease: [0.16,1,0.3,1] } },
  exit:    { opacity: 0, scale: 0.97, y: 10, transition: { duration: 0.15 } }
}

// 7. Botón → whileTap: { y: 1, scale: 0.99 }

// 8. Navbar active → layoutId="nav-active" con spring { stiffness: 300, damping: 30 }

// 9. Toast
export const toastVariants = {
  initial: { opacity: 0, y: -16, scale: 0.95 },
  animate: { opacity: 1, y: 0,   scale: 1, transition: { duration: 0.2 } },
  exit:    { opacity: 0, y: -10, scale: 0.97, transition: { duration: 0.15 } }
}
// Auto-destrucción 3s, posición top-right fija
// Estilo: glass-card, border-left 3px --violet, DM Mono 12px

// 10. Skeleton → contenido: AnimatePresence fade 150ms/200ms
```

---

## Responsive — Mobile First

| Breakpoint | Ancho | Cambios clave |
|------------|-------|---------------|
| Mobile | < 640px | 1 columna, padding reducido, hamburger, modal full-width |
| Tablet | 640px–1024px | 2 columnas en cards, stats 2×2 |
| Desktop | > 1024px | 3 columnas JobList, sidebar en JobDetail |

```css
/* Tipografía fluida */
font-size: clamp(20px, 4vw, 28px);   /* H1 */
font-size: clamp(28px, 4vw, 38px);   /* métricas */
padding:   clamp(16px, 4vw, 32px);   /* páginas */

/* Grids */
grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));  /* JobList */
grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));   /* Charts */
grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));   /* Formularios */

/* JobDetail */
/* Desktop */ grid-template-columns: 1fr 320px;
/* Mobile  */ grid-template-columns: 1fr;

/* Modal mobile */
width: calc(100% - 32px); border-radius: 20px;
```

- Grupos de botones: `flex-wrap: wrap`
- Pills de estado: `flex-wrap: wrap`, 2–3 por fila
- Navbar mobile: dropdown glass con links en columna

---

## Archivos a generar

```
src/
├── styles/
│   ├── design-system.css   ← todas las CSS variables
│   └── global.css          ← reset, base, body, scrollbar, shimmer keyframe
├── motion/
│   └── variants.js         ← todas las variantes Framer Motion exportadas
└── components/
    ├── ui/
    │   ├── GlassCard.jsx
    │   ├── StatusPill.jsx
    │   ├── Btn.jsx           ← variantes: primary, ghost, destructive
    │   ├── GlassInput.jsx
    │   ├── SkeletonCard.jsx
    │   ├── EmptyState.jsx
    │   └── Toast.jsx
    ├── NewJobModal.jsx       ← modal completo con Framer Motion
    └── ConfirmModal.jsx
```

---

## Reglas globales

1. **Blanco dominante** — nunca menos del 70% de cualquier pantalla es blanco
2. **Pasteles como detalles** — solo en orbes, highlights de hover y empty states
3. **Glass en todas las superficies** — siempre `backdrop-filter: blur()`, nunca fondo blanco plano
4. **border-radius generoso** — mínimo `10px`. Cards `20px`, modal `24px`, inputs `12px`, badges `8px`
5. **Sin bordes negros** — todos los bordes son `--glass-border` o color del estado
6. **Sombras suaves azuladas** — `rgba(140,130,200, 0.08–0.18)`, nunca sombras negras
7. **DM Mono solo para datos** — nunca para cuerpo de texto
8. **Framer Motion solo en las 10 interacciones definidas**
9. **El modal reemplaza la página de nueva postulación** — no existe ruta `/jobs/new`
10. **Colores de estado son un sistema cerrado** — cada estado tiene su trio: color, light, border

---

## Instrucciones finales para la IA

- Genera todos los archivos listados en "Archivos a generar" de forma completa, sin TODOs
- Importa variantes desde `src/motion/variants.js` — nunca definirlas inline en componentes
- `AnimatePresence` del router va en `App.jsx` con `mode="wait"`
- El contador de StatCard usa `useSpring` de Framer Motion, no `setTimeout`
- `NewJobModal` se controla con estado en `App.jsx` (`showModal`) y se pasa como prop `onNewJob`
- Los orbes ambientales son divs `position: fixed` en el root de `App.jsx`
- El shimmer de SkeletonCard usa `@keyframes shimmer` en `global.css`, no JS
- Todos los grids usan `auto-fill` o `auto-fit` con `minmax()` — nunca columnas fijas en px
- Al final, muestra los comandos exactos para instalar dependencias y correr el proyecto
