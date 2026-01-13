import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet } from "react-native";
import HomeScreen from "../screens/HomeScreen";
import WalletScreen from "../screens/WalletScreen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../theme/tokens";

export type RootTabParamList = {
  Home: undefined;
  Wallet: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "black",
        tabBarStyle: styles.tabBar,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string = "home-outline";

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Wallet") {
            iconName = focused ? "wallet" : "wallet-outline";
          }

          return (
            <MaterialCommunityIcons
              name={iconName}
              size={size ?? 24}
              color={color ?? "black"}
            />
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Wallet" component={WalletScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.surface,
    borderTopWidth: 0,
    height: 60,
    paddingBottom: 6,
    paddingTop: 6,
  },
});
