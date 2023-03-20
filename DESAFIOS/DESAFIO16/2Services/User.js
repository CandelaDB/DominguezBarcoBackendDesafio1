import Persistence from '../1Persistence/Persistence.js';
import Models from '../1Models/User.js';
import bCrypt from 'bcrypt';

function createHash(password) {
	return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

async function getUser(Correo) {
	const result = await Persistence.getUsername(Models, Correo);
	return result;
}

async function postUser(Usuario, url, username, password) {
	const newUser = {
		name: Usuario.name,
		lastName: Usuario.lastName,
		address: Usuario.address,
		age: Usuario.age,
		phoneNumber: Usuario.phoneNumber,
		photo: url,
		username,
		password: createHash(password),
	};
	const result = await Persistence.add(Models);
	return result;
}

export default { getUser, postUser };
