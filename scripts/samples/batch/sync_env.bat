@echo off
if /i "%1"=="" goto end
if not exist "%1" echo File ^"%1^" does not exist. & goto end
for /f "tokens=*" %%i in (%1) do %%i
:end
