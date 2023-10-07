@ECHO ON

SET School=School
SET year=%date:~10,4%
SET month=%date:~4,2%
SET day=%date:~7,2%
SET time=%TIME:~0,2%%TIME:~3,2%
set dateAndTime=%year%_%month%_%day%_%time%


SET soureFolder="C:\Users\adie\Documents\react\school1\backend"
SET pathToBackup="C:\Users\adie\Documents\react\_BACKUP\school1\backend\%Backend%%dateAndTime%"  

"C:\Program Files\WinRAR\WinRAR.exe" a  %pathToBackup% %soureFolder% 

SET soureFolder="C:\Users\adie\Documents\react\school1\client"
SET pathToBackup="C:\Users\adie\Documents\react\_BACKUP\school1\client\%Client%%dateAndTime%"  


"C:\Program Files\WinRAR\WinRAR.exe" a  %pathToBackup% %soureFolder% 


PAUSE