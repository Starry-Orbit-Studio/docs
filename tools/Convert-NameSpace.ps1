$Private:path = Join-Path $PSScriptRoot .. assets images
ls $path|%{if($_.Name.Contains(' ')){$_.MoveTo($_.Name.Replace(' ','_'))}}