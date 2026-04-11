# JobTracker Backend

Backend REST API para **JobTracker**, una aplicacion de seguimiento de postulaciones laborales.

[![Python](https://img.shields.io/badge/Python-3.11+-3776AB?logo=python&logoColor=white)](https://www.python.org/)
[![Django](https://img.shields.io/badge/Django-4.2+-092E20?logo=django&logoColor=white)](https://www.djangoproject.com/)
[![Django REST Framework](https://img.shields.io/badge/DRF-3.14+-A30000?logo=django&logoColor=white)](https://www.django-rest-framework.org/)
[![Pytest](https://img.shields.io/badge/Tests-pytest-0A9EDC?logo=pytest&logoColor=white)](https://docs.pytest.org/)
[![License](https://img.shields.io/badge/License-Portafolio-lightgrey)](#licencia)

Este proyecto esta construido con **Django + Django REST Framework** y ofrece:

- Autenticacion JWT (registro, login, refresh)
- CRUD completo de postulaciones
- CRUD de notas por postulacion
- Historial automatico de cambios de estado (signals)
- Endpoints de metricas y analitica
- Prediccion de avance de una postulacion
- Exportacion de datos en CSV
- Documentacion OpenAPI/Swagger
- Suite de tests con `pytest`

---

## Imagenes del proyecto

> Sube tus capturas a `docs/images/` y manten estos nombres para que se vean automaticamente en GitHub.

### Swagger UI

![Swagger UI](docs/images/swagger-ui.png)

### Listado de jobs (respuesta API)

![Listado Jobs](docs/images/jobs-list-response.png)

### Estadisticas

![Stats Endpoint](docs/images/stats-endpoint.png)

### Export CSV

![Export CSV](docs/images/export-csv.png)

---

## Stack

- Python 3.10+ (probado con 3.11)
- Django 4.2+
- Django REST Framework
- SimpleJWT
- django-cors-headers
- drf-spectacular
- django-filter
- django-ratelimit
- pytest + pytest-django
- SQLite

---

## Estructura del proyecto

```text
Backend/
├── config/                # Configuracion principal Django
├── jobs/                  # App principal (modelos, views, serializers, analytics)
├── tests/                 # Suite de tests
├── manage.py
├── requirements.txt
└── pytest.ini
```

---

## Requisitos previos

- Python instalado
- pip actualizado

Opcional (recomendado):

- Entorno virtual (`venv`)

---

## Instalacion y ejecucion local

1. Ir a la carpeta del backend:

```bash
cd "c:\Users\niko2\Documents\Portafolio\Projects\Backend"
```

2. Crear y activar entorno virtual (opcional):

```bash
python -m venv .venv
.venv\Scripts\activate
```

3. Instalar dependencias:

```bash
python -m pip install -r requirements.txt
```

4. Aplicar migraciones:

```bash
python manage.py migrate
```

5. Levantar servidor:

```bash
python manage.py runserver
```

Servidor por defecto: `http://127.0.0.1:8000`

---

## Documentacion API

- Swagger UI: `http://127.0.0.1:8000/api/docs/`
- Schema OpenAPI: `http://127.0.0.1:8000/api/schema/`

---

## Endpoints principales

### Auth

- `POST /api/auth/register/`
- `POST /api/auth/login/`
- `POST /api/auth/token/refresh/`

### Jobs

- `GET /api/jobs/`
- `POST /api/jobs/`
- `GET /api/jobs/<id>/`
- `PUT /api/jobs/<id>/`
- `PATCH /api/jobs/<id>/`
- `DELETE /api/jobs/<id>/`

### Notas

- `GET /api/jobs/<job_id>/notes/`
- `POST /api/jobs/<job_id>/notes/`
- `DELETE /api/jobs/<job_id>/notes/<note_id>/`

### Analitica

- `GET /api/jobs/stats/`
- `GET /api/jobs/stats/by-industry/`
- `GET /api/jobs/stats/timeline/`
- `GET /api/jobs/<id>/predict/`
- `GET /api/jobs/export/csv/`

---

## Autenticacion

Los endpoints protegidos requieren:

```http
Authorization: Bearer <access_token>
```

---

## Rate limiting

Se aplica limite de solicitudes en endpoints sensibles:

- Registro: `5/min` por IP
- Login: `10/min` por IP
- Crear postulacion: `30/min` por usuario
- Export CSV: `10/min` por usuario

Al exceder el limite:

- Status: `429`
- Body:

```json
{ "error": "Demasiadas solicitudes. Intenta en un momento." }
```

---

## CORS

Configurado para:

- `http://localhost:5173` (frontend React)
- `http://localhost:8501` (Streamlit)

---

## Tests

Ejecutar toda la suite:

```bash
python -m pytest -v --tb=short
```

Estado actual de referencia:

- Todos los tests pasan en verde.

---

## Notas de desarrollo

- `StatusHistory` se crea automaticamente al crear/cambiar `status` de `JobApplication`.
- La logica de prediccion vive en `jobs/analytics.py`.
- El export CSV usa `StreamingHttpResponse` y codificacion UTF-8 con BOM (compatibilidad con Excel en Windows).

---

## Licencia

Proyecto de portafolio personal. Puedes adaptarlo para fines educativos o como base de tus propios proyectos.
