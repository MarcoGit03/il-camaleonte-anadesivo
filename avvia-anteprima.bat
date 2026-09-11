@echo off
cd /d "%~dp0"
echo Avvio il server locale...
start "" http://localhost:8000/contatti.html
python -m http.server 8000
