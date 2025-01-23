# File Sharing with Python Sever (as a shell command)
Requirements: python3 with http.server

## For Linux & MacOS
This is a file sharing shell command that uses python http.server.

1. Place this script in `/usr/local/bin`
2. Navigate to the folder you want to share in your local network
3. Execute in the terminal `filesharing`
4. Grab the URL that it showed you and open it on another pc
5. Download the files
6. When you CTRL + C, it will also kill the process and free the port
7. Enjoy

```
#!/bin/bash

# Default port
PORT=8000

# Check if the port is in use
while lsof -i :$PORT > /dev/null 2>&1; do
    echo "Port $PORT is in use. Trying the next port..."
    ((PORT++))
done

# Start the HTTP server on an available port
python3 -m http.server $PORT &

# Get the process ID of the background server
SERVER_PID=$!

# Trap to kill the server when the script exits (including on CTRL+C)
trap 'kill $SERVER_PID 2>/dev/null' EXIT

# Get the local IP address
IP=$(ifconfig | grep -Eo 'inet (addr:)?([0-9]*\.){3}[0-9]*' | grep -Eo '([0-9]*\.){3}[0-9]*' | grep -v '127.0.0.1')

echo "Serving files at http://$IP:$PORT"

# Wait for the server process
wait $SERVER_PID
```

## For Windows:
Save as serve.ps1
```

$port = 8000

# Check if port is in use
while ($true) {
  $portInUse = Test-NetConnection -ComputerName localhost -Port $port -InformationLevel Quiet
  if (-not $portInUse) { break }
  Write-Host "Port $port is in use. Trying the next port..."
  $port++
}

# Start Python server
$serverJob = Start-Process -PassThru -NoNewWindow python "@('-m', 'http.server', $port)"
$serverPID = $serverJob.Id

# Cleanup on exit
Register-EngineEvent -SourceIdentifier PowerShell.Exiting -Action {
  Stop-Process -Id $serverPID -ErrorAction SilentlyContinue
} | Out-Null

# Get local IP (skip loopback/localhost)
$ip = (Get-NetIPAddress | Where-Object {
  $_.AddressFamily -eq 'IPv4' -and $_.IPAddress -ne '127.0.0.1'
} | Select-Object -First 1).IPAddress

Write-Host "Serving files at http://$($ip):$port"
Write-Host "Press CTRL+C to stop..."

# Keep script running
try {
  Wait-Event
} finally {
  Exit
}
```

For Windows, ensure Python is installed and added to your PATH
