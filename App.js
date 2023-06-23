import AppBody from "./AppBody";
import { LightProvider } from "./store/light-context";
import { MonthProvider } from "./store/month-context";
import ExpensesContextProvider from "./store/expenses-context";

function App() {
  return (
    <LightProvider>
      <MonthProvider>
        <ExpensesContextProvider>
          <AppBody />
        </ExpensesContextProvider>
      </MonthProvider>
    </LightProvider>
  );
}

export default App;
