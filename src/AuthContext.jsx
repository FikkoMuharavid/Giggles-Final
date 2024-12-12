import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    isLoggedIn: false,
    accountType: null,
    data: null,
  });

  const getUserInfo = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token not found in localStorage");
      return;
    }

    const payload = token.split(".")[1];
    const decodedPayload = atob(payload);
    const userPayload = JSON.parse(decodedPayload);

    try {
      if (userPayload.role == "company") {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/company/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser({ isLoggedIn: true, accountType: response.data.user.role, data: response.data.user });
      } else {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/user/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser({ isLoggedIn: true, accountType: response.data.user.role, data: response.data.user });
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
      return null;
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  const login = (accountType) => {
    getUserInfo();
    console.log(accountType);
  };

  const logout = () => {
    setUser({ isLoggedIn: false, accountType: null, data: null });
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
