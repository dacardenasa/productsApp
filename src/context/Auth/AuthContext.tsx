import React, { useCallback, useEffect, useReducer } from 'react';
import { createContext } from 'react';

import { AuthStatus, LoginResponse, User } from '@/interfaces';
import { useMutation } from '@tanstack/react-query';
import { Auth } from '@/services';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { Actions, AuthReducer } from './AuthReducer';

export type AuthContextProps = {
    token: string | null;
    user: User | null;
    status: AuthStatus;
    login: (user: LoginResponse) => void;
    logOut: () => void;
};

export type AuthInitialState = Pick<
    AuthContextProps,
    'status' | 'token' | 'user'
>;

const authInitialState: AuthInitialState = {
    status: 'checking',
    token: null,
    user: null
};

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(AuthReducer, authInitialState);

    const { mutate: checkToken } = useMutation({
        mutationFn: Auth.checkToken,
        onSuccess: (user) => {
            const { token, ...rest } = user;
            dispatch({
                type: Actions.LOGIN,
                payload: { token, user: rest }
            });
            AsyncStorage.setItem('token', token);
        },
        onError: () => {
            dispatch({ type: Actions.RESTORE_AUTH_INITIAL_STATE });
        }
    });

    const login = (user: LoginResponse) => {
        const { token, ...rest } = user;
        dispatch({
            type: Actions.LOGIN,
            payload: { token, user: rest }
        });
        AsyncStorage.setItem('token', token);
    };
    const logOut = async () => {
        await AsyncStorage.removeItem('token');
        dispatch({ type: Actions.LOGOUT });
    };

    const checkAuthToken = useCallback(async () => {
        const token = await AsyncStorage.getItem('token');
        if (!token)
            return dispatch({ type: Actions.RESTORE_AUTH_INITIAL_STATE });
        checkToken();
    }, [checkToken]);

    useEffect(() => {
        checkAuthToken();
    }, [checkAuthToken]);

    return (
        <AuthContext.Provider
            value={{
                ...state,
                login,
                logOut
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
