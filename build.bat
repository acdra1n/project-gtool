@echo off

echo Build started [%date%]

if not exist build mkdir build
if not exist build\linux mkdir build\linux
if not exist build\macos mkdir build\macos
if not exist build\win mkdir build\win

echo Copying scrypt binary...
copy /y .\node_modules\scrypt\build\Release\scrypt.node build\win > nul
copy /y .\node_modules\scrypt\build\Release\scrypt.node build\macos > nul
copy /y .\node_modules\scrypt\build\Release\scrypt.node build\linux > nul

echo Copying license...
copy /y .\LICENSE.MD build\win\LICENSE.MD > nul
copy /y .\LICENSE.MD build\macos\LICENSE.MD > nul
copy /y .\LICENSE.MD build\linux\LICENSE.MD > nul

echo Building binary for Windows...
call pkg -t node8-win index.js -o build\win\gtool.exe > build\build_pkg_win.log

echo Building binary for macOS...
call pkg -t node8-macos index.js -o build\macos\gtool > build\build_pkg_macos.log

echo Building binary for Linux...
call pkg -t node8-linux index.js -o build\linux\gtool > build\build_pkg_linux.log