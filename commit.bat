@echo off
if /i "%1" == "" echo nothing commited, no reason && goto end
git add .
git commit -m "%1"
git push -u origin master

:end

