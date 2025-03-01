import { useAuthContext } from "../context/AuthContext";
import { useMovieContext } from "../context/MovieContext";
import { useNavigate } from "react-router-dom";

function MovieCard({ movie, isFavoritesPage }) {
  const { authUser } = useAuthContext();
  const { handleDeleteMovie, handleAddMovie, loading } = useMovieContext();
  const navigate = useNavigate();

  const handleAdd = (e) => {
    e.preventDefault();
    if (authUser) {
      handleAddMovie(movie);
    } else {
      navigate("/login");
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();
    if (authUser) {
      handleDeleteMovie(movie.id);
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="movie-card">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        className="movie-cover"
        alt={movie.title}
        onError={(e) => (e.target.src = "/images/no-poster.jpg")}
      />
      <div className="movie-content">
        <h3 className="text-gold fs-5 mb-1">
          {movie.title.length > 62
            ? movie.title.slice(0, 62) + "..."
            : movie.title}
        </h3>
        <p className="release-date mb-2">
          {movie.release_date
            ? movie.release_date.split("-")[0]
            : movie.release_date}
        </p>
        <form className="btn-container" method="POST">
          <input type="hidden" name="movieId" value={movie.id} />
          <input type="hidden" name="movieData" value={JSON.stringify(movie)} />
          {isFavoritesPage ? (
            <>
              <button
                className="btn btn-outline-info btn-sm"
                formAction="/details"
              >
                Details
              </button>
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={handleDelete}
              >
                Delete
              </button>
            </>
          ) : (
            <>
              <button
                className="btn btn-outline-info btn-sm"
                formAction="/details"
              >
                Details
              </button>
              <button
                className="btn btn-gold btn-sm btn-add-watchlist"
                type="submit"
                onClick={handleAdd}
                hidden={loading}
              >
                Add Favorites
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}

export default MovieCard;
