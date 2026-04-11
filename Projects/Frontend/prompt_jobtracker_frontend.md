# 🖥️ Prompt — JobTracker: Frontend React (Portafolio)

## Contexto
Soy desarrollador frontend con experiencia en React y Tailwind CSS.
Estoy construyendo el frontend de **JobTracker**, una app de seguimiento de
postulaciones laborales. El backend ya existe en Django REST (localhost:8000)
y expone los endpoints descritos más abajo. Mi objetivo es un frontend
funcional, limpio y con buen diseño usando Tailwind.

---

## Stack
- React 18 + Vite
- React Router v6
- Axios
- Tailwind CSS
- Recharts (para gráficos del dashboard)

---

## Estructura de carpetas

```
frontend/
├── package.json
├── vite.config.js
├── tailwind.config.js
├── index.html
└── src/
    ├── App.jsx
    ├── main.jsx
    ├── context/
    │   └── AuthContext.jsx
    ├── services/
    │   ├── api.js
    │   ├── authService.js
    │   └── jobService.js
    ├── hooks/
    │   ├── useJobs.js          ← lógica de listado + filtros
    │   └── useStats.js         ← lógica de métricas
    ├── components/
    │   ├── Navbar.jsx
    │   ├── PrivateRoute.jsx
    │   ├── JobCard.jsx
    │   ├── JobForm.jsx
    │   ├── NoteForm.jsx
    │   ├── NoteList.jsx
    │   ├── StatusBadge.jsx
    │   ├── StatCard.jsx        ← tarjeta de métrica individual
    │   ├── FunnelChart.jsx     ← gráfico de funnel de estados
    │   ├── TimelineChart.jsx   ← gráfico de postulaciones por semana
    │   ├── ConfirmModal.jsx    ← modal de confirmación genérico
    │   ├── EmptyState.jsx      ← estado vacío reutilizable con CTA
    │   └── SkeletonCard.jsx    ← skeleton loader para JobCard y StatCard
    └── pages/
        ├── Login.jsx
        ├── Register.jsx
        ├── Dashboard.jsx
        ├── JobList.jsx
        ├── JobDetail.jsx
        └── NewJob.jsx
```

---

## Rutas (App.jsx)

| Ruta | Componente | Acceso |
|------|-----------|--------|
| `/login` | Login.jsx | Pública |
| `/register` | Register.jsx | Pública |
| `/` | Dashboard.jsx | Privada |
| `/jobs` | JobList.jsx | Privada |
| `/jobs/new` | NewJob.jsx | Privada |
| `/jobs/:id` | JobDetail.jsx | Privada |

- Rutas privadas protegidas con `PrivateRoute.jsx`
- Si no hay token, redirige a `/login`
- Si ya está autenticado y va a `/login`, redirige a `/`

---

## Autenticación (AuthContext + services)

### `src/context/AuthContext.jsx`
- Estado global: `user`, `accessToken`, `loading`
- Al montar: lee token de `localStorage`, si existe lo restaura y obtiene datos del usuario
- Funciones: `login(username, password)`, `register(data)`, `logout()`
- `login()`: llama al backend, guarda `access` y `refresh` en localStorage, actualiza estado
- `logout()`: limpia localStorage, redirige a `/login`

### `src/services/api.js`
- Instancia axios con `baseURL: http://localhost:8000/api`
- Interceptor de **request**: adjunta `Authorization: Bearer <token>` desde localStorage
- Interceptor de **response**: si recibe 401, intenta renovar con el refresh token una sola vez. Si falla, llama `logout()`. Si tiene éxito, reintenta el request original. Implementar con flag `_retry` para evitar loops infinitos.

### `src/services/authService.js`
```javascript
login(username, password)     // POST /auth/login/
register(data)                // POST /auth/register/
refreshToken(refresh)         // POST /auth/token/refresh/
```

### `src/services/jobService.js`
```javascript
getJobs(params)               // GET /jobs/ con query params opcionales
getJob(id)                    // GET /jobs/:id/
createJob(data)               // POST /jobs/
updateJob(id, data)           // PUT /jobs/:id/
patchJob(id, data)            // PATCH /jobs/:id/
deleteJob(id)                 // DELETE /jobs/:id/
getStats()                    // GET /jobs/stats/
getStatsByIndustry()          // GET /jobs/stats/by-industry/
getTimeline()                 // GET /jobs/stats/timeline/
getPredict(id)                // GET /jobs/:id/predict/
exportCsv()                   // GET /jobs/export/csv/ → descarga archivo
addNote(jobId, content)       // POST /jobs/:jobId/notes/
deleteNote(jobId, noteId)     // DELETE /jobs/:jobId/notes/:noteId/
```

---

## Páginas

### `Dashboard.jsx`
Layout en dos secciones:

**Sección superior — Métricas (4 StatCards en grid):**
- Total postulaciones
- Tasa de respuesta (%)
- Entrevistas activas
- Postulaciones últimos 7 días

**Sección media — Gráficos (2 columnas):**
- `FunnelChart`: barras horizontales con conteo por estado, cada barra con color de su estado
- `TimelineChart`: línea de postulaciones por semana (últimas 12 semanas)

**Sección inferior — Accesos rápidos:**
- Botón "Nueva postulación" → `/jobs/new`
- Botón "Ver todas" → `/jobs`
- Botón "Exportar CSV" → llama `exportCsv()` y descarga el archivo

### `JobList.jsx`
- Barra superior con: buscador (input texto), filtro por estado (select), filtro por rubro (select)
- Los filtros llaman a `getJobs({search, status, industry})` en tiempo real (debounce 300ms en el buscador)
- Lista de `JobCard` en grid de 2-3 columnas
- Botón flotante "+" en esquina inferior derecha para crear nueva postulación

### `JobDetail.jsx`
Secciones:
1. **Header**: empresa, cargo, rubro, fecha postulación, link a oferta (si existe)
2. **Estado actual**: selector dropdown que hace `patchJob` automáticamente al cambiar. Muestra `StatusBadge` con el estado actual
3. **Predicción**: llama a `getPredict(id)` y muestra score, label y tips en una tarjeta destacada
4. **Historial de estados**: lista cronológica de cambios (desde → hasta, fecha)
5. **Notas**: lista de notas con fecha + formulario para agregar nueva + botón eliminar por nota
6. **Acciones**: botón "Editar" (abre modal o redirige) + botón "Eliminar" (abre `ConfirmModal`)

### `NewJob.jsx`
- Formulario con campos: empresa, cargo, rubro (input libre), URL oferta (opcional), fecha postulación (date picker), estado inicial
- Validación frontend: empresa y cargo son requeridos, URL debe ser válida si se ingresa
- Al guardar exitosamente, redirige a `/jobs/:id` de la postulación creada

---

## Componentes

### `StatusBadge.jsx`
Badge pill con color Tailwind según estado:
| Estado | Clases Tailwind |
|--------|----------------|
| applied | `bg-blue-100 text-blue-800` |
| interview | `bg-yellow-100 text-yellow-800` |
| technical | `bg-orange-100 text-orange-800` |
| offer | `bg-green-100 text-green-800` |
| rejected | `bg-red-100 text-red-800` |
| discarded | `bg-gray-100 text-gray-600` |

Recibe prop `status` y renderiza el badge con la etiqueta en español.

### `StatCard.jsx`
Props: `title`, `value`, `subtitle` (opcional), `color` (opcional)
Tarjeta con sombra, fondo blanco, título pequeño arriba, valor grande en el centro.

### `FunnelChart.jsx`
- Usa Recharts `BarChart` horizontal
- Datos: array `[{ name, value, color }]` construido desde `stats.by_status`
- Cada barra con su color de estado
- Tooltip con conteo exacto

### `TimelineChart.jsx`
- Usa Recharts `LineChart`
- Datos: array de `{ week, count }` desde endpoint `timeline/`
- Línea con área sombreada (`AreaChart`)
- Eje X con semanas, eje Y con conteo

### `ConfirmModal.jsx`
Props: `isOpen`, `onConfirm`, `onCancel`, `message`
Modal centrado con overlay oscuro, mensaje y dos botones (Confirmar / Cancelar).

### `JobCard.jsx`
Props: `job` (objeto completo)
Muestra: empresa (bold), cargo, `StatusBadge`, rubro (si existe), fecha postulación.
Click en la card navega a `/jobs/:id`.

### `JobForm.jsx`
Formulario reutilizable para crear y editar. Props: `initialData` (opcional), `onSubmit`, `loading`.

---

## Empty States

Crear componente `EmptyState.jsx` reutilizable con estas props:
```jsx
<EmptyState
  icon="→"              // carácter tipográfico, no ícono de librería
  title="..."           // título brutalista en Syne 700
  description="..."     // descripción en Space Mono
  actionLabel="..."     // texto del botón CTA (opcional)
  onAction={() => {}}   // handler del CTA (opcional)
/>
```

Implementar en cada contexto con texto específico:

| Contexto | Título | Descripción | CTA |
|---------|--------|-------------|-----|
| Dashboard sin postulaciones | "TU BÚSQUEDA EMPIEZA AQUÍ" | "Aún no tienes postulaciones registradas. Cada oportunidad cuenta." | "+ Agregar primera postulación" |
| JobList sin resultados de filtro | "SIN RESULTADOS" | "Ninguna postulación coincide con los filtros aplicados." | "Limpiar filtros" |
| JobList vacía | "HISTORIAL VACÍO" | "Registra tu primera postulación y empieza a hacer seguimiento." | "+ Nueva postulación" |
| JobDetail sin notas | "SIN NOTAS AÚN" | "Agrega contexto, contactos o próximos pasos." | ninguno |

El componente debe tener el estilo brutalista del sistema de diseño: borde heavy, fondo `--color-bg`, sin border-radius, icono tipográfico grande centrado.

---

## Skeleton Loaders

Crear componente `SkeletonCard.jsx` con animación shimmer usando Framer Motion:

```jsx
// Variante shimmer con Framer Motion
const shimmer = {
  animate: {
    backgroundPosition: ["200% 0", "-200% 0"],
    transition: { duration: 1.5, repeat: Infinity, ease: "linear" }
  }
}

// El fondo animado usa el acento muy suave:
// background: linear-gradient(90deg, #F5F4F0 25%, #FFFDE0 50%, #F5F4F0 75%)
// backgroundSize: "400% 100%"
```

Variantes de skeleton a implementar:

**`SkeletonStatCard`** — mismas dimensiones que `StatCard`, con 3 bloques de placeholder (label, número, subtexto)

**`SkeletonJobCard`** — mismas dimensiones que `JobCard`, con bloques que imitan el header de estado, el título y el cargo

**Uso en páginas:**
- `Dashboard.jsx`: mientras `loading === true` en `useStats`, mostrar 4 `SkeletonStatCard` en el grid
- `JobList.jsx`: mientras `loading === true` en `useJobs`, mostrar 6 `SkeletonJobCard` en el grid
- Al completar la carga, los skeletons se reemplazan con Framer Motion `AnimatePresence` (fade out del skeleton, fade in del contenido real)

---

## Hooks

### `useJobs.js`
```javascript
const { jobs, loading, error, fetchJobs } = useJobs()
```
- Estado interno: `jobs`, `loading`, `error`
- `fetchJobs(params)` llama a `jobService.getJobs(params)` y actualiza estado
- Se llama automáticamente al montar

### `useStats.js`
```javascript
const { stats, byIndustry, timeline, loading } = useStats()
```
- Llama en paralelo con `Promise.all` a los 3 endpoints de stats
- Retorna los datos listos para usar en Dashboard

---

## Diseño general (Tailwind)
- Fondo de página: `bg-gray-50`
- Cards: `bg-white rounded-xl shadow-sm border border-gray-100`
- Navbar: fondo oscuro (`bg-gray-900 text-white`)
- Botón primario: `bg-indigo-600 hover:bg-indigo-700 text-white`
- Botón peligro: `bg-red-600 hover:bg-red-700 text-white`
- Tipografía: sans-serif por defecto de Tailwind
- Espaciado consistente: padding `p-6` en cards, gap `gap-4` en grids

---

## package.json (dependencias)
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.22.0",
    "axios": "^1.6.0",
    "recharts": "^2.10.0"
  },
  "devDependencies": {
    "vite": "^5.0.0",
    "@vitejs/plugin-react": "^4.2.0",
    "tailwindcss": "^3.4.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0"
  }
}
```

---

## Instrucciones finales para la IA
- Genera **todos los archivos completos**, sin TODOs sin resolver
- El interceptor axios con refresh NO debe entrar en loop infinito (usar flag `_retry`)
- Los hooks deben manejar estados de `loading` y `error` correctamente
- El export CSV debe disparar descarga real en el navegador (usar `URL.createObjectURL`)
- Los filtros de `JobList` deben ser combinables y el buscador con debounce de 300ms
- No usar estilos inline, solo clases Tailwind y variables CSS del sistema de diseño
- La predicción en `JobDetail` debe mostrar un indicador visual del score (barra de progreso)
- Los `EmptyState` deben aparecer en todos los contextos especificados, nunca mostrar una lista vacía sin feedback
- Los `SkeletonCard` deben tener la animación shimmer con Framer Motion, no con CSS puro
- La transición de skeleton → contenido real debe usar `AnimatePresence` con fade suave (200ms)
- Al final, muestra los comandos exactos para instalar y correr el frontend
