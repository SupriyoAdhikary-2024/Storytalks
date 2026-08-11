import { UserProvider } from "@/context/UserContext";
import { Stack } from "expo-router";
import 'react-native-url-polyfill/auto';
import "./globals.css";

export default function RootLayout() {
  return (
    <UserProvider>
  <Stack screenOptions={{ headerShown: false }} />
   
  </UserProvider>
 
  );
  
}
