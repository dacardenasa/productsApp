import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '@/screens';
import { RootPrivateStackParamList } from '..';

const Stack = createNativeStackNavigator<RootPrivateStackParamList>();

function PublicNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
        </Stack.Navigator>
    );
}

export default PublicNavigator;
