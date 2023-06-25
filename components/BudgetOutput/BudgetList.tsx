import React from "react";
import { Text } from "react-native-paper";

const BudgetList = ({ budgetType }: { budgetType: string }) => {
  return <Text>{budgetType}</Text>;
};

export default BudgetList;
