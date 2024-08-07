import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { Button, View } from "react-native"
import axios from "axios"
import * as WebBrowser from "expo-web-browser"

WebBrowser.maybeCompleteAuthSession()
import { useAuthRequest } from "expo-auth-session"

const googleClientId = "YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com"

export default function GoogleAuth() {
  const dispatch = useDispatch()
  const [request, response, promptAsync] = useAuthRequest({
    clientId: googleClientId,
    scopes: ["profile", "email"],
    authorizationEndpoint: "https://accounts.google.com/o/oauth2/auth",
  })

  useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response.params
      console.log("Google Auth Token:", authentication)
      // Handle the access token and authenticate with your server
    }
  }, [response])

  return (
    <View>
      <Button
        disabled={!request}
        title="Login com Google"
        onPress={() => {
          promptAsync()
        }}
      />
    </View>
  )
}
