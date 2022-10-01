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

    $readme = $sample.FullName.Replace('assets\sample.json', 'README.md')
    $readmeContent = Get-Content -Path $readme -Raw
    $type = ''
    $tabTag = ''
    if ($readmeContent.Contains("#tab/cli-m365-ps")) {
        $type = 'powershell'
        $tabTag = '#tab/cli-m365-ps'
    }
    
    if ($readmeContent.Contains("#tab/cli-m365-bash")) {
        $type = 'bash'
        $tabTag = '#tab/cli-m365-bash'
    }

    if ($readmeContent.Contains("#tab/m365cli-bash")) {
        $type = 'bash'
        $tabTag = '#tab/m365cli-bash'
    }
    
    $rawUrl = $sampleJson.url
    $rawUrl = $rawUrl.Replace('https://pnp.github.io/script-samples', 'https://raw.githubusercontent.com/pnp/script-samples/main/scripts')
    $rawUrl = $rawUrl.Replace('.html', '.md')

    $samples += [pscustomobject]@{
        title       = $sampleJson.title; 
        url         = $sampleJson.url; 
        rawUrl      = $rawUrl; 
        description = $sampleJson.shortDescription; 
        image       = $sampleJson.thumbnails[0].url; 
        type        = $type
        tabTag      = $tabTag
    }
}

$sampleModel.Add('samples', $samples)
$orderedSampleModel = [ordered]@{}
foreach ($Item in ($sampleModel.GetEnumerator() | Sort-Object -Property Key)) {
    $orderedSampleModel[$Item.Key] = $Item.Value
}
New-Object -TypeName psobject -Property $orderedSampleModel | ConvertTo-Json | Out-File "..\data\samples.json"