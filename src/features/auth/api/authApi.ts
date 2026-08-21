import {httpClient} from "../../../shared/lib/httpClient.ts";
import type {User} from "../../../shared/lib/apiTypes.ts";

class AuthApi {
    register(payload: {name: string, email: string, password: string, confirmPassword: string}): Promise<{
        user: User,
        token: string
    }>
    {
        const body = {
            name: payload.name,
            email: payload.email,
            password: payload.password,
            password_confirmation: payload.confirmPassword
        };
        const promise = httpClient.post('/register', body);
        return promise.then(response => response.data.data);
    }

    login(payload: {email: string, password: string}): Promise<{
        user: User,
        token: string
    }>
    {
        return httpClient.post('/login', payload).then(response => response.data.data);
    }

    logout(): Promise<void>
    {
        return httpClient.post('/logout').then(() => undefined);
    }

}

export const authApi = new AuthApi();