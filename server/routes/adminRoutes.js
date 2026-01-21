import express from "express"
import {userIsAdmin,getAdminDashboardData,getAllDashboardShowTime,getAllBookings, createSingleShow, updateShow, createShowTime, getAdminShowTimesByShow} from "../controllers/adminController.js"
import { requireAuth } from "@clerk/express";
import { requireAdmin } from "../middlewares/requireAdmin.js";

const router= express.Router();


router.get("/is-admin",requireAuth(),userIsAdmin);
router.get("/dashboard",requireAuth(),requireAdmin,getAdminDashboardData);
router.get("/all-shows",requireAuth(),getAllDashboardShowTime);
router.get("/all-bookings",requireAuth(),getAllBookings);
router.post("/",requireAuth(),createSingleShow);
router.put("/shows/:id",requireAuth(),updateShow);
router.post("/show-time",requireAuth(),createShowTime);
router.get("/show-times/:showId",getAdminShowTimesByShow);

export default router;