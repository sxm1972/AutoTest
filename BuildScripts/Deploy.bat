if "%1"=="" goto usage

if not exist "%1" goto usage

set OUTFOLDER=%1

COPY /Y file1.txt %OUTFOLDER%
COPY /Y cfile2.txt %OUTFOLDER%
COPY /Y helper.txt %OUTFOLDER%
COPY /Y file1.json %OUTFOLDER%
COPY /Y file2.json %OUTFOLDER%
COPY /Y package.json %OUTFOLDER%

cd %OUTFOLDER%

ren *.txt *.js

goto end

:usage
echo deploy <target-folder-name>
echo     - target-folder should exist

:end

