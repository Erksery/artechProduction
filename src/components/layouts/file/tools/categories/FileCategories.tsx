import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch, RootState } from '@store/index'
import { setFilter } from '@store/slices/files'

import { fileCategories, FileCategoriesTypes } from './Categories'
import styles from './FileCategories.module.scss'

const FileCategories = () => {
  const dispatch = useDispatch<AppDispatch>()
  const file = useSelector((state: RootState) => state.files)

  return (
    <div className={styles.container}>
      <div className={styles.categories}>
        {fileCategories.map((type: FileCategoriesTypes) => (
          <button
            key={type.id}
            onClick={() =>
              dispatch(setFilter({ name: 'mimeType', value: type.value }))
            }
            className={`${styles.category} ${
              type.value === file.filter.value && styles.active
            }`}>
            {type.icon}
            <p>{type.title}</p>
          </button>
        ))}
      </div>
    </div>
  )
}

export default FileCategories
