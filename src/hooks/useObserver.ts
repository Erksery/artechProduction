import { useEffect, useState } from 'react'

export const useObserver = (ref: { current: HTMLDivElement | null }) => {
  const [isVisible, setIsVisible] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true)
        observer.unobserve(entry.target)
      }
    })

    if (ref.current) observer.observe(ref.current)

    return () => {
      if (ref.current) observer.unobserve(ref.current)
    }
  }, [])

  return { isVisible }
}
