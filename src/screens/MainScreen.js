import { Container, Text, Button } from "native-base";
import React from "react";
import { Dimensions, StyleSheet } from "react-native";
const { height, width } = Dimensions.get("window");

export default function MainScreen({ navigation }) {
  return (
    <Container style={styles.container}>
      <Text
        style={{ fontFamily: "StarWars", fontSize: 40, color: "black", marginTop: height / 10 }}
      >
        StarWars
      </Text>
      <Text style={{ fontFamily: "StarWars", fontSize: 40, color: "black" }}>Fan Page</Text>
      <Button
        style={{ alignSelf: "center", marginTop: height / 5 }}
        onPress={() => navigation.push("planets")}
      >
        <Text>Planets By Climate</Text>
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
});
