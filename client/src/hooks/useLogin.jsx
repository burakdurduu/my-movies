import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";

const useLogin = () => {
  const [loading, setLoading] = useState();
  const { setAuthUser } = useAuthContext();

  const login = async (email, password) => {
    try {
      setLoading(true);
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setAuthUser(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return { loading, login };
};

export default useLogin;
