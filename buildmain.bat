@echo off
REM ##########################################################
REM Start Clean
REM Delete all generated js files
REM ##########################################################
del /Q /F cm-launch-back.js
del /Q /F cm-link-test.js
del /Q /F tmp.js
del /Q /F cm-main-page.js
del /Q /F cm-link-test.js
del /Q /F *-count.txt

set CONFIGFILE=%CMTEMPLATES%\configdata.txt
if NOT "%1"=="" then set CONFIGFILE=%1

REM ##########################################################
REM Generate the count of links for each nav-list panels
REM The results will be in files like chat-count.txt, 
REM inbound-count.txt, outbound-count.txt etc
REM ##########################################################
@echo on
for /f "usebackq" %%i in (`getnavlist.bat`) do sed -n -e "/^%%i.*\,[0-9]*\,/p" %CONFIGFILE% | wc -l > %%i-count.txt
REM ##########################################################
REM Generate the input for links for each nav-list panels
REM The results will be in files like chat-count.txt, 
REM inbound-count.txt, outbound-count.txt etc
REM ##########################################################

for /f "usebackq" %%i in (`getnavlist.bat`) do sed -n -e "/^%%i.*/p" %CONFIGFILE% > %%i.txt

REM ##########################################################
REM Iterating over each nav-list panel, generate the list of tests
REM which test the count of links and the individual links
REM ##########################################################
for /f "usebackq" %%i in (`getnavlist.bat`) do call genlisttests.bat %%i


REM ##########################################################
REM Substitute the generated link tests at the appropriate place
REM in the Template Main page.
REM ##########################################################
sed --text -n -e "1,/BEGINLINK/ p" %CMTEMPLATES%\CMMainPage.js > tmp.js 
type  cm-link-test.js >> tmp.js 
sed --text -n -e "/ENDLINK/,$ p" %CMTEMPLATES%\CMMainPage.js >> tmp.js 

REM ##########################################################
REM Now generate the tests to launch each link and then
REM Navigate back to the Dashboard page
REM ##########################################################
FOR /F "eol=; tokens=1,2,3,4,5,6* delims=," %%i in (%CONFIGFILE%) do sed --text -e "s/XXX1/%%i/" -e "s/XXX2/%%j/" -e "s/XXX3/%%k/" -e "s/XXX4/%%l/" -e "s/XXX5/%%m/" -e "s/XXX6/%%n/" %CMTEMPLATES%\CMLaunchAndBack.js >> cm-launch-back.js

REM ##########################################################
REM Substitute the generated link tests at the appropriate place
REM in the Template Main page.
REM ##########################################################
sed --text -n -e "1,/BEGIN-INSERT/ p" tmp.js > cm-main-page.js 
type  cm-launch-back.js >> cm-main-page.js 
sed --text -n -e "/END-INSERT/,$ p" tmp.js >> cm-main-page.js 

@echo off

REM ###################### THE END ###########################



