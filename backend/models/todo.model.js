import mongoose from "mongoose";
// import { User } from "./user.model.js";

const todoSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
    },
    description:{
        type:String,
        trim:true,
    },
    status:{
        type:String,
        enum:["Pending", "Completed"],
        default:"Pending",
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },

},{timestamps:true})

export const Todo = mongoose.model("Todo" , todoSchema)