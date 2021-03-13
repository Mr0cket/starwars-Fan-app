import axios from "axios";
import AppLoading from "expo-app-loading";
import { Body, Button, Container, Form, H3, Input, Item, Label, Picker } from "native-base";
import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import Accordion from "../components/Accordion";
import RadioButton from "../components/RadioButton";
import { apiUrl } from "../config/constants";

const { height, width } = Dimensions.get("window");

export default function MoviesScreen() {
  const [searchTitle, setTitle] = useState("");
  const [gender, setGender] = useState("");
  const [sort, setSort] = useState("");
  const [{ error, loading, data }, setScreenState] = useState({
    data: null,
    loading: null,
    error: null,
  });

  const searchForMovie = async () => {
    setScreenState((screenState) => ({ ...screenState, loading: true }));
    const filter = !gender ? "" : `&gender=${gender.toLowerCase()}`;
    const sortby = !sort ? "" : `&sortby=${sort.toLowerCase()}`;
    const searchString = `${apiUrl}/characters?title=${searchTitle}${sortby}${filter}`;
    try {
      const res = await axios.get(searchString);
      console.log(res);
      if (res.data) {
        setScreenState((state) => ({ ...state, data: res.data }));
      }
    } catch (e) {
      console.log(e.response.data.message);
      setScreenState((screenState) => ({ ...screenState, error: e.response.data.message }));
    }
  };
  const results =
    data &&
    data.characters &&
    data.characters.map((character) => (
      <Accordion key={character.name} title={character.name}>
        <Body>
          <Text style={{ fontFamily: "StarWars" }}>Birth Year: {character.birth_year}</Text>
          <Text style={{ fontFamily: "StarWars" }}>Height: {character.height}</Text>
          <Text style={{ fontFamily: "StarWars" }}>gender: {character.gender}</Text>
          <Text style={{ fontFamily: "StarWars" }}>skin: {character.skin_color}</Text>
          <Text style={{ fontFamily: "StarWars" }}>eyes: {character.eye_color}</Text>
          <Text style={{ fontFamily: "StarWars" }}>hair: {character.hair_color}</Text>
        </Body>
      </Accordion>
    ));

  const context = data && `characters from films: ${data?.matchedMovies.join(", ")}.`;
  return (
    <Container>
      <Form>
        <Item style={{ marginTop: 20 }} rounded floatingLabel>
          <Label style={{ marginBottom: 20 }}>Movie Title</Label>
          <Input onChangeText={setTitle} onEndEditing={setTitle} />
        </Item>
      </Form>

      <View style={styles.main}>
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <View>
            <H3>Gender</H3>
            <View style={{ flexDirection: "row" }}>
              <RadioButton selected={gender} value={""} onValueChange={setGender} />
              <RadioButton selected={gender} value={"Male"} onValueChange={setGender} />
              <RadioButton selected={gender} value={"Female"} onValueChange={setGender} />
            </View>
          </View>
          <View style={{ width: 150 }}>
            <H3>Sort By</H3>
            <Picker
              mode="dropdown"
              placeholder="Select your SIM"
              placeholderStyle={{ color: "#bfc6ea" }}
              placeholderIconColor="#007aff"
              selectedValue={sort}
              onValueChange={setSort}
            >
              <Picker.Item label="default" value={undefined} />
              <Picker.Item label="Age" value="Age" />
              <Picker.Item label="Height" value="Height" />
            </Picker>
          </View>
        </View>
        <Text>{context && context}</Text>
        <Button style={styles.button} onPress={searchForMovie}>
          <Text style={styles.buttonText}>Search</Text>
        </Button>
        <ScrollView>
          {loading ? <AppLoading /> : error && <Text>{error}</Text>}
          {results}
        </ScrollView>
      </View>
    </Container>
  );
}
const styles = StyleSheet.create({
  main: {
    marginTop: height / 50,
    marginHorizontal: width / 50,
    alignContent: "space-between",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  button: {
    width: 80,
    marginLeft: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    alignSelf: "flex-end",
  },
  content: {
    alignItems: "center",
  },
});
