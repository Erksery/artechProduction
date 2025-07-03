import React, { useState } from 'react'

import { PrivacyType } from '@config/constants'
import { Input } from '@components/ui/input/Input'
import { MenuContainer } from '@components/ui/menu/container/MenuContainer'
import { PortalModal } from '@components/ui/modal/PortalModal/PortalModal'

import { privacyButtons } from '../menu/PrivacyButtons'
import { PrivacyMenu } from '../menu/PrivacyMenu'
import styles from './AddFolderModal.module.scss'
import { useCreateFolder } from './hook/useCreateFolder'

interface AddFolderModal {
  isOpen: boolean
  closeModal: () => void
}

export const AddFolderModal: React.FC<AddFolderModal> = ({
  isOpen,
  closeModal
}) => {
  const [openMenu, setOpenMenu] = useState(false)
  const [folderName, setFolderName] = useState('')
  const [selectPrivacy, setSelectPrivacy] = useState<{
    name: string
    privacy: PrivacyType
  }>({
    name: '',
    privacy: 'Private'
  })
  const { createFolder } = useCreateFolder()

  const handleSuccess = () => {
    createFolder(folderName, true)
    closeModal()
  }

  const handlePrivacyChange = (privacy: PrivacyType) => {
    setSelectPrivacy(prev => ({
      ...prev,
      privacy: privacy
    }))
  }

  const buttons = privacyButtons(handlePrivacyChange)
  const activeButton = buttons.find(
    button => button.name === selectPrivacy.privacy
  )

  return (
    <PortalModal
      className={styles.modal}
      isOpen={isOpen}
      close={closeModal}>
      <div className={styles.folderCreateContainer}>
        <Input
          value={folderName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFolderName(e.target.value)
          }
          placeholder={'Название'}
        />

        <p>Режим видимости</p>
        <MenuContainer
          open={openMenu}
          setOpen={setOpenMenu}
          element={
            <PrivacyMenu
              buttons={buttons}
              activeButton={activeButton}
            />
          }
          position='left'>
          <button className={styles.selector}>
            <p>{activeButton?.title}</p>
          </button>
        </MenuContainer>

        <div className={styles.buttonsContainer}>
          <button
            onClick={handleSuccess}
            disabled={folderName.length === 0}>
            Подтвердить
          </button>
        </div>
      </div>
    </PortalModal>
  )
}
