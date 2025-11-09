import fs from 'fs';
import path from 'path';
import "dotenv/config";
import { fileURLToPath } from 'url';
import Show from "./models/Show.js";
import News from './models/News.js';
import Trailer from './models/Trailer.js';
import mongoose from 'mongoose';

// 👇 Recreate __dirname manually
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 👇 Now __dirname works
const filePath = path.join(__dirname, 'data', 'data.json');
const shows = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

const newsFilePath = path.join(__dirname, 'data', 'data-news.json');
const news = JSON.parse(fs.readFileSync(newsFilePath, 'utf-8'));


const trailersFilePath = path.join(__dirname, 'data', 'data-trailers.json');
const trailers = JSON.parse(fs.readFileSync(trailersFilePath, 'utf-8'));

// connect to db;

mongoose.connect(process.env.MONGO_URI);

// importData 

const importData = async (type) => {
    try {
        if (type === 'shows') {
            await Show.create(shows);
            console.log("🎬 Shows data inserted successfully!");
        } else if (type === 'news') {
            await News.create(news);
            console.log("📰 News data inserted successfully!");
        } else if (type === 'trailers') {
            await Trailer.create(trailers);
            console.log("📰 Trailers data inserted successfully!");
        } else {
            console.log("⚠️ Please specify a valid type: shows | news");
        }
        process.exit();
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

const deleteData = async (type) => {
    try {
        if (type === 'shows') {
            await Show.deleteMany();
            console.log("🗑️ Shows data deleted successfully!");
        } else if (type === 'news') {
            await News.deleteMany();
            console.log("🗑️ News data deleted successfully!");
        } else if (type === 'trailers') {
            await Trailer.deleteMany();
            console.log("🗑️ Trailers data deleted successfully!");
        }
        else {
            console.log("⚠️ Please specify a valid type: shows | news");
        }
        process.exit();
    } catch (error) {
        console.error(err);
        process.exit(1);
    }
}

// Handle CLI Arguments
const [, , action, type] = process.argv;

if (action === '-i') {
    importData(type);
} else if (action === '-d') {
    deleteData(type);
} else {
    console.log("Usage:");
    console.log("  node seeder.js -i shows   → Import shows data");
    console.log("  node seeder.js -i news    → Import news data");
    console.log("  node seeder.js -d shows   → Delete shows data");
    console.log("  node seeder.js -d news    → Delete news data");
    process.exit();
}