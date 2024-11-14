import { StyleSheet, Text, View, Image, Button, FlatList } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import axios from "axios"

export default function Profile({ route, navigation }: any) {
  const user = useSelector((state: any) => state.userReducer)
  const username = route.params.username || ""
  const [userData, setUserData]: any = useState({})
  const [loading, setLoading] = useState(true)
  const [errMsg, setErrMsg] = useState("")

  const dispatch = useDispatch()

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        if (username == user.name) {
          setUserData({
            username: user.name,
            pfp: user.pfp.url,
          })

          return setLoading(false)
        }

        const response = await axios.get(`/${username}`)
        setUserData({
          username: response.data.user.name,
          pfp: response.data.user.profile_picture.url,
        })
      } catch (error: any) {
        setErrMsg(error.response.data.msg || error.message)
      }
      setLoading(false)
    }

    fetchData()
  }, [route])

  const resetToken = async () => {
    // TODO change this when logout is fixed
    try {
      await axios.get("/auth/logout")
    } catch {
      dispatch(
        dispatch({
          type: "user",
          payload: {
            name: "",
          },
        })
      )
    }
  }

  if (loading)
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    )

  if (errMsg)
    return (
      <View>
        <Text>{errMsg}</Text>
        <Button title="Log Out here" onPress={() => resetToken()} />
      </View>
    )

  return (
    <View>
      <FlatList
        data={[1]}
        renderItem={() => (
          <View style={styles.container}>
            <Image
              source={{ uri: userData.pfp }}
              style={{
                width: 50,
                height: 50,
                borderRadius: 50,
              }}
            />
            <Text style={styles.title}>{userData.username}</Text>

            {user.name == username ? (
              <View>
                <Text style={styles.title}>SAME USER</Text>
                <Button
                  title="Edit User"
                  onPress={() => navigation.navigate("UserEdit", { username })}
                />
                <Button title="Log Out here" onPress={() => resetToken()} />
              </View>
            ) : (
              <View />
            )}
          </View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 200,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
})
