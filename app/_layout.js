
import { Stack } from "expo-router";
import { UserProvider } from '/UserContext'; 

export default function RootLayout() {
  return (
    <UserProvider>
      <Stack initialRouteName="LoginScreen" screenOptions={{
        headerShown: false 
      }}>
        <Stack.Screen name="LoginScreen" />
        <Stack.Screen name="RegisterScreen" />
        <Stack.Screen name="WelcomeScreen" />
      </Stack>
    </UserProvider>
  );
}
