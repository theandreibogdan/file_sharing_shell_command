# Check if running with administrator privileges
if (-NOT ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")) {
    Write-Warning "Please run this script as Administrator!"
    break
}

# Check if Python is installed
try {
    python --version | Out-Null
} catch {
    Write-Error "Python is not installed or not in PATH. Please install Python first."
    break
}

# Create installation directory
$installDir = "$env:USERPROFILE\AppData\Local\FileSharing"
New-Item -ItemType Directory -Force -Path $installDir | Out-Null

# Download the script
$scriptUrl = "https://raw.githubusercontent.com/theandreibogdan/file_sharing_shell_command/main/serve.ps1"
$scriptPath = "$installDir\filesharing.ps1"

Invoke-WebRequest -Uri $scriptUrl -OutFile $scriptPath

# Add to PATH if not already there
$userPath = [Environment]::GetEnvironmentVariable("Path", "User")
if ($userPath -notlike "*$installDir*") {
    [Environment]::SetEnvironmentVariable(
        "Path",
        "$userPath;$installDir",
        "User"
    )
}

# Create a batch file to run the PowerShell script
$batchContent = @"
@echo off
PowerShell -NoProfile -ExecutionPolicy Bypass -File "%USERPROFILE%\AppData\Local\FileSharing\filesharing.ps1" %*
"@

Set-Content -Path "$installDir\filesharing.bat" -Value $batchContent

Write-Host "Installation complete! Please restart your terminal to use the 'filesharing' command." -ForegroundColor Green
Write-Host "Usage: Navigate to any folder and type 'filesharing' to start sharing files." -ForegroundColor Green 