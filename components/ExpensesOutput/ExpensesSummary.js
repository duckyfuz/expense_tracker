import { StyleSheet } from "react-native";
import { Divider, Text, Card } from "react-native-paper";

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
      <Divider style={{ marginVertical: 6 }} horizontalInset={true} />
      <Card.Content style={styles.container}>
        <Text variant="titleMedium" style={{ fontWeight: "bold" }}>
          Total Budget:
        </Text>
        <Text variant="titleMedium" style={{ fontWeight: "bold" }}>
          $10
        </Text>
      </Card.Content>
      <Card.Content style={styles.container}>
        <Text variant="titleMedium" style={{ fontWeight: "bold" }}>
          Net Balance:
        </Text>
        <Text variant="titleMedium" style={{ fontWeight: "bold" }}>
          $10
        </Text>
      </Card.Content>
    </Card>
  );
};

export default ExpensesSummary;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
