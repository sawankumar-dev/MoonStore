import { configureStore } from '@reduxjs/toolkit'
import authReducer from "../features/auth/state/authSlice"
import adminReducer  from '../features/admin/state/adminSlice'
import { cartSlice } from '../features/cart/state/cartSlice'
import { vendorSlice } from '../features/vendor/state/vendorSlice'
export const store = configureStore({
  reducer: {
    auth: authReducer,
    admin: adminReducer,
    cart: cartSlice.reducer,
    vendor: vendorSlice.reducer,
  },
})