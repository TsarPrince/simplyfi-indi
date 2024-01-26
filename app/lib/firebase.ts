import { initializeApp, getApps } from "firebase/app";
import { getMessaging, isSupported, getToken } from "firebase/messaging";

export const firebaseConfig = {
  apiKey: "AIzaSyAfWCuBXw99EBcOfpDEQmupmWvpYXHKsbk",
  authDomain: "simplyfi-ai.firebaseapp.com",
  projectId: "simplyfi-ai",
  storageBucket: "simplyfi-ai.appspot.com",
  messagingSenderId: "286486595837",
  appId: "1:286486595837:web:c3089183f8bedcec94d694",
  measurementId: "G-DSBRKQB5TZ",
};

export const firebaseApp =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const messaging = getMessaging(firebaseApp);
