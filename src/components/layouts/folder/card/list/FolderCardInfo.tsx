import { FcFolder, FcOpenedFolder } from 'react-icons/fc'

import { FolderData } from '@interfaces/folder'
import { User } from '@interfaces/user'
import { UserLogo } from '@components/layouts/user/logo/UserLogo'

import styles from './FolderCardList.module.scss'

interface Props {
  activeFolder: string | undefined
  folder: FolderData
  userData: User | null
}

export const FolderCardInfo = ({ activeFolder, folder, userData }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.iconContainer}>
        {activeFolder === folder.id ? (
          <FcOpenedFolder
            className={`${styles.icon} ${
              folder.privacy === 'Private' && styles.private
            }`}
          />
        ) : (
          <FcFolder
            className={`${styles.icon} ${
              folder.privacy === 'Private' && styles.private
            }`}
          />
        )}
        <div className={styles.logoContainer}>
          <UserLogo
            user={userData}
            className={styles.logo}
          />
        </div>
      </div>

      <div className={styles.info}>
        <p>{folder.name}</p>
      </div>
    </div>
  )
}
