import { useModal } from "@hooks/modal/useModal";
import { useGetUserData } from "./hooks/useGetUserData";
import { AppRouter } from "./routes/AppRouter";
import { Toaster } from "sonner";
import { AnimatePresence } from "framer-motion";
import { modalRegistry } from "@hooks/modal/modalRegistry";

function App() {
  const { modal } = useModal();
  useGetUserData();
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
