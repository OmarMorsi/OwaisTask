import React, { useMemo } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  RefreshControl,
  Text,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BalanceSummary from "../components/BalanceSummary";
import Section from "../components/Section";
import OpportunityItem from "../components/OpportunityItem";
import EmptyState from "../components/EmptyState";
import { useWallet } from "../context/WalletProvider";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigator";
import { colors, spacing, typography } from "../theme/tokens";

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
            <Pressable
              style={({ pressed }) => [
                styles.titleTouch,
                pressed && { opacity: 0.7 },
              ]}
              onPress={() => {
                const nav: any = navigation;
                if (nav?.getParent?.()) {
                  nav.getParent().navigate("Home");
                } else {
                  nav.navigate("Home");
                }
              }}
              hitSlop={8}
            >
              <Text style={styles.screenTitle}>Owais</Text>
            </Pressable>

            <View style={styles.heroCard}>
              <View style={styles.heroAccentOne} />
              <View style={styles.heroAccentTwo} />
              <BalanceSummary />
            </View>

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
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<View style={{ height: spacing.lg }} />}
        refreshControl={
          <RefreshControl
            refreshing={loadingOpportunities}
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
  content: { padding: spacing.lg, gap: spacing.md, paddingBottom: spacing.xl },
  screenTitle: {
    fontSize: typography.titleLg + 6,
    fontWeight: "900",
    color: colors.text,
    letterSpacing: 0.5,
  },
  titleTouch: {
    paddingVertical: spacing.xs,
    marginBottom: spacing.md,
  },
  separator: { height: 1, backgroundColor: "rgba(0,0,0,0.06)" },
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
    right: -35,
    top: -35,
    width: 150,
    height: 150,
    borderRadius: 999,
    backgroundColor: "rgba(99,102,241,0.15)",
  },
  heroAccentTwo: {
    position: "absolute",
    left: -45,
    bottom: -45,
    width: 170,
    height: 170,
    borderRadius: 999,
    backgroundColor: "rgba(16,185,129,0.12)",
  },
});
