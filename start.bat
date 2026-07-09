@echo off
echo ===================================================
echo Starting Quiz Platform (Dev Arena Edition)
echo ===================================================
echo.

echo [1/2] Starting Python Flask Backend...
start "Quiz Backend" cmd /k "cd backend && call venv\Scripts\activate && python app.py"

echo [2/2] Starting React Frontend...
start "Quiz Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo Both servers have been launched in separate windows!
echo Backend is running on http://127.0.0.1:5000
echo Frontend is running on http://localhost:5173
echo.
pause
