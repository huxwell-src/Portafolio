# 🧪 Prompt — JobTracker: Tests Frontend React

## Contexto
Tengo el frontend de **JobTracker** construido en React 18 + Vite + Axios + Framer Motion + Tailwind.
Necesito una suite de tests completa con Vitest + React Testing Library que cubra
los flujos críticos de la app. El backend Django corre en localhost:8000 pero en los
tests se mockea completamente con `vi.mock` — nunca se hacen llamadas HTTP reales.

---

## Stack de testing
```json
{
  "devDependencies": {
    "vitest": "^1.4.0",
    "@vitest/ui": "^1.4.0",
    "@testing-library/react": "^15.0.0",
    "@testing-library/user-event": "^14.5.0",
    "@testing-library/jest-dom": "^6.4.0",
    "jsdom": "^24.0.0",
    "msw": "^2.2.0"
  }
}
```

## Configuración requerida

### `vite.config.js` — agregar bloque test:
```js
test: {
  environment: 'jsdom',
  globals: true,
  setupFiles: ['./src/tests/setup.js'],
}
```

### `src/tests/setup.js`
```js
import '@testing-library/jest-dom'
import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'

afterEach(() => cleanup())
```

### `src/tests/utils.jsx` — render helper con providers
```jsx
// Wrapper que incluye AuthContext + MemoryRouter para todos los tests
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AuthProvider } from '../context/AuthContext'

export function renderWithProviders(ui, { route = '/', authValue = null } = {}) {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <AuthProvider mockValue={authValue}>
        {ui}
      </AuthProvider>
    </MemoryRouter>
  )
}
```

### `src/tests/mocks/jobService.mock.js`
```js
// Mock global del servicio — importar en cada test que lo necesite
export const mockJobs = [
  {
    id: 1,
    company: 'Globant',
    position: 'Senior Frontend Developer',
    industry: 'Fintech',
    status: 'interview',
    applied_date: '2024-03-01',
    job_url: 'https://globant.com/jobs/123',
    notes: [],
    history: [
      { from_status: null, to_status: 'applied', changed_at: '2024-03-01T10:00:00Z' },
      { from_status: 'applied', to_status: 'interview', changed_at: '2024-03-05T14:00:00Z' }
    ]
  },
  {
    id: 2,
    company: 'Mercado Libre',
    position: 'Backend Engineer',
    industry: 'Ecommerce',
    status: 'applied',
    applied_date: '2024-03-10',
    job_url: '',
    notes: [],
    history: [
      { from_status: null, to_status: 'applied', changed_at: '2024-03-10T09:00:00Z' }
    ]
  }
]

export const mockStats = {
  total: 2,
  by_status: {
    applied: 1, interview: 1, technical: 0,
    offer: 0, rejected: 0, discarded: 0
  },
  response_rate: 50.0,
  offer_rate: 0.0,
  applied_last_7_days: 1,
  applied_last_30_days: 2,
  avg_days_to_response: 4.0
}

export const mockPredict = {
  job_id: 1,
  company: 'Globant',
  current_status: 'interview',
  score: 70,
  label: 'Buenas chances',
  tips: ['Tienes notas registradas', 'La empresa ha respondido bien antes']
}
```

---

## Estructura de archivos de tests

```
src/tests/
├── setup.js
├── utils.jsx
├── mocks/
│   └── jobService.mock.js
├── components/
│   ├── StatusBadge.test.jsx
│   ├── StatCard.test.jsx
│   ├── JobCard.test.jsx
│   └── ConfirmModal.test.jsx
├── pages/
│   ├── Login.test.jsx
│   ├── Dashboard.test.jsx
│   ├── JobList.test.jsx
│   └── JobDetail.test.jsx
└── hooks/
    ├── useJobs.test.js
    └── useStats.test.js
```

---

## TESTS DE COMPONENTES

---

### `StatusBadge.test.jsx`

```
SUITE: StatusBadge
```

**TEST 1: Renderiza el texto correcto por estado**
```
Acción: renderizar <StatusBadge status="interview" />
Resultado esperado: el elemento tiene el texto "ENTREVISTA" (o el label en español del estado)
```

**TEST 2: Renderiza los 6 estados sin errores**
```
Acción: renderizar StatusBadge con cada uno de los 6 estados posibles
  ['applied', 'interview', 'technical', 'offer', 'rejected', 'discarded']
Resultado esperado: ningún render lanza error, cada uno muestra texto visible
```

**TEST 3: Aplica color correcto según estado**
```
Acción: renderizar <StatusBadge status="offer" />
Resultado esperado: el elemento tiene una clase o estilo que contiene el color verde
  (verificar que el className incluye algo relacionado con 'offer' o el color definido)
```

**TEST 4: Estado inválido no rompe el componente**
```
Acción: renderizar <StatusBadge status="estado_inexistente" />
Resultado esperado: el componente renderiza sin lanzar error (puede mostrar texto vacío o fallback)
```

---

### `StatCard.test.jsx`

```
SUITE: StatCard
```

**TEST 1: Muestra título y valor**
```
Acción: renderizar <StatCard title="TOTAL" value={24} />
Resultado esperado:
  - el texto "TOTAL" está presente en el DOM
  - el texto "24" está presente en el DOM
```

**TEST 2: Muestra subtexto cuando se pasa la prop**
```
Acción: renderizar <StatCard title="RESPUESTA" value="41.7%" subtitle="últimos 30 días" />
Resultado esperado: el texto "últimos 30 días" está presente en el DOM
```

**TEST 3: No muestra subtexto cuando no se pasa la prop**
```
Acción: renderizar <StatCard title="TOTAL" value={5} /> sin prop subtitle
Resultado esperado: no hay elemento con texto de subtexto en el DOM
```

**TEST 4: Valor 0 se renderiza correctamente (no como falsy)**
```
Acción: renderizar <StatCard title="OFERTAS" value={0} />
Resultado esperado: el texto "0" está visible en el DOM
```

---

### `JobCard.test.jsx`

```
SUITE: JobCard
```

**TEST 1: Muestra los datos del job**
```
Acción: renderizar <JobCard job={mockJobs[0]} />
Resultado esperado:
  - "Globant" está presente en el DOM
  - "Senior Frontend Developer" está presente en el DOM
  - "Fintech" está presente en el DOM
```

**TEST 2: Muestra StatusBadge con el estado correcto**
```
Acción: renderizar <JobCard job={mockJobs[0]} /> donde job.status = 'interview'
Resultado esperado: el DOM contiene el texto del estado "interview" en español
```

**TEST 3: Navega a /jobs/:id al hacer click**
```
Acción:
  1. renderizar <JobCard job={mockJobs[0]} /> dentro de MemoryRouter
  2. hacer click en la card
Resultado esperado: la URL cambia a "/jobs/1"
  (verificar con useLocation o que el componente de destino se renderiza)
```

**TEST 4: No muestra rubro si industry está vacío**
```
Acción: renderizar <JobCard job={{ ...mockJobs[0], industry: '' }} />
Resultado esperado: el DOM no contiene un elemento vacío para el rubro
```

**TEST 5: Muestra fecha formateada correctamente**
```
Acción: renderizar <JobCard job={mockJobs[0]} /> donde applied_date = '2024-03-01'
Resultado esperado: el DOM contiene la fecha en formato legible (ej: "01 mar 2024" o "Mar 1, 2024")
  — NO el string crudo "2024-03-01"
```

---

### `ConfirmModal.test.jsx`

```
SUITE: ConfirmModal
```

**TEST 1: No renderiza nada cuando isOpen es false**
```
Acción: renderizar <ConfirmModal isOpen={false} message="¿Eliminar?" onConfirm={fn} onCancel={fn} />
Resultado esperado: el texto "¿Eliminar?" NO está en el DOM
```

**TEST 2: Renderiza el mensaje cuando isOpen es true**
```
Acción: renderizar <ConfirmModal isOpen={true} message="¿Eliminar esta postulación?" onConfirm={fn} onCancel={fn} />
Resultado esperado: el texto "¿Eliminar esta postulación?" está en el DOM
```

**TEST 3: Llama onConfirm al hacer click en confirmar**
```
Acción:
  1. crear mock: const onConfirm = vi.fn()
  2. renderizar modal con isOpen=true
  3. hacer click en el botón de confirmación
Resultado esperado: onConfirm fue llamado exactamente 1 vez
```

**TEST 4: Llama onCancel al hacer click en cancelar**
```
Acción:
  1. crear mock: const onCancel = vi.fn()
  2. renderizar modal con isOpen=true
  3. hacer click en el botón de cancelar
Resultado esperado: onCancel fue llamado exactamente 1 vez
```

**TEST 5: onConfirm NO se llama al hacer click en cancelar**
```
Acción:
  1. crear mocks para onConfirm y onCancel
  2. renderizar modal con isOpen=true
  3. hacer click en cancelar
Resultado esperado: onConfirm fue llamado 0 veces
```

---

## TESTS DE PÁGINAS

---

### `Login.test.jsx`

```
SUITE: Login Page
```

**TEST 1: Renderiza el formulario correctamente**
```
Acción: renderizar <Login />
Resultado esperado:
  - existe un input de tipo text o con label "usuario"
  - existe un input de tipo password
  - existe un botón de submit
```

**TEST 2: Login exitoso redirige al dashboard**
```
Acción:
  1. mockear authService.login() para que resuelva con éxito
  2. renderizar <Login />
  3. escribir "nicolas" en el input de usuario
  4. escribir "password123" en el input de contraseña
  5. hacer click en el botón de login
Resultado esperado: el usuario es redirigido a "/" (Dashboard)
```

**TEST 3: Login fallido muestra mensaje de error**
```
Acción:
  1. mockear authService.login() para que rechace con error "Credenciales inválidas"
  2. renderizar <Login />
  3. completar el formulario con datos cualquiera
  4. hacer click en submit
Resultado esperado: el DOM muestra un mensaje de error visible (contiene "error" o "inválid" o similar)
```

**TEST 4: Botón deshabilitado durante el loading**
```
Acción:
  1. mockear authService.login() con un Promise que no resuelve inmediatamente
  2. renderizar <Login />
  3. hacer click en submit
  4. antes de que resuelva la promesa, verificar el estado del botón
Resultado esperado: el botón está deshabilitado (disabled=true) o tiene texto de carga
```

**TEST 5: Campos vacíos no disparan la llamada al servicio**
```
Acción:
  1. mockear authService.login como vi.fn()
  2. renderizar <Login />
  3. hacer click en submit sin completar ningún campo
Resultado esperado: authService.login NO fue llamado
```

---

### `Dashboard.test.jsx`

```
SUITE: Dashboard Page
```

**TEST 1: Muestra las 4 métricas principales**
```
Acción:
  1. mockear useStats para retornar mockStats
  2. renderizar <Dashboard />
Resultado esperado:
  - el texto "2" (total) está en el DOM
  - el texto "50" o "50.0" (response_rate) está en el DOM
  - hay 4 elementos StatCard en el DOM
```

**TEST 2: Muestra estado de carga mientras carga los datos**
```
Acción:
  1. mockear useStats con loading=true
  2. renderizar <Dashboard />
Resultado esperado: los SkeletonCard están en el DOM (verificar por data-testid="skeleton-card")
  y los StatCard reales NO están en el DOM
```

**TEST 3: Muestra EmptyState cuando no hay postulaciones**
```
Acción:
  1. mockear useStats con stats.total = 0
  2. mockear useJobs con jobs = []
  3. renderizar <Dashboard />
Resultado esperado: el EmptyState está en el DOM
  (verificar por data-testid="empty-state" o por el texto del CTA "Agregar primera postulación")
```

**TEST 4: El botón "Nueva postulación" navega a /jobs/new**
```
Acción:
  1. renderizar <Dashboard /> con datos mockeados
  2. hacer click en el botón "Nueva postulación"
Resultado esperado: la ruta cambia a "/jobs/new"
```

**TEST 5: El botón "Exportar CSV" llama a exportCsv()**
```
Acción:
  1. mockear jobService.exportCsv como vi.fn() que resuelve con un Blob
  2. renderizar <Dashboard />
  3. hacer click en "Exportar CSV"
Resultado esperado: jobService.exportCsv fue llamado exactamente 1 vez
```

---

### `JobList.test.jsx`

```
SUITE: JobList Page
```

**TEST 1: Renderiza la lista de jobs**
```
Acción:
  1. mockear useJobs para retornar { jobs: mockJobs, loading: false }
  2. renderizar <JobList />
Resultado esperado:
  - "Globant" está en el DOM
  - "Mercado Libre" está en el DOM
  - hay 2 elementos JobCard en el DOM
```

**TEST 2: Muestra skeletons mientras carga**
```
Acción:
  1. mockear useJobs con loading=true, jobs=[]
  2. renderizar <JobList />
Resultado esperado: los SkeletonJobCard están en el DOM,
  "Globant" y "Mercado Libre" NO están en el DOM
```

**TEST 3: Filtro por estado llama al servicio con el parámetro correcto**
```
Acción:
  1. mockear jobService.getJobs como vi.fn()
  2. renderizar <JobList />
  3. seleccionar "Entrevista" en el select de estado
Resultado esperado: jobService.getJobs fue llamado con { status: 'interview' }
```

**TEST 4: Buscador llama al servicio después del debounce**
```
Acción:
  1. mockear jobService.getJobs como vi.fn()
  2. renderizar <JobList />
  3. escribir "globant" en el input de búsqueda
  4. esperar 350ms (más que el debounce de 300ms)
Resultado esperado: jobService.getJobs fue llamado con { search: 'globant' }
  — y NO fue llamado con cada letra individual (verificar que fue llamado máximo 2 veces)
```

**TEST 5: Buscador NO llama al servicio inmediatamente (respeta debounce)**
```
Acción:
  1. mockear jobService.getJobs como vi.fn()
  2. renderizar <JobList />
  3. escribir "g" en el input de búsqueda
  4. verificar inmediatamente (sin esperar)
Resultado esperado: jobService.getJobs NO fue llamado con { search: 'g' } todavía
```

**TEST 6: EmptyState cuando filtros no retornan resultados**
```
Acción:
  1. mockear useJobs con jobs=[] y loading=false
  2. renderizar <JobList />
Resultado esperado: el EmptyState "SIN RESULTADOS" está en el DOM
```

**TEST 7: Filtros combinados (estado + búsqueda) se envían juntos**
```
Acción:
  1. mockear jobService.getJobs como vi.fn()
  2. renderizar <JobList />
  3. seleccionar estado "interview"
  4. escribir "google" en el buscador
  5. esperar 350ms
Resultado esperado: jobService.getJobs fue llamado con { status: 'interview', search: 'google' }
```

---

### `JobDetail.test.jsx`

```
SUITE: JobDetail Page
```

**TEST 1: Muestra los datos del job**
```
Acción:
  1. mockear jobService.getJob(1) para retornar mockJobs[0]
  2. mockear jobService.getPredict(1) para retornar mockPredict
  3. renderizar <JobDetail /> con route "/jobs/1"
Resultado esperado:
  - "Globant" está en el DOM
  - "Senior Frontend Developer" está en el DOM
  - "Fintech" está en el DOM
```

**TEST 2: Muestra la predicción con score y label**
```
Acción:
  1. mockear getJob y getPredict con datos de mockPredict (score: 70, label: "Buenas chances")
  2. renderizar <JobDetail />
Resultado esperado:
  - el texto "70" está en el DOM
  - el texto "Buenas chances" está en el DOM
  - los tips están en el DOM
```

**TEST 3: Muestra el historial de cambios de estado**
```
Acción:
  1. mockear getJob con mockJobs[0] que tiene 2 entradas en history
  2. renderizar <JobDetail />
Resultado esperado: el DOM contiene 2 entradas de historial
  (verificar que hay 2 elementos con data-testid="history-item" o similar)
```

**TEST 4: Cambio de estado llama a patchJob con el nuevo estado**
```
Acción:
  1. mockear getJob(1) → mockJobs[0] (status: 'interview')
  2. mockear jobService.patchJob como vi.fn() que resuelve con éxito
  3. renderizar <JobDetail />
  4. seleccionar "Prueba Técnica" en el selector de estado
Resultado esperado: jobService.patchJob fue llamado con (1, { status: 'technical' })
```

**TEST 5: Agregar nota llama a addNote con el contenido correcto**
```
Acción:
  1. mockear getJob(1) → mockJobs[0]
  2. mockear jobService.addNote como vi.fn() que resuelve con éxito
  3. renderizar <JobDetail />
  4. escribir "Hablar con el recruiter" en el input de nota
  5. hacer click en "Agregar"
Resultado esperado: jobService.addNote fue llamado con (1, "Hablar con el recruiter")
```

**TEST 6: El input de nota se limpia después de agregar**
```
Acción:
  1. mockear los servicios necesarios
  2. escribir texto en el input de nota
  3. hacer click en "Agregar"
  4. esperar a que resuelva la promesa
Resultado esperado: el input de nota está vacío ("")
```

**TEST 7: Eliminar job abre el ConfirmModal**
```
Acción:
  1. mockear getJob(1)
  2. renderizar <JobDetail />
  3. hacer click en el botón "Eliminar"
Resultado esperado: el ConfirmModal está visible en el DOM
  (el texto de confirmación está presente)
```

**TEST 8: Confirmar eliminación llama a deleteJob y redirige**
```
Acción:
  1. mockear getJob(1)
  2. mockear jobService.deleteJob como vi.fn() que resuelve con éxito
  3. renderizar <JobDetail />
  4. hacer click en "Eliminar"
  5. hacer click en "Confirmar" en el modal
Resultado esperado:
  - jobService.deleteJob fue llamado con (1)
  - la ruta cambia a "/jobs"
```

---

## TESTS DE HOOKS

---

### `useJobs.test.js`

```
SUITE: useJobs hook
```

**TEST 1: Estado inicial correcto**
```
Acción: renderizar un componente que use useJobs()
Resultado esperado al montar:
  - jobs = []
  - loading = true (mientras carga)
  - error = null
```

**TEST 2: Carga jobs correctamente**
```
Acción:
  1. mockear jobService.getJobs para retornar mockJobs
  2. renderizar componente con useJobs()
  3. esperar a que resuelva
Resultado esperado:
  - jobs tiene 2 elementos
  - loading = false
  - error = null
```

**TEST 3: Maneja error de red**
```
Acción:
  1. mockear jobService.getJobs para rechazar con Error("Network Error")
  2. renderizar componente con useJobs()
  3. esperar a que rechace
Resultado esperado:
  - jobs = []
  - loading = false
  - error contiene algún mensaje de error (no null)
```

**TEST 4: fetchJobs con parámetros pasa los params al servicio**
```
Acción:
  1. mockear jobService.getJobs como vi.fn()
  2. usar el hook y llamar fetchJobs({ status: 'interview', search: 'globant' })
Resultado esperado: jobService.getJobs fue llamado con { status: 'interview', search: 'globant' }
```

---

### `useStats.test.js`

```
SUITE: useStats hook
```

**TEST 1: Llama a los 3 endpoints en paralelo**
```
Acción:
  1. mockear getStats, getStatsByIndustry, getTimeline como vi.fn()
  2. renderizar componente con useStats()
  3. esperar a que resuelvan
Resultado esperado: los 3 mocks fueron llamados exactamente 1 vez cada uno
```

**TEST 2: Retorna los datos correctamente**
```
Acción:
  1. mockear getStats → mockStats
  2. mockear getStatsByIndustry → []
  3. mockear getTimeline → []
  2. esperar resolución
Resultado esperado:
  - stats.total === 2
  - stats.response_rate === 50.0
  - loading = false
```

**TEST 3: loading es true mientras carga**
```
Acción:
  1. mockear los 3 servicios con Promises que no resuelven inmediatamente
  2. renderizar componente con useStats()
  3. verificar estado ANTES de que resuelvan
Resultado esperado: loading = true
```

---

## Resumen de cobertura esperada

| Archivo | Tests | Qué cubre |
|---------|-------|-----------|
| StatusBadge | 4 | Renderizado por estado, fallback |
| StatCard | 4 | Props, valor 0, subtexto |
| JobCard | 5 | Datos, navegación, formato de fecha |
| ConfirmModal | 5 | Visibilidad, callbacks, aislamiento |
| Login | 5 | Flujo completo, errores, loading, validación |
| Dashboard | 5 | Métricas, skeletons, empty state, acciones |
| JobList | 7 | Lista, filtros, debounce, combinación de filtros |
| JobDetail | 8 | Datos, predicción, historial, CRUD de notas, eliminar |
| useJobs | 4 | Estados, error, params |
| useStats | 3 | Paralelismo, datos, loading |
| **TOTAL** | **50** | — |

---

## Instrucciones finales para la IA

- Genera todos los archivos de test completos y funcionales
- Cada test debe ser independiente — no debe depender del estado de otro test
- Usar `beforeEach` para resetear mocks entre tests del mismo archivo: `vi.clearAllMocks()`
- Los mocks de servicios se hacen con `vi.mock('../services/jobService')` al inicio del archivo
- Para tests de navegación usar `MemoryRouter` con `initialEntries` y verificar con `screen` o `useLocation`
- Para tests de debounce usar `vi.useFakeTimers()` + `vi.advanceTimersByTime(350)` + `vi.useRealTimers()`
- Los `data-testid` necesarios (skeleton-card, empty-state, history-item) deben agregarse a los componentes correspondientes
- Todos los tests deben correr con `npx vitest run` y pasar en verde
- Al final, mostrar el comando para ver el reporte de cobertura: `npx vitest run --coverage`
