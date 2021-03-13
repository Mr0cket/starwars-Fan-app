import React, { useEffect, useState } from "react";
import { Container, Content, Text, Picker, Title, H1, H3, H2, View, Body } from "native-base";
import { ActivityIndicator, Dimensions, ScrollView, StyleSheet } from "react-native";
import axios from "axios";
import Accordion from "../components/Accordion";
import { apiUrl } from "../config/constants";
import CharacterItem from "../components/CharacterItem";
const { height, width } = Dimensions.get("window");

const climates = ["arid", "tropical", "temperate", "windy", "polluted", "moist", "hot", "unknown"];

export default function PlanetsScreen() {
  const [{ data, loading }, setScreenState] = useState({
    data: null,
    loading: null,
  });
  const [hairType, setHairType] = useState(false);
  const [climate, setClimate] = useState(null);

  useEffect(() => {
    if (climate) {
      setScreenState((prevState) => ({ ...prevState, loading: true }));
      axios
        .get(`${apiUrl}/planets/climate/${climate}`)
        .then((res) =>
          setScreenState((prevState) => ({ ...prevState, data: res.data, loading: null }))
        );
    } else setScreenState((prevState) => ({ ...prevState, data: null }));
  }, [climate]);

  const residentType = hairType ? "darkHairedResidents" : "residents";
  const planetsList =
    data &&
    Object.values(data).map((planet) => (
      <Accordion key={planet.name} title={planet.name}>
        <Body>
          {planet[residentType].length > 0 ? (
            planet[residentType].map((resident) => (
              <CharacterItem key={resident.name} character={resident} />
            ))
          ) : (
            <Text>no {residentType}</Text>
          )}
        </Body>
      </Accordion>
    ));
  return (
    <Container style={{ alignItems: "center" }}>
      <View style={{ flexDirection: "row", marginTop: height / 10 }}>
        <View>
          <H2 style={{ fontFamily: "StarWars" }}>Climate</H2>
          <Picker
            note
            renderHeader="Climate"
            mode="dropdown"
            style={{ width: width / 2, color: "black", fontSize: 18 }}
            selectedValue={climate}
            onValueChange={setClimate}
          >
            <Picker.Item key={0} label="none" value={undefined} />
            {climates.map((climate, i) => (
              <Picker.Item key={i + 1} label={climate} value={climate} />
            ))}
          </Picker>
        </View>
        <View>
          <H2 style={{ fontFamily: "StarWars" }}>hair Type</H2>
          <Picker
            note
            renderHeader="hair-type"
            mode="dropdown"
            style={{ width: width / 2, color: "black", fontSize: 18 }}
            selectedValue={hairType}
            onValueChange={setHairType}
          >
            <Picker.Item key={0} label="all" value={false} />
            <Picker.Item key={0} label="Dark Haired" value={true} />
          </Picker>
        </View>
      </View>
      <ScrollView style={{ width, marginTop: height / 20 }}>
        {!climate && <H2 style={{ fontFamily: "StarWars" }}> Choose a climate type!</H2>}
        {loading ? <ActivityIndicator size="large" color="green" /> : planetsList}
      </ScrollView>
    </Container>
  );
}
