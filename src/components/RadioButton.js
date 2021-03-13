import React from "react";
import { Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function RadioButton({ color, selected, onValueChange, value }) {
  // check if this button is selected
  const isActive = selected === value;
  const btnStyle = isActive ? styles.btnActive : styles.btnInActive;
  const textStyle = isActive ? styles.textActive : styles.textInactive;
  return (
    <TouchableOpacity style={[styles.button, btnStyle]} onPress={() => onValueChange(value)}>
      <Text style={[styles.buttonText, textStyle]}> {value || "all"} </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 14,
    textAlign: "right",
  },
  button: {
    paddingVertical: "2%",
    width: 55,
    borderWidth: 1,
    borderColor: "green",
    marginLeft: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  btnActive: {
    backgroundColor: "green",
  },
  btnInactive: {
    backgroundColor: "white",
  },
  textActive: {
    color: "white",
  },
  textInactive: {
    color: "green",
  },
});
