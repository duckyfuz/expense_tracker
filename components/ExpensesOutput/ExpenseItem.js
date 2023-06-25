import { Pressable, View, StyleSheet } from "react-native";
import { Card, Text, useTheme } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

import { Ionicons } from "@expo/vector-icons";

import { getFormattedDate } from "../../util/date";

const ExpenseItem = ({ id, description, amount, date, category }, props) => {
  const navigation = useNavigation();

  function expensePressHandler() {
    // Can try implementing a zoom out (for the background) when opening the modal
    navigation.navigate("ManageExpense", { expenseId: id });
  }

  const typeToIcon = {
    "Food & Drinks": "restaurant",
    Entertainment: "tv",
    "Bills & Fees": "card",
    Transportation: "bus",
    "Personal Wants": "rocket",
    Others: "server",
  };

  const TitleDate = () => {
    const formattedDate = getFormattedDate(date);
    const { colors } = useTheme();

    return (
      <View style={{ flexDirection: "row" }}>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginRight: 6,
          }}
        >
          <Ionicons
            name={typeToIcon[category]}
            size={28}
            color={colors.primary}
          />
        </View>
        <View>
          <Text variant="titleLarge">{description}</Text>
          <Text variant="labelMedium">{formattedDate}</Text>
        </View>
      </View>
    );
  };

  const AmountContainer = () => {
    return (
      <Card mode="outlined" style={styles.amountContainer}>
        <Text style={{ fontWeight: "bold" }}>${amount.toFixed(2)}</Text>
      </Card>
    );
  };

  return (
    <Pressable
      onPress={expensePressHandler}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <Card style={{ margin: 2 }}>
        <View style={styles.expenseItem}>
          <TitleDate />
          <AmountContainer />
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
    marginVertical: 6,
    marginHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  amountContainer: {
    alignItems: "center",
    justifyContent: "center",
    minWidth: 80,
    height: "100%",
  },
});
