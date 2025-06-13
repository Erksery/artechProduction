import styles from './TabToggle.module.scss'
import { TabToggleTypes } from './TabToggleTypes'

interface Props {
  tabs: TabToggleTypes[]
  activeButton: TabToggleTypes | undefined
}

export const TabToggle = ({ tabs, activeButton }: Props) => {
  return (
    <div className={styles.tabContainer}>
      {tabs &&
        tabs.map(tab => (
          <button
            onClick={tab.event}
            className={`${styles.tab} ${
              activeButton?.id === tab.id && styles.active
            }`}>
            {tab.title}
          </button>
        ))}
    </div>
  )
}
