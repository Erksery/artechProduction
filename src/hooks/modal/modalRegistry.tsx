import { ReactNode } from 'react'

import { AddFileModal } from '@components/layouts/file/modals/insert/AddFileModal'
import { FileViewModal } from '@components/layouts/file/modals/view/FileViewModal'
import { EditFolderModal } from '@components/layouts/folder/modals/edit/EditFolderModal'
import { AddFolderModal } from '@components/layouts/folder/modals/insert/AddFolderModal'
import { PropertiesFolder } from '@components/layouts/folder/modals/properties/PropertiesFolder'
import { SearchModal } from '@components/layouts/header/modal/search/SearchModal'
import { SuccessModal } from '@components/ui/alert/success/SuccessModal'

export const modalRegistry: Record<string, (props?: any) => ReactNode> = {
  fileView: props => <FileViewModal {...props} />,
  success: props => <SuccessModal {...props} />,
  fileSearch: props => <SearchModal {...props} />,
  insertFileModal: props => <AddFileModal {...props} />,
  insertFolderModal: props => <AddFolderModal {...props} />,
  editFolderModal: props => <EditFolderModal {...props} />,
  propertiesFolder: props => <PropertiesFolder {...props} />
}
