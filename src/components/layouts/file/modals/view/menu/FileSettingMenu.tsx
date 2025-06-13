import React, { useState } from 'react'

import { Switch } from '../../../../../ui/switch/Switch'
import styles from './FileSettingMenu.module.scss'

export const FileSettingMenu: React.FC = () => {
  const [isChecked, setIsChecked] = useState(false)

  return (
    <div className={styles.settingContainer}>
      <p>Использовать сжатое изображение</p>
      <Switch
        isChecked={isChecked}
        setIsChecked={setIsChecked}
      />
    </div>
  )
}
