import { Text, View, StyleSheet, ScrollView } from "react-native";

import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { GlobalStyles } from "../../constants/styles";
import { Divider } from "react-native-paper";

const ExpensesOutput = ({
  expenses,
  expensesPeriod,
  fallbackText,
  onScroll,
}) => {
  let content = <Text style={styles.infoText}>{fallbackText}</Text>;

  if (expenses.length > 0) {
    content = <ExpensesList expenses={expenses} />;
  }

  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
      <View style={{ marginTop: 6 }}>
        <Divider bold={true} />
      </View>
      <ScrollView onScroll={onScroll} scrollEventThrottle={16}>
        {content}
      </ScrollView>
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
  infoText: {
    color: GlobalStyles.colors.onBackground,
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
  },
});
