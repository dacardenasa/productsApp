import * as React from 'react';
import {
    DrawerContentComponentProps,
    createDrawerNavigator
} from '@react-navigation/drawer';
import { CustomDrawerNavigator } from '@/components';
import { DrawerStackParamsList } from '..';

import PrivateNavigator from '../privateNavigator';

const Drawer = createDrawerNavigator<DrawerStackParamsList>();

function DrawerNavigator() {
    const renderDrawerContent = (props: DrawerContentComponentProps) => {
        return <CustomDrawerNavigator {...props} />;
    };

    return (
        <Drawer.Navigator
            initialRouteName="Products"
            defaultStatus="closed"
            drawerContent={renderDrawerContent}
            screenOptions={{
                headerShown: false
            }}
        >
            <Drawer.Screen name="Products" component={PrivateNavigator} />
        </Drawer.Navigator>
    );
}

export default DrawerNavigator;
