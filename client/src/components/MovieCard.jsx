import { useAuthContext } from "../context/AuthContext";
import { useMovieContext } from "../context/MovieContext";
import { useNavigate } from "react-router-dom";

function MovieCard({ movie }) {
  const { authUser } = useAuthContext();
  const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();
  const navigate = useNavigate();
  const favorite = authUser ? isFavorite(movie.tmdb_id || movie.id) : false;

  function onFavoriteClick(e) {
    e.preventDefault();
    if (authUser) {
      if (favorite) {
        const idToRemove = movie.tmdb_id ? movie.tmdb_id : movie.id;
        removeFromFavorites(idToRemove);
      } else {
        addToFavorites(movie);
      }
    } else {
      navigate("/login");
    }
  }

  return (
    <div className="relative h-full flex flex-col rounded-lg overflow-hidden bg-[#1a1a1a] transition-transform duration-200 hover:-translate-y-1">
      <div className="relative aspect-[2/3] w-full">
        <img
          src={
            movie.poster_path && movie.poster_path !== "no-poster"
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "./images/no-poster.jpg"
          }
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/80 opacity-0 hover:opacity-100 transition-opacity duration-200 flex flex-col justify-end p-4">
          <button
            onClick={onFavoriteClick}
            className={`absolute top-4 right-4 text-xl p-2 bg-black/50 rounded-full w-10 h-10 flex items-center justify-center transition-colors duration-200 hover:bg-black/80`}
          >
            <span style={{ color: favorite ? "#ef4444" : "white" }}>♥</span>
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-2 p-4">
        <h3 className="text-sm m-0 line-clamp-2">{movie.title}</h3>
        <p className="text-gray-400 text-xs">
          {movie.release_date?.split("-")[0]}
        </p>
      </div>
    </div>
  );
}

export default MovieCard;
