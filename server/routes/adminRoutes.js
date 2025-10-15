import express from "express"
import {userIsAdmin,getAdminDashboardData,getAllDashboardShowTime,getAllBookings} from "../controllers/adminController.js"


const router= express.Router();


router.get("/is-admin",userIsAdmin);
router.get("/dashboard",getAdminDashboardData);
router.get("/all-shows",getAllDashboardShowTime);
router.get("/all-bookings",getAllBookings);

export default router;