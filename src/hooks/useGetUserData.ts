import { useCallback, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { setUserData } from "../store/slices/user";
import api from "../api/api";
import { AxiosResponse } from "axios";
import { User } from "../interfaces/user";
import { API_ROUTES } from "../api/routes";
import { useNavigate } from "react-router-dom";

type ProfileResponse = User;

export const useGetUserData = () => {
  const navigateRef = useRef(useNavigate());
  const dispatch = useDispatch<AppDispatch>();

  const getUser = useCallback(async () => {
    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) {
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
      navigateRef.current("/sign");
      console.log(err);
    }
  }, [dispatch]);

  useEffect(() => {
    getUser();
  }, []);

  return getUser;
};
