import { StyleSheet, Text, View, TextInput, Button } from "react-native"
import { useState } from "react"
import axios from "axios"

export default function Login({ navigation }: any) {
  const [form, setForm] = useState({ name: "", email: "", password: "" })
  const [loading, setLoading] = useState(false)
  const [errMsg, setErrMsg] = useState("")

  const handleForm = async () => {
    setLoading(true)
    try {
      await axios.post("http://192.168.100.80:3000/auth/register", form)
      navigation.navigate("ConfirmEmail", { email: form.email })
    } catch (err: any) {
      setErrMsg(err.response.data.msg)
    }
    setLoading(false)
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Register</Text>

        <Text style={styles.label}>Username:</Text>
        <TextInput
          placeholder="username"
          onChangeText={(text) => setForm({ ...form, name: text })}
        />

        <Text style={styles.label}>Email:</Text>
        <TextInput
          placeholder="password"
          onChangeText={(text) => setForm({ ...form, email: text })}
        />

        <Text style={styles.label}>Password:</Text>
        <TextInput
          placeholder="password"
          onChangeText={(text) => setForm({ ...form, password: text })}
        />

        <Button title="Send" onPress={() => handleForm()} disabled={loading} />

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
