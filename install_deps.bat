@echo off
echo Installing dependencies for project-gtool...
::TODO add version specifier for web3
call npm install web3 math-expression-evaluator
call npm install pkg npm-bundle -g