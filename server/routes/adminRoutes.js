import express from "express"
import {userIsAdmin,getAdminDashboardData,getAllDashboardShowTime,getAllBookings} from "../controllers/adminController.js"
import { requireAuth } from "@clerk/express";


const router= express.Router();


router.get("/is-admin",requireAuth(),userIsAdmin);
router.get("/dashboard",requireAuth(),getAdminDashboardData);
router.get("/all-shows",getAllDashboardShowTime);
router.get("/all-bookings",getAllBookings);

export default router;