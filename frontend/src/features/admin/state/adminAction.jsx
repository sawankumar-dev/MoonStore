import { createAsyncThunk } from "@reduxjs/toolkit";
import { approveOrRejectVendorApi, dashboardStatsApi, deleteSingleCustomer, getAllCustomersApi, getAllRequest, getAllVendorsApi } from "../api/adminApi";

// Get all Request which is send by users to become vendor
// ✅ completed
export const getAllRequestAction = createAsyncThunk("admin/request", async (_, thunkApi) => {
    try {
        let res = await getAllRequest()
        return res.data;
    } catch (error) {
        thunkApi.rejectWithValue(error)
    }
})

// This api for admin and he can approve or reject request which is send by user
// ✅ completed
export const approveOrRejectVendorAction = createAsyncThunk("admin/approve-reject", async (data, thunkApi) => {
    try {
        console.log("Data from AdminAction.jsx", data)
        let res = await approveOrRejectVendorApi(data)
        console.log(res)
        return res
    } catch (error) {
        thunkApi.rejectWithValue(error)
    }
});

// Get all users. for Admin
// ✅ completed
export const getAllCustomersAction = createAsyncThunk("admin/users", async (_, thunkApi) => {
    try {
        let res = await getAllCustomersApi();
        return res.data.customers;
    } catch (error) {
        thunkApi.rejectWithValue(error);
    }
})

export const getDashboardStatsAction = createAsyncThunk("admin/stats", async (_, thunkApi) => {
    try {
        let res = await dashboardStatsApi();
        return res.data;
    } catch (error) {
        thunkApi.rejectWithValue(error)
    }
})

export const getAllVendorsAction = createAsyncThunk("admin/vendors", async (_, thunkApi) => {
    try {
        let res = await getAllVendorsApi();
        return res.vendors;
    } catch (error) {
        thunkApi.rejectWithValue(error)
    }
})

export const deleteCustomerAction = createAsyncThunk("admin/customer", async(id, thunkApi) => {
    try {
        let res = await deleteSingleCustomer(id)
    } catch (error) {
        thunkApi.rejectWithValue(error)
    }
})