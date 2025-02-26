import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import { getPopularMovies } from "../services/api";

function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
      } catch (err) {
        console.log(err);
      }
    };
    loadPopularMovies();
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
export default Home;
