import mongoose from 'mongoose'
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import config from '../config/config.js'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
        required: true,
        lowerCase: true,
        unique: true,
    },
    password: {
        type: String,
        min: [6, "Minimum 6 characters required."],
        required: true,
        trim: true,
    },
    role: {
        type: String,
        enum: ["customer", "vendor", "admin"],
        default: "customer",
    },
    refreshToken: {
        type: String,
    }
}, { timestamps: true })

// Instance methods
userSchema.pre("save", async function () {
    if(!this.isModified("password")) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods.generateAccessToken = function() {
    const payload = {
        _id: this._id,
        email: this.email,
    }
    return jwt.sign(payload, config.ACCESS_TOKEN_SECRET, { expiresIn: config.ACCESS_TOKEN_EXPIRY })
};

userSchema.methods.generateRefreshToken = function() {
    const payload = {
        _id: this._id
    }
    return jwt.sign(payload, config.REFRESH_TOKEN_SECRET, { expiresIn: config.REFRESH_TOKEN_EXPIRY })
};  

const User = mongoose.model("User", userSchema);
export default User;