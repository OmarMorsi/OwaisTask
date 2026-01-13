import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors, radii, shadow, spacing, typography } from "../theme/tokens";
import { Transaction } from "../types";
import { formatCurrencySAR, formatDateHuman } from "../utils/format";

type Props = {
  item: Transaction;
};

export default function TransactionItem({ item }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.type}>{item.type}</Text>
        <Text style={styles.amount}>{formatCurrencySAR(item.amount)}</Text>
      </View>
      <Text style={styles.date}>{formatDateHuman(item.date)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
    borderRadius: radii.sm,
    backgroundColor: colors.surface,
    ...shadow,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  type: {
    fontSize: typography.body,
    fontWeight: "700",
    color: colors.text,
  },
  amount: {
    fontSize: typography.body,
    fontWeight: "800",
    color: colors.text,
  },
  date: {
    marginTop: spacing.xs,
    fontSize: typography.label,
    color: colors.textMuted,
  },
});
