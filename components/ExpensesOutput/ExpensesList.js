import { View, FlatList, SafeAreaView } from "react-native";
import ExpenseItem from "./ExpenseItem";

function renderExpenseItem(itemData) {
  return <ExpenseItem {...itemData.item} />;
}

const ExpensesList = ({ expenses }) => {
  return (
    <SafeAreaView>
      <View style={{ marginTop: 6, flex: 1 }}>
        <FlatList
          scrollEnabled={false}
          data={expenses}
          renderItem={renderExpenseItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  );
};

export default ExpensesList;
