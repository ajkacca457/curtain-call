import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import ConnectDB from './config/db.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to the Curtain Call API');
});

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
