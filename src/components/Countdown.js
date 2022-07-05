import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View } from "react-native";
import { fontSizes, spacing } from "./utils/sizes";
import { colors } from "./utils/colors";

const minsToMilliSeconds = (min) => min * 1000 * 60;
const formatTime = (time) => (time < 10 ? `0${time}` : time);

const Countdown = ({ minutes = 20, isPaused, onProgress }) => {
  const [millis, setMillis] = useState(minsToMilliSeconds(minutes));

  const interval = React.useRef(null);

  const countDown = () => {
    setMillis((time) => {
      if (time === 0) {
        return time;
      }
      const timeLeft = time - 1000;
      onProgress(timeLeft / minsToMilliSeconds(minutes));
      return timeLeft;
    });
  };

  useEffect(() => {
    setMillis();
  }, [minutes]);

  useEffect(() => {
    if (isPaused) {
      if (interval.current) clearInterval(interval.current);
      return;
    }
    interval.current = setInterval(countDown, 1000);

    return () => clearInterval(interval.current);
  }, [isPaused]);

  const minute = Math.floor(millis / 1000 / 60) % 60;
  const second = Math.floor(millis / 1000) % 60;

  return (
    <Text style={styles.text}>
      {formatTime(minute)}:{formatTime(second)}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: fontSizes.xxxl,
    fontWeight: "bold",
    color: colors.white,
    padding: spacing.lg,
    backgroundColor: "lightblue",
  },
});

export default Countdown;
