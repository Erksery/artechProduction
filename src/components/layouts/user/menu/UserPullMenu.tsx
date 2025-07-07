import { PullMenu } from '@components/ui/menu/pull/PullMenu'

interface Props {
  isOpen: boolean
  closeModal: () => void
}

export const UserPullMenu = ({ isOpen, closeModal }: Props) => {
  return (
    <PullMenu
      isOpen={isOpen}
      closeModal={closeModal}>
      UserPullMenu
    </PullMenu>
  )
}
