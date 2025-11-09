import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import ConnectDB from './config/db.js';
import { clerkMiddleware } from '@clerk/express';
import {serve} from "inngest/express";
import { inngest,functions } from './inngest/index.js';
import ShowRouter from "./routes/showRoutes.js";
import BookingRouter from "./routes/bookingRoutes.js";
import AdminRouter from "./routes/adminRoutes.js";
import UserRouter from "./routes/userRoutes.js";
import NewsRouter from "./routes/newsRoutes.js";
import ErrorHandler from "./middlewares/ErrorHandler.js";


const app = express();

app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

// routes 
app.use("/api/inngest", serve({client:inngest,functions}));
app.use("/api/shows", ShowRouter);
app.use("/api/booking",BookingRouter);
app.use("/api/admin",AdminRouter);
app.use("/api/user",UserRouter);
app.use("/api/news",NewsRouter);

app.use(ErrorHandler);

const PORT = process.env.PORT || 5000;

const startServer= async()=> {
  try {
    await ConnectDB();
    app.listen(PORT, ()=> {
      console.log(`server is running on ${PORT}`)
    })
    
  } catch (error) {
     console.log(`failed to start server`, error.message);
     process.exit(1);    
  }
}


startServer();
