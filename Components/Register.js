import React, {useState, useEffect} from 'react';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../pages/utils/firebase.js';

export default function Register() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [error, setError] = useState('');

	function isValidEmail(email) {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	}
	console.log('auth', auth);
	const handleRegistration = async () => {
		if (!isValidEmail(email)) {
			setError('Email invalide');
			return;
		} else if (password !== confirmPassword) {
			setError('Les mots de passe ne correspondent pas');
			return;
		}
		try {
			await createUserWithEmailAndPassword(auth, email, password);
			console.log('Registration');
			setEmail('');
			setPassword('');

			// Swal.fire({
			// 	text: `Bonjour ${email} ! Votre compte a bien été créé !`,
			// 	icon: 'success',
			// 	timer: 3000,
			// 	timerProgressBar: true,
			// 	customClass: {
			// 		timerProgressBar: '.inscription-swal-timer',
			// 	},
			// });
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
			console.log('aprèscreateuser: ' + customErrorMessage);
			setError(customErrorMessage);
			console.error(errorCode, customErrorMessage);
		}
	};
	return (
		<form onSubmit={handleRegistration} method='POST'>
			<input type='email' name='email' value={email} placeholder='Email' onChange={(e) => setEmail(e.target.value)} required />
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
			<button type='submit'>S'inscrire</button>
			<h1>Je suis le composant Register</h1>
		</form>
	);
}
