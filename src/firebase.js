import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyDlBakiMLZGRvesPZ_VENATq8gY1mgRbzo",
  authDomain: "socio-image-1ee68.firebaseapp.com",
  projectId: "socio-image-1ee68",
  storageBucket: "socio-image-1ee68.appspot.com",
  messagingSenderId: "472681252914",
  appId: "1:472681252914:web:6666dd25a3b3813de7542b",
  measurementId: "G-GPRF3SQT68"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)