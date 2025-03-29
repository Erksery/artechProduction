import { useGetUserData } from "./hooks/useGetUserData";
import { AppRouter } from "./routes/AppRouter";

function App() {
  useGetUserData();

  return <AppRouter />;
}

export default App;
