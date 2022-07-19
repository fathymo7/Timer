import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";

import { RoundedButton } from "../components/RoundedButton";
import { colors } from "../utils/colors";

export const Focus = ({ updateTask }) => {
  const [task, setTask] = useState(null);

  return (
    <View>
      <View style={styles.inputContainer}>
        <TextInput
          label="Set a task"
          onChangeText={setTask}
          style={styles.textInput}
        />
        <View style={styles.buttonContainer}>
          <RoundedButton title="+" size={50} onPress={() => updateTask(task)} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
  },
  textInput: {
    flex: 0.8,
  },
  buttonContainer: {
    flex: 0.2,
    alignItems: "center",
  },
});
