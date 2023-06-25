import { useContext, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Text, Divider } from "react-native-paper";

import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";

import MonthsNav from "./MonthNav/MonthsNav";

import { LightContext } from "../../store/light-context";
import { CombinedDarkTheme, CombinedLightTheme } from "../../constants/styles";

const ExpensesOutput = ({
  expenses,
  fallbackText,
  onScroll,
}) => {
  const { light } = useContext(LightContext);
  // const [loading, setLoading] = useState(false);

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
  // if (loading) {
  //   content = <LoadingOverlay />;
  // }

  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} />
      <MonthsNav />
      <View>
        <Divider bold/>
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
