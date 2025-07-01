import { lazy, Suspense, useRef } from 'react'

import { fileTypes } from '@config/fileTypes'
import { imageTypes, videoTypes } from '@config/imageTypes'
import { FileData } from '@interfaces/file'
import { useObserver } from '@hooks/useObserver'

import config from '../../../../../../config'
import styles from './FileViewModal.module.scss'

const FileImage = lazy(() => import('../../image/FileImage'))

interface Props {
  openFile: number
  files: FileData[]
  activeFolder: string | undefined
}

export const RenderFileContent: React.FC<Props> = ({
  files,
  openFile,
  activeFolder
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const { isVisible } = useObserver(ref)
  const file = files[openFile]

  const renderFile = () => {
    if (!isVisible) return null
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
    }
    if (videoTypes.includes(file.mimeType)) {
      const videoPath = `${config.environment === 'development' ? '/api' : ''}/files/video/folder/${activeFolder}/file/${encodeURIComponent(file.name)}`
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
    }

    const fileSvg = fileTypes.find(element =>
      element.mimeType.includes(file.mimeType)
    )

    return (
      <div className={styles.fileIcon}>
        {fileSvg ? fileSvg.svg : fileTypes[0].svg}
      </div>
    )
  }

  return <div ref={ref}>{renderFile()}</div>
}
