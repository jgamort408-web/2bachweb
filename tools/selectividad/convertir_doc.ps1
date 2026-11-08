param(
    [Parameter(Mandatory=$true)][ValidatePattern('^l[0-9]+$')][string]$Lote,
    [Parameter(Mandatory=$true)][string]$Soffice,
    [Parameter(Mandatory=$true)][string[]]$Fuentes,
    [switch]$Reanudar
)
# Ejecutar desde PowerShell para conservar el entorno de exportación de Writer en Windows.
$ErrorActionPreference = 'Stop'
$taskWorkspace = Split-Path (Split-Path $PSScriptRoot -Parent) -Parent
$taskTarget = Join-Path $taskWorkspace ('tmp/pdfs/selectividad-' + $Lote)
$taskCopies = Join-Path $taskTarget 'copias'
$taskConverted = Join-Path $taskTarget 'convertidos'
$taskManifest = Join-Path $taskTarget 'conversion-doc.json'
if (Test-Path -LiteralPath $taskManifest) { throw 'El manifiesto ya existe; no se sobrescribe.' }
New-Item -ItemType Directory -Force $taskCopies,$taskConverted | Out-Null
$taskExecutable = (Resolve-Path -LiteralPath $Soffice).Path
$taskVersion = (& $taskExecutable --version | Out-String).Trim()
if ($LASTEXITCODE -ne 0) { throw 'No se pudo consultar la versión.' }
$taskProfile = Join-Path $env:TEMP ('selectividad-lo-' + $Lote)
$taskProfileUri = ([System.Uri]::new($taskProfile)).AbsoluteUri
$taskExportDir = Join-Path $taskProfile 'exportaciones'
New-Item -ItemType Directory -Force $taskExportDir | Out-Null
$taskSources = Import-Csv -LiteralPath (Join-Path $taskWorkspace 'Selectividad_LaTeX/datos/fuentes.csv') -Encoding utf8
$taskLabels = @{}
$taskRecords = @()
foreach ($taskPair in $Fuentes) {
    $taskParts = $taskPair.Split('=',2)
    if ($taskParts.Count -ne 2 -or $taskParts[0] -notmatch '^[a-z]+$' -or $taskLabels.ContainsKey($taskParts[0])) { throw 'Etiqueta inválida o repetida.' }
    $taskLabel = $taskParts[0]
    $taskLabels[$taskLabel] = $true
    $taskSource = @($taskSources | Where-Object fuente_id -eq $taskParts[1])
    if ($taskSource.Count -ne 1) { throw 'Fuente no identificada de forma única.' }
    $taskSource = $taskSource[0]
    $taskOriginal = Join-Path $taskWorkspace $taskSource.ruta
    $taskHash = (Get-FileHash -LiteralPath $taskOriginal -Algorithm SHA256).Hash.ToLowerInvariant()
    if ([IO.Path]::GetExtension($taskOriginal) -ne '.doc' -or $taskHash -ne $taskSource.sha256) { throw 'El DOC no coincide con el inventario.' }
    $taskCopy = Join-Path $taskCopies ($taskLabel + '.doc')
    $taskPdf = Join-Path $taskConverted ($taskLabel + '.pdf')
    if (Test-Path -LiteralPath $taskCopy) {
        if ((Get-FileHash -LiteralPath $taskCopy -Algorithm SHA256).Hash.ToLowerInvariant() -ne $taskHash) { throw 'Copia de contenido distinto.' }
    } else { Copy-Item -LiteralPath $taskOriginal -Destination $taskCopy }
    $taskResumed = Test-Path -LiteralPath $taskPdf
    if ($taskResumed) {
        if (-not $Reanudar) { throw 'El PDF ya existe; usar -Reanudar sólo tras comprobar su procedencia.' }
        $taskStream = [IO.File]::OpenRead($taskPdf)
        try { $taskHeader = New-Object byte[] 5; [void]$taskStream.Read($taskHeader,0,5); if ([Text.Encoding]::ASCII.GetString($taskHeader) -ne '%PDF-' -or $taskStream.Length -lt 100) { throw 'PDF incompleto.' } } finally { $taskStream.Dispose() }
        $taskArguments = @()
        $taskOutput = 'Reanudación explícita: PDF de la ejecución interrumpida; copia y original verificados. No se ha reexportado.'
    } else {
    $taskExportPdf = Join-Path $taskExportDir ($taskLabel + '.pdf')
    if (Test-Path -LiteralPath $taskExportPdf) { throw 'La exportación temporal ya existe; no se sobrescribe.' }
    $taskArguments = @(('-env:UserInstallation='+$taskProfileUri),'--headless','--norestore','--convert-to','pdf:writer_pdf_Export','--outdir',$taskExportDir,$taskCopy)
    $taskOutput = (& $taskExecutable @taskArguments | Out-String).Trim()
    if ($LASTEXITCODE -ne 0 -or -not (Test-Path -LiteralPath $taskExportPdf)) { throw ('Conversión fallida: '+$taskOutput) }
    Copy-Item -LiteralPath $taskExportPdf -Destination $taskPdf
    }
    if ((Get-FileHash -LiteralPath $taskOriginal -Algorithm SHA256).Hash.ToLowerInvariant() -ne $taskHash -or (Get-FileHash -LiteralPath $taskCopy -Algorithm SHA256).Hash.ToLowerInvariant() -ne $taskHash) { throw 'Huella alterada.' }
    $taskRecords += [ordered]@{ etiqueta=$taskLabel; fuente_id=$taskSource.fuente_id; ruta_original=$taskSource.ruta; sha256_original=$taskHash; copia=$taskCopy; pdf=$taskPdf; sha256_pdf=(Get-FileHash -LiteralPath $taskPdf -Algorithm SHA256).Hash.ToLowerInvariant(); conversor=$taskVersion; ejecutable=$taskExecutable; argumentos=$taskArguments; salida=$taskOutput; reanudado=$taskResumed }
    ConvertTo-Json -Depth 8 -InputObject @($taskRecords) | Set-Content -LiteralPath (Join-Path $taskTarget 'conversion-doc.parcial.json') -Encoding utf8
    Write-Output ($taskLabel+': '+$taskPdf)
}
ConvertTo-Json -Depth 8 -InputObject @($taskRecords) | Set-Content -LiteralPath $taskManifest -Encoding utf8
Write-Output $taskVersion
