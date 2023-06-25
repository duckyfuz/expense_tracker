import AppBody from "./AppBody";

import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

import { LightProvider } from "./store/light-context";
import { MonthProvider } from "./store/month-context";
import ExpensesContextProvider from "./store/expenses-context";

function App() {
  return (
    <LightProvider>
      <MonthProvider>
        <ExpensesContextProvider>
          <BottomSheetModalProvider>
            <AppBody />
          </BottomSheetModalProvider>
        </ExpensesContextProvider>
      </MonthProvider>
    </LightProvider>
  );
}

export default App;
