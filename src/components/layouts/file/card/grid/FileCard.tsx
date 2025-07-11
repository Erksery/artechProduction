import React, { useRef } from 'react'
import { AnimatePresence } from 'framer-motion'

import { FileData } from '@interfaces/file'
import { useObserver } from '@hooks/useObserver'

import { FileSkeleton } from './FileSkeleton'
import { FileView } from './FileView'

export interface FileCardProps {
  file: FileData
  i: number
}

export const FileCard = React.memo(({ file, i }: FileCardProps) => {
  const ref = useRef<HTMLDivElement>(null)

  const { isVisible } = useObserver(ref)

  return (
    <AnimatePresence>
      <div
        ref={ref}
        draggable={false}>
        {isVisible ? (
          <FileView
            file={file}
            i={i}
          />
        ) : (
          <FileSkeleton />
        )}
      </div>
    </AnimatePresence>
  )
})
