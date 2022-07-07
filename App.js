import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import Focus from "./src/components/features/focus/focus";
import { colors } from "./src/components/utils/colors";
import Timer from "./src/components/features/timer/Timer";

function App() {
  const [focusSubject, setFocusSubject] = useState("gardening");

  return (
    <View style={styles.container}>
      {focusSubject ? (
        <Timer
          focusSubject={focusSubject}
          onTimerEnd={() => {
            setFocusSubject(null);
          }}
        />
      ) : (
        <Focus addSubject={setFocusSubject} />
      )}
      <Text>{focusSubject}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkBlue,
  },
});
export default App;
