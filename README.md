# MediCore — Hospital Management System

A full-stack Hospital Management System built with **React.js** (frontend) and **Python Flask** (backend), now using **PostgreSQL** with authenticated role-based access.

---

## Project Structure

```
hospital-management-system/
├── backend/
│   ├── app.py              ← Flask REST API
│   ├── requirements.txt    ← Python dependencies
│   └── .env.example        ← PostgreSQL and security configuration template
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/     ← Sidebar, Topbar, Modal
    │   ├── pages/          ← Dashboard, Patients, Doctors, Appointments, Records, Wards, Staff
    │   ├── utils/api.js    ← Axios API client
    │   ├── App.js
    │   ├── index.js
    │   └── index.css
    └── package.json
```

---

## Features

- **Dashboard** — Live stats, charts (Recharts), bed occupancy, doctor availability
- **Patients** — Full CRUD with search
- **Doctors** — Full CRUD with specialization, fees, availability
- **Appointments** — Schedule, complete, cancel appointments
- **Medical Records** — Diagnoses and prescriptions per patient
- **Wards & Beds** — Occupancy tracking with visual progress bars
- **Staff** — Non-clinical personnel management

---

## Prerequisites

- Python 3.8+
- Node.js 16+ & npm

---

## Setup & Run

### Step 0 — PostgreSQL

Create a PostgreSQL database named `medicore`, then copy `backend/.env.example` to `backend/.env` and set `DATABASE_URL` and a strong `JWT_SECRET_KEY`. The project uses Psycopg 3's binary package, which supports current Windows/Python versions without compiling PostgreSQL drivers. The schema and supplied sample data are created on first backend start. Do not use the included development secret in production.

### Step 1 — Backend

```bash
cd hospital-management-system/backend
python -m venv venv

# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

pip install -r requirements.txt
python app.py
```

Backend runs at: **http://localhost:5000**

### Step 2 — Frontend (new terminal)

```bash
cd hospital-management-system/frontend
npm install
npm start
```

Frontend runs at: **http://localhost:3000**

## Authentication and roles

- The app opens on a login page. New patient accounts can be registered from there.
- A registered account is automatically linked to its own patient record. Tokens are sent as a bearer token with every API request.
- **Admin:** full access to all dashboards, patients, doctors, appointments, medical records, wards, staff, and every create/edit/delete action.
- **User:** may view doctors, view only their own records and appointments, create appointments for themselves, and cancel their own scheduled appointment. They cannot access administrative patient, ward, or staff pages.
- Initial development administrator: `admin@medicore.local` / `Admin@123`. Change this password or remove the seeded account before deployment.

## Changes made

1. Replaced the SQLite connection with a PostgreSQL `DATABASE_URL` configuration and added the PostgreSQL driver.
2. Added `users` with a password hash, role, and optional link to a patient record.
3. Added JWT login, registration, current-user endpoints, global API authentication, and server-side authorization checks.
4. Added a login/registration screen, automatic token attachment, logout, role-aware navigation, and role-aware appointment/record controls.
5. Added `.env.example` and this setup documentation. The legacy `hospital.db` is no longer used and may be deleted after migrating any data you need.

## Validation performed

- `python -m py_compile backend/app.py` completed successfully.
- A full React production build and dependency-backed Flask import could not be run in the packaging environment because it blocks Python/npm installers from writing their cache files. After installing dependencies locally, run `npm run build` in `frontend` and start the backend against PostgreSQL to complete runtime verification.

---

## API Endpoints

| Method | Endpoint | Description |
| POST | /api/auth/login | Login and receive access token |
| POST | /api/auth/register | Register a patient user account |
| GET | /api/auth/me | Current signed-in user |
|--------|----------|-------------|
| GET | /api/dashboard | Stats and recent appointments |
| GET/POST | /api/patients | List / create patients |
| GET/PUT/DELETE | /api/patients/:id | Get / update / delete patient |
| GET/POST | /api/doctors | List / create doctors |
| GET/PUT/DELETE | /api/doctors/:id | Get / update / delete doctor |
| GET/POST | /api/appointments | List / create appointments |
| PUT/DELETE | /api/appointments/:id | Update / delete appointment |
| GET/POST | /api/records | List / create medical records |
| DELETE | /api/records/:id | Delete record |
| GET/POST | /api/wards | List / create wards |
| PUT/DELETE | /api/wards/:id | Update / delete ward |
| GET/POST | /api/staff | List / create staff |
| PUT/DELETE | /api/staff/:id | Update / delete staff |
