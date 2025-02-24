import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { addFavorites, getFavorites } from "../controller/movieController.js";

const router = express.Router();

router.post("/add", protectRoute, addFavorites);
router.get("/get", protectRoute, getFavorites);
export default router;
