import { FolderData } from '@interfaces/folder'
import { Modal } from '@components/ui/modal/Modal'

interface Props {
  folder: FolderData
}
export const PropertiesFolder = ({ folder }: Props) => {
  return (
    <Modal>
      <p>{folder.name}</p>
      <p>{folder.inFolder}</p>
      <p>{folder.creator}</p>
      <p>{folder.privacy}</p>
      <p>{folder.sharingOptions}</p>
    </Modal>
  )
}
