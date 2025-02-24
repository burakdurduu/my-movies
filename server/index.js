import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoute.js";
import movieRoutes from "./routes/movieRoute.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/movies", movieRoutes);

app.listen(PORT, () => {
  console.log(`Server is runnig on port: ${PORT}`);
});
