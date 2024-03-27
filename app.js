document.getElementById('startButton').addEventListener('click', function() {
    console.log('Botón presionado. Solicitando acceso a la cámara...');
    if (navigator.mediaDevices && typeof navigator.mediaDevices.getUserMedia === 'function') {
        console.log('mediaDevices disponible');
        Quagga.init({
            inputStream: {
                name: "Live",
                type: "LiveStream",
                target: document.querySelector('#video'), // Pasa el elemento video a Quagga
                constraints: {
                    facingMode: "environment" // Intenta usar la cámara trasera en dispositivos móviles
                },
            },
            decoder: {
                readers: ["code_128_reader"] // Ajusta según el tipo de código de barras
            }
        }, function(err) {
            if (err) {
                console.error('Error al iniciar Quagga:', err);
                return;
            }
            console.log('Quagga inicializado correctamente');
            Quagga.start();
        });

        Quagga.onDetected(function(result) {
            console.log('Código de barras detectado:', result.codeResult.code);
            enviarCodigoABackend(result.codeResult.code);
            Quagga.stop(); // Detener Quagga después de un escaneo exitoso
        });
    } else {
        console.error('mediaDevices.getUserMedia no está disponible');
    }
});
function enviarCodigoABackend(codigo) {
    var url = 'URL_DE_TU_WEB_APP';  // Reemplaza con la URL de tu Google Apps Script web app
    fetch(url, {
        method: 'POST',
        mode: 'no-cors', // Esto puede variar según tu configuración
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({codigo: codigo})
    })
    .then(response => response.text())
    .then(data => alert(data))
    .catch((error) => {
        console.error('Error:', error);
    });
}
