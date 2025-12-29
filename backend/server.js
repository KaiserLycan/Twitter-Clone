import express from 'express';
import dotenv from 'dotenv';

import authRoutes from "./routes/auth.routes.js";
import connectMongoDB from "./db/connectMongoDB.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

console.log(process.env.MONGO_URI)

//Routes
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("Server is running");
})

app.listen(PORT, async () => {
    console.log(`Server running on http://localhost:${PORT}`);
    await connectMongoDB();
})

