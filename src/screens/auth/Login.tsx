import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Pressable,
} from "react-native"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { WebView } from "react-native-webview"
import * as SecureStore from "expo-secure-store"
import axios from "axios"

export default function Login({ navigation }: any) {
  const dispatch = useDispatch()
  const [form, setForm] = useState({ name: "", password: "" })
  const [loading, setLoading] = useState(false)
  const [errMsg, setErrMsg] = useState("")

  // handle google auth stuff
  const [isWebViewVisible, setWebViewVisible] = useState(false)

  const handleNavigationStateChange = (event: any) => {
    /*
     * Google auth will work just when i buy a https domain for the API
     TODO: buy a domain and do the google auth stuff
    */
    if (event.url.includes("/auth/google/callback")) {
      console.log(event)

      setWebViewVisible(false)
    }
  }

  const handleForm = async () => {
    setLoading(true)
    try {
      const response = await axios.post(
        "http://192.168.1.174:3000/auth/login",
        form
      )

      await SecureStore.setItemAsync("isLogged", "true")

      dispatch({
        type: "user",
        payload: {
          name: response.data.user.name,
          id: response.data.user._id,
          pfp: response.data.user.profile_picture,
        },
      })
    } catch (err: any) {
      setErrMsg(err?.response?.data?.message || "Error calling API")
    }
    setLoading(false)
  }

  // Google auth url: http://192.168.1.174:3000/auth/google, callback: http://192.168.1.174:3000/auth/google/callback

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Login</Text>

        <Text style={styles.label}>Username:</Text>
        <TextInput
          placeholder="username"
          onChangeText={(text) => setForm({ ...form, name: text })}
        />

        <Text style={styles.label}>Password:</Text>
        <TextInput
          placeholder="password"
          onChangeText={(text) => setForm({ ...form, password: text })}
        />

        <Button title="Send" onPress={() => handleForm()} disabled={loading} />

        {errMsg ? <Text style={styles.label}>{errMsg}</Text> : <View />}

        <Pressable
          style={styles.pressableLink}
          onPress={() => navigation.navigate("ForgetPassword")}
        >
          <Text style={styles.link}>Esqueceu a senha?</Text>
        </Pressable>

        <Text>Or</Text>

        <Button
          title="Login with Google"
          onPress={() => setWebViewVisible(!isWebViewVisible)}
        />
        {isWebViewVisible && (
          <WebView
            source={{ uri: "http://192.168.1.174:3000/auth/google" }}
            onNavigationStateChange={handleNavigationStateChange}
            style={{ marginTop: 20, width: 400 }}
          />
        )}
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
  link: {
    fontSize: 10,
    color: "blue",
  },
  pressableLink: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
  },
})
