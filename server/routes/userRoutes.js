import express from "express"
import {userBooking} from "../controllers/userController.js"


const router= express.Router();


router.get("/booking",userBooking);

export default router;