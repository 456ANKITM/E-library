import express from "express";
import dotenv from "dotenv"
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js"
import bookRoutes from "./routes/bookRoutes.js"
import cors from "cors"
import cookieParser from "cookie-parser"
import connectCloudinary from "./config/cloudinary.js";
import Book from "./models/Book.js";


dotenv.config()

const PORT = process.env.PORT || 4000

const app = express();

await connectCloudinary();
await connectDB();

// middlewares 
app.use(express.json())
app.use(cookieParser())

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://e-library-5pit.vercel.app/"
  ],
  credentials: true,
}));

//Endpoints
app.get("/",(req, res)=>{
  res.send("Backend is up and running")
})
app.get("/test-db", async (req, res) => {
  try {
    const books = await Book.find();
    res.json({ success: true, books });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});
app.use("/api/auth", authRoutes)
app.use("/api/book", bookRoutes)

// const startServer = async () => {
//   try {
//     await connectDB()
//      app.listen(PORT, () => {
//       console.log(`Server running on port ${PORT}`);
//     });

//   } catch (error) {
//     console.error("Server failed to start:", error.message);
//   }
// }
// startServer()

export default app;