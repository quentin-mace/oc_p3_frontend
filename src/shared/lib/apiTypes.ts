export interface ApiEnvelope<T = unknown> {
    status: 'success' | 'error';
    message: string;
    data: T;
}

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
}

export interface Tag {
    id: number;
    name: string;
}

export interface Note {
    id: number;
    text: string;
    tag: Tag;
    created_at: string;
}

class ApiError extends Error {
    status: number;
    data: unknown;

    constructor(status: number, message: string, data: unknown) {
        super(message);
        this.status = status;
        this.data = data;
    }
}

export {ApiError};

export function fieldErrorsOf(error: unknown): Record<string, string[]> {
    if (error instanceof ApiError) {
        const data = error.data as { errors?: Record<string, string[]> } | null;
        return data?.errors ?? {};
    }
    return {};
}