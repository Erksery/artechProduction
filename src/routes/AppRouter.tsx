import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home/Home";
import { ModalProvider } from "../hooks/useModal";

export const AppRouter = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ModalProvider>
            <Home />
          </ModalProvider>
        }
      />
    </Routes>
  );
};
