import { Toaster } from 'sonner'

import { useTheme } from '@hooks/useTheme'
import { useGetUserData } from '@components/layouts/user/hooks/useGetUserData'

import { AppRouter } from './routes/AppRouter'

function App() {
  useGetUserData()
  useTheme()

  return (
    <>
      <Toaster />
      <AppRouter />
    </>
  )
}

export default App
