// import { Service } from "./Service";
// import { useService } from "../services/Injection";
import axios from "axios";

export function UserService() {
  // const context = useService(Service)

  const login = async (pseudo, password) => {
    const result = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/user/login/`,
      { pseudo, password }
    );
    if (result.data.profileActive) {
      localStorage.setItem("tetrisGame", result.data.token);
    }
  };

  const signIn = async (userInfos) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/signIn/`,
        userInfos
      );
      const userLocal = res.data.token;
      localStorage.setItem("tetrisGame", userLocal);
      return res;
    } catch (error) {
      console.error(error);
    }
  };

  return {
    login,
    signIn,
  };
}
