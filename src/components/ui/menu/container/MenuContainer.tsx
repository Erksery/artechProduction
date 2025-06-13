import { ReactNode, useLayoutEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { useClickOutside } from '../../../../hooks/useClickOutside'
import { useCloseScroll } from '../../../../hooks/useCloseScroll'
import styles from './MenuContainer.module.scss'

interface MenuContainerProps {
  children: ReactNode
  element: ReactNode
  open: boolean
  setOpen: (isOpen: boolean) => void
  position?: 'left' | 'right'
  blur?: boolean
  className?: string
}

export const MenuContainer: React.FC<MenuContainerProps> = ({
  children,
  element,
  open,
  setOpen,
  position = 'right',
  blur = false,
  className
}) => {
  const menuRef = useRef<HTMLDivElement | null>(null)
  const triggerRef = useRef<HTMLDivElement | null>(null)
  const [menuPosition, setMenuPosition] = useState<'top' | 'bottom'>('bottom')

  const toggleMenu = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setOpen(!open)
  }

  const close = () => setOpen(false)

  useCloseScroll(open, setOpen)
  useClickOutside(triggerRef, close)

  useLayoutEffect(() => {
    if (triggerRef.current && menuRef.current && open) {
      const triggerRect = triggerRef.current.getBoundingClientRect()
      const menuHeight = menuRef.current.offsetHeight

      const spaceAbove = triggerRect.top
      const spaceBelow = window.innerHeight - triggerRect.bottom

      setMenuPosition(
        spaceBelow >= menuHeight || spaceBelow > spaceAbove ? 'top' : 'bottom'
      )
    }
  }, [open])

  return (
    <div
      ref={triggerRef}
      className={`${styles.menuContainer} ${className}`}>
      <div
        onClick={toggleMenu}
        className={styles.container}>
        {children}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            style={{
              [position]: 0,
              [menuPosition]: '100%'
            }}
            className={`${styles.menu} ${blur && styles.blur}`}
            ref={menuRef}>
            {element}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
