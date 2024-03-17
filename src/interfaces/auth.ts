export type LoginData = {
    email: string;
    password: string;
};

export type AuthStatus = 'checking' | 'authenticated' | 'unauthenticated';

export type LoginResponse = User & { token: string };

export type User = {
    id: string;
    email: string;
    fullName: string;
    isActive: true;
    roles: string[];
};

export type RegisterArgs = Pick<User, 'email' | 'fullName'> &
    Pick<LoginData, 'password'>;
