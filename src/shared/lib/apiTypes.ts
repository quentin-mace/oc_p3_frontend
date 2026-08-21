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