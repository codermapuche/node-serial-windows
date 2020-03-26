// ----------------------------------------------------------------------------
const serial = require('serial'),
// ----------------------------------------------------------------------------
			puerto = 'COM3',
			opciones = {
				baudRate: 9600,
				dataBits: 8,
				hupcl   : true,
				lock    : true,
				parity  : 'none',
				rtscts  : false,
				stopBits: 1,
				xany    : false,
				xoff    : false,
				xon     : false,
			};
// ----------------------------------------------------------------------------

var usb2ttl = new serial(puerto, opciones),
		lectura = '';

usb2ttl.on('readable', iniciar);

function parsear(buffer) {
	lectura += buffer.toString();

	let lineas = lectura.split('\n');
	lectura = lineas.pop();
	
	// Limpiar lineas con caracteres basura y vacias.
	lineas = lineas.map((l) => (l.replace(/[^\x20-\x7E]/g, '').trim()))
								 .filter(Boolean);		

	if (lineas.length == 0) {
		return;
	}
	
	// Se detcto texto en la entrada, mostrar por pantalla
	console.log(lineas);
}

function iniciar() {	
	usb2ttl.on('data', parsear);
	
	// Enviar un texto por TX cada 100ms
	setInterval(() => { 
		usb2ttl.write('Prueba\n'); 
	}, 100);
}

// ----------------------------------------------------------------------------