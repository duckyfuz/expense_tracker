import * as React from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import { Text, BottomNavigation } from "react-native-paper";
import { StatusBar } from "expo-status-bar";

import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import {
  MD3DarkTheme,
  MD3LightTheme,
  PaperProvider,
  adaptNavigationTheme,
} from "react-native-paper";
import merge from "deepmerge";

import { createStackNavigator } from "@react-navigation/stack";

import ExpensesContextProvider from "./store/expenses-context";
import * as Notifications from "expo-notifications";

import ManageExpense from "./screens/ManageExpense";
import RecentExpenses from "./screens/RecentExpenses";

import { GlobalStyles } from "./constants/styles";

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});
const { CombinedLightTheme, CombinedDarkTheme } = {
  CombinedLightTheme: merge(MD3LightTheme, LightTheme),
  CombinedDarkTheme: merge(MD3DarkTheme, DarkTheme),
};

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

async function scheduleNotificationHandler() {
  console.log("notification schedued");
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "🚨🚨🚨 TIME TO RECORD YOUR EXPENSES 🚨🚨🚨",
      body: "Record your expenses now!!!",
    },
    trigger: {
      seconds: 5,
    },
  });
  console.log("notification sent");
}

const Stack = createStackNavigator();

function NullComponent() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
        <Text variant="displayMedium" style={{ textAlign: "center" }}>
          This page is being worked on! Check again in a week :)
        </Text>
      </View>
    </SafeAreaView>
  );
}

const ExpensesOverview = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: "expenses",
      title: "Expenses",
      focusedIcon: "cash-multiple",
      unfocusedIcon: "cash-fast",
    },
    {
      key: "report",
      title: "Report",
      focusedIcon: "calendar-month",
      unfocusedIcon: "calendar-month-outline",
    },
    {
      key: "budgets",
      title: "Budgets",
      focusedIcon: "bag-personal",
      unfocusedIcon: "bag-personal-outline",
    },
    {
      key: "settings",
      title: "Settings",
      focusedIcon: "account-settings",
      unfocusedIcon: "account-settings-outline",
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    expenses: RecentExpenses,
    report: NullComponent,
    budgets: NullComponent,
    settings: NullComponent,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default function App() {
  return (
    <PaperProvider theme={CombinedDarkTheme}>
      <ExpensesContextProvider>
        <StatusBar style="light" />
        <NavigationContainer theme={CombinedDarkTheme}>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Group>
              <Stack.Screen
                name="Expenses Overview"
                component={ExpensesOverview}
              />
            </Stack.Group>
            <Stack.Group
              screenOptions={{
                presentation: "transparentModal",
              }}
            >
              <Stack.Screen
                name="ManageExpense"
                component={ManageExpense}
              />
            </Stack.Group>
          </Stack.Navigator>
        </NavigationContainer>
      </ExpensesContextProvider>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: GlobalStyles.colors.background,
    borderTopWidth: 0,
    position: "absolute",
    bottom: 25,
    left: 20,
    right: 20,
    height: 70,
    borderRadius: 15,
    elevation: 0,
  },
  tabBarIcon: {
    alignItems: "center",
    justifyContent: "center",
    top: 15,
    alignContent: "center",
  },
  tabBarIconCenter: {
    backgroundColor: "rgba(0,0,0,0)",
    top: 10,
    height: 100,
  },
});
