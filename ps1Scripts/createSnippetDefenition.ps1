param ($cliDocsFolderPath)

if ($null -eq $cliDocsFolderPath -or $cliDocsFolderPath -eq "") {
    write-host "Please pass path to cli docs folder"
    exit
}



$allCommands = Get-ChildItem -Path "$cliDocsFolderPath\docs\cmd\*.md" -Recurse -Force -Exclude "_global*"

$commandSnippets = '{'
$m365Model = @"
            {
                "commands": [
"@


foreach ($command in $allCommands) {
    $commandDocs = ConvertFrom-Markdown -Path $command
    $html = New-Object -Com 'HTMLFile'
    $html.write([ref]$commandDocs.Html)
        
    $title = $html.all.tags('h1')[0]
    $commandTitle = $title.innerText
    $titleIndex = @($html.all).IndexOf($title)
        
    $usage = $html.all.tags('h2') | Where-Object { $_.tagName -eq 'H2' } | Select-Object -First 1
    $usageIndex = @($html.all).IndexOf($usage)
    $commandDescription = @($html.all)[($titleIndex + 1)..($usageIndex - 1)]
    $commandDescription = $commandDescription | ForEach-Object { $_.innerText }
        
    $subTitles = $html.all.tags('h2') | Where-Object { $_.tagName -eq 'H2' } | Select-Object -First 3
    $optionsStartIndex = @($html.all).IndexOf($subTitles[1])
    $optionsEndIndex = @($html.all).IndexOf($subTitles[2])
    $commandOptions = @($html.all)[($optionsStartIndex + 1)..($optionsEndIndex - 1)]
    $commandOptions = $commandOptions | Where-Object { $_.nodeName -eq 'CODE' } | ForEach-Object { $_.innerText }
    $commandOptions = $commandOptions | Where-Object { $_ -match '\<(.*?)\>' }
    $commandOptions = $commandOptions | ForEach-Object { $_.split('<')[1].split('>')[0] }
    $commandOptions = $commandOptions | ForEach-Object { "--" + $_ + ' $' + $($commandOptions.IndexOf($_) + 1) }
    $commandOptions = $commandOptions -join " "

    $commandSnippets += @"
        "$commandTitle":{
            "prefix": ["m365 $commandTitle"],
            "body": ["m365 $commandTitle $commandOptions"],
            "description": "$commandDescription"
        },
"@

    $commandUrl = $command.FullName.Split("PnP\cli-microsoft365")[1]
    $commandUrl = $commandUrl.Replace('\','/')
    $m365Model += @"
    {
        "name": "$commandTitle",
        "url": "https://raw.githubusercontent.com/pnp/cli-microsoft365/main$commandUrl"
    },
"@
}

$commandSnippets = $commandSnippets.Substring(0, $commandSnippets.Length - 1)
$commandSnippets += '}'
$commandSnippets | Out-File "..\snippets\cliForMicrosoft365.code-snippets"

$m365Model = $m365Model.Substring(0, $m365Model.Length - 1)
$m365Model += ']}'
$m365Model | Out-File "..\data\m365Model.json"
