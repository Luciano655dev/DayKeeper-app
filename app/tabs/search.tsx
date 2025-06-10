import { Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export default function Search() {
  return (
    <SafeAreaView
      style={{
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Search Page</Text>
    </SafeAreaView>
  )
}
