@echo off
title LUXORIA - Backend (Laravel)
echo ===================================================
echo   Lancement du serveur Backend Laravel (Port 8000)
echo ===================================================
cd /d "%~dp0backend"
php artisan serve
pause
