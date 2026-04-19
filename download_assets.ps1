# Script para descargar imágenes y videos de Wix a la carpeta local de Distorxion

$assetsDir = "assets/portfolio"
if (-not (Test-Path $assetsDir)) {
    New-Item -ItemType Directory -Path $assetsDir -Force
}

$assets = @(
    # Imágenes
    @{ url = "https://static.wixstatic.com/media/215385_5c47c3f0d277483aa1fc0fcb7e889e7a~mv2.jpg"; name = "digweed_1.jpg" },
    @{ url = "https://static.wixstatic.com/media/215385_86dbf7ae5abf47e48df2657b969baad3~mv2.jpg"; name = "mutek_1.jpg" },
    @{ url = "https://static.wixstatic.com/media/215385_454eddbec98e4582932dc4c19cc4e76f~mv2.jpg"; name = "innervisions_1.jpg" },
    @{ url = "https://static.wixstatic.com/media/215385_9e5fb92176d84346bf4a6a6909ed8d98f000.jpg"; name = "underclub_1.jpg" },
    @{ url = "https://static.wixstatic.com/media/215385_f766b57a9fa4419087f75d4835173a0ef000.jpg"; name = "planetario_1.jpg" },
    @{ url = "https://static.wixstatic.com/media/215385_ff6e4cbafbf8414ba33a634e1dfe6a0a~mv2.jpg"; name = "utopia_1.jpg" },
    @{ url = "https://static.wixstatic.com/media/215385_83366bb411f24a879486c210cd8b8a6b~mv2.jpg"; name = "lixis_1.jpg" },
    @{ url = "https://static.wixstatic.com/media/215385_34ef5c62c60742838e9e11e2f68c249ef000.jpg"; name = "0800_1.jpg" },
    @{ url = "https://static.wixstatic.com/media/215385_4a8e94598aeb4384abccddcc1cddf88bf000.jpg"; name = "editoriales_1.jpg" },
    @{ url = "https://static.wixstatic.com/media/215385_749e75e940bb4e3491c998f5d2792992~mv2.jpg"; name = "experimental_1.jpg" },
    @{ url = "https://static.wixstatic.com/media/215385_14fec084038c413badcb07eafcd4c8f1~mv2.jpg"; name = "comite_1.jpg" },

    # Videos
    @{ url = "https://video.wixstatic.com/video/215385_82af21f181b946e0bec39110570ad351/720p/mp4/file.mp4"; name = "digweed_video.mp4" },
    @{ url = "https://video.wixstatic.com/video/215385_9e5fb92176d84346bf4a6a6909ed8d98/720p/mp4/file.mp4"; name = "underclub_video.mp4" },
    @{ url = "https://video.wixstatic.com/video/215385_68a8f233a3b3477cb695879a4f54c7ee/720p/mp4/file.mp4"; name = "experimental_video.mp4" }
)

foreach ($asset in $assets) {
    $dest = Join-Path $assetsDir $asset.name
    if (-not (Test-Path $dest)) {
        Write-Host "Descargando $($asset.name)..."
        try {
            Invoke-WebRequest -Uri $asset.url -OutFile $dest
        } catch {
            Write-Warning "No se pudo descargar $($asset.url)"
        }
    } else {
        Write-Host "$($asset.name) ya existe."
    }
}

Write-Host "Descarga completada en $assetsDir"
