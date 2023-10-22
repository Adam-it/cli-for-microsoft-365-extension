param ($currentWorkspace)

if ($null -eq $currentWorkspace -or $currentWorkspace -eq "") {
    write-host "Please pass path to workspace"
    exit
}

$packageJson = Get-Content "$currentWorkspace\package.json" | ConvertFrom-Json
$oldVersion = $packageJson.version
$oldVersionParts = $oldVersion.Split(".")
$newVersion = "$($oldVersionParts[0]).$($oldVersionParts[1]).$([int]$oldVersionParts[2] + 1)"
$packageJson.version = $newVersion
$packageJson | ConvertTo-Json  -Depth 10 | Out-File "$currentWorkspace\package.json" -Encoding utf8 -Force