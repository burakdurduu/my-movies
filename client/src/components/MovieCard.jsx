import useAddFavorites from "../hooks/useAddFavorites";

function MovieCard({ movie }) {
  const { loading, add } = useAddFavorites();

  const handleClick = (e) => {
    e.preventDefault();
    add(movie);
  };

  return (
    <div className="movie-card">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        className="movie-cover"
        alt={movie.title}
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
          <button className="btn btn-outline-info btn-sm" formAction="/details">
            Details
          </button>
          <button
            className="btn btn-gold btn-sm btn-add-watchlist"
            type="submit"
            onClick={handleClick}
            hidden={loading}
          >
            Add Favorites
          </button>
          {/* <button className="btn btn-outline-danger btn-sm" formAction="/delete">Delete</button> */}
        </form>
      </div>
    </div>
  );
}

export default MovieCard;
