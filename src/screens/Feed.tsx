import { useState, useEffect } from "react"
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
  ActivityIndicator,
} from "react-native"
import * as SecureStore from "expo-secure-store"
import axios from "axios"
import Tweet from "../components/Tweet"
import { useSelector } from "react-redux"

export default function Feed() {
  const user = useSelector((state: any) => state.userReducer)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [data, setData]: any = useState([])
  const [loading, setLoading] = useState(true)
  const [newPostLoading, setNewPostLoading] = useState(false)
  const [errMsg, setErrMsg] = useState("")

  const fetchData = async () => {
    setNewPostLoading(true)
    try {
      const response = await axios.get(
        `http://192.168.1.174:3000/search?page=${page}`
      )

      setTotalPages(response.data.totalPages)
      if (page == 1) setData(response.data.data)
      else setData([...data, ...response.data.data])
    } catch (error: any) {
      setErrMsg(error?.response?.data?.message || error.message)
    }
    setNewPostLoading(false)
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [page])

  const handleAddPage = () => {
    if (page < totalPages) setPage(page + 1)
  }

  const handleReaction = async (username: String, posttitle: String) => {
    try {
      await axios.post(
        `http://192.168.1.174:3000/${username}/${posttitle}/like`
      )
    } catch (error: any) {
      console.log(error?.response?.data?.message || error.message)
    }
  }

  if (loading)
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    )
  if (errMsg)
    return (
      <View style={styles.container}>
        <Text>{errMsg}</Text>
      </View>
    )

  function FooterList({ load }: any) {
    if (!load) return
    return (
      <View style={{ padding: 10 }}>
        <ActivityIndicator size={25} color={"#121212"}></ActivityIndicator>
      </View>
    )
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        style={styles.container}
        data={data}
        keyExtractor={({ _id }) => String(_id)}
        onEndReachedThreshold={0.1}
        onEndReached={handleAddPage}
        ListFooterComponent={<FooterList load={newPostLoading} />}
        refreshing={loading}
        onRefresh={() => {
          setPage(1)
          setLoading(true)
          if (page == 1) fetchData()
        }}
        renderItem={({ item }) => (
          <Tweet
            key={item._id}
            username={item.user_info.name}
            pfp={item.user_info.profile_picture.url}
            title={item.title}
            text={item.data}
            files={item.files}
            comments={item.comments}
            likes={item.likes}
            loggedUser={user}
            handleReaction={handleReaction}
          />
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },

  fixedView: {
    position: "absolute",
    right: 0,
    bottom: 0,
    marginRight: 10,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "flex-end",
  },

  bottomButtons: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
})
