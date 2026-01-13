import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors, radii, shadow, spacing, typography } from "../theme/tokens";
import { Opportunity } from "../types";
import { formatCurrencySAR } from "../utils/format";

type Props = {
  item: Opportunity;
  onPress: () => void;
};

export default function OpportunityItem({ item, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
    >
      <View style={styles.row}>
        <Text style={styles.name}>{item.name}</Text>
        <MaterialCommunityIcons
          name="chevron-right"
          size={22}
          color={colors.textMuted}
        />
      </View>
      <Text style={styles.meta}>{`${item.expectedReturn}% • ${
        item.durationMonths
      } months • Min ${formatCurrencySAR(item.minInvestment)}`}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
    borderRadius: radii.md,
    backgroundColor: colors.surface,
    gap: spacing.xs,
    ...shadow,
  },
  pressed: {
    opacity: 0.7,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  name: {
    fontSize: typography.bodyStrong,
    fontWeight: "600",
    color: colors.text,
  },
  meta: {
    fontSize: typography.body,
    color: colors.textMuted,
  },
});
