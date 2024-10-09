import { useState } from "react"
import { Feather } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import {
  Image,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native"
import axios from "axios"

export default function Tweet(props: any) {
  let {
    item: {
      user_info: { name, profile_picture },
      title,
      data,
      files,
      userLiked,
      likes,
      userCommented,
      comments,
    },
  } = props

  const [updatedLikes, setUpdatedLikes] = useState(likes)
  const [updatedUserLiked, setUpdatedUserLiked] = useState(userLiked)

  const navigator: any = useNavigation()

  const handleLikeInput = async () => {
    try {
      if (updatedUserLiked) {
        setUpdatedLikes(updatedLikes - 1)
        setUpdatedUserLiked(false)
      } else {
        setUpdatedLikes(updatedLikes + 1)
        setUpdatedUserLiked(true)
      }

      try {
        axios.post(`/${name}/${title}/like`)
      } catch (error) {
        console.log(error)
        setUpdatedLikes(updatedLikes)
      }
    } catch (error: any) {
      console.log(error?.response?.data?.message || error.message)
    }
  }

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() =>
          navigator.navigate("PostInfo", { username: name, posttitle: title })
        }
      >
        <View style={styles.tweetHeader}>
          <TouchableOpacity
            onPress={() => navigator.navigate("UserInfo", { username: name })}
          >
            <Image
              style={styles.avatar}
              source={{ uri: profile_picture.url }}
            />
          </TouchableOpacity>
          <Text style={styles.author}>{name}</Text>
          <Text style={styles.authorAt}>{title}</Text>
          <Text style={styles.authorAt}></Text>
        </View>
        <Text style={styles.content}>{data}</Text>
        <View style={styles.imageContainer}>
          {files.map((file: any) =>
            file.mimetype.split("/")[0] == "image" ? (
              <Image
                key={file._id}
                source={{ uri: file.url }}
                style={styles.image}
              />
            ) : (
              <View key={file._id} />
            )
          )}
        </View>

        <View style={styles.tweetFooter}>
          <View style={styles.footerReactions}>
            <View
              style={
                updatedUserLiked
                  ? styles.selectedFooterIcon
                  : styles.footerIcons
              }
            >
              <TouchableOpacity
                onPress={() => handleLikeInput()}
                style={styles.button}
              >
                <Feather name="heart" size={20} color="#999" />
                <Text style={styles.textButton}>{updatedLikes}</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={
              userCommented ? styles.selectedFooterIcon : styles.footerIcons
            }
          >
            <TouchableOpacity
              onPress={() =>
                navigator.navigate("CreateComment", {
                  username: name,
                  pfp: profile_picture.url,
                  title,
                  text: data,
                })
              }
              style={styles.button}
            >
              <Feather name="message-circle" size={20} color="#999" />
              <Text style={styles.textButton}>{comments}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },

  tweetHeader: {
    flexDirection: "row",
    alignItems: "center",
  },

  author: {
    marginLeft: 10,
    fontSize: 17,
    fontWeight: "bold",
    color: "#000",
  },

  authorAt: {
    marginLeft: 10,
    fontSize: 16,
    color: "#999",
  },

  content: {
    fontSize: 15,
    lineHeight: 20,
    color: "#1C2022",
    marginVertical: 10,
  },

  tweetFooter: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 0,
  },

  footerIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  selectedFooterIcon: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 0, 0, 0.5)",
    borderRadius: 10,
    paddingLeft: 5,
    paddingRight: 5,
  },

  footerReactions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  button: {
    flexDirection: "row",
    alignItems: "center",
  },

  textButton: {
    color: "black",
    marginLeft: 5,
  },

  avatar: {
    borderWidth: 1,
    width: 60,
    height: 60,
    borderRadius: 100,
  },
  imageContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20,
  },
  image: {
    width: 100,
    height: 100,
    margin: 5,
    borderColor: "black",
    borderWidth: 1,
  },
})
