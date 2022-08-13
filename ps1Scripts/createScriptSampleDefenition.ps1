param ($scriptSampleFolderPath)

if ($null -eq $scriptSampleFolderPath -or $scriptSampleFolderPath -eq "") {
    write-host "Please pass path to script samples from pnp/script-sample repo"
    exit
}

$allSamples = Get-ChildItem -Path "$scriptSampleFolderPath\scripts\*.md" -Recurse -Force

[hashtable]$samples = @{}

foreach ($sample in $allSamples) {
    $sampleDefenition = ConvertFrom-Markdown -Path $sample
    $html = New-Object -Com 'HTMLFile'
    $html.write([ref]$sampleDefenition.Html)

    $title = $html.all.tags('h1')[0]
    $sampleTitle = $title.innerText

    $sampleTitle
}