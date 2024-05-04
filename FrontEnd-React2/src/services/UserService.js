import axios from "axios";

export function UserService() {
  const login = async (pseudo, password) => {
    const result = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/user/login/`,
      { pseudo, password }
    );

    console.log("result", result);
    if (result.data.user) {
      localStorage.setItem("tetrisGame", result.data.token);
    }
  };

  const signIn = async (userInfos) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/signIn/`,
        userInfos
      );

      console.log("res signIn", res);

      const userLocal = res.data.token;
      localStorage.setItem("tetrisGame", userLocal);

      return res.status;
    } catch (error) {
      console.error(error);
    }
  };

  const checkValidityToken = async (token) => {
    try {
      const verifiedToken = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/validityToken`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("verifiedToken", verifiedToken);
      return verifiedToken.data;
    } catch (err) {
      console.error(err);
    }
  };

  return {
    login,
    signIn,
    checkValidityToken,
  };
}
