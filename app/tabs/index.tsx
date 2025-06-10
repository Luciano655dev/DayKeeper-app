import {
  MainUserStorieFeedComponent,
  StorieFeedComponent,
} from "@/components/storie/storieFeedComponent"
import { images } from "@/constants/images"
import { useAuth } from "@/context/AuthContext"
import axios from "axios"
import { useCallback, useEffect, useState } from "react"
import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export default function Feed() {
  const {
    state: { user: loggedUser },
  }: any = useAuth()

  const [stories, setStories] = useState([])
  const [loggedUserStories, setLoggedUserStories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const fetchData = useCallback(async () => {
    try {
      if (!loading && !loading) setLoading(true)

      const storiesResponse = await axios.get("/stories")
      const loggedUserStoriesResponse = await axios.get(
        `/stories/${loggedUser.name}`
      )

      setStories(storiesResponse?.data?.data)
      setLoggedUserStories(loggedUserStoriesResponse?.data?.data)
      console.log("updated")
    } catch (error: any) {
      setError(error?.response?.data?.message || error.toString())
    } finally {
      setLoading(false)
    }
  }, [loading])

  useEffect(() => {
    fetchData()
  }, [])

  const handleScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y
    if (offsetY <= -50 && !loading) {
      setLoading(true)
      fetchData()
    }
  }

  if (loading && stories.length === 0) return <ActivityIndicator />

  if (error) return <Text>Error: {error}</Text>

  return (
    <SafeAreaView>
      <View
        style={{
          width: "100%",
          height: 50,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={images.DaykeeperHorizontalMain}
          style={{ width: 150 }}
          resizeMode="contain"
        />
      </View>
      <ScrollView
        style={{ height: "100%" }}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {loading && <ActivityIndicator style={{ marginVertical: 10 }} />}

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ paddingHorizontal: 10, marginVertical: 10 }}
        >
          <MainUserStorieFeedComponent
            stories={loggedUserStories}
            user={loggedUser}
          />

          {stories.map((obj: any) => (
            <StorieFeedComponent item={obj} />
          ))}
        </ScrollView>

        <Text>Feed Page</Text>
      </ScrollView>
    </SafeAreaView>
  )
}
