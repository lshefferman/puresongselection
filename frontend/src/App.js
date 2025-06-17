import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routes/AppRouter";
import { SystemStateProvider } from "./context/SystemStateContext";
import { UserContextProvider } from "./context/UserContext";
import { SongsContextProvider } from "./context/SongsContext";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <SongsContextProvider>
          <UserContextProvider>
            <SystemStateProvider>
              <BrowserRouter>
                <AppRouter />
              </BrowserRouter>
            </SystemStateProvider>
          </UserContextProvider>
        </SongsContextProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
