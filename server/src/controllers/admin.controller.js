import Product from "../models/product.model.js";
import User from "../models/user.model.js";
import Vendor from "../models/vendor.model.js";
import ApiResponse from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getAllCustomers = async (req, res) => {
    try {
        const customers = await User.find({ role: 'customer' });
        return res.status(200).json({
            success: true,
            message: "User Fetched successfully!",
            customers
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error."
        })
    }
};

export const getAllVendors = async (req, res) => {
    try {
        const vendors = await Vendor.find({ status: "approved" }).populate({
            path: "user",
            select: "-password -refreshToken"
        });
        return res.status(200).json({
            success: true,
            message:"Vendors Fetched successfully.",
            vendors,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error."
        })
    }
};

export const getAdminDashboardStats = asyncHandler(async (req, res) => {
    const [totalCustomer, totalVendors, totalPendingRequests] = await Promise.all([
        User.countDocuments({ role: "customer" }),
        Vendor.countDocuments({ status: "approved" }),
        Vendor.countDocuments({status: "pending"}),
    ]);
    const stats = {
        totalCustomer,
        totalVendors,
        totalPendingRequests
    }
    return res.status(200).json(new ApiResponse(200, "Dashboard stats fetched successfully", stats))
})

export const deleteUser = asyncHandler(async (req, res) => {
    const { userId } =  req.params;
    const user = await User.findByIdAndDelete(userId);
    if(!user) {
        return res.status(404).json(new ApiResponse(404, "User not found"))
    }
    return res.status(200).json(new ApiResponse(200, "User created successfully!"))
})

export const getVendorProducts = asyncHandler(async (req, res) => {
    const { vendorId } = req.params;
    console.log(vendorId)
    // es vendor ki id ke sabhi products ko fetch karo and
    const products = await Product.find({ vendor: vendorId }).populate({
        path: "vendor",
    });
    if(!products) {
        return res.status(404).json(new ApiResponse(404, "Products not found", products))
    }
    return res.status(200).json(new ApiResponse(200, "Products of vendor fetched successfully!", products));
})
export const getVendorDetails = asyncHandler(async (req, res) => {
    const { vendorId } = req.params;
    const vendor = await Vendor.findById(vendorId).populate({
        path: "user",
        select: "-password -refreshToken"
    });
    if(!vendor) {
        return res.status(404).json(new ApiResponse(404, "Vendor nhi mila", null))
    }
    return res.status(200).json(new ApiResponse(200, "Vendor details fetched successfully!", vendor))
})
export const deleteVendor = asyncHandler(async (req, res) => {
    const { vendorId } = req.params;
    const { user: userId } = await Vendor.findById(vendorId);
    const user = await User.findById(userId)
    user.role = "customer"
    const vendor = await Vendor.findByIdAndDelete(vendorId);
    if(!vendor) {
        return res.status(404).json(new ApiResponse(404, "Vendor not found", null))
    }
    await user.save({ validateBeforeSave: false })
    return res.status(200).json(new ApiResponse(200, "Vendor delete ho gya", vendor))
})