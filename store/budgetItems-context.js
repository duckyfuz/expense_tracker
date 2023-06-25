import { createContext } from "react";

export const BudgetItemContext = createContext();

export const BudgetItemProvider = ({ children }) => {
  const budgetItems = [
    { title: "Food & Drinks", id: 1 },
    { title: "Entertainment", id: 2 },
    { title: "Bills & Fees", id: 3 },
    { title: "Transportation", id: 4 },
    { title: "Personal Wants", id: 5 },
    { title: "Others", id: 6 },
  ];

  return (
    <BudgetItemContext.Provider value={{ budgetItems }}>
      {children}
    </BudgetItemContext.Provider>
  );
};
