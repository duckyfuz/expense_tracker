import { createContext } from "react";

export const BudgetItemContext = createContext();

export const BudgetItemProvider = ({ children }) => {
  const budgetItems = [
    { label: "Food & Drinks", value: "Food & Drinks", id: 1 },
    { label: "Entertainment", value: "Entertainment", id: 2 },
    { label: "Bills & Fees", value: "Bills & Fees", id: 3 },
    { label: "Transportation", value: "Transportation", id: 4 },
    { label: "Personal Wants", value: "Personal Wants", id: 5 },
    { label: "Others", value: "Others", id: 6 },
  ];

  return (
    <BudgetItemContext.Provider value={{ budgetItems }}>
      {children}
    </BudgetItemContext.Provider>
  );
};
