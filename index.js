(function() {
    'use strict';

    // 1. Extraer el enlace dinámico y fresco usando la función nativa de la página
    if (typeof rlUtHepttg !== 'function') {
        console.error("[AdBlock] No se encontró la función generadora del streaming.");
        return;
    }
    const enlaceStreaming = rlUtHepttg();
    console.log("[AdBlock] Enlace capturado con éxito:", enlaceStreaming);

    // 2. Detener todos los temporizadores activos de la página (antidebuggers, scripts de anuncios, etc.)
    let idMaximo = setTimeout(function(){}, 0);
    while (idMaximo--) {
        clearTimeout(idMaximo);
        clearInterval(idMaximo);
    }

    // 3. Vaporizar por completo el HTML original de la página (Adiós anuncios)
    document.documentElement.innerHTML = `
        <head>
            <meta charset="UTF-8">
            <title>Stream Desinfectado y Limpio</title>
            <style>
                body {
                    background-color: #0b0b0e;
                    color: #efefef;
                    font-family: system-ui, -apple-system, sans-serif;
                    margin: 0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                }
                .player-card {
                    width: 90%;
                    max-width: 750px;
                    background-color: #16161a;
                    padding: 20px;
                    border-radius: 12px;
                    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.6);
                    border: 1px solid #24242b;
                    text-align: center;
                }
                h1 {
                    font-size: 1.2rem;
                    margin-top: 0;
                    margin-bottom: 15px;
                    color: #8a8ab0;
                    font-weight: 500;
                }
                video {
                    width: 100%;
                    border-radius: 6px;
                    background-color: #000;
                    display: block;
                }
            </style>
        </head>
        <body>
            <div class="player-card">
                <h1>Transmisión En Vivo (Modo Limpio)</h1>
                <video id="liveVideo" controls autoplay muted></video>
            </div>
        </body>
    `;

    // 4. Cargar la librería HLS.js dinámicamente en nuestra nueva página limpia
    const scriptHLS = document.createElement('script');
    scriptHLS.src = "https://cdn.jsdelivr.net/npm/hls.js@latest";
    
    scriptHLS.onload = function() {
        const video = document.getElementById('liveVideo');
        
        if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(enlaceStreaming);
            hls.attachMedia(video);
            hls.on(Hls.Events.MANIFEST_PARSED, function() {
                video.play();
            });
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = enlaceStreaming;
            video.addEventListener('loadedmetadata', function() {
                video.play();
            });
        }
    };

    document.head.appendChild(scriptHLS);
})();