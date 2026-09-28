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
import dns from "node:dns"

const app = express();
dns.setServers(["0.0.0.0", "8.8.8.8"]);

// 1. ES Module mein __dirname ko aise banate hain:
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(express.json());
// 2. सुरक्षित और सही CORS सेटिंग्स
const allowedOrigins = [
  'https://moonstore-ncu5.onrender.com', // आपका असली लाइव फ्रंटएंड यूआरएल
  'http://localhost:5173',               // लोकल डेवलपमेंट के लिए
  'http://localhost:3000',
  'http://localhost:5000',
  'https://onrender.com',
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('CORS policy: This origin is not allowed access.'));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
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