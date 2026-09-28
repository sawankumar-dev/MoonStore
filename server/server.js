import app from "./src/app.js";
import { connectToMongoDB } from "./src/config/db.js";

// 1. localhost की जगह 127.0.0.1 का उपयोग करें
connectToMongoDB()
.then(() => {
    console.log("Db is connected successfully!");
    
    // 2. इसे पोर्ट 3000 से बदलकर 5000 करें ताकि यह आपके React App से मैच करे
    app.listen(5000, () => {
        console.log("Server is running on port 5000...")
    })
})
.catch((err) => {
    console.error("MongoDB connection error:", err);
});
