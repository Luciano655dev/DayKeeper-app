import { images } from "@/constants/images"
import { Link } from "expo-router"
import { Image, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"

export default function Index() {
  const insets = useSafeAreaInsets()

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        source={images.DaykeeperHorizontalMain}
        style={{
          width: 230,
          height: undefined,
          aspectRatio: 5,
        }}
      />

      <View
        style={{
          position: "absolute",
          bottom: insets.bottom + 20,
          width: "100%",
          alignItems: "center",
        }}
      >
        <Link href={"/auth/register"} asChild>
          <TouchableOpacity
            style={{
              marginVertical: 5,
              width: "95%",
              padding: 15,
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#6DB5FF",
            }}
          >
            <Text
              style={{
                fontWeight: "600",
                fontSize: 14,
              }}
            >
              Create Account
            </Text>
          </TouchableOpacity>
        </Link>

        <Link href={"/auth/login"} asChild>
          <TouchableOpacity
            style={{
              marginVertical: 5,
              width: "95%",
              padding: 15,
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
              borderColor: "#cececf",
              borderWidth: 1,
            }}
          >
            <Text
              style={{
                fontWeight: "600",
                fontSize: 14,
              }}
            >
              Login
            </Text>
          </TouchableOpacity>
        </Link>

        <Text style={{ color: "#8f8f91", marginTop: 5 }}>
          App Version 1.0.0 by Luciano Menezes
        </Text>
      </View>
    </SafeAreaView>
  )
}
