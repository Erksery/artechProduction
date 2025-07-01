import { useEffect, useState } from 'react'

export const useMobileView = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth <= 925)
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 925)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return {
    isMobile
  }
}
