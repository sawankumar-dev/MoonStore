import { createSlice } from "@reduxjs/toolkit";
import { 
    createNewProductAction, 
    getVendorProductsAction, 
    deleteVendorProductAction, 
    getVendorDashboardStatsAction 
} from "./vendorAction";

const initialState = {
    products: [],
    vendorStats: null,
    currentProduct: null,
    orders: [], // Future order tracking ke liye baseline layout
    isLoading: false,
    error: null,
};

export const vendorSlice = createSlice({
    name: "vendor",
    initialState,
    reducers: {
        // Reducer to clear vendor errors from components interface
        clearVendorError: (state) => {
            state.error = null;
        },
        // Active product selection state tracking placeholder for update/edit screen
        setCurrentProduct: (state, action) => {
            state.currentProduct = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            // ==========================================
            // 1. Create New Product Action Protocol
            // ==========================================
            .addCase(createNewProductAction.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(createNewProductAction.fulfilled, (state, action) => {
                state.isLoading = false;
                // Instant update: Fresh product ko direct arrays node me push kiya bin page refresh ke
                state.products.unshift(action.payload); 
                
                // Dynamic Metrics check backup update logic
                if (state.vendorStats) {
                    state.vendorStats.totalProducts += 1;
                }
            })
            .addCase(createNewProductAction.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || "Failed to catalog fresh product node";
            })

            // ==========================================
            // 2. Fetch Specific Vendor Dashboard Live Products Log
            // ==========================================
            .addCase(getVendorProductsAction.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getVendorProductsAction.fulfilled, (state, action) => {
                state.isLoading = false;
                state.products = action.payload; // Live arrays listing loaded
            })
            .addCase(getVendorProductsAction.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || "Failed to load inventory logs data stream";
            })

            // ==========================================
            // 3. Delete Vendor Product Engine
            // ==========================================
            .addCase(deleteVendorProductAction.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteVendorProductAction.fulfilled, (state, action) => {
                state.isLoading = false;
                // UI Reactive Filtering: Deleted product ko instantly user inventory map se filter kiya
                const deletedProductId = action.meta?.arg; // Passes payload id metrics boundings
                state.products = state.products.filter(
                    (product) => product._id !== deletedProductId
                );

                // Stats calculation update dynamic scale mapping
                if (state.vendorStats) {
                    state.vendorStats.totalProducts = Math.max(0, state.vendorStats.totalProducts - 1);
                }
            })
            .addCase(deleteVendorProductAction.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || "Product deletion execution failed";
            })

            // ==========================================
            // 4. Get Vendor Dashboard KPI Statistics
            // ==========================================
            .addCase(getVendorDashboardStatsAction.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getVendorDashboardStatsAction.fulfilled, (state, action) => {
                state.isLoading = false;
                state.vendorStats = action.payload; // KPI analytics counter map injected
            })
            .addCase(getVendorDashboardStatsAction.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || "Failed to sync overview stats";
            });
    }
});

export const { clearVendorError, setCurrentProduct } = vendorSlice.actions;