import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import ConnectDB from './config/db.js';
import { clerkMiddleware } from '@clerk/express';
import {serve} from "inngest/express";
import { inngest,functions } from './inngest/index.js';


const app = express();

app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

app.get('/', (req, res) => {
    res.send('Welcome to the Curtain Call API');
});
app.use("/api/inngest", serve({client:inngest,functions}));

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
