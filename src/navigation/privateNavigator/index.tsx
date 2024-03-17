import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ProductDetailScreen, ProductsScreen } from '@/screens';
import { RootPrivateStackParamList } from '..';

const Stack = createStackNavigator<RootPrivateStackParamList>();

const CustomScreenOptions = {
    cardStyle: { backgroundColor: 'white' },
    headerStyle: { elevation: 0, shadowColor: 'transparent' }
};

function PrivateNavigator() {
    return (
        <Stack.Navigator screenOptions={CustomScreenOptions}>
            <Stack.Screen
                name="ProductsScreen"
                component={ProductsScreen}
                options={{ title: 'Products' }}
            />
            <Stack.Screen
                name="ProductDetailScreen"
                component={ProductDetailScreen}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}

export default PrivateNavigator;
