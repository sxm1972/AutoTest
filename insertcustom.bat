REM ##########################################################
REM Substitute the custom tests at the appropriate place
REM in the Template Main page.
REM ##########################################################
IF NOT EXIST %1.new GOTO END

sed --text -n -e "1,/BEGINCUSTOMINSERT/ p" %1 > tmp.js 
sed --text -n -e "/BEGINCUSTOMINSERT\|ENDCUSTOMINSERT/! p"   %1.new >> tmp.js 
sed --text -n -e "/ENDCUSTOMINSERT/,$ p" %1 >> tmp.js 

copy /Y tmp.js %1
del /Q /F tmp.js

:END

