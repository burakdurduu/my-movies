import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { getPopularMovies, searchMovie } from "../services/api";
import { useSearchContext } from "../context/SearchContext";

function Home() {
  const [movies, setMovies] = useState([]);
  const { query } = useSearchContext();

  useEffect(() => {
    const loadMovies = async () => {
      try {
        if (query) {
          const movies = await searchMovie(query);
          setMovies(movies);
        } else {
          const popularMovies = await getPopularMovies();
          setMovies(popularMovies);
        }
      } catch (err) {
        console.log(err);
      }
    };
    loadMovies();
  }, [query]);

  return (
    <div className="movie-grid">
      {movies.length > 0 ? (
        movies.map((movie, index) => (
          <MovieCard key={index} movie={movie} isFavoritesPage={false} />
        ))
      ) : (
        <h2 className="text-not-found">No movies found.</h2>
      )}
    </div>
  );
}
export default Home;
