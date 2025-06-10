import { Ionicons } from "@expo/vector-icons"
import { Tabs } from "expo-router"
import { Platform, View } from "react-native"

const TabIcon = ({ icon, focusedIcon, focused }: any) => (
  <View style={{ alignItems: "center", justifyContent: "center" }}>
    {focused ? (
      <Ionicons
        name={focusedIcon}
        size={26}
        color={focused ? "#000" : "#8e8e93"}
      />
    ) : (
      <Ionicons name={icon} size={26} color={focused ? "#000" : "#8e8e93"} />
    )}
  </View>
)

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: Platform.OS === "ios" ? 80 : 60,
          paddingBottom: Platform.OS === "ios" ? 20 : 10,
          paddingTop: 10,
          borderTopWidth: 0.5,
          borderTopColor: "#ccc",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              icon="home-outline"
              focusedIcon="home-sharp"
              label="Home"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              icon="search-outline"
              focusedIcon="search-sharp"
              label="Search"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="createpost"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              icon="add-circle-outline"
              focusedIcon="add-circle-sharp"
              label="Calendar"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              icon="calendar-outline"
              focusedIcon="calendar-sharp"
              label="Calendar"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              icon="person-outline"
              focusedIcon="person-sharp"
              label="Profile"
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  )
}

/*
other '+' icon
      <Tabs.Screen
        name="createpost"
        options={{
          tabBarIcon: () => (
            <View
              style={{
                width: 60,
                height: 60,
                borderRadius: 30,
                backgroundColor: "#6DB5FF",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: Platform.OS === "ios" ? 30 : 20,
                shadowColor: "#000",
                shadowOpacity: 0.2,
                shadowOffset: { width: 0, height: 2 },
                shadowRadius: 5,
                elevation: 5,
              }}
            >
              <Ionicons name="add" size={30} color="#fff" />
            </View>
          ),
        }}
      />
*/
