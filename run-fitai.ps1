# FitAI PowerShell Launcher
Write-Host "===================================================" -ForegroundColor Cyan
Write-Host "       Starting FitAI Fullstack Application" -ForegroundColor Green
Write-Host "===================================================" -ForegroundColor Cyan

Write-Host "`n[1/2] Starting FitAI Backend on Port 5001..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; npm start"

Write-Host "`n[2/2] Starting FitAI Frontend on Port 3000..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; npm run dev"

Write-Host "`n===================================================" -ForegroundColor Cyan
Write-Host "FitAI is launched!" -ForegroundColor Green
Write-Host "- Frontend: http://localhost:3000" -ForegroundColor White
Write-Host "- Backend API: http://localhost:5001" -ForegroundColor White
Write-Host "===================================================" -ForegroundColor Cyan
