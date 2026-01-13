import React, { useMemo, useState } from "react";
import { View, Text, StyleSheet, Pressable, Alert } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackParamList } from "../navigation/RootNavigator";
import { colors, radii, shadow, spacing, typography } from "../theme/tokens";
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
      <View style={styles.header}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
          hitSlop={8}
        >
          <MaterialCommunityIcons name="chevron-left" size={28} color="#000" />
        </Pressable>
        <Text style={styles.headerTitle}>Details</Text>
        <View style={styles.headerRight} />
      </View>
      <View style={styles.container}>
        <Text style={styles.name}>{opportunity.name}</Text>
        <Text style={styles.desc}>{opportunity.description}</Text>
        <View style={styles.cardRow}>
          <Text style={styles.label}>Expected return</Text>
          <Text style={styles.value}>{`${opportunity.expectedReturn}%`}</Text>
        </View>
        <View style={styles.cardRow}>
          <Text style={styles.label}>Duration</Text>
          <Text
            style={styles.value}
          >{`${opportunity.durationMonths} months`}</Text>
        </View>
        <View style={styles.cardRow}>
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
  safe: { flex: 1, backgroundColor: colors.bg },
  header: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.surface,
    ...shadow,
  },
  backBtn: { position: "absolute", left: spacing.sm, padding: spacing.xs },
  headerTitle: {
    fontSize: typography.title,
    fontWeight: "700",
    color: colors.text,
  },
  headerRight: { position: "absolute", right: spacing.sm, width: 32 },
  container: { flex: 1, padding: spacing.lg, gap: spacing.md },
  name: { fontSize: typography.titleLg, fontWeight: "700", color: colors.text },
  desc: { fontSize: typography.body, color: colors.textMuted },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderRadius: radii.md,
    backgroundColor: colors.surface,
    ...shadow,
  },
  label: { fontSize: typography.body, color: colors.textMuted },
  value: { fontSize: typography.body, color: colors.text, fontWeight: "700" },
  button: {
    marginTop: spacing.lg,
    backgroundColor: colors.primary,
    paddingVertical: spacing.md + 2,
    borderRadius: radii.md,
    alignItems: "center",
  },
  buttonDisabled: { backgroundColor: colors.primaryMuted },
  buttonPressed: { opacity: 0.85 },
  buttonText: {
    color: "#fff",
    fontSize: typography.bodyStrong,
    fontWeight: "700",
  },
  available: {
    marginTop: spacing.sm,
    fontSize: typography.label,
    color: colors.textMuted,
  },
});
