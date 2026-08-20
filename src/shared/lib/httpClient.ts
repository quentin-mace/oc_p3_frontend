import axios, {AxiosError} from "axios";
import {useAuthStore} from "../../features/auth/store/authStore";

export const httpClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL
});

httpClient.interceptors.request.use(config => {
    const token = useAuthStore.getState().token;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

httpClient.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        if (error.response?.status === 401) {
            useAuthStore.getState().setToken(null);
            window.location.replace("/login");
        }
        if (error.response?.status === 422) {
            // propager data.error
        }

        return Promise.reject(error);
    }
);