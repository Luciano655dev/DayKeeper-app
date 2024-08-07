import { useState } from "react"
import { useDispatch } from "react-redux"
import axios from "axios"
import { StyleSheet, Text, View, TextInput, Button } from "react-native"

export default function ConfirmEmail({ route }: any) {
  const { email } = route.params
  const dispatch = useDispatch()
  const [verificationCode, setVerificationCode] = useState("")
  const [loading, setLoading] = useState(false)
  const [errMsg, setErrMsg] = useState("")

  const handleForm = async () => {
    setLoading(true)
    try {
      const response = await axios.post(
        "http://192.168.100.80:3000/auth/confirm_email",
        {
          email,
          verificationCode,
        }
      )

      dispatch({
        type: "user",
        payload: {
          name: response.data.user.name,
          id: response.data.user._id,
          pfp: response.data.user.profile_picture,
        },
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
        <Text style={styles.title}>Confirm Email</Text>

        <Text style={styles.label}>Verification Code for {email}:</Text>
        <TextInput
          placeholder="verification code here"
          onChangeText={(text) => setVerificationCode(text)}
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
    marginBottom: 10,
  },
  label: {
    fontSize: 10,
  },
})
