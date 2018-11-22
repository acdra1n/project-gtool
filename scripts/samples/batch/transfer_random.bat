@echo off
::Change value if more transactions should be made
set TRANSACTIONS_TO_MAKE=100
echo Creating context...
gtool create-context http://localhost:7545 > gtool.log
gtool modify-context outputType env > gtool.log
echo Sending %TRANSACTIONS_TO_MAKE% transactions...
gtool generate-random transactions %TRANSACTIONS_TO_MAKE% > gtool.log
call sync_env env
if not "%errorlevel%"=="0" (
	echo Transfer failed!
	goto end
) else (
	echo Transfer completed!
	echo Source: %gt_src%
	echo Destination: %gt_dest%
	echo Amount: %gt_amount% Wei
)

:end
