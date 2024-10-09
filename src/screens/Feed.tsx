import { useState, useEffect } from "react"
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from "react-native"
import axios from "axios"
import Tweet from "../components/Tweet"
import DailyQuestion from "../components/DailyQuestion"

export default function Feed() {
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [data, setData]: any = useState([])
  const [loading, setLoading] = useState(true)
  const [newPostLoading, setNewPostLoading] = useState(false)
  const [errMsg, setErrMsg] = useState("")

  const fetchData = async () => {
    setNewPostLoading(true)
    try {
      const postsResponse = await axios.get(`/search?page=${page}`, {
        withCredentials: true,
      })

      setTotalPages(postsResponse?.data.totalPages)
      if (page == 1) setData(postsResponse?.data.data)
      else setData([...data, ...postsResponse?.data.data])
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
      <DailyQuestion />
      <FlatList
        style={styles.container}
        data={data}
        keyExtractor={({ _id }) => String(_id)}
        onEndReachedThreshold={0.1}
        onEndReached={handleAddPage}
        ListHeaderComponent={
          <View style={{ marginBottom: 100 }}>
            <DailyQuestion />
          </View>
        }
        ListFooterComponent={<FooterList load={newPostLoading} />}
        refreshing={loading}
        onRefresh={() => {
          setPage(1)
          setLoading(true)
          if (page == 1) fetchData()
        }}
        renderItem={({ item }) => <Tweet item={item} />}
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
