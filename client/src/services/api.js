import axios from "axios";

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const getPopularMovies = async () => {
  const response = await axios.get(`${BASE_URL}/movie/popular`, {
    headers: {
      Authorization: `Bearer ${TMDB_API_KEY}`,
    },
  });
  const movies = response.data.results;
  return movies;
};
