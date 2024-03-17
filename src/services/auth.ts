import { cafeAPI } from '@/utils';
import { LoginResponse, RegisterArgs } from '@/interfaces';

export const Auth = {
    login: async (email: string, password: string) => {
        const { data } = await cafeAPI.post<LoginResponse>('/auth/login', {
            email,
            password
        });
        return data;
    },
    register: async (registerInfo: RegisterArgs): Promise<LoginResponse> => {
        const { data } = await cafeAPI.post<LoginResponse>('/auth/register', {
            ...registerInfo
        });
        return data;
    },
    checkToken: async () => {
        const { data } = await cafeAPI.get<LoginResponse>('/auth/check-status');
        return data;
    }
};
