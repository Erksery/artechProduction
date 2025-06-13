import { IoSettingsSharp } from 'react-icons/io5'
import { TbDoorExit } from 'react-icons/tb'

import { MenuButton } from '../../../../ui/menu/button/MenuButton'
import { useLogout } from './hooks/useLogout'
import styles from './UserMenu.module.scss'

export const UserMenu = () => {
  const { logout } = useLogout()
  const buttons = [
    {
      id: 1,
      title: 'Настройки',
      icon: <IoSettingsSharp />,
      event: () => {
        console.log('1')
      },
      red: false
    },

    {
      id: 2,
      title: 'Выйти',
      icon: <TbDoorExit />,
      event: () => {
        logout()
      },
      red: true
    }
  ]
  return (
    <div className={styles.menuContainer}>
      {buttons.map(button => (
        <MenuButton
          key={button.id}
          title={button.title}
          icon={button.icon}
          event={button.event}
          red={button.red}
        />
      ))}
    </div>
  )
}
