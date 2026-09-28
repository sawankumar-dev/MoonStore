import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL;

export const api = axios.create({
    baseURL,
    withCredentials: true,
});

const refreshClient = axios.create({
    baseURL,
    withCredentials: true,
})
api.interceptors.response.use((response) =>  response, 
    async (error) => {  
        if(error.response?.status === 401) {
            try {
                await refreshClient.post("/auth/refresh-token")
                if(error.config) {
                    return api(error.config)
                }
            } catch (refreshError) {
                console.log("Refresh token failed", refreshError)
            }
        }
        return Promise.reject(error)
    }
)  