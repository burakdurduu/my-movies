import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import {
  addFavorites,
  deleteFavoriteMovie,
  getFavorites,
} from "../controller/movieController.js";

const router = express.Router();

router.post("/add", protectRoute, addFavorites);
router.get("/favorites", protectRoute, getFavorites);
router.delete("/delete", protectRoute, deleteFavoriteMovie);
export default router;
