import { FlatList, View } from "react-native";
import BudgetItem from "./BudgetItem";

const BudgetList = ({ expenses }) => {
  function renderExpenseItem(itemData) {
    return <BudgetItem itemData={itemData} />;
  }

  return (
    <FlatList
      scrollEnabled={false}
      data={expenses}
      renderItem={renderExpenseItem}
      keyExtractor={(item) => item.id}
      style={{ flex: 1, marginTop: 6, marginBottom: 75 }}
    />
  );
};

export default BudgetList;
