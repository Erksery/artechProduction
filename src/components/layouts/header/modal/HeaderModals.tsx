import { AnimatePresence } from 'framer-motion'

import { AddFileModal } from '@components/layouts/file/modals/insert/AddFileModal'
import { AddFolderModal } from '@components/layouts/folder/modals/insert/AddFolderModal'
import { UserPullMenu } from '@components/layouts/user/menu/UserPullMenu'

import { SearchModal } from './search/SearchModal'

interface Props {
  uploadModal: boolean
  addFolderModal: boolean
  searchModal: boolean
  menu: boolean
  setUploadModal: (isOpen: boolean) => void
  setAddFolderModal: (isOpen: boolean) => void
  setSearchModal: (isOpen: boolean) => void
  setMenu: (isOpen: boolean) => void
}

export const HeaderModals = ({
  uploadModal,
  addFolderModal,
  searchModal,
  menu,
  setUploadModal,
  setAddFolderModal,
  setSearchModal,
  setMenu
}: Props) => {
  const modals = [
    {
      condition: uploadModal,
      component: (
        <AddFileModal
          key='upload'
          isOpen
          closeModal={() => setUploadModal(false)}
        />
      )
    },
    {
      condition: addFolderModal,
      component: (
        <AddFolderModal
          key='folder'
          isOpen
          closeModal={() => setAddFolderModal(false)}
        />
      )
    },
    {
      condition: searchModal,
      component: (
        <SearchModal
          key='search'
          isOpen
          closeModal={() => setSearchModal(false)}
        />
      )
    },
    {
      condition: menu,
      component: (
        <UserPullMenu
          key='user'
          isOpen
          closeModal={() => setMenu(false)}
        />
      )
    }
  ]

  return (
    <>
      <AnimatePresence>
        {modals.map(modal => modal.condition && modal.component)}
      </AnimatePresence>
    </>
  )
}
