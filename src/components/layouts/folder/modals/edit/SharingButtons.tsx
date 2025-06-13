import { SHARING_VALUES, SharingType } from '../../../../../config/constants'
import { TabToggleTypes } from '../../../../ui/tab/TabToggleTypes'

export const sharingButtons = (
  handleSharingChange: (sharing: SharingType) => void
): TabToggleTypes[] => [
  {
    id: 1,
    title: 'Чтение',
    name: SHARING_VALUES.READING,
    event: () => handleSharingChange(SHARING_VALUES.READING)
  },
  {
    id: 2,
    title: 'Редактирование',
    name: SHARING_VALUES.EDITING,
    event: () => handleSharingChange(SHARING_VALUES.EDITING)
  }
]
