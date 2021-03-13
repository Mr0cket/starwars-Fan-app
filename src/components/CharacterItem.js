import { Body, Text } from "native-base";
import React from "react";
import Accordion from "./Accordion";

export default function CharacterItem({ character }) {
  return (
    <Accordion size={"small"} title={character.name}>
      <Body>
        <Text style={{ fontFamily: "StarWars" }}>Birth Year: {character.birth_year}</Text>
        <Text style={{ fontFamily: "StarWars" }}>Height: {character.height}</Text>
        <Text style={{ fontFamily: "StarWars" }}>gender: {character.gender}</Text>
        <Text style={{ fontFamily: "StarWars" }}>skin: {character.skin_color}</Text>
        <Text style={{ fontFamily: "StarWars" }}>eyes: {character.eye_color}</Text>
        <Text style={{ fontFamily: "StarWars" }}>hair: {character.hair_color}</Text>
      </Body>
    </Accordion>
  );
}
