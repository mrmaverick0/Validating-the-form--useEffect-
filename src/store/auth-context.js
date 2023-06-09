import { createContext, useEffect, useState } from "react";

const AuthContext = createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin:(email,password)=>{}
});
export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedLoggedInInfo = localStorage.getItem("isLoggedIn");
    if (storedLoggedInInfo === "1") {
      setIsLoggedIn(true);
    }
  }, []);
  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn", "1");
    setIsLoggedIn(false);
  };
  const loginHandler = () => {
    localStorage.setItem("isLoggedIn", "1");
    setIsLoggedIn(true);
  };
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
