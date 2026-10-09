@echo off
title LUXORIA - Demarrage Complet
echo ===================================================
echo   Demarrage de LUXORIA (Backend + Frontend)
echo ===================================================
start "LUXORIA - Backend" cmd /k "cd /d %~dp0backend && php artisan serve"
ping 127.0.0.1 -n 3 >nul
start "LUXORIA - Frontend" cmd /k "cd /d %~dp0frontend && npm run dev"
echo.
echo Les 2 serveurs sont demarres dans deux invites de commande separees :
echo   - Backend : http://127.0.0.1:8000
echo   - Frontend : http://127.0.0.1:5173
echo.
echo Ouverture automatique de http://127.0.0.1:8000 dans votre navigateur...
start http://127.0.0.1:8000
