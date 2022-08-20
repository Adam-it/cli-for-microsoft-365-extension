param ($scriptSampleFolderPath)

if ($null -eq $scriptSampleFolderPath -or $scriptSampleFolderPath -eq "") {
    write-host "Please pass path to script samples from pnp/script-sample repo"
    exit
}

$allSamples = Get-ChildItem -Path "$scriptSampleFolderPath\scripts\*.json" -Recurse -Force

[hashtable]$sampleModel = @{}
$samples = @()

foreach ($sample in $allSamples) {
    $sampleContent = Get-Content -Path $sample.FullName -Raw
    $sampleJson = ConvertFrom-Json -InputObject $sampleContent
    if ($sampleJson.metadata.Where({ $_.key -eq 'CLI-FOR-MICROSOFT365' }, 'First').Count -eq 0) {
        continue
    }

    if ($sampleJson.name -eq '<foldername>') {
        continue
    }

    $samples += [pscustomobject]@{title = $sampleJson.title; url = $sampleJson.url; description = $sampleJson.shortDescription; image = $sampleJson.thumbnails[0].url}
}

$sampleModel.Add('samples', $samples)
$orderedSampleModel = [ordered]@{}
foreach ($Item in ($sampleModel.GetEnumerator() | Sort-Object -Property Key)) {
    $orderedSampleModel[$Item.Key] = $Item.Value
}
New-Object -TypeName psobject -Property $orderedSampleModel | ConvertTo-Json | Out-File "..\data\samples.json"

// TODO: rename current webViews to related with functionality
// TODO: add new web view which will show samples in nice card/list view with possibility to open in browser
// TODO: add a command which will open this web view 
// TODO: add a command which will allow to search and open the doc web view