import { View, StyleSheet } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { GlobalStyles } from "../constants/styles";

function RecentExpenses() {
  return (
    <View style={styles.container}>
      <ExpensesOutput expensesPeriod={"Last 7 Days"} />
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
