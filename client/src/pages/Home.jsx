import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import { getPopularMovies, searchMovie } from "../services/api";

function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  useEffect(() => {
    const loadMovies = async () => {
      try {
        setLoading(true);
        let movieData;
        if (query) {
          movieData = await searchMovie(query);
        } else {
          movieData = await getPopularMovies();
        }
        setMovies(movieData);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    loadMovies();
  }, [query]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  return (
    <div className="pt-20">
      {query && (
        <h2 className="text-2xl font-semibold mb-6 px-4">
          Search Results for `{query}`
        </h2>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-6 p-4">
        {movies.length > 0 ? (
          movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
        ) : (
          <h2 className="text-xl col-span-full text-center">
            No movies found.
          </h2>
        )}
      </div>
    </div>
  );
}

export default Home;
