import React, {useState} from 'react';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {auth, db} from '../pages/utils/firebase.js';
import {doc, setDoc} from 'firebase/firestore';
import {useRouter} from 'next/router';
import Image from 'next/image';
import Link from 'next/link.js';
import Swal from 'sweetalert2';

export default function Register() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [error, setError] = useState('');
	const router = useRouter();

	function isValidEmail(email) {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	}
	// function navigateHome() {
	// 	router.push('/');
	// }

	const handleRegistration = async (e) => {
		// Prevent page reload which can validate registration with email / password
		e.preventDefault();

		if (!isValidEmail(email)) {
			setError('Email invalide');
			return;
		} else if (password !== confirmPassword) {
			setError('Les mots de passe ne correspondent pas');
			return;
		}
		try {
			// await createUserWithEmailAndPassword(auth, email, password);
			const userCredential = await createUserWithEmailAndPassword(auth, email, password);
			const user = userCredential.user;

			await setDoc(doc(db, 'users', user.uid), {
				email: user.email,
				uid: user.uid,
				createdAt: new Date(),
			});

			setEmail('');
			setPassword('');
			setConfirmPassword(''); //
			Swal.fire({
				text: `Bonjour ${email} ! Votre compte a bien été créé !`,
				icon: 'success',
				timer: 2500,
				timerProgressBar: true,
				customClass: {
					timerProgressBar: '.inscription-swal-timer',
				},
			});
			setTimeout(() => {
				router.push('/Login');
			}, 2500);
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
		<div className='Register'>
			<picture>
				<Link href='/'>
					<Image src='/icon-home-gameboy.svg' alt='Logo' width={50} height={50} />
				</Link>
			</picture>

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
		</div>
	);
}
