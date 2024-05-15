import React, {useState, useEffect} from 'react';
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth';
import {getAnalytics} from 'firebase/analytics'; // Garder cette importation
import {app} from '../pages/api/firebase';

export default function Register() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [error, setError] = useState('');

	function isValidEmail(email) {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	}

	console.log(process.env.API_FIREBASE);
	console.log('register est monté');
	useEffect(() => {
		console.log('Le useEffect est rendu !');
		// if (typeof window !== 'undefined') {
		// 	const analytics = getAnalytics(app);

		// 	console.log('analyticsInstance', analytics);
		// }
	}, []);

	const handleRegistration = async () => {
		if (!isValidEmail(email)) {
			setError('Email invalide');
			return;
		}
		try {
			const auth = getAuth(app);
			await createUserWithEmailAndPassword(auth, email, password);
			Swal.fire({
				text: `Bonjour ${email} ! Votre compte a bien été créé !`,
				icon: 'success',
				timer: 3000,
				timerProgressBar: true,
				customClass: {
					timerProgressBar: '.inscription-swal-timer',
				},
			});
		} catch (error) {
			const errorCode = error.code;
			const errorMessage = error.message;

			let customErrorMessage = errorMessage;
			switch (errorCode) {
				case 'auth/invalid-email':
					customErrorMessage = 'Email invalide';
					break;
				case 'auth/email-already-in-use':
					customErrorMessage = 'Cet Email est déjà utilisé';
					break;
				case 'auth/weak-password':
					customErrorMessage = 'Votre mot de passe doit contenir au minimum 6 caractères';
					break;
				case 'auth/operation-not-allowed':
					customErrorMessage = 'Opération non autorisée';
					break;

				default:
			}
			setError(customErrorMessage);
			console.error(errorCode, customErrorMessage);
		}
	};
	return (
		<div>
			<input type='email' name='email' value={email} placeholder='email' onChange={(e) => setEmail(e.target.value)} required />
			<input
				type='password'
				name='password'
				value={password}
				placeholder='Mot de passe'
				onChange={(e) => setPassword(e.target.value)}
				required
			/>
			<input
				type='password'
				name='confirmPassword'
				placeholder='Confirmer le mot de passe'
				value={confirmPassword}
				onChange={(e) => setConfirmPassword(e.target.value)}
			/>
			<button onClick={handleRegistration}>S'inscrire</button>
			<h1>Je suis le composant Register</h1>
		</div>
	);
}
