import { useContext } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Card, Text, Divider } from "react-native-paper";

import { BudgetItemContext } from "../../store/budgetItems-context";

const BudgetSummary = () => {
  const { budgetItems } = useContext(BudgetItemContext);

  const renderBudgetTitle = (itemData) => {
    return (
      <Card style={{ margin: 6, paddingHorizontal: 12, paddingVertical: 6 }}>
        <View style={styles.monthContainer}>
          <Text variant="titleMedium" style={{ fontWeight: "bold" }}>
            {itemData.item.title}
          </Text>
        </View>
      </Card>
    );
  };

  const BudgetTitles = () => {
    return (
      <View style={[styles.container]}>
        <FlatList
          style={{ width: "100%" }}
          horizontal
          data={budgetItems}
          numColumns={1}
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
          Current Budget
        </Text>
        <Text variant="titleLarge" style={{ fontWeight: "bold" }}>
          $1
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
