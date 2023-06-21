import * as React from "react";
import { StyleSheet } from "react-native";
import { PaperProvider, BottomNavigation } from "react-native-paper";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import * as Notifications from "expo-notifications";

import { LightContext } from "./store/light-context";

import NullComponent from "./screens/NullComponent";
import ManageExpense from "./screens/ManageExpense";
import Expenses from "./screens/Expenses";
import Budget from "./screens/Budget";
import Settings from "./screens/Settings";

import {
  CombinedDarkTheme,
  CombinedLightTheme,
  GlobalStyles,
} from "./constants/styles";

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

// Navigation (BottomTabs)
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
    expenses: Expenses,
    report: NullComponent,
    budgets: Budget,
    settings: Settings,
  });
  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

function AppBody() {
  const { light } = React.useContext(LightContext);

  return (
    <PaperProvider theme={light ? CombinedLightTheme : CombinedDarkTheme}>
      <StatusBar style={light ? "dark" : "light"} />
      <NavigationContainer>
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
            <Stack.Screen name="ManageExpense" component={ManageExpense} />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

export default AppBody;

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
