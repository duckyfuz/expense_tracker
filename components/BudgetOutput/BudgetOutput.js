import { useState, useContext } from "react";
import { View, StyleSheet } from "react-native";
import { Divider } from "react-native-paper";

import { ExpensesContext } from "../../store/expenses-context";

import BudgetSummary from "./BudgetSummary";
import BudgetList from "./BudgetList";

const BudgetOutput = () => {
  const expensesCtx = useContext(ExpensesContext);
  const [type, setType] = useState("Food & Drinks");

  const typedExpense = expensesCtx.expenses.filter((expense) => {
    return expense.category === type;
  });
  const sortedExpenses = typedExpense.sort((a, b) => {
    return (
      b.date.toISOString().slice(8, 10) - a.date.toISOString().slice(8, 10)
    );
  });

  return (
    <View style={styles.container}>
      <BudgetSummary budgetType={type} expenses={sortedExpenses} />
      <Divider bold style={{ marginTop: 6 }} />
      <BudgetList expenses={sortedExpenses} />
    </View>
  );
};

export default BudgetOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 8,
  },
});
