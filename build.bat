@echo off
cd %~dp0
REM ********************************************************************************************
REM  静的サイトのビルド処理
REM ********************************************************************************************

REM srcとcontentsを照合してホスティングに必要な情報をbuildディレクトリに出力
echo "[buildFileGenerate:start]"
node buildFileGenerator.js

REM buildディレクトリの生成に失敗した場合は処理中断
IF ERRORLEVEL 1 exit /b

REM 整形が完了してからビルド処理を実行
echo "[buildContents:start]"
start /wait /B cmd.exe /C "npx eleventy"

REM 不要な11ty.jsファイルを削除
echo "[postBuildProcess:start]"
start /wait /B cmd.exe /C "node postBuildProcessor.js"
