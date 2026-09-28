import jwt from "jsonwebtoken";
import config from "../config/config.js";
import User from "../models/user.model.js";

export const verifyJwt = async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken;
 
        if(!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized request matlab ki token nhi hai",
                token: token
            })
        }
        // token verify
        const decodedToken = jwt.verify(token, config.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decodedToken?._id).select('-password -refreshToken');
        if(!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid Access Token"
            })
        }
        req.user = user;
        next()
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: error.message || "Invalid access Token",
        })
    }
}

export const isAdmin = async (req, res, next) => {
    try {
        if(!req.user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: User not found in request"
            })
        };
        if (req.user.role !== "admin") {
            return res.status(403).json({
                success: false,
                message: `Access Denied: Only Admin can perform this action. Your role is ${req.user.role}`
            });
        }
        next()
    } catch (error) {
        return res.status(500).json({
            success:false,
            message: error.message || "Internal Server Error in Admin Middleware"
        })
    }
}
export const isVendor = async (req, res, next) => {
    try {
        if(!req.user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: User not found in request"
            })
        };
        if (req.user.role !== "vendor") {
            return res.status(403).json({
                success: false,
                message: `Access Denied: Only Vendor can perform this action. Your role is ${req.user.role}`
            });
        }
        next()
    } catch (error) {
        return res.status(500).json({
            success:false,
            message: error.message || "Internal Server Error in Vendor Middleware"
        })
    }
}