import { AnimatePresence } from 'framer-motion'

import { FileData } from '@interfaces/file'
import { SuccessModal } from '@components/ui/alert/success/SuccessModal'

import { FileModalViewer } from './view/FileModalViewer'

interface Props {
  file: FileData
  activeFolder: string | undefined
  fileDelete: (files: string[]) => void
  openViewModal: boolean
  openDeleteModal: boolean
  setOpenViewModal: (isOpen: boolean) => void
  setOpenDeleteModal: (isOpen: boolean) => void
}

export const FileModals = ({
  file,
  activeFolder,
  fileDelete,
  openViewModal,
  openDeleteModal,
  setOpenViewModal,
  setOpenDeleteModal
}: Props) => {
  const modals = [
    {
      condition: openViewModal,
      component: (
        <FileModalViewer
          isOpen={openViewModal}
          closeModal={() => setOpenViewModal(false)}
          activeFolder={activeFolder}
        />
      )
    },
    {
      condition: openDeleteModal,
      component: (
        <SuccessModal
          isOpen={openDeleteModal}
          closeModal={() => setOpenDeleteModal(false)}
          title='Удалить файл?'
          description='Вы действительно хотите удалить данный файл?'
          button={{ text: 'Удалить', color: 'rgb(184, 62, 62)' }}
          event={() => fileDelete([file.id])}
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
