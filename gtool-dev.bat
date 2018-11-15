::Ganache toolbox v1
@echo off
if not exist "%~dp0index.js" (
    echo error: file index.js is missing!
    goto end
)
node "%~dp0index.js" %1 %2 %3 %4 %5 %6 %7 %8 %9
:end
