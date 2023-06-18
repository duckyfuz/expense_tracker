import { useContext, useEffect, useState } from "react";
import { StyleSheet, Platform, ScrollView, SafeAreaView } from "react-native";
import { AnimatedFAB } from "react-native-paper";

import { useNavigation } from "@react-navigation/native";

import { getDateMinusDays } from "../util/date";
import { fetchExpenses } from "../util/http";

import { ExpensesContext } from "../store/expenses-context";

import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import ManageExpense from "./ManageExpense";

const RecentExpenses = ({ visible, animateFrom, style }) => {
  // Background work for the FAB
  const [isExtended, setIsExtended] = useState(true);

  const isIOS = Platform.OS === "ios";

  const onScroll = ({ nativeEvent }) => {
    const currentScrollPosition =
      Math.floor(nativeEvent?.contentOffset?.y) ?? 0;

    setIsExtended(currentScrollPosition <= 0);
  };

  const fabStyle = { [animateFrom]: 16 };

  // Calculations n stuff
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  const expensesCtx = useContext(ExpensesContext);

  useEffect(() => {
    async function getExpenses() {
      setIsLoading(true);
      try {
        const expenses = await fetchExpenses();
        expensesCtx.setExpenses(expenses);
      } catch (error) {
        setError("Could not fetch expenses!");
      }
      setIsLoading(false);
    }
    getExpenses();
  }, []);

  function errorHander() {
    setError(null);
  }

  if (error && !isLoading) {
    return <ErrorOverlay message={error} onConfirm={errorHander} />;
  }

  if (isLoading) {
    return <LoadingOverlay />;
  }

  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return expense.date >= date7DaysAgo && expense.date <= today;
  });

  // Rendering...
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView onScroll={onScroll}>
        {[...new Array(1).keys()].map((_, i) => (
          <ExpensesOutput
            expenses={recentExpenses}
            expensesPeriod="Last 7 Days"
            fallbackText="No expenses registed for the past 7 days"
          />
        ))}
      </ScrollView>
      <AnimatedFAB
        icon={"cash-register"}
        label={"New Expense  "}
        uppercase={false}
        extended={isExtended}
        onPress={() => navigation.navigate(ManageExpense)}
        onLongPress={() => console.log("Long Pressed")}
        visible={visible}
        animateFrom={"right"}
        iconMode={"static"}
        style={[styles.fabStyle, style, fabStyle]}
      />
    </SafeAreaView>
  );
};

export default RecentExpenses;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  fabStyle: {
    bottom: 16,
    right: 16,
    position: "absolute",
  },
});
