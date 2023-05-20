import { useContext, useLayoutEffect } from "react";
import { View, Button, StyleSheet } from "react-native";
import { GlobalStyles } from "../constants/styles";
import CustButton from "../components/UI/CustButton";
import { ExpensesContext } from "../store/expenses-context";

const ManageExpense = ({ route, navigation }) => {
  const expensesCtx = useContext(ExpensesContext);

  const editedExpenseId = route.params?.expenseId; // the ? checks if expenseId exists, else return undefined
  const isEditing = !!editedExpenseId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  function deleteExpenseHandler() {
    expensesCtx.deleteExpense(editedExpenseId);
    navigation.goBack();
  }

  function cancelHandler() {
    navigation.goBack();
  }

  function confirmHandler() {
    if (isEditing) {
      expensesCtx.updateExpense(editedExpenseId, {
        description: "Test Update",
        amount: 28.99,
        date: new Date("2023-05-21"),
      });
    } else {
      expensesCtx.addExpense({
        description: "Test",
        amount: 19.99,
        date: new Date("2023-05-21"),
      });
    }
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <CustButton style={styles.button} mode="flat" onPress={cancelHandler}>
          Cancel
        </CustButton>
        <CustButton style={styles.button} onPress={confirmHandler}>
          {isEditing ? "Update" : "Add"}
        </CustButton>
      </View>
      {isEditing && (
        <View style={styles.deleteContainer}>
          <Button title={"Delete"} onPress={deleteExpenseHandler} />
        </View>
      )}
    </View>
  );
};

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: GlobalStyles.colors.base,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.error,
    alignItems: "center",
  },
});
