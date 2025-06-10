import { Stack } from "expo-router"

const headerScreenOptions = {
  headerTitle: "",
  headerBackTitle: ".",
  headerShadowVisible: false,
  headerBackTitleStyle: { fontSize: 1 },
  headerTintColor: "#000",
  headerStyle: {
    backgroundColor: "#fff",
  },
}

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: "#fff" },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
        }}
      />

      <Stack.Screen name="login" options={headerScreenOptions} />
      <Stack.Screen name="register" options={headerScreenOptions} />
      <Stack.Screen name="forget_password" options={headerScreenOptions} />
      <Stack.Screen name="reset_password" options={headerScreenOptions} />
      <Stack.Screen name="confirm_email" options={headerScreenOptions} />
    </Stack>
  )
}
