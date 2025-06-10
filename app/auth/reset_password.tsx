import { index } from "@/constants"
import axios from "axios"
import { useLocalSearchParams, useRouter } from "expo-router"
import { useState } from "react"
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"

export default function ResetPassword() {
  const router = useRouter()
  const { email }: { email: string } = useLocalSearchParams()

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [verificationCode, setVerificationCode] = useState("")

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleForm = async () => {
    try {
      if (password != confirmPassword) {
        setError("The Password must be the same as the Confirm Password")
        return
      }

      await axios.post(`${index.DEFAULT_API_URL}/auth/reset_password`, {
        email,
        password,
        verificationCode,
      })

      router.replace("/auth/login")
    } catch (error: any) {
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
          Reset Your Password 😁
        </Text>
        <Text style={{ fontSize: 16, fontWeight: 600, color: "#ababab" }}>
          A 6-digit Verification Code was sent to{" "}
          <Text style={{ fontWeight: 800 }}>{email}</Text>.
        </Text>

        <View style={{ marginTop: 25 }}>
          <Text style={{ fontSize: 14, fontWeight: 500 }}>Password</Text>
          <TextInput
            editable={!loading}
            style={styles.textInput}
            placeholder="Enter your password..."
            placeholderTextColor="#B7BDC7"
            value={password}
            onChangeText={setPassword}
          />
        </View>
        <View style={{ marginTop: 25 }}>
          <Text style={{ fontSize: 14, fontWeight: 500 }}>
            Confirm Password
          </Text>
          <TextInput
            editable={!loading}
            style={styles.textInput}
            placeholder="Enter your password..."
            placeholderTextColor="#B7BDC7"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>
        <View style={{ marginTop: 25 }}>
          <Text style={{ fontSize: 14, fontWeight: 500 }}>
            6-digit Verification Code
          </Text>
          <TextInput
            editable={!loading}
            style={styles.textInput}
            placeholder="Enter the 6-digit Verification Code..."
            placeholderTextColor="#B7BDC7"
            value={verificationCode}
            onChangeText={setVerificationCode}
          />
        </View>

        <TouchableOpacity
          onPress={handleForm}
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
            Reset Password
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
        </View>
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
