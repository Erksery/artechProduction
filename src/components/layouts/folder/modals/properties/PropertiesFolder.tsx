import { FolderData } from '@interfaces/folder'
import { PortalModal } from '@components/ui/modal/PortalModal/PortalModal'

interface Props {
  folder: FolderData
  isOpen: boolean
  closeModal: () => void
}
export const PropertiesFolder = ({ folder, isOpen, closeModal }: Props) => {
  return (
    <PortalModal
      isOpen={isOpen}
      close={closeModal}>
      <p>{folder.name}</p>
      <p>{folder.inFolder}</p>
      <p>{folder.creator}</p>
      <p>{folder.privacy}</p>
      <p>{folder.sharingOptions}</p>
    </PortalModal>
  )
}
