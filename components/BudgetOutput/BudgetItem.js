import ExpenseItem from "../ExpensesOutput/ExpenseItem";

function BudgetItem({ itemData }) {
  return <ExpenseItem {...itemData.item} />;
}

export default BudgetItem;
