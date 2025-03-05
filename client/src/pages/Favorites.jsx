import MovieCard from "../components/MovieCard";
import { useMovieContext } from "../context/MovieContext";

function Favorites() {
  const { favorites } = useMovieContext();

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-6 p-4 pt-20">
        {favorites.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </>
  );
}

export default Favorites;
