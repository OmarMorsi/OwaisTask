import React, { useMemo, useState } from "react";
import { View, Text, StyleSheet, Pressable, Alert } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackParamList } from "../navigation/RootNavigator";
import { formatCurrencySAR } from "../utils/format";
import { useWallet } from "../context/WalletProvider";

type Props = NativeStackScreenProps<RootStackParamList, "OpportunityDetails">;

export default function OpportunityDetailsScreen({ route, navigation }: Props) {
  const { opportunity } = route.params;
  const { balances, investInOpportunity } = useWallet();
  const [submitting, setSubmitting] = useState(false);
  const available = balances?.available ?? 0;
  const canInvest = useMemo(() => available >= 1000, [available]);

  const onInvest = async () => {
    if (submitting) return;
    setSubmitting(true);
    const res = await investInOpportunity(opportunity.id, 1000);
    setSubmitting(false);
    if (!res.ok) {
      Alert.alert("Investment Failed", res.error || "Unable to invest");
      return;
    }
    Alert.alert("Success", "Investment completed");
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.name}>{opportunity.name}</Text>
        <Text style={styles.desc}>{opportunity.description}</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Expected return</Text>
          <Text style={styles.value}>{`${opportunity.expectedReturn}%`}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Duration</Text>
          <Text
            style={styles.value}
          >{`${opportunity.durationMonths} months`}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Minimum investment</Text>
          <Text style={styles.value}>
            {formatCurrencySAR(opportunity.minInvestment)}
          </Text>
        </View>
        <Pressable
          disabled={!canInvest || submitting}
          onPress={onInvest}
          style={({ pressed }) => [
            styles.button,
            (!canInvest || submitting) && styles.buttonDisabled,
            pressed && styles.buttonPressed,
          ]}
        >
          <Text style={styles.buttonText}>Invest 1,000 SAR</Text>
        </Pressable>
        <Text style={styles.available}>{`Available: ${formatCurrencySAR(
          available
        )}`}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },
  container: { flex: 1, padding: 16, gap: 12 },
  name: { fontSize: 20, fontWeight: "700", color: "#000" },
  desc: { fontSize: 14, color: "#333" },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  label: { fontSize: 14, color: "#666" },
  value: { fontSize: 14, color: "#000", fontWeight: "600" },
  button: {
    marginTop: 16,
    backgroundColor: "#000",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonDisabled: { backgroundColor: "#999" },
  buttonPressed: { opacity: 0.85 },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "700" },
  available: { marginTop: 8, fontSize: 12, color: "#666" },
});
