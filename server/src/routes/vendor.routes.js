import { Router } from 'express';
import { isAdmin, isVendor, verifyJwt } from '../middlewares/auth.middleware.js';
import { registerVendor, getAllPendingRequests,  } from "../controllers/vendor.controller.js"
import { createProduct, deleteVendorProduct, getVendorDashboardStats, getVendorProducts } from '../controllers/product.controller.js';
import { upload } from '../middlewares/multer.middleware.js';

const vendorRouter = Router()
vendorRouter.use(verifyJwt);
// routes/vendor.routes.js mein sabse upar add karein:
vendorRouter.get("/test-vendor", (req, res) => {
    return res.status(200).json({
        success: true,
        message: "Vendor router is working perfectly!"
    });
});

vendorRouter.post("/apply-request", registerVendor);
vendorRouter.post("/products/add", upload.array("images", 5), createProduct);
vendorRouter.get("/vendor/my-products", getVendorProducts);
vendorRouter.delete("/products/delete/:productId", deleteVendorProduct); // Dynamic path route param binded
vendorRouter.get("/vendor/dashboard-stats", getVendorDashboardStats);
// for admin
vendorRouter.get("/admin/requests", isAdmin, getAllPendingRequests);
// vendorRouter.post("/admin/action",isAdmin, );

export default vendorRouter