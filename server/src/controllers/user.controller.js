import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import config from "../config/config.js";

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if(!name || !email || !password) {
            return res.status(422).json({
                success: false,
                message: "Please provide name, email, password"
            })
        }
        
        // Check if user exists
        const userExists = await User.findOne({ email });
        if(userExists) {
            return res.status(409).json({
                success: false,
                message: "User already exists."
            })
        }

        // 👉 FIXED: Yahan 'new' keyword lagana zaroori hai
        const user = new User({
            name,
            email,
            password
        })

        // Tokens generate karein
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
        
        const options = {
            // Agar local mein test kar  hain aur config.NODE_ENV "development" hai, 
            // toh secure: false ho jayega jo local testing ke liye ekdum sahi hai.
            secure: config.NODE_ENV === "production",
            httpOnly: true, 
            sameSite:"lax"
        }

        user.refreshToken = refreshToken;
        
        // Database mein save karein
        await user.save()

        return res
            .status(201)
            .cookie('accessToken', accessToken, options)
            .cookie('refreshToken', refreshToken, options)
            .json({
                success: true,
                message: "User registered successfully.",
                user: {
                        id: user._id,
                        name: user.name,
                        email: user.email,
                        role: user.role,
                    }
            })   
    } catch (error) {
        console.error("Register Error:", error); // 💡 Yeh console log aapko terminal mein exact error dikhayega
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if(!email || !password ) {
            return res.status(422).json({
                success: false,
                message: "Please provide name, email, password"
            })
        }
        console.log(email, password)
        // user exists or not
        const user = await User.findOne({ email });
        if(!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            })
        }
        // verify password
        const isPassRight = await bcrypt.compare(password, user.password);
        if(!isPassRight) {
            return res.status(403).json({
                success: false,
                message: "Invalid credentials"
            })
        };
          // Dono Tokens Generate Karein
          const accessToken = user.generateAccessToken();
          const refreshToken = user.generateRefreshToken();

          user.refreshToken = refreshToken;
          await user.save()

            const options = {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production", // ✅ standard way
                sameSite: "lax"
            };

          return res
                .status(200)
                .cookie('accessToken', accessToken, options)
                .cookie('refreshToken', refreshToken, options)
                .json({
                    success: true,
                    message: "Logged in successfully",
                    user: {
                        id: user._id,
                        name: user.name,
                        email: user.email,
                        role: user.role,
                    }
                })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
export const refreshAccessToken = async (req, res) => {
    try {
         // 1. Cookie se incoming refresh token nikalein
         const incomingRefreshToken = req.cookies?.refreshToken; // Safe optional chaining
         if (!incomingRefreshToken) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized request: Refresh token missing"
            });
         }

         // 2. Token ko verify kro
         const decodedToken = jwt.verify(incomingRefreshToken, config.REFRESH_TOKEN_SECRET);

         // 3. Database se user find karo
         const user = await User.findById(decodedToken?._id);
         if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid refresh token: User not found"
            });
         }

         // 4. Check karein ki incomingRefreshToken and db vala token same hai ya nhi
         if (incomingRefreshToken !== user?.refreshToken) {
            return res.status(401).json({
                success: false,
                message: "Refresh token is expired or already used"
            });
         }

         // 5. New tokens generate kro
         const refreshToken = user.generateRefreshToken();
         const accessToken  = user.generateAccessToken();

         // Save new token back to database
         user.refreshToken = refreshToken;
         
         // ✅ Fixed: validateBeforeSave false kiya taaki password rehashing hooks trigger na hon
         await user.save({ validateBeforeSave: false });

         const options = {
            secure: config.NODE_ENV === "production",
            httpOnly: true,
            sameSite: "lax"
         };

         return res.status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json({
                success: true,
                message: "Access token refreshed successfully"
            });

    } catch (error) {
        console.log("💥 Refresh Token Controller Error:", error.message);
        
        // ✅ Fixed: Safe error tracking status codes mapping
        const statusCode = error.name === "JsonWebTokenError" || error.name === "TokenExpiredError" ? 401 : 500;
        
        return res.status(statusCode).json({
            success: false,
            message: statusCode === 401 ? "Invalid or expired refresh token" : "Internal server error during token refresh"
        });
    }
};


export const logoutUser = async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.user._id, {
            $set:{
                refreshToken: undefined
            }
        }, {new: true});
        const options = {
            httpOnly: true,
            secure: config.NODE_ENV === "production",
            sameSite:"lax"
        }
        return res
            .status(200)
            .clearCookie("accessToken", options)
            .clearCookie("refreshToken", options)
            .json({
                success: true,
                message: "User logged out successfully"
            })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Internal server error during logout"
        });
    }
};

export const getCurrentUser = (req, res) => {
    const { id, name, email, role } = req.user;
    try {
        return res.status(200).json({
            success: true,
            message: "User fetched successfully",
            user: {
                id,
                name,
                email,
                role
            }
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}