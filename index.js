import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import axios from "axios";
import bcrypt from "bcrypt";
import passport from "passport";
import { Strategy } from "passport-local";
import GoogleStrategy from "passport-google-oauth2";
import session from "express-session";
import "dotenv/config";

const app = express();
const port = process.env.PORT || 3000;
const TMDB_API_KEY = process.env.TMDB_API_KEY;
const GOOGLE_PROJECT_NAME = process.env.GOOGLE_PROJECT_NAME;
const saltRounds = Number(process.env.SALT);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(passport.initialize());
app.use(passport.session());

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
  res.render("index.ejs", { movies: result.rows, user: req.isAuthenticated() });
});

app.get("/login", (req, res) => {
  res.render("login.ejs", { user: req.isAuthenticated() });
});

app.get("/register", (req, res) => {
  res.render("register.ejs", { user: req.isAuthenticated() });
});

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

app.get(
  "/auth/google/secrets",
  passport.authenticate("google", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

app.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

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
    res.render("search.ejs", { movies, user: req.isAuthenticated() });
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

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

app.post("/register", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;

  try {
    const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (checkResult.rows.length > 0) {
      req.redirect("/login");
    } else {
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          console.error("Error hashing password:", err);
        } else {
          const result = await db.query(
            "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
            [email, hash]
          );
          const user = result.rows[0];
          req.login(user, (err) => {
            console.log("success");
            res.redirect("/");
          });
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
});

passport.use(
  "local",
  new Strategy(async function verify(username, password, cb) {
    try {
      const result = await db.query("SELECT * FROM users WHERE email = $1 ", [
        username,
      ]);
      if (result.rows.length > 0) {
        const user = result.rows[0];
        const storedHashedPassword = user.password;
        bcrypt.compare(password, storedHashedPassword, (err, valid) => {
          if (err) {
            console.error("Error comparing passwords:", err);
            return cb(err);
          } else {
            if (valid) {
              return cb(null, user);
            } else {
              return cb(null, false);
            }
          }
        });
      } else {
        return cb("User not found");
      }
    } catch (err) {
      console.log(err);
    }
  })
);

passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `https://my-movies-76a1.onrender.com/auth/google/${GOOGLE_PROJECT_NAME}`,
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        console.log(profile);
        const result = await db.query("SELECT * FROM users WHERE email = $1", [
          profile.email,
        ]);
        if (result.rows.length === 0) {
          const newUser = await db.query(
            "INSERT INTO users (email, password) VALUES ($1, $2)",
            [profile.email, "google"]
          );
          return cb(null, newUser.rows[0]);
        } else {
          return cb(null, result.rows[0]);
        }
      } catch (err) {
        return cb(err);
      }
    }
  )
);

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  cb(null, user);
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
