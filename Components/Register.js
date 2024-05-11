import React, {useState} from 'react';
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth';
import {isSupported, getAnalytics} from 'firebase/analytics'; // Garder cette importation
import {useNavigate} from 'react-router-dom';
import {app} from '../pages/api/firebase';

export default function Register() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [error, setError] = useState('');
	const navigate = useNavigate();

	function isValidEmail(email) {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	}

	useEffect(() => {
		// Initialiser Firebase Analytics si pris en charge et si côté client
		if (isSupported() && typeof window !== 'undefined') {
			const analyticsInstance = getAnalytics(app);
		}
	}, []);

	console.log('alalytic', analyticsInstance);
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
			navigate('/login');
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
