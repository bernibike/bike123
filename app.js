Quagga.init({
    inputStream: {
        name: "Live",
        type: "LiveStream",
        target: document.querySelector('#scanner-container'),
        constraints: {
            width: 480,
            height: 320,
            facingMode: "environment"
        },
    },
    locator: {
        patchSize: "medium",
        halfSample: true
    },
    numOfWorkers: 2,
    decoder: {
        readers: ["code_128_reader"]
    },
    locate: true
}, function(err) {
    if (err) {
        console.log(err);
        return
    }
    Quagga.start();
});

Quagga.onDetected(function(result) {
    var code = result.codeResult.code;
    document.getElementById('result').textContent = 'Resultado del escaneo: ' + code;
});
