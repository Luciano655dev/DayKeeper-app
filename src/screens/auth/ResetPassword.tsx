import { useState } from "react"
import axios from "axios"
import { StyleSheet, Text, View, TextInput, Button } from "react-native"

export default function ResetPassword({ route }: any) {
  const email = route.params.email || ""
  const [form, setForm] = useState({ password: "", verificationCode: "" })
  const [loading, setLoading] = useState(false)
  const [errMsg, setErrMsg] = useState("")

  const handleForm = async () => {
    setLoading(true)
    try {
      await axios.post("http://192.168.100.80:3000/auth/reset-password", {
        email,
        ...form,
      })
    } catch (err: any) {
      setErrMsg(err.response.data.msg || "Error calling API")
    }
    setLoading(false)
  }

  if (!email) setErrMsg("No email provided")
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Reset Password</Text>
        <Text style={styles.subtitle}>for {email}</Text>

        <Text style={styles.label}>Verification Code:</Text>
        <TextInput
          placeholder="verification code here"
          onChangeText={(text) => setForm({ ...form, verificationCode: text })}
        />

        <Text style={styles.label}>New Password</Text>
        <TextInput
          placeholder="new password here"
          onChangeText={(text) => setForm({ ...form, password: text })}
        />

        <Button
          title="Send"
          onPress={() => handleForm()}
          disabled={loading}
        ></Button>

        {errMsg ? <Text style={styles.label}>{errMsg}</Text> : <View />}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 15,
    marginBottom: 10,
  },
  label: {
    fontSize: 10,
  },
})
