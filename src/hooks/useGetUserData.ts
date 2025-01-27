import axios from "axios";
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { setUserData } from "../store/slices/user";

export const useGetUserData = () => {
  const dispatch = useDispatch<AppDispatch>();
  const getUser = useCallback(async () => {
    try {
      const res = await axios.get("/api/user/getProfile", {
        params: { token: localStorage.getItem("token") },
      });
      dispatch(setUserData(res.data.userData));
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    getUser();
  }, []);
};
