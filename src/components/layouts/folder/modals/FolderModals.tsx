import { AnimatePresence } from 'framer-motion'

import { FolderData } from '@interfaces/folder'
import { SuccessModal } from '@components/ui/alert/success/SuccessModal'

import { EditFolderModal } from './edit/EditFolderModal'
import { PropertiesFolder } from './properties/PropertiesFolder'

interface Props {
  folder: FolderData
  deleteFolder: (folder: string) => void
  openEditModal: boolean
  openPropertiesModal: boolean
  openDeleteModal: boolean
  setOpenEditModal: (isOpen: boolean) => void
  setOpenPropertiesModal: (isOpen: boolean) => void
  setOpenDeleteModal: (isOpen: boolean) => void
}

export const FolderModals = ({
  folder,
  deleteFolder,
  openEditModal,
  openPropertiesModal,
  openDeleteModal,
  setOpenEditModal,
  setOpenPropertiesModal,
  setOpenDeleteModal
}: Props) => {
  const modals = [
    {
      condition: openEditModal,
      component: (
        <EditFolderModal
          folder={folder}
          isOpen={openEditModal}
          closeModal={() => setOpenEditModal(false)}
        />
      )
    },
    {
      condition: openPropertiesModal,
      component: (
        <PropertiesFolder
          folder={folder}
          isOpen={openPropertiesModal}
          closeModal={() => setOpenPropertiesModal(false)}
        />
      )
    },
    {
      condition: openDeleteModal,
      component: (
        <SuccessModal
          isOpen={openDeleteModal}
          closeModal={() => setOpenDeleteModal(false)}
          title='Удалить папку?'
          description='Вы действительно хотите удалить данную папку? Это приведет к удалению всех дочерних папок и файлов в них.'
          button={{ text: 'Удалить', color: 'rgb(184, 62, 62)' }}
          event={() => deleteFolder(folder.id)}
        />
      )
    }
  ]
  return (
    <AnimatePresence>
      {modals.map(modal => modal.condition && modal.component)}
    </AnimatePresence>
  )
}
