import axios, {AxiosError} from "axios";
import {useAuthStore} from "../../features/auth/store/authStore";
import {ApiError} from "./apiTypes.ts";

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
            redirectToLogin();
        }

        return Promise.reject(new ApiError(error.response?.status || 500, error.message, error.response?.data || {}));
    }
);

function redirectToLogin() {
    if (!window.location.pathname.includes('/login')) {
        window.location.replace('/login');
    }
}