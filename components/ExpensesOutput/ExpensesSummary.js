import { View, StyleSheet } from "react-native";
import { Divider, Text, Card } from "react-native-paper";
import { GlobalStyles } from "../../constants/styles";

const ExpensesSummary = ({ expenses, periodName }) => {
  const expensesSum = expenses.reduce((sum, expense) => {
    return sum + expense.amount;
  }, 0);

  return (
    <Card>
      <Card.Content style={styles.container}>
        <Text variant="titleLarge" style={{ fontWeight: "bold" }}>
          {periodName}
        </Text>
        <Text variant="titleLarge" style={{ fontWeight: "bold" }}>
          ${expensesSum.toFixed(2)}
        </Text>
      </Card.Content>
      <Divider style={{ margin: 6 }} />
      <Card.Content style={styles.container}>
        <Text variant="titleMedium" style={{ fontWeight: "bold" }}>
          Budget
        </Text>
        <Text variant="titleMedium" style={{ fontWeight: "bold" }}>
          ${expensesSum.toFixed(2)}
        </Text>
      </Card.Content>
    </Card>
  );
};

export default ExpensesSummary;

const styles = StyleSheet.create({
  container: {
    // padding: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // marginVertical: 6,
    // borderBottomLeftRadius: 6,
    // borderBottomRightRadius: 6,
    // borderRadius: 6,
  },
  // period: {
  //   fontSize: 16,
  //   fontWeight: "bold",
  //   color: GlobalStyles.colors.onBackground,
  // },
  // sum: {
  //   fontSize: 16,
  //   fontWeight: "bold",
  //   color: GlobalStyles.colors.onBackground,
  // },
});
