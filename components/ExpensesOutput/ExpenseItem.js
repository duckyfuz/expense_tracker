import { Pressable, View, StyleSheet } from "react-native";
import { Card, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

import { GlobalStyles } from "../../constants/styles";
import { getFormattedDate } from "../../util/date";

const ExpenseItem = ({ id, description, amount, date }) => {
  const navigation = useNavigation();

  function expensePressHandler() {
    navigation.navigate("ManageExpense", { expenseId: id });
  }

  return (
    <Pressable
      onPress={expensePressHandler}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <Card style={{ marginVertical: 2 }}>
        <View style={styles.expenseItem}>
          <View>
            <Text variant="titleLarge">{description}</Text>
            <Text variant="labelMedium">{getFormattedDate(date)}</Text>
          </View>
          <Card mode="outlined" style={styles.amountContainer}>
            <Text style={styles.amount}>${amount.toFixed(2)}</Text>
          </Card>
        </View>
      </Card>
    </Pressable>
  );
};

export default ExpenseItem;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },
  expenseItem: {
    padding: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 5,
  },
  amountContainer: {
    alignItems: "center",
    justifyContent: "center",
    minWidth: 80,
    height: "100%",
  },
  amount: {
    fontWeight: "bold",
  },
});
