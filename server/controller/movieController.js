import prisma from "../db/prisma.js";

export const addFavorites = async (req, res) => {
  const movieData = req.body.movieData;
  const authUserId = req.user.id;
  try {
    const favoriteMovie = await prisma.movie.create({
      data: {
        title: movieData.title,
        poster_path: movieData.poster_path,
        release_date: movieData.release_date,
        overview: movieData.overview,
        vote_average: movieData.vote_average,
        vote_count: movieData.vote_count,
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
    res.status(200).json({ movies: favoriteMovies });
  } catch (error) {
    console.log("Error in getFavorites controller", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
