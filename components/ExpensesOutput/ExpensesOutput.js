import { useContext } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Text, Divider } from "react-native-paper";

import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";

import MonthsNav from "./MonthsNav";

import { LightContext } from "../../store/light-context";

import { CombinedDarkTheme, CombinedLightTheme } from "../../constants/styles";

const ExpensesOutput = ({
  expenses,
  expensesPeriod,
  fallbackText,
  onScroll,
  previousMonth,
  nextMonth,
  month,
}) => {
  const { light } = useContext(LightContext);

  // Set content to fallback text if there are no expenses recorded
  let content = (
    <Text
      variant="titleMedium"
      style={[
        styles.infoText,
        {
          color: light
            ? CombinedLightTheme.colors.error
            : CombinedDarkTheme.colors.error,
        },
      ]}
    >
      {fallbackText}
    </Text>
  );
  if (expenses.length > 0) {
    content = <ExpensesList expenses={expenses} />;
  }

  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
      <MonthsNav
        previousMonth={previousMonth}
        nextMonth={nextMonth}
        month={month}
      />
      <View>
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
    flex: 1,
    paddingHorizontal: 8,
  },
  infoText: {
    textAlign: "center",
    marginTop: 10,
  },
});
