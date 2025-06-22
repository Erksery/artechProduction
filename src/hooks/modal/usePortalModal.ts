import { useState } from 'react'

export const usePortalModal = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false)

  const handleOpenModal = () => {
    setModalOpen(true)
  }

  const handleCloseModal = () => {
    setModalOpen(false)
  }

  return {
    modalOpen,
    setModalOpen,
    handleOpenModal,
    handleCloseModal
  }
}
