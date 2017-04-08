copy ..\cmtest\*.js
copy ..\cmtest\*.json

REN file1.js file1.txt
REN file2.js file2.txt
del helper.txt
copy ..\cmtest\helper.js .
REN helper.js helper.txt
del cmauto.zip
zip -D cmauto.zip cm-*.txt helper.txt
zip -D cmauto.zip *.json 
zip -D cmauto.zip deploy.bat

del cm-*.txt
del helper.txt
del *.json
