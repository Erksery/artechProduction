import React from 'react'

import { PortalModal } from '@components/ui/modal/PortalModal/PortalModal'

import styles from './SuccessModal.module.scss'

interface SuccessModalProps {
  title: string
  description: string
  button: { text: string; color: string }
  event: () => void
  isOpen: boolean
  closeModal: () => void
}

export const SuccessModal: React.FC<SuccessModalProps> = ({
  title,
  description,
  button,
  event,
  isOpen,
  closeModal
}) => {
  return (
    <PortalModal
      className={styles.modal}
      isOpen={isOpen}
      close={closeModal}>
      <div className={styles.container}>
        <h3>{title}</h3>
        <p>{description}</p>
        <button onClick={event}>{button.text}</button>
      </div>
    </PortalModal>
  )
}
