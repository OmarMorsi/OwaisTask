import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors, radii, shadow, spacing, typography } from "../theme/tokens";
import { useWallet } from "../context/WalletProvider";
import { formatCurrencySAR } from "../utils/format";

export default function BalanceSummary() {
  const { balances } = useWallet();
  const available = balances?.available ?? 0;
  const invested = balances?.invested ?? 0;
  const total = available + invested;

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.cardCentered}>
          <Text style={styles.label}>Available</Text>
          <Text style={styles.value}>{formatCurrencySAR(available)}</Text>
        </View>
        <View style={styles.cardCentered}>
          <Text style={styles.label}>Invested</Text>
          <Text style={styles.value}>{formatCurrencySAR(invested)}</Text>
        </View>
        <View style={styles.cardCentered}>
          <Text style={styles.label}>Total</Text>
          <Text style={styles.totalValue}>{formatCurrencySAR(total)}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.md,
    padding: spacing.lg,
    backgroundColor: colors.bg,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "stretch",
    gap: spacing.md,
  },
  cardCentered: {
    flex: 1,
    padding: spacing.lg,
    borderRadius: radii.md,
    backgroundColor: colors.surface,
    alignItems: "center",
    ...shadow,
  },
  label: {
    fontSize: typography.label,
    color: colors.textMuted,
  },
  value: {
    marginTop: spacing.xs,
    fontSize: typography.bodyStrong,
    fontWeight: "700",
    color: colors.text,
  },
  totalValue: {
    marginTop: spacing.xs,
    fontSize: typography.body,
    fontWeight: "800",
    color: colors.text,
  },
});
