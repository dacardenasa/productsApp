import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen, RegisterScreen } from '@/screens';
import { RootPublicStackParamList } from '..';

const Stack = createNativeStackNavigator<RootPublicStackParamList>();

function PrivateNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        </Stack.Navigator>
    );
}

export default PrivateNavigator;
