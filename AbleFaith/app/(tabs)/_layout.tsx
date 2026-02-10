// app/_layout.tsx
import { Stack } from 'expo-router';
import "../../lib/firebase";

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