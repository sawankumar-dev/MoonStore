import { createSlice } from "@reduxjs/toolkit";
import { getAllCartAction, deleteCartAction } from "./cartAction";
const initialState = {
    cart: null,
    isLoading: false,
    error: null,
}
export const cartSlice = createSlice({
    name: "cart",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getAllCartAction.pending, (state) => {
            state.error = null
            state.isLoading = true
        })
        .addCase(getAllCartAction.fulfilled, (state, action) => {
            state.error = null
            state.isLoading = false
            state.cart = action.payload.data
        })
        .addCase(getAllCartAction.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error
        })
        .addCase(deleteCartAction.pending, (state) => {
            state.isLoading = true
        })
        .addCase(deleteCartAction.fulfilled, (state) => {
            state.isLoading = false
        })
        .addCase(deleteCartAction.rejected, (state) => {
            state.isLoading = false
        })
    }
})