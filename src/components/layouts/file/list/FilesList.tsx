import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { VIEW_MODES, ViewType } from '@config/constants'
import { FileData } from '@interfaces/file'

import { AppDispatch, RootState } from '../../../../store'
import { setSelectedFile } from '../../../../store/slices/files'
import { FileCard } from '../card/grid/FileCard'
import { FileSkeleton } from '../card/grid/FileSkeleton'
import { FileListCard } from '../card/list/FileListCard'
import styles from './FilesList.module.scss'

interface FilesListProps {
  files: FileData[]
  viewMode?: ViewType
  loading: boolean
}
const FilesListComponent: React.FC<FilesListProps> = ({
  files,
  viewMode = VIEW_MODES.GRID,
  loading
}) => {
  const dispatch = useDispatch<AppDispatch>()
  const activeEditMode = useSelector(
    (state: RootState) => state.files.activeEditMode
  )

  useEffect(() => {
    if (!activeEditMode) {
      dispatch(setSelectedFile([]))
    }
  }, [activeEditMode])

  console.log('rerender file list', files)

  return (
    <div
      className={`${viewMode === VIEW_MODES.GRID ? styles.table : styles.list}`}>
      {loading
        ? Array.from({ length: 10 }).map((_, index) => (
            <FileSkeleton key={index} />
          ))
        : files.map((file, index) =>
            viewMode === VIEW_MODES.GRID ? (
              <FileCard
                file={file}
                key={file.id}
                i={index}
              />
            ) : (
              <FileListCard
                key={file.id}
                file={file}
              />
            )
          )}
    </div>
  )
}

export const FilesList = React.memo(FilesListComponent)
