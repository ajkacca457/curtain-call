import express from "express"
import {userIsAdmin,getAdminDashboardData,getAllDashboardShowTIme,getAllBookings} from "../controllers/adminController.js"


const router= express.Router();


router.get("/is-admin",userIsAdmin);
router.get("/dashboard",getAdminDashboardData);
router.get("/all-shows",getAllDashboardShowTIme);
router.get("/all-bookings",getAllBookings);

export default router;