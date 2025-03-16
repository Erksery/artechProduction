import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { setUserData } from "../store/slices/user";
import api from "../api/api";
import axios from "axios";

export const useGetUserData = () => {
  const dispatch = useDispatch<AppDispatch>();
  const getUser = useCallback(async () => {
    try {
      const resData = await api.get("/auth/profile", {
        withCredentials: true,
        /*headers: {
          Authorization: `Bearer ${localStorage.getItem("refreshToken")}`,
        },*/
      });
      dispatch(setUserData(resData.data.userData));
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    getUser();
  }, []);
};
