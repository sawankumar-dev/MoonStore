import { createSlice } from "@reduxjs/toolkit";
import { 
    approveOrRejectVendorAction, 
    deleteCustomerAction, 
    getAllCustomersAction, 
    getAllRequestAction, 
    getAllVendorsAction, 
    getDashboardStatsAction 
} from "./adminAction";

const initialState = {
    stats: null,
    users: [],
    pendingRequests: [],
    selectedRequest: null,
    vendors: [],
    vendorProducts: [],
    isLoading: false,
    error: null,
}

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        // Future use ke liye clean up action (Optional)
        clearAdminError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
        // ==========================================
        // 1. Get All Pending Requests Cases
        // ==========================================
        .addCase(getAllRequestAction.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(getAllRequestAction.fulfilled, (state, action) => {
            state.isLoading = false;
            state.pendingRequests = action.payload;
        })
        .addCase(getAllRequestAction.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload || "Failed to fetch pending requests";
        })

        // ==========================================
        // 2. Approve and Reject Action Cases (State Sync Fixed)
        // ==========================================
        .addCase(approveOrRejectVendorAction.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(approveOrRejectVendorAction.fulfilled, (state, action) => {
            state.isLoading = false;
            
            // 🔴 Reactive Fix: Filter out the processed request instantly from UI
            // Assuming your action.meta.arg contains { requestId } passed to the action
            const requestId = action.meta?.arg?.requestId;
            if (requestId) {
                state.pendingRequests = state.pendingRequests.filter(
                    (req) => req._id !== requestId
                );
                
                // Optional: Update pending stats count dynamically without reloading API
                if (state.stats) {
                    state.stats.totalPendingRequests = Math.max(0, state.stats.totalPendingRequests - 1);
                }
            }
        })
        .addCase(approveOrRejectVendorAction.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload || "Action execution failed";
        })

        // ==========================================
        // 3. Get All Customers / Users Cases
        // ==========================================
        .addCase(getAllCustomersAction.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(getAllCustomersAction.fulfilled, (state, action) => {
            state.isLoading = false;
            state.users = action.payload;
        })
        .addCase(getAllCustomersAction.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload || "Failed to load customers directory";
        })

        // ==========================================
        // 4. Get Dashboard Analytics Stats Cases
        // ==========================================
        .addCase(getDashboardStatsAction.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(getDashboardStatsAction.fulfilled, (state, action) => {
            state.isLoading = false;
            state.stats = action.payload;
        })
        .addCase(getDashboardStatsAction.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload || "Failed to refresh dashboard stats";
        })

        // ==========================================
        // 5. Get All Verified Active Vendors Cases
        // ==========================================
        .addCase(getAllVendorsAction.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(getAllVendorsAction.fulfilled, (state, action) => {
            state.isLoading = false;
            state.vendors = action.payload;
        })
        .addCase(getAllVendorsAction.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload || "Failed to load vendors log";
        })
        // ==========================================
        // 6. Delete single customer 
        // ==========================================
        .addCase(deleteCustomerAction.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(deleteCustomerAction.fulfilled, (state) => {
            state.isLoading = false;
        })
        .addCase(deleteCustomerAction.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload || "Failed to load vendors log";
        });
    }
});

export const { clearAdminError } = adminSlice.actions;
export default adminSlice.reducer;
