import React, { lazy, useEffect, useMemo, useRef } from 'react'
import { useDrag } from 'react-dnd'
import { useDispatch } from 'react-redux'

import { fileTypes } from '@config/fileTypes'
import { imageTypes } from '@config/imageTypes'
import { AppDispatch } from '@store/index'
import { toggleSelectedFile } from '@store/slices/files'
import { useGetUser } from '@components/layouts/user/hooks/useGetUser'
import { UserLogo } from '@components/layouts/user/logo/UserLogo'
import { SuccessModal } from '@components/ui/alert/success/SuccessModal'
import { CheckBox } from '@components/ui/svg/checkbox/CheckBox'
import { EmptyCheckBox } from '@components/ui/svg/checkbox/EmptyCheckBox'

import { FileModalViewer } from '../../modals/view/FileModalViewer'
import { useFileCardLogic } from '../hooks/useFileCardLogic'
import { useScrollTo } from '../hooks/useScrollTo'
import { useDeleteFile } from '../menu/hooks/useDeleteFile'
import { FileCardProps } from './FileCard'
import styles from './FileCard.module.scss'
import { FileEditing } from './FileEditing'

const FileImage = lazy(() => import('../../image/FileImage'))

export const FileView = React.memo(({ file, i }: FileCardProps) => {
  const dispatch = useDispatch<AppDispatch>()

  const linkRef = useRef<HTMLDivElement>(null)

  const {
    activeEditMode,
    fileSelected,
    activeFolder,
    fileSvg,
    fileSize,
    searchActive,
    openDeleteModal,
    setOpenDeleteModal,
    openViewModal,
    setOpenViewModal
  } = useFileCardLogic(file)

  const { fileDelete } = useDeleteFile()

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
  }, [file, getUser])

  useEffect(() => {
    const node = linkRef.current
    if (node) {
      drag(node)
    }
  }, [drag])

  return (
    <>
      <FileModalViewer
        isOpen={openViewModal}
        closeModal={() => setOpenViewModal(false)}
        activeFolder={activeFolder}
      />
      <SuccessModal
        isOpen={openDeleteModal}
        closeModal={() => setOpenDeleteModal(false)}
        title='Удалить файл?'
        description='Вы действительно хотите удалить данный файл?'
        button={{ text: 'Удалить', color: 'rgb(184, 62, 62)' }}
        event={() => fileDelete([file.id])}
      />
      <div
        id={`file-${file?.id}`}
        onClick={() => activeEditMode && dispatch(toggleSelectedFile(file.id))}
        className={`${styles.card} ${
          fileSelected || searchActive ? styles.selected : ''
        }`}
        ref={linkRef}
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
              setOpenDeleteModal={setOpenDeleteModal}
              setOpenViewModal={setOpenViewModal}
            />
          </div>
        </div>
      </div>
    </>
  )
})
