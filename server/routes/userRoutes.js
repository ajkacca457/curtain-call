import express from "express"
import {userBooking, toggleFavorite, getFavorites} from "../controllers/userController.js"


const router= express.Router();


router.get("/booking",userBooking);
router.post("/favorite", toggleFavorite);
router.get("/favorites", getFavorites);

export default router;