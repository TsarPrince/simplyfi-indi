import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import {
  Messaging,
  getMessaging,
  getToken,
  onMessage,
} from "firebase/messaging";

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

const requestNotificationPermission = async () => {
  console.log("Requesting permission...");
  const permission = await Notification.requestPermission(); // denied <> granted

  try {
    if (permission === "granted") {
      console.log("✅ Notification permission granted.");
      console.log({ messaging });

      const token = await getToken(messaging, {
        // Voluntary Application Server Identification / VAPID -> public key
        vapidKey:
          "BEJjsN1_y1rYv2thXnIVujO4ToJVR-OFh8NNL0h9iE2E8FslGv5weH-MoBKP5NeCdOM_oTnAt8E8AAyH7mhXBDg",
      });

      console.log({ token });

      onMessage(messaging, (payload) => {
        console.log("Message received. ", payload);
        // ...
      });
    } else {
      console.log("❌ Unable to get permission to notify.");
    }
  } catch (error) {
    console.log("❌ Error generating notifications");
    console.log(error);
  }
};
requestNotificationPermission();
