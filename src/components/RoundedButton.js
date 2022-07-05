import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { colors } from "./utils/colors";
import { spacing } from "./utils/sizes";
const RoundedButton = ({
  style = {},
  textStyle = {},
  size = 128,
  ...props
}) => {
  return (
    <TouchableOpacity style={[styles(size).radius, style]}>
      <Text style={[styles(size).text, textStyle]}>{props.title}</Text>
    </TouchableOpacity>
  );
};
const styles = (size) =>
  StyleSheet.create({
    radius: {
      borderRadius: size / 2,
      height: size,
      width: size,
      alignItems: "center",
      borderColor: colors.white,
      borderWidth: 2,
    },
    text: {
      color: colors.white,
      fontSize: size / 3,
      paddingTop: spacing.xl,
    },
  });

export default RoundedButton;
