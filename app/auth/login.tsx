import { index } from "@/constants"
import { useAuth } from "@/context/AuthContext"
import { FontAwesome, Ionicons } from "@expo/vector-icons"
import axios from "axios"
import { useRouter } from "expo-router"
import * as SecureStore from "expo-secure-store"
import { useState } from "react"
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"

export default function Login() {
  const { dispatch } = useAuth()
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [keepLoggedIn, setKeepLoggedIn] = useState(true)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleGoogle = async () => {}

  const handleForm = async () => {
    try {
      setLoading(true)

      const response = await axios.post(`${index.DEFAULT_API_URL}/auth/login`, {
        name: email,
        password,
      })

      if (response.status == 200) {
        console.log("Logged successfully!")
        await SecureStore.setItemAsync("user-token", response?.data?.token)
        dispatch({ type: "LOGIN", payload: response.data.user })
        router.replace("/tabs")
      }
    } catch (error: any) {
      console.log(error)
      setError(
        error?.response?.data?.message || index.ERROR_MESSAGES.SERVER_ERROR
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ padding: 20 }}>
        <Text style={{ fontSize: 26, fontWeight: "bold", marginBottom: 3 }}>
          Welcome back 👋
        </Text>
        <Text style={{ fontSize: 16, fontWeight: 600, color: "#ababab" }}>
          Log in to Daykeeper
        </Text>

        <View style={{ marginTop: 25 }}>
          <Text style={{ fontSize: 14, fontWeight: 500 }}>Name or Email</Text>
          <TextInput
            editable={!loading}
            style={styles.textInput}
            placeholder="Enter your Username or Email..."
            placeholderTextColor="#B7BDC7"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View style={{ marginTop: 25 }}>
          <Text style={{ fontSize: 14, fontWeight: 500 }}>Password</Text>
          <TextInput
            editable={!loading}
            style={styles.textInput}
            placeholder="Enter your Password..."
            placeholderTextColor="#B7BDC7"
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <View
          style={{
            width: "100%",
            marginTop: 15,
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Pressable
              style={[styles.checkbox, keepLoggedIn && styles.checkedBox]}
              onPress={() => setKeepLoggedIn(!keepLoggedIn)}
            >
              {keepLoggedIn && (
                <Ionicons name="checkmark-sharp" size={18} color="#fff" />
              )}
            </Pressable>
            <Text style={{ fontSize: 14, fontWeight: 400 }}>
              Keep me logged in
            </Text>
          </View>

          <View>
            <TouchableOpacity
              disabled={loading}
              onPress={() => router.push("/auth/forget_password")}
            >
              <Text
                style={{
                  fontWeight: 500,
                  color: "#284b63",
                }}
              >
                Forgot Password?
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          onPress={handleForm}
          disabled={loading}
          style={{
            marginVertical: 5,
            marginTop: 15,
            width: "100%",
            padding: 15,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: loading ? "#aacff8" : "#6DB5FF",
            opacity: loading ? 0.6 : 1,
          }}
        >
          <Text
            style={{
              fontWeight: 500,
              fontSize: 14,
            }}
          >
            Sign in
          </Text>
        </TouchableOpacity>

        <View
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          {error ? (
            <Text style={{ color: "#b80000", fontWeight: 500 }}>{error}</Text>
          ) : (
            <></>
          )}

          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <Text style={{ color: "#8f8f91" }}>Dont have an account?</Text>
            <TouchableOpacity
              disabled={loading}
              onPress={() => router.replace("/auth/register")}
            >
              <Text
                style={{
                  fontWeight: 600,
                  color: "#284b63",
                  marginLeft: 5,
                }}
              >
                Register
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 25,
          }}
        >
          <View style={{ flex: 1, height: 1, backgroundColor: "#ccc" }} />
          <Text style={{ marginHorizontal: 10, color: "#999" }}>
            or sign in with
          </Text>
          <View style={{ flex: 1, height: 1, backgroundColor: "#ccc" }} />
        </View>

        <TouchableOpacity
          onPress={handleGoogle}
          disabled={loading}
          style={{
            marginVertical: 5,
            width: "100%",
            padding: 15,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            gap: 7,
            borderColor: "#cfd6e1",
            borderWidth: 1,
            opacity: loading ? 0.6 : 1,
          }}
        >
          <FontAwesome name="google" size={20} />
          <Text
            style={{
              fontWeight: 500,
              fontSize: 14,
              color: loading ? "#7b7b7b" : "#000",
            }}
          >
            Sign in with Google
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  textInput: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
    padding: 15,
    borderRadius: 13,
    borderColor: "#cfd6e1",
    borderWidth: 1,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: "#6DB5FF",
    marginRight: 5,
    borderRadius: 5,
  },
  checkedBox: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#6DB5FF",
  },
})
