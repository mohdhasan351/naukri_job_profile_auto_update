@echo off
cd /d "%~dp0"
if not exist logs mkdir logs
echo ---- %date% %time% ---- >> logs\loginTest.log
"C:\Program Files\nodejs\node.exe" scripts\loginTest.js >> logs\loginTest.log 2>&1
