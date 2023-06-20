import { View, StyleSheet } from "react-native";
import Input from "./Input";
import { GlobalStyles } from "../../constants/styles";
import { useState } from "react";
import CustButton from "../UI/CustButton";
import { getFormattedDate } from "../../util/date";

import { TextInput, Text, Button } from "react-native-paper";

const ExpenseForm = ({
  submitButtonLabel,
  onCancel,
  onSubmit,
  defaultValues,
}) => {
  const currentDate = new Date();

  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : "",
      isValid: true,
    },
    date: {
      value: defaultValues
        ? getFormattedDate(defaultValues.date)
        : getFormattedDate(currentDate),
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description : "",
      isValid: true,
    },
  });

  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputs((curInputs) => {
      return {
        ...curInputs,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }

  function submitHandler() {
    const expenseData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== "Invalid Date";
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      //   Alert.alert("Invalid input", "Please check your input values");
      setInputs((curInputs) => {
        return {
          amount: { value: curInputs.amount.value, isValid: amountIsValid },
          date: { value: curInputs.date.value, isValid: dateIsValid },
          description: {
            value: curInputs.description.value,
            isValid: descriptionIsValid,
          },
        };
      });
      return;
    }

    onSubmit(expenseData);
  }

  const formIsInvalid =
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid;

  return (
    <View style={styles.form}>
      <View style={styles.inputsRows}>
        <TextInput
          style={styles.rowInput}
          mode="outlined"
          label="Amount"
          placeholder="How much?"
          invalid={!inputs.amount.isValid}
          onChangeText={inputChangedHandler.bind(this, "amount")}
          value={inputs.amount.value}
        />
        <TextInput
          style={styles.rowInput}
          mode="outlined"
          label="Date"
          placeholder="YYYY-MM-DD"
          invalid={!inputs.date.isValid}
          onChangeText={inputChangedHandler.bind(this, "date")}
          value={inputs.date.value}
        />
      </View>
      <View style={styles.inputsRows}>
        <TextInput
          style={styles.rowInput}
          mode="outlined"
          label="Description"
          placeholder="What did you spend on?"
          autoCorrect={false}
          autoCapitalize="none"
          invalid={!inputs.description.isValid}
          onChangeText={inputChangedHandler.bind(this, "description")}
          value={inputs.description.value}
        />
      </View>
      {formIsInvalid && (
        <Text style={styles.errorText}>
          Invalid input values! Please check your entered data
        </Text>
      )}
      <View style={styles.buttons}>
        <Button mode="elevated" style={styles.button} onPress={onCancel}>
          Cancel
        </Button>
        <Button mode="contained" style={styles.button} onPress={submitHandler}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
};

export default ExpenseForm;

const styles = StyleSheet.create({
  form: { marginTop: 20 },
  inputsRows: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  rowInput: { flex: 1, margin: 5 },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: GlobalStyles.colors.onBackground,
    marginVertical: 24,
    textAlign: "center",
  },
  errorText: {
    textAlign: "center",
    marginTop: 15,
    color: GlobalStyles.colors.error,
    marginBottom: 10,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    marginHorizontal: 16,
    marginTop: 10,
  },
});
