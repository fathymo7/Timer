import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

import { spacing, fontSizes } from "../utils/sizes";
import { colors } from "../utils/colors";

export const TaskHistory = ({ history }) => {
  if (!history || !history.length) return null;

  const renderItem = ({ item }) => (
    <Text style={styles.listItem}>- {item}</Text>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tasks completed with FocusTime</Text>
      <FlatList style={styles.list} data={history} renderItem={renderItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: spacing.md,
  },
  title: {
    color: colors.white,
    fontSize: fontSizes.md,
    fontWeight: "bold",
  },
  list: {
    paddingTop: spacing.sm,
  },
  listItem: {
    color: colors.white,
    fontSize: fontSizes.md,
  },
});
