function onScanSuccess(decodedText, decodedResult) {
    // Aquí procesas el resultado del escaneo
    console.log(`Código escaneado: ${decodedText}`);
    document.getElementById('result').textContent = `Producto escaneado: ${decodedText}`;

    // Aquí puedes agregar la lógica para enviar los datos al servidor
    // Por ejemplo:
    // sendToServer(decodedText);
}

function onScanFailure(error) {
    // Manejar errores de escaneo aquí
    console.warn(`Fallo en el escaneo del código: ${error}`);
}

// Inicializar el escáner
let html5QrcodeScanner = new Html5QrcodeScanner(
    "qr-reader", { fps: 10, qrbox: 250 }
);
html5QrcodeScanner.render(onScanSuccess, onScanFailure);

// Función para enviar datos al servidor (ejemplo)
function sendToServer(data) {
    fetch('/api/register-sale', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            sku: JSON.parse(data).sku,
            quantity: 1,
            scannedAt: new Date().toISOString()
        })
    }).then(response => response.json())
        .then(data => console.log('Respuesta del servidor:', data))
        .catch(error => console.error('Error:', error));
}