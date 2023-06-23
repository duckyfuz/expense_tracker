import { useContext, useEffect, useState } from "react";
import { StyleSheet, Platform, SafeAreaView } from "react-native";
import { AnimatedFAB } from "react-native-paper";

import { useNavigation } from "@react-navigation/native";

import { fetchExpenses } from "../util/http";

import { ExpensesContext } from "../store/expenses-context";

import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import ManageExpense from "./ManageExpense";

const Expenses = ({ visible, animateFrom, style }) => {
  // Background work for the FAB
  const [isExtended, setIsExtended] = useState(true);
  const isIOS = Platform.OS === "ios";
  const onScroll = ({ nativeEvent }) => {
    const currentScrollPosition =
      Math.floor(nativeEvent?.contentOffset?.y) ?? 0;
    setIsExtended(currentScrollPosition <= 0);
  };
  const fabStyle = { [animateFrom]: 16 };

  // Creating states for loading and navigation & context for data
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const expensesCtx = useContext(ExpensesContext);
  const [month, setMonth] = useState(
    (Number(new Date().getMonth()) + 1).toString().padStart(2, "0")
  );
  const [year, setYear] = useState(new Date().getFullYear());

  function previousMonth() {
    if (month === "01") {
      setMonth("12");
      newYear = year - 1;
      setYear(newYear);
    } else {
      setMonth((Number(month) - 1).toString().padStart(2, "0"));
    }
  }
  function nextMonth() {
    if (month === "12") {
      setMonth("01");
      newYear = year + 1;
      setYear(newYear);
    } else {
      setMonth((Number(month) + 1).toString().padStart(2, "0"));
    }
  }

  // This part loads the data from firebase and adds it to context, displays loading if loading, error if error
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
  // Then, this portion filters the entires by month
  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    return (
      expense.date.toISOString().slice(5, 7) === month &&
      expense.date.toISOString().slice(0, 4) === year.toString()
    );
  });

  // Rendering...
  return (
    <SafeAreaView style={styles.container}>
      <ExpensesOutput
        expenses={recentExpenses}
        expensesPeriod="Last 7 Days"
        fallbackText="No expenses registed for the past 7 days"
        onScroll={onScroll}
        previousMonth={previousMonth}
        nextMonth={nextMonth}
        month={month}
        year={year}
      />
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

export default Expenses;

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
