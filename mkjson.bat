FOR /F "eol=; tokens=1,2,3,4,5,6* delims=," %%i in (%CMTEMPLATES%\configdata.txt) do SET XXX7=%%j & sed --text -e "s/XXX1/%%i/" -e "s/XXX2/%%j/" -e "s/XXX3/%%k/" -e "s/XXX4/%%l/" -e "s/XXX5/%%m/" -e "s/XXX6/%%n/"  -e "s/XXX7/%%jXXX7/;s/sXXX7//;s/XXX7//" %CMTEMPLATES%\AddModifyDeleteTemplate.json > cm-%%i-%%l.json






