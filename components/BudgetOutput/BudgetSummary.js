import { useContext, useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Card, Text, Divider, useTheme } from "react-native-paper";

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

const BudgetSummary = ({ budgetType, expenses, setType }, props) => {
  const { colors } = useTheme();
  const { budgetItems } = useContext(BudgetItemContext);
  const expensesSum = expenses.reduce((sum, expense) => {
    return sum + expense.amount;
  }, 0);

  const renderBudgetTitle = (itemData) => {
    return (
      <TouchableOpacity>
        <Card
          style={{
            margin: 6,
            paddingHorizontal: 12,
            paddingVertical: 6,
            backgroundColor:
              budgetType === itemData.item.label
                ? colors.primaryContainer
                : colors.elevation,
          }}
          onPress={() => setType(itemData.item.label)}
        >
          <View style={[styles.monthContainer]}>
            <Text
              variant="titleMedium"
              style={{
                fontWeight: "bold",
                color:
                  budgetType === itemData.item.label
                    ? colors.onPrimaryContainer
                    : colors.onBackground,
              }}
            >
              {itemData.item.label}
            </Text>
          </View>
        </Card>
      </TouchableOpacity>
    );
  };

  const BudgetTitles = () => {
    return (
      <View style={[styles.container]}>
        <FlatList
          horizontal
          data={budgetItems}
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
          {budgetType}
          {" - "}
          {monthList[Number(new Date().toISOString().slice(5, 7))]}
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
