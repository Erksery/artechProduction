import React, { lazy, useEffect, useMemo } from 'react'
import { useDrag } from 'react-dnd'
import { useDispatch } from 'react-redux'

import { fileTypes } from '@config/fileTypes'
import { imageTypes } from '@config/imageTypes'
import { AppDispatch } from '@store/index'
import { toggleSelectedFile } from '@store/slices/files'
import { useGetUser } from '@hooks/useGetUser'
import { UserLogo } from '@components/layouts/user/logo/UserLogo'
import { CheckBox } from '@components/ui/svg/checkbox/CheckBox'
import { EmptyCheckBox } from '@components/ui/svg/checkbox/EmptyCheckBox'

import { useFileCardLogic } from '../hooks/useFileCardLogic'
import { useScrollTo } from '../hooks/useScrollTo'
import { FileCardProps } from './FileCard'
import styles from './FileCard.module.scss'
import { FileEditing } from './FileEditing'

const FileImage = lazy(() => import('../../image/FileImage'))

export const FileView = React.memo(({ file, i }: FileCardProps) => {
  const dispatch = useDispatch<AppDispatch>()

  const {
    activeEditMode,
    fileSelected,
    activeFolder,
    fileSvg,
    fileSize,
    searchActive
  } = useFileCardLogic(file)

  useScrollTo()

  const { getUser, userData } = useGetUser()

  const [{ isDragging }, drag] = useDrag({
    type: 'FILE',
    item: { file },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  })

  const imageType = useMemo(
    () => imageTypes.includes(file.mimeType),
    [file.mimeType]
  )

  useEffect(() => {
    getUser(file.creator)
  }, [file])

  return (
    <div
      id={`file-${file?.id}`}
      onClick={() => activeEditMode && dispatch(toggleSelectedFile(file.id))}
      className={`${styles.card} ${
        fileSelected || searchActive ? styles.selected : ''
      }`}
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1
      }}>
      <div className={styles.fileContainer}>
        <div className={styles.container}>
          {imageType ? (
            <FileImage
              src={file.name}
              folderId={activeFolder}
              className={`${activeEditMode && styles.opacity}`}
            />
          ) : (
            <div className={styles.fileIcon}>
              {fileSvg ? fileSvg?.svg : fileTypes[0]?.svg}
            </div>
          )}
          <div className={styles.userContainer}>
            <div className={styles.blurContainer}>
              <p>{userData?.login}</p>
              <UserLogo
                user={userData}
                className={styles.userIcon}
              />
            </div>
          </div>
        </div>

        <div className={styles.infoContainer}>
          <div className={styles.check}>
            {activeEditMode &&
              (fileSelected ? (
                <CheckBox
                  width={20}
                  height={20}
                />
              ) : (
                <EmptyCheckBox
                  width={20}
                  height={20}
                />
              ))}
          </div>
          <div className={styles.sizeContainer}>
            <p>{fileSize}</p>
          </div>
        </div>
      </div>

      <div className={styles.info}>
        <p className={styles.type}>
          <span>{file.mimeType}</span>
        </p>
        <div className={styles.menu}>
          <FileEditing
            file={file}
            i={i}
            activeFolder={activeFolder}
          />
        </div>
      </div>
    </div>
  )
})
