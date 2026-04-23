$path = "src\App.jsx"
$content = Get-Content $path
$newContent = foreach ($line in $content) {
    if ($line -match '^\s*\.paulina\s*\{') {
        "          .paulina { background-image: url('/paulina.jpg'); }"
    } elseif ($line -match '^\s*\.juliana\s*\{') {
        "          .juliana { background-image: url('/juliana.jpg'); }"
    } else {
        $line
    }
}
$newContent | Set-Content $path
