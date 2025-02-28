import MovieCard from "../components/MovieCard";
import { useMovieContext } from "../context/MovieContext";

function Favorites() {
  const { favMovies } = useMovieContext();

  return (
    <>
      <div className="movie-grid">
        {favMovies.map((movie, index) => (
          <MovieCard key={index} movie={movie} isFavoritesPage={true} />
        ))}
      </div>
    </>
  );
}

export default Favorites;
