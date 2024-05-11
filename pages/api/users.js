import {createUser, getUsers} from '../../services/firebaseService';

export default async (req, res) => {
	if (req.method === 'POST') {
		try {
			// Créer un utilisateur avec les données de la requête
			await createUser(req.body);
			res.status(201).json({message: 'User created successfully'});
		} catch (error) {
			res.status(500).json({error: 'Failed to create user'});
		}
	} else if (req.method === 'GET') {
		try {
			// Récupérer tous les utilisateurs
			const users = await getUsers();
			res.status(200).json(users);
		} catch (error) {
			res.status(500).json({error: 'Failed to fetch users'});
		}
	} else {
		res.status(405).end(); // Méthode HTTP non autorisée
	}
};
