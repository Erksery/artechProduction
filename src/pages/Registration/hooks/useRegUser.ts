import api from "../../../api/api";
import { AxiosError, AxiosResponse } from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store";
import { setUserData } from "../../../store/slices/user";
import { User } from "../../../interfaces/user";

interface RegistrationData {
  login: string;
  password: string;
}

interface RegistrationResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export const useRegUser = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const registration = async (value: RegistrationData) => {
    setLoading(true);

    try {
      const resData: AxiosResponse<RegistrationResponse> = await api.post(
        "/auth/register",
        {
          login: value.login,
          password: value.password,
        }
      );
      localStorage.setItem("refreshToken", resData.data.refreshToken);
      dispatch(setUserData(resData.data.user));
      return { success: true };
    } catch (err: unknown) {
      const axiosError = err as AxiosError<{ message?: string }>;
      return {
        success: false,
        error: axiosError.response?.data?.message || "Ошибка регистрации",
      };
    } finally {
      setLoading(false);
    }
  };

  return { registration, loading };
};
