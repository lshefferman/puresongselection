import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routes/AppRouter";
import { SystemStateProvider } from "./context/SystemStateContext";

function App() {
  return (
    <div className="App">
      <SystemStateProvider>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </SystemStateProvider>
    </div>
  );
}

export default App;
