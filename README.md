# CAPSGO

Repository for the CAPSGO project – a responsive website for SDN 003 Samarinda.

## Project Overview

CAPSGO provides a public information portal and an internal management portal for teachers (Guru) and operators. The project uses **Laravel 13** (PHP) for the backend and **React 19** with **TypeScript** and **Inertia.js** for the frontend.

## Tech Stack

- **Backend**: Laravel 13, PHP 8.3+, MySQL 8.4, Composer
- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS, Inertia.js
- **Version Control**: Git + GitHub

## Repository Structure

```
capsgo/
├─ backend/               # Laravel application (PHP)
│   ├─ app/
│   ├─ config/
│   ├─ database/
│   ├─ public/
│   ├─ resources/
│   ├─ routes/
│   ├─ composer.json
│   └─ .env.example
├─ frontend/              # React + Inertia front‑end (TypeScript)
│   ├─ src/
│   │   ├─ Pages/
│   │   └─ Components/
│   ├─ public/
│   ├─ vite.config.ts
│   ├─ tsconfig.json
│   └─ package.json
├─ docs/                  # Documentation, design specs, PRD
├─ .gitignore             # Ignored files for both back‑ and front‑end
└─ README.md              # This file
```

## Getting Started

### Prerequisites

- **PHP 8.3+** and Composer installed
- **Node.js 20+** and pnpm (or npm) installed
- **MySQL 8.4** instance

### Backend Setup

```bash
cd backend
composer install
cp .env.example .env
# Edit .env with your DB credentials
php artisan key:generate
php artisan migrate
php artisan serve
```

### Frontend Setup

```bash
cd ../frontend
pnpm install   # or npm install
pnpm dev        # starts Vite dev server
```

### Running the Full Application

1. Start the Laravel backend (`php artisan serve` runs on http://127.0.0.1:8000).
2. In another terminal, start the Vite dev server (`pnpm dev`).
3. Open the URL shown by Vite (typically http://localhost:5173) – the frontend proxies API calls to the Laravel backend.

## Contributing

- Each team member should create a feature branch (`git checkout -b feat/<description>`).
- Follow the naming conventions described in the PRD (folders kebab‑case, classes PascalCase, etc.).
- Push your branch and open a Pull Request for review.

## License

MIT (or your chosen license).