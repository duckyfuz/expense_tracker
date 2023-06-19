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

import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import IconButton from "./components/UI/IconButton";
// import { Ionicons } from "@expo/vector-icons";

import ExpensesContextProvider from "./store/expenses-context";
import * as Notifications from "expo-notifications";

import AllExpenses from "./screens/AllExpenses";
import ManageExpense from "./screens/ManageExpense";
import RecentExpenses from "./screens/RecentExpenses";

import { GlobalStyles } from "./constants/styles";

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const CombinedDefaultTheme = merge(MD3LightTheme, LightTheme);
const CombinedDarkTheme = merge(MD3DarkTheme, DarkTheme);

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const Stack = createNativeStackNavigator();
// const Tab = createBottomTabNavigator();

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

  // Previous implementation - floating bottomTab with large center button
  // return (
  //   <Tab.Navigator
  //     screenOptions={{
  //       tabBarShowLabel: false,
  //       headerStyle: { backgroundColor: GlobalStyles.colors.background },
  //       headerTintColor: GlobalStyles.colors.onBackground,
  //       tabBarStyle: {
  //         ...styles.tabBar,
  //         ...styles.shadow,
  //       },
  //       tabBarActiveTintColor: GlobalStyles.colors.secondary,
  //       headerShadowVisible: false,
  //     }}
  //   >
  //     <Tab.Screen
  //       name="RecentExpenses"
  //       component={RecentExpenses}
  //       options={{
  //         headerRight: () => (
  //           <IconButton
  //             icon="save"
  //             size={24}
  //             color={GlobalStyles.colors.secondary}
  //             onPress={scheduleNotificationHandler}
  //             additionalStyle={{ marginRight: 12 }}
  //           />
  //         ),
  //         title: "Recent Expenses",
  //         tabBarLabel: "Recent",
  //         tabBarIcon: ({ color, size }) => (
  //           <View style={styles.tabBarIcon}>
  //             <Ionicons name="hourglass" size={size} color={color} />
  //           </View>
  //         ),
  //       }}
  //     />
  //     <Tab.Screen
  //       name="Add"
  //       component={NullComponent}
  //       options={{
  //         tabBarIcon: ({ focused, size, color }) => (
  //           <View style={styles.tabBarIconCenter}>
  //             <Ionicons
  //               name="add-circle"
  //               size={100}
  //               color={GlobalStyles.colors.primaryVariant}
  //             />
  //           </View>
  //         ),
  //       }}
  //       listeners={({ navigation }) => ({
  //         tabPress: (e) => {
  //           e.preventDefault();
  //           navigation.navigate("ManageExpense");
  //         },
  //       })}
  //     />
  //     <Tab.Screen
  //       name="AllExpenses"
  //       component={AllExpenses}
  //       options={{
  //         title: "All Expenses",
  //         tabBarLabel: "All Expenses",
  //         tabBarIcon: ({ color, size }) => (
  //           <View style={[styles.tabBarIcon, styles.shadow]}>
  //             <Ionicons name="calendar" size={size} color={color} />
  //           </View>
  //         ),
  //       }}
  //     />
  //   </Tab.Navigator>
  // );
};

export default function App() {
  return (
    <PaperProvider theme={CombinedDarkTheme}>
      <ExpensesContextProvider>
        <StatusBar style="light" />
        <NavigationContainer theme={CombinedDarkTheme}>
          <Stack.Navigator
            screenOptions={{
              tabBarShowLabel: false,
              headerStyle: { backgroundColor: GlobalStyles.colors.background },
              headerTintColor: GlobalStyles.colors.onBackground,
              tabBarStyle: {
                ...styles.tabBar,
                ...styles.shadow,
              },
              tabBarActiveTintColor: GlobalStyles.colors.secondary,
              headerShadowVisible: false,
            }}
          >
            <Stack.Group>
              <Stack.Screen
                name="Expenses Overview"
                component={ExpensesOverview}
                options={{ headerShown: false }}
              />
            </Stack.Group>
            <Stack.Group screenOptions={{ presentation: "modal" }}>
              <Stack.Screen name="ManageExpense" component={ManageExpense} />
            </Stack.Group>
          </Stack.Navigator>
        </NavigationContainer>
      </ExpensesContextProvider>
    </PaperProvider>
  );
}

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
  shadow: {
    shadowColor: "#121212",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
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
