import { View, StyleSheet } from "react-native";

import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { GlobalStyles } from "../constants/styles";

import { useContext, useEffect, useState } from "react";
import { getDateMinusDays } from "../util/date";
import { ExpensesContext } from "../store/expenses-context";
import { fetchExpenses } from "../util/http";

function RecentExpenses() {
  const expensesCtx = useContext(ExpensesContext);

  useEffect(() => {
    async function getExpenses() {
      const expenses = await fetchExpenses();
      expensesCtx.setExpenses(expenses);
    }
    getExpenses();
  }, []);

  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return expense.date >= date7DaysAgo && expense.date <= today;
  });

  return (
    <View style={styles.container}>
      <ExpensesOutput
        expenses={recentExpenses}
        expensesPeriod="Last 7 Days"
        fallbackText="No expenses registed for the past 7 days"
      />
    </View>
  );
}

export default RecentExpenses;

const styles = StyleSheet.create({
  container: {
    backgroundColor: GlobalStyles.colors.base,
    flex: 1,
  },
});
