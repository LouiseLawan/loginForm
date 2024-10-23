// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAOvtkV4feXs8Yw2stH6p_joWjIp3UsZ-s",
  authDomain: "loginform-47fe1.firebaseapp.com",
  projectId: "loginform-47fe1",
  storageBucket: "loginform-47fe1.appspot.com",
  messagingSenderId: "260840856477",
  appId: "1:260840856477:web:130ebf5ac4d772cc642d74",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
