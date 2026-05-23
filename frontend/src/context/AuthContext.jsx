import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem("userInfo")) || null,
  );

  // LOGIN

  const login = (data) => {
    localStorage.setItem("userInfo", JSON.stringify(data));

    setUserInfo(data);
  };

  // LOGOUT

  const logout = () => {
    localStorage.removeItem("userInfo");

    setUserInfo(null);
  };

  return (
    <AuthContext.Provider
      value={{
        userInfo,

        login,

        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// CUSTOM HOOK

export const useAuth = () => {
  return useContext(AuthContext);
};
