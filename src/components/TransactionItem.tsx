import React from "react";
import { View, Text, StyleSheet } from "react-native";
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
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  type: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
  },
  amount: {
    fontSize: 14,
    fontWeight: "700",
    color: "#000",
  },
  date: {
    marginTop: 4,
    fontSize: 12,
    color: "#666",
  },
});
