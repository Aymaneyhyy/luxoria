Set WshShell = CreateObject("WScript.Shell")
Set fso = CreateObject("Scripting.FileSystemObject")
currentDir = fso.GetParentFolderName(WScript.ScriptFullName)

' Verifie si le serveur repond deja sur le port 8000
On Error Resume Next
Set http = CreateObject("MSXML2.ServerXMLHTTP.6.0")
http.open "GET", "http://127.0.0.1:8000", False
http.setTimeouts 600, 600, 600, 600
http.send

If Err.Number <> 0 Or http.status = 0 Then
    Err.Clear
    ' Le serveur n'est pas lance : lancement silencieux en arriere-plan
    WshShell.Run "cmd /c cd /d """ & currentDir & "\backend"" && php artisan serve", 0, False
    WScript.Sleep 2000
End If
On Error GoTo 0

' Ouverture dans une fenetre d'application independante (style application native)
WshShell.Run "msedge --app=http://127.0.0.1:8000", 1, False
