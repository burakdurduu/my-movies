import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import { getFavoriteMovies } from "../services/api";

function Favorites() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const loadFavoriteMovies = async () => {
      try {
        const favoriteMovies = await getFavoriteMovies();
        setMovies(favoriteMovies);
      } catch (err) {
        console.log(err);
      }
    };
    loadFavoriteMovies();
  }, []);
  return (
    <>
      <div className="movie-grid">
        {movies.map((movie, index) => (
          <MovieCard key={index} movie={movie} />
        ))}
      </div>
    </>
  );
}

export default Favorites;
