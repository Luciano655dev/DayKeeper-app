import axios from "axios"
import { useRouter } from "expo-router"
import * as SecureStore from "expo-secure-store"
import { useState } from "react"
import { ActivityIndicator, Button, Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export default function Profile() {
  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleLogout = async () => {
    try {
      setLoading(true)

      await axios.get("/logout")
      await SecureStore.deleteItemAsync("user-token")
      router.replace("/auth")
    } catch (error: any) {
      setError(error?.response?.data?.message)
      router.replace("/auth")
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <ActivityIndicator></ActivityIndicator>
  if (error) return <Text>{error}</Text>

  return (
    <SafeAreaView
      style={{
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Profile Page</Text>
      <Button disabled={loading} title="Log Out" onPress={handleLogout} />
    </SafeAreaView>
  )
}
