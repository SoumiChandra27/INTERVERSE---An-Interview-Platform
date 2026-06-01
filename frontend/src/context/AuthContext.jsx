import {
  createContext,
  useState
} from "react";
export const AuthContext =
  createContext();
export const AuthProvider = ({
  children
}) => {
  const [user, setUser] =
    useState(null);
  const login = (data) => {
    localStorage.setItem(
      "token",
      data.access_token
    );
    localStorage.setItem(
      "user",
      JSON.stringify(data.user)
    );
    setUser(data.user);
  };
  const logout = () => {
    localStorage.removeItem(
      "token"
    );
    localStorage.removeItem(
      "user"
    );
    setUser(null);
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};