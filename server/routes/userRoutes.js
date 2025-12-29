import express from "express"
import {userBooking, toggleFavorite, getFavorites} from "../controllers/userController.js";
import { requireAuth } from "@clerk/express";


const router= express.Router();


router.get("/booking",userBooking);
router.post("/favorite",requireAuth(), toggleFavorite);
router.get("/favorites", getFavorites);

export default router;