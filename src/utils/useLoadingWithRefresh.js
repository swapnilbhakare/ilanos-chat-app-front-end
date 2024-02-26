import axios from "axios";
import { useEffect, useState } from "react";
import { api_url } from "./constant";
import { useDispatch } from "react-redux";
import { setAuth } from "../store/authSlice";

export const useLoadingWithRefresh = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`${api_url}users/refresh`, {
          withCredentials: true,
        });
        console.log(data);
        const userData = data?.data;
        if (userData.auth) {
          dispatch(setAuth(userData));
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [dispatch]);
  return { loading };
};
