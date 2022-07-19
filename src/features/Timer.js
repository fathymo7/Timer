import React, { useState } from "react";
import { View, Text, StyleSheet, Vibration } from "react-native";
import { ProgressBar } from "react-native-paper";
import { useKeepAwake } from "expo-keep-awake";

import { Countdown } from "../components/Countdown";
import { RoundedButton } from "../components/RoundedButton";
import { PresetTimes } from "../components/PresetTimes";
import { spacing } from "../utils/sizes";
import { colors } from "../utils/colors";

// Vibration pattern - IOS and android patterns will differ
const ONE_SECOND_IN_MS = 1000;

const PATTERN = [
  1 * ONE_SECOND_IN_MS,
  2 * ONE_SECOND_IN_MS,
  3 * ONE_SECOND_IN_MS,
];

export const Timer = ({ task, resetTask, onTimerEnd }) => {
  // Make sure device doesn't go into sleep mode during timer
  useKeepAwake();

  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);
  const [minutes, setMinutes] = useState(0.1);

  const handleTimerEnd = (reset) => {
    Vibration.vibrate(PATTERN);
    setIsStarted(false);
    setProgress(1);
    reset();
    onTimerEnd(task);
  };

  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown
          isPaused={!isStarted}
          onEnd={handleTimerEnd}
          onProgress={setProgress}
          minutes={minutes}
        />
        <View style={styles.taskInfoContainer}>
          <Text style={styles.title}>Focusing on:</Text>
          <Text style={styles.task}>{task}</Text>
        </View>
      </View>
      <ProgressBar
        progress={progress}
        color={colors.progressBar}
        style={styles.progressBar}
      />
      <View style={styles.timeButtons}>
        <PresetTimes onChangeTime={setMinutes} />
      </View>
      <View style={styles.buttonContainer}>
        {isStarted ? (
          <RoundedButton title="pause" onPress={() => setIsStarted(false)} />
        ) : (
          <RoundedButton title="start" onPress={() => setIsStarted(true)} />
        )}
      </View>
      <View style={styles.resetButton}>
        <RoundedButton title="-" size={40} onPress={resetTask} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  countdown: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    flex: 0.2,
    justifyContent: "center",
    alignItems: "center",
  },
  taskInfoContainer: {
    padding: spacing.xxl,
  },
  title: {
    color: colors.white,
    textAlign: "center",
    fontWeight: "bold",
  },
  task: {
    color: colors.white,
    textAlign: "center",
  },
  progressBar: {
    height: spacing.sm,
  },
  timeButtons: {
    flex: 0.2,
    flexDirection: "row",
    alignItems: "center",
  },
  resetButton: {
    flex: 0.1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
