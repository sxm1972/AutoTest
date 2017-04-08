@echo off
sed -n -e "s/^\([^,]*\).*/\1/p" %CMTEMPLATES%\configdata.txt | sort | uniq
