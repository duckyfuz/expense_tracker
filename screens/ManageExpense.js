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
import { Button, Card, Divider } from "react-native-paper";

import { CombinedDarkTheme, CombinedLightTheme } from "../App";

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
        <View>
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
                      outputRange: [height, height * 0.55],
                      extrapolate: "clamp",
                    }),
                  },
                ],
              },
              { width: "100%" },
            ]}
          >
            <Card style={{ height: "100%" }}>
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
                    style={{ margin: 20 }}
                  />
                  <View style={{ alignItems: "center" }}>
                    <Button
                      onPress={deleteExpenseHandler}
                      mode="elevated"
                      buttonColor={CombinedDarkTheme.colors.errorContainer}
                      textColor={CombinedDarkTheme.colors.error}
                    >
                      Delete
                    </Button>
                  </View>
                </View>
              )}
            </Card>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default ManageExpense;

const styles = StyleSheet.create({
  button: {
    minWidth: 120,
    marginHorizontal: 8,
    marginVertical: 12,
  },
});
