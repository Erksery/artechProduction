import { ReactNode } from "react";

import { SearchModal } from "@components/layouts/header/modal/search/SearchModal";
import { FileViewModal } from "@components/layouts/file/modals/view/FileViewModal";
import { SuccessModal } from "@components/ui/alert/success/SuccessModal";
import { AddFileModal } from "@components/layouts/file/modals/insert/AddFileModal";
import { AddFolderModal } from "@components/layouts/folder/modals/insert/AddFolderModal";
import { EditFolderModal } from "@components/layouts/folder/modals/edit/EditFolderModal";
import { PropertiesFolder } from "@components/layouts/folder/modals/properties/PropertiesFolder";

export const modalRegistry: Record<string, (props?: any) => ReactNode> = {
  fileView: (props) => <FileViewModal {...props} />,
  success: (props) => <SuccessModal {...props} />,
  fileSearch: (props) => <SearchModal {...props} />,
  insertFileModal: (props) => <AddFileModal {...props} />,
  insertFolderModal: (props) => <AddFolderModal {...props} />,
  editFolderModal: (props) => <EditFolderModal {...props} />,
  propertiesFolder: (props) => <PropertiesFolder {...props} />,
};
