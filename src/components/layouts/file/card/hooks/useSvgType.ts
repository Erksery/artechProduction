import { useMemo } from 'react'

import { fileTypes } from '@config/fileTypes'

export const useSvgType = (mimeType: string) => {
  const fileSvg = useMemo(() => {
    return (
      fileTypes.find(element => element.mimeType.includes(mimeType)) ||
      fileTypes[0]
    )
  }, [mimeType])

  return {
    fileSvg
  }
}
