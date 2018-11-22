@echo off
gtool create-context http://localhost:7545
gtool modify-context outputType env
gtool get-accounts
call sync_env env
