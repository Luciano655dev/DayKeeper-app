import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { Feather } from "@expo/vector-icons"
import axios from "axios"
import AuthRoutes from "./auth.routes"

import Feed from "../screens/Feed"
import UserInfo from "../screens/User/UserInfo"
import UserEdit from "../screens/User/UserEdit"
import PostInfo from "../screens/Post/PostInfo"
import CreateComment from "../screens/Post/CreateComment"
import New from "../screens/New"

const Tab = createBottomTabNavigator()
const FeedStack = createNativeStackNavigator()

function FeedStackScreen() {
  return (
    <FeedStack.Navigator>
      <FeedStack.Group>
        <FeedStack.Screen name="Feed" component={Feed} />
        <FeedStack.Screen name="UserInfo" component={UserInfo} />
        <FeedStack.Screen name="PostInfo" component={PostInfo} />
      </FeedStack.Group>

      <FeedStack.Group screenOptions={{ presentation: "modal" }}>
        <FeedStack.Screen name="CreateComment" component={CreateComment} />
        <FeedStack.Screen name="UserEdit" component={UserEdit} />
      </FeedStack.Group>
    </FeedStack.Navigator>
  )
}

export default function TabRoutes() {
  const dispatch = useDispatch()
  const user = useSelector((state: any) => state.userReducer)
  const [logged, setLogged] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        // prod: https://daykeeper-api.onrender.com
        axios.defaults.baseURL = "http://192.168.1.174:3001"
        axios.defaults.withCredentials = true

        const userResponse = await axios.get("/auth/user")

        axios.defaults.headers.common["connect.sid"] = userResponse.data.token

        dispatch({
          type: "user",
          payload: {
            name: userResponse.data.user.name,
            id: userResponse.data.user._id,
            email: userResponse.data.user.email,
            bio: userResponse.data.user.bio,
            pfp: userResponse.data.user.profile_picture,
          },
        })

        setLogged(true)
      } catch (error: any) {
        setLogged(false)
        console.log("User not logged in")
      }
      setLoading(false)
    }

    fetchData()
  }, [user?.name])

  if (loading) {
    console.log("loading...")
    return <></>
  }
  if (!logged) return <></>

  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Main"
        component={FeedStackScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" color={color} size={size} />
          ),
          tabBarLabel: "Início",
        }}
      />

      <Tab.Screen
        name="New"
        component={New}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="plus" color={color} size={size} />
          ),
          tabBarLabel: "Novo",
        }}
      />

      <Tab.Screen
        name="User"
        component={UserInfo}
        initialParams={{ username: user.name }}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" color={color} size={size} />
          ),
          tabBarLabel: "Novo",
        }}
      />
    </Tab.Navigator>
  )
}
