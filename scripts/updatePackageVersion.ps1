param ($workingDirectory)

if ($null -eq $workingDirectory -or $workingDirectory -eq "") {
    write-host "Please pass path to working directory"
    exit
}

$packageJson = Get-Content "$workingDirectory\package.json" | ConvertFrom-Json
$oldVersion = $packageJson.version
$oldVersionParts = $oldVersion.Split(".")
$newVersion = "$($oldVersionParts[0]).$($oldVersionParts[1]).$([int]$oldVersionParts[2] + 1)"
$packageJson.version = $newVersion
$packageJson | ConvertTo-Json  -Depth 10 | Out-File "$workingDirectory\package.json" -Encoding utf8 -Force