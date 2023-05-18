import { NavigationContainer } from "@react-navigation/native"
import { HomeScreen } from "./screens/HomeScreen"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { ArticleScreen } from "./screens/ArticleScreen"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { ClipScreen } from "./screens/ClipScreen"
import { FontAwesome } from "@expo/vector-icons"
import { Provider } from "react-redux"
import { persistor, store } from "./src/store"
import { PersistGate } from "redux-persist/integration/react"

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

const screenOption = ({ route }) => ({
  tabBarIcon: ({ color, size }) => {
    if (route.name === "HomeTab") {
      return <FontAwesome name="home" size={size} color={color} />
    } else if (route.name === "ClipTab") {
      return <FontAwesome name="bookmark" size={size} color={color} />
    }
  },
  tabBarActiveTintColor: "tomato",
  tabBarInactiveTintColor: "gray",
})

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="Article" component={ArticleScreen} />
    </Stack.Navigator>
  )
}

const ClipStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Clip"
        component={ClipScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="Article" component={ArticleScreen} />
    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Tab.Navigator screenOptions={screenOption}>
            <Tab.Screen name="HomeTab" component={HomeStack} options={{ headerShown: false, title: "Home" }} />
            <Tab.Screen name="ClipTab" component={ClipStack} options={{ headerShown: false, title: "Clip" }} />
          </Tab.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  )
}
