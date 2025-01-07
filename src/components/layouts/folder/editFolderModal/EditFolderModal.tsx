import React from "react";
import { Modal } from "../../../ui/modal/Modal";

interface EditFolderModalProps {
  close: () => void;
}

export const EditFolderModal: React.FC<EditFolderModalProps> = ({ close }) => {
  return <Modal>EditFolderModal</Modal>;
};
