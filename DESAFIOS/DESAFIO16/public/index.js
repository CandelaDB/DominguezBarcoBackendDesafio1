const baseUrl = 'http://localhost:8080';

const phoneInputField = document.getElementById('phone');
const phoneInput = window.intlTelInput(phoneInputField, {
	utilsScript: 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js',
});

function RecuperarNumero(event) {
	let phone = phoneInput.getNumber();
	console.log(phone);
	document.getElementById('phoneNumber').value = phone;
}

function EliminarProducto(pid) {
	fetch(`${baseUrl}/productos/${pid}`, { method: 'DELETE' });
}

let idActualizar;
function guardarId(id) {
	return (idActualizar = id);
}
function Actualizar() {
	const data = {
		name: document.getElementById('name').value,
		description: document.getElementById('description').value,
		code: document.getElementById('code').value,
		price: document.getElementById('price').value,
		photo: document.getElementById('photo').value,
		stock: document.getElementById('stock').value,
	};

	fetch(`${baseUrl}/productos/${idActualizar}`, {
		method: 'PUT',
		body: JSON.stringify(data),
		headers: {
			'Content-type': 'application/json; charset=UTF-8',
		},
	});
}

function añadirCarrito(pid) {
	fetch(`${baseUrl}/carrito`, {
		method: 'POST',
		body: JSON.stringify({ id: pid }),
		headers: {
			'Content-type': 'application/json; charset=UTF-8',
		},
	});
}

function eliminarProducto(pid) {
	fetch(`${baseUrl}/carrito/producto`, {
		method: 'POST',
		body: JSON.stringify({ id: pid }),
		headers: {
			'Content-type': 'application/json; charset=UTF-8',
		},
	});
}
function eliminarCarrito() {
	fetch(`${baseUrl}/carrito`, { method: 'DELETE' });
}
