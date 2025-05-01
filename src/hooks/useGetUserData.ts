import { useCallback, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { setUserData } from "../store/slices/user";
import api from "../api/api";
import { AxiosResponse } from "axios";
import { User } from "../interfaces/user";
import { API_ROUTES } from "../api/routes";
import { useLocation, useNavigate } from "react-router-dom";
import { handleApiError } from "../utils/toast/handleApiError";

type ProfileResponse = User;

export const useGetUserData = () => {
  const navigateRef = useRef(useNavigate());
  const dispatch = useDispatch<AppDispatch>();

  const location = useLocation();

  const isPublic = location.pathname.startsWith("/shared");

  const getUser = useCallback(async () => {
    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken && !isPublic) {
      navigateRef.current("/sign");
      console.log("Отсутствует токен авторизации");
      return;
    }
    try {
      const resData: AxiosResponse<ProfileResponse> = await api.get(
        API_ROUTES.PROFILE,
        {
          withCredentials: true,
        }
      );
      dispatch(setUserData(resData.data));
    } catch (err) {
      // navigateRef.current("/sign");
      handleApiError(err, "Ошибка авторизации");
    }
  }, [dispatch]);

  useEffect(() => {
    getUser();
  }, []);

  return getUser;
};
