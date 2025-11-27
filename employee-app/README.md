# Employee App (repo root: `employee-app/employee-app`)

This directory contains the application source and CI for the Employee Management System: the backend API (`employee-be`) and the frontend SPA (`employee-fe`). Use this README for developer-focused instructions for running, building, and CI integration for the app itself. The project-level README at the repository root (`employee-app/README.md`) provides an overview.

**What’s in this folder**

- `employee-be/` — Express.js backend (Sequelize + MySQL)
- `employee-fe/` — Vue 3 + Vite frontend SPA
- `Jenkinsfile` — Jenkins pipeline used to build images and update manifests
- `Dockerfile.jenkins` — Jenkins custom image build file

**Quick start — Local development**

1. Backend

- Copy `.env` in `employee-be/` (create one if missing) with required values (see parent README for recommended settings). Example minimal `.env`:

```bash
PORT=4000
DB_HOST=localhost
DB_PORT=3306
DB_NAME=employee_app
DB_USER=emp_user
DB_PASS=karyawan!
FRONTEND_URL=http://localhost:5173
JWT_SECRET=replace_with_secret
```

- Install & run:

```bash
cd employee-app/employee-be
npm install
npm run dev   # uses nodemon
```

Server runs on `http://localhost:4000` (by default).

2. Frontend

- Create a local env file for Vite:

```bash
cd employee-app/employee-fe
# create .env.local or set VITE_API_URL in your shell
# Example .env.local:
VITE_API_URL=http://localhost:4000/api

npm install
npm run dev
```

Frontend dev server defaults to Vite's port (usually `5173`).

**Docker — build & run images**

Build backend and frontend images locally:

```bash
# Backend
cd employee-app/employee-be
docker build -t yourname/employee-be:local .

# Frontend
cd ../employee-fe
docker build -t yourname/employee-fe:local .
```

**Jenkins pipeline**

The `Jenkinsfile` in this folder is configured to:

- build Docker images for backend/frontend
- push images to a registry (configured via Jenkins credentials)
- update image tags in the manifest repository (using `yq`)

If you run the pipeline, ensure Jenkins has required credentials and permissions.

**Useful commands**

- Run backend tests or start server:
  - `npm run dev` (development)
  - `npm start` (production start)
- Build frontend for production:
  - `npm run build` (creates `dist/`)
- Lint/format and other tooling are not included by default — add as needed.

**Notes & links**

- See top-level `employee-app/README.md` for full system overview, manifest/Kubernetes instructions, and CI/CD workflow.
- The manifest files used for K8s are in `../employee-manifest` relative to this folder.

---

Last updated: November 2025
