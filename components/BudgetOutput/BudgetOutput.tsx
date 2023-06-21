import { View, ScrollView, StyleSheet } from "react-native";
import { Card } from "react-native-paper";

import BudgetSummary from "./BudgetSummary";

const BudgetOutput = () => {
  let content = false;
  return (
    <View style={styles.container}>
      <BudgetSummary />
      <ScrollView>{content}</ScrollView>
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
