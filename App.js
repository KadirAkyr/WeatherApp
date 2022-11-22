import "react-native-gesture-handler";
import { Text } from "react-native";
import Home from "./components/Home/Home";
import Menu from "./components/City/Menu";
import CityWeather from "./components/City/CityWeather";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerMode: "screen",
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#E8AA42" },
        }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Menu" component={Menu} />
        <Stack.Screen name="City" component={CityWeather} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
