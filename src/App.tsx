import "./App.css";

import { Root } from "./root";

import { DarkModeProvider } from "./context/darkModeContext";
import useNetworkStatus from "./hooks/useNetworkStatus";

import Offline from "./pages/offline/offline";

function App() {
  const { isOnline } = useNetworkStatus();

  return (
    <DarkModeProvider>{isOnline ? <Root /> : <Offline />}</DarkModeProvider>
  );
}

export default App;
