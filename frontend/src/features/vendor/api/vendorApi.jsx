import { api } from "../../../config/api"

export const createRequest = async (vendorData) => {
    try {
        const response = await api.post("/apply-request", vendorData);
        return response;
    } catch (error) {
        console.log("Vendor api me kuch error hai.", error)
        throw error;
    }
}