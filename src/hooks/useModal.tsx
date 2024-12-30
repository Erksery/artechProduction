import {
  createContext,
  useState,
  ReactNode,
  ReactElement,
  FC,
  useContext,
} from "react";

interface ModalContextType {
  activeModal: ReactElement | null;
  openModal: (ModalComponent: ReactElement) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider: FC<ModalProviderProps> = ({ children }) => {
  const [activeModal, setActiveModal] = useState<ReactElement | null>(null);

  const openModal = (ModalComponent: ReactElement) =>
    setActiveModal(ModalComponent);
  const closeModal = () => setActiveModal(null);

  return (
    <ModalContext.Provider value={{ activeModal, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }

  return context;
};
