import express from "express"
import {userIsAdmin,getAdminDashboardData,getAllDashboardShowTime,getAllBookings, createSingleShow} from "../controllers/adminController.js"
import { requireAuth } from "@clerk/express";

const router= express.Router();


router.get("/is-admin",requireAuth(),userIsAdmin);
router.get("/dashboard",requireAuth(),getAdminDashboardData);
router.get("/all-shows",requireAuth(),getAllDashboardShowTime);
router.get("/all-bookings",getAllBookings);
router.post("/",requireAuth(),createSingleShow);


export default router;