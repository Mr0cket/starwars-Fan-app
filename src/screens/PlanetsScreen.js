import React, { useEffect, useState } from "react";
import { Container, Content, Text, Picker, Title, H1, H3, H2, View, Body } from "native-base";
import { ActivityIndicator, Dimensions, ScrollView, StyleSheet } from "react-native";
import axios from "axios";
import Accordion from "../components/Accordion";
import { apiUrl } from "../config/constants";
const { height, width } = Dimensions.get("window");

const climates = ["arid", "tropical", "temperate", "windy", "polluted", "moist", "hot", "unknown"];

export default function PlanetsScreen() {
  const [{ climate, data, loading, hairType }, setScreenState] = useState({
    climate: null,
    planets: null,
    loading: null,
    hairType: false,
  });

  useEffect(() => {
    climate
      ? axios
          .get(`${apiUrl}/planets/climate/${climate}`)
          .then((res) => setScreenState((prevState) => ({ ...prevState, data: res.data })))
      : setScreenState((prevState) => ({ ...prevState, data: null }));
  }, [climate]);

  const residentType = hairType ? "darkHairedResidents" : "residents";
  const planetsList =
    data &&
    Object.values(data).map((planet) => (
      <Accordion title={planet.name}>
        <Body>
          {planet[residentType].length > 0 ? (
            planet[residentType].map((resident) => <Text>{resident.name}</Text>)
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
            onValueChange={(value) =>
              setScreenState((prevState) => ({ ...prevState, climate: value }))
            }
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
            onValueChange={(value) =>
              setScreenState((prevState) => ({ ...prevState, hairType: value }))
            }
          >
            <Picker.Item key={0} label="all" value={false} />
            <Picker.Item key={0} label="Dark Haired" value={true} />
          </Picker>
        </View>
      </View>
      <ScrollView style={{ width, marginTop: height / 20 }}>
        {!climate && <H2 style={{ fontFamily: "StarWars" }}> Choose a climate type!</H2>}
        {loading ? <ActivityIndicator /> : planetsList}
      </ScrollView>
    </Container>
  );
}
