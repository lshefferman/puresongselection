import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routes/AppRouter";
import { SystemStateProvider } from "./context/SystemStateContext";
import { UserContextProvider } from "./context/UserContext";
import { SongsContextProvider } from "./context/SongsContext";

function App() {
  return (
    <div className="App">
      <SongsContextProvider>
        <UserContextProvider>
          <SystemStateProvider>
            <BrowserRouter>
              <AppRouter />
            </BrowserRouter>
          </SystemStateProvider>
        </UserContextProvider>
      </SongsContextProvider>
    </div>
  );
}

export default App;
