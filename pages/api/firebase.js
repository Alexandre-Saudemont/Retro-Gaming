// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAnalytics} from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyC2rISI7cFqRycQvp5G4Yt4S2zsZUVM1Co',
	authDomain: 'retrogaming-50469.firebaseapp.com',
	projectId: 'retrogaming-50469',
	storageBucket: 'retrogaming-50469.appspot.com',
	messagingSenderId: '480832803245',
	appId: '1:480832803245:web:19fe13a5d5a75ff309d124',
	measurementId: 'G-HHZNTD6YMN',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default firebaseConfig;
