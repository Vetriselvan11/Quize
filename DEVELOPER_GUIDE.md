# Developer Guide - Quiz Platform (Dev Arena Edition)

Welcome to the **Developer Guide** for the Quiz Platform project. This document serves as a comprehensive manual for developers looking to set up, understand, and contribute to the project.

---

## 1. Tech Stack Overview

### Frontend
* **Framework:** React 19
* **Build Tool:** Vite
* **Styling:** Vanilla CSS (`.css` files) utilizing standard CSS variables for theming.
* **Routing:** `react-router-dom` (v7) for Single Page Application navigation.
* **State Management:** React Context API (`AuthContext.jsx`) and local component state (`useState`).

### Backend
* **Framework:** Python / Flask
* **API Structure:** RESTful API architecture providing endpoints for authentication, quiz management, and result processing.
* **Database/Storage:** Local JSON file storage (NoSQL style data structures saved in `/data` folder).
* **Environment:** Python Virtual Environment (`venv`).

---

## 2. Project Architecture & Structure

The repository is divided into two primary directories: `backend` and `frontend`.

### `backend/`
* `app.py`: The main Flask application entry point. Registers blueprints and starts the server.
* `routes/`: Contains route definitions (e.g., `auth_routes.py`, `quiz_routes.py`).
* `services/`: Contains the core business logic (e.g., `auth_service.py`, `quiz_service.py`).
* `data/`: The local JSON files acting as our database (`users.json`, `admins.json`, `quizzes.json`, `results.json`).
* `utils/`: Helper functions (e.g., `password_utils.py` for plain-text or hashed password logic).

### `frontend/`
* `src/components/`: Reusable React components (`Navbar.jsx`, `AdminRoute.jsx`, `ProtectedRoute.jsx`).
* `src/pages/`: Page-level components corresponding to specific routes (`Home.jsx`, `UserDashboard.jsx`, `ManageQuizzes.jsx`, `QuizAttempt.jsx`, etc.).
* `src/services/`: Axios wrappers for communicating with the Flask API (`api.js`, `authService.js`, `quizService.js`, `adminService.js`).
* `src/context/`: React context providers (`AuthContext.jsx` manages global user authentication state).
* `src/styles/`: Vanilla CSS files (`global.css`, `auth.css`, `dashboard.css`, `quiz.css`).

---

## 3. Setup & Installation

### Prerequisites
* **Node.js** (v18+ recommended)
* **Python** (3.8+ recommended)
* **Git**

### Backend Setup
1. Open a terminal and navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment (Windows):
   ```bash
   python -m venv venv
   .\venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Start the Flask server (runs on `http://127.0.0.1:5000`):
   ```bash
   python app.py
   ```

### Frontend Setup
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install Node dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server (runs on `http://localhost:5173`):
   ```bash
   npm run dev
   ```

---

## 4. Design & Theming System

The UI was redesigned as a **"Premium Developer / Coding Battle Platform"**. It intentionally avoids generic neon/gaming tropes (like PUBG/Casino styles) and relies on a clean, sharp, developer-focused aesthetic.

### Theme Variables (`frontend/src/styles/global.css`)
* **Background (`--bg-color`)**: `#0f172a` (Deep Slate/Navy) - *No pure black (#000000) is used.*
* **Cards (`--card-bg`)**: `#1e293b` (Soft Graphite/Dark Slate)
* **Borders (`--border-color`)**: `#334155` (Metallic Slate)
* **Primary Accent (`--primary-color`)**: `#0ea5e9` (Cyan Blue)
* **Typography**: 
  * `--font-main`: `'Inter', sans-serif` for primary readability.
  * `--font-code`: `'Fira Code', monospace` used for scores, badges, statistics, and user profiles (`<Username/>`) to reinforce the developer feel.

### UI Guidelines for Future Components
* **Avoid Excessive Glows**: Do not use heavy `text-shadow` or `box-shadow` on standard elements. Keep the UI flat and practical.
* **Terminology**: Use coding/developer terms (e.g., "Dev Arena", "Compilation Stats", "Test Passed") instead of typical gaming terms (e.g., "Victory", "Battle Royale").
* **Quiz Options**: Quiz options use a `::before` pseudo-element to render a terminal-style `>` arrow. Maintain this pattern for consistency.

---

## 5. Data Flow & State Management

### Authentication Flow
1. User submits login form via `Login.jsx`.
2. `authService.login(email, password)` sends a POST request to `/api/auth/login`.
3. Backend validates against `data/users.json` (or `admins.json`) and returns a JWT or plain text token.
4. Token is stored in `localStorage` (`quiz_token`, `quiz_user_role`, `quiz_user`).
5. `AuthContext.jsx` reads `localStorage` and updates global `user` and `role` states, triggering a re-render.
6. The user is redirected to `/dashboard` (User) or `/admin` (Admin).

### Default Credentials for Testing
* **Admin:** `admin@quiz.com` / `admin`

### Data Storage Rules
Because the backend utilizes JSON files for storage, this app is highly portable but **state is ephemeral on serverless hosts** (like Render/Heroku).
* Any new user registrations or quiz attempts modify the JSON files directly.
* Ensure you have write permissions to the `backend/data/` folder when running locally.

---

## 6. Available Scripts

* **Frontend:** `npm run dev` (Starts dev server), `npm run build` (Builds production bundle).
* **Backend:** `python app.py` (Starts Flask dev server).

---
*Maintained by the Quiz Platform Dev Team.*
