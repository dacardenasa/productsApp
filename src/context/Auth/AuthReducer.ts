import { User } from '@/interfaces';
import { AuthContextProps } from './AuthContext';

export type AuthState = Pick<AuthContextProps, 'status' | 'token' | 'user'>;

export const enum Actions {
    LOGIN = 'login',
    LOGOUT = 'logOut',
    RESTORE_AUTH_INITIAL_STATE = 'restoreAuthInitialState'
}

type AuthAction =
    | { type: Actions.LOGIN; payload: { token: string; user: User } }
    | { type: Actions.LOGOUT }
    | { type: Actions.RESTORE_AUTH_INITIAL_STATE };

export const AuthReducer = (
    state: AuthState,
    action: AuthAction
): AuthState => {
    switch (action.type) {
        case Actions.LOGIN:
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                status: 'authenticated'
            };
        case Actions.LOGOUT:
        case Actions.RESTORE_AUTH_INITIAL_STATE:
            return {
                ...state,
                status: 'unauthenticated',
                token: null,
                user: null
            };
        default:
            return state;
    }
};
