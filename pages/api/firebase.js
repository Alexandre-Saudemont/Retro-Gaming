// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
	apiKey: process.env.API_FIREBASE,
	authDomain: 'retrogaming-50469.firebaseapp.com',
	projectId: 'retrogaming-50469',
	storageBucket: 'retrogaming-50469.appspot.com',
	messagingSenderId: '480832803245',
	appId: '1:480832803245:web:19fe13a5d5a75ff309d124',
	measurementId: 'G-HHZNTD6YMN',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default firebaseConfig;
