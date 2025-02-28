import { createContext, useContext, useEffect, useState } from "react";
import {
  getFavoriteMovies,
  deleteFavorite,
  addFavorites,
} from "../services/api";

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieContextProvider = ({ children }) => {
  const [favMovies, setFavMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFavorites = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const favorites = await getFavoriteMovies();
      setFavMovies(favorites);
    } catch (error) {
      setError(error.message);
      console.error("Failed to fetch favorites: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteMovie = async (movieId) => {
    try {
      await deleteFavorite(movieId);
      setFavMovies((prevMovies) =>
        prevMovies.filter((movie) => movie.id !== movieId)
      );
    } catch (error) {
      console.error("Failed to delete movie: ", error);
    }
  };

  const handleAddMovie = async (movie) => {
    try {
      const addedMovie = await addFavorites(movie);
      setFavMovies((prevMovies) => [...prevMovies, addedMovie]);
    } catch (error) {
      console.error("Failed to add movie: ", error);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <MovieContext.Provider
      value={{
        favMovies,
        isLoading,
        error,
        setFavMovies,
        refreshFavorites: fetchFavorites,
        handleDeleteMovie,
        handleAddMovie,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};
