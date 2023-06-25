import AppBody from "./AppBody";

import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

import { LightProvider } from "./store/light-context";
import { MonthProvider } from "./store/month-context";
import { BudgetItemProvider } from "./store/budgetItems-context";
import ExpensesContextProvider from "./store/expenses-context";

function App() {
  return (
    <LightProvider>
      <MonthProvider>
        <BudgetItemProvider>
          <ExpensesContextProvider>
            <BottomSheetModalProvider>
              <AppBody />
            </BottomSheetModalProvider>
          </ExpensesContextProvider>
        </BudgetItemProvider>
      </MonthProvider>
    </LightProvider>
  );
}

export default App;
