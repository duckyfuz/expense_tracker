import { useState, useContext } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button } from "react-native-paper";
import DropDown from "react-native-paper-dropdown";

import { getFormattedDate } from "../../util/date";

import { LightContext } from "../../store/light-context";
import { BudgetItemContext } from "../../store/budgetItems-context";
import { CombinedDarkTheme, CombinedLightTheme } from "../../constants/styles";

const currentDate = new Date();

const ExpenseForm = ({
  submitButtonLabel,
  onCancel,
  onSubmit,
  defaultValues,
}) => {
  const { light } = useContext(LightContext);
  const { budgetItems } = useContext(BudgetItemContext);

  const [showDropDown, setShowDropDown] = useState(false);

  // Handling inputs
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
    category: {
      value: defaultValues ? defaultValues.category : "Others",
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

  // Handling submissions
  function submitHandler() {
    const expenseData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
      category: inputs.category.value,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== "Invalid Date";
    const descriptionIsValid = expenseData.description.trim().length > 0;
    const categoryIsValid = true;

    if (
      !amountIsValid ||
      !dateIsValid ||
      !descriptionIsValid ||
      !categoryIsValid
    ) {
      //   Alert.alert("Invalid input", "Please check your input values");
      setInputs((curInputs) => {
        return {
          amount: { value: curInputs.amount.value, isValid: amountIsValid },
          date: { value: curInputs.date.value, isValid: dateIsValid },
          description: {
            value: curInputs.description.value,
            isValid: descriptionIsValid,
          },
          category: {
            value: curInputs.category.value,
            isValid: categoryIsValid,
          },
        };
      });
      return;
    }

    onSubmit(expenseData);
  }

  return (
    <View style={{ margin: 8 }}>
      <View style={styles.inputsRows}>
        <TextInput
          style={styles.rowInput}
          mode="outlined"
          label="Amount"
          placeholder="How much?"
          invalid={!inputs.amount.isValid}
          error={!inputs.amount.isValid}
          onChangeText={inputChangedHandler.bind(this, "amount")}
          keyboardType="numeric"
          right={<TextInput.Affix text="SGD" />}
          value={inputs.amount.value}
        />
        <TextInput
          style={styles.rowInput}
          mode="outlined"
          label="Date"
          placeholder="YYYY-MM-DD"
          invalid={!inputs.date.isValid}
          error={!inputs.date.isValid}
          onChangeText={inputChangedHandler.bind(this, "date")}
          value={inputs.date.value}
        />
      </View>
      <View style={styles.inputsRows}>
        <TextInput
          style={[styles.rowInput]}
          mode="outlined"
          label="Description"
          placeholder="What did you spend on?"
          autoCorrect={false}
          autoCapitalize="none"
          invalid={!inputs.description.isValid}
          error={!inputs.description.isValid}
          onChangeText={inputChangedHandler.bind(this, "description")}
          value={inputs.description.value}
        />
      </View>
      <View style={[styles.inputsRows]}>
        <View style={[styles.rowInput, { maxWidth: 250 }]}>
          <DropDown
            label={"Category"}
            mode={"outlined"}
            dropDownContainerMaxHeight={120}
            visible={showDropDown}
            showDropDown={() => setShowDropDown(true)}
            onDismiss={() => setShowDropDown(false)}
            value={inputs.category.value}
            setValue={inputChangedHandler.bind(this, "category")}
            list={budgetItems}
          />
        </View>
      </View>
      <View style={styles.buttons}>
        <Button mode="elevated" style={styles.button} onPress={onCancel}>
          Cancel
        </Button>
        <Button
          mode="elevated"
          style={[styles.button]}
          buttonColor={
            light
              ? CombinedLightTheme.colors.primary
              : CombinedDarkTheme.colors.primary
          }
          textColor={
            light
              ? CombinedLightTheme.colors.onPrimary
              : CombinedDarkTheme.colors.onPrimary
          }
          onPress={submitHandler}
        >
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
};

export default ExpenseForm;

const styles = StyleSheet.create({
  inputsRows: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  rowInput: {
    flex: 1,
    margin: 6,
    marginBottom: 6,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: -6,
  },
});
