import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors, spacing, typography } from "../theme/tokens";

type Props = {
  text: string;
};

export default function EmptyState({ text }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.xl,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: typography.body,
    color: colors.textMuted,
  },
});
