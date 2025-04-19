import { AxiosResponse } from "axios";
import api from "../api/api";
import { User } from "../interfaces/user";
import { useCallback, useState } from "react";
import { handleApiError } from "../utils/toast/handleApiError";

type UserResponse = User;

export const useGetUser = () => {
  const [userData, setUserData] = useState<User | null>(null);
  const getUser = useCallback(async (userId: string) => {
    try {
      const resData: AxiosResponse<UserResponse> = await api.get(
        `/auth/${userId}`
      );
      setUserData(resData.data);
    } catch (err) {
      handleApiError(err, "Не удалось получить данные пользователя");
    }
  }, []);

  return { getUser, userData };
};
