# Employee Management System

A responsive Employee Management System built with **React + TypeScript + Vite**, styled with **Tailwind CSS**, backed by a **JSON Server** mock REST API.

## Features

- **Dashboard** — summary cards for Total, Active, Inactive employees and Department count
- **Employee List** — responsive table (card layout on mobile) showing all employee fields with View / Edit / Delete actions
- **Add Employee** — validated form (required fields, email format, 10-digit phone, no future joining dates)
- **View Employee** — full details in a modal
- **Edit Employee** — update employee data via `PUT` request
- **Delete Employee** — with confirmation modal
- **Search & Filter** — search by name/email, filter by department and status, sort by joining date
- **Toast notifications** for success/error feedback
- Full CRUD wired to JSON Server via Axios

## Tech Stack

- React 19 + TypeScript
- Vite 8
- Tailwind CSS v4
- JSON Server (mock REST API)
- Axios

## Project Structure

```
src/
  api/                 # axios client + employee API service
  components/          # DashboardCards, EmployeeList, SearchFilterBar,
                        # EmployeeFormModal, EmployeeDetailsModal,
                        # DeleteConfirmModal, StatusBadge, Modal, Toast
  types/                employee.ts     # TS types & interfaces
  utils/                validation.ts   # form validation logic
  App.tsx               # main app / state orchestration
db.json                 # mock database (JSON Server)
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start everything with one command

```bash
npm run start
```

This runs the JSON Server backend (**http://localhost:5000**) and the Vite frontend (**http://localhost:5173**) together in a single terminal, using `concurrently`. Output is labeled `[BACKEND]` / `[FRONTEND]` so you can tell them apart. Press `Ctrl+C` once to stop both.

Open **http://localhost:5173** in your browser.

Backend endpoints (JSON Server):

- `GET    /employees`
- `GET    /employees/:id`
- `POST   /employees`
- `PUT    /employees/:id`
- `DELETE /employees/:id`

> Prefer two separate terminals? You can still run `npm run server` and `npm run dev` individually — `npm run start` is just a convenience wrapper around both.

### 3. Build for production

```bash
npm run build
npm run preview
```

## Notes

- The Axios base URL comes from `VITE_API_URL` (see `src/api/axiosClient.ts`), falling back to `http://localhost:5000` when not set — so local dev needs no configuration.
- Form validation lives in `src/utils/validation.ts` and covers required fields, email format, 10-digit phone numbers, and disallows future joining dates.
- Tailwind v4 is wired in via the `@tailwindcss/vite` plugin (see `vite.config.ts` and `src/index.css`).

## Deploying (backend + frontend live, end-to-end)

Netlify only serves static files — it cannot run the JSON Server backend. To get a fully working live demo (no "could not reach backend" error), deploy the two pieces separately and connect them:

### 1. Deploy the backend (JSON Server) to Render

1. Push this repo to GitHub.
2. On [render.com](https://render.com), click **New → Web Service**, connect your GitHub repo.
3. Set:
   - **Build Command**: `npm install`
   - **Start Command**: `npm run server -- --host 0.0.0.0 --port $PORT`
4. Deploy. Render gives you a live URL, e.g. `https://your-backend.onrender.com`.
5. Confirm it works by visiting `https://your-backend.onrender.com/employees` — you should see the employee JSON.

### 2. Deploy the frontend to Netlify

1. On [netlify.com](https://netlify.com), click **Add new site → Import an existing project**, choose your GitHub repo.
2. Build settings (also pre-set in `netlify.toml`):
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
3. Before deploying, go to **Site configuration → Environment variables** and add:
   - `VITE_API_URL` = `https://your-backend.onrender.com` (your Render URL from step 1)
4. Deploy. Your live Netlify URL will now talk to the live Render backend — full CRUD works end-to-end with no local servers needed.

> Free-tier Render services sleep after inactivity and take ~30–60s to wake on the first request — that's normal, not a bug.
