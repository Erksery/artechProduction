import { RefObject, useEffect, useState } from 'react'

export const useObserver = (ref: RefObject<HTMLDivElement | null>) => {
  const [isVisible, setIsVisible] = useState(false)
  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true)
        observer.unobserve(entry.target)
      }
    })

    observer.observe(node)

    return () => {
      observer.unobserve(node)
    }
  }, [ref])

  return { isVisible }
}
