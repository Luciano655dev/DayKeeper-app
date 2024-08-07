import { useState } from "react"
import axios from "axios"
import { StyleSheet, Text, View, TextInput, Button } from "react-native"

export default function ForgetPassword({ navigation }: any) {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [errMsg, setErrMsg] = useState("")

  const handleForm = async () => {
    setLoading(true)
    try {
      await axios.post("http://192.168.100.80:3000/auth/forget-password", {
        email,
      })

      navigation.navigate("ResetPassword", { email })
    } catch (err: any) {
      setErrMsg(err.response.data.msg)
    }
    setLoading(false)
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Forget Password</Text>

        <Text style={styles.label}>Email:</Text>
        <TextInput
          placeholder="your email"
          onChangeText={(text) => setEmail(text)}
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
  label: {
    fontSize: 10,
  },
})
