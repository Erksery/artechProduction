import { lazy, Suspense } from 'react'

import { fileTypes } from '@config/fileTypes'
import { imageTypes, videoTypes } from '@config/imageTypes'
import { FileData } from '@interfaces/file'

import styles from './FileViewModal.module.scss'

const FileImage = lazy(() => import('../../image/FileImage'))

interface Props {
  openFile: number
  files: FileData[]
  activeFolder: string | undefined
}

export const renderFileContent = ({ files, openFile, activeFolder }: Props) => {
  const file = files[openFile]

  const videoPath = `/files/video/folder/${activeFolder}/file/${encodeURIComponent(
    file.name
  )}`

  const fileSvg = fileTypes.find(element =>
    element.mimeType.includes(files[openFile].mimeType)
  )
  if (imageTypes.includes(file.mimeType)) {
    return (
      <Suspense fallback={<div>Загрузка изображения...</div>}>
        <FileImage
          src={file.name}
          folderId={activeFolder}
          height='100%'
          className={styles.image}
        />
      </Suspense>
    )
  } else if (videoTypes.includes(file.mimeType)) {
    return (
      <video
        key={file.name}
        className={styles.video}
        controls>
        <source
          src={videoPath}
          type={file.mimeType}
        />
        <source
          src={videoPath}
          type='video/mp4'
        />
        Ваш браузер не поддерживает воспроизведение видео.
      </video>
    )
  } else {
    return (
      <div className={styles.fileIcon}>
        {fileSvg ? fileSvg.svg : fileTypes[0].svg}
      </div>
    )
  }
}
