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

export const searchMovie = async (query) => {
  const url = `${BASE_URL}/search/movie?query=${encodeURIComponent(query)}`;
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

export const deleteFavorite = async (movieId) => {
  const res = await fetch("/api/movie/delete", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ movieId: movieId }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error);
  console.log("Movie deleted favorites", data);
};

export const addFavorites = async (movie) => {
  const res = await fetch("/api/movie/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      movieData: {
        ...movie,
        tmdb_id: JSON.stringify(movie.id),
      },
    }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error);
  console.log("Movie added favorites", data);
  return data.data;
};
