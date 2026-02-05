import { Stack } from 'expo-router';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; // ⭐ ADD THIS

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDXS1CL1dqgTnn4vTVwRNiIYq_l_w6kyWU",
  authDomain: "dentondevelopers.firebaseapp.com",
  projectId: "dentondevelopers",
  storageBucket: "dentondevelopers.firebasestorage.app",
  messagingSenderId: "341357377717",
  appId: "1:341357377717:web:e3e4d734c9843239c766fc",
  measurementId: "G-7D2E15GTJS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const myDb = getFirestore(app); // ⭐ EXPORT FIRESTORE

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index"/>
      <Stack.Screen name="login"/>
      <Stack.Screen name="home"/>
      <Stack.Screen name="programs" options={{ title: 'Programs' }} />
      <Stack.Screen name="events" options={{ title: 'Events' }} />
      <Stack.Screen name="about-us" options={{ title: 'About Us' }} />
      <Stack.Screen name="get-involved" options={{ title: 'Get Involved' }} />
      <Stack.Screen name="donate" options={{ title: 'Donate'}} />
    </Stack>
  );
}
