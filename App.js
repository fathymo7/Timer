import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
} from "react-native";
import Constants from "expo-constants";

import { Focus } from "./src/features/Focus";
import { TaskHistory } from "./src/components/TaskHistory";
import { Timer } from "./src/features/Timer";
import { colors } from "./src/utils/colors";

export default function App() {
  const [currentTask, setCurrentTask] = useState(null);
  const [history, setHistory] = useState(["test item"]);

  return (
    <SafeAreaView style={styles.container}>
      {currentTask ? (
        <Timer
          task={currentTask}
          resetTask={() => setCurrentTask(null)}
          onTimerEnd={(task) => {
            setHistory([...history, task]);
          }}
        />
      ) : (
        <>
          <Focus updateTask={setCurrentTask} />
          <TaskHistory history={history} />
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: colors.green,
  },
});
