import Product from "../models/product.model.js";
import Vendor from "../models/vendor.model.js";
import { uploadToImageKit } from "../service/image.service.js";
import ApiResponse from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createProduct = asyncHandler(async (req, res) => {
    const { title, description, price, category, stock } = req.body;
    // yahan par dikkat hai yahan par tumko vendor ki id leni hai
    const userId = req.user._id;
    // find vendor by userid
    const vendor = await Vendor.findOne({ user:   userId})
    if(!vendor) {
        return res.status(403).json(new ApiResponse(403, "You can not create products", null))
    }
    const vendorId = vendor._id;
    console.log("--- DEBUG DATA START ---");
    console.log("Body Data:", req.body);
    console.log("Files Data:", req.files);
    console.log("--- DEBUG DATA END ---");

    // Validation check
    if(!title || !description || !price || !category) {
        return res.status(422).json({
            success: false,
            message: "Please fill all required standard fields"
        });
    }

    // 2. Check karein ki images frontend se aai hai ya nhi
    if(!req.files || req.files.length === 0) {
        return res.status(400).json({
            success: false,
            message: "At least one product image is required"
        });
    }

    // 3. sari images ka loop chala kar imagekit par upload karo
    const imageUrls = [];
    for(const file of req.files) {
        // ✅ Fixed camelCase mistake: originalName to originalname
        const uniqueFileName = `product_${Date.now()}_${file.originalname}`;
        
        const uploadedUrl = await uploadToImageKit(file.buffer, uniqueFileName);
        console.log(uploadedUrl)
        imageUrls.push(uploadedUrl);
    }

    const newProduct = await Product.create({
        vendor: vendorId,
        title,
        description,
        price: Number(price),
        category,
        stock: stock ? Number(stock) : 0,
        images: imageUrls
    });

    return res.status(201).json({
        success: true,
        message: "Product listed successfully on the marketplace!",
        data: newProduct
    });
});


// ==========================================
// 1. Get Logged-In Vendor's Own Products
// ==========================================
export const getVendorProducts = async (req, res) => {
    try {
        const userId = req.user?._id; // verifyJwt se aayega

        // Pehle check karein ki yeh user khud ek approved vendor hai ya nahi
        const vendor = await Vendor.findOne({ user: userId, status: "approved" });
        if (!vendor) {
            return res.status(403).json({
                success: false,
                message: "Access Denied: You are not a verified vendor"
            });
        }

        // Is vendor ke saare products dhoondein
        const products = await Product.find({ vendor: vendor._id }).sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: products.length,
            data: products
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Failed to fetch vendor products catalog"
        });
    }
};

// ==========================================
// 2. Delete Vendor's Specific Product
// ==========================================
export const deleteVendorProduct = async (req, res) => {
    try {
        const { productId } = req.params; // URL parameters se ID nikali
        const userId = req.user?._id;

        // 1. Check if vendor profile exists
        const vendor = await Vendor.findOne({ user: userId, status: "approved" });
        if (!vendor) {
            return res.status(403).json({
                success: false,
                message: "Access Denied: You are not an approved vendor"
            });
        }

        // 2. Product ko dhoondein
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found inside the inventory matrix"
            });
        }

        // 🚨 Security Check: Check karein ki product isi vendor ka hai ya nahi!
        // Kisi aur vendor ka product delete karne se rokne ke liye yeh zaroori hai
        if (product.vendor.toString() !== vendor._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized: You can only delete your own store products"
            });
        }
        
        // 3. Delete from database
        await Product.findByIdAndDelete(productId);

        // Note: Future me aap yahan se ImageKit ki file delete karne ka logic bhi code kar sakte hain response id se

        return res.status(200).json({
            success: true,
            message: "Product removed from marketplace live logs successfully"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Product deletion pipeline failed"
        });
    }
};

// ==========================================
// 3. Get Vendor Dashboard KPI Analytics Stats
// ==========================================
export const getVendorDashboardStats = async (req, res) => {
    try {
        const userId = req.user?._id;

        // Get vendor identity node mapping
        const vendor = await Vendor.findOne({ user: userId, status: "approved" });
        if (!vendor) {
            return res.status(403).json({
                success: false,
                message: "Access Denied: Core profile is not an active merchant node"
            });
        }

        // Parallely multi-queries operations processing
        const [totalProducts, outOfStockAlerts] = await Promise.all([
            Product.countDocuments({ vendor: vendor._id }),
            Product.countDocuments({ vendor: vendor._id, stock: 0 }) // Kitne products zero stock par hain
        ]);

        // Dashboard quick summary analytics object setup
        const vendorStats = {
            totalProducts,
            outOfStockAlerts,
            totalOrders: 0,   // Future orders integration tracking placeholder
            totalEarnings: 0  // Future payments accounting tracker fallback mockup
        };

        return res.status(200).json({
            success: true,
            data: vendorStats,
            message: "Vendor KPI statistics synced successfully"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Failed to parse dashboard overview counters"
        });
    }
};
// ==========================================
// 4. Get All Products
// ==========================================
export const getAllProducts = asyncHandler(async (req, res) => {
    console.log("Fetching all marketplace products logs...");
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    // 1. Fetch products with exact nested profile information paths
    const allProducts = await Product.find()
        .populate({
            path: "vendor",
            select: "shopName status", // Dukan ka naam aur verified status
            populate: {
                path: "user",
                select: "name email" // Owner ka name aur email
            }
        })
        .sort({ createdAt: -1 }) // Naye products sabse pehle dikhenge home page par
        .limit(limit)
        .skip(skip)
    const totalProduct = await Product.countDocuments()
    // 2. Safe Guard Check
    if (!allProducts) {
        return res.status(404).json({
            success: false,
            message: "No products found in the marketplace index",
        });
    }
    // 3. Send Standard Structured Response
    return res.status(200).json({
        success: true,
        count: allProducts.length, // Frontend layout calculation ke liye useful hai
        products: allProducts,
        total: totalProduct,
    });
});
 
// 5. Get Single Product
export const getSingleProduct = asyncHandler(async (req, res) => {
    const { productId } = req.params;
    const product = await Product.findById(productId)
    if(!product) {
        return res.status(404).json({
            success: false,
            message: "Product not found",
        })
    }
    return res.status(200).json({
        success: true,
        message: "Product fetched successfully!",
        product
    })
})
















