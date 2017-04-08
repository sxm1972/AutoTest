echo 		// Tests for %1 >> cm-link-test.js
echo 		test.describe('Dashboard page', function (done) { >> cm-link-test.js
set COUNTER=0

for /f  "usebackq" %%i in (%1-count.txt) do sed --text -e "s/XXXCOUNT/%%i/" -e "s/XXX1/%1/" -e "s/XXX2/%1/" %CMTEMPLATES%\CMLinkCountTest.js >> cm-link-test.js

FOR /F "eol=; tokens=1,2,3,4,5,6* delims=," %%i in (%1.txt) do sed --text -e "s/XXX1/%%i/" -e "s/XXX2/%%j/" -e "s/XXX3/%%k/" -e "s/XXX4/%%l/" -e "s/XXX5/%%m/" -e "s/XXX6/%%n/" -e "s/XXXY/%COUNTER%/" %CMTEMPLATES%\CMLinkTest.js >> cm-link-test.js && set /A COUNTER=COUNTER+1

echo 		}); // end describe %COUNTER%  %1-links >> cm-link-test.js 


del /Q /F %1.txt





