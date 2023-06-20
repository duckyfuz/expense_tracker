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
            <Text style={[styles.textBase, styles.description]}>
              {description}
            </Text>
            <Text style={styles.textBase}>{getFormattedDate(date)}</Text>
          </View>
          <Card mode="outlined" style={styles.amountContainer}>
            {/* <View style={styles.amountContainer}> */}
            <Text style={styles.amount}>${amount.toFixed(2)}</Text>
            {/* </View> */}
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
    // marginVertical: 8,
    // backgroundColor: GlobalStyles.colors.card,
    flexDirection: "row",
    justifyContent: "space-between",
    // borderRadius: 6,
    // elevation: 3,
    // shadowColor: "grey",
    // shadowRadius: 4,
    // shadowOffset: { width: 1, height: 1 },
    // shadowOpacity: 0.4,
  },
  textBase: {
    color: GlobalStyles.colors.onBackground,
  },
  description: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "bold",
  },
  amountContainer: {
    // paddingHorizontal: 12,
    // paddingVertical: 4,
    // backgroundColor: GlobalStyles.colors.secondary,
    // justifyContent: "center",
    alignItems: "center",
    justifyContent: "center",
    // borderRadius: 4,
    minWidth: 80,
    height: "100%",
  },
  amount: {
    // color: GlobalStyles.colors.onBackground,
    fontWeight: "bold",
  },
});
