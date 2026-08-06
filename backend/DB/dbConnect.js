import mongoose from 'mongoose';
import dotenv from "dotenv";
import dns from "node:dns"; // 1. Yeh naya import add karo

// 2. Node.js ko Google ka DNS use karne ke liye force karo (SRV error bypass)
dns.setServers(["8.8.8.8", "8.8.4.4"]); 

dotenv.config();

const connectDB = async () => {
   await mongoose.connect(process.env.MONGO_URI).then(() => {
        console.log("MongoDB connected successfully");
      
    }).catch((error) => {
        console.log("Connection Error:", error);
    });
};

export default connectDB