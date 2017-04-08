type CMLaunchAndBack.js
del /Q /F cm-launch-back.js

FOR /F "eol=; tokens=1,2,3,4,5,6* delims=," %%i in (configdata.txt) do sed --text -e "s/XXX1/%%i/" -e "s/XXX2/%%j/" -e "s/XXX3/%%k/" -e "s/XXX4/%%l/" -e "s/XXX5/%%m/" -e "s/XXX6/%%n/" CMLaunchAndBack.js >> cm-launch-back.js

sed --text -n -e "1,/BEGIN-INSERT/ p" CMMainPage.js > cm-main-page.js 
type  cm-launch-back.js >> cm-main-page.js 
sed --text -n -e "/END-INSERT/,$ p" CMMainPage.js >> cm-main-page.js 




