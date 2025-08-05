import express from 'express';
import {getActiveShows} from "../controllers/showController.js";

const router= express.Router();

router.get("/active-shows",getActiveShows);


export default router;