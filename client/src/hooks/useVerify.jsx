import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";

const useVerify = () => {
  const [loading, setLoading] = useState();
  const { setIsVerified } = useAuthContext();

  const verify = async (code) => {
    try {
      setLoading(true);
      const res = await fetch("/api/auth/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setIsVerified(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return { loading, verify };
};

export default useVerify;
