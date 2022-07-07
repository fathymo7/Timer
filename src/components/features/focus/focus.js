import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
import RoundedButton from "../../RoundedButton";
import { fontSizes, spacing } from "../../utils/sizes";
import { colors } from "../../utils/colors";

const Focus = ({ addSubject }) => {
  const [tmpItem, setTmpItem] = useState(null);
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}> what would you like to focus on?? </Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={{ flex: 1, marginRight: spacing.md }}
            onSubmitEditing={({ nativeEvent: { text } }) => setFocusItem(text)}
          />
          <RoundedButton
            size={50}
            title="+"
            onPress={() => {
              addSubject(tmpItem);
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    flex: 0.5,
    padding: 16,
    justifyContent: "center",
  },
  title: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: fontSizes.lg,
  },
  inputContainer: {
    paddingTop: spacing.md,
    flexDirection: "row",
    alignItems: "center",
  },
});
export default Focus;
