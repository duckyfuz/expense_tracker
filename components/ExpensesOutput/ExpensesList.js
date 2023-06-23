import { FlatList } from "react-native";
import { Card } from "react-native-paper";

import ExpenseItem from "./ExpenseItem";

function renderExpenseItem(itemData) {
  return <ExpenseItem {...itemData.item} />;
}

const ExpensesList = ({ expenses }) => {
  return (
    <>
      <FlatList
        scrollEnabled={false}
        data={expenses}
        renderItem={renderExpenseItem}
        keyExtractor={(item) => item.id}
        style={{ flex: 1, marginTop: 6, marginBottom: 75 }}
      />
    </>
  );
};

export default ExpensesList;
