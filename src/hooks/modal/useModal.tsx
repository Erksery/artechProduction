import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'
import { AnimatePresence } from 'framer-motion'

import { ErrorBoundary } from '@components/ui/error/ErrorBoundary'

import { modalRegistry } from './modalRegistry'

export interface ModalState {
  name: string | null
  props?: Record<string, any>
  key?: any
}

interface ModalContextType {
  modal: ModalState
  openModal: (modal: ModalState) => void
  closeModal: () => void
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

interface ModalProviderProps {
  children: ReactNode
}

export const ModalProvider: FC<ModalProviderProps> = ({ children }) => {
  const [modal, setModal] = useState<ModalState>({ name: null })

  const openModal = (modal: ModalState) => setModal(modal)
  const closeModal = () => setModal({ name: null })

  const value = useMemo(() => ({ modal, openModal, closeModal }), [modal])

  //dev
  useEffect(() => {
    if (import.meta.hot && modal.name) {
      import.meta.hot.dispose(() => {
        setModal({ name: null })
      })
    }
  }, [modal.name])

  const ModalComponent = modal.name ? modalRegistry[modal.name] : null
  const isModalRegistered = Boolean(ModalComponent)

  return (
    <ErrorBoundary>
      <ModalContext.Provider value={value}>
        {children}
        <AnimatePresence>
          {isModalRegistered && ModalComponent && (
            <ModalComponent
              key={modal.key}
              {...modal.props}
            />
          )}
        </AnimatePresence>
      </ModalContext.Provider>
    </ErrorBoundary>
  )
}

export const useModal = () => {
  const context = useContext(ModalContext)
  if (!context)
    throw new Error('Error: useModal must be used within ModalProvider')
  return context
}
