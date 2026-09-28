import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../config/api";

export const getAllCartAction = createAsyncThunk("cart/getAllCarts", async (_, thunkApi) => {
    try {
        const response = await api.get("/cart");
        return response.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})
export const deleteCartAction = createAsyncThunk("cart/deleteCart", async (id, thunkApi) => {
    try {
        const response = await api.delete(`/cart/${id}`)
        return response.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})
export const updateQuantity = createAsyncThunk("cart/updateCart", async (data, thunkApi) => {
    try {
        const { id, action } = data;
        const response = await api.patch(`/cart/${id}`, {action});
        return response.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})