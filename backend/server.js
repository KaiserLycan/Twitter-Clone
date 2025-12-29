import express from 'express';
import dotenv from 'dotenv';

import authRoutes from "./routes/auth.routes.js";
import connectMongoDB from "./db/connectMongoDB.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // to parse json data
app.use(express.urlencoded({ extended: true })); // to parse form data
app.use(cookieParser()); // to parse cookie

console.log(process.env.MONGO_URI)

//Routes
app.use("/api/auth", authRoutes);

app.listen(PORT, async () => {
    console.log(`Server running on http://localhost:${PORT}`);
    await connectMongoDB();
})

