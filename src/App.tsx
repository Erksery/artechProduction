import { useGetUserData } from "./hooks/useGetUserData";
import { AppRouter } from "./routes/AppRouter";
import { Toaster } from "sonner";

function App() {
  useGetUserData();

  return (
    <>
      <Toaster />

      <AppRouter />
    </>
  );
}

export default App;
