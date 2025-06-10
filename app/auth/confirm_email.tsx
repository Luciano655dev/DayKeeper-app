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

export default function ForgetPassword() {
  const { email }: { email: string } = useLocalSearchParams()
  const router = useRouter()
  const [verificationCode, setVerificationCode] = useState("")

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleForm = async () => {
    try {
      const response = await axios.post(
        `${index.DEFAULT_API_URL}/auth/confirm_email`,
        {
          email,
          verificationCode,
        }
      )

      console.log(response?.data)
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
          Confirm your Email 📧
        </Text>
        <Text style={{ fontSize: 16, fontWeight: 600, color: "#ababab" }}>
          A 6-digit verification code was sent to{" "}
          <Text style={{ fontWeight: 800, color: "#ababab" }}>{email}</Text>
        </Text>

        <View style={{ marginTop: 25 }}>
          <Text style={{ fontSize: 14, fontWeight: 500 }}>
            6-digit Verification Code
          </Text>
          <TextInput
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
            Verify
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
            <Text style={{ color: "#8f8f91" }}>You missed it?</Text>
            <TouchableOpacity
              disabled={loading}
              onPress={() => router.replace("/auth/login")}
            >
              <Text
                style={{
                  fontWeight: 600,
                  color: "#284b63",
                  marginLeft: 5,
                }}
              >
                Try Logging in
              </Text>
            </TouchableOpacity>
          </View>
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
