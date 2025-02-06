import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import axios from "axios";
import "dotenv/config";

const app = express();
const port = process.env.PORT || 3000;
const TMDB_API_KEY = process.env.TMDB_API_KEY;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const { Pool } = pg;
const connectionString = process.env.DB_URL;
const db = new Pool({
  connectionString: connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
});
db.connect();

app.get("/", async (req, res) => {
  const result = await db.query("SELECT * FROM movies;");
  res.render("index.ejs", { movies: result.rows });
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/add", async (req, res) => {
  const movieData = JSON.parse(req.body.movieData);
  try {
    await db.query(
      "INSERT INTO movies (title, poster_path, release_date, overview, vote_average, vote_count) VALUES ($1, $2, $3, $4, $5, $6);",
      [
        movieData.title,
        movieData.poster_path,
        movieData.release_date.split("-")[0],
        movieData.overview,
        movieData.vote_average.toFixed(1),
        movieData.vote_count,
      ]
    );
    console.log("Added Movie:", movieData.title);
    res.redirect("/");
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
});

app.post("/search", async (req, res) => {
  try {
    const movie_name = req.body.movie_name;
    const result = await axios.get(
      `https://api.themoviedb.org/3/search/movie`,
      {
        headers: {
          Authorization: `Bearer ${TMDB_API_KEY}`,
        },
        params: {
          query: movie_name,
        },
      }
    );
    const movies = result.data.results;
    res.render("search.ejs", { movies });
  } catch (error) {
    console.error("Error:", error);
    res.render("search.ejs", {
      error: "An error occurred while searching for a movie",
    });
  }
});

app.post("/delete", async (req, res) => {
  const id = req.body.movieId;
  try {
    await db.query("DELETE FROM movies WHERE id = $1", [id]);
    res.redirect("/");
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
