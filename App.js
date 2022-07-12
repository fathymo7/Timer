import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import Focus from "./src/components/features/focus/focus";
import { colors } from "./src/components/utils/colors";
import Timer from "./src/components/features/timer/Timer";

statuses = {
  complete: 1,
  failed: 2,
};

function App() {
  const [focusSubject, setFocusSubject] = useState(null);
  const [focusHistory, setFocusHistory] = useState([]);

  addFocusHistorySubjectWithState = (focusSubject, status) => {
    setFocusHistory([...focusHistory, { subject, status }]);
  };

  useEffect(() => {
    if (focusSubject) {
      setFocusHistory([...focusHistory, focusSubject]);
    }
  }, [focusSubject]);

  return (
    <View style={styles.container}>
      {focusSubject ? (
        <Timer
          focusSubject={focusSubject}
          onTimerEnd={() => {
            addFocusHistorySubjectWithState(focusSubject, statuses.complete);
            setFocusSubject(null);
          }}
          clearSubject={() => {
            addFocusHistorySubjectWithState(focusSubject, statuses.failed);

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
