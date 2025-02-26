import { useState } from "react";

export const useAddFavorites = () => {
  const [loading, setLoading] = useState(false);

  const add = async (movie) => {
    try {
      setLoading(true);
      const res = await fetch("/api/movie/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ movieData: movie }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error);
      console.log("Movie added favorites", data);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, add };
};

export default useAddFavorites;
