import api from "../api/api";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { deleteFile, updateFile } from "../store/slices/files";
import { useEffect, useRef, useState } from "react";
import { handleApiError } from "../utils/toast/handleApiError";
import { handleApiSuccess } from "../utils/toast/handleApiSuccess";

interface EditData {
  originalFilename?: string;
  folderId?: string;
}

export const useEditFile = () => {
  const [editing, setEditing] = useState(false);
  const [editValue, setEditValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch<AppDispatch>();

  const editMode = () => {
    setEditing((prev) => !prev);
  };

  const submitEditFile = (
    e: { preventDefault: () => void },
    folderId: string,
    fileId: string
  ) => {
    e.preventDefault();
    editFile(folderId, fileId, { originalFilename: editValue });
    editMode();
  };

  useEffect(() => {
    if (editing) {
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [editing]);

  const editFile = async (
    folderId: string,
    fileId: string,
    editData: EditData
  ) => {
    try {
      const resData = await api.patch(
        `/files/folder/${folderId}/file/${fileId}`,
        {
          editData,
        }
      );
      if (editData.folderId) {
        dispatch(deleteFile(fileId));
      } else {
        dispatch(updateFile(resData.data));
      }
      handleApiSuccess(resData, "Файл успешно отредактирован");
    } catch (err) {
      handleApiError(err, "Ошибка при редактировании файла");
    }
  };

  return {
    editFile,
    editMode,
    inputRef,
    editing,
    editValue,
    setEditValue,
    submitEditFile,
  };
};
