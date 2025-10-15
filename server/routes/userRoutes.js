import express from "express"
import {userBooking, addFavorite, updateFavorite, getFavorites} from "../controllers/userController.js"


const router= express.Router();


router.get("/booking",userBooking);
router.post("/add-favorite", addFavorite);
router.post("/update-favorite",updateFavorite);
router.get("/favorites", getFavorites);

export default router;