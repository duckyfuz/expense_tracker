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
import { Button, Card, Divider } from "react-native-paper";

import { ExpensesContext } from "../store/expenses-context";
import { LightContext } from "../store/light-context";

import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { deleteExpense, storeExpense, updateExpense } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import { useCardAnimation } from "@react-navigation/stack";

import { CombinedDarkTheme, CombinedLightTheme } from "../constants/styles";

const ManageExpense = ({ route, navigation }) => {
  const { height } = useWindowDimensions();
  const { current } = useCardAnimation();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState();

  const expensesCtx = useContext(ExpensesContext);
  const lightCtx = useContext(LightContext);

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
      await deleteExpense(editedExpenseId);
      expensesCtx.deleteExpense(editedExpenseId);
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

  const { light } = useContext(LightContext);

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
                      outputRange: [height, height * 0.4],
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
                      buttonColor={
                        light
                          ? CombinedLightTheme.colors.errorContainer
                          : CombinedDarkTheme.colors.errorContainer
                      }
                      textColor={
                        light
                          ? CombinedLightTheme.colors.error
                          : CombinedDarkTheme.colors.error
                      }
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
