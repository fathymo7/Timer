import React, { useState } from "react";
import { Text, View, StyleSheet, Vibration, Platform } from "react-native";
import { colors } from "../../utils/colors";
import { spacing } from "../../utils/sizes";
import Countdown from "../../Countdown";
import RoundedButton from "../../RoundedButton";
import { ProgressBar } from "react-native-paper";
import Timing from "./Timing";
import { useKeepAwake } from "expo-keep-awake";

const Timer = ({ focusSubject }) => {
  const [minutes, setIsMinutes] = useState(DEFAULT_TIME);
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setIsProgress] = useState(1);

  useKeepAwake();
  const DEFAULT_TIME = 0.1;

  const progressHandler = (progress) => {
    setIsProgress(progress);
  };

  const vibrate = () => {
    if (Platform.OS === "ios") {
      const interval = setInterval(() => Vibration.vibrate(), 1000);
      setTimeout(() => clearInterval(interval), 10000);
    } else {
      Vibration.vibrate(10000);
    }
  };

  const onEnd = () => {
    vibrate();
    setIsMinutes(DEFAULT_TIME);
    setIsProgress(1);
    setIsStarted(false);
  };

  const changeTimeHandler = (min) => {
    setIsStarted(false);
    setIsProgress(1);
    setIsMinutes(min);
  };

  return (
    <View style={styles.container}>
      <View style={styles.countDown}>
        <Countdown
          minutes={minutes}
          isPaused={!isStarted}
          onProgress={progressHandler}
          onEnd={onEnd}
        />
      </View>
      <View style={{ paddingTop: spacing.xxl }}>
        <Text style={styles.title}> Focusing on </Text>
        <Text style={styles.task}>{focusSubject} </Text>
      </View>
      <View style={{ paddingTop: spacing.sm }}>
        <ProgressBar
          style={{ height: 10 }}
          color="#5E84E2"
          progress={progress}
        />
      </View>
      <View style={styles.buttonWrapper}>
        <Timing onChangeTime={changeTimeHandler} />
      </View>

      <View style={styles.buttonWrapper}>
        {!isStarted ? (
          <RoundedButton title="start" onPress={() => setIsStarted(true)} />
        ) : (
          <RoundedButton title="pause" onPress={() => setIsStarted(false)} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: colors.white,
    textAlign: "center",
  },
  task: {
    color: colors.white,
    textAlign: "center",
    fontWeight: "bold",
  },
  countDown: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonWrapper: {
    flex: 0.3,
    flexDirection: "row",
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Timer;
