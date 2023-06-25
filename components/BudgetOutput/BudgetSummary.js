import { useContext } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Card, Text, Divider } from "react-native-paper";

import { BudgetItemContext } from "../../store/budgetItems-context";

const monthList = [
  "January",
  "Febuary",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const BudgetSummary = ({ budgetType, expenses }) => {
  const { budgetItems } = useContext(BudgetItemContext);
  const expensesSum = expenses.reduce((sum, expense) => {
    return sum + expense.amount;
  }, 0);

  const renderBudgetTitle = (itemData) => {
    return (
      <Card style={{ margin: 6, paddingHorizontal: 12, paddingVertical: 6 }}>
        <View style={styles.monthContainer}>
          <Text variant="titleMedium" style={{ fontWeight: "bold" }}>
            {itemData.item.label}
          </Text>
        </View>
      </Card>
    );
  };

  const BudgetTitles = () => {
    return (
      <View style={[styles.container]}>
        <FlatList
          style={{ width: "100%" }}
          horizontal
          data={budgetItems}
          numColumns={1}
          renderItem={renderBudgetTitle}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
  };

  return (
    <Card style={{ overflow: true }}>
      <Card.Content style={styles.container}>
        <Text variant="titleLarge" style={{ fontWeight: "bold" }}>
          {monthList[Number(new Date().toISOString().slice(5, 7))]}
          {" - "}
          {new Date().toISOString().slice(0, 4)}
        </Text>
        <Text variant="titleLarge" style={{ fontWeight: "bold" }}>
          ${expensesSum.toFixed(2)}
        </Text>
      </Card.Content>
      <Divider style={{ marginVertical: 6 }} horizontalInset={true} />
      <BudgetTitles />
    </Card>
  );
};

export default BudgetSummary;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  monthContainer: {
    minWidth: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});
