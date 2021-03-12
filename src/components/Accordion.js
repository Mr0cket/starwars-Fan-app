import React, { useState } from "react";
import { CardItem, Col, Icon, Text } from "native-base";

export const styleChevron = {
  color: "lightgray",
};

function ChevronIcon({ direction }) {
  return <Icon type="Ionicons" name={`chevron-${direction}-outline`} style={styleChevron} />;
}

function ChevronNav({ icon, text, direction, onPress }) {
  return (
    <CardItem bordered button onPress={onPress}>
      {icon}

      <Col>
        <Text style={{ fontSize: 26 }}>{text}</Text>
      </Col>

      <ChevronIcon direction={direction} />
    </CardItem>
  );
}

export default function Accordion({ icon, title, children }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <ChevronNav
        icon={icon}
        text={title}
        direction={expanded ? "up" : "down"}
        onPress={() => setExpanded(!expanded)}
      />

      {expanded && <CardItem bordered>{children}</CardItem>}
    </>
  );
}
