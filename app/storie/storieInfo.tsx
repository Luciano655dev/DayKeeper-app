import { useLocalSearchParams } from "expo-router"
import { Text, View } from "react-native"

export default function StorieInfo() {
  const { _id }: any = useLocalSearchParams()
  console.log(_id)

  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <Text>Storie Info Page</Text>
    </View>
  )
}
