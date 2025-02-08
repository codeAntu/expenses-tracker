// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID,
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// export default app;

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCxz2J9-pM4ACZ1NjXdEgf5tHM1D7ugp1g',
  authDomain: 'test-22c39.firebaseapp.com',
  projectId: 'test-22c39',
  storageBucket: 'test-22c39.firebasestorage.app',
  messagingSenderId: '643462691272',
  appId: '1:643462691272:web:c66837dfb2e7c2eed0a8fd',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;