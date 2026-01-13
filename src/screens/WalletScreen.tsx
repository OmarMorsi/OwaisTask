import React from "react";
import { View, StyleSheet, FlatList, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BalanceSummary from "../components/BalanceSummary";
import EmptyState from "../components/EmptyState";
import TransactionItem from "../components/TransactionItem";
import Section from "../components/Section";
import { useWallet } from "../context/WalletProvider";
import { colors, spacing } from "../theme/tokens";

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
            <BalanceSummary />
            <Section title="Transactions">
              <View />
            </Section>
          </View>
        }
        ListEmptyComponent={
          !loadingTransactions ? (
            <EmptyState text="No transactions yet" />
          ) : null
        }
        renderItem={({ item }) => <TransactionItem item={item} />}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        refreshControl={
          <RefreshControl
            refreshing={loadingTransactions}
            onRefresh={refreshAll}
          />
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.lg, gap: spacing.md },
  separator: { height: spacing.md },
});
