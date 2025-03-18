import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useMovieContext } from "../context/MovieContext";

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const { refreshFavorites } = useMovieContext();

  const signup = async (email, password, name) => {
    try {
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, name }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error);
      setAuthUser(data);
      await refreshFavorites();
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, signup };
};

export default useSignup;
