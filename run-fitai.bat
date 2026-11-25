@echo off
echo ===================================================
echo           Starting FitAI Fullstack Application
echo ===================================================

echo [1/2] Starting FitAI Backend on Port 5001...
start "FitAI Backend" cmd /k "cd backend && npm start"

echo [2/2] Starting FitAI Frontend on Port 3000...
start "FitAI Frontend" cmd /k "cd frontend && npm run dev"

echo ===================================================
echo FitAI is running!
echo - Frontend: http://localhost:3000
echo - Backend API: http://localhost:5001
echo ===================================================
pause
