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

// 1. ES Module mein __dirname setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// 2. सुरक्षित और सही CORS सेटिंग्स
const allowedOrigins = [
  'https://moonstore-ncu5.onrender.com', // आपका असली लाइव फ्रंटएंड यूआरएल
  'http://localhost:5173',               // लोकल डेवलपमेंट के लिए
  'http://localhost:3000'
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

// 3. एपीआई राउट्स (API Routes)
app.use("/api/v1", productRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1", userRouter); 
app.use("/api/v1", vendorRouter); 
app.use("/api/v1", adminRouter);

// 4. प्रोडक्शन मोड में React Frontend को सही से सर्व (Serve) करना
// ध्यान दें: आपका सर्वर 'server/src/app.js' में है, इसलिए पाथ '../..' के बजाय सही पाथ होना चाहिए
if (process.env.NODE_ENV === 'production') {
    // बिलकुल सही रिलेटिव पाथ जो 'frontend/dist' तक पहुँचेगा
    const buildPath = path.resolve(__dirname, '../../frontend/dist');

    app.use(express.static(buildPath));
    
    // Express 4/5 में वाइल्डकार्ड राउट के लिए '*' का उपयोग होता है, '*any' गलत सिंटैक्स है
    app.get("*", (req, res) => {
        res.sendFile(path.join(buildPath, 'index.html'));
    });
} else {
    app.get("/", (req, res) => {
        res.status(200).json({
            success: true,
            message: "Server is healthy"
        });
    });
}

export default app;
