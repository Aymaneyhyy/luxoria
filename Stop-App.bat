@echo off
echo Arret du serveur LUXORIA...
taskkill /F /IM php.exe >nul 2>&1
echo LUXORIA est arrete.
timeout /t 1 >nul
