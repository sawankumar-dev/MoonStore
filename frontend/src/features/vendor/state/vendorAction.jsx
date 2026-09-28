import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../config/api";

// ==========================================
// 1. Create New Product Action (Multipart Form-Data)
// ==========================================
export const createNewProductAction = createAsyncThunk(
    "vendor/createNewProduct",
    async (productFormData, { rejectWithValue }) => {
        try {
            console.log("Sending multipart data node to product storage API...");
            
            // 🔴 Note: File upload ke waqt custom headers lagane ki zaroorat nahi hoti, 
            // Axios FormData object ko dekh kar boundary aur headers khud set kar leta hai.
            const response = await api.post("/products/add", productFormData);
            
            return response.data.data; // Backend ka created product payload return kiya
        } catch (error) {
            console.error("💥 Launch Product Thunk Error:", error.response?.data);
            return rejectWithValue(
                error.response?.data?.message || "Failed to catalog fresh inventory node"
            );
        }
    }
);

// ==========================================
// 2. Fetch Active Vendor's Own Products
// ==========================================
export const getVendorProductsAction = createAsyncThunk(
    "vendor/getVendorProducts",
    async (_, { rejectWithValue }) => {
        try {
            // Yeh API sirf unhi products ko nikalegi jo logged-in vendor ke hain
            const response = await api.get("/vendor/my-products"); // Iska backend route hum verifyJwt ke sath link karenge
            return response.data.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to load inventory log stream"
            );
        }
    }
);

// ==========================================
// 3. Delete Vendor Product Engine
// ==========================================
export const deleteVendorProductAction = createAsyncThunk(
    "vendor/deleteVendorProduct",
    async (productId, { rejectWithValue }) => {
        try {
            // URL params me direct product ID bhej rahe hain delete ke liye
            const response = await api.delete(`/products/delete/${productId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Product deletion execution failed"
            );
        }
    }
);

// ==========================================
// 4. Get Vendor Dashboard KPI Analytics
// ==========================================
export const getVendorDashboardStatsAction = createAsyncThunk(
    "vendor/getVendorDashboardStats",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get("/vendor/dashboard-stats");
            return response.data.data; // Counters map metrics returned
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to sync overview stats parameters"
            );
        }
    }
);
