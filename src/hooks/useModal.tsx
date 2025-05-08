import {
  createContext,
  useState,
  useContext,
  ReactNode,
  FC,
  useMemo,
} from "react";
import { modalRegistry } from "./modal/modalRegistry";
import { AnimatePresence } from "framer-motion";

interface ModalState {
  name: string | null;
  props?: any;
  key?: any;
}

interface ModalContextType {
  modal: ModalState;
  openModal: (modal: ModalState) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider: FC<ModalProviderProps> = ({ children }) => {
  const [modal, setModal] = useState<ModalState>({ name: null });

  const openModal = (modal: ModalState) => setModal(modal);
  const closeModal = () => setModal({ name: null });

  const value = useMemo(() => ({ modal, openModal, closeModal }), [modal]);

  const ModalComponent = modal.name ? modalRegistry[modal.name] : null;

  return (
    <ModalContext.Provider value={value}>
      {children}
      <AnimatePresence>
        {ModalComponent && <ModalComponent {...modal.props} />}
      </AnimatePresence>
    </ModalContext.Provider>
  );
};

export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
