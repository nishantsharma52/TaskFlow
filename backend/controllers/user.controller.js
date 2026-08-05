import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator";
import { User } from "../models/user.model.js"


export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All Fields are required",
                success: false
            })
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({
                message: "Please enter a valid email",
                success: false,
            });
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: "User Already exist with this email",
                success: false,
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            name,
            email,
            password: hashedPassword,
        })
        return res.status(201).json({
            message: "Account Created Successfully",
            success: true,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to register",
            success: false
        })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "All fields are required",
                success:false
            })
        }
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({
                message: "Incorrect Email and Password",
                success:false,
            })
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password)
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect Email and Password",
                 success:false,
            })
        }
        // JWT Token
        const token = jwt.sign(
            {
                id: user._id,
            },
            process.env.SECRET_KEY,
            {
                expiresIn: "1d",
            }
        );

        // Cookie
        res.cookie("token", token, {
            httpOnly: true,
            maxAge:  24 * 60 * 60 * 1000,
            // secure: false, 
            sameSite: "lax",
        });

        return res.status(200).json({
            message: "Login Successfully",
            success: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
            token,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to login",
            success: false
        })
    }
}

export const logout = async (req,res)=>{
    try {
        return res.status(200).cookie("token","", {maxAge:0}).json({
            message:"Logout Successfully",
            success:true,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"failed to logout",
            success:false,
        })
        
        
    }
}
export const getProfile = async (req, res) => {
    try {
        return res.status(200).json({
            success: true,
            user: req.user,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch profile",
        });
    }
};