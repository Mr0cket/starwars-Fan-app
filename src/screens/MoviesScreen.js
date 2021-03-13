import axios from "axios";
import AppLoading from "expo-app-loading";
import { Body, Button, Col, Container, Form, H3, Input, Item, Label, Picker } from "native-base";
import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView, ActivityIndicator } from "react-native";
import Accordion from "../components/Accordion";
import CharacterItem from "../components/CharacterItem";
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
      if (res.data) {
        if (res.data.message)
          return setScreenState((state) => ({
            ...state,
            error: res.data.message,
            data: null,
            loading: null,
          }));
        setScreenState((state) => ({ ...state, data: res.data, loading: null }));
      }
    } catch (e) {
      console.log(e.response.data.message);
      setScreenState((screenState) => ({
        ...screenState,
        error: e.response.data.message,
        loading: null,
      }));
    }
  };

  const searchBtnState = searchTitle.length < 1;

  const results =
    data &&
    data.characters &&
    data.characters.map((character) => (
      <CharacterItem key={character.name} character={character} />
    ));

  const screenContext =
    data && !error ? `characters from films: ${data.matchedMovies.join(", ")}.` : error;
  return (
    <Container>
      <Form>
        <Item style={{ marginTop: 20 }} rounded floatingLabel>
          <Label style={{ marginBottom: 20 }}>Movie Title</Label>
          <Input onChangeText={setTitle} onEndEditing={searchForMovie} />
        </Item>
      </Form>

      <View style={styles.main}>
        <View style={styles.row}>
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
        <View style={styles.row}>
          <Col>
            <Text>{screenContext && screenContext}</Text>
          </Col>
          <Col>
            <Button style={styles.button} onPress={searchForMovie} disabled={searchBtnState}>
              <Text style={styles.buttonText}>Search</Text>
            </Button>
          </Col>
        </View>
        {loading ? (
          <View style={{ height: "70%", justifyContent: "center", overflow: "hidden" }}>
            <ActivityIndicator color="green" size="large" />
          </View>
        ) : (
          <ScrollView>{results}</ScrollView>
        )}
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
  row: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
});
