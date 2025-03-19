import api from "../../../../../../api/api";

export const useLogout = () => {
  const logout = async () => {
    try {
      const resData = await api.delete("/auth/logout");
      console.log(resData);
    } catch (err) {
      console.error("Ошибка при попытке выхода из аккаунта", err);
    }
  };
  return {
    logout,
  };
};
