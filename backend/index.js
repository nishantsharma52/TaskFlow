import express from "express";
import dotenv from "dotenv";
import connectDB from "./DB/dbConnect.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoutes from "./routes/user.routes.js"
import todoRoutes from "./routes/todo.routes.js"

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
connectDB();

// default middleware
app.use(cookieParser())
app.use(express.json())
app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}))
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))

//API
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/todo", todoRoutes )



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
