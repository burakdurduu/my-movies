import { createContext, useState, useContext, useEffect } from "react";
import {
  getFavoriteMovies,
  deleteFavorite,
  addFavorites,
} from "../services/api";

const MovieContext = createContext();
export const useMovieContext = () => useContext(MovieContext);

export const MovieContextProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const fetchFavorites = async () => {
    try {
      const favorites = await getFavoriteMovies();
      setFavorites(favorites);
    } catch (error) {
      console.error("Failed to fetch favorites: ", error);
    }
  };

  const addToFavorites = async (movie) => {
    try {
      const newFav = await addFavorites(movie);
      setFavorites((prev) => [...prev, newFav]);
    } catch (error) {
      console.error("Failed to add movie: ", error);
    }
  };

  const removeFromFavorites = async (movieId) => {
    try {
      const favoriteMovie = favorites.find(
        (movie) => String(movie.tmdb_id) === String(movieId)
      );
      if (!favoriteMovie) {
        throw new Error("Movie not found in favorites");
      }
      await deleteFavorite(favoriteMovie.id);
      setFavorites((prev) =>
        prev.filter((movie) => movie.id !== favoriteMovie.id)
      );
    } catch (error) {
      console.error("Failed to delete movie: ", error);
      throw error;
    }
  };

  const isFavorite = (tmdbMovieId) => {
    if (!tmdbMovieId) return false;
    return favorites.some(
      (movie) => String(movie.tmdb_id) === String(tmdbMovieId)
    );
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    refreshFavorites: fetchFavorites,
  };

  return (
    <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
  );
};
