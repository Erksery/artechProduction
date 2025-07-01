import { JSX } from 'react'
import { FaRegCopy } from 'react-icons/fa6'
import { GrView } from 'react-icons/gr'
import { LuFolderPen } from 'react-icons/lu'
import { MdOutlineDelete, MdOutlineSimCardDownload } from 'react-icons/md'

import { AppDispatch } from '@store/index'
import { setActiveFile } from '@store/slices/files'
import { FileData } from '@interfaces/file'
import { User } from '@interfaces/user'
import { ModalState } from '@hooks/modal/useModal'
import { handleApiSuccess } from '@utils/toast/handleApiSuccess'

interface ButtonConfig {
  id: number
  title: string
  icon: JSX.Element
  red: boolean
  disabled: boolean

  event: (e?: React.MouseEvent<HTMLButtonElement>) => void
}

export const getFileMenuButtons = (
  openModal: (modal: ModalState) => void,
  closeModal: () => void,
  downloadFile: (folderId: string, file: FileData) => void,
  close: () => void,
  editMode: () => void,
  activeFile: number,
  fileDelete: (id?: string[]) => Promise<void>,
  dispatch: AppDispatch,
  fileId: string,
  file: FileData,
  folderId: string | undefined,
  user: User | null,
  openPortalModal: () => void
): ButtonConfig[] => [
  {
    id: 0,
    title: 'Открыть',
    icon: <GrView />,
    red: false,
    disabled: false,
    event: () => {
      dispatch(setActiveFile(activeFile))
      openPortalModal()
      close()
    }
  },
  {
    id: 2,
    title: 'Скачать',
    icon: <MdOutlineSimCardDownload />,
    red: false,
    disabled: false,
    event: () => {
      downloadFile(folderId!, file)
    }
  },
  {
    id: 3,
    title: 'Переименовать',
    icon: <LuFolderPen />,
    red: false,
    disabled: !user || user?.id !== file.creator,
    event: () => {
      editMode()
      close()
    }
  },
  {
    id: 4,
    title: 'Скопировать',
    icon: <FaRegCopy />,
    red: false,
    disabled: !user,
    event: () => {
      localStorage.setItem('buffer', JSON.stringify([fileId]))
      close()
      handleApiSuccess('', 'Файл скопирован в буфер обмена')
    }
  },
  {
    id: 5,
    title: 'Удалить',
    icon: <MdOutlineDelete />,
    red: true,
    disabled: !user,
    event: () => {
      openModal({
        name: 'success',
        props: {
          title: 'Удалить файл?',
          description: 'Вы действительно хотите удалить данный файл?',
          button: { text: 'Удалить', color: 'rgb(184, 62, 62)' },
          event: async () => {
            await fileDelete([fileId])
            closeModal()
          }
        }
      })
      close()
    }
  }
]
