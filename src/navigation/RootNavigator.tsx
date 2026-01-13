import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabs from "./BottomTabs";
import OpportunityDetailsScreen from "../screens/OpportunityDetailsScreen";

import { Opportunity } from "../types";

export type RootStackParamList = {
  Tabs: undefined;
  OpportunityDetails: { opportunity: Opportunity };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Tabs"
        component={BottomTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="OpportunityDetails"
        component={OpportunityDetailsScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
