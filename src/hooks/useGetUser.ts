import { AxiosResponse } from "axios";
import api from "../api/api";
import { User } from "../interfaces/user";
import { useCallback, useState } from "react";

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
      console.log("Ошибка при получении пользователя");
    }
  }, []);

  return { getUser, userData };
};
