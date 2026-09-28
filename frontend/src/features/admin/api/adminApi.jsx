import { api } from "../../../config/api"

// ✅ completed
export const getAllRequest = async () => {
    try {
        const response = await api.get("/admin/requests");
        return response.data
    } catch (error) {
        console.log("All Request Error",error)
    }
}

// Get All users ✅ completed 
export const getAllCustomersApi = async () => {
    try {
        const response = await api.get("/users/customers");
        return response
    } catch (error) {
        console.log("Error in Fetching users.", error)
    }
}

//Take action on vendor's request
// ✅ completed
export const approveOrRejectVendorApi = async(data)=>{
    try{
        console.log("data from AdminApi.jsx", data)
        const response = await api.post("/requests/action", data)
        return response;
    }   
    catch(error){
        console.log("All Request Error",error);
    }
}

//Get dashboard stats ✅ completed
export const dashboardStatsApi = async () => {
    try {
        const response = await api.get("/stats");
        return response.data
    } catch (error) {
        console.log("All Request Error",error)
    }
}
// Get all Vendors
export const getAllVendorsApi = async () => {
    try {
        const response = await api.get("/users/vendors");
        return response.data;
    } catch (error) {
        console.log("All Vendors requests", error)
    }
}
// delete single customer
export const deleteSingleCustomer = async (id) => {
    try {
        const response  = await api.delete(`/users/${id}`)
        return response.data;
    } catch (error) {
        console.log("Error in deleting user", error)
    }
}