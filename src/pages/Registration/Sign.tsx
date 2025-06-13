import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useSelector } from 'react-redux'

import { DetectedProfile } from '../../components/layouts/auth/Profile/DetectedProfile/DetectedProfile'
import { SignIn } from '../../components/layouts/auth/SignIn/SignIn'
import { SignUp } from '../../components/layouts/auth/SignUp/SignUp'
import { ContentPage } from '../../components/ui/contentPage/ContentPage'
import { RootState } from '../../store'
import { useAuthUser } from './hooks/useAuthUser'
import { useRegUser } from './hooks/useRegUser'
import styles from './Sign.module.scss'

const tabs = [
  { id: 1, name: 'register', title: 'Регистрация', component: SignUp },
  { id: 2, name: 'login', title: 'Авторизация', component: SignIn }
] as const

export const Sign = () => {
  const [activeTab, setActiveTab] = useState<'register' | 'login'>('register')
  const [lineStyle, setLineStyle] = useState({ width: '0px', left: '0px' })
  const lineStyleRef = useRef({ width: '0px', left: '0px' })

  const tabRefs = useRef<{
    register: HTMLButtonElement | null
    login: HTMLButtonElement | null
  }>({
    register: null,
    login: null
  })

  const user = useSelector((state: RootState) => state.user.userData)

  const reg = useRegUser()
  const auth = useAuthUser()
  const activeHook = activeTab === 'register' ? reg : auth

  const ActiveComponent = useMemo(
    () => tabs.find(tab => tab.name === activeTab)?.component,
    [activeTab]
  )

  useEffect(() => {
    const activeButton = tabRefs.current[activeTab]
    if (activeButton) {
      requestAnimationFrame(() => {
        const newStyle = {
          width: `${activeButton.offsetWidth}px`,
          left: `${activeButton.offsetLeft}px`
        }
        lineStyleRef.current = newStyle
        setLineStyle(newStyle)
      })
    }
  }, [activeTab])

  const setTabRef = useCallback(
    (name: 'register' | 'login', el: HTMLButtonElement | null) => {
      if (el) tabRefs.current[name] = el
    },
    []
  )

  return (
    <ContentPage className={styles.container}>
      <h2>АртТех Production</h2>
      <form
        onSubmit={
          activeTab === 'register' ? reg.submitRegUser : auth.submitAuthUser
        }
        className={styles.formContainer}>
        {user ? (
          <DetectedProfile user={user} />
        ) : (
          <>
            <div className={styles.tabs}>
              {tabs.map(tab => (
                <button
                  onClick={() => setActiveTab(tab.name)}
                  key={tab.id}
                  ref={el => setTabRef(tab.name, el)}
                  type='button'
                  className={activeTab === tab.name ? styles.active : ''}>
                  {tab.title}
                </button>
              ))}

              <div
                className={styles.underline}
                style={lineStyle}
              />
            </div>
            <AnimatePresence mode='wait'>
              {ActiveComponent && (
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className={styles.activeComponentContainer}>
                  <ActiveComponent
                    error={activeHook.error}
                    loading={activeHook.loading}
                    activateTab={setActiveTab}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </form>
    </ContentPage>
  )
}
