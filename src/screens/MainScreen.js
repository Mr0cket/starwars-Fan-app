import { Container, Text, Button } from "native-base";
import React from "react";
import { Dimensions, StyleSheet, TouchableOpacity } from "react-native";
const { height, width } = Dimensions.get("window");

export default function MainScreen({ navigation }) {
  return (
    <Container style={styles.container}>
      <Text
        style={{
          fontFamily: "StarWars",
          fontSize: 40,
          color: "black",
          marginTop: height / 10,
          alignItems: "center",
        }}
      >
        swinder
      </Text>
      <Text style={{ fontFamily: "StarWars", fontSize: 18, color: "black" }}>
        Find your perfect match in a galaxy far, far away...
      </Text>
      <Button
        style={{ alignSelf: "center", marginTop: height / 5 }}
        onPress={() => navigation.push("movies")}
      >
        <Text>Characters By Movie</Text>
      </Button>

      <Button
        style={{ alignSelf: "center", marginTop: height / 5 }}
        onPress={() => navigation.push("planets")}
      >
        <Text>Characters By Planet (filtered By Climate)</Text>
      </Button>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  fineText: {
    fontSize: 10,
    color: "white",
    fontFamily: "Roboto_medium",
  },
  button: {
    alignSelf: "center",
    marginTop: height / 5,
    paddingHorizontal: 20,
    backgroundColor: "blue",
    borderRadius: 2,
    elevation: 2,
    alignItems: "center",
    paddingVertical: 10,
  },
});
