import * as React from 'react';
import {
    NavigationContainer,
    NavigatorScreenParams
} from '@react-navigation/native';

import PublicNavigator from './publicNavigator';
import { LoadingScreen } from '@/screens';
import { AuthContext } from '@/context';
import DrawerNavigator from './DrawerNavigator';

export type RootPublicStackParamList = {
    LoginScreen: undefined;
    RegisterScreen: undefined;
};

export type RootPrivateStackParamList = {
    ProductsScreen: undefined;
    ProductDetailScreen: {
        productId: string;
        productName: string;
    };
};

export type DrawerStackParamsList = {
    Products: undefined;
};

export type RootStackParamsList = {
    private: NavigatorScreenParams<RootPrivateStackParamList>;
    public: undefined;
};

function Navigator() {
    const { status } = React.useContext(AuthContext);

    if (status === 'checking') return <LoadingScreen />;

    return (
        <NavigationContainer>
            {status === 'authenticated' ? (
                <DrawerNavigator />
            ) : (
                <PublicNavigator />
            )}
        </NavigationContainer>
    );
}

export default Navigator;
