import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const isAuthenticated = async (req, res, next) => {
    try {
        // Cookie se token nikalo
        const token = req.cookies.token;

        // Token nahi mila
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Please login first",
            });
        }

        // Token verify karo
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        // User database se nikalo
        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found",
            });
        }

        // User ko request me store kar do
        req.user = user;

        // Next controller par jao
        next();

    } catch (error) {
        console.log(error);
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        });
    }
};