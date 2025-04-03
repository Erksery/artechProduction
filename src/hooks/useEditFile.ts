import api from "../api/api";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { addFiles, deleteFile, updateFile } from "../store/slices/files";
import { useEffect, useRef, useState } from "react";

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
        dispatch(addFiles([resData.data]));
      } else {
        dispatch(updateFile(resData.data));
      }
    } catch (err) {
      console.log("Ошибка при редактировании файла", err);
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
