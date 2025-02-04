@echo off

echo =========================

echo Arrancando servidor

echo =========================

echo.

echo.

tree

dir /b

set /p nombre=Escribe el nombre del archivo que quieres abrir...

echo.

json-server --watch %nombre%.json