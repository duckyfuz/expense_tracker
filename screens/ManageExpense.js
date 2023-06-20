import { useContext, useLayoutEffect, useState } from "react";
import {
  Pressable,
  Animated,
  View,
  StyleSheet,
  useWindowDimensions,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { deleteExpense, storeExpense, updateExpense } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import { useCardAnimation } from "@react-navigation/stack";
import { Button, Divider } from "react-native-paper";

const ManageExpense = ({ route, navigation }) => {
  const { height } = useWindowDimensions();
  const { current } = useCardAnimation();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState();

  const expensesCtx = useContext(ExpensesContext);

  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  const selectedExpense = expensesCtx.expenses.find(
    (expense) => expense.id === editedExpenseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "New Expense",
    });
  }, [navigation, isEditing]);

  async function deleteExpenseHandler() {
    setIsSubmitting(true);
    try {
      console.log("Attempting Delete");
      await deleteExpense(editedExpenseId);
      expensesCtx.deleteExpense(editedExpenseId);
      console.log("Delete Successful");
      navigation.goBack();
    } catch (error) {
      console.log(error);
      setError("Could not delete expense - please try again later.");
    }
    setIsSubmitting(false);
  }

  function cancelHandler() {
    navigation.goBack();
  }

  async function confirmHandler(expenseData) {
    setIsSubmitting(true);
    try {
      if (isEditing) {
        expensesCtx.updateExpense(editedExpenseId, expenseData);
        await updateExpense(editedExpenseId, expenseData);
      } else {
        const id = await storeExpense(expenseData);
        expensesCtx.addExpense({ ...expenseData, id: id });
      }
      navigation.goBack();
    } catch (error) {
      setError("Could not save data - please try again later");
      setIsSubmitting(false);
    }
  }

  function errorHander() {
    setError(null);
  }

  if (error && !isSubmitting) {
    return <ErrorOverlay message={error} onConfirm={errorHander} />;
  }

  if (isSubmitting) {
    <LoadingOverlay />;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Pressable
            style={[
              StyleSheet.absoluteFill,
              { backgroundColor: "rgba(0, 0, 0, 0.5)" },
            ]}
            onPress={navigation.goBack}
          />

          <Animated.View
            style={[
              {
                height: height,
                transform: [
                  {
                    translateY: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [height, height * 0.5],
                      extrapolate: "clamp",
                    }),
                  },
                ],
              },
              styles.viewAnimated,
            ]}
          >
            <View style={[styles.container]}>
              <ExpenseForm
                submitButtonLabel={isEditing ? "Update" : "Add"}
                onCancel={cancelHandler}
                onSubmit={confirmHandler}
                defaultValues={selectedExpense}
              />

              {isEditing && (
                <View>
                  <Divider
                    horizontalInset={true}
                    bold={true}
                    style={{ marginTop: 20 }}
                  />
                  <View style={styles.deleteContainer}>
                    <Button
                      onPress={deleteExpenseHandler}
                      mode="contained"
                      buttonColor="#a81616"
                    >
                      Delete
                    </Button>
                  </View>
                </View>
              )}
            </View>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: "teal",
    borderRadius: 20,
  },
  deleteContainer: {
    marginTop: 6,
    paddingTop: 8,
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
    marginVertical: 12,
  },
  viewAnimated: {
    width: "100%",
  },
  viewContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: "#E5E5E5",
    borderRadius: 20,
  },
});
