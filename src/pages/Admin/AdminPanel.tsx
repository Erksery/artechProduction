import { usePortalModal } from '@hooks/modal/usePortalModal'
import { Header } from '@components/layouts/header/panel/Header'
import { UsersList } from '@components/layouts/user/list/UsersList'
import { PortalModal } from '@components/ui/modal/PortalModal/PortalModal'

import styles from './AdminPanel.module.scss'

export const AdminPanel = () => {
  const { modalOpen, handleOpenModal, handleCloseModal } = usePortalModal()
  return (
    <div className={styles.container}>
      <Header />

      <div className={styles.grid}>
        <UsersList className={styles.block1} />
        <div className={styles.block2}>
          <button onClick={handleOpenModal}>Открыть</button>

          <PortalModal
            isOpen={modalOpen}
            close={handleCloseModal}>
            <h3>Opened!</h3>
          </PortalModal>
        </div>
        <div className={styles.block3}>3</div>
      </div>
    </div>
  )
}
