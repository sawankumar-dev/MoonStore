import express from "express"
import { fileURLToPath } from 'url';
import path from 'path';
import cookieParser from "cookie-parser";

import cors from 'cors';
import config from "./config/config.js";
import userRouter from "./routes/user.routes.js";
import vendorRouter from "./routes/vendor.routes.js";
import adminRouter from "./routes/admin.routes.js";
import productRouter from "./routes/product.routes.js";
import cartRouter from "./routes/cart.routes.js";

const app = express();
// 1. ES Module mein __dirname ko aise banate hain:
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
    
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173", 
    credentials: true,
     methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}))
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))

//  Sahi aur Standard Tarika
app.use("/api/v1", productRouter)
app.use("/api/v1/cart", cartRouter)
app.use("/api/v1", userRouter); 
app.use("/api/v1", vendorRouter); 
app.use("/api/v1", adminRouter)

if(config.NODE_ENV === 'production') {
    const buildPath = path.join(__dirname, '../../frontend/dist');

    app.use(express.static(buildPath))
    app.get("*any", (req, res) =>{
        res.sendFile(path.join(buildPath, 'index.html'))
    })
} else {
    app.get("/", (req, res) => {
        res.status(200).json({
            success: true,
            message: "Server is healthy"
        })
    })
}

export default app;