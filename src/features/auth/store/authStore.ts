import {create} from "zustand";
import type {User} from "../../../shared/lib/apiTypes.ts";
import {ApiError} from "../../../shared/lib/apiTypes.ts";
import {authApi} from "../api/authApi.ts";
import {persist} from "zustand/middleware";

interface AuthStore {
    token: string | null;
    user: User | null;
    status: 'idle' | 'loading' | 'error';
    errors: Record<string, string[]>;
    message: string | null;
    setToken: (token: string | null) => void;
    setUser: (user: User | null) => void;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    register: (name: string, email: string, password: string, confirmPassword: string) => Promise<void>;
}

function fieldErrorsOf(error: unknown): Record<string, string[]> {
    if (error instanceof ApiError) {
        const data = error.data as { errors?: Record<string, string[]> } | null;
        return data?.errors ?? {};
    }
    return {};
}

export const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            token: null,
            user: null,
            status: 'idle',
            errors: {},
            message: null,
            setToken(token: string | null) {
                set({ token });
            },
            setUser(user: User | null) {
                set({ user });
            },
            login(email: string, password: string) {
                set({ status: 'loading', errors: {}, message: null });
                return authApi.login({email, password})
                    .then(response => {
                        set({token: response.token, user: response.user, status: 'idle'});
                    })
                    .catch(error => {
                        set({
                            status: 'error',
                            errors: fieldErrorsOf(error),
                            message: error instanceof ApiError ? error.message : 'Une erreur est survenue.',
                        });
                    });
            },
            logout() {
                authApi.logout().catch(() => {});
                set({token: null, user: null, status: 'idle', errors: {}, message: null});
            },
            register(name: string, email: string, password: string, confirmPassword: string) {
                set({ status: 'loading', errors: {}, message: null });
                return authApi.register({name, email, password, confirmPassword})
                    .then(response => {
                        set({token: response.token, user: response.user, status: 'idle'});
                    })
                    .catch(error => {
                        set({
                            status: 'error',
                            errors: fieldErrorsOf(error),
                            message: error instanceof ApiError ? error.message : 'Une erreur est survenue.',
                        });
                    });
            },
}),
        {
            name: 'renote.auth',
            partialize: state => ({token: state.token}),
        }
    )
);