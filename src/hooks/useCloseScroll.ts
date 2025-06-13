import { useEffect } from 'react'

export const useCloseScroll = (
  open: boolean,
  setOpen: (isOpen: boolean) => void
) => {
  useEffect(() => {
    const handleScroll = () => {
      if (open) {
        setOpen(false)
      }
    }
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [open])
}
