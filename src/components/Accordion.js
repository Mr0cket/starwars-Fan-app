import React, { useState } from "react";
import { CardItem, Col, Icon, Text } from "native-base";
import { StyleSheet } from "react-native";

export const styleChevron = {
  color: "lightgray",
};
const sizeEnum = ["small", "large"];

function ChevronIcon({ direction }) {
  return <Icon type="Ionicons" name={`chevron-${direction}-outline`} style={styleChevron} />;
}

function ChevronNav({ style, icon, text, direction, onPress }) {
  return (
    <CardItem bordered button onPress={onPress}>
      {icon}

      <Col>
        <Text style={style}>{text}</Text>
      </Col>

      <ChevronIcon direction={direction} />
    </CardItem>
  );
}

export default function Accordion({ icon, title, children, size = "large" }) {
  const [expanded, setExpanded] = useState(false);
  const style = styles[size];
  if (!style) throw Error("invalid Accordion size prop");
  return (
    <>
      <ChevronNav
        icon={icon}
        text={title}
        style={style}
        direction={expanded ? "up" : "down"}
        onPress={() => setExpanded(!expanded)}
      />

      {expanded && <CardItem bordered>{children}</CardItem>}
    </>
  );
}

const styles = StyleSheet.create({
  small: {
    fontSize: 18,
  },
  large: { fontSize: 26 },
});
