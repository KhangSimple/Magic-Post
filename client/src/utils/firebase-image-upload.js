//Firebase storage
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDxWk7JQN3dv1mrzynvLlSH8jxIt3B9GqY",
    authDomain: "magicpostuet-35fa7.firebaseapp.com",
    projectId: "magicpostuet-35fa7",
    storageBucket: "magicpostuet-35fa7.appspot.com",
    messagingSenderId: "1004594450925",
    appId: "1:1004594450925:web:80ec80bb94f9e76c2117e4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const imageDB = getStorage(app);