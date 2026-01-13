import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
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
      </View>
      <Text style={styles.meta}>{`${item.expectedReturn}% • ${
        item.durationMonths
      } months • Min ${formatCurrencySAR(item.minInvestment)}`}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#eee",
    gap: 6,
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
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  meta: {
    fontSize: 13,
    color: "#444",
  },
});
