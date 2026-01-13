import React from "react";
import { View, StyleSheet, FlatList, RefreshControl, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BalanceSummary from "../components/BalanceSummary";
import EmptyState from "../components/EmptyState";
import TransactionItem from "../components/TransactionItem";
import Section from "../components/Section";
import { useWallet } from "../context/WalletProvider";
import { colors, spacing, typography } from "../theme/tokens";

export default function WalletScreen() {
  const { transactions, loadingTransactions, refreshAll } = useWallet();

  return (
    <SafeAreaView style={styles.safe}>
      <FlatList
        contentContainerStyle={styles.content}
        data={transactions}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <View>
            <Text style={styles.screenTitle}>Owais</Text>

            <View style={styles.heroCard}>
              <View style={styles.heroAccentOne} />
              <View style={styles.heroAccentTwo} />
              <BalanceSummary />
            </View>

            <Section title="Transactions" />
          </View>
        }
        ListEmptyComponent={
          !loadingTransactions ? (
            <EmptyState text="No transactions yet" />
          ) : null
        }
        renderItem={({ item }) => <TransactionItem item={item} />}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<View style={{ height: spacing.lg }} />}
        refreshControl={
          <RefreshControl
            refreshing={loadingTransactions}
            onRefresh={refreshAll}
            tintColor={"#6B7280"}
            progressBackgroundColor={"#F3F4F6"}
            colors={["#6366F1"]}
          />
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  content: {
    padding: spacing.lg,
    gap: spacing.md,
    paddingBottom: spacing.lg * 2,
  },
  screenTitle: {
    fontSize: typography.titleLg + 6,
    fontWeight: "900",
    color: colors.text,
    letterSpacing: 0.5,
    marginBottom: spacing.md,
  },
  separator: {
    height: 1,
    backgroundColor: "rgba(0,0,0,0.06)",
  },
  heroCard: {
    position: "relative",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: spacing.lg,
    marginBottom: spacing.md,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 16,
    elevation: 6,
    overflow: "hidden",
  },
  heroAccentOne: {
    position: "absolute",
    right: -40,
    top: -40,
    width: 160,
    height: 160,
    borderRadius: 999,
    backgroundColor: "rgba(99,102,241,0.15)",
  },
  heroAccentTwo: {
    position: "absolute",
    left: -50,
    bottom: -50,
    width: 180,
    height: 180,
    borderRadius: 999,
    backgroundColor: "rgba(16,185,129,0.12)",
  },
});
