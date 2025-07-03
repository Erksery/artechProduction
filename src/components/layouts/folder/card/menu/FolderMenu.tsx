import { FolderData } from '@interfaces/folder'
import { MenuButton } from '@components/ui/menu/button/MenuButton'

import { usePasteFiles } from '../../viewer/ToolsLine/tools/hooks/usePasteFiles'
import styles from './FolderMenu.module.scss'
import { getFolderMenuButtons } from './FolderMenuButtons'

interface FolderMenuProps {
  folder: FolderData
  close: () => void

  setOpenDeleteModal: (open: boolean) => void
  setOpenEditModal: (open: boolean) => void
  setOpenPropertiesModal: (open: boolean) => void
}

export const FolderMenu: React.FC<FolderMenuProps> = ({
  folder,
  close,
  setOpenDeleteModal,
  setOpenEditModal,
  setOpenPropertiesModal
}) => {
  const { pasteFilesToFolder } = usePasteFiles()
  const buttons = getFolderMenuButtons(
    folder,
    close,
    pasteFilesToFolder,
    setOpenDeleteModal,
    setOpenEditModal,
    setOpenPropertiesModal
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
