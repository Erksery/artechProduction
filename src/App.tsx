import { Toaster } from "sonner";
import { AnimatePresence } from "framer-motion";
import { useModal } from "@hooks/modal/useModal";
import { modalRegistry } from "@hooks/modal/modalRegistry";
import { useTheme } from "@hooks/useTheme";
import { useGetUserData } from "./hooks/useGetUserData";

import { AppRouter } from "./routes/AppRouter";

function App() {
  const { modal } = useModal();

  useGetUserData();
  useTheme();

  const ModalComponent = modal ? modalRegistry[modal.key] : null;
  return (
    <>
      <Toaster />
      <AppRouter />

      <AnimatePresence>
        {ModalComponent && <ModalComponent {...modal?.props} />}
      </AnimatePresence>
    </>
  );
}

export default App;
