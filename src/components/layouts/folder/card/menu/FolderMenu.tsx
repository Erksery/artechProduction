import { useModal } from '@hooks/modal/useModal'

import { FolderData } from '../../../../../interfaces/folder'
import { MenuButton } from '../../../../ui/menu/button/MenuButton'
import { usePasteFiles } from '../../viewer/ToolsLine/tools/hooks/usePasteFiles'
import styles from './FolderMenu.module.scss'
import { getFolderMenuButtons } from './FolderMenuButtons'
import { useDeleteFolder } from './hooks/useDeleteFolder'

interface FolderMenuProps {
  id: string
  folder: FolderData
  close: () => void
}

export const FolderMenu: React.FC<FolderMenuProps> = ({
  id,
  folder,
  close
}) => {
  const { openModal, closeModal } = useModal()
  const { deleteFolder } = useDeleteFolder()
  const { pasteFilesToFolder } = usePasteFiles()
  const buttons = getFolderMenuButtons(
    id,
    folder,
    openModal,
    closeModal,
    close,
    deleteFolder,
    pasteFilesToFolder
  )

  return (
    <div className={styles.menu}>
      {buttons.map(button => (
        <MenuButton
          key={button.id}
          event={button.event}
          title={button.title}
          icon={button.icon}
          height={40}
          red={button.red}
        />
      ))}
    </div>
  )
}
