import { createAsyncThunk } from "@reduxjs/toolkit";
import { hydrateUser, loginUserApi, logoutUserApi, registerUserApi } from "../api/authApi";
import toast from 'react-hot-toast';


export const loginUserAction = createAsyncThunk("auth/login", async (credentials, thunkAPI) => {
    try {
        let res = await loginUserApi(credentials)
        console.log(res)
        if(res.success) {
            toast.success("Login successfully!")
        }
        return res.user;
    } catch (error) {
        toast.error("Invalid credentials!");
        return thunkAPI.rejectWithValue(
            error.response?.data?.message || "Login"
        )
    }
})

export const registerUserAction = createAsyncThunk("auth/register", async (userData, thunkAPI) => {
    try {
        let res = await registerUserApi(userData);
        return res.user; 
    } catch (error) {
        return thunkAPI.rejectWithValue(
            error.response?.data?.message || "Register Failed"
        );
    }
})
export const hydrateUserAction = createAsyncThunk("auth/profile", async (_, thunkApi) => {
    try {
        const res = await hydrateUser()
        return res.user;
    } catch (error) {
        return thunkApi.rejectWithValue("Unauthorized user",error)
    }
})

export const logoutUserAction = createAsyncThunk("auth/logout",async(_,thunkApi)=>{
    try {
        const res = await logoutUserApi();
        return res;
    } catch (error) {
        return thunkApi.rejectWithValue("logout fail",error)
    }
})