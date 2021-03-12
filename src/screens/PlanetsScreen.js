import React, { useEffect, useState } from "react";
import { Container, Content, Text, Picker, Title, H1, H3, H2, View } from "native-base";
import { ActivityIndicator, Dimensions, StyleSheet } from "react-native";
import axios from "axios";
import Accordion from "../components/Accordion";
const { height, width } = Dimensions.get("window");

const climates = ["arid", "tropical", "temperate", "windy", "polluted", "moist", "hot", "unknown"];
const apiUrl = "http://192.168.1.47:4000";
export default function PlanetsScreen() {
  const [{ climate, data, loading, hairType }, setState] = useState({
    climate: null,
    planets: null,
    loading: null,
    hairType: false,
  });

  useEffect(() => {
    climate
      ? axios
          .get(`${apiUrl}/planets/climate/${climate}`)
          .then((res) => setState((prevState) => ({ ...prevState, data: res.data })))
      : setState((prevState) => ({ ...prevState, data: null }));
  }, [climate]);

  const residentType = hairType ? "darkHairedResidents" : "residents";
  const planetsList =
    data &&
    Object.values(data).map((planet) => (
      <Accordion title={planet.name}>
        {planet[residentType].length > 0 ? (
          planet[residentType].map((resident) => <Text>{resident.name}</Text>)
        ) : (
          <Text>no {residentType}</Text>
        )}
      </Accordion>
    ));
  return (
    <Container>
      <View style={{ alignItems: "center" }}>
        <View style={{ flexDirection: "row", marginTop: height / 10 }}>
          <View>
            <H2>Climate</H2>
            <Picker
              note
              renderHeader="Climate"
              mode="dropdown"
              style={{ width: width / 2, color: "black", fontSize: 18 }}
              selectedValue={climate}
              onValueChange={(value) => setState((prevState) => ({ ...prevState, climate: value }))}
            >
              <Picker.Item key={0} label="none" value={undefined} />
              {climates.map((climate, i) => (
                <Picker.Item key={i + 1} label={climate} value={climate} />
              ))}
            </Picker>
          </View>
          <View>
            <H2>hair Type</H2>
            <Picker
              note
              renderHeader="hair-type"
              mode="dropdown"
              style={{ width: width / 2, color: "black", fontSize: 18 }}
              selectedValue={hairType}
              onValueChange={(value) =>
                setState((prevState) => ({ ...prevState, hairType: value }))
              }
            >
              <Picker.Item key={0} label="all" value={false} />
              <Picker.Item key={0} label="Dark Haired" value={true} />
            </Picker>
          </View>
        </View>
        <View style={{ width, marginTop: height / 20 }}>
          {!climate && <H2> Choose a climate type!</H2>}
          {loading ? <ActivityIndicator /> : planetsList}
        </View>
      </View>
    </Container>
  );
}
