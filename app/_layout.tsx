import { AuthProvider } from "@/context/AuthContext"
import { Stack } from "expo-router"
import { SafeAreaProvider } from "react-native-safe-area-context"

export default function RootLayout() {
  return (
    <AuthProvider>
      <SafeAreaProvider>
        <Stack screenOptions={{ animation: "fade", headerShown: false }}>
          <Stack.Screen
            name="auth"
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="tabs"
            options={{
              headerShown: false,
            }}
          />
        </Stack>
      </SafeAreaProvider>
    </AuthProvider>
  )
}
