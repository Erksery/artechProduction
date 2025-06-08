import api from "@api";
import { AppDispatch, RootState } from "@store/index";
import { setUsers } from "@store/slices/user";
import { handleApiError } from "@utils/toast/handleApiError";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useGetUsers = () => {
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector((state: RootState) => state.user.users);
  const getUsers = async () => {
    try {
      const resData = await api.get("/admin/users", {
        params: {
          sortBy: "login",
        },
      });
      dispatch(setUsers(resData.data));
    } catch (err) {
      handleApiError(err, "Ошибка при получении списка пользователей");
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return { getUsers, users };
};
