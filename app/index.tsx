import { index } from "@/constants"
import { useAuth } from "@/context/AuthContext"
import axios from "axios"
import { router } from "expo-router"
import * as SecureStore from "expo-secure-store"
import { useEffect, useState } from "react"
import { ActivityIndicator, View } from "react-native"

export default function Index() {
  const { dispatch } = useAuth()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const token = await SecureStore.getItemAsync("user-token")
        if (token) {
          axios.defaults.baseURL = index.DEFAULT_API_URL
          axios.defaults.withCredentials = true

          const userResponse = await axios.get("/auth/user")

          axios.defaults.headers.common["connect.sid"] =
            userResponse?.data?.token

          dispatch({ type: "LOGIN", payload: userResponse.data.user })
          router.replace("/tabs")
        } else {
          router.replace("/auth")
        }
      } catch (err) {
        console.error("Login check failed:", err)
        router.replace("/auth")
      } finally {
        setLoading(false)
      }
    }

    checkLogin()
  }, [])

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  return null
}
