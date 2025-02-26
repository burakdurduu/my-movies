const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const getPopularMovies = async () => {
  const url = `${BASE_URL}/movie/popular`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${TMDB_API_KEY}`,
    },
  };

  const res = await fetch(url, options);
  const data = await res.json();
  const movies = data.results;
  return movies;
};

export const getFavoriteMovies = async () => {
  const url = `/api/movie/favorites`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  };

  const res = await fetch(url, options);
  const data = await res.json();
  const movies = data.results;
  return movies;
};
