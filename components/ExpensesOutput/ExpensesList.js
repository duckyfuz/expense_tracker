import { View, Text, FlatList } from "react-native";
import ExpenseItem from "./ExpenseItem";

function renderExpenseItem(itemData) {
  return <ExpenseItem {...itemData.item} />;
}

const ExpensesList = ({ expenses }) => {
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={expenses}
        renderItem={renderExpenseItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default ExpensesList;
