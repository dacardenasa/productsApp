import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import PrivateNavigator from './privateNavigator';
import PublicNavigator from './publicNavigator';

const isAuthenticated = false;

export type RootPublicStackParamList = {
    LoginScreen: undefined;
    RegisterScreen: undefined;
};

export type RootPrivateStackParamList = {
    HomeScreen: undefined;
};

export type RootStackParamsList = RootPublicStackParamList &
    RootPrivateStackParamList;

function Navigator() {
    return (
        <NavigationContainer>
            {isAuthenticated ? <PrivateNavigator /> : <PublicNavigator />}
        </NavigationContainer>
    );
}

export default Navigator;
