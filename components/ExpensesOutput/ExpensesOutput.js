import { View, StyleSheet } from "react-native";

import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";

const DUMMY_EXPENSES = [
  {
    id: "e1",
    description: "shoes",
    amount: 431.21,
    date: new Date("2023-05-12"),
  },
  {
    id: "e2",
    description: "macbook",
    amount: 1920,
    date: new Date("2023-05-12"),
  },
  {
    id: "e3",
    description: "bananas",
    amount: 5.1,
    date: new Date("2023-05-12"),
  },
  {
    id: "e4",
    description: "apple watch",
    amount: 419.21,
    date: new Date("2023-05-12"),
  },
];

const ExpensesOutput = ({ expenses, expensesPeriod }) => {
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={DUMMY_EXPENSES} periodName={expensesPeriod} />
      <ExpensesList expenses={DUMMY_EXPENSES} />
    </View>
  );
};

export default ExpensesOutput;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    flex: 1,
  },
});
