import { useContext } from "react";

import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { View, StyleSheet } from "react-native";
import { GlobalStyles } from "../constants/styles";

const AllExpenses = () => {
  const expensesCtx = useContext(ExpensesContext);

  return (
    <View style={styles.container}>
      <ExpensesOutput
        expenses={expensesCtx.expenses}
        expensesPeriod="Total"
        fallbackText="No expenses registed at all!"
      />
    </View>
  );
};

export default AllExpenses;

const styles = StyleSheet.create({
  container: {
    backgroundColor: GlobalStyles.colors.base,
    flex: 1,
  },
});
