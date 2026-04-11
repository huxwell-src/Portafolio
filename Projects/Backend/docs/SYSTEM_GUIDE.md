# JobTracker Backend - Guia del Sistema

Este documento explica como esta construido el backend, como modificarlo con seguridad y como extender cualquier parte del sistema.

---

## 1) Vista general

El backend usa Django + DRF y esta dividido en:

- `config/`: configuracion global (settings, urls, handlers)
- `jobs/`: dominio principal (modelos, serializers, views, permisos, analytics, signals)
- `tests/`: suite de pruebas automatizadas

Flujo principal de una request:

1. URL entra por `config/urls.py`
2. Router de DRF deriva a `jobs/views.py`
3. ViewSet/APIView valida auth + permisos + rate limit
4. Serializer valida/transforma datos
5. Model guarda cambios
6. Signal en `jobs/signals.py` registra historial cuando cambia el status
7. Response JSON/CSV vuelve al cliente

---

## 2) Arquitectura por capa

### Configuracion (`config/`)

- `settings.py`: apps instaladas, JWT, CORS, DRF, drf-spectacular, rate limit handler.
- `urls.py`: monta endpoints API + docs (`/api/docs/`, `/api/schema/`).
- `views.py`: respuesta JSON estandar de rate limiting (`429`).

### Dominio (`jobs/`)

- `models.py`
  - `JobApplication`: postulacion
  - `StatusHistory`: historial de cambios de estado
  - `Note`: notas de cada postulacion
- `serializers.py`
  - `RegisterSerializer`
  - `JobApplicationListSerializer`
  - `JobApplicationDetailSerializer` (incluye `notes` + `history`)
  - `NoteSerializer`
  - `StatusHistorySerializer`
- `permissions.py`
  - `IsOwner`: evita acceso a recursos de otros usuarios
- `signals.py`
  - Registra `StatusHistory` automatico al crear/cambiar `status`
- `analytics.py`
  - `calculate_stats`
  - `calculate_by_industry`
  - `calculate_timeline`
  - `predict_advance`
- `views.py`
  - Auth: register/login/refresh
  - CRUD jobs
  - Notas
  - Stats + predict + export CSV

### Testing (`tests/`)

- `conftest.py`: fixtures reutilizables
- `test_auth.py`, `test_jobs.py`, `test_notes.py`, `test_stats.py`, `test_predict.py`, `test_export.py`, `test_signals.py`

---

## 3) Como ejecutar el proyecto

```bash
cd "c:\Users\niko2\Documents\Portafolio\Projects\Backend"
python -m pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

Documentacion:

- Swagger: `http://127.0.0.1:8000/api/docs/`
- Schema: `http://127.0.0.1:8000/api/schema/`

---

## 4) Como correr y mantener tests

Ejecutar toda la suite:

```bash
python -m pytest -v --tb=short
```

Ejecutar un archivo puntual:

```bash
python -m pytest tests/test_jobs.py -v --tb=short
```

Ejecutar un test puntual:

```bash
python -m pytest tests/test_stats.py::test_stats_general_counts -v --tb=short
```

Regla practica: cada cambio funcional debe venir con test o ajuste de test.

---

## 5) Como modificar cualquier parte sin romper

### A) Agregar un nuevo campo a `JobApplication`

1. Editar `jobs/models.py`
2. Si se expone por API, actualizar serializers en `jobs/serializers.py`
3. Si afecta logica de negocio, ajustar `jobs/analytics.py` o `jobs/views.py`
4. Crear migracion y aplicar:
   - `python manage.py makemigrations`
   - `python manage.py migrate`
5. Agregar/ajustar tests
6. Ejecutar `pytest`

### B) Agregar endpoint nuevo

1. Crear accion en `JobViewSet` o nueva clase en `jobs/views.py`
2. Registrar ruta en `jobs/urls.py` (si aplica)
3. Definir serializer de entrada/salida (si hace falta)
4. Agregar test dedicado (happy path + edge cases + permisos)

### C) Cambiar reglas de prediccion

1. Editar solo `jobs/analytics.py` en `predict_advance`
2. Mantener limites de score `0..100`
3. Verificar labels esperados por rango
4. Ajustar `tests/test_predict.py`

### D) Ajustar export CSV

1. Editar `export_csv` en `jobs/views.py`
2. Mantener:
   - `StreamingHttpResponse`
   - Header `Content-Disposition` con `jobtracker_export.csv`
   - Compatibilidad UTF-8 con BOM
3. Validar `tests/test_export.py`

---

## 6) Seguridad, permisos y rate limiting

- Auth global: JWT (`IsAuthenticated` por defecto en DRF)
- Recursos por usuario: `IsOwner`
- Rate limits en endpoints sensibles:
  - register: `5/min` por IP
  - login: `10/min` por IP
  - create job: `30/min` por usuario/IP
  - export csv: `10/min` por usuario/IP
- Error de rate limit estandar:
  - `429` + `{"error": "Demasiadas solicitudes. Intenta en un momento."}`

---

## 7) Convenciones de respuesta API

- JSON para endpoints `/api/*` (excepto CSV)
- Fechas en ISO (`YYYY-MM-DD` o datetime ISO)
- Errores:
  - Validacion: `{ "campo": ["mensaje"] }`
  - General: `{ "error": "mensaje" }` o `detail` de DRF

---

## 8) Troubleshooting rapido

### Error: `pytest` no reconocido
Usar:

```bash
python -m pytest -v --tb=short
```

### Error 401 en endpoints
Revisar header:

```http
Authorization: Bearer <access_token>
```

### Error 403 en detalle/edicion
El recurso pertenece a otro usuario (`IsOwner`).

### Cambie modelos y falla DB
Ejecutar migraciones:

```bash
python manage.py makemigrations
python manage.py migrate
```

---

## 9) Checklist antes de push

1. `python -m pytest -v --tb=short` en verde
2. Revisar que endpoints criticos sigan contrato esperado
3. Revisar docs de README y Swagger si hubo cambios
4. No subir archivos de prompt internos ni datos sensibles

---

## 10) Archivos clave de referencia

- `config/settings.py`
- `config/urls.py`
- `jobs/models.py`
- `jobs/serializers.py`
- `jobs/views.py`
- `jobs/analytics.py`
- `jobs/signals.py`
- `tests/`

Con esta guia puedes entender la estructura completa y modificar el sistema de forma segura, manteniendo comportamiento y cobertura.
