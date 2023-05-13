import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import AllExpenses from "./screens/AllExpenses";
import ManageExpense from "./screens/ManageExpense";
import RecentExpenses from "./screens/RecentExpenses";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function ExpensesOverview() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="RecentExpenses" component={RecentExpenses} />
      <Tab.Screen
        name="AllExpenses"
        component={AllExpenses}
        options={{ title: "All Expenses" }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Expenses Overview"
            component={ExpensesOverview}
            options={{ title: "Expenses Overview" }}
          />
          <Stack.Screen name="ManageExpense" component={ManageExpense} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
});
