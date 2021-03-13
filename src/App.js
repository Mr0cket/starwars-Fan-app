import React from "react";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import AppLoading from "expo-app-loading";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MainScreen from "./screens/MainScreen";
import PlanetsScreen from "./screens/PlanetsScreen";
import MoviesScreen from "./screens/MoviesScreen";
const Stack = createStackNavigator();

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      StarWars: {
        uri: require("../assets/swFont/StarJediRounded-jW3R.ttf"),
      },
      ...Ionicons.font,
    });
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }

    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen options={{ headerShown: false }} name="Home" component={MainScreen} />
          <Stack.Screen name="planets" component={PlanetsScreen} />
          <Stack.Screen name="movies" component={MoviesScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
