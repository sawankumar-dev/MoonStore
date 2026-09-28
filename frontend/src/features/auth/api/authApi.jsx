import { api } from "../../../config/api"

export const loginUserApi = async (credential) => {
    try {
        const response = await api.post("/auth/login", credential);
        return response.data;
    } catch (error) {
        console.log("Login user Api Error", error)
        throw error
    }
}

export const registerUserApi = async (userData) => {
    try {
        const response = await api.post("/auth/register", userData);
        return response.data;
    } catch (error) {
        console.log("Error in Register Api",error)
        throw error;
    }
};

export const hydrateUser = async () => {
    try {
        const response = await api.get("/auth/profile");
        return response.data;
    } catch(error) {
        console.log("Error in hydration User api", error);
        throw error
    }
}

export const logoutUserApi = async () => {
    try {
        const response = await api.post("/auth/logout");
        return response.data;
    } catch (error) {
        console.log("Logout user Api Error", error)
        throw error
    }
}