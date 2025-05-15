import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../../store";
import api from "../../../../../../api/api";

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
        localStorage.setItem("searchValue", `${searchValue.value}`);
        localStorage.setItem("searchLocation", `${searchValue.location}`);
        const resData = await api.get(`/files/searchAllFiles/${folderId}`, {
          params: {
            searchValue: searchValue.value,
            location: searchValue.location,
          },
        });

        setSearchFiles(resData.data);
      } catch (err) {
        console.error("Ошибка при запросе поиска файлов:", err);
      }
    },
    [folderId]
  );

  return { getSearchFiles, searchFiles };
};
