import { View, Text, StyleSheet, Pressable } from "react-native";
import { StatusBar } from "expo-status-bar";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { GlobalStyles } from "./constants/styles";

import AllExpenses from "./screens/AllExpenses";
import ManageExpense from "./screens/ManageExpense";
import RecentExpenses from "./screens/RecentExpenses";
import AddExpense from "./screens/AddExpense";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function NullComponent() {
  <Text>This should never show up</Text>;
}

function ExpensesOverview() {
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
            navigation.navigate("AddExpense");
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
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator options={{ headerShadowVisible: false }}>
          <Stack.Group>
            <Stack.Screen
              name="Expenses Overview"
              component={ExpensesOverview}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="ManageExpense" component={ManageExpense} />
          </Stack.Group>
          <Stack.Group screenOptions={{ presentation: "modal" }}>
            <Stack.Screen
              name="AddExpense"
              component={AddExpense}
              options={{ title: "Add new Entry" }}
            />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    </>
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
