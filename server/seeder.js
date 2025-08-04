import fs from 'fs';
import path from 'path';
import "dotenv/config";
import { fileURLToPath } from 'url';
import Show from "./models/Show.js";
import mongoose from 'mongoose';

// 👇 Recreate __dirname manually
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 👇 Now __dirname works
const filePath = path.join(__dirname, 'data', 'data.json');
const shows = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

// connect to db;

mongoose.connect(process.env.MONGO_URI);

// importData 

const importData=async()=> {
    try {
        await Show.create(shows);
        console.log("data injected successfully");
        process.exit();       
    } catch (error) {
        console.log(error);
    }
}

const deleteData=async()=> {
    try {
        await Show.deleteMany();
        console.log("data destroyed from database");
        process.exit();        
    } catch (error) {
        console.log(error);
    }
}

if(process.argv[2]==="-i") {
    importData();
} else if (process.argv[2]==="-d") {
    deleteData();
}