import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { AiOutlineGlobal } from 'react-icons/ai'
import { MdOutlineSnippetFolder } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

import { VIEW_MODES } from '@config/constants'
import { FileData } from '@interfaces/file'
import { useActiveFile } from '@components/layouts/file/hooks/useActiveFile'
import { FilesList } from '@components/layouts/file/list/FilesList'
import { Input } from '@components/ui/input/Input'
import { MenuContainer } from '@components/ui/menu/container/MenuContainer'
import { PortalModal } from '@components/ui/modal/PortalModal/PortalModal'

import { useSearchFile } from './hooks/useSearchFile'
import { LocationMenu } from './menu/LocationMenu'
import styles from './SearchModal.module.scss'

interface Props {
  isOpen: boolean
  closeModal: () => void
}

export const SearchModal = ({ isOpen, closeModal }: Props) => {
  const [searchValue, setSearchValue] = useState({
    value: localStorage.getItem('searchValue') ?? '',
    location: localStorage.getItem('searchLocation') ?? 'local'
  })
  const [locationMenu, setLocationMenu] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()
  const { getSearchFiles, searchFiles } = useSearchFile()
  const { selectActiveFile } = useActiveFile()

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearchValue(prev => ({
      ...prev,
      value: e.target.value
    }))
  }

  const handleActive = (value: string) => {
    setSearchValue(prev => ({
      ...prev,
      location: value
    }))
  }

  const handleLink = (file: FileData) => {
    selectActiveFile(file.id)
    navigate(`/folder/${file.folderId}`)
    closeModal()
  }

  const expanded = searchValue?.value?.length > 0

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchValue.value.trim()) {
        getSearchFiles(searchValue)
      }
    }, 700)

    return () => clearTimeout(delayDebounceFn)
  }, [searchValue, getSearchFiles])

  return (
    <PortalModal
      isOpen={isOpen}
      close={closeModal}
      className={styles.modal}>
      <motion.div
        className={styles.searchContainer}
        initial={{ height: 80 }}
        animate={{
          height: expanded ? 550 : 80
        }}
        transition={{ duration: 0.5 }}>
        <div className={styles.toolsContainer}>
          <Input
            ref={inputRef}
            value={searchValue.value}
            onChange={handleInputChange}
            title='Поиск'
            placeholder='Введите название файла'
          />
          <MenuContainer
            element={
              <LocationMenu
                location={searchValue.location}
                onActive={handleActive}
              />
            }
            open={locationMenu}
            setOpen={setLocationMenu}>
            <button className={styles.selector}>
              {searchValue.location === 'local' ? (
                <MdOutlineSnippetFolder />
              ) : (
                <AiOutlineGlobal />
              )}
            </button>
          </MenuContainer>
        </div>

        <AnimatePresence>
          {expanded && (
            <motion.div
              className={styles.fileList}
              initial={{ height: 0 }}
              animate={{ height: 500 }}
              exit={{ height: 0, transition: { duration: 0.3 } }}
              transition={{ duration: 0.3 }}>
              <FilesList
                files={searchFiles}
                viewMode={VIEW_MODES.LIST}
                loading={false}
                handleLink={handleLink}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </PortalModal>
  )
}
