import "./App.css";

import { Root } from "./root";

import useNetworkStatus from "./hooks/useNetworkStatus";

import Offline from "./pages/offline/offline";
import { ThemeProvider } from "./components/theme/theme-provider";

function App() {
  const { isOnline } = useNetworkStatus();

  return <ThemeProvider>{isOnline ? <Root /> : <Offline />}</ThemeProvider>;
}

export default App;
