import AppBody from "./AppBody";
import { LightProvider } from "./store/light-context";

function App() {
  return (
    <LightProvider>
      <AppBody />
    </LightProvider>
  );
}

export default App;
