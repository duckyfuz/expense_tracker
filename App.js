import AppBody from "./AppBody";
import { LightProvider } from "./store/light-context";
import ExpensesContextProvider from "./store/expenses-context";

function App() {
  return (
    <LightProvider>
      <ExpensesContextProvider>
        <AppBody />
      </ExpensesContextProvider>
    </LightProvider>
  );
}

export default App;
