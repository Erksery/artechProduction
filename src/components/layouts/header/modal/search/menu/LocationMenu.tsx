import React from 'react'
import { AiOutlineGlobal } from 'react-icons/ai'
import { MdOutlineSnippetFolder } from 'react-icons/md'

import { CardButton } from '../../../../../ui/buttons/card/CardButton'
import styles from './LocationMenu.module.scss'

interface LocationMenuProps {
  location: string
  onActive: (status: string) => void
}

export const LocationMenu: React.FC<LocationMenuProps> = ({
  location,
  onActive
}) => {
  const buttons = [
    {
      id: 1,
      title: 'Локальный',
      description:
        'Поиск производится в папке в которой вы в данный момент находитесь',
      icon: <MdOutlineSnippetFolder />,
      status: 'local'
    },
    {
      id: 2,
      title: 'Глобальный',
      description: 'Поиск производится во всех доступных пользователю папках',
      icon: <AiOutlineGlobal />,
      status: 'global'
    }
  ]

  const handleSelection = (status: string) => {
    onActive(status)
  }

  return (
    <div className={styles.selectorMenu}>
      {buttons.map(button => (
        <CardButton
          key={button.id}
          title={button.title}
          description={button.description}
          icon={button.icon}
          active={location === button.status}
          event={() => handleSelection(button.status)}
        />
      ))}
    </div>
  )
}
