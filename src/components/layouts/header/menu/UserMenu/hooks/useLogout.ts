import axios from "axios";

export const useLogout = () => {
  const logout = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      const resData = await axios.delete("/api/auth/logout", {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      });
      localStorage.removeItem("refreshToken");
      location.reload();
      console.log(resData);
    } catch (err) {
      console.error("Ошибка при попытке выхода из аккаунта", err);
    }
  };
  return {
    logout,
  };
};
