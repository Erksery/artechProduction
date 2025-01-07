import React from "react";
import { Modal } from "../../modal/Modal";

interface SuccessModalProps {
  close: () => void;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({ close }) => {
  return (
    <Modal>
      <div>SuccessModal</div>
    </Modal>
  );
};
