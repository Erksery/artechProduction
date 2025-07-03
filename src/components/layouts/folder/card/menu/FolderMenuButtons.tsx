import { GoInfo } from 'react-icons/go'
import { GrView } from 'react-icons/gr'
import { LuClipboardPaste, LuFolderPen } from 'react-icons/lu'
import { MdOutlineDelete } from 'react-icons/md'

import { FolderData } from '@interfaces/folder'

export const getFolderMenuButtons = (
  folder: FolderData,
  close: () => void,
  pasteFilesToFolder: (folderId: string) => void,
  setOpenDeleteModal: (open: boolean) => void,
  setOpenEditModal: (open: boolean) => void,
  setOpenPropertiesModal: (open: boolean) => void
) => [
  {
    id: 1,
    title: 'Открыть',
    icon: <GrView />,
    red: false,
    event: () => close()
  },
  {
    id: 2,
    title: 'Редактировать',
    icon: <LuFolderPen />,
    red: false,
    event: (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      setOpenEditModal(true)
      close()
    }
  },

  {
    id: 3,
    title: 'Вставить',
    icon: <LuClipboardPaste />,
    red: false,
    event: () => {
      pasteFilesToFolder(folder.id)
      close()
    }
  },
  {
    id: 4,
    title: 'Свойства',
    icon: <GoInfo />,
    red: false,
    event: (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      setOpenPropertiesModal(true)
      close()
    }
  },
  {
    id: 5,
    title: 'Удалить',
    icon: <MdOutlineDelete />,
    red: true,
    event: (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      setOpenDeleteModal(true)
      close()
    }
  }
]
