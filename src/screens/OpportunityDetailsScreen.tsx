import React, { useState } from "react";
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
          <MaterialCommunityIcons
            name="chevron-left"
            size={24}
            color={colors.text}
          />
        </Pressable>
        <Text style={styles.headerTitle}>Details</Text>
        <View style={styles.headerRight} />
      </View>

      <View style={styles.container}>
        <View style={styles.heroCard}>
          <View style={styles.heroAccentOne} />
          <View style={styles.heroAccentTwo} />
          <Text style={styles.name}>{opportunity.name}</Text>
          <Text style={styles.desc}>{opportunity.description}</Text>
        </View>

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
          disabled={submitting}
          onPress={onInvest}
          style={({ pressed }) => [
            styles.button,
            submitting && styles.buttonDisabled,
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
    backgroundColor: "transparent",
  },
  backBtn: {
    position: "absolute",
    left: spacing.sm,
    padding: spacing.xs,
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 999,
  },
  headerTitle: {
    fontSize: typography.title,
    fontWeight: "700",
    color: colors.text,
  },
  headerRight: { position: "absolute", right: spacing.sm, width: 32 },
  container: { flex: 1, padding: spacing.lg, gap: spacing.md },
  heroCard: {
    position: "relative",
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    padding: spacing.lg,
    ...shadow,
    overflow: "hidden",
  },
  heroAccentOne: {
    position: "absolute",
    right: -40,
    top: -40,
    width: 150,
    height: 150,
    borderRadius: 999,
    backgroundColor: "rgba(99,102,241,0.12)",
  },
  heroAccentTwo: {
    position: "absolute",
    left: -48,
    bottom: -48,
    width: 170,
    height: 170,
    borderRadius: 999,
    backgroundColor: "rgba(16,185,129,0.10)",
  },
  name: { fontSize: typography.titleLg, fontWeight: "700", color: colors.text },
  desc: {
    fontSize: typography.body,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },

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
    ...shadow,
  },
  buttonDisabled: { backgroundColor: colors.primaryMuted },
  buttonPressed: { opacity: 0.9, transform: [{ scale: 0.98 }] },
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
