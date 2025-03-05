import prisma from "../db/prisma.js";

export const addFavorites = async (req, res) => {
  const { movieData } = req.body;
  const authUserId = req.user.id;
  console.log("Adding movie:", {
    id: movieData.id,
    tmdb_id: movieData.tmdb_id,
    title: movieData.title,
  });
  try {
    const favoriteMovie = await prisma.movie.create({
      data: {
        title: movieData.title,
        poster_path: movieData.poster_path,
        release_date: movieData.release_date,
        overview: movieData.overview,
        vote_average: movieData.vote_average,
        vote_count: movieData.vote_count,
        tmdb_id: String(movieData.tmdb_id || movieData.id),
        user_id: authUserId,
      },
    });
    console.log("Added Movie:", movieData.title);
    res
      .status(201)
      .json({ message: "Movie added favorites", data: favoriteMovie });
  } catch (error) {
    console.log("Error in addFavorites controller", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getFavorites = async (req, res) => {
  const authUserId = req.user.id;
  try {
    const favoriteMovies = await prisma.movie.findMany({
      where: { user_id: authUserId },
    });
    res.status(200).json({ results: favoriteMovies });
  } catch (error) {
    console.log("Error in getFavorites controller", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteFavoriteMovie = async (req, res) => {
  const { movieId } = req.body;
  try {
    const deletedMovie = await prisma.movie.delete({ where: { id: movieId } });
    console.log("Deleted Movie:", deletedMovie);
    res
      .status(201)
      .json({ message: "Movie deleted favorites", data: deletedMovie });
  } catch (error) {
    console.log("Error in deleteFavorites controller", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
