# Portfolio Backend API (FastAPI)

Minimal starter backend scaffold built with FastAPI, Pydantic, and Uvicorn.

## Setup Instructions

### 1. Create and Activate a Virtual Environment

**Windows (PowerShell):**
```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
```

**macOS / Linux:**
```bash
python3 -m venv .venv
source .venv/bin/activate
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Environment Configuration

Copy `.env.example` to `.env` (optional):
```bash
cp .env.example .env
```

`FRONTEND_ORIGIN` defaults to `http://localhost:3000`.

### 4. Run the Development Server

From inside the `backend/` directory:
```bash
uvicorn app.main:app --reload --port 8000
```

The interactive OpenAPI docs will be available at [http://localhost:8000/docs](http://localhost:8000/docs).

---

## Endpoints & Curl Examples

### Health Check (`GET /api/health`)

Verify server health status.

```bash
curl -X GET http://localhost:8000/api/health
```

**Response:**
```json
{"status": "ok"}
```

### Contact Placeholder (`POST /api/contact`)

Validates incoming contact payload (does not send or store yet).

```bash
curl -X POST http://localhost:8000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name": "Sahil Saini", "email": "sahil@example.com", "message": "Hello, love the portfolio intro!"}'
```

**Response:**
```json
{"received": true}
```
