import axios from "axios";
import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../../store";

interface getSearchFilesProps {
  value: string;
  location: string;
}

export const useSearchFile = () => {
  const [searchFiles, setSearchFiles] = useState([]);
  const folderId = useSelector(
    (state: RootState) => state.folders.activeFolder
  );

  const getSearchFiles = useCallback(
    async (searchValue: getSearchFilesProps) => {
      try {
        if (!searchValue.value.trim()) return;

        const res = await axios.get("/api/search", {
          params: {
            value: searchValue.value,
            location: searchValue.location,
            id: folderId,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setSearchFiles(res.data);
      } catch (err) {
        console.error("Ошибка при запросе поиска файлов:", err);
      }
    },
    [folderId]
  );

  return { getSearchFiles, searchFiles };
};
