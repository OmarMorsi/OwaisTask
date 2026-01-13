import React from "react";
import { View, Text, StyleSheet } from "react-native";
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
        <View style={styles.card}>
          <Text style={styles.label}>Available</Text>
          <Text style={styles.value}>{formatCurrencySAR(available)}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.label}>Invested</Text>
          <Text style={styles.value}>{formatCurrencySAR(invested)}</Text>
        </View>
      </View>
      <View style={styles.total}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.totalValue}>{formatCurrencySAR(total)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
    padding: 16,
    backgroundColor: "#fff",
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
  card: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#f5f5f5",
  },
  label: {
    fontSize: 12,
    color: "#666",
  },
  value: {
    marginTop: 6,
    fontSize: 18,
    fontWeight: "700",
    color: "#000",
  },
  total: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#eaeaea",
  },
  totalLabel: {
    fontSize: 12,
    color: "#666",
  },
  totalValue: {
    marginTop: 6,
    fontSize: 20,
    fontWeight: "800",
    color: "#000",
  },
});
