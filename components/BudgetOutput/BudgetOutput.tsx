import { useState } from "react";
import { View, StyleSheet } from "react-native";

import BudgetSummary from "./BudgetSummary";
import BudgetList from "./BudgetList";

const BudgetOutput = () => {
  const [type, setType] = useState("Food & Drinks")

  return (
    <View style={styles.container}>
      <BudgetSummary />
      <BudgetList budgetType={type}/>
    </View>
  );
};

export default BudgetOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 8,
  },
});
