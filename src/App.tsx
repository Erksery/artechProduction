import { AnimatePresence } from 'framer-motion'
import { Toaster } from 'sonner'

import { modalRegistry } from '@hooks/modal/modalRegistry'
import { useModal } from '@hooks/modal/useModal'
import { useTheme } from '@hooks/useTheme'

import { useGetUserData } from './hooks/useGetUserData'
import { AppRouter } from './routes/AppRouter'

function App() {
  const { modal } = useModal()

  useGetUserData()
  useTheme()

  const ModalComponent = modal ? modalRegistry[modal.key] : null
  return (
    <>
      <Toaster />
      <AppRouter />

      <AnimatePresence>
        {ModalComponent && <ModalComponent {...modal?.props} />}
      </AnimatePresence>
    </>
  )
}

export default App
