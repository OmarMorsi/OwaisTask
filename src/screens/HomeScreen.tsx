import React, { useMemo } from "react";
import { View, StyleSheet, FlatList, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BalanceSummary from "../components/BalanceSummary";
import Section from "../components/Section";
import OpportunityItem from "../components/OpportunityItem";
import EmptyState from "../components/EmptyState";
import { useWallet } from "../context/WalletProvider";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigator";
import { colors, spacing } from "../theme/tokens";

type Nav = NativeStackNavigationProp<RootStackParamList>;

export default function HomeScreen() {
  const navigation = useNavigation<Nav>();
  const { opportunities, loadingOpportunities, refreshAll } = useWallet();
  const data = useMemo(() => opportunities, [opportunities]);

  return (
    <SafeAreaView style={styles.safe}>
      <FlatList
        contentContainerStyle={styles.content}
        data={data}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <View>
            <BalanceSummary />
            <Section title="Investment Opportunities" />
          </View>
        }
        ListEmptyComponent={
          !loadingOpportunities ? (
            <EmptyState text="No opportunities available" />
          ) : null
        }
        renderItem={({ item }) => (
          <OpportunityItem
            item={item}
            onPress={() =>
              navigation.navigate("OpportunityDetails", { opportunity: item })
            }
          />
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        refreshControl={
          <RefreshControl
            refreshing={loadingOpportunities}
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
