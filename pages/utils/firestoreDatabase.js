import firebase from 'firebase/app';
import 'firebase/firestore';

// Configurer Firebase
const firebaseConfig = {
	// Vos paramètres de configuration Firebase ici
};

if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig);
}

// Récupérer une référence à Firestore
const db = firebase.firestore();

// Fonctions pour interagir avec Firestore
export const createUser = async (userData) => {
	await db.collection('users').add(userData);
};

export const getUsers = async () => {
	const querySnapshot = await db.collection('users').get();
	const users = [];
	querySnapshot.forEach((doc) => {
		users.push({id: doc.id, ...doc.data()});
	});
	return users;
};
