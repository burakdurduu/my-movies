import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext({
  authUser: null,
  setAuthUser: () => {},
  isLoading: true,
});

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const fetchAuthUser = async () => {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error);
        }
        setAuthUser(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAuthUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ authUser, setAuthUser, isVerified, setIsVerified, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
