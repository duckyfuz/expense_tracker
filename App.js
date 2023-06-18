import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { GlobalStyles } from "./constants/styles";

import AllExpenses from "./screens/AllExpenses";
import ManageExpense from "./screens/ManageExpense";
import RecentExpenses from "./screens/RecentExpenses";
import ExpensesContextProvider from "./store/expenses-context";

import * as Notifications from "expo-notifications";
import IconButton from "./components/UI/IconButton";

import {
  MD3DarkTheme as DefaultTheme,
  MD3LightTheme as LightTheme,
  PaperProvider,
} from "react-native-paper";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "tomato",
    secondary: "yellow",
  },
};

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function NullComponent() {
  <Text>This should never show up</Text>;
}

const ExpensesOverview = () => {
  return (
    <Tab.Navigator
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
      <Tab.Screen
        name="RecentExpenses"
        component={RecentExpenses}
        options={{
          headerRight: () => (
            <IconButton
              icon="save"
              size={24}
              color={GlobalStyles.colors.secondary}
              onPress={scheduleNotificationHandler}
              additionalStyle={{ marginRight: 12 }}
            />
          ),
          title: "Recent Expenses",
          tabBarLabel: "Recent",
          tabBarIcon: ({ color, size }) => (
            <View style={styles.tabBarIcon}>
              <Ionicons name="hourglass" size={size} color={color} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Add"
        component={NullComponent}
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <View style={styles.tabBarIconCenter}>
              <Ionicons
                name="add-circle"
                size={100}
                color={GlobalStyles.colors.primaryVariant}
              />
            </View>
          ),
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate("ManageExpense");
          },
        })}
      />
      <Tab.Screen
        name="AllExpenses"
        component={AllExpenses}
        options={{
          title: "All Expenses",
          tabBarLabel: "All Expenses",
          tabBarIcon: ({ color, size }) => (
            <View style={[styles.tabBarIcon, styles.shadow]}>
              <Ionicons name="calendar" size={size} color={color} />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <ExpensesContextProvider>
        <StatusBar style="light" />
        <NavigationContainer>
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
