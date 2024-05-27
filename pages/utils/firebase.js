// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_API_FIREBASE,
	authDomain: 'retrogaming-50469.firebaseapp.com',
	projectId: 'retrogaming-50469',
	storageBucket: 'retrogaming-50469.appspot.com',
	messagingSenderId: '480832803245',
	appId: '1:480832803245:web:19fe13a5d5a75ff309d124',
	measurementId: 'G-HHZNTD6YMN',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {app, auth, db};
