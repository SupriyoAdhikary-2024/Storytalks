import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getApps, initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { initializeFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCwFFLDrZTPvtwjTEwHkyToQZSzvL0XpY0",
  authDomain: "storytalks-d9a3e.firebaseapp.com",
  projectId: "storytalks-d9a3e",
  storageBucket: "storytalks-d9a3e.firebasestorage.app",
  messagingSenderId: "1073024492680",
  appId: "1:1073024492680:web:cf1d5f94263d29c7acab3d",
};

const app = getApps().length === 0
  ? initializeApp(firebaseConfig)
  : getApps()[0];

// ✅ Version 2.x way?/?
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

// ✅ Firestore for React Native
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});

export { app };
export default app;