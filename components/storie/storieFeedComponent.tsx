import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { Image, Text, TouchableOpacity, View } from "react-native"

export function MainUserStorieFeedComponent({ user, stories }: any) {
  return (
    <View key={user._id} style={{ alignItems: "center", marginHorizontal: 8 }}>
      <View>
        <View
          style={
            stories
              ? {
                  padding: 3,
                  backgroundColor: "#adadad",
                  borderRadius: 6,
                }
              : { margin: 3 }
          }
        >
          <Image
            source={{ uri: user.profile_picture.url }}
            style={{
              width: 80,
              height: 80,
              borderRadius: 4,
              borderColor: "#fff",
              borderWidth: stories ? 1 : 0,
            }}
            resizeMode="contain"
          />
          <View
            style={{
              position: "absolute",
              width: "107%",
              bottom: -2,
              right: -2,
              alignItems: "flex-end",
            }}
          >
            <View
              style={{
                padding: 2,
                backgroundColor: "#fff",
                borderRadius: 4,
              }}
            >
              <Ionicons name="add" size={18} color={"#000"}></Ionicons>
            </View>
          </View>
        </View>
      </View>
      <Text style={{ fontSize: 12, marginTop: 4, color: "#444" }}>
        {user.name}
      </Text>
    </View>
  )
}
export function StorieFeedComponent({ item }: any) {
  const router = useRouter()

  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "/storie/storieInfo",
          params: {
            data: JSON.stringify(item),
          },
        })
      }
      key={item._id}
      style={{ alignItems: "center", marginHorizontal: 8 }}
    >
      <View
        style={{
          padding: 3,
          backgroundColor: item.userViewed ? "#6DB5FF" : "#adadad",
          borderRadius: 6,
        }}
      >
        <Image
          source={{ uri: item.profile_picture.url }}
          style={{
            width: 80,
            height: 80,
            borderRadius: 4,
            borderWidth: 1,
            borderColor: "#fff",
          }}
          resizeMode="contain"
        />
      </View>
      <Text style={{ fontSize: 12, marginTop: 4, color: "#444" }}>
        {item.name}
      </Text>
    </TouchableOpacity>
  )
}
