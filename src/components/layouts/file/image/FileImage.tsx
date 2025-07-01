import React, { useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'

import config from '../../../../../config'
import styles from './FileImage.module.scss'

interface FileImageProps {
  src: string
  folderId?: string
  height?: string
  bgColor?: string
  className?: string
}

const FileImage: React.FC<FileImageProps> = ({
  src,
  folderId,
  height = '160px',
  className = ''
}) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const { pathname } = useLocation()

  const isPublic = pathname.startsWith('/shared')
  const isGifFormat = src.split('.')[1] === 'gif'

  const fullImageURL = useMemo(() => {
    const basePath = isPublic ? 'public' : 'files'
    return `${config.apiUrl}/${basePath}/${
      isGifFormat ? 'image' : 'compress_image'
    }/folder/${folderId}/file/${src}${isGifFormat ? '' : '.webp'}`
  }, [isPublic, folderId, src, isGifFormat])

  return (
    <div
      className={styles.imageContainer}
      style={{ height }}>
      <img
        loading='lazy'
        src={fullImageURL}
        alt='image'
        draggable={false}
        className={`${isLoaded ? styles.visible : ''} ${className}`}
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  )
}

export default FileImage
