@echo off

SET OUTFILE=%2
SET INFILE=%1
if "%OUTFILE%"=="" SET OUTFILE=%INFILE:js=out%
echo Using %OUTFILE% for output

mocha --reporter spec --timeout=200000  %1 --captureExceptions | more /P > %OUTFILE%

type %OUTFILE%


