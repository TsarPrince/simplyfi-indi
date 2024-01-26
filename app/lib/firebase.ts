import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { Messaging, getMessaging } from "firebase/messaging";

export const firebaseConfig = {
  apiKey: "AIzaSyAfWCuBXw99EBcOfpDEQmupmWvpYXHKsbk",
  authDomain: "simplyfi-ai.firebaseapp.com",
  projectId: "simplyfi-ai",
  storageBucket: "simplyfi-ai.appspot.com",
  messagingSenderId: "286486595837",
  appId: "1:286486595837:web:c3089183f8bedcec94d694",
  measurementId: "G-DSBRKQB5TZ",
};

let firebaseApp: FirebaseApp, messaging: Messaging;

if (typeof window !== "undefined") {
  firebaseApp =
    getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

  messaging = getMessaging(firebaseApp);
}

export { messaging };
